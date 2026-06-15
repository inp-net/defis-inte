import type { PageServerLoad } from './$types';
import { approveProof, denyProof , pointsUpdate} from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import type { Proof } from '$lib/types/types.d';
import { error, fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {

    const user = locals.user || null;

    if (!user) return error(500, "Utilisateur non connecté.");

    const notAdminFiltre = user?.isAdmin
        ? {}
        : {
            challenge: {
                group: {
                    board: {
                        some: {
                            id: user.id
                        }
                    }
                }
            }
        }

    const proofs : Proof[] = await prisma.proof.findMany({
        where: {
            status: 'PENDING',
            notAdminFiltre
        },
        include: {
            user: true,
            challenge: true,
        }
    })


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
            const updatedProof = await approveProof(proofId, locals.user.id);
            const updatePoint = await pointsUpdate(proofId)
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
            const fallbackUserId =locals.user.id; 
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

