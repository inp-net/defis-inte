import type { PageServerLoad } from './$types';
import type { Category } from '$lib/types/types.d';
import type { Actions } from './$types';
import {canUseAdmin, reCalculPoint} from '../../lib/server/adminCommand';

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

export const actions : Actions = {
    // Action pour crée ou modifier : upsert
    reCalculPoints: async ({ locals }) => {
        const userId = locals.user.id
        canUseAdmin(userId);
        try {
            reCalculPoint();
        } catch (err: any) {
           }
    }
} satisfies Actions;
