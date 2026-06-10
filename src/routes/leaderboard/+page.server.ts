import type { PageServerLoad } from './$types';
import type { Leaderboard } from '$lib/types/types.d.ts';
import { prisma } from "$lib/server/prisma";


export const load: PageServerLoad = async ({ params }) => {

    const groups: Leaderboard[] = await prisma.groupInte.findMany({
        orderBy: {
            points: 'desc',
        },
        select: {
            name: true,
            pictureURL: true,
            points: true,
        }
    });

    const users : Leaderboard[] = await prisma.user.findMany({
        orderBy: {
            points: 'desc',
        },
        select: {
            name: true,
            profilePictureURL: true,
            points: true,
        }
    });

    return {
        posts: {
            groups,
            users
        }
    };
};
