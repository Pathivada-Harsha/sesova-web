/*
 * Visual check: drives a real browser over the running dev server and saves
 * screenshots, so layout can be looked at rather than reasoned about.
 *
 *   node scripts/shoot.js                      # whole page, section by section
 *   node scripts/shoot.js --sel .or --steps 6  # one section across its scroll
 *
 * Scrolling uses real wheel events, not window.scrollTo, because Lenis
 * intercepts the wheel -- a programmatic jump would bypass the smooth scroll
 * and the ScrollTriggers reading from it.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const URL = arg('url', 'http://localhost:4100/');
const OUT = arg('out', path.join(__dirname, '..', '.shots'));
const SEL = arg('sel', null);
const STEPS = parseInt(arg('steps', '5'), 10);
const W = parseInt(arg('w', '1512'), 10);
const H = parseInt(arg('h', '900'), 10);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

  // The preloader holds scroll until it lifts; wait it out before measuring.
  await page.waitForSelector('.pl', { state: 'detached', timeout: 12000 }).catch(() => {});
  await wait(600);

  const shot = async (name) => {
    const file = path.join(OUT, name + '.png');
    await page.screenshot({ path: file });
    console.log('  ' + path.relative(process.cwd(), file));
  };

  if (SEL) {
    // Park the section at the top, then walk forward through its scroll range.
    const box = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: r.height };
    }, SEL);
    if (!box) { console.error('selector not found: ' + SEL); await browser.close(); process.exit(1); }

    console.log('scrolling ' + SEL + ' (top ' + Math.round(box.top) + ', height ' + Math.round(box.height) + ')');
    // Wheel down to the section in chunks so Lenis keeps up.
    let done = 0;
    while (done < box.top) {
      const step = Math.min(400, box.top - done);
      await page.mouse.wheel(0, step);
      done += step;
      await wait(60);
    }
    await wait(900);
    await shot('sec-00');

    // A pinned section's own travel is roughly its pin distance; step through it.
    const per = Math.max(Math.round((box.height || H) / STEPS), 160);
    for (let i = 1; i <= STEPS; i += 1) {
      for (let k = 0; k < 4; k += 1) { await page.mouse.wheel(0, per / 4); await wait(50); }
      await wait(650);
      await shot('sec-' + String(i).padStart(2, '0'));
    }
  } else {
    const total = await page.evaluate(() => document.body.scrollHeight);
    const screens = Math.ceil(total / H);
    console.log('page height ' + total + ' (' + screens + ' screens)');
    await shot('screen-00');
    for (let i = 1; i < Math.min(screens, 24); i += 1) {
      for (let k = 0; k < 5; k += 1) { await page.mouse.wheel(0, H / 5); await wait(55); }
      await wait(700);
      await shot('screen-' + String(i).padStart(2, '0'));
    }
  }

  if (errors.length) {
    console.log('\nconsole errors:');
    errors.slice(0, 15).forEach((e) => console.log('  ! ' + e));
  } else {
    console.log('\nno console errors');
  }
  await browser.close();
}

run().catch((e) => { console.error(e); process.exit(1); });
