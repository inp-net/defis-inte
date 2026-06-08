import type { PageServerLoad } from './$types';
import type { GroupChallenge } from '$lib/types/types.d.ts';
import { fail, type Actions } from '@sveltejs/kit';
import { acceptChallenge, deleteChallenge } from '$lib/server/challengeService';
import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {

    const clubsWithChallenges = await prisma.groupClub.findMany({
        include: {
            challenge: {
                orderBy: {
                    // Trier dans l'ordre de création
                    challengeId: 'desc',
                },
            }
        },
    });

    const challenges: GroupChallenge[] = clubsWithChallenges.map((club) => ({
        name: club.name,
        pictureURL: club.pictureURL ?? "",
        challenges: club.challenge,
    }))

    return {
        posts: {
            challenges
        }
    };
};

export const actions: Actions = {
    accept: async ({ request }) => {
        const data = await request.formData();
        const challengeId = data.get('challengeId');

        try {
            const updatedChallenge = await acceptChallenge(challengeId);
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
    delete: async ({ request }) => {
        const data = await request.formData();
        const challengeId = data.get('challengeId');

        try {
            await deleteChallenge(challengeId);
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
