// Post-build step: renders every public route to static HTML so crawlers
// (including AdSense) see unique, full content without running JavaScript.
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const out = path.join(root, 'node_modules/.cache/ssr/entry.cjs');

await build({
  entryPoints: [path.join(root, 'scripts/ssr-entry.tsx')],
  outfile: out,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  define: { 'process.env.API_KEY': '""', 'process.env.GEMINI_API_KEY': '""' },
  logLevel: 'error',
});

const { render, routes } = (await import('node:module')).createRequire(import.meta.url)(out);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const rootRe = /<div id="root">[\s\S]*<\/div>(?=\s*<\/body>)/;
if (!rootRe.test(template)) throw new Error('prerender: #root block not found in dist/index.html');

const stripped = template
  .replace(/<title>[\s\S]*?<\/title>/, '')
  .replace(/<meta name="(title|description|keywords)"[^>]*>/g, '')
  .replace(/<meta (property|name)="(og|twitter):[^"]*"[^>]*>/g, '')
  .replace(/<link rel="canonical"[^>]*>/g, '')
  .replace(/<script type="importmap">[\s\S]*?<\/script>/, '')
  .replace(/<link rel="stylesheet" href="\/index.css">\s*/, '');

for (const url of routes) {
  const { html, helmet } = render(url);
  const head = ['title', 'meta', 'link', 'script']
    .map((k) => helmet[k].toString())
    .join('\n');
  const page = stripped
    .replace('</head>', `${head}\n</head>`)
    .replace(rootRe, `<div id="root">${html}</div>\n  `);
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
}
console.log(`prerendered ${routes.length} routes`);
