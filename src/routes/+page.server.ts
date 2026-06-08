import type { PageServerLoad } from './$types';
import type { GroupChallenge, ChallengeRead } from '$lib/types/types.d';
import {prisma} from "$lib/server/prisma";

//debug
const fields = await prisma.$queryRaw`
  SELECT column_name FROM information_schema.columns 
  WHERE table_name = 'Challenge'
`;
console.log(fields);
console.log(Object.keys(prisma.challenge.fields));
//debug

export const load: PageServerLoad = async () => {

    const allChallengesUntyped = await prisma.challenge.findMany({
        where: { isDeleted: false },
        select: {
            // D'après internet c'est plus rapide
            challengeId: true,
            name: true,
            description: true,
            type: true,
            nbPoints: true,
            locationName: true,
            defiAccepte: true,
            isDeleted: true,
            group: {
                select: {
                    name: true,
                    pictureURL: true,
                },
            },
        },
    })

    const allChallenges = allChallengesUntyped.map(({ group, ...challenge }) => ({
        ...challenge,
        groupName: group.name,
        groupUrl: group.pictureURL,
    }));

    const challenges : ChallengeRead[] = allChallenges.filter((a) => a.defiAccepte);
    const pendingChallengeCount = allChallenges.length - challenges.length;

    return {
        posts: {
            challenges,
            pendingChallengeCount
        }
    };
};
