import { execFile } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const execFileAsync = promisify(execFile);
const root = path.resolve(import.meta.dirname, '..');
const dataPath = path.join(root, 'js', 'data', 'pets.js');
const outputDir = path.join(root, 'generated', 'pets', 'optimized');
const tempDir = path.join(root, '.tmp-pet-media');
const curl = 'C:\\Program Files\\Git\\mingw64\\bin\\curl.exe';
const source = await readFile(dataPath, 'utf8');

const groups = [
  { name: 'PET_PHOTOS', suffix: 'photo', width: 960, height: 960 },
  { name: 'PET_ILLUSTRATIONS', suffix: 'illustration', width: 800, height: 800 },
  { name: 'PET_TRAVEL_PHOTOS', suffix: 'travel', width: 1200, height: 900 },
];

await mkdir(outputDir, { recursive: true });
await mkdir(tempDir, { recursive: true });

function readObject(name) {
  const start = source.indexOf(`export const ${name} = {`);
  const end = source.indexOf('\n};', start);
  if (start < 0 || end < 0) throw new Error(`Cannot find ${name}`);
  const block = source.slice(start, end);
  const entries = [];
  const entryPattern = /^\s*([a-zA-Z0-9_]+):\s*'([^']+)'/gm;
  for (const match of block.matchAll(entryPattern)) {
    entries.push({ key: match[1], src: match[2] });
  }
  return entries;
}

async function sourceBuffer(src, tempName) {
  if (!/^https?:\/\//i.test(src)) {
    return readFile(path.resolve(root, src.replace(/^\.\//, '')));
  }
  const target = path.join(tempDir, tempName);
  await execFileAsync(curl, [
    '--fail', '--location', '--retry', '3', '--retry-delay', '1',
    '--connect-timeout', '15', '--max-time', '90',
    '--output', target, src,
  ], { windowsHide: true, maxBuffer: 1024 * 1024 });
  return readFile(target);
}

async function convert(group, entry) {
  const filename = `${entry.key}-${group.suffix}.webp`;
  const target = path.join(outputDir, filename);
  try {
    if ((await stat(target)).size > 0) {
      return { group: group.name, key: entry.key, value: `./generated/pets/optimized/${filename}` };
    }
  } catch {}
  const input = await sourceBuffer(entry.src, `${entry.key}-${group.suffix}.source`);
  await sharp(input)
    .rotate()
    .resize({
      width: group.width,
      height: group.height,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 76, effort: 5, smartSubsample: true })
    .toFile(target);
  return { group: group.name, key: entry.key, value: `./generated/pets/optimized/${filename}` };
}

const jobs = groups.flatMap(group => readObject(group.name).map(entry => ({ group, entry })));
const results = [];
let cursor = 0;

async function worker() {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    const result = await convert(job.group, job.entry);
    results.push(result);
    process.stdout.write(`optimized ${result.key}-${job.group.suffix}\n`);
  }
}

await Promise.all(Array.from({ length: 6 }, worker));
await rm(tempDir, { recursive: true, force: true });

let rewrittenSource = source;
for (const group of groups) {
  const start = rewrittenSource.indexOf(`export const ${group.name} = {`);
  const end = rewrittenSource.indexOf('\n};', start);
  const before = rewrittenSource.slice(0, start);
  let block = rewrittenSource.slice(start, end);
  const after = rewrittenSource.slice(end);
  for (const result of results.filter(item => item.group === group.name)) {
    const linePattern = new RegExp(`(^\\s*${result.key}:\\s*)'[^']+'`, 'm');
    block = block.replace(linePattern, `$1'${result.value}'`);
  }
  rewrittenSource = before + block + after;
}
await writeFile(dataPath, rewrittenSource, 'utf8');

for (const group of groups) {
  process.stdout.write(`\n${group.name}\n`);
  results
    .filter(item => item.group === group.name)
    .sort((a, b) => a.key.localeCompare(b.key))
    .forEach(item => process.stdout.write(`  ${item.key}: '${item.value}'\n`));
}
