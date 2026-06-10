import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { approveProof, denyProof } from '$lib/server/proofService';
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
    
    // action ?/approve
    approve: async ({ request }) => {

        // Récupérer les données du form
        const data = await request.formData();
        const proofId = data.get('proofId');

        try {
            // appel à modifier la database -> approuver la preuve sélectionnée
            const updatedProof = await approveProof(proofId);
            return { 
                success: true,
                // jsp si c'est utile
                proof: updatedProof 
            };

        // Erreurs
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

    // Action ?/deny
    deny: async ({ request }) => {

        // Récupérer les données du form
        const data = await request.formData();
        const proofId = data.get('proofId');

        try {
            // appel à modifier la database -> refuser la preuve sélectionnée
            await denyProof(proofId);
            return { success: true, };

            // Lequel est mieux ? JSP
            //const updatedProof = await denyProof(proofId);
            //return { 
            //    success: true,
                // jsp si c'est utile
            //    proof: updatedProof 
            //};

        // Erreurs
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

