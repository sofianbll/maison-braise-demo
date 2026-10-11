export const categories=['Burgers','Tacos','Chicken','Salades','Desserts','Boissons'];
export const positions=Object.freeze({Burgers:[0,0],Tacos:[50,0],Chicken:[100,0],Salades:[0,100],Desserts:[50,100],Boissons:[100,100]});
export const money=value=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(value/100);
export const normal=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/œ/g,'oe').trim();

export function validateMenu(items){
  if(!Array.isArray(items)||!items.length)throw new Error('Invalid menu');
  const ids=new Set();
  for(const item of items){
    if(!item||!['id','name','category','description'].every(key=>typeof item[key]==='string'&&item[key].length>0)||
      !/^[a-z0-9-]+$/.test(item.id)||ids.has(item.id)||!categories.includes(item.category)||
      !Number.isSafeInteger(item.priceCents)||item.priceCents<=0||
      !Array.isArray(item.allergensIllustrative)||item.allergensIllustrative.some(value=>typeof value!=='string'))throw new Error('Invalid menu item');
    ids.add(item.id);
  }
  return items;
}

export function filterMenu(items,category='all',query=''){
  const text=normal(query.slice(0,120));
  return items.filter(item=>(category==='all'||item.category===category)&&normal(item.name+' '+item.description).includes(text));
}

export const findDish=(items,id)=>items.find(item=>item.id===id)||null;
export function channelUrl(item,category='all'){
  const params=new URLSearchParams({plat:item.id});
  if(categories.includes(category))params.set('categorie',category);
  return 'commander.html?'+params;
}

export function menuUrl(category='all'){
  return categories.includes(category)?'carte.html?'+new URLSearchParams({categorie:category}):'carte.html';
}
