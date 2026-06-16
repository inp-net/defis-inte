import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { ChallengeInput } from '$lib/types/types.d';
import {UploadType} from '../../../prisma/generated/prisma/enums'
import { Status, ProofInput } from '$lib/types/types.d';
import { Churros1ATo2A } from '$lib/env';


/** Action pour sauvegarder ou modifier le challenge.
 * Si le challengeId = 0, crée un nouveau défi.
 * Si le challengeId existe, modifie le défie.
 */


/** Verifie si l'utilisateur est autorisée à modifier le challenge et si il peut etre modifié
 * @challengeId identifiant du challenge
 * @userId identifiant de l'utilisateur qui modifie (accepte/refuse) une preuve
 * @deleted pour pouvoir delet meme si le defi à déjà était accepter
 */
export async function canModifyChallenge(challengeIdRaw: any , userId: string, deleted : boolean = false) {   
    console.log("entree dans can modify")//debug
        const challengeId = parseInt(challengeIdRaw, 10);
        const challenge = await prisma.challenge.findUnique({
            where: { challengeId: challengeId },
            select : {
                groupId : true,
                isDeleted: true,  
                defiAccepte: true
            }
        });

        if (!challenge) {
            throw error(404,'Le challenge est introuvable'); 
        }

        if (challenge.isDeleted) {
            throw error(409,'Le défi a deja été refusée' );
        }

        if (challenge.defiAccepte || deleted) {
            throw error(409,"Defi déjà accepter" );
        }

        // si pas du bureau ou admin il est redirigée
        const userAutorisation = await prisma.user.findUnique({
            where : {id : userId},
            select: {
                isAdmin: true,
                groupBoard: {
                    select: {
                        groupId: true
                    }
                }
            }
        });

        if(!userAutorisation.groupBoard.some(board => board.groupId === challenge.groupId) && !userAutorisation.isAdmin){
                throw error(402,"tu ne fais pas partie du bureau du club")
        }
    return true
    console.log("fin de can modify sans probleme")//debug

}


export async function saveChallenge(body: ChallengeInput) {
    const { userId, challengeId, name, description, groupName, locationName, type, nbPoints } = body;

    if (!name || !groupName || !locationName) {
        throw error(400, 'Champs requis manquants : name, groupName ou locationName.');
    }
    // refusée les 1A
    if (!(await prisma.user.findUnique({where : {id : userId}, select : {is1A:true}})) && Churros1ATo2A){   
        throw error(403, 'Tu es un 1A');
    }

    const targetGroup = await prisma.groupClub.findFirst({
        where: { name: groupName }
    });

    if (!targetGroup) {
        throw error(404, `Club non trouvé: ${groupName}`);
    }

    const validatedType = Object.values(UploadType).includes(type as UploadType)
        ? (type as UploadType)
        : UploadType.PHOTO;

    const coreData = {
        name: name.trim(),
        description: description?.trim() || null,
        nbPoints: Number(nbPoints) || 0,
        type: validatedType,
        group: { 
            connect: { groupId: targetGroup.groupId } 
        },
        location: { 
            connectOrCreate: {
                where: { name: locationName.trim() },
                create: { name: locationName.trim() }
            }
        }
    }

    const targetId = challengeId ? parseInt(challengeId.toString(), 10) : 0;

    if (targetId > 0) {
        return await prisma.challenge.update({
            where: { challengeId: targetId },
            data: coreData
        });
    } else {
        return await prisma.challenge.create({
            data: {
                ...coreData,
                userId: userId, 
                defiAccepte: false
            }
        });
    }
}

/** Accepter un défi. */
export async function acceptChallenge(challengeIdRaw: any , userId : string) {
    if (!challengeIdRaw || isNaN(Number(challengeIdRaw))) {
        throw { status: 400, message: 'challengeId invalide' };
    }

    const idToFind = parseInt(challengeIdRaw, 10);

    const updatedChallenge = await prisma.challenge.update({
        where: { challengeId: idToFind },
        data: {
            defiAccepte: true,
            userAcceptId: userId
        }
    });

    return updatedChallenge;
}


/** Supprimer un défi. */
export async function deleteChallenge(challengeIdRaw: any, userId : string) {
    if (!challengeIdRaw || isNaN(Number(challengeIdRaw))) {
        throw { status: 400, message: 'challengeId invalide' };
    }

    const idToFind = parseInt(challengeIdRaw, 10);

    await prisma.challenge.update({
        where: { challengeId: idToFind },
        data: {
            isDeleted: true,
        }
    });
}
