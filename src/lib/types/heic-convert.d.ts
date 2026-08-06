declare module 'heic-convert' {
  export interface ConvertOptions {
    buffer: Buffer | Uint8Array;
    format: 'JPEG' | 'PNG';
    quality?: number;
  }

  export default function convert(options: ConvertOptions): Promise<Buffer>;
}
