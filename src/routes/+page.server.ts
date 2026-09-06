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
    const userGroupInteId = user?.groupInteId ?? null;

    // Récupère tous les challenges
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
            proofs: {
                where: {
                    status: "VALID",
                },
                select: {
                    status: true,
                    user: {
                        select: {
                            groupInte: {
                                select: {
                                    groupId: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    // Ajoute une information si un membre du groupe a fait le défi
    const allChallenges = allChallengesUntyped.map(({ group, proofs, ...challenge }) => {
        const validGroupMap = new Map<string, string>();
        let isDone = false;
        let isPending = false;

        for (const proof of proofs) {
            const groupInte = proof.user?.groupInte;
            if (!groupInte) continue;

            if (proof.status === 'VALID') {
                validGroupMap.set(groupInte.groupId, groupInte.name);
                if (userGroupInteId && groupInte.groupId === userGroupInteId) {
                    isDone = true;
                }
            } else if (proof.status === 'PENDING' && userGroupInteId && groupInte.groupId === userGroupInteId) {
                isPending = true;
            }
        }

        return {
            ...challenge,
            groupName: group.name ?? "",
            groupUrl: group.pictureURL ?? "",
            allSucceedGroupNames: Array.from(validGroupMap.values()),
            isDone,
            isPending: !isDone && isPending
        };
    });

    // Ne retient que les challenges approuvés
    const challenges: ChallengeRead[] = allChallenges.filter((a) => a.defiAccepte);

    const pendingChallengeCount = !user ? 0 : await prisma.challenge.count({
        where: {
            defiAccepte: false,
            isDeleted: false,
            ...(user.isAdmin ? {} : {
                group: {
                    board: {
                        some: { id: user.id }
                    }
                }
            })
        }
    });

    // Nombre de preuves en attente pour les clubs gérés par l'utilisateur
    const pendingProofCount = !user ? 0 : await prisma.proof.count({
        where: {
            status: "PENDING",
            ...(user.isAdmin ? {} : {
                challenge: {
                    group: {
                        board: {
                            some: { id: user.id }
                        }
                    }
                }
            })
        }
    });

    return {
        posts: {
            challenges,
            pendingChallengeCount,
            pendingProofCount
        },
        user
    };
};

export const actions: Actions = {
    save: async ({ request, locals }) => {
        if (!locals.user) {
            return fail(401, { message: "Tu n'es pas connecté" });
        }

        // Vérification statut 1A
        if (!(locals.user.is1A && Churros1ATo2A) || !locals.user.is1A) {
            return fail(403, { message: "Tu n'es pas un 1A" });
        }

        const data = await request.formData();
        const challengeId = parseInt(data.get('challengeId') as string, 10);
        const textePreuve = data.get('textePreuve') as string;
        const files = data.getAll('file').filter((file): file is File => file instanceof File && file.size > 0);
        const type = data.get('type') as UploadType;
        const isOkTVn7 = data.get('isOkTVn7') === "true";
        const userId = locals.user.id;
        const maxFiles = 15;

        // Validation du format des fichiers
        for (const file of files) {
            const fileType = extname(file.name).slice(1).toLowerCase();
            if (type === "PHOTO" && !typePhotoFile.includes(fileType)) {
                return fail(413, { message: 'Format photo non valide' });
            }
            if (type === "VIDEO" && !typeVideoFile.includes(fileType)) {
                return fail(413, { message: 'Format vidéo non valide' });
            }
        }

        let content: string[] = [];

        if (textePreuve) {
            content = [textePreuve];
        } else {
            if (files.length > maxFiles) {
                return fail(413, { message: `Le nombre de fichiers est limité à ${maxFiles}` });
            }
            try {
                for (const file of files) {
                    const url = await uploadUserFile(file, userId);
                    content.push(url);
                }
            } catch (err: any) {
                console.error(err);
                if (err.message === 'FILE_TOO_LARGE') {
                    return fail(413, { message: "Le fichier est trop lourd (max 200 Mo / image | 500 Mo / vidéos)" });
                } else if (err.message === 'EXTENSION_NOT_ALLOWED') {
                    return fail(415, { message: "L'extension du fichier n'est pas autorisée" });
                } else if (err.message === 'INVALID_FILE_CONTENT') {
                    return fail(415, { message: "Le contenu du fichier ne correspond pas à son extension" });
                } else {
                    return fail(500, { message: "Erreur lors de l'upload du fichier, réessaie" });
                }
            }
        }

        const body: ProofInput = { challengeId, userId, type, content, isOkTVn7 };

        try {
            const proof = await newProof(body);
            return {
                success: true,
                proof
            };
        } catch (error: any) {
            console.error('Action Error:', error);
            if (error.status && error.body?.message) {
                return fail(error.status, {
                    message: error.body.message
                });
            }
            return fail(500, {
                message: "Impossible d'envoyer la preuve"
            });
        }
    }
};
