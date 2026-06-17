import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { ChallengeInput } from '$lib/types/types.d';
import { Status, ProofInput } from '$lib/types/types.d';
import {pointsUpdate} from '$lib/server/proofService';


export async function canUseAdmin(userId : string){
    const userAdmin = await prisma.user.findUnique({
        where : {id : userId},
        select : {isAdmin : true}
    })
    if (!userAdmin.isAdmin){
        return error(403, 'Tu n\'es pas admin'  )
    }
    return true
}

export async function reCalculPoint() {
    // remise à 0 de tout les points 
    try {
        const [resetUsers, resetGroups, disconnectAll] = await prisma.$transaction([
                prisma.user.updateMany({
                data: { points: 0 }
            }),
            prisma.groupInte.updateMany({
                data: { points: 0 }
            }),
            prisma.$executeRawUnsafe(
                `DELETE FROM "_ChallengesSucceed";` 
                )
            
        ]);

    } catch (error) {
        console.error("Échec de la réinitialisation :", error);
    }

    // recupération des preuves réussites
    const proofs = await prisma.proof.findMany({
        select : { 
            proofId : true,
            status : true,

        }
    })
    for (const proof of proofs) {
        if (proof.status === 'VALID' ){
            pointsUpdate(proof.proofId);
        }
    }
    
}