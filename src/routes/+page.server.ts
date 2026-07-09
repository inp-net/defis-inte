import type { PageServerLoad } from './$types';
import type { ProofInput, ChallengeRead } from '$lib/types/types.d';
import { newProof } from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import { error, fail, type Actions } from '@sveltejs/kit';
import { uploadUserFile } from '$lib/server/filesManagement';
import { Churros1ATo2A } from '$lib/env';


export const load: PageServerLoad = async ({ locals }) => {

    const user = locals.user || null;

    // Récupère tous les challenges sans typages
    const allChallengesUntyped = await prisma.challenge.findMany({
        where: {
            isDeleted: false
        },
        select: {
            challengeId: true,
            name: true,
            description: true,
            type: true,
            nbPoints: true,
            locationName: true,
            defiAccepte: true,
            isDeleted: true,
            group: {
                select: {
                    name: true,
                    pictureURL: true
                }
            },
            groupInteSucceed: {
                select: {
                    groupId: true,
                    name: true,
                }
            },
            proofs: {
                where: {
                    status: "PENDING",
                    user: {
                        groupInteId: user?.groupInteId ?? ""
                    }
                },
                select: {
                    proofId: true
                }
            }
        }
    })

    // Ajoute une information si un membre du groupe à fait le défi
    const allChallenges = allChallengesUntyped.map(({ group, groupInteSucceed, proofs, ...challenge }) => {
        const isDone = Boolean(
            user?.groupInteId &&
            groupInteSucceed.some(g => g.groupId === user.groupInteId)
        );

        const isPending = user?.groupInteId ? proofs.length > 0 : false;

        return {
            ...challenge,
            groupName: group.name ?? "",
            groupUrl: group.pictureURL ?? "",
            groupInteSucceedName: groupInteSucceed.map(g => g.name),
            isDone,
            isPending,
        };
    });

    // Challenges sont les challenges acceptés par un admin
    const challenges: ChallengeRead[] = allChallenges.filter((a) => a.defiAccepte);

    // TODO peut êter à optimiser car requête est déjà fait en haut.
    const pendingChallengeCount = !user ? 0 : await prisma.challenge.count({
        where: {
            defiAccepte: false,
            group: user?.isAdmin ? {} : {
                board: {
                    some: {
                        id: user.id
                    }
                }
            }
        }
    })

    // Le nombre de preuves en attentes d'être validés par l'utilisateur
    const pendingProofCount = !user ? 0 : await prisma.proof.count({
        where: {
            status: "PENDING",
            challenge: user?.isAdmin ? {} : {
                group: {
                    board: {
                        some: {
                            id: user.id
                        }
                    }
                }
            }
        }
    })

    return {
        posts: {
            challenges,
            pendingChallengeCount,
            pendingProofCount
        }, user: locals.user,
    };
};

export const actions: Actions = {
    save: async ({ request, locals }) => {
        const data = await request.formData();
        const challengeId = parseInt(data.get('challengeId') as string, 10);
        const type = data.get('type') as string;
        const textePreuve = data.get('textePreuve') as string;
        const files: File[] = data.getAll('file');
        const isOkTVn7 = data.get('isOkTVn7') === "true";
        const userId = locals.user.id;
        const maxFiles: number = 15;
        try {
            // Si pas connecter 
            if (!locals.user) {
                throw error(413, "Le nombre de fichier est limité à 10")
            }


            // Récupérer le groupe d'intégration de l'utilisateur actuel
            const userGroupInteId = locals.user.groupInteId;

            let content: String[] = [];


            if (textePreuve) {
                content = [textePreuve]
            } else {
                if (files.length > maxFiles) {
                    throw error(413, "Le nombre de fichier est limité à 10")
                }
                for (const file of files) {
                    const url = await uploadUserFile(file, userId);
                    content.push(url)
                }
            }

            const body: ProofInput = { challengeId, userId, type, content, isOkTVn7 }

            // Vérifie si c'est un 1A 
            if (!(locals.user.is1A && Churros1ATo2A)) {
                throw error(403, "Tu n'es pas un 1A")
            }

            const proof = await newProof(body);
            return {
                success: true,
                proof: proof
            };
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, {
                    message: error.message,
                });
            }
            console.error('Action Error:', error);
            return fail(500, {
                message: 'Impossible d\'accepter le défi'
            });
        }
    }
}
