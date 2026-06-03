import { handle as handleAuth } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { prisma } from '$lib/server/prisma';

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

	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handlePerms);