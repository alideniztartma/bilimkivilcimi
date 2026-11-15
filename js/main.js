/* #BilimKıvılcımı · Sayfa yönetimi ve başlatma */
'use strict';

const PAGES=[['ogren','Öğren','home','Öğren'],['atolye','Atölye','tools','Atölye'],['lab','Laboratuvar','flask','Deney'],['gorevler','Görevler','target','Görev'],['magaza','Mağaza','bag','Mağaza',1],['profil','Profil','user','Profil']];
const SUB={cizim:'atolye',sozluk:'atolye',defter:'lab',ogretmen:'',hakkinda:''};
const FULL=new Set(['lab','defter','ogretmen','hakkinda']);
let page='ogren';
function renderNav(){
  const cur=page.startsWith('lab-')?'lab':(SUB[page]!=null?SUB[page]:page);
  const h=PAGES.map(p=>`<a class="nav ${p[4]?'dsk':''}" href="#${p[0]}" ${p[0]===cur?'aria-current="page"':''}><span class="ni">${ic(p[2],24)}</span><span class="lg">${p[1]}</span><span class="sh">${p[3]}</span></a>`).join('');
  $('#sideNav').innerHTML=h;$('#tabNav').innerHTML=h;
  $$('.side .small a').forEach(a=>a.toggleAttribute('aria-current',a.getAttribute('href')==='#'+page));
  $$('.side .small a[aria-current]').forEach(a=>a.setAttribute('aria-current','page'));
}
const validPage=h=>PAGES.some(p=>p[0]===h)||SUB[h]!=null||(/^lab-[a-z]+$/.test(h)&&EXPS.some(x=>'lab-'+x.id===h));
function route(){
  let h=location.hash.slice(1);if(!validPage(h))h='ogren';
  if(page.startsWith('lab-')&&h!==page)unmountExp();
  if(!$('#modal').hidden&&!$('#mbox').dataset.lockbg)closeModal();
  page=h;const sec=h.startsWith('lab-')?'exp':h;
  $$('[data-page]').forEach(s=>s.hidden=s.dataset.page!==sec);
  $('.app').classList.toggle('full',FULL.has(h)||h.startsWith('lab-'));
  renderNav();
  if(h==='atolye')renderHub();if(h==='cizim'){DR.prog=[];DR.sel=null;renderDraw()}if(h==='sozluk')renderGloss();if(h==='gorevler')renderQuests();if(h==='magaza')renderShop();if(h==='profil')renderProfile();
  if(h==='lab')renderLab();if(h==='defter')renderNotebook();if(h==='ogretmen')renderTeacher();if(h==='hakkinda')renderAbout();
  if(h.startsWith('lab-'))renderExp(h.slice(4));
  document.title=(h==='ogren'?'':(h.startsWith('lab-')?EXPS.find(x=>'lab-'+x.id===h).title:(PAGES.find(p=>p[0]===h)||[0,{cizim:'Çizim atölyesi',sozluk:'Sözlük',defter:'Deney defterim',ogretmen:'Öğretmenler için',hakkinda:'Proje hakkında'}[h]])[1])+' · ')+'#BilimKıvılcımı';
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
