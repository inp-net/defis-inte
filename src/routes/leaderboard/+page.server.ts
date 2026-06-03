import type { PageServerLoad } from './$types';
import type { GroupLeaderboard } from '$lib/types/types.d.ts';

export const load: PageServerLoad = async ({ params }) => {

    // TODO récupérer groups de la DB.
    // Ils doivent arriver trier dans la page
    const groups : GroupLeaderboard[] = [
        { name: "Groupe 8", points: "1025" },
        { name: "Groupe 9", points: "224" },
        { name: "7Groupe7", points: "24" },
        { name: "Un group qui possède un nom très long", points: "0" },
    ];

	return {
        posts: {
            groups
        }
	};
};
