import type { PageServerLoad } from './$types';
import { approveProof, denyProof} from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import type { Proof } from '$lib/types/types.d';
import { error, fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {

    const user = locals.user || null;

    if (!user) return error(500, "Utilisateur non connecté.");

    const proofs: Proof[] = await prisma.proof.findMany({
        where: {
            challenge: user?.isAdmin ? {} : {
                group: {
                    board: {
                        some: {
                            id: user.id
                        }
                    }
                }
            }
        },
        include: {
            user: {
                include: {
                    groupInte: true,
                }
            },
            challenge: {
                include: {
                    group: true,
                },
            },
        }
    })

    //
    // STATISTIQUES
    //

    const proofCount = await prisma.proof.count({
        where: {
            userId: user.id
        }
    });

    return {
        posts: {
            proofs,
            proofCount
        }
    };
};

export const actions: Actions = {
    approve: async ({ request, locals }) => {
        // si pas du bureau ou admin il est redirigée

        if (!locals.user) {
            throw error(403, "utilisateur non connecté");
        }

        if (!locals.user.isAdmin) {
            const isBoardMember = await prisma.groupClub.findFirst({
                where: {
                    board: {
                        some: {
                            id: locals.user.id
                        }
                    }
                }
            });

            if (!isBoardMember) {
                throw error(403, "tu ne fais pas partie du bureau d'un club");
            }
        }

        const data = await request.formData();
        const proofIdString = data.get('proofId');

        const proofId: number = (typeof proofIdString === 'string')
            ? parseInt(proofIdString, 10)
            : NaN;

            try {
                const updatedProof = await approveProof(proofId, locals.user.id);
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

        if (!locals.user) {
            throw error(403, "utilisateur non connecté");
        }

        if (!locals.user.isAdmin) {
            const isBoardMember = await prisma.groupClub.findFirst({
                where: {
                    board: {
                        some: {
                            id: locals.user.id
                        }
                    }
                }
            });

            if (!isBoardMember) {
                throw error(403, "tu ne fais pas partie du bureau d'un club");
            }
        }

        const data = await request.formData();
        const proofIdString = data.get('proofId');

        const proofId: number = (typeof proofIdString === 'string')
            ? parseInt(proofIdString, 10)
            : NaN;

            try {
                const fallbackUserId = locals.user.id;
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

