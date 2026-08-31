import type { RequestEvent } from '@sveltejs/kit';
import { reponse, uploadsPath } from '$lib/server/filesManagement';
import { join, resolve, sep, extname } from 'path';
import { createReadStream, statSync } from 'fs';
import { prisma } from "$lib/server/prisma";
import { verifHash } from "$lib/server/filesManagement";

// Types MIME autorisés, à faire correspondre à tes ALLOWED_TYPES d'upload
const MIME_TYPES: Record<string, string> = {
    '.webp': 'image/webp',
    '.mp4': 'video/mp4'
};

export async function GET({ params, request, locals }: RequestEvent) {
    // vérification de l'authentification de l'utilisateur
    const user = locals.user;
    if (!user) {
        return reponse(403);
    }

    const userBureau = await prisma.user.findUnique({
        where: { id: user.id },
        select: { groupBoard: true }
    });


    if (!user.isAdmin && !userBureau?.groupBoard) {
        if ((!user.groupInteId || !params.file)) {
            return reponse(403);
        }
        const userDirOK = await prisma.groupInte.findUnique({
            where: { groupId: user.groupInteId },
            include: { usersInte: { select: { id: true } } }
        });
        const dirName: string = params.file.split('/')[0];
        const authoriser = userDirOK.usersInte.some(user => verifHash(user.id, dirName));
        if (!authoriser) {
            return reponse(403);
        }
    }


    try {
        if (params.file) {
            // Empêche le path traversal : on résout le chemin complet et on vérifie qu'il reste bien dans uploadsPath
            const resolvedUploadsPath = resolve(uploadsPath);
            const filePath = resolve(join(resolvedUploadsPath, params.file));
            const safeBase = resolvedUploadsPath.endsWith(sep)
                ? resolvedUploadsPath
                : resolvedUploadsPath + sep;
            if (!filePath.startsWith(safeBase)) {
                return reponse(403);
            }

            const stat = statSync(filePath);
            const fileSize = stat.size;
            const ext = extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';

            const baseHeaders: Record<string, string> = {
                'content-type': contentType,
                'content-disposition': 'inline',
                'accept-ranges': 'bytes',
                'x-content-type-options': 'nosniff',
                'content-security-policy': "default-src 'none'; style-src 'none'; script-src 'none'; media-src 'self';",
                'cache-control': 'public, max-age=31536000, immutable'
            };

            const range = request.headers.get('range');

            if (range) {
                const match = range.match(/bytes=(\d*)-(\d*)/);
                if (!match) {
                    return reponse(416);
                }

                const start = match[1] ? parseInt(match[1], 10) : 0;
                const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;

                if (start >= fileSize || end >= fileSize || start > end) {
                    return new Response(null, {
                        status: 416,
                        headers: { 'content-range': `bytes */${fileSize}` }
                    });
                }

                const chunkSize = end - start + 1;
                const stream = createReadStream(filePath, { start, end });

                return new Response(stream as any, {
                    status: 206,
                    headers: {
                        ...baseHeaders,
                        'content-range': `bytes ${start}-${end}/${fileSize}`,
                        'content-length': String(chunkSize)
                    }
                });
            }

            // Pas de Range demandé : fichier entier, mais on annonce le support
            const stream = createReadStream(filePath);
            return new Response(stream as any, {
                status: 200,
                headers: {
                    ...baseHeaders,
                    'content-length': String(fileSize)
                }
            });
        }
    } catch (error) {
        console.error('Erreur de lecture de fichier', error);
        return reponse(500);
    }
    return reponse(404);
}