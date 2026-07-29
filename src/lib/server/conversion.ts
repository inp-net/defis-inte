//Nécéssite ffmpeg installé sur le serveur
import { spawn } from "child_process";
import { createWriteStream } from 'fs';
import convert from 'heic-convert'; // les types ne marches pas car c'est du js (si j'ai bien capter)


/**
 * Convertit un buffer image en buffer .webp via le binaire ffmpeg.
 * Ne gère que les images
 *
 * @param buffer - Buffer source de l'image
 * @param inputFormat - extension du fichier source (ex: '.png')
 * @param outputPath - Chemin complet du fichier de sortie
 * @param quality - Qualité de compression webp, de 0 à 100 (défaut: 80)
 * @returns Une Promise qui résout avec le buffer de l'image convertie en .webp
 */
export async function convertToWebp(
  buffer: Buffer,
  inputFormat: string,
  outputPath: string,
  quality: number = 80
): Promise<void> {

  const extension = inputFormat.startsWith('.') ? inputFormat.slice(1).toLowerCase() : inputFormat.toLowerCase();

  // HEIC/HEIF : ffmpeg ne supporte pas nativement ce format
  // donc on convertit d'abord en JPEG via heic-convert
  if (extension === 'heic' || extension === 'heif') {
    let jpegBuffer: Buffer;
    try {
      jpegBuffer = Buffer.from(await convert({
        buffer,
        format: 'JPEG',
        quality: 0.9,
      }));
    } catch (err) {
      throw new Error(`Échec de la conversion HEIC -> JPEG : ${err instanceof Error ? err.message : String(err)}`);
    }

    // On relance avec le résultat, traité comme un .jpg classique
    return convertToWebp(jpegBuffer, 'jpg', outputPath, quality);
  }

  const typeFile = toFfmpegInputFormat(extension);

  // Construction des arguments de la commande ffmpeg
  const args = [
    '-f', typeFile,        // Format d'entrée explicite 
    '-i', 'pipe:0',           // Lecture du buffer d'entrée depuis stdin
    '-c:v', 'libwebp',        // Codec de sortie : libwebp
    '-quality', String(quality), // Niveau de compression/qualité
    '-frames:v', '1',        // Force une seule frame en sortie (image fixe, pas d'animation)
    '-f', 'webp',             // Format de sortie explicite (nécessaire car on écrit vers stdout, pas un fichier)
    'pipe:1',                 // Écriture du résultat vers stdout
  ];

  return new Promise((resolve, reject) => {
    const bin = 'ffmpeg';
    const proc = spawn(bin, args);

    // On crée un stream d'écriture vers le fichier de destination
    const writeStream = createWriteStream(outputPath);

    // On "pipe" directement stdout de ffmpeg vers le fichier
    //chaque chunk reçu est écrit immédiatement, sans accumulation en mémoire
    proc.stdout.pipe(writeStream);

    // gestion erreurs
    const stderrChunks: Buffer[] = [];
    proc.stderr.on('data', (chunk) => stderrChunks.push(chunk));

    proc.on('error', (err) => reject(err));

    proc.stdin.on('error', (err) => {
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg a échoué (code ${code}): ${Buffer.concat(stderrChunks).toString()}`));
      }
    });

    proc.stdin.write(buffer);
    proc.stdin.end();
  });
}



/**
 * Convertit un buffer vidéo en fichier .mp4 optimisé pour le web via ffmpeg.
 * Utilise le codec H.264 (vidéo) + AAC (audio), compatible avec tous les navigateurs.
 *
 * @param buffer - Buffer source de la vidéo
 * @param inputFormat - extension du fichier source 
 * @param outputPath - Chemin complet du fichier de sortie (.mp4)
 * @param quality - Qualité de conversion  18-23 = bonne qualité pour le web, 28+ = plus compressé/moins net
 * @returns Une Promise qui résout une fois le fichier écrit sur disque
 */
export function convertToWebVideo(
  buffer: Buffer,
  inputFormat: string,
  outputPath: string,
  quality: number = 20
): Promise<void> {

  const typeFile = toFfmpegInputFormat(inputFormat);

  const args = [
    '-f', typeFile,        // Format d'entrée explicite
    '-i', 'pipe:0',           // Lecture du buffer d'entrée depuis stdin

    // --- Vidéo ---
    '-c:v', 'libx264',        // Codec H.264 
    '-preset', 'medium',      // Vitesse d'encodage vs compression (ultrafast -> veryslow)
    '-crf', String(quality),      // Qualité de la vidéo (voir explication au-dessus)
    '-pix_fmt', 'yuv420p',    // Format de pixel requis pour la compatibilité navigateur (Safari en particulier, tj la pour casser les apple)

    // --- Audio ---
    '-c:a', 'aac',            // Codec audio AAC : standard pour le web
    '-b:a', '128k',           // Bitrate audio (128 kbps = qualité correcte pour la plupart des usages)

    // --- Streaming-friendly ---
    // Indispensable car on écrit vers un pipe et non un vrai fichier
    '-movflags', 'frag_keyframe+empty_moov',

    '-f', 'mp4',              // Format de sortie explicite
    'pipe:1',                 // Écriture du résultat vers stdout
  ];


  return new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args);

    const writeStream = createWriteStream(outputPath);
    proc.stdout.pipe(writeStream);

    const stderrChunks: Buffer[] = [];
    proc.stderr.on('data', (chunk) => stderrChunks.push(chunk));

    proc.on('error', (err) => reject(err));

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`ffmpeg a échoué (code ${code}): ${Buffer.concat(stderrChunks).toString()}`)
        );
      }
    });

    proc.stdin.write(buffer);
    proc.stdin.end();
  });
}



/**
 * Mappe une extension de fichier vers le nom du demuxer ffmpeg correspondant.
 * Nécessaire car ffmpeg ne peut pas deviner le format depuis un pipe (pas de nom de fichier/extension),
 * il faut donc lui donner explicitement le nom du "demuxer" à utiliser via -f.
 */
function toFfmpegInputFormat(inputFormat: string): string {
  // On nettoie le format reçu (retire le point, met en minuscules)
  const ext = inputFormat.startsWith('.') ? inputFormat.slice(1) : inputFormat;

  const formatMap: Record<string, string> = {
    jpg: 'jpeg_pipe',
    jpeg: 'jpeg_pipe',
    png: 'png_pipe',
    webp: 'webp_pipe',
    bmp: 'bmp_pipe',
    tiff: 'tiff_pipe',
    tif: 'tiff_pipe',
    avif: 'mov', // AVIF utilise un conteneur ISOBMFF, lu via le démuxer mov natif de ffmpeg
    gif: 'gif',
    mp4: 'mp4',
    mov: 'mov',
    webm: 'webm',
    avi: 'avi'
  };

  const mapped = formatMap[ext];

  if (!mapped) {
    throw new Error(`Format d'image non supporté : ${inputFormat}`);
  }

  return mapped;
}