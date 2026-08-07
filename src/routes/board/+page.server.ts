import type { PageServerLoad } from './$types';
import type { GroupChallenge, ChallengeRead } from "$lib/types/types.d";
import { fail, error, type Actions } from '@sveltejs/kit';
import { acceptChallenge, deleteChallenge, canModifyChallenge } from '$lib/server/challengeService';
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {

    const user = locals.user || null;

    if (!user) return error(500, "Utilisateur non connecté")

    const clubsWithChallenges: GroupChallenge[] = await prisma.groupClub.findMany({
        where: user?.isAdmin ? {} : {
            board: {
                some: {
                    id: user.id
                }
            }
        },
        include: {
            users: {
                select: {
                    id: true,
                }
            },
            challenge: {
                orderBy: {
                    // Trier dans l'ordre de création
                    challengeId: 'desc',
                }
            }
        }
    });

    const allUserIds = [
        ...new Set(clubsWithChallenges.flatMap(club => club.challenge.map((ch: ChallengeRead) => ch.userId)))
    ];

    const users = await prisma.user.findMany({
        where: { id: { in: allUserIds } },
        select: {
            id: true,
            firstName: true,
            lastName: true,
        }
    });

    const userMap = new Map(
        users.map(u => [u.id, `${u.firstName} ${u.lastName}`.trim()])
    );

    const challenges: GroupChallenge[] = clubsWithChallenges.map((club) => ({
        name: club.name,
        pictureURL: club.pictureURL ?? "",
        challenges: club.challenge.map((ch: ChallengeRead) => ({
            challengeId: ch.challengeId,
            name: ch.name,
            description: ch.description,
            type: ch.type,
            nbPoints: ch.nbPoints,
            locationName: ch.locationName,
            defiAccepte: ch.defiAccepte,
            isDeleted: ch.isDeleted,
            groupName: club.name,
            groupUrl: club.pictureURL,
            // Le nom d'utilisateur du créateur du défi
            userName: userMap.get(ch.userId) ?? "Utilisateur inconnu"
        }))
    }));

    return {
        posts: {
            challenges
        }
    };
};

export const actions: Actions = {
    accept: async ({ request, locals }) => {
        const data = await request.formData();
        const challengeId = data.get('challengeId');

        if (!locals.user) {
            throw error(403, "utilisateur non connecté");
        }

        const canModify = await canModifyChallenge(challengeId, locals.user.id);
        if (canModify) {
            try {
                const updatedChallenge = canModify ? await acceptChallenge(challengeId, locals.user.id) : false;
                return {
                    success: true,
                    challenge: updatedChallenge
                };
            } catch (e: any) {
                if (e.status && e.message) {
                    error(e.status, e.message)
                };
                return fail(500, {
                    message: 'Impossible accepter le défi'
                });
            }
        } else {
            return {
                success: false,
                challenge: {}
            };
        }

    },
    delete: async ({ request, locals }) => {
        const data = await request.formData();
        const challengeId = data.get('challengeId');

        if (!locals.user) {
            throw error(403, "utilisateur non connecté");
        }

        const canModify = await canModifyChallenge(challengeId, locals.user.id);
        if (canModify) {
            try {
                if (canModify) await deleteChallenge(challengeId);
                return { success: true, };
            } catch (error: any) {
                if (error.status && error.message) {
                    return fail(error.status, {
                        message: error.message,
                        challengeId
                    });
                }
                console.error('Action Error:', error);
                return fail(500, {
                    message: 'Impossible de supprimer le défi', error
                });
            }
        } else {
            return { success: false, };
        }
    }
};
