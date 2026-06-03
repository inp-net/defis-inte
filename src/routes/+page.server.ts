import type { PageServerLoad } from './$types';
import type { GroupChallenge, ChallengeRead } from '$lib/types/types.d.ts';

export const load: PageServerLoad = async ({ params }) => {

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

    const challenges : GroupChallenge[] = [
        { challenges: [defi1, defi2], name: "Net7", pictureURL: "" }
    ]

	return {
        posts: {
            challenges
        }
	};
};
