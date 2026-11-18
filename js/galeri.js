/* #BilimKıvılcımı · Çizim galerisi: Atölye'deki çizim tuvalini küçük resim olarak kaydeder (en fazla 12). */
'use strict';
const GAL_KEY='bk-galeri',GAL_MAX=12;
const galLoad=()=>{try{const a=JSON.parse(localStorage.getItem(GAL_KEY)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}};
function galSave(a){
  while(a.length>GAL_MAX)a.shift();
  for(;;){try{localStorage.setItem(GAL_KEY,JSON.stringify(a));return true}catch(e){if(a.length<=1)return false;a.shift()}}
}
const _renderDrawG=renderDraw;
renderDraw=function(){
  _renderDrawG();
  const pg=$('#pgDraw');if(!pg)return;
  const row=$('#tclear')&&$('#tclear').parentElement;
  if(row)row.insertAdjacentHTML('beforeend',`<button class="b3 ghost" type="button" id="galAdd">${ic('download',18)}Galeriye kaydet</button>`);
  pg.insertAdjacentHTML('beforeend',`<section class="gal" aria-label="Çizim galerim"><h2 class="gal-h">Galerim</h2><div id="galGrid"></div></section>`);
  galPaint();
};
function galPaint(){
  const g=$('#galGrid');if(!g)return;const a=galLoad();
  g.innerHTML=a.length?`<div class="gal-grid">${a.map((x,i)=>`<button type="button" class="gal-i" data-gal="${i}" aria-label="${esc(x.n||'Çizim')} resmini büyüt"><img src="${x.d}" alt="${esc(x.n||'Çizim')}"><span>${esc(x.n||'Çizim')}</span></button>`).join('')}</div><p class="cnt">${a.length} / ${GAL_MAX} resim. Dolunca en eski resim silinir.</p>`
    :`<p class="cnt">Henüz resim yok. Bir çizim yap, sonra "Galeriye kaydet"e dokun.</p>`;
}
function galAdd(){
  const cv=$('#tcv'),res=$('#tres');if(!cv)return;
  const o=document.createElement('canvas');o.width=o.height=360;const x=o.getContext('2d');
  x.fillStyle='#FBF6EA';x.fillRect(0,0,360,360);x.drawImage(cv,0,0,360,360);
  const d=o.toDataURL('image/jpeg',.72),a=galLoad();
  a.push({d,n:(CHAL[DR.ch]&&CHAL[DR.ch].name)||'Çizim',t:Date.now()});
  const ok=galSave(a);galPaint();
  if(ok){sfx.ok();if(res){res.textContent='Galeriye kaydedildi!';res.style.color='var(--olive-ts)'}}
  else{sfx.bad();if(res){res.textContent='Kaydedilemedi, yer yok.';res.style.color='var(--garnet)'}}
}
document.addEventListener('click',e=>{
  if(typeof page==='undefined'||page!=='cizim')return;
  if(e.target.closest('#galAdd')){galAdd();return}
  const b=e.target.closest('[data-gal]');
  if(b){const i=+b.dataset.gal,x=galLoad()[i];if(!x)return;
    const native=!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform());
    openModal(`<h3 style="margin:0 0 8px">${esc(x.n||'Çizim')}</h3><img class="gal-big" src="${x.d}" alt="${esc(x.n||'Çizim')}">
      <div class="ngbtns" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px"><button type="button" class="b3 ghost" id="galX">Kapat</button>
      <button type="button" class="b3 ghost" id="galDel" data-i="${i}">${ic('trash',18)}Sil</button>
      ${native?'':`<a class="b3" href="${x.d}" download="cizim-${x.t||i}.jpg">${ic('download',18)}İndir</a>`}</div>`);
    return}
  if(e.target.closest('#galX')){closeModal();return}
  const d=e.target.closest('#galDel');
  if(d){const a=galLoad();a.splice(+d.dataset.i,1);galSave(a);closeModal();galPaint()}
});
