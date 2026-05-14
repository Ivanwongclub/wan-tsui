import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { writeFile, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';

const ORIGINALS_DIR = 'public/images/_originals';
const OUTPUT_DIR = 'public/images';
const GENERATED_FILE = 'src/lib/generated-image-data.ts';

const WIDTHS = [400, 800, 1200];
const JPEG_OPTIONS = { quality: 78, mozjpeg: true } as const;
const WEBP_OPTIONS = { quality: 75 } as const;
const LQIP_WIDTH = 20;
const LQIP_BLUR_SIGMA = 3;
const LQIP_QUALITY = 40;

type ImageEntry = {
  widths: number[];
  aspectRatio: number;
  lqip: string;
};

async function processImage(
  srcPath: string,
  key: string,
): Promise<ImageEntry> {
  const img = sharp(srcPath);
  const meta = await img.metadata();
  const srcWidth = meta.width ?? 800;
  const srcHeight = meta.height ?? 600;
  const aspectRatio = srcWidth / srcHeight;

  console.log(`  ${key}: ${srcWidth}×${srcHeight} (${aspectRatio.toFixed(3)})`);

  // Generate resized JPEG + WebP for each width
  for (const w of WIDTHS) {
    // Skip widths larger than the source
    const targetW = Math.min(w, srcWidth);

    await sharp(srcPath)
      .resize(targetW)
      .jpeg(JPEG_OPTIONS)
      .toFile(join(OUTPUT_DIR, `${key}-${w}.jpg`));

    await sharp(srcPath)
      .resize(targetW)
      .webp(WEBP_OPTIONS)
      .toFile(join(OUTPUT_DIR, `${key}-${w}.webp`));

    console.log(`    ✓ ${key}-${w}.jpg / .webp`);
  }

  // Generate LQIP: 20px wide, blurred, base64 JPEG
  const lqipBuffer = await sharp(srcPath)
    .resize(LQIP_WIDTH)
    .blur(LQIP_BLUR_SIGMA)
    .jpeg({ quality: LQIP_QUALITY })
    .toBuffer();
  const lqip = `data:image/jpeg;base64,${lqipBuffer.toString('base64')}`;
  console.log(`    ✓ lqip (${lqipBuffer.length} bytes)`);

  return { widths: WIDTHS, aspectRatio: parseFloat(aspectRatio.toFixed(4)), lqip };
}

async function run() {
  const files = (await readdir(ORIGINALS_DIR)).filter((f) =>
    ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()),
  );

  if (files.length === 0) {
    console.error(`No images found in ${ORIGINALS_DIR}`);
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  const entries: Record<string, ImageEntry> = {};

  for (const file of files) {
    const key = basename(file, extname(file)); // e.g. "hero-clinic"
    console.log(`\nProcessing: ${file}`);
    entries[key] = await processImage(join(ORIGINALS_DIR, file), key);
  }

  // Write generated-image-data.ts
  const lines = [
    '// AUTO-GENERATED — run `npm run optimize:images` to regenerate',
    '// Do not edit by hand.',
    '',
    'export const IMAGE_DATA = {',
  ];

  for (const [key, data] of Object.entries(entries)) {
    lines.push(`  '${key}': {`);
    lines.push(`    widths: [${data.widths.join(', ')}],`);
    lines.push(`    aspectRatio: ${data.aspectRatio},`);
    lines.push(`    lqip: '${data.lqip}',`);
    lines.push(`  },`);
  }

  lines.push('} as const;');
  lines.push('');
  lines.push('export type ImageKey = keyof typeof IMAGE_DATA;');
  lines.push('');

  await writeFile(GENERATED_FILE, lines.join('\n'));
  console.log(`\n✓ Written ${GENERATED_FILE}`);
  console.log(`✓ Processed ${files.length} source images → ${files.length * WIDTHS.length * 2} output files`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
