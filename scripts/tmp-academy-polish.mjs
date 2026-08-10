import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const excluded = new Set(['.git', 'node_modules']);
const textExtensions = new Set(['.html', '.json', '.md', '.js', '.mjs']);

function normalizeTanween(text) {
  let next = text;
  let previous;
  const misplaced = /([\u0621-\u064A]+)([\u064B-\u064D])([\u0621-\u064A]+)(?=[^\u0621-\u064A]|$)/gu;
  do {
    previous = next;
    next = next.replace(misplaced, '$1$3$2');
  } while (next !== previous);
  return next;
}

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    const original = fs.readFileSync(fullPath, 'utf8');
    let updated = normalizeTanween(original);
    if (fullPath.endsWith(path.join('src', 'templates', 'footer.html'))) {
      updated = updated.replace(/X7do0eng/g, 'x7do0');
    }
    if (updated !== original) fs.writeFileSync(fullPath, updated);
  }
}

walk(root);
console.log('Academy branding and Arabic tanween style normalized.');
