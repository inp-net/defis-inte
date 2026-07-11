import type { RequestEvent } from '@sveltejs/kit';
import { reponse, uploadsPath } from '$lib/server/filesManagement';
import { join, resolve, sep, extname } from 'path';
import { readFileSync } from 'fs';

// Types MIME autorisés, à faire correspondre à tes ALLOWED_TYPES d'upload
const MIME_TYPES: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4'
};

export async function GET({ params }: RequestEvent) {
    try {
        if (params.file) {
            // Empêche le path traversal : on résout le chemin complet et on vérifie qu'il reste bien dans uploadsPath
            const resolvedUploadsPath = resolve(uploadsPath);
            const filePath = resolve(join(resolvedUploadsPath, params.file));
            const safeBase = resolvedUploadsPath.endsWith(sep) ? resolvedUploadsPath : resolvedUploadsPath + sep;
            if (!filePath.startsWith(safeBase)) {
                return reponse(403);
            }

            const file = readFileSync(filePath);
            const ext = extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';

            return new Response(file, {
                status: 200,
                headers: {
                    'content-type': contentType,
                    'content-disposition': 'inline',
                    // Empêche le navigateur de deviner le type autrement que via content-type
                    'x-content-type-options': 'nosniff',
                    // Bloque l'exécution de scripts dans les fichiers servis (ex: SVG avec <script>)
                    'content-security-policy': "default-src 'none'; style-src 'none'; script-src 'none';",
                    // Cache long, utile car les noms de fichiers incluent déjà un timestamp (donc jamais réutilisés)
                    'cache-control': 'public, max-age=31536000, immutable'
                }
            });
        }
    } catch (error) {
        console.error('Erreur de lecture de fichier', error);
        return reponse(500);
    }
    return reponse(404);
}