import type { UserChurros } from '$lib/types/types';
import { PrismaClient, Prisma } from '../../../prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL } from '$env/static/private';
import { syncGroupFromChurros } from './pullChurrosData';
import {FormatGroupInte, FormatGroupPostulant} from './formaCheck'


/**
 * Je sais pas mais la doc le met et ca marche
 */
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

        //met à jour ou crée l'utilisateur
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
 * Et ajoute les groupes de l'utilisateur dans la base de données s'ils n'y sont pas déjà
 * @param userChurros L'utilisateur à formater
 * @returns Les données formatées pour la création et la mise à jour
 */
async function formatUserForPrisma(userChurros: UserChurros): Promise<{
    create: Prisma.UserCreateInput;
    update: Prisma.UserUpdateInput;
}> { 
    let groupInteId = null;
    let groupBoard = [];
    let group = [];

    // On cherche a récuperer que les club et assos actives ainsi que les groupes d'inté 

    // Parcours les groupes reçu de Authentik de l'utilisateurs
    for (const dataGroup of userChurros.churrosGroups ) {
        // Teste si le groupe est dans la db
        try {
            // Groupe d'inté
            if (FormatGroupInte(dataGroup.group.uid)) {
                groupInteId = dataGroup.group.uid;
                const groupFind = await prisma.groupInte.findUnique({ where: { groupId: dataGroup.group.uid } });
                //si le groupe n'est pas dans la db on synchronise le groupes de churros avec la db
                if (groupFind == null){
                    const groupAdded = await syncGroupFromChurros(dataGroup.group.uid);
                }
            
            // Club ou Assos
            }else if (!FormatGroupPostulant(dataGroup.group.uid)) {
                const groupFind = await prisma.groupClub.findUnique({ where: { groupId: dataGroup.group.uid } });
                //Si le groupe n'est pas dans la db on synchronise le groupes de churros avec la db
                // Fait pour éviter d'avoir ce que l'ont veut pas dans la db  
                if (groupFind == null){
                    const groupAdded = await syncGroupFromChurros(dataGroup.group.uid);
                    if (groupAdded) {
                        group.push(dataGroup.group);
                        // On vérifie si l'utilisateur est dans un bureau du groupe et si oui on le connecte au groupe en base de données
                        if (dataGroup.secretary || dataGroup.president || dataGroup.vicePresident || dataGroup.treasurer) {
                            groupBoard.push(dataGroup.group);
                        }
                    }
                }else{
                    group.push(dataGroup.group);
                    // On vérifie si l'utilisateur est dans un bureau du groupe et si oui on le connecte au groupe en base de données
                    if (dataGroup.secretary || dataGroup.president || dataGroup.vicePresident || dataGroup.treasurer) {
                        groupBoard.push(dataGroup.group);
                    }
                }
            } 
        } catch (error) {
            console.log("Erreur : ",  error)
        }
    }


    const commonData = {
        name: userChurros.fullName,
        profilePictureURL: userChurros.pictureURL ,
        is1A: userChurros.yearTier === 1 ? true : false,
        group: {connect: (group || []).map(g => ({groupId: g.uid}))}, 
        groupBoard :{connect: (groupBoard || []).map(g => ({groupId: g.uid}))},
        groupInteId : groupInteId,
        isAdmin: false
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