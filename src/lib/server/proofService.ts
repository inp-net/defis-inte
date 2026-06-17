import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { Status, ProofInput } from '$lib/types/types.d';
import { UploadType } from '../../../prisma/generated/prisma/client'
import { Churros1ATo2A } from '$lib/env';

//GESTION DES PREUVES 


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
    const groupIdProof = groupProof.challenge.groupId;

    if (!userAutorisation.groupBoard.some(board => board.groupId === groupIdProof) && !userAutorisation.isAdmin) {
        throw error(402, "tu ne fais pas partie du bureau du club")
    }
}



/** Ajout d'une nouvelle preuve à un défi par un 1A
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
    })

    if (!challenge) {
        throw error(404, `Challenge non trouvé: ${challengeId}`);
    }

    if (!Object.values(UploadType).includes(type as UploadType)) {
        throw error(404, `Type de challenge non trouvé: ${type}`);
    }

    // Vérifie si l'utilisateur existe
    if (! await prisma.user.findUnique({ where: { id: userId } })) {
        throw error(403, "l'utilisateur n'existe pas")
    }

    //verifier que c'est bien un is1A    
    if ((!await prisma.user.findUnique({ where: { id: userId }, select: { is1A: true } })) && Churros1ATo2A) {
        throw error(403, 'Tu n\'es pas un 1A');
    }

    //on ne peut pas envoyé plusieur preuve par groupe d'inté 
    const challengeCheck = await prisma.challenge.findUnique({
        where: {
            challengeId: challengeId,
        },
        select: {
            groupInteSucceed: {
                where: {
                    usersInte: {
                        some: { id: userId }
                    }
                },
                select: {
                    groupId: true
                }
            }
        }
    });

    if (challengeCheck && challengeCheck.groupInteSucceed.length > 0) {
        throw error(403, "Challenge déjà fait par un membre de ton groupe d'intégration.");
    }

    // On ne peut pas envoyer si un défi est PENDING
    const existingGroupPendingProof = await prisma.proof.findFirst({
        where: {
            challengeId: challengeId,
            status: Status.PENDING,
            user: {
                groupInteId: user.groupInteId
            }
        }
    });
    if (existingGroupPendingProof) {
        throw error(403, "Challenge déjà fait par un membre de ton groupe d'intégration.");
    }


    const coreData = {
        user: {
            connect: { id: userId }
        },
        content: content,
        type: type,
        challenge: {
            connect: { challengeId: challengeId }
        },
        status: Status.PENDING,
        isOkTVn7: isOkTVn7,
        date: new Date()
    };

    return await prisma.proof.create({
        data: {
            ...coreData,
        }
    });
}

/** Accepter une preuve. 
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

/** Mise a jour des points de l'utilisateur et du groupe reussisant le challenge 
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
                    points: true,
                    groupInteId: true,
                    groupInte: { select: { points: true } }
                }
            },
            challengeId: true,
            challenge: { select: { nbPoints: true } }
        }
    })

    let newPointUser: number = proofData.challenge.nbPoints + proofData.user.points;
    const newPointGroup: number = proofData.challenge.nbPoints + proofData.user.groupInte.points;

    const groupInteUpdate = await prisma.groupInte.update({
        proofData: {
            points: newPointGroup,
            challengeSucceed: { connect: { challengeId: proofData.challengeId } }
        },
        where: { groupId: proofData.user.groupInteId }
    })

    const userUpdate = await prisma.user.update({
        proofData: { points: newPointUser },
        where: { id: proofData.userId }
    })

    return

}
