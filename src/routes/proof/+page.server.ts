import type { PageServerLoad } from './$types';
import { approveProof, denyProof } from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import type { Proof } from '$lib/types/types.d';
import { error, fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({locals}) => {

    let proofs : Proof[] = [];
    // si pas du bureau ou admin il est redirigée
    if(!locals.user.groupBoard || locals.user.isAdmin){
        throw error(402,"tu ne fais pas partie du bureau d'un club")
    }else{
        if (locals.user.isAdmin){
            proofs = await prisma.proof.findMany({
                where: {
                    status: 'PENDING'
                },
                include :{
                    user: true,
                    challenge: true,
                }
            });
        }else{
            proofs = await prisma.proof.findMany({
                where: {
                    status: 'PENDING',
                    challenge:{
                        groupId: {in : locals.user.groupBoard.groupId } // Que les club ou le user est dans le bureau
                    }
                },
                include :{
                    user: true,
                    challenge: true,
                }
            });
        }
    }


    return {
        posts: {
            proofs
        }
    };
};

export const actions: Actions = {
    approve: async ({ request , locals}) => {
        // si pas du bureau ou admin il est redirigée
        if(!locals.user.groupBoard && !locals.user.isAdmin){
            throw error(402,"tu ne fais pas partie du bureau d'un club")
        }

        const data = await request.formData();
        const proofIdString = data.get('proofId');

        const proofId: number = (typeof proofIdString === 'string') 
            ? parseInt(proofIdString, 10) 
            : NaN;

        try {
            const fallbackUserId = locals.user.uid; 
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
                message: 'Impossible d\'accepter le défi' 
            });
        }
    },
    deny: async ({ request, locals }) => {
        const data = await request.formData();
        const proofIdString = data.get('proofId');

        const proofId: number = (typeof proofIdString === 'string') 
            ? parseInt(proofIdString, 10) 
            : NaN;

        try {
            const fallbackUserId =locals.user.uid; 
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

