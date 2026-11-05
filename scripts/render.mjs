import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
const server=await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
try {
 const {render}=await server.ssrLoadModule('svelte/server');
 const cssFiles=(await fs.readdir('dist/assets')).filter(n=>n.endsWith('.css'));
 const css=(await Promise.all(cssFiles.map(n=>fs.readFile('dist/assets/'+n,'utf8')))).join('\n');
 const routes=['/kb','/kb/incidents/4471','/kb/incidents/4471-review','/kb/triage/dedupe','/kb/decisions/0001-dedupe-by-subject','/kb/decisions/0002-dedupe-by-cause'];
 for(const route of routes){
  const mod=await server.ssrLoadModule(`/src/routes${route}/+page.svx`);
  const {body,head}=render(mod.default);
  const linked=body.replace(/href="(\/kb[^"#]*)"/g,(_,target)=>`href="${path.posix.relative(route.slice(1),target.slice(1)+'/index.html')}"`);
  const out=`rendered${route}/index.html`;
  await fs.mkdir(path.dirname(out),{recursive:true});
  await fs.writeFile(out,`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${head}<style>${css}</style></head><body>${linked}</body></html>`);
  console.log(out);
 }
} finally {await server.close();}
