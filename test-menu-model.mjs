import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validateMenu,filterMenu,findDish,channelUrl,menuUrl,money} from './assets/menu-model.mjs';

const menu=validateMenu(JSON.parse(await readFile(new URL('data/menu.json',import.meta.url),'utf8')));
assert.equal(filterMenu(menu).length,24);
assert.equal(filterMenu(menu,'Burgers').length,6);
assert.equal(filterMenu(menu,'all','BŒUF').length,2); // Both the beef and mixed tacos mention beef.
assert.deepEqual(filterMenu(menu,'all','boeuf').map(item=>item.id),['tacos-boeuf','tacos-mix']);
assert.deepEqual(filterMenu(menu,'all','vegetal').map(item=>item.id),['veggie','tacos-veggie','salade-vegetale']);
assert.equal(filterMenu(menu,'Burgers','zzzz').length,0);
assert.equal(findDish(menu,'missing'),null);
assert.equal(findDish(menu,'veggie').priceCents,990);
assert.equal(channelUrl(findDish(menu,'veggie'),'Burgers'),'commander.html?plat=veggie&categorie=Burgers');
assert.equal(menuUrl('Burgers'),'carte.html?categorie=Burgers');
assert.equal(menuUrl('unknown'),'carte.html');
assert.equal(money(850),'8,50 €');
assert.throws(()=>validateMenu([...menu,menu[0]]));
assert.throws(()=>validateMenu([{...menu[0],priceCents:0}]));
assert.throws(()=>validateMenu([{...menu[0],id:'<script>'}]));
console.log('Pass: categories, accent-insensitive search, empty/unknown dish, preserved selection links, integer-cent price and invalid-data rejection.');
