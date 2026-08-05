import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import path, { extname } from 'path';
import type { Status } from '../../../prisma/generated/prisma/enums';
import { prisma } from './prisma'
import * as crypto from 'node:crypto';
import { dirname, join } from 'path';
import { fileURLToPath } from 'node:url';
import type { GroupClub } from '~generated//client';
import { env } from '$env/dynamic/private';
import { convertToWebp, convertToWebVideo } from './conversion';

//types  fichier pris en compte
export const typePhotoFile = ['jpg', 'jpeg', 'png', 'heic', 'heif', 'webp', 'bmp', 'tiff', 'tif', 'avif'];
export const typeVideoFile = ['mp4', 'mov', 'webm', 'avi'];


// ENREGISTREMENT DE FICHIER

const SECRET: string = env.BETTER_AUTH_SECRET!;

export function avatarFromName(name: string): string {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(name).replace(/%20/g, '+')}&background=random`;
}

// Messages de status HTTP personnalisés
export const messages: Record<number, string> = {
	200: 'OK',
	400: 'Requête invalide',
	401: 'ptdr t ki',
	403: 'Pas envie deso',
	404: 'Introuvable',
	500: "J'ai glissé chef..."
};


// Crée une réponse HTTP par défaut en fonction du status
export function reponse(status: number = 500, args: Record<never, never> = {}) {
	const message = Object.keys(messages).includes(String(status)) ? messages[status] : messages[500];
	return new Response(message, { status, ...args });
}

export function hashData(data: object): string {
	return crypto.createHmac('sha256', SECRET).update(JSON.stringify(data)).digest('hex');
}

export function verifHash(data: object, hash: string): boolean {
	if (!hash) return false;
	return hashData(data) === hash;
}

//
const UPLOADS_PATH = env.UPLOADS_PATH ?? path.join(process.cwd(), 'uploads');

// Dossier uploads à la racine du projet svelte
export const baseUploadPath = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const uploadsPath = UPLOADS_PATH // ?? join(baseUploadPath, 'uploads');

//Table avec les magicByte
//On comparer les bytes pour vérifier que c'est la bonne extension
const ALLOWED_TYPES: Record<string, { offset: number; magic: number[] }[]> = {
	'.jpg': [{ offset: 0, magic: [0xff, 0xd8, 0xff] }],
	'.jpeg': [{ offset: 0, magic: [0xff, 0xd8, 0xff] }],
	'.png': [{ offset: 0, magic: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }],
	'.gif': [{ offset: 0, magic: [0x47, 0x49, 0x46, 0x38] }],
	'.webp': [{ offset: 0, magic: [0x52, 0x49, 0x46, 0x46] }],
	'.mp4': [{ offset: 4, magic: [0x66, 0x74, 0x79, 0x70] }],
	'.mov': [{ offset: 4, magic: [0x66, 0x74, 0x79, 0x70] }],
	'.webm': [{ offset: 0, magic: [0x1a, 0x45, 0xdf, 0xa3] }],
	'.heic': [{ offset: 4, magic: [0x66, 0x74, 0x79, 0x70] }],
	'.heif': [{ offset: 4, magic: [0x66, 0x74, 0x79, 0x70] }],
	'.avif': [{ offset: 4, magic: [0x66, 0x74, 0x79, 0x70] }],
	'.tiff': [
		{ offset: 0, magic: [0x49, 0x49, 0x2a, 0x00] },
		{ offset: 0, magic: [0x4d, 0x4d, 0x00, 0x2a] },
	],
	'.tif': [
		{ offset: 0, magic: [0x49, 0x49, 0x2a, 0x00] },
		{ offset: 0, magic: [0x4d, 0x4d, 0x00, 0x2a] },
	],
};

/**
 * Permet de vérifier les magic bytes d'un fichier pour s'assurer que son contenu correspond à son extension.
 * @param buffer Le fichier sous forme de buffer
 * @param ext L'extension du fichier (ex: .jpg, .png, .mp4...)
 * @returns True si le contenu du fichier correspond à son extension, false sinon
 */
function validateMagicBytes(buffer: Buffer, ext: string): boolean {
	const rules = ALLOWED_TYPES[ext];
	if (!rules) return false;
	return rules.some(({ offset, magic }) =>
		magic.every((byte, i) => buffer[offset + i] === byte)
	);
}

/**
 * Upload un fichier sur le serveur dans un répertoire spécifique à l'utilisateur.
 * @param file Le fichier qu'on veut uploader
 * @param userId L'id de l'utilisateur qui upload le fichier
 * @param maxSize Taille max du fichier en bit (200 Mo par défaut)
 * @returns Le chemin absolu du fichier uploadé
 * @throws {Error} FILE_TOO_LARGE Lance une erreur si le fichier dépasse la taille maximale autorisée
 */
export async function uploadUserFile(
	file: File,
	userId: string,
	maxSize: number = 200 * 1024 * 1024,
	maxVideoSize: number = 500 * 1024 * 1024
) {

	//Cree un dossier pour l'utilisateur, si existe deja ne fait rien 
	const dirName : string = hashData({ id: userId }).slice(1, 10)
	const userDir : string = path.join(uploadsPath, dirName);
	mkdirSync(userDir, { recursive: true });

	//Taille max pour les images et les vidéos
	if ((file.size > maxSize && !file.type.startsWith("video/")) || file.size > maxVideoSize) {
		throw new Error('FILE_TOO_LARGE');
	}

	let extension : string = extname(file.name).toLowerCase();

	// Verifie si l'extension est prise en compte
	if (!(extension in ALLOWED_TYPES)) {
		throw new Error('EXTENSION_NOT_ALLOWED');
	}

	const buffer = Buffer.from(await file.arrayBuffer());

	// Les pages HTML peuvent être uploadées avec en tant que fichier donc 
	if (!validateMagicBytes(buffer, extension)) {
		throw new Error('INVALID_FILE_CONTENT');
	}

	let targetPath : string;
	let filename : string;
	// convertion et ecriture des fichier en mémoire 
	// tout est converti pourquoi ? : on autorise d'envoyer des fichier lourd donc on les convertit pour que l'affichage soit okay après

	if (extension === '.heic' || extension === '.heif' || extension === '.avif' || extension === '.tiff' || extension === '.tif' || extension === '.jpeg' || extension === '.jpg' || extension === '.png') {
		filename = `${Date.now()}${".webp"}`;
		targetPath = path.join(userDir, filename);
		await convertToWebp(buffer, extension, targetPath);
	} else if (extension === '.mov' || extension === '.webm' || extension === '.mp4' || extension === '.gif' || extension === '.avi') {
		filename = `${Date.now()}${".mp4"}`;
		targetPath = path.join(userDir, filename);
		await convertToWebVideo(buffer, extension, targetPath);

	} else {
		throw new Error('EXTENSION_NOT_ALLOWED');
	}

	return `/uploads/${dirName}/${filename}`;
}

