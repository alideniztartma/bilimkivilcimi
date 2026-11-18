/* #BilimKıvılcımı · Yayınlanan ders içeriği
   Yöneticiler ders yazılarını uygulamadan düzenleyip yayınlar (js/icerikedit.js). Yayınlanan sürüm Supabase'teki
   bk_content tablosunda durur; burada önbellekten okunup derslerin üzerine uygulanır. Yeni APK gerekmez.
   temel-*.js dosyalarından SONRA, dersler.js'ten ÖNCE yüklenir. Biçim:
   {units:{<ünite id>:{title,desc}}, lessons:{<ders id>:{title, ex:[alıştırmalar]}}} */
'use strict';
const ICKEY='bk-icerik';
/* Değişmemiş içerik: düzenleyici "orijinale döndür" için kullanır */
const U_ORIG=JSON.parse(JSON.stringify(U));
let ICV=null;try{ICV=JSON.parse(localStorage.getItem(ICKEY))}catch(e){}

/* Yalnızca birkaç biçim etiketine izin ver (b, i, u, em, strong, code, br); geri kalan her < işareti metne dönüşür */
const icSafe=s=>typeof s==='string'?s.slice(0,4000).replace(/<(?!\/?(b|i|u|em|strong|code|br)\s*\/?>)/gi,'&lt;'):'';
/* Soru metni her yerde kaçışlanarak (esc) gösterilir: olduğu gibi kalır */
const icQ=s=>typeof s==='string'?s.slice(0,600):'';
const icPlain=s=>typeof s==='string'?s.slice(0,400).replace(/</g,'‹'):'';
const icStrs=(a,max=12)=>Array.isArray(a)?a.filter(x=>typeof x==='string'&&x.trim()).slice(0,max).map(x=>x.slice(0,400)):[];
const icCode=s=>typeof s==='string'?s.slice(0,3000):'';

/* Bir alıştırmayı denetle ve temizle. Bozuksa null döner (o alıştırma atlanır). */
function icEx(e){
  if(!e||typeof e!=='object')return null;
  const o={t:e.t};
  ['fig','mono','monoL','plain','lines','loop'].forEach(k=>{if(e[k]!=null&&typeof e[k]!=='object')o[k]=e[k]});
  if(typeof e.fig==='string'&&typeof FIG==='object'&&!FIG[e.fig])delete o.fig;
  if(e.code)o.code=icCode(e.code);
  if(e.tip)o.tip=icSafe(e.tip);
  switch(e.t){
    case 'info':o.h=icSafe(e.h);o.p=icSafe(e.p);return o.h||o.p?o:null;
    case 'mc':case 'fill':{o.q=icQ(e.q);o.opts=icStrs(e.opts,8);o.a=e.a|0;
      if(o.opts.length<2||o.a<0||o.a>=o.opts.length)return null;
      if(e.t==='fill'&&!(o.code||'').includes('___'))return null;return o}
    case 'type':{o.q=icQ(e.q);o.a=icStrs(Array.isArray(e.a)?e.a:[e.a],8);return o.q&&o.a.length?o:null}
    case 'order':{o.q=icQ(e.q);o.items=icStrs(e.items,10);if(Array.isArray(e.extra))o.extra=icStrs(e.extra,4);return o.items.length>=2?o:null}
    case 'line':{o.q=icQ(e.q);o.lines=icStrs(e.lines,12);o.a=(Array.isArray(e.a)?e.a:[e.a]).map(x=>x|0).filter(x=>x>=0&&x<o.lines.length);
      return o.lines.length>=2&&o.a.length?o:null}
    case 'match':{o.q=icQ(e.q)||'Eşleri bul';o.pairs=(Array.isArray(e.pairs)?e.pairs:[]).filter(p=>Array.isArray(p)&&typeof p[0]==='string'&&typeof p[1]==='string'&&p[0].trim()&&p[1].trim()).slice(0,6).map(p=>[p[0].slice(0,200),p[1].slice(0,200)]);
      return o.pairs.length>=2?o:null}
    case 'robot':{if(!Array.isArray(e.map)||!e.map.every(r=>typeof r==='string'))return null;o.q=icQ(e.q);o.map=e.map.slice(0,12);o.dir=e.dir|0;o.max=Math.max(1,e.max|0);if(e.loop!=null)o.loop=e.loop;return o}
  }
  return null;
}
function icApply(d){
  if(!d||typeof d!=='object')return;
  const us=d.units||{},ls=d.lessons||{};
  U.forEach(u=>{const x=us[u.id];if(x){if(x.title)u.title=icPlain(x.title);if(x.desc!=null)u.desc=icSafe(x.desc)}
    u.lessons.forEach(l=>{const y=ls[l.id];if(!y)return;if(y.title)l.title=icPlain(y.title);
      if(Array.isArray(y.ex)){const ex=y.ex.map(icEx).filter(Boolean);if(ex.length)l.ex=ex}})});
}
try{if(ICV&&ICV.data)icApply(ICV.data)}catch(e){console.warn('İçerik uygulanamadı',e)}

/* Arka planda en son yayınlanan sürümü indir; yeniyse sakla ve "Yenile" öner */
async function contentSync(manual){
  if(typeof sbFetch!=='function')return null;
  try{const r=await sbFetch('/rest/v1/bk_content?select=version,data,created_at&order=version.desc&limit=1');
    if(!r.ok)return null;const row=(await r.json())[0];
    const cur=ICV?ICV.v:0;
    if(!row){if(cur){localStorage.removeItem(ICKEY);ICV=null;icAsk()}return 0}
    if(row.version===cur)return row.version;
    ICV={v:row.version,data:row.data,at:row.created_at};localStorage.setItem(ICKEY,JSON.stringify(ICV));
    if(!manual)icAsk();return row.version;
  }catch(e){return null}
}
function icAsk(){if(typeof toast!=='function')return;
  toast(`Ders içerikleri güncellendi. <button class="b3 sm" type="button" onclick="location.reload()" style="margin-left:6px">Yenile</button>`,8000)}
window.addEventListener('load',()=>setTimeout(()=>contentSync(),2500));
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){const n=Date.now();if(!contentSync.t||n-contentSync.t>10*60000){contentSync.t=n;contentSync()}}});
