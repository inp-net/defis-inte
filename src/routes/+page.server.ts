import type { PageServerLoad } from './$types';
import type { GroupChallenge, ChallengeRead } from '$lib/types/types.d.ts';
import prisma from "$lib/prisma";

export const load: PageServerLoad = async ({ params }) => {

    const pendingChallengeCount = await prisma.challenge.count({
        where: {
            isDeleted: false,
            defiAccepte: false
        }
    })

    const clubsWithChallenges = await prisma.groupClub.findMany({
        include: {
            challenge: true,
        },
    });

    const challenges: GroupChallenge[] = clubsWithChallenges.map((club) => ({
        name: club.name,
        pictureURL: club.pictureURL ?? "",
        challenges: club.challenge,
    }))
    
    challenges.filter(a => !a.isDisabled);

	return {
        posts: {
            challenges,
            pendingChallengeCount
        }
	};
};
