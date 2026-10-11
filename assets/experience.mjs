import {validateMenu,filterMenu,findDish,categories,positions,money,channelUrl,menuUrl} from './menu-model.mjs';

const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
toggle?.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')!=='true';
  toggle.setAttribute('aria-expanded',String(open));
  toggle.querySelector('.sr-only').textContent=open?'Fermer le menu':'Ouvrir le menu';
  nav.classList.toggle('is-open',open);
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){toggle.click();toggle.focus();}
});

const dialog=document.querySelector('#dish-dialog');
let lastDetailButton=null;
dialog?.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('close',()=>lastDetailButton?.focus());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});

try{
  const items=validateMenu(JSON.parse(document.querySelector('#menu-data').textContent));
  const business=JSON.parse(document.querySelector('#business-data').textContent);
  if(business.ordering.enabled!==false||business.contact.phoneHref!==null||business.contact.emailHref!==null)throw new Error('Demo boundary');
  const params=new URLSearchParams(location.search);
  let category=categories.includes(params.get('categorie'))?params.get('categorie'):'all';
  const search=document.querySelector('#menu-search');
  const list=document.querySelector('#menu-list');
  const status=document.querySelector('#menu-status');
  function updateSelection(){
    document.querySelectorAll('[data-filter]').forEach(button=>{
      const selected=button.dataset.filter===category;
      button.classList.toggle('is-active',selected);
      button.setAttribute('aria-pressed',String(selected));
    });
  }
  function render(){
    if(!list)return;
    const matches=filterMenu(items,category,search.value);
    const ids=new Set(matches.map(item=>item.id));
    list.querySelectorAll('[data-card-id]').forEach(card=>card.hidden=!ids.has(card.dataset.cardId));
    status.textContent=matches.length?matches.length+' plat'+(matches.length>1?'s':''):'Aucun plat ne correspond à cette recherche.';
    document.querySelector('#empty-result').hidden=matches.length>0;
    updateSelection();
  }
  if(list){
    search.disabled=false;
    document.querySelectorAll('[data-filter]').forEach(button=>{
      button.disabled=false;
      button.addEventListener('click',()=>{category=button.dataset.filter;render();});
    });
    search.addEventListener('input',render);
    document.querySelector('#clear-search').addEventListener('click',()=>{search.value='';category='all';render();search.focus();});
    render();
  }
  document.querySelectorAll('[data-dish-id]').forEach(button=>{
    button.disabled=false;
    button.addEventListener('click',()=>{
      const item=findDish(items,button.dataset.dishId);
      if(!item||!dialog)return;
      lastDetailButton=button;
      dialog.querySelector('#dish-dialog-title').textContent=item.name;
      dialog.querySelector('#dish-category').textContent=item.category;
      dialog.querySelector('#dish-price').textContent=money(item.priceCents);
      dialog.querySelector('#dish-description').textContent=item.description;
      dialog.querySelector('#dish-ingredients').textContent=item.allergensIllustrative.length?'Allergènes illustratifs : '+item.allergensIllustrative.join(', ')+'.':'Informations alimentaires à confirmer pour un vrai restaurant.';
      const photo=dialog.querySelector('.food-photo');
      photo.style.setProperty('--photo-x',positions[item.category][0]+'%');
      photo.style.setProperty('--photo-y',positions[item.category][1]+'%');
      photo.setAttribute('aria-label','Illustration de la catégorie '+item.category);
      dialog.querySelector('#dish-channel').href=channelUrl(item,category);
      dialog.showModal();
    });
  });

  const selected=document.querySelector('#selected-dish');
  if(selected){
    const item=findDish(items,params.get('plat'));
    const name=document.querySelector('#selected-name');
    document.querySelector('#back-to-menu').href=menuUrl(category);
    if(item){
      selected.hidden=false;
      name.textContent=item.name;
      document.querySelector('#selected-price').textContent=money(item.priceCents);
      const photo=selected.querySelector('.food-photo');
      photo.style.setProperty('--photo-x',positions[item.category][0]+'%');
      photo.style.setProperty('--photo-y',positions[item.category][1]+'%');
    }else if(params.has('plat')){
      document.querySelector('#channel-status').textContent='Ce plat n’est pas dans la carte. Vous pouvez choisir une autre recette.';
    }
    document.querySelectorAll('[data-channel]').forEach(button=>button.addEventListener('click',()=>{
      const pickup=button.dataset.channel==='pickup';
      const preview=document.querySelector('#channel-preview');
      preview.hidden=false;
      document.querySelector('#preview-title').textContent=pickup?'Aperçu du retrait':'Aperçu de la livraison';
      document.querySelector('#preview-dish').textContent=item?item.name+' · '+money(item.priceCents):'Votre sélection de la carte';
      document.querySelector('#preview-description').textContent=pickup?'Dans le scénario, le retrait se prépare en '+business.services.pickupMinutes.join(' à ')+' minutes.':'Dans le scénario : zone de '+business.services.delivery.radiusKm+' km, minimum de '+money(business.services.delivery.minimumOrderCents)+' et frais de '+money(business.services.delivery.feeCents)+'.';
      document.querySelector('#preview-title').focus();
      document.querySelector('#channel-status').textContent='Canal sélectionné : '+(pickup?'retrait':'livraison')+'. Aperçu uniquement, aucune commande transmise.';
    }));
  }
}catch{
  const status=document.querySelector('#menu-status')||document.querySelector('#channel-status');
  if(status)status.textContent='Les outils sont momentanément indisponibles. Les informations déjà affichées restent consultables.';
}
