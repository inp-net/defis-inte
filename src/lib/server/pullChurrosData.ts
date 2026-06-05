
import { PrismaClient, Prisma } from '@prisma/client';
import { DATABASE_URL } from '$env/static/private';


export async function syncGroupFromChurros (groupId: string) {
    //si pas dans la db on recupere sur churros le group
                    const response = await fetch('https://churros.inpt.fr/graphql', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            query: `
                            {
                                groups {
                                where: { uid: "${groupId}" }
                                    name
                                    pictureURL
                                    type
                                }
                            }
                            `
                        })
                    });
    
                    // on rajoute le groupe dans la db
                    const data = await response.json();
                    const groupData = data.data.groups[0];
                    if (groupData.type === 'Club' ||  groupData.type === 'Association') {
                        await prisma.GroupClub.create({
                            data: {
                                groupId: groupId,
                                name: groupData.name,
                                pictureURL: groupData.pictureURL
                            }
                        });
                    }else if (groupData.type === 'Integration') {
                        await prisma.GroupInte.create({
                            data: {
                                groupId: groupId,
                                name: groupData.name,
                                pictureURL: groupData.pictureURL
                            }
                        });
                    }
}