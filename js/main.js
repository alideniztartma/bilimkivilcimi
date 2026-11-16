/* #BilimKıvılcımı · Sayfa yönetimi ve başlatma */
'use strict';

/* [id, menü adı, simge, mobil sekme adı, mobilde gizli?] Mobilde Görevler üst çubuktaki görev düğmesinden açılır. */
const PAGES=[['ogren','Öğren','home','Öğren'],['atolye','Atölye','tools','Atölye'],['lab','Laboratuvar','flask','Deney'],['gorevler','Görevler','target','Görev',1],['magaza','Mağaza','bag','Mağaza'],['profil','Profil','user','Profil']];
const SUB={cizim:'atolye',sozluk:'atolye',defter:'lab',ogretmen:'',hakkinda:'',yonetici:'',yuva:''};
const FULL=new Set(['lab','defter','ogretmen','hakkinda','yonetici']);
/* Eski #egitim bağlantıları: ilgili alanın yol haritasını aç */
const isTrack=h=>h==='egitim'||(/^egitim-[a-z]+$/.test(h)&&FIELDS.some(f=>'egitim-'+f.id===h));
let page='ogren';
function renderNav(){
  const cur=page.startsWith('lab-')?'lab':(SUB[page]!=null?SUB[page]:page);
  const h=PAGES.map(p=>`<a class="nav ${p[4]?'dsk':''} nav-${p[0]}" href="#${p[0]}" ${p[0]===cur?'aria-current="page"':''}><span class="ni">${ic(p[2],24)}</span><span class="lg">${p[1]}</span><span class="sh">${p[3]}</span></a>`).join('');
  $('#sideNav').innerHTML=h;$('#tabNav').innerHTML=h;
  $$('.side .small a').forEach(a=>a.toggleAttribute('aria-current',a.getAttribute('href')==='#'+page));
  $$('.side .small a[aria-current]').forEach(a=>a.setAttribute('aria-current','page'));
}
const validPage=h=>PAGES.some(p=>p[0]===h)||SUB[h]!=null||isTrack(h)||(/^lab-[a-z]+$/.test(h)&&EXPS.some(x=>'lab-'+x.id===h));
/* Sayfa geçişi: yalnızca içerik yumuşakça belirir */
let firstRoute=true;
function route(){
  let h=location.hash.slice(1);if(!validPage(h))h='ogren';
  if(firstRoute||h===page||reduce){firstRoute=false;doRoute();return}
  doRoute();const sec=$$('[data-page]').find(s=>!s.hidden);if(sec){$$('section.pg-in').forEach(x=>x.classList.remove('pg-in'));void sec.offsetWidth;sec.classList.add('pg-in');clearTimeout(route.t);route.t=setTimeout(()=>sec.classList.remove('pg-in'),700)}
}
function doRoute(){
  let h=location.hash.slice(1);if(!validPage(h))h='ogren';
  if(isTrack(h)){if(h.length>7){S.field=h.slice(7);save()}history.replaceState(null,'','#ogren');h='ogren';renderPath()}
  if(page.startsWith('lab-')&&h!==page)unmountExp();
  if(!$('#modal').hidden&&!$('#mbox').dataset.lockbg)closeModal();
  page=h;const sec=h.startsWith('lab-')?'exp':h;
  $$('[data-page]').forEach(s=>s.hidden=s.dataset.page!==sec);
  $('.app').classList.toggle('full',FULL.has(h)||h.startsWith('lab-'));
  renderNav();
  if(h==='atolye')renderHub();if(h==='cizim'){DR.prog=[];DR.sel=null;renderDraw()}if(h==='sozluk')renderGloss();if(h==='gorevler')renderQuests();if(h==='magaza')renderShop();if(h==='profil')renderProfile();
  if(h==='lab')renderLab();if(h==='defter')renderNotebook();if(h==='ogretmen')renderTeacher();if(h==='hakkinda')renderAbout();
  if(h.startsWith('lab-'))renderExp(h.slice(4));if(h==='yonetici')renderAdmin();if(h==='yuva')renderNest();
  document.title=(h==='ogren'?'':(h.startsWith('lab-')?EXPS.find(x=>'lab-'+x.id===h).title:(PAGES.find(p=>p[0]===h)||[0,{cizim:'Çizim atölyesi',sozluk:'Sözlük',defter:'Deney defterim',ogretmen:'Öğretmenler için',hakkinda:'Proje hakkında',yonetici:'Yönetici paneli',yuva:'Anka\'nın yuvası'}[h]])[1])+' · ')+'#BilimKıvılcımı';
  window.scrollTo(0,0);if(h==='ogren')scrollCur();
  if(!S.onb&&h==='ogren'&&$('#modal').hidden)onboard();
}
addEventListener('hashchange',route);
function scrollCur(){if(page!=='ogren')return;requestAnimationFrame(()=>{const c=$('.node.cur');if(c&&c.getBoundingClientRect().top>innerHeight*.7)c.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'})})}
function renderAll(){dayCheck();renderStats();renderPath();renderNav();
  if(page==='atolye')renderHub();if(page==='sozluk')renderGloss();if(page==='gorevler')renderQuests();if(page==='magaza')renderShop();if(page==='profil')renderProfile();if(page==='cizim')paintT();
  if(page==='lab')renderLab()}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(page==='cizim')paintT();if(page.startsWith('lab-'))renderNotes();if(page==='defter')renderNotebook()});

/* Başlat */
if(location.hash&&!validPage(location.hash.slice(1)))history.replaceState(null,'',location.pathname+location.search);
dayCheck();BADGES.forEach(b=>{if(!S.badges[b.id]&&b.t())S.badges[b.id]=dkey()});save();
renderStats();renderPath();route();
setInterval(()=>{const h=S.hearts;dayCheck();if(S.hearts!==h)renderStats()},30000);

/* Uygulamada açılış ekranı: yerel açılış ekranı sayfa çizilince kapanır,
   yerine aynı turuncu Anka ekranı kısa bir süre kalıp yumuşakça kaybolur. */
(function(){const hide=()=>{try{const SP=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.SplashScreen;if(SP)SP.hide({fadeOutDuration:150})}catch(e){}};
  requestAnimationFrame(()=>requestAnimationFrame(hide));setTimeout(hide,3000);
  const b=document.getElementById('boot');if(!b)return;
  const go=()=>{b.classList.add('out');document.documentElement.style.background='';setTimeout(()=>{b.remove();if(typeof appBars==='function')appBars()},400)};
  setTimeout(go,Math.max(300,1100-(Date.now()-(window.__bootT||Date.now()))))})();
