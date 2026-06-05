import type { PageServerLoad } from './$types';
import type { ChallengeRead, GroupChallenge } from '$lib/types/types.d.ts';
import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {

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

    return {
        posts: {
            challenges
        }
    };
};
