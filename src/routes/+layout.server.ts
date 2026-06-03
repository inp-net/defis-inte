import type { ServerLoad } from '@sveltejs/kit';

console.log('LAYOUT SERVER LOADED'); //debugs

export const load: ServerLoad = async ({ locals }) => {
    return {
        user: locals.user,
    };
};
