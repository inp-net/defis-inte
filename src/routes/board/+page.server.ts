import type { PageServerLoad } from './$types';
import type { GroupChallenge } from '$lib/types/types.d.ts';
import { fail, type Actions } from '@sveltejs/kit';
import { acceptChallenge, deleteChallenge } from '$lib/server/challengeService';
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async () => {

    const clubsWithChallenges = await prisma.groupClub.findMany({
        include: {
            challenge: {
                orderBy: {
                    // Trier dans l'ordre de création
                    challengeId: 'desc',
                }
            }
        },
    });

    const allUserIds = [
        ...new Set(clubsWithChallenges.flatMap(club => club.challenge.map(ch => ch.userId)))
    ];

    const users = await prisma.user.findMany({
        where: { id: { in: allUserIds } },
        select: { id: true, name: true }
    });

    const userMap = new Map(users.map(u => [u.id, u.name]));

    const challenges = clubsWithChallenges.map((club) => ({
        name: club.name,
        pictureURL: club.pictureURL ?? "",
        challenges: club.challenge.map((ch) => ({
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
    accept: async ({ request , locals}) => {
        const data = await request.formData();
        const challengeId = data.get('challengeId');

        try {
            const updatedChallenge = await acceptChallenge(challengeId, locals.user.uid);
            return { 
                success: true, 
                challenge: updatedChallenge 
            };
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, { 
                    message: error.message,
                    challengeId
                });
            }
            console.error('Action Error:', error);
            return fail(500, { 
                message: 'Impossible accepter le défi' 
            });
        }
    },
    delete: async ({ request , locals}) => {
        const data = await request.formData();
        const challengeId = data.get('challengeId');

        try {
            await deleteChallenge(challengeId, locals.user.uid);
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
    }
};
