import { handle as handleAuth } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { Churros1ATo2A } from '$lib/env';

const handlePerms: Handle = async ({ event, resolve }) => {
    const currentPath = event.url.pathname;
	const session = await event.locals.auth();
    //console.log("entrée dans handle perms. session : ")//debug
    //console.log(session)//debug
	if (session?.uid) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: session.uid },
                include: {
                    groupBoard : true,
                    groupInte : true
                },
            });

            console.log(`[Churros Auth] Utilisateur synchronisé : ${user.id}`);
            //console.log(user)//debug
            event.locals.user = user;

            // Empecher l'accés dans les branches interdites aux utilisateurs normales
            const protectedRoutes = ['/proof', '/board'];
            if (protectedRoutes.some(route => currentPath.startsWith(route)) && (!user.groupBoard && !user.isAdmin )) {
                throw error(403, 'Accès interdit');
            }

        } catch (e) {
            if (e instanceof Response) throw e;
            console.error('PRISMA ERROR:', e);
        }
	}

    //Empecher l'acces au 1A ou non connéctées
    const forbidenRoutes = ['/proof', '/board', '/challenge'];
    if (forbidenRoutes.some(route => currentPath.startsWith(route)) && ( !session?.uid || (session.is1A && Churros1ATo2A))) { // 
        throw error(403, 'Accès interdit');
    }

	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handlePerms);

