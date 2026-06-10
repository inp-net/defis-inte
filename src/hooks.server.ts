import { handle as handleAuth } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const handlePerms: Handle = async ({ event, resolve }) => {

	const session = await event.locals.auth();

	if (session?.uid) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: session.uid },
                select:{
                        groupBoard : true,
                        isAdmin :true
                    }
            });
            event.locals.user = {...event.locals.user, ...user};

            // Gestion authorisation de connexion
            const protectedRoutes = ['/admin', '/board'];
            const currentPath = event.url.pathname;

            // Si pas connecter rediriger vers la page de connection
            if (!session && !currentPath.endsWith('/connection')){
                throw redirect(302, '/connection');
            }

            // Empecher l'accés dans les branches interdites aux utilisateurs normales
            if (protectedRoutes.some(route => currentPath.startsWith(route)) && (!user.groupBoard || user.isAdmin )) {
                throw error(403, 'Accès interdit');
            }


        } catch (e) {
            console.error('PRISMA ERROR:', e);
        }
	}


	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handlePerms);

