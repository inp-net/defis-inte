import type { UserChurros } from '$lib/types/types';
import { PrismaClient, Prisma } from '../../../prisma/generated/client.ts';   // lien vers ou le prisma client est généré

import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL } from '$env/static/private';

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
/**
 * Instance de Prisma à utiliser
 */
export const prisma = new PrismaClient({adapter});

/**
 * Insère ou met à jour un utilisateur dans la base de données à partir des infos d'authentik
 * @param userChurros Les informations de l'utilisateur provenant de Churros (Authentik)
 * @returns true si l'opération a réussi, false sinon
 */
export async function userChurrosToPrisma(userChurros: UserChurros): Promise<boolean> {
    try {
        const id = userChurros?.uid;
        if (!id) {
            console.error("UID manquant pour l'utilisateur");
            return false;
        }

        const { create, update } = formatUserForPrisma(userChurros);

        //met a jour ou crée l'utilisateur
        await prisma.user.upsert({   
            where: { id },
            update,
            create
        });

        return true;

    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        return false;
    }
}

/**
 * Formate un utilisateur Churros pour l'adapter au format actuel en base de données
 * @param userChurros L'utilisateur à formater
 * @returns Les données formatées pour la création et la mise à jour
 */
function formatUserForPrisma(userChurros: UserChurros): {
    create: Prisma.UserCreateInput;
    update: Prisma.UserUpdateInput;
} {
    console.log('Formatage de l\'utilisateur pour Prisma', userChurros); //debug
    const commonData = {
        name: userChurros.fullName,
        profileURL: userChurros.pictureURL ,
        admin: false,
    };

    const create: Prisma.UserCreateInput = {
        id: userChurros.uid,
        ...commonData
    };

    const update: Prisma.UserUpdateInput = {
        ...commonData
    };

    return { create, update };
}