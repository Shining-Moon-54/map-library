import { MEDIA, LIMITS } from "./constants.js";
import { assert, extension } from "./util.js";

export function mediaType(bytes, name) {
  const ext = extension(name);
  assert(MEDIA[ext], `Nicht unterstützter Medientyp: ${ext}`);
  assert(bytes.byteLength <= LIMITS.file, "Mediendatei überschreitet das 64-MiB-Limit.");
  const b = bytes;
  const s = (at, n) => String.fromCharCode(...b.subarray(at, at + n));
  const valid = ext === "png" ? b[0] === 137 && s(1, 3) === "PNG" && s(12, 4) === "IHDR"
    : ["jpg", "jpeg"].includes(ext) ? b[0] === 255 && b[1] === 216 && b[2] === 255
    : ext === "webp" ? s(0, 4) === "RIFF" && s(8, 4) === "WEBP"
    : ext === "webm" ? b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3
    : ["mp4", "m4a"].includes(ext) ? s(4, 4) === "ftyp"
    : ext === "ogg" ? s(0, 4) === "OggS"
    : ext === "wav" ? s(0, 4) === "RIFF" && s(8, 4) === "WAVE"
    : ext === "mp3" ? s(0, 3) === "ID3" || b[0] === 255 && (b[1] & 0xe0) === 0xe0
    : false;
  assert(valid, `Dateiinhalt passt nicht zum Medientyp ${ext}.`);
  return MEDIA[ext];
}

export async function imageInfo(bytes, filename) {
  const mime = mediaType(bytes, filename);
  assert(mime.startsWith("image/"), "Für eine neue Bildszene bitte PNG, JPG oder WebP wählen.");
  const image = await createImageBitmap(new Blob([bytes], { type: mime }));
  try {
    assert(image.width * image.height <= 100_000_000, "Bild überschreitet das Limit von 100 Megapixeln.");
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 360 / image.width, 240 / image.height);
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    assert(context, "Vorschaubild konnte nicht erstellt werden.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const thumb = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", 0.75));
    return { width: image.width, height: image.height, thumbnail: thumb ? new Uint8Array(await thumb.arrayBuffer()) : null };
  } finally { image.close(); }
}
