const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://wanderpaw.cn/';

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

async function importSource(relativePath) {
  const source = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
}

async function main() {
  const [{ PERSONAS }, { FEATURED_PETS }] = await Promise.all([
    importSource('js/data/quiz.js'),
    importSource('js/data/pets.js'),
  ]);
  const template = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const cardsDir = path.join(ROOT, 'generated', 'share', 'cards');
  fs.mkdirSync(cardsDir, { recursive: true });

  for (const pet of FEATURED_PETS) {
    const persona = PERSONAS.find(item => item.petId === pet.id);
    if (!persona) throw new Error(`Missing persona for ${pet.id}`);

    const resultUrl = new URL(`r/${pet.id}/`, SITE_URL).href;
    const imageUrl = new URL(`generated/share/cards/${pet.id}.jpg`, SITE_URL).href;
    const title = `我的旅行人格是「${persona.chinese}」｜WanderPaw`;
    const description = `${persona.description} 匹配到${pet.chinese}，它替我去了${pet.city}。`;
    const socialMeta = `
  <meta name="pawti-shared-pet" content="${escapeAttribute(pet.id)}" />
  <link rel="canonical" href="${resultUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="WanderPaw · PAWTI" />
  <meta property="og:title" content="${escapeAttribute(title)}" />
  <meta property="og:description" content="${escapeAttribute(description)}" />
  <meta property="og:url" content="${resultUrl}" />
  <meta property="og:image" content="${imageUrl}" />`;

    let html = template
      .replace('<head>', '<head>\n  <base href="/" />')
      .replace(/  <title>.*?<\/title>/, `  <title>${escapeAttribute(title)}</title>`)
      .replace(/  <meta name="description"[^>]*\/>/, `  <meta name="description" content="${escapeAttribute(description)}" />`)
      .replace(/\n  <link rel="canonical"[\s\S]*?<meta name="theme-color" content="#FFF8EA" \/>/, `${socialMeta}\n  <meta name="theme-color" content="#FFF8EA" />`)
      .replace(/  <!-- 首屏先展示宠物墙；[\s\S]*?<meta charset="UTF-8" \/>/, `  <!-- 分享落地页只预加载当前结果宠物。 -->\n  <link rel="preload" as="image" href="${pet.illustrationUrl}" type="image/webp" fetchpriority="high">\n  <meta charset="UTF-8" />`);

    const outputDir = path.join(ROOT, 'r', pet.id);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);

    const illustrationPath = path.join(ROOT, pet.illustrationUrl.replace(/^\.\//, ''));
    await sharp(illustrationPath)
      .resize(600, 600, { fit: 'cover' })
      .flatten({ background: '#FFFAF0' })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(cardsDir, `${pet.id}.jpg`));
  }

  console.log(`Generated ${FEATURED_PETS.length} share pages and social cards for ${SITE_URL}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
