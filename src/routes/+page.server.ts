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

    const defi1 : ChallengeRead = {
        name: "Chocoblast un membre du bureau",
        description: "Effectuer un chocoblast sur : ...",
        groupInteSucced: [],
        type: "photo",
        nbPoints: "30"
    }

    const defi2 : ChallengeRead = {
        name: "Faire disparaitre une affiche du mur",
        description: "Faire disparaitre une affiche du mur sans qu'un membre s'en appeçoive",
        groupInteSucced: [],
        type: "photo",
        nbPoints: "15"
    }

    const defi3 : ChallengeRead = {
        name: "Se rouler par terre dans l'herbe",
        description: "Faire des roulades par terre",
        groupInteSucced: [],
        type: "video",
        nbPoints: "15"
    }

    const challenges : GroupChallenge[] = [
        { challenges: [defi1, defi2], name: "Net7", pictureURL: "" },
        { challenges: [defi3], name: "BDD", pictureURL: "" },
        { challenges: [], name: "BDA", pictureURL: "" },
        { challenges: [], name: "BDS", pictureURL: "" },
        { challenges: [], name: "Can7", pictureURL: "" },
        { challenges: [], name: "7robot", pictureURL: "" },
        { challenges: [], name: "Tvn7", pictureURL: "" },
        { challenges: [], name: "Test", pictureURL: "" },
    ]

	return {
        posts: {
            challenges,
            pendingChallengeCount
        }
	};
};
