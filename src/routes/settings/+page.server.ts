import type { PageServerLoad } from './$types';
import { error, fail, type Actions } from '@sveltejs/kit';
import { canUseAdmin, recomptePoints } from '../../lib/server/adminCommand';
import { switchMode, switchTVn7 } from '$lib/server/userService';

export const load: PageServerLoad = async ({ locals }) => {
    return {
        user: locals.user
    };
}

export const actions: Actions = {
    modifyDarkMode: async ({ request, locals, cookies }) => {
        if (!locals.user) return fail(401, { message: 'Non authentifié' });

        const data = await request.formData();
        const darkMode = data.get("darkMode") === "true";

        try {
            if (!locals.user) return fail(401, { message: 'Non authentifié' });

            try {
                await switchMode(darkMode, locals.user.id);
                return { success: true };
            } catch (error: any) {
                if (error.status && error.message) {
                    return fail(error.status, { message: error.message });
                }
                console.error('Action Error:', error);
                return fail(500, { message: 'Impossible de modifier le paramètre' });
            }

            cookies.set("theme", darkMode ? "dark" : "light", {
                path: "/",
                maxAge: 60 * 60 * 24 * 365,
                sameSite: "lax",
                httpOnly: false
            });

            return { success: true };
        } catch (error: any) {
            return fail(500, { message: 'Impossible de modifier le thème' });
        }

    },

    modifyOkTVn7: async ({ request, locals }) => {
        if (!locals.user) return fail(401, { message: 'Non authentifié' });

        const data = await request.formData();
        const okTVn7 = data.get('okTVn7') === "true";

        try {
            await switchTVn7(okTVn7, locals.user.id);
            return { success: true };
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, { message: error.message });
            }
            console.error('Action Error:', error);
            return fail(500, { message: 'Impossible de modifier le paramètre' });
        }
    },

    recomputePoints: async ({ locals }) => {
        try {

            if (!locals.user) {
                throw error(403, "utilisateur non connecté");
            }

            const userId = locals.user.id;
            await canUseAdmin(userId);
            await recomptePoints();
            return { success: true };
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, {
                    message: error.message,
                });
            }
            console.error('Action Error:', error);
            return fail(500, {
                message: 'Impossible de recalculer les points'
            });
        }
    }
}
