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
