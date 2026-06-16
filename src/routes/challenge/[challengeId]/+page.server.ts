import { saveChallenge } from '$lib/server/challengeService';
import type { Actions } from './$types';
import type { Location, GroupClub } from '$lib/types/types.d';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

const presetPoints = [10, 20, 50, 80, 100];

export const load: PageServerLoad = async ({params, request}) => {

    let referer = request.headers.get("referer")

    const clubs : GroupClub[] = await prisma.groupClub.findMany({});
    const locations : Location[] = await prisma.location.findMany({});

    let existingChallenge = null;

    if (params.challengeId) {
        const idInt = parseInt(params.challengeId, 10);
        
        if (!isNaN(idInt) && idInt > 0) {
            const challengeWithGroup = await prisma.challenge.findUnique({
                where: { challengeId: idInt },
                include: { group: true }
            });

            if (challengeWithGroup) {
                existingChallenge = {
                    ...challengeWithGroup,
                    groupName: challengeWithGroup.group.name
                };
            }
        }
    }

    return {
        clubs,
        locations,
        existingChallenge,
        presetPoints,
        referer
    };
};


export const actions : Actions = {
    // Action pour crée ou modifier : upsert
    upsert: async ({ request, locals }) => {
        try {
            const body = await request.json();
            body.userId = locals.user.id

            // Vérifie que le nombre de points entré est valide
            if (!presetPoints.includes(body.nbPoints))
                throw error(500, { message: 'Le nombre de points est invalide'});

            const savedChallenge = await saveChallenge(body);
            return { success: true, data: savedChallenge };
        } catch (err: any) {
            if (err.status) {
                throw error(err.status, { message: err.body?.message || 'Erreur de validation' });
            }
            throw error(500, { message: 'Impossible de sauvegarder le défi (Erreur Serveur).' });
        }
    }
} satisfies Actions;
