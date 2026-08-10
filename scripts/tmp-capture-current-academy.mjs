import fs from 'node:fs';
import { chromium } from 'playwright';

fs.mkdirSync('docs/screenshots', { recursive: true });
const browser = await chromium.launch({ headless: true });

async function capture(name, route, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(`http://127.0.0.1:4173/${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts?.ready);
  await page.screenshot({ path: `docs/screenshots/${name}.png`, fullPage: false });
  await page.close();
}

await capture('01-home-current', 'index.html', { width: 1440, height: 960 });
await capture('02-courses-current', 'courses/index.html', { width: 1440, height: 960 });
await capture('03-python-overview-current', 'courses/python/index.html', { width: 1440, height: 960 });
await capture('04-python-lessons-current', 'courses/python/lessons/index.html', { width: 1440, height: 960 });
await capture('05-python-practice-current', 'courses/python/practice/index.html', { width: 1440, height: 960 });
await capture('06-home-mobile-current', 'index.html', { width: 390, height: 844 });

await browser.close();
console.log('Captured current Academy screenshots.');
