import type { PageServerLoad } from './$types';
import { fail, error, type Actions } from '@sveltejs/kit';
import { acceptChallenge, deleteChallenge, canModifyChallenge } from '$lib/server/challengeService';
import { prisma } from "$lib/server/prisma";
import { ChallengeItem } from '$lib/types/models.d';
import type { ChallengeRead } from '$lib/types/types.d';

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user || null;

    if (!user) {
        throw error(401, "Utilisateur non connecté");
    }

    if (!user.isAdmin) {
        throw error(403, "Vous n'avez pas les droits pour accéder à cette page");
    }

    const challengesRaw = await prisma.challenge.findMany({
        where: {
            isDeleted: false,
            ...(user.isAdmin
                ? {}
                : {
                      group: {
                          board: {
                              some: {
                                  id: user.id
                              }
                          }
                      }
                  })
        },
        include: {
            group: {
                select: {
                    name: true,
                    pictureURL: true
                }
            },
            proofs: {
                where: {
                    status: "VALID"
                },
                select: {
                    user: {
                        select: {
                            groupInte: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            challengeId: 'desc'
        }
    });

    const allUserIds = [...new Set(challengesRaw.map((ch) => ch.userId))];

    const users = await prisma.user.findMany({
        where: { id: { in: allUserIds } },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    });

    const userMap = new Map(
        users.map((u) => [u.id, `${u.firstName} ${u.lastName}`.trim()])
    );

    const challenges = challengesRaw.map((ch) => {
        const allSucceedGroupNames = [
            ...new Set(
                ch.proofs
                    .map((p) => p.user.groupInte?.name)
                    .filter((name): name is string => Boolean(name))
            )
        ];

        return {
            challengeId: ch.challengeId,
            name: ch.name,
            description: ch.description,
            type: ch.type,
            nbPoints: ch.nbPoints,
            locationName: ch.locationName,
            defiAccepte: ch.defiAccepte,
            isDeleted: ch.isDeleted,
            groupName: ch.group.name,
            groupUrl: ch.group.pictureURL,
            userName: userMap.get(ch.userId) ?? "Utilisateur inconnu",
            allSucceedGroupNames
        };
    });

    return {
        posts: {
            challenges
        }
    };
};

export const actions: Actions = {
    accept: async ({ request, locals }) => {
        const data = await request.formData();
        const challengeId = Number(data.get('challengeId'));

        if (!locals.user) {
            throw error(403, "Utilisateur non connecté");
        }

        const canModify = await canModifyChallenge(challengeId, locals.user.id);
        if (canModify) {
            try {
                const updatedChallenge = await acceptChallenge(challengeId, locals.user.id);
                return {
                    success: true,
                    challenge: updatedChallenge
                };
            } catch (e: any) {
                if (e.status && e.message) {
                    throw error(e.status, e.message);
                }
                return fail(500, {
                    message: 'Impossible d’accepter le défi'
                });
            }
        }

        return {
            success: false,
            challenge: {}
        };
    },

    delete: async ({ request, locals }) => {
        const data = await request.formData();
        const challengeId = Number(data.get('challengeId'));

        if (!locals.user) {
            throw error(403, "Utilisateur non connecté");
        }

        const canModify = await canModifyChallenge(challengeId, locals.user.id);
        if (canModify) {
            try {
                await deleteChallenge(challengeId);
                return { success: true };
            } catch (err: any) {
                if (err.status && err.message) {
                    return fail(err.status, {
                        message: err.message,
                        challengeId
                    });
                }
                console.error('Action Error:', err);
                return fail(500, {
                    message: 'Impossible de supprimer le défi',
                    error: err
                });
            }
        }

        return { success: false };
    }
};
