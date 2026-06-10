import type { PageServerLoad } from './$types';
import type { ChallengeRead, ProofRead } from '$lib/types/types.d';
import { saveProof } from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import { fail, type Actions } from '@sveltejs/kit';

//debug
const fields = await prisma.$queryRaw`
  SELECT column_name FROM information_schema.columns 
  WHERE table_name = 'Challenge'
`;
console.log(fields);
console.log(Object.keys(prisma.challenge.fields));
//debug

export const load: PageServerLoad = async (locals) => {

    const allChallengesUntyped = await prisma.challenge.findMany({
        where: { isDeleted: false },
        select: {
            // D'après internet c'est plus rapide
            challengeId: true,
            name: true,
            description: true,
            type: true,
            nbPoints: true,
            locationName: true,
            defiAccepte: true,
            isDeleted: true,
            group: {
                select: {
                    name: true,
                    pictureURL: true,
                },
            },
        },
    })

    const allChallenges = allChallengesUntyped.map(({ group, ...challenge }) => ({
        ...challenge,
        groupName: group.name,
        groupUrl: group.pictureURL,
    }));

    const challenges : ChallengeRead[] = allChallenges.filter((a) => a.defiAccepte);
    const pendingChallengeCount = allChallenges.length - challenges.length;

    const allPendingProofs = await prisma.proof.findMany({
        where: {status: "PENDING"}
    })


    const pendingProofCount = allPendingProofs.length; 

    return {
        posts: {
            challenges,
            pendingChallengeCount,
            pendingProofCount
        }, user : locals.user,
    };
};

export const actions: Actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        const challengeIdString = data.get('userId');

        const challengeId: number = (typeof challengeIdString === 'string') 
            ? parseInt(challengeIdString, 10)
            : NaN;

        const textePreuve = data.get('textePreuve');
        const files: File[] = data.get('file');
        const isOkTVn7 = data.get('isOkTVn7') === "true";




        try {
            const fallbackUserId = "00000000-0000-0000-0000-000000000000"; 
            const updatedProof = await saveProof(user.id, challengeId, textePreuve, files, isOkTVn7, fallbackUserId);
            return { 
                success: true,
                proof: updatedProof 
            };
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, { 
                    message: error.message,
                    proofId
                });
            }
            console.error('Action Error:', error);
            return fail(500, { 
                message: 'Impossible accepter le défi' 
            });
        }
    }
