import { error } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import type { Challenge } from '$lib/types/types.d.ts';
import prisma from "$lib/prisma";

export const load: PageServerLoad = async ({ params }) => {
    const clubs = await prisma.groupClub.findMany({});
    const locations = await prisma.location.findMany({});

    let existingChallenge = null;
    let fallbackId = 0;

    if (params.challengeId) {
        const idInt = parseInt(params.challengeId, 10);
        
        if (!isNaN(idInt) && idInt > 0) {
            fallbackId = idInt;
            
            existingChallenge = await prisma.challenge.findUnique({
                where: { challengeId: idInt }
            });
        }
    }

    return {
        clubs,
        locations,
        existingChallenge
    };
};

