import { prisma } from '$lib/server/prisma'

// RECUPERER DES DONNEES DE CHUROOS


/** Recupere un groupe de churros pour le rajoutée dans notre DB
 * @param groupId 
 * @return true si le groupe a été ajouté dans la db, false sinon
 */
export async function syncGroupFromChurros(groupId: string) {

    //on recupere sur churros le group
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

    // on rajoute le groupe dans la db en fonction de si c'est un club ou un group d'inté
    const dataPull = await response.json();
    const groupData = dataPull.data.group;

    const update = {
            name: groupData.name,
            pictureURL: groupData.pictureURL
        };
    const create = {
            groupId: groupId,
            name: groupData.name,
            pictureURL: groupData.pictureURL
        };

    if (groupData.type === 'Club' || groupData.type === 'Association' || groupData.type === 'StudentAssociationSection') {

        await prisma.groupClub.upsert({
            where: {
                groupId: groupId
            },update,
            create
        });
        return true;
    } else if (groupData.type === 'Integration') {

        await prisma.groupInte.upsert({
            where: {
                groupId: groupId
            },update,
            create
        });
        return true;
    }
    return false;
}