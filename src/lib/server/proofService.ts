import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { Status, ProofInput } from '$lib/types/types.d';
import { UploadType } from '../../../prisma/generated/prisma/client' 
import { Churros1ATo2A } from '$lib/env';


async function canModifyProof(proofId: number, userId: string) {
    const proof = await prisma.proof.findUnique({
        where: { proofId: proofId }
    });

    if (!proof) {
        throw { status: 404, message: 'La preuve est introuvable' };
    }

    if (proof.status === Status.VALID) {
        throw { status: 409, message: 'Preuve déjà accepté' };
    }

    if (proof.status === Status.DENIED) {
        throw { status: 409, message: 'Preuve à été refusé, impossible de l\'approuver' };
    }

    //console.log("user : " , userId)//debug
    // si pas du bureau ou admin il est redirigée
    const userAutorisation = await prisma.user.findUnique({
        where : {id : userId},
        select : {
            isAdmin : true,
            groupBoard : {select :{groupId : true}}
        }
    });

    const groupProof = await prisma.proof.findUnique({
        where : {
            proofId : proofId
        },
        select : {
            challenge : {
                select :{groupId : true}
            }
        }
    })
    const groupIdProof = groupProof.challenge.groupId;

    //console.log("premiere partie if" , userAutorisation.groupBoard.some(board => board.groupId === groupIdProof))//debug
    //console.log("deuxieme partie if" , userAutorisation.isAdmin)//debug
    if(!userAutorisation.groupBoard.some(board => board.groupId === groupIdProof) && !userAutorisation.isAdmin){
        console.log("ici")//debug
        throw error(402,"tu ne fais pas partie du bureau du club")
    }
}

export async function newProof(body: ProofInput) {
    //console.log("upload new proof")//debug
    const { challengeId, userId, type, content, isOkTVn7 } = body;

    const challenge = await prisma.challenge.findFirst({
        where: { challengeId: challengeId }
    });

    if (!challenge) {
        throw error(404, `Challenge non trouvé: ${challengeId}`);
    }

    if (!Object.values(UploadType).includes(type as UploadType)) {
        throw error(404, `Type de challenge non trouvé: ${type}`);
    }

    // Vérifie si l'utilisateur existe
    if(! await prisma.user.findUnique({where : {id :userId}})){
        throw error(403, "l'utilisateur n'existe pas")
    }

    //verifier que c'est bien un is1A    
    if ((await prisma.user.findUnique({where : {id : userId}, select : {is1A:true}})) && Churros1ATo2A){   
        throw error(403, 'Tu n\'es pas un 1A');
    }

    //on ne peut pas envoyé plusieur preuve par groupe d'inté TODO
    if (
        await prisma.challenge.findFirst({
            where: {
                challengeId: challengeId,
                groupInteSucceed: {
                    users: { some: { id: userId } }
                }
            },
            select: { challengeId: true }
        })
    )
    {
        throw error(403, "Challenge déjà fait par un membre de ton groupe d'intégration.")
    }

    const coreData = {
        user: {
            connect: { id: userId }
        },
        content: content,
        type: type,
        challenge: {
            connect: {challengeId: challengeId}
        },        
        status: Status.PENDING,
        isOkTVn7: isOkTVn7,
        date: new Date()
    };

    return await prisma.proof.create({
        data: {
            ...coreData,
        }
    });
}

/** Accepter une preuve. 
    * @param proofId identifiant de la preuve
* @param userId identifiant de l'utilisateur ayant valider la preuve
*/
export async function approveProof(proofId: number, userId: string) {
    console.log("entre accepte preuve") // debug
    await canModifyProof(proofId, userId);

    const updatedProof = await prisma.proof.update({
        where: { proofId: proofId },
        data: {
            status: Status.VALID,
            validatorId: userId
        }
    });

    return updatedProof;
}


/** refuser une preuve. 
    * @param proofId identifiant de la preuve
* @param userId identifiant de l'utilisateur ayant valider la preuve
*/
export async function denyProof(proofId: number, userId: string) {

    await canModifyProof(proofId, userId);

    const updatedProof = await prisma.proof.update({
        where: { proofId: proofId },
        data: {
            status: Status.DENIED,
            validatorId: userId
        }
    });

    return updatedProof;
}

/** Mise a jour des points de l'utilisateur
* et des groupe reussisant le challenge 
* @param proofId identifiant de la preuve qui à été modifier
*/
export async function pointsUpdate(proofId: number ){
    const data = await prisma.proof.findUnique({
        where : {
            proofId : proofId
        },
        select : {
            userId : true,
            user : {select : {points : true,
                groupInteId : true,
                groupInte : {select :{points : true}}}
            },
            challengeId : true,
            challenge : {select : {nbPoints : true}}
        }
    })

    let newPointUser : number ;


    newPointUser = data.challenge.nbPoints + data.user.points ;
    console.log("mise a jour des points");//debug
    console.log(newPointUser);//debug
    const newPointGroup : number = data.challenge.nbPoints + data.user.groupInte.points ;

    const groupInteUpdate = await prisma.groupInte.update({
        data : { points : newPointGroup,
            challengeSucceed : {connect : {challengeId : data.challengeId}}
        },
        where : {groupId : data.user.groupInteId}
    })

    const userUpdate = await prisma.user.update({
        data : { points : newPointUser},
        where : {id : data.userId}
    })

    return 

}
