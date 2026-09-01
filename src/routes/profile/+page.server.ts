import type { PageServerLoad } from './$types';
import { prisma } from "$lib/server/prisma";
import { type ProofRead, Status, type Proof } from "$lib/types/types.d";
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {

    const user = locals.user;

    if (!user) {
        throw error(403, "utilisateur non connecté");
    }

    const userGroupData = (user.groupInteId && user.groupInte?.name)
    ? user
    : await prisma.user.findUnique({
        where: { id: user.id },
        select: { groupInteId: true, groupInte: { select: { name: true } } }
    });

    const userGroupInteId = userGroupData?.groupInteId;
    const groupInteName = userGroupData?.groupInte?.name;

    const userProofs : ProofRead[] = await prisma.proof.findMany({
        where: {
            user: {
                groupInteId: userGroupInteId
            }
        },
        select: {
            proofId: true,
            type: true,
            content: true,
            date: true,
            status: true,
            validatorId: true,
            user: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            challenge: {
                select: {
                    name: true,
                    nbPoints: true
                }
            }
        }
    });

    //
    // Statistiques
    //

    const proofByUser: Pick<Proof, 'status'>[] = await prisma.proof.findMany({
        where: {
            userId: user.id
        },
        select: {
            status: true
        }
    });

    const proofCount = proofByUser.length;
    const proofDoneCount = proofByUser.filter(p => p.status === Status.VALID).length;

    return {
        posts: {
            userProofs,
            proofCount,
            proofDoneCount,
            groupInteName
        }, user
    };
};
