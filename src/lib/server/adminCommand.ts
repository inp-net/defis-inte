import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { pointsUpdate, addChallengeSucced } from '$lib/server/proofService';

// COMMANDES POUR LES ADMIN

/** Verification de si c'est bien un admin
 * @param userId uid de l'admin
 * @returns true si vrai sinon error
 */
export async function canUseAdmin(userId: string) {
    const userAdmin = await prisma.user.findUnique({
        where: { id: userId },
        select: { isAdmin: true }
    })

    if (!userAdmin) {
        throw error(404, "utilisateur introuvable");
    }
    
    if (!userAdmin.isAdmin) {
        return error(403, "Tu n'es pas admin");
    }

    return true
}

/** Fonction servant à recalculer tout les points des utilisateur et des groups
 * créer pour les admins
 * exemple utilisation : supression de defi déja réalisée 
 */
export async function recomptePoints() {
    try {
        await prisma.$transaction([
            prisma.user.updateMany({
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
        where: { status: 'VALID' },
        select: {
            proofId: true,
        }
    });

    // parcours des preuves et ajout des points en consequence
    try {
        for (const proof of proofs) {

            pointsUpdate(proof.proofId);

            const user = await prisma.proof.findUnique({
                where: { proofId: proof.proofId },
                select: { userId: true }
            })

            if (!user || !user.userId) {
                throw error(404, "utilsiateur introuvable");
            }

            // addChallengeSucced(user.userId, proof.proofId);
        }
    } catch (error) {
        console.error( error);
    }

}
