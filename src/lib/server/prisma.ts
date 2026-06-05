import type { UserChurros } from '$lib/types/types';
import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL } from '$env/static/private';
import { syncGroupFromChurros } from './pullChurrosData';

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

        const { create, update } = await formatUserForPrisma(userChurros);

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
 * Verifie que c'est un groupe d'Intégration en testant si le nom du groupe correspond au format "groupe-*-202*"
 * @param chaine le nom du groupe à tester
 * @returns true si c'est un groupe d'intégration, false sinon
 */
function FormatGroupInte(chaine: string): boolean {
    const modeleGroupInte = /^groupe-.*-202.*$/;
    
    return modeleGroupInte.test(chaine);
}

/**
 * Formate un utilisateur Churros pour l'adapter au format actuel en base de données
 * Et ajoute les groupes de l'utilisateur dans la base de données s'ils n'y sont pas déjà
 * @param userChurros L'utilisateur à formater
 * @returns Les données formatées pour la création et la mise à jour
 */
async function formatUserForPrisma(userChurros: UserChurros): Promise<{
    create: Prisma.UserCreateInput;
    update: Prisma.UserUpdateInput;
}> { 
    console.log('GROUPES:', JSON.stringify(userChurros.churrosGroups, null, 2)); //debug
    console.log('Formatting user for Prisma:', userChurros); //debug

    let groupInteId = null;
    let groupBoard = []
        // Parcours les groupes reçu de Authentik de l'utilisateurs
        for (const group of userChurros.churrosGroups ) {
            // Teste si le groupe est dans la db
            try {
                if (FormatGroupInte(group.group.uid)) {
                    groupInteId = group.group.uid;
                    await prisma.GroupInte.findUnique({ where: { groupId: group.group } });
                }else {
                    await prisma.GroupClub.findUnique({ where: { groupId: group.group } });
                }
            } 
            catch (error) {
                //si le groupe n'est pas dans la db on synchronise le groupes de churros avec la db
                await syncGroupFromChurros(group.group.uid);
            }

            // On vérifie si l'utilisateur est dans un bureau du groupe et si oui on le connecte au groupe en base de données
            if (group.secretary || group.president || group.vicePresident || group.treasurer) {
                groupBoard.push(group.group);
            }
        }

        const commonData = {
        name: userChurros.fullName,
        profilePictureURL: userChurros.pictureURL ,
        isAdmin: false,
        is1A: userChurros.yearTier === 1 ? true : false,
        group : userChurros.churrosGroups,
        groupBoard : groupBoard,
        groupInteId : groupInteId

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