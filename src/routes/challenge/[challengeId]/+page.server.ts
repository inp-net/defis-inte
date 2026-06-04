import type { PageServerLoad } from "./$types";
import type { Challenge } from '$lib/types/types.d.ts';
import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {

    const clubs = await prisma.groupClub.findMany({});
    const locations = await prisma.location.findMany({});

    return {
        clubs,
        locations
    };
};

