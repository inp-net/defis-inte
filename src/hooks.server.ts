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
            event.locals.user = await prisma.user.findUnique({
                where: { id: session.uid }
            });
        } catch (e) {
            console.error('PRISMA ERROR:', e);
        }
	}

    // Gestion authorisation de connexion
    const protectedRoutes = ['/admin', '/board'];
    const currentPath = event.url.pathname;

    // Si pas connecter rediriger vers la page de connection
    if (!session){
        throw redirect(302, '/connection');
    }

    const droitUser = await prisma.user.findUnique({
        where: {
            id : event.locals.user.id
        },
        select:{
            groupBoard : true,
            isAdmin :true
        }
    });

    // Empecher l'accés dans les branches interdites aux utilisateurs normales
    if (protectedRoutes.some(route => currentPath.startsWith(route)) && (!droitUser.groupBoard || droitUser.isAdmin )) {
        throw error(403, 'Accès interdit');
    }

	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handlePerms);

