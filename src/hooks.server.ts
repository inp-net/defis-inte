import { handle as handleAuth } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const handlePerms: Handle = async ({ event, resolve }) => {
    const currentPath = event.url.pathname;
	const session = await event.locals.auth();

    console.log("uid:", session?.uid);
    console.log("Session :", JSON.stringify(session, null, 2));
	if (session?.uid) {
        try {
            const fallbackName = session.user?.name || session.uid;
            const userFirstName = session.user?.firstName || fallbackName;
            const userLastName = session.user?.lastName || "Inconnu";

            const user = await prisma.user.upsert({
                where: { id: session.uid },
                include: {
                    groupBoard : true,
                    groupInte : true
                },
                update: {
                    firstName: userFirstName,
                    lastName: userLastName,
                },
                create: {
                    id: session.uid,
                    firstName: userFirstName,
                    lastName: userLastName,
                    is1A: true,
                    isAdmin: false,
                    points: 0
                },
                include: {
                    groupBoard: true,
                    groupInte: true
                }
            });

            console.log(`[Churros Auth] Utilisateur synchronisé : ${user.id}`);
            event.locals.user = user;

            // Empecher l'accés dans les branches interdites aux utilisateurs normales
            const protectedRoutes = ['/admin', '/board'];
            if (protectedRoutes.some(route => currentPath.startsWith(route)) && (!user.groupBoard || user.isAdmin )) {
                throw error(403, 'Accès interdit');
            }

        } catch (e) {
            if (e instanceof Response) throw e;
            console.error('PRISMA ERROR:', e);
        }
	}
    // Si pas connecter rediriger vers la page de connection
    if(!session?.uid && !currentPath.endsWith('/connection')){
        throw redirect(302, '/connection');
    }
	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handlePerms);

