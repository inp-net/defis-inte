import type { PageServerLoad } from './$types';
import type { Leaderboard, User } from '$lib/types/types.d';
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ params , locals}) => {

    // Pas encore type Leaderboard car manque propriété name
    const users: User[] = await prisma.user.findMany({
        orderBy: {
            points: 'desc',
        },
        where: {
            is1A: true
        },
        select: {
            firstName: true,
            lastName: true,
            profilePictureURL: true,
            points: true,
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: locals.user.id
        },
        select: {
            firstName: true,
            lastName: true,
            groupInte: {
                select: {
                    name: true,
                }
            }
        }
    });

    const groups = await prisma.groupInte.findMany({
        select: {
            name: true,
            pictureURL: true,
            usersInte: {
                select: {
                    points: true,
                }
            }
        }
    });

    // Calcul le total de point de chaque groupe à partir des points de ses utilisateurs et order by desc 
    const groupLeaderboard: Leaderboard[] = groups.map((group) => {
        const totalPoints = group.usersInte.reduce((sum : number, user) => sum + user.points, 0);
        return {
            name: group.name,
            pictureURL: group.pictureURL,
            points: totalPoints,
        };
    }).sort((a, b) => b.points - a.points);



    return {
        posts: {
            groupLeaderboard,
            users,
            user // TODO - le name est inaccessible : {groupName : user.groupInte.name, id : user.id}
        }
    };
};
