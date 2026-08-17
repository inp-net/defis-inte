import type { PageServerLoad } from './$types';
import { type UploadType, type ProofInput, type ChallengeRead } from '$lib/types/types.d';
import { newProof } from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import { fail, type Actions } from '@sveltejs/kit';
import { uploadUserFile, typeVideoFile, typePhotoFile } from '$lib/server/filesManagement';
import { Churros1ATo2A } from '$lib/env';
import { extname } from 'path';


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
            isDeleted: false,
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

        if (!locals.user) {
            throw fail(404, "utilisateur introuvable");
        }

        const data = await request.formData();
        const challengeId = parseInt(data.get('challengeId') as string, 10);
        const textePreuve = data.get('textePreuve') as string;
        // safe check que c'est bien des fichiers dans cette variable
        const files = data.getAll('file').filter((file): file is File => file instanceof File && file.size > 0);
        const type = data.get('type') as UploadType;
        const isOkTVn7 = data.get('isOkTVn7') === "true";
        const userId = locals.user.id;
        const maxFiles: number = 15;
        try {
            // Si pas connecter 
            if (!locals.user) {
                return fail(403, "Tu n'es pas connecter");
            }

            // Vérifie si c'est un 1A 
            if (!(locals.user.is1A && Churros1ATo2A) || !locals.user.is1A) {
                return fail(403, "Tu n'es pas un 1A");
            }

            // VERIFIE QUE C'est bien le bon type
            for (const file of files) {
                const fileType = extname(file.name).slice(1).toLowerCase()
                if (type === "PHOTO" && !typePhotoFile.find((elt : string) => elt === fileType)) { 
                    return fail (413, 'On veut des photos' )
                }
                if (type === "VIDEO" && !typeVideoFile.find((elt : string) => elt === fileType)) {
                    return fail (413, 'on veut des vidéos')
                }
            }

            let content: String[] = [];

            if (textePreuve) {
                content = [textePreuve]
            } else {
                if (files.length > maxFiles) {
                    return fail(413, "Le nombre de fichier est limité à 10")
                }
                try {
                    for (const file of files) {
                        const url = await uploadUserFile(file, userId);
                        content.push(url)
                    }
                } catch (err: any) {
                    console.error(err);
                    if (err.message === 'FILE_TOO_LARGE') {
                        return fail(413, "Le fichier est trop lourd (max 200 Mo / image | 500 Mo / vidéos)")
                    } else if (err.message === 'EXTENSION_NOT_ALLOWED') {
                        return fail(415, "L'extension du fichier n'est pas autorisée")
                    } else if (err.message === 'INVALID_FILE_CONTENT') {
                        return fail(415, "Le contenu du fichier ne correspond pas à son extension")
                    } else {
                        return fail(500, "Erreur lors de l'upload du fichier, retente")
                    }
                }
            }
            const body: ProofInput = { challengeId, userId, type, content, isOkTVn7 };

            const proof = await newProof(body);
            return {
                success: true,
                proof: proof
            };
        } catch (error: any) {
            if (error.status && error.body.message) {
                console.error('Action Error:', error);
                return fail(error.status, {
                    message: error.body.message,
                });
            }
            console.error('Action Error:', error);
            return fail(500, {
                message: 'Impossible d\'accepter le défi'
            });
        }
    }
}
