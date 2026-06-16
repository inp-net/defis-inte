import { saveChallenge } from '$lib/server/challengeService';
import type { Actions } from './$types';
import type { Location, GroupClub } from '$lib/types/types.d';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

const presetPoints = [10, 20, 50, 80, 100];

export const load: PageServerLoad = async ({ params, locals }) => {

    const user = locals.user || null;

    const clubs : GroupClub[] = await prisma.groupClub.findMany({
        // Bypass si c'est un admin
        where: user.isAdmin ? {} : {
            users: {
                some: {
                    id: user.id
                }
            }
        }
    });
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
        presetPoints
    };
};


export const actions : Actions = {
    // Action pour crée ou modifier : upsert
    upsert: async ({ request, locals }) => {
        try {
            const body = await request.json();
            body.userId = locals.user.id;
            const user = locals.user;

            // Vérifie que le nombre de points entré est valide
            if (!presetPoints.includes(body.nbPoints))
                throw error(500, { message: 'Le nombre de points est invalide'});

            // Vérifie que l'utilisateur est bien dans le club
            if (clubs.find((club) => club.name === body.groupName)) {
                throw error(403, { message: "L'utilisateur n'appartient pas au club séléctionné" });
            }

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
