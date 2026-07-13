import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');

async function importSource(relativePath) {
  const source = await fs.readFile(path.join(root, relativePath), 'utf8');
  const url = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  return import(url);
}

const quiz = await importSource('js/data/quiz.js');
const pets = await importSource('js/data/pets.js');

const payload = quiz.PERSONAS.map(persona => {
  const pet = pets.FEATURED_PETS.find(item => item.id === persona.petId);
  if (!pet) throw new Error(`Missing pet for persona ${persona.petId}`);
  return {
    persona,
    pet,
    letter: pets.PET_LETTERS[pet.id],
  };
});

const output = path.join(root, 'generated/share/poster-data.json');
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(payload, null, 2), 'utf8');
console.log(`Exported ${payload.length} share poster records to ${output}`);
