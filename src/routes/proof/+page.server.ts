import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { approveProof, denyProof } from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import type { Proof } from '$lib/types/types.d';

export const load: PageServerLoad = async () => {

    const proofs : Proof[] = await prisma.proof.findMany({
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
        const proofIdString = data.get('proofId');

        const proofId: number = (typeof proofIdString === 'string') 
            ? parseInt(proofIdString, 10) 
            : NaN;

        try {
            const fallbackUserId = "00000000-0000-0000-0000-000000000000"; 
            const updatedProof = await approveProof(proofId, fallbackUserId);
            return { 
                success: true,
                proof: updatedProof 
            };
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, { 
                    message: error.message,
                    proofId
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
        const proofIdString = data.get('proofId');

        const proofId: number = (typeof proofIdString === 'string') 
            ? parseInt(proofIdString, 10) 
            : NaN;

        try {
            const fallbackUserId = "00000000-0000-0000-0000-000000000000"; 
            await denyProof(proofId, fallbackUserId);
            return { success: true, };
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, { 
                    message: error.message,
                    proofId
                });
            }
            console.error('Action Error:', error);
            return fail(500, { 
                message: 'Impossible de supprimer le défi', error
            });
        }
    }
};

