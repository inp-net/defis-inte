import { prisma } from '$lib/server/prisma';

/** Modifier le mode clair / sombre */
export async function switchMode(darkMode: boolean, userId: string) {

    await prisma.user.update({
        where: { id: userId },
        data: {
            darkMode: darkMode,
        }
    });

}


/** Modifier l'option OKTVN7 */
export async function switchTVn7(okTVn7: boolean, userId: string) {

    await prisma.user.update({
        where: { id: userId },
        data: {
            isOkTVn7: okTVn7,
        }
    });

}
