import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { switchMode, switchTVn7 } from '$lib/server/userService';

export const load: PageServerLoad = async ({locals}) => {
    
    return {
        user : locals.user
    };
}

export const actions: Actions = {
    modifyDarkMode : async ({ request , locals}) => {
        const data = await request.formData();
        const darkMode = data.get('darkMode') === "true";

        try {
            await switchMode(darkMode, locals.user.id);
            return { success: true};
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, { 
                    message: error.message,
                });
            }
            console.error('Action Error:', error);
            return fail(500, { 
                message: 'Impossible de modifier le paramètre' 
            });
        }
    },
    modifyOkTVn7 : async ({ request , locals}) => {
        const data = await request.formData();
        const okTVn7 = data.get('okTVn7') === "true";

        try {
            await switchTVn7(okTVn7, locals.user.id);
            return { success: true};
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, { 
                    message: error.message,
                });
            }
            console.error('Action Error:', error);
            return fail(500, { 
                message: 'Impossible de modifier le paramètre' 
            });
        }
    },
}