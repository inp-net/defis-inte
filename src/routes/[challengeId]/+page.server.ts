import type { PageServerLoad } from './$types';
import type { Challenge } from '$lib/types/types.d.ts';
import prisma from "$lib/prisma";

export const load: PageServerLoad = async ({ params }) => {
    const challenge : Challenge = await prisma.challenge.findUnique({
        where: { challengeId: params.challengeId },
    });
    return {
        challenge,
    };
};
