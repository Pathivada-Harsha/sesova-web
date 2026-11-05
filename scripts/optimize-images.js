/*
 * Re-encodes the site's PNGs to WebP and AVIF.
 *
 *   node scripts/optimize-images.js          # write files
 *   node scripts/optimize-images.js --dry    # report only
 *
 * Run by hand, not during the build: CRA 5 cannot host a build-time image
 * pipeline without ejecting.
 *
 * Outputs land beside their source. The source is NOT deleted here, so a run is
 * always safe to repeat -- but once every reference points at the .webp, delete
 * the originals: everything under public/ is copied verbatim into build/, so a
 * superseded PNG keeps shipping even though no browser ever requests it.
 *
 * Workflow for new artwork: drop the .png/.jpg in, run this, repoint the
 * reference, then remove the original.
 *
 * Nothing is resized. Every source is already around 1700px wide; they are just
 * encoded badly (a 1743x902 screenshot has no business being 1.9MB). Re-encoding
 * alone is the whole win and carries no layout risk.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');
// AVIF is opt-in: WebP already captures ~93%, and using AVIF needs image-set()
// or <picture> plumbing that plain .webp swaps do not.
const AVIF_OUT = process.argv.includes('--avif');

const WEBP = { quality: 82, effort: 5, smartSubsample: true };
const AVIF = { quality: 55, effort: 4 };

// Each source folder caps at the width it is actually displayed at, times two
// for retina. 2048 is a safety cap for the full-bleed backgrounds, which no
// current source exceeds. The orbit tiles render at ~120px, so shipping a
// 1254px photo there would be roughly ten times the pixels anyone sees.
const DIRS = [
  { dir: 'src/images', max: 2048 },
  { dir: 'public/assets', max: 2048 },
  { dir: 'public/assets/product', max: 2048 },
  { dir: 'public/assets/modules', max: 420 }
];

// Generated photography usually arrives as JPEG, so accept both.
const SOURCE = /\.(png|jpe?g)$/i;

const kb = (n) => (n / 1024).toFixed(0).padStart(5) + ' KB';
const pct = (from, to) => (((from - to) / from) * 100).toFixed(0).padStart(3) + '%';

async function run() {
  const files = [];
  for (const { dir, max } of DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs)) {
      if (!SOURCE.test(name)) continue;
      files.push({ file: path.join(abs, name), max });
    }
  }

  let totals = { png: 0, webp: 0, avif: 0 };
  console.log(`\n${files.length} PNG source${files.length === 1 ? '' : 's'}${DRY ? ' (dry run)' : ''}\n`);
  console.log('  ' + 'source'.padEnd(46) + 'png'.padStart(8) + 'webp'.padStart(9) + 'avif'.padStart(9) + '  saved');
  console.log('  ' + '-'.repeat(84));

  for (const { file, max } of files) {
    const rel = path.relative(ROOT, file).split(path.sep).join('/');
    const png = fs.statSync(file).size;
    // `withoutEnlargement` means a source under the cap is passed through untouched.
    const base = () => sharp(file).resize({ width: max, withoutEnlargement: true });

    const webpBuf = await base().webp(WEBP).toBuffer();
    const avifBuf = await base().avif(AVIF).toBuffer();

    if (!DRY) {
      fs.writeFileSync(file.replace(SOURCE, '.webp'), webpBuf);
      if (AVIF_OUT) fs.writeFileSync(file.replace(SOURCE, '.avif'), avifBuf);
    }

    totals.png += png;
    totals.webp += webpBuf.length;
    totals.avif += avifBuf.length;
    console.log('  ' + rel.padEnd(46) + kb(png) + kb(webpBuf.length) + kb(avifBuf.length) + '   ' + pct(png, webpBuf.length));
  }

  console.log('  ' + '-'.repeat(84));
  console.log('  ' + 'TOTAL'.padEnd(46) + kb(totals.png) + kb(totals.webp) + kb(totals.avif) + '   ' + pct(totals.png, totals.webp));
  const mb = (n) => (n / 1048576).toFixed(1);
  console.log(`\n  PNG ${mb(totals.png)}MB -> WebP ${mb(totals.webp)}MB (saves ${mb(totals.png - totals.webp)}MB), AVIF ${mb(totals.avif)}MB\n`);
  if (DRY) console.log('  Dry run: nothing written.\n');
}

run().catch((e) => { console.error(e); process.exit(1); });
