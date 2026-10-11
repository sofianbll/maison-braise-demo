import assert from 'node:assert/strict';
import {readFile, readdir, lstat} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('.',import.meta.url));
const pages=['index.html','carte.html','commander.html','contact.html','restaurant.html','mentions-legales.html'];
const allowed=new Set([...pages,'.nojekyll','README.md','verify.mjs','build.mjs','test-menu-model.mjs','.gitignore','DESIGN.md','assets','data']);
for(const name of await readdir(root))if(!['.git','.impeccable','dist'].includes(name))assert.ok(allowed.has(name),'Unexpected publication file: '+name);
for(const [folder,names] of [['assets',['hero.png','food-atlas-v2.png','hero-v2.webp','food-atlas-v2.webp','hero-v2.webp.json','food-atlas-v2.webp.json','site.css','site.js','experience.css','experience.mjs','menu-model.mjs']],['data',['business.json','menu.json']]]){
  for(const name of await readdir(resolve(root,folder))){
    assert.ok(names.includes(name),'Unexpected asset or data file: '+name);
    assert.ok((await lstat(resolve(root,folder,name))).isFile(),'Only regular publication files are allowed.');
  }
}
assert.equal((await readFile(resolve(root,'.nojekyll'),'utf8')).length,0);
const business=JSON.parse(await readFile(resolve(root,'data/business.json'),'utf8'));
const menu=JSON.parse(await readFile(resolve(root,'data/menu.json'),'utf8'));
assert.equal(business.datasetClass,'fictional-realistic-demo');
assert.equal(business.ordering.enabled,false);
assert.equal(business.contact.phoneHref,null);
assert.equal(business.contact.emailHref,null);
assert.equal(business.address.mapHref,null);
assert.equal(menu.length,24);
assert.equal(new Set(menu.map(item=>item.id)).size,24);
assert.equal(new Set(menu.map(item=>item.category)).size,6);
for(const page of pages){
  const html=await readFile(resolve(root,page),'utf8');
  assert.ok(html.includes('noindex,nofollow')&&html.includes('DÉMONSTRATION FICTIVE'));
  assert.ok(!/<form\b|(?:href|src)=["'](?:tel:|mailto:|javascript:)/i.test(html));
  assert.ok(!/33170580133|943814947|Roger Vaillant|sk_live_[A-Za-z0-9]+/.test(html));
  for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(ref.startsWith('#')||ref.startsWith('https://'))continue;
    assert.ok(!ref.startsWith('/')&&!ref.includes('..'),'Paths must work under a GitHub project prefix.');
    const target=resolve(dirname(resolve(root,page)),ref.split(/[?#]/)[0]);
    assert.ok((await lstat(target)).isFile(),'Missing local asset: '+ref);
  }
}
assert.ok((await readFile(resolve(root,'mentions-legales.html'),'utf8')).includes('GitHub Pages'));
console.log('Pass: six pages; 24 fictional items; prefix-safe assets; no active contacts/forms, legacy client details or unexpected publication files.');
