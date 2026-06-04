import type { PageServerLoad } from './$types';
import type { GroupChallenge, ChallengeRead } from '$lib/types/types.d.ts';

export const load: PageServerLoad = async ({ params }) => {

    const defi1 : ChallengeRead = {
        name: "Chocoblast un membre du bureau",
        description: "Effectuer un chocoblast sur : ...",
        groupInteSucced: [],
        type: "photo",
        nbPoints: "30",
        defiAccepte: false,
    }

    const defi2 : ChallengeRead = {
        name: "Faire disparaitre une affiche du mur",
        description: "Faire disparaitre une affiche du mur sans qu'un membre s'en appeçoive",
        groupInteSucced: [],
        type: "photo",
        nbPoints: "15",
        defiAccepte: true,
    }

    const defi3 : ChallengeRead = {
        name: "Se rouler par terre dans l'herbe",
        description: "Faire des roulades par terre",
        groupInteSucced: [],
        type: "video",
        nbPoints: "15",
        defiAccepte: false,
    }

    const defi4 : ChallengeRead = {
        name: "Chocoblast un membre du bureau",
        description: "Effectuer un chocoblast sur : ...",
        groupInteSucced: [],
        type: "photo",
        nbPoints: "30",
        defiAccepte: false,
    }

    const defi5 : ChallengeRead = {
        name: "Faire disparaitre une affiche du mur",
        description: "Faire disparaitre une affiche du mur sans qu'un membre s'en appeçoive",
        groupInteSucced: [],
        type: "photo",
        nbPoints: "15",
        defiAccepte: true,
    }

    const defi6 : ChallengeRead = {
        name: "Se rouler par terre dans l'herbe",
        description: "Faire des roulades par terre",
        groupInteSucced: [],
        type: "video",
        nbPoints: "15",
        defiAccepte: false,
    }

    const challenges : GroupChallenge[] = [
        { challenges: [defi1, defi2, defi5, defi6], name: "Net7", pictureURL: "" },
        { challenges: [defi3], name: "BDD", pictureURL: "" },
        { challenges: [], name: "BDA", pictureURL: "" },
        { challenges: [defi4], name: "BDS", pictureURL: "" },
        { challenges: [], name: "Can7", pictureURL: "" },
        { challenges: [], name: "7robot", pictureURL: "" },
        { challenges: [], name: "Tvn7", pictureURL: "" },
        { challenges: [], name: "Test", pictureURL: "" },
    ]

    return {
        posts: {
            challenges
        }
    };
};