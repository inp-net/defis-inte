import type { PageServerLoad } from './$types';
import type { Category } from '$lib/types/types.d';

export const load: PageServerLoad = async () => {

    let returnCategories : Category[]  = [
        { key: "Stats Groupe", valeurs: ["Vous avez 0 points", "Gros nul"]},
    ];

    returnCategories.push(
    );

    return {
        returnCategories
    };
};
