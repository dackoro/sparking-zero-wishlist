#!/usr/bin/env node
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const [, , inputFile, slug, type, customName] = process.argv;

if (!inputFile || !slug || !type) {
  console.error(`
Usage: node scripts/optimize-image.mjs <input> <slug> <type> [outputName]

  <input>      Path to source image (png, jpg, webp, etc.)
  <slug>       Fighter slug (e.g. pikkon, tapion)
  <type>       1 = portrait (hexagon tile)
               2 = render (full-body art)
               3 = scene (background)
  [outputName] Optional custom filename (e.g. "pikkon-sin-pesos.webp")
               for variant images. Overrides auto-naming.

Examples:
  node scripts/optimize-image.mjs ./render.png pikkon 2
  node scripts/optimize-image.mjs ./portrait.jpg pikkon 1
  node scripts/optimize-image.mjs ./bg.png pikkon 3
  node scripts/optimize-image.mjs ./variant.png pikkon 2 pikkon-sin-pesos.webp
`);
  process.exit(1);
}

const outputDir = 'public/fighters';
fs.mkdirSync(outputDir, { recursive: true });

const sizes = {
  1: { width: 300, height: 300, fit: 'cover', label: 'portrait' },
  2: { height: 900, fit: 'inside', label: 'render' },
  3: { width: 1920, fit: 'inside', label: 'scene' },
};

const cfg = sizes[type];

if (!cfg) {
  console.error(`Error: type must be 1, 2, or 3, got "${type}"`);
  process.exit(1);
}

const outputName = customName
  ?? (type === '1' ? `${slug}-portrait.webp`
    : type === '2' ? `${slug}.webp`
    : `${slug}-scene.webp`);

const outputPath = path.join(outputDir, outputName);

try {
  const info = await sharp(inputFile)
    .resize(cfg.width, cfg.height, { fit: cfg.fit, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(outputPath);

  console.log(`✓ ${outputPath}`);
  console.log(`  Format: webp · ${info.width}×${info.height} · ${(info.size / 1024).toFixed(1)} KB`);
} catch (err) {
  console.error(`✗ Error processing ${inputFile}:`, err.message);
  process.exit(1);
}
