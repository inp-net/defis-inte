import type { PageServerLoad } from './$types';
import type { Leaderboard, UserLeaderboard } from '$lib/types/types.d';
import { prisma } from "$lib/server/prisma";
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals}) => {

    // Pas encore type Leaderboard car manque propriété name
    const users: UserLeaderboard[] = await prisma.user.findMany({
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


    if (!locals.user) {
        throw error(403, "utilisateur non connecté");
    }

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

    if (!user) {
        throw error(404, "utilisateur introuvable");
    }

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
            groupName: user.groupInte?.name ?? null
        };
    }).sort((a, b) => b.points - a.points);

    return {
        posts: {
            groupLeaderboard,
            users,
            user: user ? {
                firstName: user.firstName,
                lastName: user.lastName,
                groupName: user.groupInte?.name ?? null
            } : null
        }
    };
};
