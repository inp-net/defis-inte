import { prisma } from '$lib/server/prisma';

/** Modifier le mode clair / sombre que prefere l'utilisateur en db
 * @param darkMode true si veux passer en darmode false sinon
 * @param userId uid de l'utilisateur 
 */
export async function switchMode(darkMode: boolean, userId: string) {

    await prisma.user.update({
        where: { id: userId },
        data: {
            darkMode: darkMode,
        }
    });

}


/** Modifier l'option OKTVN7 
 * @param okTVn7 true si accepte de donner par défault le droit à l'image
 * @param userId uid de l'utilisateur 
*/
export async function switchTVn7(okTVn7: boolean, userId: string) {

    await prisma.user.update({
        where: { id: userId },
        data: {
            isOkTVn7: okTVn7,
        }
    });

}
