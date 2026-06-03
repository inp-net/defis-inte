import type { ServerLoad } from '@sveltejs/kit';

console.log('PAGE SERVER LOADED'); //debugs

export const load: ServerLoad = async ({ locals }) => {
    return {
        user: locals.user,
    };
};
