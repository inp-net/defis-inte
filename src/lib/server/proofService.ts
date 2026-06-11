import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { Status, ProofInput } from '$lib/types/types.d';
import { UploadType } from '../../../prisma/generated/prisma/client' 

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
        Where : {id : userId},
        Select : {
            isAdmin : true,
            groupBoard : {groupId : true}
        }
    });

    const groupProof = await prisma.proof.findUnique({
        where : {
            proofId : proofId
        },
        select : {
            challenge : {
                groupId : true
            }
        }
    })

    if(!userAutorisation.groupBoard.some(board => board.groupId === groupProof) || !userAutorisation.isAdmin){
            throw error(402,"tu ne fais pas partit du bureau du club")
    }
}

export async function newProof(body: ProofInput) {
    const { challengeId, userId, type, content, isOkTVn7 } = body;

    const challenge = await prisma.challenge.findFirst({
        where: { challengeId: challengeId }
    });

    if (!challenge) {
        throw error(404, `Challenge non trouvé: ${challengeId}`);
    }

    if (!Object.values(UploadType).includes(type as UploadType)) {
        throw error(404, `Type de challenge non trouvé: ${type}`);
    }

    // Vérifie si l'utilisateur existe
    if(await prisma.user.finUnique({where : {id :userId}})){
        throw error(403, "l'utilisateur n'existe pas")
    }

    const coreData = {
        user: {
            connect: { id: userId }
        },
        content: content,
        type: type,
        challenge: {
            connect: {challengeId: challengeId}
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

/** Accepter une preuve. */
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


/** Supprimer un défi. */
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
