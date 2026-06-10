import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { UploadType } from '../../../prisma/generated/prisma/enums';

export interface ChallengeInput {
    challengeId?: string | number | null;
    name: string;
    description?: string | null;
    groupName: string;
    locationName: string;
    type?: string | null;
    nbPoints?: string | number | null;
}

/** Action pour sauvegarder ou modifier le challenge.
 * Si le challengeId = 0, crée un nouveau défi.
 * Si le challengeId existe, modifie le défie.
 */
export async function saveChallenge(body: ChallengeInput) {
    const { challengeId, name, description, groupName, locationName, type, nbPoints } = body;

    if (!name || !groupName || !locationName) {
        throw error(400, 'Champs requis manquants : name, groupName ou locationName.');
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
    };

    // TODO à chager avec l'ID user
    const fallbackUserId = "00000000-0000-0000-0000-000000000000"; 

    await prisma.user.upsert({
        where: { id: fallbackUserId },
        update: {},
        create: { id: fallbackUserId, name: "Admin System", is1A: false, isAdmin: true }
    });

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
                userId: fallbackUserId, 
                defiAccepte: false
            }
        });
    }
}

/** Accepter une preuve. */
/** TODO - A modifier (il s'agit d'un simple copier-coller de challengeService pour le moment) */
export async function approveProof(challengeIdRaw: any) {
    if (!challengeIdRaw || isNaN(Number(challengeIdRaw))) {
        throw { status: 400, message: 'challengeId invalide' };
    }

    const idToFind = parseInt(challengeIdRaw, 10);

    const challengeExist = await prisma.challenge.findUnique({
        where: { challengeId: idToFind }
    });

    if (!challengeExist) {
        throw { status: 404, message: 'challengeId introuvable' };
    }

    if (challengeExist.defiAccepte) {
        throw { status: 409, message: 'challenge déjà accepté' };
    }

    if (challengeExist.isDeleted) {
        throw { status: 409, message: 'challenge supprimé' };
    }

    // TODO utiliser un vrai UUID
    const fallbackUserId = "00000000-0000-0000-0000-000000000000"; 

    await prisma.user.upsert({
        where: { id: fallbackUserId },
        update: {},
        create: { id: fallbackUserId, name: "Admin System", is1A: false, isAdmin: true }
    });

    const updatedChallenge = await prisma.challenge.update({
        where: { challengeId: idToFind },
        data: {
            defiAccepte: true,
            userAcceptId: fallbackUserId
        }
    });

    return updatedChallenge;
}


/** Supprimer un défi. */
/** TODO - A modifier (il s'agit d'un simple copier-coller de challengeService pour le moment) */
export async function denyProof(challengeIdRaw: any) {
    if (!challengeIdRaw || isNaN(Number(challengeIdRaw))) {
        throw { status: 400, message: 'challengeId invalide' };
    }

    const idToFind = parseInt(challengeIdRaw, 10);

    const challengeExist = await prisma.challenge.findUnique({
        where: { challengeId: idToFind }
    });

    if (!challengeExist) {
        throw { status: 404, message: 'challengeId introuvable' };
    }

    await prisma.challenge.update({
        where: { challengeId: idToFind },
        data: {
            isDeleted: true,
        }
    });
}
