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
    // recupération des preuves réussites
    const proofs = await prisma.proof.findMany({
        where: { status: 'VALID' },
        select: {
            proofId: true,
            userId: true,
            challenge: {
                select: {
                    nbPoints: true
                }
            }
        }
    });

    let userProof: Record<string, number> = {};

    proofs.forEach((p) => {
        if (p.userId in userProof) {
            userProof[p.userId] += p.challenge.nbPoints;
        } else {
            userProof[p.userId] = p.challenge.nbPoints;
        }
    });

    const updatePromises = Object.entries(userProof).map(([userId, points]) => {
        return prisma.user.update({
            where: { id: userId },
            data: { points: points }
        });
    });

    await Promise.all(updatePromises);
}
