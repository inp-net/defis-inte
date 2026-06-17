import type { PageServerLoad } from './$types';
import type { Leaderboard, User } from '$lib/types/types.d';
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

    // Pas encore type Leaderboard car manque propriété name
    const users: User[] = await prisma.user.findMany({
        orderBy: {
            points: 'desc',
        },
        select: {
            firstName: true,
            lastName: true,
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
