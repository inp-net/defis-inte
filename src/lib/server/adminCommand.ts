import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { ChallengeInput } from '$lib/types/types.d';
import { Status, ProofInput } from '$lib/types/types.d';
import {pointsUpdate} from '$lib/server/proofService';

/** Verification de si c'est bien un admin
 * @param userId uid de l'admin
 * @returns true si vrai sinon error
 */
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

/** Fonction servant a recalculer tout les points des utilisateur et des groups
 * crée pour les admins
 */
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
        where : {status : 'VALID'},
        select : { 
            proofId : true,
        }
    })
    
    // parcours des preuves et ajout des points en consequence
    for (const proof of proofs) {
        console.log(proof.proofId)
        pointsUpdate(proof.proofId);
    }
    
}