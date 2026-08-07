import type { PageServerLoad } from './$types';
import { error, fail, type Actions } from '@sveltejs/kit';
import { canUseAdmin, recomptePoints } from '../../lib/server/adminCommand';
import { switchMode, switchTVn7 } from '$lib/server/userService';

export const load: PageServerLoad = async ({ locals }) => {
    return {
        user: locals.user
    };
};

export const actions: Actions = {
    modifyDarkMode: async ({ request, locals }) => {
        if (!locals.user) return fail(401, { message: 'Non authentifié' });

        const data = await request.formData();
        const darkMode = data.get('darkMode') === "true";

        try {
            await switchMode(darkMode, locals.user.id);
            return { success: true };
        } catch (err: any) {
            if (err.status && err.message) {
                return fail(err.status, { message: err.message });
            }
            console.error('Action Error:', err);
            return fail(500, { message: 'Impossible de modifier le paramètre' });
        }
    },

    modifyOkTVn7: async ({ request, locals }) => {
        if (!locals.user) return fail(401, { message: 'Non authentifié' });

        const data = await request.formData();
        const okTVn7 = data.get('okTVn7') === "true";

        try {
            await switchTVn7(okTVn7, locals.user.id);
            return { success: true };
        } catch (err: any) {
            if (err.status && err.message) {
                return fail(err.status, { message: err.message });
            }
            console.error('Action Error:', err);
            return fail(500, { message: 'Impossible de modifier le paramètre' });
        }
    },

    recomputePoints: async ({ locals }) => {
        try {
            if (!locals.user) {
                throw error(403, "Utilisateur non connecté");
            }

            const userId = locals.user.id;
            await canUseAdmin(userId);
            await recomptePoints();
            return { success: true };
        } catch (err: any) {
            if (err.status && err.message) {
                return fail(err.status, { message: err.message });
            }
            console.error('Action Error:', err);
            return fail(500, { message: 'Impossible de recalculer les points' });
        }
    }
};
