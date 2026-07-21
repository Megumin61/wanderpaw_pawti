/*
 * Generate the 16 share posters from the real result-page components.
 *
 * The browser renders result step 1 and step 2 at the mobile breakpoint,
 * then this script places both rendered components into one long document.
 * No parallel poster design system is maintained here.
 */
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

let sharp;
let chromium;
try {
  sharp = require('sharp');
  ({ chromium } = require('playwright'));
} catch {
  throw new Error('Missing build dependencies. Install `sharp` and `playwright` before regenerating posters.');
}

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'generated', 'share', 'posters', 'v3');
const TEMP = path.join(OUTPUT, '.capture');
const PORT = 4182;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PET_IDS = [
  'husky', 'frenchie', 'ragdoll', 'collie', 'corgi', 'golden', 'siamese', 'orange',
  'capybara', 'lop', 'lihua', 'british', 'calico', 'shiba', 'samoyed', 'pomeranian',
];
const TARGET_IDS = process.env.PAWTI_POSTER_ID ? [process.env.PAWTI_POSTER_ID] : PET_IDS;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

function captureHtml() {
  return `<!doctype html>
  <html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="/css/tailwind.generated.css">
    <link rel="stylesheet" href="/css/style.css">
    <style>
      html, body { width: 540px; margin: 0; overflow: visible; background: #fff8ea; }
      body { min-height: 0 !important; }
      #poster-capture { position: relative; width: 540px; overflow: hidden; }
      #poster-capture > .poster-result-section > div {
        min-height: 0 !important;
        padding-top: 52px !important;
        padding-bottom: 52px !important;
      }
      #poster-capture .result-cta,
      #poster-capture #next-step-btn,
      #poster-capture #retake-btn,
      #poster-capture .pulse-ring + p { display: none !important; }
      .poster-result-section + .poster-result-section {
        border-top: 2px dashed rgba(104,121,73,.24);
      }
      .poster-site-footer {
        display: grid;
        grid-template-columns: minmax(0,1fr) 118px;
        align-items: center;
        gap: 24px;
        padding: 42px 34px 50px;
        border-top: 2px dashed rgba(104,121,73,.24);
        background: #fff8ea;
        color: #3d4a2a;
      }
      .poster-site-footer strong {
        display: block;
        margin-bottom: 10px;
        font-family: "Noto Serif SC", serif;
        font-size: 25px;
        line-height: 1.35;
      }
      .poster-site-footer p { margin: 0; color: #7c6b47; font-size: 13px; line-height: 1.7; }
      .poster-site-footer img {
        display: block;
        width: 118px;
        height: 118px;
        padding: 8px;
        border: 1px solid rgba(104,121,73,.2);
        border-radius: 16px;
        background: white;
      }
      @media (min-width: 721px) {
        html, body, #poster-capture { width: 540px !important; }
      }
    </style>
  </head>
  <body class="bg-paw-cream text-paw-ink font-sans antialiased">
    <div class="bg-gradient-layer pointer-events-none fixed inset-0 z-[0]"></div>
    <div class="noise-layer pointer-events-none fixed inset-0 z-[1]"></div>
    <div class="grid-dots-layer pointer-events-none fixed inset-0 z-[1]"></div>
    <main id="poster-capture" class="relative z-10"></main>
  </body>
  </html>`;
}

function createServer() {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${PORT}`).pathname);
    if (pathname === '/__poster.html') {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end(captureHtml());
      return;
    }
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const file = path.normalize(path.join(ROOT, relative));
    if (!file.startsWith(path.normalize(ROOT)) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404).end('Not found');
      return;
    }
    response.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(file).pipe(response);
  });
}

async function waitForImages(page) {
  await page.evaluate(async () => {
    await document.fonts?.ready;
    const images = [...document.images];
    await Promise.all(images.map(async image => {
      if (!image.complete) await new Promise(resolve => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
      if (image.naturalWidth > 0 && image.decode) await image.decode().catch(() => {});
    }));
  });
}

async function renderPet(page, petId) {
  await page.goto(`http://127.0.0.1:${PORT}/__poster.html?pet=${petId}`, { waitUntil: 'networkidle' });
  await page.evaluate(async id => {
    const [{ renderResult }, quiz, pets] = await Promise.all([
      import('/js/result.js'),
      import('/js/data/quiz.js'),
      import('/js/data/pets.js'),
    ]);
    const persona = quiz.PERSONAS.find(item => item.petId === id);
    const pet = pets.FEATURED_PETS.find(item => item.id === id);
    const result = {
      persona,
      topTags: persona.primaryTags,
      matchPercent: 94,
      isMystery: false,
      insight: {
        captureLine: `它会优先捕捉${persona.primaryTags.join('、')}，把那些只有你才会在意的瞬间带回来。`,
        proxyLine: `它会沿着${persona.primaryTags.slice(0, 2).join('与')}，替你找到真正想停下来的地方。`,
        letterLine: `它会从${pet.city}寄回一封很像你的信，把沿途最舍不得忘记的片段留好。`,
      },
    };
    const capture = document.querySelector('#poster-capture');
    const stage = document.createElement('div');
    document.body.appendChild(stage);
    renderResult(stage, result);
    window.__posterStage = stage;
    window.__posterPetId = pet.id;
    window.__posterPetName = pet.chinese;
  }, petId);

  await page.locator('#next-step-btn').waitFor({ state: 'visible' });
  await waitForImages(page);
  await page.evaluate(() => {
    const capture = document.querySelector('#poster-capture');
    const step1 = document.createElement('section');
    step1.className = 'poster-result-section';
    step1.innerHTML = window.__posterStage.innerHTML;
    capture.appendChild(step1);
  });

  await page.locator('#next-step-btn').last().click();
  await page.locator('#share-result-btn').waitFor({ state: 'visible' });
  await waitForImages(page);
  await page.evaluate(() => {
    const capture = document.querySelector('#poster-capture');
    const step2 = document.createElement('section');
    step2.className = 'poster-result-section';
    step2.innerHTML = window.__posterStage.innerHTML;
    capture.appendChild(step2);
    const footer = document.createElement('footer');
    footer.className = 'poster-site-footer';
    footer.innerHTML = `
      <div>
        <strong>你的毛孩子，会替你去哪里？</strong>
        <p>扫描二维码，测测你的旅行人格。<br>WanderPaw 即将上线 iOS 商店。</p>
      </div>
      <img src="/generated/share/qr/${window.__posterPetId}.svg" alt="${window.__posterPetName}结果页二维码">
    `;
    capture.appendChild(footer);
    window.__posterStage.remove();
  });
  await waitForImages(page);

  const png = path.join(TEMP, `${petId}.png`);
  await page.locator('#poster-capture').screenshot({ path: png, animations: 'disabled' });
  const image = sharp(png).flatten({ background: '#FFF8EA' });
  await image.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(OUTPUT, `${petId}.jpg`));
  await image.clone().resize({ width: 720 }).webp({ quality: 78, effort: 5 }).toFile(path.join(OUTPUT, `${petId}-preview.webp`));
  console.log(`Generated ${petId}`);
}

async function main() {
  fs.mkdirSync(TEMP, { recursive: true });
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, '127.0.0.1', resolve));
  const browser = await chromium.launch({ headless: true, executablePath: EDGE });
  try {
    const page = await browser.newPage({ viewport: { width: 540, height: 900 }, deviceScaleFactor: 2 });
    for (const id of TARGET_IDS) await renderPet(page, id);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
    fs.rmSync(TEMP, { recursive: true, force: true });
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
