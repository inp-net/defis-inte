import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import path, { extname } from 'path';
import type { Status } from '../../../prisma/generated/prisma/enums';
import {prisma} from './prisma'
import * as crypto from 'node:crypto';
import { dirname, join } from 'path';
import { fileURLToPath } from 'node:url';
import {uploadUserFile} from './filesManagement';


/**
 * Crée une nouvelle preuve pour un défi donné, avec éventuellement du texte et/ou un fichier associé ou utilisateur qui valide la preuve.
 * Nécessite d'être connecté.
 * @param userId Id de l'utilisateur qui crée la preuve
 * @param defiId L'id du defi auquel la preuve est associée
 * @param text Le texte de la réponse au defi (Null si defi non textuel)
 * @param file Le fichier (image ou vidéo) de la preuve (Null si defi non visuel)
 * @param validatorId L'id de l'utilisateur qui valide la preuve (Null pas un defi à scanner)
 * @returns La preuve créée dans la base de données
 * @throws {Error} DEFI_NOT_FOUND Si le defi associé n'existe pas
 * @throws {Error} TEXT_REQUIRED Si le defi est de type textuel et que le texte n'est pas fourni
 * @throws {Error} FILE_REQUIRED Si le defi est de type visuel et que le fichier n'est pas fourni
 * @throws {Error} VALIDATOR_REQUIRED Si le defi est à scanner et que l'id du validateur n'est pas fourni
 * @throws {Error} Si prisma rencontre une erreur lors de la création de la preuve
 */
export async function createPreuveDefi(
    userId: string,
    challengeId: number,
    text?: string,
    files?: FileList,
    validatorId?: string,
    hasCededImageRights?: boolean
) {
    // Récupere le groupe d'inté
    const groupInteId = await prisma.user.findUnique({where : {id : userId}, select : {groupInteId : true}});

    //Check du type de defi et des champs associés (ex: un defi à scanner ne doit pas avoir de texte ou de fichier associé)
    //Un defi ne peut etre upload deux fois 
    const deficheck = await prisma.proof.findFirst({
        where: { challengeId, user : {groupInteId : groupInteId?.groupInteId}, 
            OR: [
                {
                    status:'PENDING'
                },
                {
                    status:'VALID'
                }
            ] }
    });
    if (deficheck) {
        console.log("Preuve déjà existante pour ce défi et ce groupe" + userId);
        throw new Error('PREUVE_ALREADY_EXISTS');
    }

    const defi = await prisma.challenge.findUnique({
        where: { challengeId: challengeId }
    });

    if (!defi) {
        throw new Error('DEFI_NOT_FOUND');
    }

    switch (defi.type) {
        case 'TEXT':
            if (!text) {
                throw new Error('TEXT_REQUIRED');
            }
            const preuve = await prisma.proof.create({
                data: {
                    type:defi.type,
                    userId,
                    challengeId,
                    content : [text],
                    date: new Date()
                }
            });
            return preuve;
        case 'PHOTO':
        case 'VIDEO':
            if (!files) {
                throw new Error('FILE_REQUIRED');
            }

            const uploadedFiles: string[] = [];
            // Ajoute tout les fichiers qui ont été envoyer
            for (const file of files ){
                uploadedFiles.push(await uploadUserFile(file, userId)) ;
            }

            const preuveVisuelle = await prisma.proof.create({
                data: {
                    type:defi.type,
                    userId,
                    challengeId,
                    content : uploadedFiles,
                    date: new Date(),
                    hasCededImageRights
                }
            });
            return preuveVisuelle;
        //si on rajoute les qr code 
        /*case 'QRCODE':
            if (!validatorId) {
                throw new Error('VALIDATOR_REQUIRED');
            }
            const preuveQrCode = await prisma.proof.create({
                data: {
                    userId,
                    defiId,
                    validatorId
                }
            });
            return preuveQrCode;*/
    }
}

/**
 * Modifie le statut d'une preuve defi donnée.
 * Nécessite d'être connecté en tant qu'admin.
 * @param proofId L'id de la preuve à modifier
 * @param status Le nouveau statut à attribuer à la preuve ('PENDING', 'APPROVED', 'REJECTED')
 * @returns La preuve mise à jour
 * @throws {Error} Si prisma rencontre une erreur lors de la modification de la preuve
 */
export async function modifyPreuveDefi(proofId: string, status: string, validatorId : string) {
	const updated = await prisma.proof.update({
		where: { proofId: proofId },
		data: {
			status: status as Status,
            validatorId : validatorId
		}
	});

	return updated;
}

/**
 * Renvoie toutes les preuves de défi
 * Nécessite d'être connecté en tant qu'admin.
 * @returns toutes les preuves de défi avec les informations associées (défi, utilisateur)
 * @throws {Error} Si prisma rencontre une erreur lors de la récupération des preuves
 */
export async function getAllPreuvesDefi() {
	const proofs = await prisma.proof.findMany({
		orderBy: [{ date: 'desc' }],
		include: { challenge: true, userId: true }
	});
	return proofs;
}

/**
 * Renvoie toutes les preuves de défi d'un club
 * Nécessite d'être connecté en tant que board.
 * @param groupid club dont on veut les preuves 
 * @returns toutes les preuves de défi avec les informations associées (défi, utilisateur)
 * @throws {Error} Si prisma rencontre une erreur lors de la récupération des preuves
 */
export async function getClubPreuvesDefi(groupid : string) {
	const proofs = await prisma.proof.findMany({
		where: {challenge:{groupId : groupid}},
		orderBy: [{ date: 'desc' }],
		include: { challenge: true, userId: true }
	});
	return proofs;
}