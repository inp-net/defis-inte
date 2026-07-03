import { prisma } from '$lib/server/prisma';
import { FormatGroupInte, FormatGroupPostulant } from './formaCheck';
import { env as privatEnv } from '$env/dynamic/private';

const ENABLE_MOCK_AUTH: boolean = privatEnv.ENABLE_MOCK_AUTH === 'true';

// RECUPERER DES DONNEES DE CHURROS

/** Recupere un groupe de churros pour le rajoutée dans notre DB
 * On cherche a récuperer que les club et assos actives ainsi que les groupes d'inté de cette année
 * @param groupId 
 * @return true si club/asso, null si groupe d'inté, false sinon
 */
export async function syncGroupFromChurros(groupId: string): Promise<boolean | null> {
    let groupData;

    if (ENABLE_MOCK_AUTH) {
        // --- MODE MOCK ---
        const isInte = groupId.toLowerCase().includes('inte') || groupId.startsWith('ae-'); 
        
        groupData = {
            name: `Faux Groupe ${groupId.toUpperCase()}`,
            pictureURL: "https://picsum.photos/200",
            type: isInte ? 'Integration' : 'Club'
        };
    } else {
        // --- MODE PRODUCTION ---
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

        const dataPull = await response.json();
        groupData = dataPull?.data?.group;
    }

    // Sécurité au cas où l'API (ou le mock) renvoie un groupe vide
    if (!groupData) return false;

    // Le reste de ta logique Prisma reste strictement identique
    const update = {
        name: groupData.name,
        pictureURL: groupData.pictureURL
    };
    const create = {
        groupId: groupId,
        name: groupData.name,
        pictureURL: groupData.pictureURL
    };

    if ((groupData.type === 'Club' || groupData.type === 'Association'
        || groupData.type === 'StudentAssociationSection') && !FormatGroupPostulant(groupId)) {

        await prisma.groupClub.upsert({
            where: { groupId: groupId }, 
            update,
            create
        });
        return true;
    } else if (groupData.type === 'Integration' && FormatGroupInte(groupId)) {

        await prisma.groupInte.upsert({
            where: { groupId: groupId }, 
            update,
            create
        });
        return null;
    }
    return false;
}
