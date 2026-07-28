import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { pages } from '../src/site.config.mjs';
import { questions } from '../data/python-practice-questions.js';
import { finalProject } from '../data/python-final-project.js';

const rootDirectory = process.cwd();
const checkOnly = process.argv.includes('--check');
const assetHashes = new Map();
const siteUrl = 'https://x7do0.github.io/X7do0-Academy';

const read = relativePath => readFile(path.join(rootDirectory, relativePath), 'utf8');

async function versionedAsset(root, relativePath) {
  let hash = assetHashes.get(relativePath);
  if (!hash) {
    const content = await readFile(path.join(rootDirectory, relativePath));
    const hashableContent = /\.(?:css|js|json)$/.test(relativePath)
      ? content.toString('utf8').replaceAll('\r\n', '\n')
      : content;
    hash = createHash('sha256').update(hashableContent).digest('hex').slice(0, 10);
    assetHashes.set(relativePath, hash);
  }
  return `${root}${relativePath}?v=${hash}`;
}

function render(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{{${key}}}`, value ?? ''),
    template
  );
}

function extractPageContent(html, output) {
  const navbarStart = html.indexOf('<nav class="w-full py-6 px-4 navbar-sticky">');
  const navbarEnd = html.indexOf('</nav>', navbarStart);
  const footerStart = html.lastIndexOf('<footer');

  if (navbarStart < 0 || navbarEnd < 0 || footerStart < 0 || footerStart <= navbarEnd) {
    throw new Error(`Cannot bootstrap the page fragment from ${output}`);
  }

  return `${html.slice(navbarEnd + '</nav>'.length, footerStart).trim()}\n`;
}

async function ensurePageSource(page) {
  const sourcePath = path.join(rootDirectory, page.source);

  try {
    await stat(sourcePath);
  } catch {
    const currentOutput = await read(page.output);
    await mkdir(path.dirname(sourcePath), { recursive: true });
    await writeFile(sourcePath, extractPageContent(currentOutput, page.output), 'utf8');
  }
}

async function renderExtraHead(page) {
  const styles = await Promise.all(
    (page.styles ?? []).map(async href =>
      `    <link rel="stylesheet" href="${await versionedAsset(page.root, href)}">`
    )
  );
  const highlight = page.highlight
    ? '    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>'
    : '';

  return [...styles, highlight].filter(Boolean).join('\n');
}

async function renderScripts(page) {
  const pageScripts = page.scripts ?? (page.script ? [page.script] : []);
  const [navDrawer, ...versionedPageScripts] = await Promise.all([
    versionedAsset(page.root, 'assets/js/nav-drawer.js'),
    ...pageScripts.map(src => versionedAsset(page.root, src))
  ]);
  const pageScript = versionedPageScripts
    .map(src => `    <script type="module" src="${src}"></script>`)
    .join('\n');

  return `    <script type="module" src="${navDrawer}"></script>
${pageScript}`.trimEnd();
}

async function buildPages() {
  const [layout, head, navbar, footer] = await Promise.all([
    read('src/templates/layout.html'),
    read('src/templates/head.html'),
    read('src/templates/navbar.html'),
    read('src/templates/footer.html')
  ]);

  for (const page of pages) {
    await ensurePageSource(page);
    const content = (await read(page.source)).trim();
    const renderedHead = render(head, {
      title: page.title,
      description: page.description,
      canonical: `${siteUrl}/${page.output}`,
      root: page.root,
      tailwindCss: await versionedAsset(page.root, 'assets/css/tailwind.css'),
      variablesCss: await versionedAsset(page.root, 'assets/css/variables.css'),
      stylesCss: await versionedAsset(page.root, 'assets/css/styles.css'),
      themeManagerJs: await versionedAsset(page.root, 'assets/js/theme-manager.js'),
      extraHead: await renderExtraHead(page)
    });
    const html = render(layout, {
      head: renderedHead.trimEnd(),
      bodyAttributes: page.bodyAttributes,
      navbar: render(navbar, { root: page.root }).trimEnd(),
      content,
      footer: render(footer, { root: page.root }).trimEnd(),
      scripts: await renderScripts(page)
    });
    const destination = path.join(rootDirectory, page.output);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, `${html.trim()}\n`, 'utf8');
  }
}

const xmlEscape = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

async function buildDiscoveryFiles() {
  const urls = [
    ...pages.map(page => `${siteUrl}/${page.output}`),
    ...questions.map(question => `${siteUrl}/courses/python/practice/question.html?id=${question.id}`),
    ...finalProject.stages.map(stage => `${siteUrl}/courses/python/project/stage.html?id=${stage.id}`)
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${xmlEscape(url)}</loc></url>`).join('\n')}
</urlset>
`;
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  await Promise.all([
    writeFile(path.join(rootDirectory, 'sitemap.xml'), sitemap, 'utf8'),
    writeFile(path.join(rootDirectory, 'robots.txt'), robots, 'utf8')
  ]);
}

async function pathExists(candidate) {
  try {
    const details = await stat(candidate);
    if (details.isDirectory()) {
      await stat(path.join(candidate, 'index.html'));
    }
    return true;
  } catch {
    return false;
  }
}

async function validateOutput() {
  const failures = [];
  const requiredFiles = [
    'assets/favicon.png',
    'assets/preview.png',
    'assets/css/tailwind.css',
    'package.json',
    'package-lock.json',
    'sitemap.xml',
    'robots.txt'
  ];

  for (const requiredFile of requiredFiles) {
    if (!(await pathExists(path.join(rootDirectory, requiredFile)))) {
      failures.push(`Missing required file: ${requiredFile}`);
    }
  }

  for (const page of pages) {
    const html = await read(page.output);
    if (html.includes('cdn.tailwindcss.com')) {
      failures.push(`${page.output} still loads the Tailwind CDN`);
    }
    if (!html.includes(`<link rel="canonical" href="${siteUrl}/${page.output}">`)) {
      failures.push(`${page.output} has no matching canonical URL`);
    }

    const attributes = html.matchAll(/\b(?:href|src)="([^"]+)"/g);
    for (const [, rawReference] of attributes) {
      if (/^(?:https?:|mailto:|tel:|data:|#)/.test(rawReference)) continue;

      const reference = rawReference.split(/[?#]/, 1)[0];
      if (!reference) continue;

      const baseDirectory = path.dirname(path.join(rootDirectory, page.output));
      const candidate = reference.startsWith('/')
        ? path.join(rootDirectory, reference.slice(1))
        : path.resolve(baseDirectory, reference);

      if (!(await pathExists(candidate))) {
        failures.push(`${page.output} references missing path: ${rawReference}`);
      }
    }
  }

  if (failures.length) {
    throw new Error(`Build validation failed:\n- ${failures.join('\n- ')}`);
  }

  console.log(`Validated ${pages.length} generated pages and their local links.`);
}

if (!checkOnly) {
  await buildPages();
  await buildDiscoveryFiles();
  console.log(`Generated ${pages.length} static pages from shared templates.`);
} else {
  await validateOutput();
}
