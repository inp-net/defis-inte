import type { PageServerLoad } from './$types';
import type { GroupLeaderboard } from '$lib/types/types.d.ts';
import prisma from "$lib/prisma";

export const load: PageServerLoad = async ({ params }) => {

    // TODO récupérer groups de la DB.
    // Ils doivent arriver trier dans la page

    const groups: GroupLeaderboard[] = await prisma.groupInte.findMany({
    orderBy: {
        points: 'desc',
    },
    select: {
        name: true,
        pictureURL: true,
        points: true,
    }
});

    const userGroup : GroupLeaderboard = { name: "Un group qui possède un nom très long", points: "0" };

	return {
        posts: {
            userGroup,
            groups
        }
	};
};
