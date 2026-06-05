import type { UserChurros } from '$lib/types/types';
import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL } from '$env/static/private';
import {prisma} from '$lib/server/prisma'


/**
 * 
 * @param groupId 
 * @return true si le groupe a été ajouté dans la db, false sinon
 */
export async function syncGroupFromChurros (groupId: string) {
    console.log("Ajout groupe", groupId);
    //si pas dans la db on recupere sur churros le group
                    const response = await fetch('https://churros.inpt.fr/graphql', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            query: `
                            {
                                group(uid: "${groupId}") {
                                    name
                                    pictureURL
                                    type
                                }
                            }
                            `
                        })
                    });
    console.log("on rajoute le groupe dans la db "); //debug
                    // on rajoute le groupe dans la db
                    const data = await response.json();
                    const groupData = data.data.group;
                    if (groupData.type === 'Club' ||  groupData.type === 'Association') {
                        await prisma.groupClub.create({
                            data: {
                                groupId: groupId,
                                name: groupData.name,
                                pictureURL: groupData.pictureURL
                            }
                        });
                        console.log("Groupe ajouté dans la db : ", groupData.name); //debug
                    return true;
                    }else if (groupData.type === 'Integration') {
                        await prisma.groupInte.create({
                            data: {
                                groupId: groupId,
                                name: groupData.name,
                                pictureURL: groupData.pictureURL
                            }
                        });
                        console.log("Groupe ajouté dans la db : ", groupData.name); //debug
                    return true;
                    }
                    return false;
}