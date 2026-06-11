import type { PageServerLoad } from './$types';
import type { Category } from '$lib/types/types.d';

export const load: PageServerLoad = async ({locals}) => {

    let user = locals.user
    let groupPoints = user.groupInte.points

    let returnCategories : Category[]  = [
        { key: "Stats Groupe", valeurs: ["Vous avez "+groupPoints+(groupPoints <= 1 ? " point" : " points"), "Gros nul"]},
    ];

    returnCategories.push(
    );

    return {
        posts : {
            returnCategories
        }, user 
    };
};
