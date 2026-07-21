const fs = require('node:fs');
const path = require('node:path');
const QRCode = require('qrcode');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://wanderpaw.cn/';
const OUTPUT = path.join(ROOT, 'generated', 'share', 'qr');
const PET_IDS = [
  'husky', 'frenchie', 'ragdoll', 'collie', 'corgi', 'golden', 'siamese', 'orange',
  'capybara', 'lop', 'lihua', 'british', 'calico', 'shiba', 'samoyed', 'pomeranian',
];

async function writeQr(targetPath, url) {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: { dark: '#26351FFF', light: '#FFFAF0FF' },
  });
  fs.writeFileSync(targetPath, svg);
}

async function main() {
  fs.mkdirSync(OUTPUT, { recursive: true });
  await writeQr(path.join(ROOT, 'generated', 'share', 'pawti-site-qr.svg'), SITE_URL);
  for (const id of PET_IDS) {
    await writeQr(path.join(OUTPUT, `${id}.svg`), new URL(`r/${id}/`, SITE_URL).href);
  }
  console.log(`Generated ${PET_IDS.length + 1} WanderPaw QR codes for ${SITE_URL}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
