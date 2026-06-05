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

        console.log("met a jour ou crée l'utilisateur"); //debug
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
 * Verifie que c'est un groupe de postulant en testant si le nom du groupe correspond au format "groupe-*-202*"
 * @param chaine le nom du groupe à tester
 * @returns true si c'est un groupe de postulant, false sinon
 */
function FormatGroupPostulant(chaine: string): boolean {
    const modeleGroupPostulant = /^postulant.*$/; 
    return modeleGroupPostulant.test(chaine);
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
        // Parcours les groupes reçu de Authentik de l'utilisateurs
        console.log("parcours des club") //debug
        for (const dataGroup of userChurros.churrosGroups ) {
            // Teste si le groupe est dans la db
            console.log(dataGroup) //debug
            try {
                if (FormatGroupInte(dataGroup.group.uid)) {
                    groupInteId = dataGroup.group.uid;
                    const groupCree = await prisma.groupInte.findUnique({ where: { groupId: dataGroup.group.uid } });
                    //si le groupe n'est pas dans la db on synchronise le groupes de churros avec la db
                    if (groupCree == null){
                        const groupAdded = await syncGroupFromChurros(dataGroup.group.uid);
                    }
                }else if (!FormatGroupPostulant(dataGroup.group.uid)) {
                    console.log("rentrer")//debug
                    const groupCree = await prisma.groupClub.findUnique({ where: { groupId: dataGroup.group.uid } });
                    console.log(groupCree)//debug
                    //si le groupe n'est pas dans la db on synchronise le groupes de churros avec la db
                    if (groupCree == null){
                        console.log("rentrer")//debug
                        const groupAdded = await syncGroupFromChurros(dataGroup.group.uid);
                        if (groupAdded) {
                            console.log("groppppp added   ", dataGroup.group.uid)//debug
                            group.push(dataGroup.group);
                            // On vérifie si l'utilisateur est dans un bureau du groupe et si oui on le connecte au groupe en base de données
                            if (dataGroup.secretary || dataGroup.president || dataGroup.vicePresident || dataGroup.treasurer) {
                                groupBoard.push(dataGroup.group);
                            }
                        }
                    }else{
                        console.log("deja add  ", dataGroup.group.uid)//debug

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

            // On vérifie si l'utilisateur est dans un bureau du groupe et si oui on le connecte au groupe en base de données
            /*if (dataGroup.secretary || dataGroup.president || dataGroup.vicePresident || dataGroup.treasurer) {
                groupBoard.push(dataGroup.group);
            }*/
        }

        console.log("---------------------------------") //debug
        console.log(group)//debug
        console.log("---------------------------------")//debug
        console.log(groupBoard)//debug
        console.log("---------------------------------")//debug


        const commonData = {
            name: userChurros.fullName,
            profilePictureURL: userChurros.pictureURL ,
            is1A: userChurros.yearTier === 1 ? true : false,
            group: {
                connect: (group || []).map(g => ({
                    groupId: g.uid
                }))
                },
            groupBoard :{
                connect: (groupBoard || []).map(g => ({
                    groupId: g.uid
                }))
                },
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