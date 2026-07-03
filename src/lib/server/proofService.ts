import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { Status, type ProofInput } from '$lib/types/types.d';
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
        throw error(403, "tu ne fais pas partie du bureau du club")
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

    // On récupère l'utilisateur ainsi que son groupe d'intégration d'un seul coup
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!challenge) {
        throw error(404, `Challenge non trouvé: ${challengeId}`);
    }

    if (!Object.values(UploadType).includes(type as UploadType)) {
        throw error(404, `Type de challenge non trouvé: ${type}`);
    }

    // Vérifie si l'utilisateur existe
    if (!user) {
        throw error(403, "L'utilisateur n'existe pas");
    }

    // Vérifier que c'est bien un 1A    
    if (!user.is1A && Churros1ATo2A) {
        throw error(403, "Tu n'es pas un 1A");
    }

    // Vérifier si son groupe d'inté a déjà fait le défi
    if (user.groupInteId) {
        const existingProofFromGroup = await prisma.proof.findFirst({
            where: {
                challengeId: challengeId,
                status: { in: ["PENDING", "VALID"] },
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
            if (existingProofFromGroup.status === "PENDING") {
                throw error(400, `Une preuve a déjà été soumise par ${author} et attend validation.`);
            } else {
                throw error(400, `Votre groupe a déjà validé ce défi (validé par ${author}).`);
            }
        }
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
