// Test de fumée du build de production.
// Sert dist/portfolio/browser en local, ouvre le site dans Chrome (headless) et vérifie le rendu,
// les animations, la navigation, les liens et l'absence d'erreurs JavaScript.
//
// Utilisation : npm run build && npm run test:smoke
// Chrome installé est utilisé par défaut ; CHROME_PATH permet d'indiquer un autre exécutable.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = fileURLToPath(new URL('../dist/portfolio/browser/', import.meta.url));
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};
// Valeurs finales attendues des compteurs (voir src/app/data/profile.ts).
const EXPECTED_STATS = ['Plus de 2 ans', '415 000+', '19 000+'];
const SECTIONS = ['accueil', 'profil', 'experience', 'projets', 'competences', 'formation', 'plus', 'contact'];
const EXPECTED_PROJECTS = 5;
const EXPECTED_FEATURED = 2;

// Le site est servi sous le même chemin de base que le build (ex. « / » ou « /nom-du-depot/»).
const BASE_PATH = (await readFile(join(ROOT, 'index.html'), 'utf8')).match(/<base href="([^"]*)"/)?.[1] ?? '/';

const server = createServer(async (request, response) => {
  let pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  if (pathname.startsWith(BASE_PATH)) {
    pathname = `/${pathname.slice(BASE_PATH.length)}`;
  }
  const file = normalize(join(ROOT, pathname.endsWith('/') ? `${pathname}index.html` : pathname));
  if (!file.startsWith(ROOT)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const BASE = `http://127.0.0.1:${server.address().port}${BASE_PATH}`;

const results = [];
const problems = [];
const check = (name, ok, detail = '') => results.push({ name, ok: Boolean(ok), detail });
const normalizeSpaces = (text) => (text ?? '').replace(/\s+/g, ' ').trim();
const wait = (page, ms) => page.waitForTimeout(ms);

function watch(page, label) {
  page.on('pageerror', (error) => problems.push(`[${label}] exception : ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`[${label}] console : ${message.text()}`);
  });
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`[${label}] HTTP ${response.status()} : ${response.url()}`);
  });
}

async function scrollThrough(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await wait(page, 80);
  }
  await wait(page, 1200);
}

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' },
);

try {
  // ---------- Ordinateur ----------
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await desktop.newPage();
  watch(page, 'bureau');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await wait(page, 2600);

  check('Titre de la page', (await page.title()).includes('Mohamed Ben Rhaiem'));
  check('Nom affiché', normalizeSpaces(await page.textContent('h1')) === 'Mohamed Ben Rhaiem');

  const sections = await page.$$eval('main section[id]', (elements) => elements.map((element) => element.id));
  check('Sections présentes', SECTIONS.every((id) => sections.includes(id)), sections.join(', '));

  const photo = await page.$eval('.portrait img', (img) => ({ loaded: img.complete && img.naturalWidth > 0, width: img.naturalWidth }));
  check('Photo chargée', photo.loaded, `${photo.width} px`);

  const stats = (await page.$$eval('.stats strong', (elements) => elements.map((element) => element.textContent))).map(normalizeSpaces);
  check('Compteurs arrivés à leur valeur finale', JSON.stringify(stats) === JSON.stringify(EXPECTED_STATS), stats.join(' | '));

  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts]
      .filter((face) => face.family.replace(/["']/g, '') === 'Open Sans' && face.status === 'loaded')
      .map((face) => `${face.weight} ${face.style}`);
  });
  check('Police Open Sans chargée', fonts.length >= 3, fonts.join(', '));

  const revealCount = await page.$$eval('.reveal', (elements) => elements.length);
  await scrollThrough(page);
  const stillHidden = await page.$$eval('.reveal:not(.is-visible)', (elements) => elements.length);
  check('Apparition au défilement', revealCount > 0 && stillHidden === 0, `${revealCount} éléments animés, ${stillHidden} encore masqués`);
  const contactOpacity = await page.$eval('.contact-card', (element) => getComputedStyle(element).opacity);
  check('Fin des animations (opacité 1)', contactOpacity === '1', contactOpacity);

  check('Ombre de l’en-tête après défilement', await page.$eval('.site-header', (element) => element.classList.contains('scrolled')));

  // ---------- Projets ----------
  const projects = await page.$$eval('.project-card', (cards) =>
    cards.map((card) => ({
      title: card.querySelector('h3')?.textContent?.trim() ?? '',
      featured: card.classList.contains('featured'),
      images: [...card.querySelectorAll('.project-shot img')].map((img) => img.complete && img.naturalWidth > 0),
    })),
  );
  check(
    'Projets : cartes et captures chargées',
    projects.length === EXPECTED_PROJECTS &&
      projects.filter((project) => project.featured).length === EXPECTED_FEATURED &&
      projects.every((project) => project.images.length > 0 && project.images.every(Boolean)),
    projects.map((project) => `${project.title} (${project.images.filter(Boolean).length}/${project.images.length})`).join(', '),
  );

  const gallery = page.locator('.project-card:has(.shot-switch)').first();
  const galleryTitle = normalizeSpaces(await gallery.locator('h3').textContent());
  await gallery.locator('.shot-switch button').nth(1).click();
  await wait(page, 700);
  const switched = await gallery.evaluate((card) => ({
    active: [...card.querySelectorAll('.project-shot img')].findIndex((img) => img.classList.contains('active')),
    pressed: card.querySelector('.shot-switch button:nth-child(2)')?.getAttribute('aria-pressed'),
    opacity: getComputedStyle(card.querySelector('.project-shot img.active')).opacity,
  }));
  check(
    'Projets : changement de capture',
    switched.active === 1 && switched.pressed === 'true' && switched.opacity === '1',
    `${galleryTitle} ${JSON.stringify(switched)}`,
  );

  await gallery.locator('.project-shot').click();
  await page.waitForSelector('dialog.viewer[open] .viewer-figure img', { timeout: 5000 });
  await wait(page, 600);
  const readViewer = () =>
    page.evaluate(() => {
      const dialog = document.querySelector('dialog.viewer');
      const img = dialog?.querySelector('.viewer-figure img');
      return {
        open: Boolean(dialog?.open),
        title: dialog?.querySelector('.viewer-title')?.textContent?.trim() ?? '',
        count: (dialog?.querySelector('.viewer-count')?.textContent ?? '').replace(/\s+/g, ' ').trim(),
        loaded: Boolean(img && img.complete && img.naturalWidth > 0),
        focus: document.activeElement?.className ?? '',
        locked: getComputedStyle(document.documentElement).overflow === 'hidden',
      };
    });
  const viewer = await readViewer();
  check(
    'Visionneuse : ouverture sur la capture affichée',
    viewer.open && viewer.title === galleryTitle && viewer.count === '2 / 2' && viewer.loaded && viewer.focus.includes('viewer-close') && viewer.locked,
    JSON.stringify(viewer),
  );
  await page.keyboard.press('ArrowRight');
  await wait(page, 400);
  const afterArrow = await readViewer();
  check('Visionneuse : navigation au clavier', afterArrow.count === '1 / 2' && afterArrow.loaded, afterArrow.count);
  await page.keyboard.press('Escape');
  await wait(page, 400);
  const afterClose = await page.evaluate(() => ({
    open: Boolean(document.querySelector('dialog.viewer')?.open),
    focusOnCard: document.activeElement?.classList.contains('project-shot') ?? false,
    locked: getComputedStyle(document.documentElement).overflow === 'hidden',
  }));
  check(
    'Visionneuse : fermeture avec Échap et retour du focus',
    !afterClose.open && afterClose.focusOnCard && !afterClose.locked,
    JSON.stringify(afterClose),
  );

  await page.evaluate(() => document.getElementById('competences')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await wait(page, 500);
  const active = await page.$$eval('.menu a.active', (elements) => elements.map((element) => element.textContent.trim()));
  check('Lien actif dans la navigation', active.length === 1 && active[0] === 'Compétences', active.join(', ') || 'aucun');

  const certificates = await page.$$eval('a.cert-link', (links) => links.map((link) => link.href));
  check(
    'Liens des certificats Udemy',
    certificates.length === 3 && certificates.every((href) => href.startsWith('https://www.udemy.com/certificate/UC-')),
    `${certificates.length} liens`,
  );

  const cvHref = await page.$eval('a[download]', (link) => link.href);
  const cv = await page.request.get(cvHref);
  check('CV PDF accessible', cv.ok() && (cv.headers()['content-type'] ?? '').includes('pdf'), `${cv.status()} ${new URL(cvHref).pathname}`);

  // ---------- Thème clair / sombre ----------
  const themeBefore = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.click('.theme-toggle');
  await wait(page, 900);
  const themeAfter = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    background: getComputedStyle(document.body).backgroundColor,
  }));
  check(
    'Bascule clair / sombre',
    themeBefore === 'light' && themeAfter.theme === 'dark' && themeAfter.background !== 'rgb(255, 255, 255)',
    `${themeBefore} → ${themeAfter.theme} (${themeAfter.background})`,
  );
  await page.reload({ waitUntil: 'networkidle' });
  const themeKept = await page.evaluate(() => document.documentElement.dataset.theme);
  check('Thème mémorisé après rechargement', themeKept === 'dark', themeKept);

  const systemDark = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: 'dark' });
  const darkPage = await systemDark.newPage();
  watch(darkPage, 'système sombre');
  await darkPage.goto(BASE, { waitUntil: 'networkidle' });
  check('Préférence sombre du système suivie', (await darkPage.evaluate(() => document.documentElement.dataset.theme)) === 'dark');

  // ---------- En-tête aux largeurs intermédiaires ----------
  const tabletContext = await browser.newContext({ viewport: { width: 1024, height: 800 } });
  const tablet = await tabletContext.newPage();
  watch(tablet, 'tablette');
  await tablet.goto(BASE, { waitUntil: 'networkidle' });
  const readHeader = () =>
    tablet.evaluate(() => ({
      brandHeight: Math.round(document.querySelector('.brand')?.getBoundingClientRect().height ?? 0),
      inlineMenu: getComputedStyle(document.getElementById('menu')).position !== 'absolute',
      burger: getComputedStyle(document.querySelector('.menu-toggle')).display !== 'none',
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    }));
  const wide = await readHeader();
  await tablet.setViewportSize({ width: 900, height: 800 });
  await wait(tablet, 300);
  const narrow = await readHeader();
  check(
    'En-tête sur une ligne (1024 px : menu complet, 900 px : menu replié)',
    wide.inlineMenu && !wide.burger && wide.brandHeight <= 40 && wide.overflow <= 0 &&
      !narrow.inlineMenu && narrow.burger && narrow.brandHeight <= 40 && narrow.overflow <= 0,
    `${JSON.stringify(wide)} / ${JSON.stringify(narrow)}`,
  );

  // ---------- Mobile ----------
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await mobileContext.newPage();
  watch(mobile, 'mobile');
  await mobile.goto(BASE, { waitUntil: 'networkidle' });
  await wait(mobile, 600);
  await mobile.click('.menu-toggle');
  await wait(mobile, 450);
  const opened = await mobile.evaluate(() => ({
    expanded: document.querySelector('.menu-toggle')?.getAttribute('aria-expanded'),
    visibility: getComputedStyle(document.getElementById('menu')).visibility,
  }));
  check('Menu mobile : ouverture', opened.expanded === 'true' && opened.visibility === 'visible', JSON.stringify(opened));
  await mobile.keyboard.press('Escape');
  await wait(mobile, 450);
  check('Menu mobile : fermeture avec Échap', (await mobile.getAttribute('.menu-toggle', 'aria-expanded')) === 'false');
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check('Pas de débordement horizontal sur mobile', overflow <= 0, `${overflow} px`);

  // ---------- « Réduire les animations » ----------
  const reducedContext = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const reduced = await reducedContext.newPage();
  watch(reduced, 'animations réduites');
  await reduced.goto(BASE, { waitUntil: 'networkidle' });
  await wait(reduced, 400);
  const hiddenWhenReduced = await reduced.$$eval('.reveal:not(.is-visible)', (elements) => elements.length);
  const statsWhenReduced = (await reduced.$$eval('.stats strong', (elements) => elements.map((element) => element.textContent))).map(normalizeSpaces);
  check(
    '« Réduire les animations » : contenu affiché sans attendre',
    hiddenWhenReduced === 0 && JSON.stringify(statsWhenReduced) === JSON.stringify(EXPECTED_STATS),
    `${hiddenWhenReduced} masqués, ${statsWhenReduced.join(' | ')}`,
  );

  check('Aucune erreur JavaScript ni ressource manquante', problems.length === 0, problems.join(' ; '));
} catch (error) {
  check('Exécution du test', false, error instanceof Error ? error.stack ?? error.message : String(error));
} finally {
  await browser.close();
  server.close();
}

for (const result of results) {
  console.log(`${result.ok ? '✓' : '✗'} ${result.name}${result.detail ? ` — ${result.detail}` : ''}`);
}
const failed = results.filter((result) => !result.ok);
if (failed.length > 0) {
  console.error(`\n${failed.length} vérification(s) en échec sur ${results.length}.`);
  process.exit(1);
}
console.log(`\nTest de fumée réussi : ${results.length} vérifications.`);
