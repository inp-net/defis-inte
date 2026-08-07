import { prisma } from '$lib/server/prisma';
import type { Prisma } from '../../../prisma/generated/prisma/client';
import { error } from '@sveltejs/kit';
import { Status, UploadType, type ProofInput } from '$lib/types/types.d';
import { Churros1ATo2A } from '$lib/env';

// GESTION DES PREUVES 


/** Verifie si l'utistaeur peut accepter/refuse la preuve 
 * @param proofId id de la preuve 
 * @param userId uid de l'utilsateur
 */
async function canModifyProof(proofId: number, userId: string) {
    const proof = await prisma.proof.findUnique({
        where: { proofId: proofId }
    });

    if (!proof) {
        throw { status: 404, message: 'La preuve est introuvable' };
    }

    if (proof.status === Status.VALID) {
        throw { status: 409, message: 'Preuve déjà accepté' };
    }

    if (proof.status === Status.DENIED) {
        throw { status: 409, message: 'Preuve à été refusé, impossible de l\'approuver' };
    }

    // si pas du bureau ou admin il est redirigée
    const userAutorisation = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            isAdmin: true,
            groupBoard: { select: { groupId: true } }
        }
    });

    if (!userAutorisation) {
        throw error(404, "utilisateur introuvable")
    }

    const groupProof = await prisma.proof.findUnique({
        where: {
            proofId: proofId
        },
        select: {
            challenge: {
                select: { groupId: true }
            }
        }
    })

    if (!groupProof || !groupProof.challenge) {
        throw error(404, "groupe ou challenge introuvable");
    }

    const groupIdProof = groupProof.challenge.groupId;

    if (!userAutorisation.groupBoard.some(board => board.groupId === groupIdProof) && !userAutorisation.isAdmin) {
        throw error(403, "tu ne fais pas partie du bureau du club");
    }
}



/** Ajout d'une nouvelle preuve à un défi par un 1A
 * Vérifier que l'on est connecter avant d'appeler cette fonction
 * @param body information nécessaire (voire type ProofInput)
 * @returns ce qui à été crée en db 
 */
export async function newProof(body: ProofInput) {
    const { challengeId, userId, type, content, isOkTVn7 } = body;

    const challenge = await prisma.challenge.findFirst({
        where: { challengeId: challengeId }
    });

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!challenge) {
        throw error(404, `Challenge non trouvé: ${challengeId}`);
    }

    if (!Object.values(UploadType).includes(type)) {
        throw error(404, `Type de challenge non trouvé: ${type}`);
    }

    if (!user) {
        throw error(403, "L'utilisateur n'existe pas");
    }

    if (!user.is1A && Churros1ATo2A) {
        throw error(403, "Tu n'es pas un 1A");
    }

    if (!user.groupInteId) {
        throw error(403, "Tu n'appartiens à aucun groupe d'intégration");
    }

    const existingProofFromGroup = await prisma.proof.findFirst({
        where: {
            challengeId: challengeId,
            status: { in: [Status.PENDING, Status.VALID] },
            user: {
                groupInteId: user.groupInteId
            }
        },
        select: {
            status: true,
            user: {
                select: { firstName: true, lastName: true }
            }
        }
    });

    if (existingProofFromGroup) {
        const author = `${existingProofFromGroup.user.firstName} ${existingProofFromGroup.user.lastName}`;
        if (existingProofFromGroup.status === Status.PENDING) {
            throw error(400, `Une preuve a déjà été soumise par ${author} et attend validation.`);
        } else {
            throw error(400, `Votre groupe a déjà validé ce défi (validé par ${author}).`);
        }
    }

    return await prisma.proof.create({
        data: {
            userId: userId,
            challengeId: challengeId,
            content: content,
            type: type,
            status: Status.PENDING,
            isOkTVn7: isOkTVn7,
            date: new Date()
        } as unknown as Prisma.ProofUncheckedCreateInput
    });
}

/** Accepter une preuve. 
 * Met à jour les point du user 
 * met à jour le challenge pour le groupe d'inté de l'utilisateur
* @param proofId identifiant de la preuve
* @param userId identifiant de l'utilisateur ayant valider la preuve
*/
export async function approveProof(proofId: number, userId: string) {
    await canModifyProof(proofId, userId);

    const updatedProof = await prisma.proof.update({
        where: { proofId: proofId },
        data: {
            status: Status.VALID,
            validatorId: userId
        }
    });

    // Mise à jour des points de l'utilisateur et du challenge
    await pointsUpdate(proofId)
    await addChallengeSucced(userId, proofId);

    return updatedProof;
}


/** refuser une preuve. 
* @param proofId identifiant de la preuve
* @param userId identifiant de l'utilisateur ayant valider la preuve
*/
export async function denyProof(proofId: number, userId: string) {

    await canModifyProof(proofId, userId);

    const updatedProof = await prisma.proof.update({
        where: { proofId: proofId },
        data: {
            status: Status.DENIED,
            validatorId: userId
        }
    });

    return updatedProof;
}

/** Mise a jour des points de l'utilisateur reussisant le challenge 
* @param proofId identifiant de la preuve qui à été modifier
*/
export async function pointsUpdate(proofId: number) {
    const proofData = await prisma.proof.findUnique({
        where: {
            proofId: proofId
        },
        select: {
            userId: true,
            user: {
                select: {
                    points: true
                }
            },
            challengeId: true,
            challenge: { select: { nbPoints: true } }
        }
    })

    if (!proofData || !proofData.challenge) {
        throw error(404, "preuve introuvable");
    }

    let newPointUser: number = proofData.challenge.nbPoints + proofData.user.points;

    const userUpdate = await prisma.user.update({
        where: { id: proofData.userId },
        data: { points: newPointUser }
    })

    return userUpdate;
}

/**Ajout d'un challenge réussi pour le groupe d'intégration de l'utilisateur
 * @param userId // identifiant de l'utilisateur 
 * @param proofId // identifiant de la preuve 
 */
export async function addChallengeSucced(userId: string, proofId: number) {
    const proofData = await prisma.proof.findUnique({
        where: {
            proofId: proofId
        },
        select: {
            challengeId: true
        }
    });

    const userGroupId = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            groupInteId: true
        }
    });

    if (!proofData || !proofData.challengeId) {
        throw error(404, "preuve introuvable");
    }

    if (!userGroupId || !userGroupId.groupInteId) {
        throw error(404, "utilisateur du groupe introuvable");
    }

    const challengeUpdate = await prisma.challenge.update({
        where: {
            challengeId: proofData.challengeId
        },
        data: {
            groupInteSucceed: {
                connect: {
                    groupId: userGroupId.groupInteId
                }
            }
        }
    });

    return challengeUpdate;

}
