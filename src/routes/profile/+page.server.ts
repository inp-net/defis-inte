import type { PageServerLoad } from './$types';
import { prisma } from "$lib/server/prisma";
import { type ProofRead, Status, type Proof } from "$lib/types/types.d";

export const load: PageServerLoad = async ({ locals }) => {

    const user = locals.user;

    const userGroupInteId = user.groupInteId || (await prisma.user.findUnique({
        where: { id: user.id },
        select: { groupInteId: true }
    }))?.groupInteId;

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

    const proofByUser : Proof[] = await prisma.proof.findMany({
        where: {
            userId: user.id
        },
        select: {
            status: true
        }
    })

    const proofCount = proofByUser.length;
    const proofDoneCount = proofByUser.filter(p => p.status === Status.Done).length;

    return {
        posts: {
            userProofs,
            proofCount,
            proofDoneCount
        }, user
    };
};
