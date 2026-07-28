import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pages } from '../src/site.config.mjs';

const rootDirectory = process.cwd();
const checkOnly = process.argv.includes('--check');

const read = relativePath => readFile(path.join(rootDirectory, relativePath), 'utf8');

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

function renderExtraHead(page) {
  const styles = (page.styles ?? [])
    .map(href => `    <link rel="stylesheet" href="${page.root}${href}">`)
    .join('\n');
  const highlight = page.highlight
    ? '    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>'
    : '';

  return [styles, highlight].filter(Boolean).join('\n');
}

function renderScripts(page) {
  const pageScript = page.script
    ? `    <script type="module" src="${page.root}${page.script}"></script>`
    : '';

  return `    <script type="module" src="${page.root}assets/js/nav-drawer.js"></script>
    <script type="module">
        import i18n from '${page.root}assets/js/i18n.js';
        i18n.init();
    </script>
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
      root: page.root,
      extraHead: renderExtraHead(page)
    });
    const html = render(layout, {
      head: renderedHead.trimEnd(),
      bodyAttributes: page.bodyAttributes,
      navbar: render(navbar, { root: page.root }).trimEnd(),
      content,
      footer: footer.trimEnd(),
      scripts: renderScripts(page)
    });
    const destination = path.join(rootDirectory, page.output);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, `${html.trim()}\n`, 'utf8');
  }
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
    'package-lock.json'
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
  console.log(`Generated ${pages.length} static pages from shared templates.`);
} else {
  await validateOutput();
}
