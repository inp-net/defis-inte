import type { PageServerLoad } from './$types';
import { ProofInput, type ChallengeRead } from '$lib/types/types.d';
import { newProof } from '$lib/server/proofService';
import { prisma } from "$lib/server/prisma";
import { error, fail, type Actions } from '@sveltejs/kit';
import { uploadUserFile } from '$lib/server/filesManagement';

export const load: PageServerLoad = async ({ locals }) => {

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
        groupName: group.name ?? "",
        groupUrl: group.pictureURL ?? "",
    }));

    const challenges : ChallengeRead[] = allChallenges.filter((a) => a.defiAccepte);
    const pendingChallengeCount = allChallenges.length - challenges.length;

    const allPendingProofs = await prisma.proof.findMany({
        where: {status: "PENDING"}
    })


    const pendingProofCount = allPendingProofs.length; 

    //const session = await locals.auth();            sert a rien normalement
    const user = locals.user || null;
 
    return {
        posts: {
            challenges,
            pendingChallengeCount,
            pendingProofCount
        }, user : locals.user,
    };
};

export const actions: Actions = {
    save: async ({ request, locals }) => {
        const data = await request.formData();
        const challengeId = parseInt(data.get('challengeId') as string, 10);
        const type = data.get('type') as string;
        const textePreuve = data.get('textePreuve') as string;
        const files: File[] = data.getAll('file');
        const isOkTVn7 = data.get('isOkTVn7') === "true";
        const userId = locals.user.id;
        const maxFiles : number = 15;

        let content : String[] = [];

        try {
            if (textePreuve){
                content = [textePreuve]
            } else {
                if(files.length > maxFiles){
                    throw error (402, "Le nombre de fichier et limiter à 10")
                }
                for (const file of files){
                    const url = await uploadUserFile(file, userId);
                    content.push(url)
                }
            }
            const body: ProofInput = { challengeId, userId, type, content, isOkTVn7 } 
            // Verifie si c'est un 1A 
            if (!locals.user.is1A){
                throw error (402, "Tu n'es pas un 1A")
            }
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
