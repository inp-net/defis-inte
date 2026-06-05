import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

/** Gère la création ou la modification de défis.
 * Si challengeID = 0, c'est un nouveau défi.
 * Si challengeID existe déjà, il remplace la valeur.
 * @routes POST /api/challenge.
 */
 export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const { challengeId, name, description, groupName, locationName, type, nbPoints, difficulty } = body;

        if (!name || !groupName || !locationName) {
            return json({ message: 'Champs requis manquants' }, { status: 400 });
        }

        const targetGroup = await prisma.groupClub.findFirst({
            where: { name: groupName }
        });

        if (!targetGroup) {
            return json({ message: `Club non trouvé: ${groupName}` }, { status: 404 });
        }

        const coreData = {
            name,
            description: description || null,
            nbPoints: Number(nbPoints) || 0,
            difficulty: difficulty || 'easy',
            type: type || 'text',
            group: { connect: { groupId: targetGroup.groupId } },
            location: { 
                connectOrCreate: {
                    where: { name: locationName },
                    create: { name: locationName }
                }
            }
        };

        // TODO utiliser un vrai UUID
        const fallbackUserId = "00000000-0000-0000-0000-000000000000"; 
        
        await prisma.user.upsert({
            where: { id: fallbackUserId },
            update: {},
            create: { id: fallbackUserId, name: "Admin System", is1A: false, isAdmin: true }
        });

        let savedChallenge;
        const targetId = challengeId ? parseInt(challengeId, 10) : 0;

        if (targetId > 0) {
            savedChallenge = await prisma.challenge.update({
                where: { challengeId: targetId },
                data: coreData
            });
        } else {
            savedChallenge = await prisma.challenge.create({
                data: {
                    ...coreData,
                    userId: fallbackUserId, 
                    userAcceptId: "pending",
                    defiAccepte: false
                }
            });
        }

        return json({ success: true, data: savedChallenge }, { status: 200 });

    } catch (error) {
        console.error('API Error:', error);
        return json({ message: 'Impossible de sauvegarder le défi.' }, { status: 500 });
    }
};
