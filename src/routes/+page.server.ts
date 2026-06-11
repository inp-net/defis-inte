import type { PageServerLoad } from './$types';
import { ProofInput, type ChallengeRead } from '$lib/types/types.d';
import { saveProof, newProof } from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import { fail, type Actions } from '@sveltejs/kit';
import { uploadUserFile } from '$lib/server/filesManagement';


// explication user le locals doit etre entre crochet pour la destructuration
export const load: PageServerLoad = async ({locals}) => {
console.log("on est sur le /")//debug

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

    //explication user
    const session = await locals.auth();
    const user = locals.user;
    console.log("le user")
    console.log(user)
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
        const challengeId = parseInt(data.get('userId') as string, 10);
        const type = data.get('type') as string;
        const textePreuve = data.get('textePreuve') as string;
        const files: File[] = data.get('file');
        const isOkTVn7 = data.get('isOkTVn7') === "true";
        const userId = data.get('userId') as string;

        let content : String[] = [];
        if (textePreuve){
            content = [textePreuve]
        } else {
            for (const file of files){
                const url = uploadUserFile(file, userId);
                content.push(url)
            }
        }
        const body: ProofInput = { challengeId, userId, type, content, isOkTVn7 } 
        
        try {
            const proof = await newProof(body);
            return { 
                success: true,
                proof: proof
            };
        } catch (error: any) {
            if (error.status && error.message) {
                return fail(error.status, { 
                    message: error.message,
                });
            }
            console.error('Action Error:', error);
            return fail(500, { 
                message: 'Impossible accepter le défi' 
            });
        }
    }
}
