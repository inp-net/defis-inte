import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

/** Accepter un défi.
 * @routes POST /api/challenge-accept.
 */
export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const { challengeId } = body;

        if (!challengeId || isNaN(Number(challengeId))) {
            return json({ message: 'challengeId invalide' }, { status: 400 });
        }

        const idToFind = parseInt(challengeId, 10);

        const challengeExist = await prisma.challenge.findUnique({
            where: { challengeId: idToFind }
        });

        if (!challengeExist) {
            return json({ message: 'challengeId introuvable' }, { status: 404 });
        }

        if (challengeExist.defiAccepte) {
            return json({ message: 'challenge déjà accepté' }, { status: 409 });
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
        })

        return json({ success: true, data: updatedChallenge }, { status: 200 });
        
    } catch (error) {
        console.error('API Error:', error);
        return json({ message: 'Impossible accepter le défi' }, { status: 500 });
    }
};
