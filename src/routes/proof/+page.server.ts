import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { approveProof, denyProof } from '$lib/server/challengeService';
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async () => {

    const proofs = await prisma.proof.findMany({
        where: {
            status: 'PENDING',
        },
        include :{
            user: true,
            challenge: true,
        }
    });

    return {
        posts: {
            proofs
        }
    };
};

export const actions: Actions = {
    approve: async ({ request }) => {
        const data = await request.formData();
        const challengeId = data.get('challengeId');

        try {
            const updatedChallenge = await approveProof(challengeId);
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
    deny: async ({ request }) => {
        const data = await request.formData();
        const challengeId = data.get('challengeId');

        try {
            await denyProof(challengeId);
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

