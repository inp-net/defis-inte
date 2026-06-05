import type { PageServerLoad } from './$types';
import type { GroupChallenge, ChallengeRead } from '$lib/types/types.d.ts';
import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {

    const pendingChallengeCount = await prisma.challenge.count({
        where: {
            isDeleted: false,
            defiAccepte: false
        }
    });
    
    const challenges : ChallengeRead[] = await prisma.challenge.findMany({
        where: {
            isDeleted: false,
            defiAccepte: true
        }
    });

	return {
        posts: {
            challenges,
            pendingChallengeCount
        }
	};
};
