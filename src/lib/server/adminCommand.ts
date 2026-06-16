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
    //console.log('Est Admin')//debug
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

        //console.log("Réinitialisation de la base de données réussie !");// debug
         //console.log(await prisma.groupInte.findMany({include : {challengeSucceed : true}}))// debug
        //console.log([resetUsers, resetGroups, disconnectAll])// debug
    } catch (error) {
        console.error("Échec de la réinitialisation :", error);
    }

    //console.log('Point remis a 0')//debug
    //console.log('Est Admin')//debug

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

    //console.log('Fin re calcul points')//debug
    
}