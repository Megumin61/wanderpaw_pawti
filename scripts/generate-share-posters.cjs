/*
 * Build the 16 static share posters.
 *
 * Run after `node scripts/export-share-data.mjs`.
 * Requires the optional `sharp` build dependency. The generated assets are
 * committed, so production visitors never execute this script.
 */
const fs = require('node:fs');
const path = require('node:path');

let sharp;
try {
  sharp = require('sharp');
} catch {
  throw new Error('Missing optional build dependency `sharp`. Install it with `npm i -D sharp`.');
}

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'generated', 'share', 'posters', 'v1');
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'generated', 'share', 'poster-data.json'), 'utf8'));
const QR_SVG = fs.readFileSync(path.join(ROOT, 'generated', 'share', 'pawti-site-qr.svg'));
const WIDTH = 1080;
const HEIGHT = 3000;

const COLORS = {
  cream: '#FFF8EA', paper: '#FBF1DC', ink: '#344126', forest: '#667849',
  bark: '#7B6846', gold: '#E4CC91', apricot: '#E7A958', white: '#FFFCF4',
};

function escapeXml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  }[char]));
}

function wrapText(text, maxUnits, maxLines = Infinity) {
  const normalized = String(text || '').replace(/\r/g, '').replace(/\n{2,}/g, '\n');
  const lines = [];
  normalized.split('\n').forEach((paragraph, paragraphIndex, paragraphs) => {
    let line = '';
    let units = 0;
    for (const char of paragraph) {
      const weight = /[\u0000-\u00ff]/.test(char) ? 0.56 : 1;
      if (line && units + weight > maxUnits) {
        lines.push(line);
        line = char;
        units = weight;
      } else {
        line += char;
        units += weight;
      }
    }
    if (line) lines.push(line);
    if (paragraphIndex < paragraphs.length - 1) lines.push('');
  });
  if (lines.length > maxLines) {
    const visible = lines.slice(0, maxLines);
    visible[maxLines - 1] = visible[maxLines - 1].replace(/[，。！？、\s]*$/, '') + '…';
    return visible;
  }
  return lines;
}

function textBlock(lines, x, y, options = {}) {
  const { size = 32, line = Math.round(size * 1.55), weight = 500, fill = COLORS.ink,
    family = 'PingFang SC, Microsoft YaHei, sans-serif', anchor = 'start' } = options;
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" font-family="${family}" text-anchor="${anchor}">${lines.map((value, index) => `<tspan x="${x}" dy="${index ? line : 0}">${escapeXml(value || ' ')}</tspan>`).join('')}</text>`;
}

function assetPath(relativePath) {
  const absolute = path.join(ROOT, String(relativePath).replace(/^\.\//, ''));
  return absolute;
}

function pill(text, x, y, width) {
  return `<g><rect x="${x}" y="${y}" width="${width}" height="58" rx="29" fill="#F6EBD3" stroke="#AEB895" stroke-width="2"/><text x="${x + width / 2}" y="${y + 38}" text-anchor="middle" fill="${COLORS.ink}" font-size="24" font-weight="700" font-family="PingFang SC, Microsoft YaHei, sans-serif">${escapeXml(text)}</text></g>`;
}

function buildSvg({ persona, pet, letter }) {
  const title = wrapText(`「${persona.chinese}」`, 17, 2);
  const description = wrapText(persona.description, 32, 4);
  const reason = wrapText(persona.petReason, 35, 3);
  const rawLetter = String(letter?.content || '').replace(/^亲爱的主人：\s*/u, '').trim();
  const letterLines = wrapText(rawLetter, 31, 8);
  const illustration = pet.__illustrationData;
  const travel = pet.__travelData;
  const titleY = 236;
  const titleLine = 76;
  const titleBottom = titleY + Math.max(0, title.length - 1) * titleLine;
  const heroY = title.length > 1 ? 470 : 410;
  const introY = heroY + 640;
  const travelY = introY + 410;
  const placesY = travelY + 570;
  const letterY = placesY + 130;

  const dots = Array.from({ length: 87 }, (_, row) => Array.from({ length: 31 }, (_, col) =>
    `<circle cx="${24 + col * 34}" cy="${24 + row * 34}" r="1.2" fill="rgba(166,139,91,.14)"/>`).join('')).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>
      <clipPath id="heroClip"><rect x="94" y="${heroY}" width="892" height="560" rx="30"/></clipPath>
      <clipPath id="travelClip"><rect x="78" y="${travelY}" width="924" height="500" rx="34"/></clipPath>
      <linearGradient id="travelShade" x1="0" y1="0" x2="0" y2="1"><stop offset="48%" stop-color="#172012" stop-opacity="0"/><stop offset="100%" stop-color="#172012" stop-opacity=".82"/></linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#2F3925" flood-opacity=".18"/></filter>
    </defs>
    <rect width="1080" height="3000" fill="${COLORS.cream}"/>
    ${dots}

    <g transform="rotate(-1 274 66)">
      <rect x="78" y="48" width="392" height="64" rx="10" fill="${COLORS.forest}"/>
      <text x="274" y="90" text-anchor="middle" fill="${COLORS.white}" font-size="22" font-weight="700" letter-spacing="7" font-family="monospace">PAWTI · RESULT</text>
    </g>
    <text x="78" y="164" fill="${COLORS.bark}" font-size="20" font-weight="700" letter-spacing="7" font-family="monospace">MY WANDERPAW DIARY · ${escapeXml(persona.code)}</text>
    ${textBlock(title, 78, titleY, { size: 58, line: titleLine, weight: 900, fill: COLORS.ink, family: 'STKaiti, KaiTi, serif' })}
    <text x="78" y="${titleBottom + 70}" fill="${COLORS.forest}" font-size="30" font-weight="700" font-family="PingFang SC, Microsoft YaHei, sans-serif">${escapeXml(persona.tagline)}</text>

    <g filter="url(#shadow)">
      <rect x="78" y="${heroY - 20}" width="924" height="600" rx="34" fill="#E7DCC6" transform="rotate(-1 540 ${heroY + 280})"/>
      <rect x="94" y="${heroY}" width="892" height="560" rx="30" fill="${escapeXml(pet.bgColor)}"/>
      <image x="120" y="${heroY + 20}" width="840" height="455" preserveAspectRatio="xMidYMid meet" xlink:href="${illustration}" clip-path="url(#heroClip)"/>
      <rect x="94" y="${heroY + 455}" width="892" height="105" fill="rgba(255,250,240,.86)"/>
      <text x="540" y="${heroY + 505}" text-anchor="middle" fill="${COLORS.ink}" font-size="34" font-weight="900" font-family="PingFang SC, Microsoft YaHei, sans-serif">${escapeXml(pet.chinese)} · 正在代你去 ${escapeXml(pet.city)}</text>
      <text x="540" y="${heroY + 542}" text-anchor="middle" fill="${COLORS.bark}" font-size="21" font-weight="600" font-family="PingFang SC, Microsoft YaHei, sans-serif">${escapeXml(pet.tagline)}</text>
    </g>

    <text x="78" y="${introY}" fill="${COLORS.bark}" font-size="19" font-weight="800" letter-spacing="4" font-family="monospace">01 / 旅行人格</text>
    ${textBlock(description, 78, introY + 62, { size: 31, line: 50, weight: 650, fill: COLORS.ink })}
    <rect x="78" y="${introY + 245}" width="924" height="118" rx="24" fill="#F5E8CF" stroke="#D8C9A5" stroke-width="2"/>
    <text x="110" y="${introY + 285}" fill="${COLORS.forest}" font-size="18" font-weight="800" letter-spacing="4" font-family="monospace">WHY YOU MATCH</text>
    ${textBlock(reason, 110, introY + 326, { size: 24, line: 37, weight: 600, fill: COLORS.bark })}

    <text x="78" y="${travelY - 34}" fill="${COLORS.bark}" font-size="19" font-weight="800" letter-spacing="4" font-family="monospace">02 / 它替你去了哪里</text>
    <g filter="url(#shadow)" clip-path="url(#travelClip)">
      <image x="78" y="${travelY}" width="924" height="500" preserveAspectRatio="xMidYMid slice" xlink:href="${travel}"/>
      <rect x="78" y="${travelY}" width="924" height="500" fill="url(#travelShade)"/>
    </g>
    <text x="116" y="${travelY + 408}" fill="${COLORS.white}" font-size="58" font-weight="900" font-family="STKaiti, KaiTi, serif">${escapeXml(pet.city)}</text>
    <text x="116" y="${travelY + 457}" fill="${COLORS.white}" font-size="26" font-weight="600" font-family="PingFang SC, Microsoft YaHei, sans-serif">📍 ${escapeXml(pet.location)}</text>

    <text x="78" y="${placesY}" fill="${COLORS.bark}" font-size="19" font-weight="800" letter-spacing="4" font-family="monospace">它还想替你去</text>
    ${persona.cities.slice(0, 3).map((city, index) => pill(city, 78 + index * 278, placesY + 32, 246)).join('')}

    <rect x="78" y="${letterY}" width="924" height="600" rx="34" fill="${COLORS.forest}" filter="url(#shadow)"/>
    <text x="116" y="${letterY + 58}" fill="#EADBAF" font-size="19" font-weight="800" letter-spacing="4" font-family="monospace">03 / LETTER FROM ${escapeXml(String(pet.city).toUpperCase())}</text>
    <text x="116" y="${letterY + 122}" fill="${COLORS.white}" font-size="38" font-weight="900" font-family="STKaiti, KaiTi, serif">从 ${escapeXml(pet.city)} 寄来的第一封信</text>
    <line x1="116" y1="${letterY + 156}" x2="964" y2="${letterY + 156}" stroke="rgba(255,255,255,.22)" stroke-width="2"/>
    ${textBlock(letterLines, 116, letterY + 212, { size: 26, line: 46, weight: 500, fill: COLORS.white, family: 'STKaiti, KaiTi, serif' })}

    <g transform="translate(78 ${letterY + 650})">
      <text x="0" y="38" fill="${COLORS.ink}" font-size="30" font-weight="900" font-family="PingFang SC, Microsoft YaHei, sans-serif">测测哪只小宠物会替你去旅行</text>
      <text x="0" y="80" fill="${COLORS.bark}" font-size="22" font-weight="600" font-family="PingFang SC, Microsoft YaHei, sans-serif">扫描二维码，领取你的 PAWTI</text>
      <text x="0" y="118" fill="${COLORS.bark}" font-size="17" font-family="monospace">megumin61.github.io/wanderpaw_pawti · WanderPaw 即将上线 iOS 商店</text>
      <rect x="712" y="0" width="212" height="212" rx="24" fill="#FFFFFF" stroke="#D6CBAE" stroke-width="2"/>
      <image x="728" y="16" width="180" height="180" xlink:href="data:image/svg+xml;base64,${QR_SVG.toString('base64')}"/>
    </g>
  </svg>`;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const record of DATA) {
    const id = record.pet.id;
    record.pet.__illustrationData = `data:image/png;base64,${(await sharp(assetPath(record.pet.illustrationUrl)).png().toBuffer()).toString('base64')}`;
    record.pet.__travelData = `data:image/jpeg;base64,${(await sharp(assetPath(record.pet.travelPhotoUrl || record.pet.photoUrl)).jpeg({ quality: 88 }).toBuffer()).toString('base64')}`;
    const svg = Buffer.from(buildSvg(record));
    if (process.env.PAWTI_POSTER_DEBUG === '1') fs.writeFileSync(path.join(OUT, `${id}-debug.svg`), svg);
    await sharp(svg, { density: 144 }).resize(WIDTH, HEIGHT).jpeg({ quality: 91, mozjpeg: true }).toFile(path.join(OUT, `${id}.jpg`));
    await sharp(svg, { density: 120 }).resize({ width: 720 }).webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, `${id}-preview.webp`));
    console.log(`Generated ${id}`);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
