/* #BilimKıvılcımı · Kodlama yolu: ders yolu, alıştırmalar, atölye, çizim, mağaza, profil, tanışma */
'use strict';

const UDECO=['split','loop','traffic','box','snake','robot','tools','bulb'];
let BUDDY_LINE=pickL(ANKA.path);
function ankaMsg(){
  const t=dkey();if(S.msgHide===t||!S.onb)return '';
  let mood='happy',txt,cta=null;
  const cur=curLesson();
  if(!S.lessons){mood='wave';txt=`Merhaba${S.name?' <b>'+esc(S.name)+'</b>':''}! İlk dersin hazır. Birlikte başlayalım mı?`;cta=cur?['Başla','lesson']:null}
  else if(S.hearts<=0){mood='sad';txt='Kalplerin bitti. Atölyede <b>alıştırma</b> yaparak kalp kazanabilirsin.';cta=['Atölye','#atolye']}
  else if(S.lastDay!==t&&S.streak>0){mood='sad';txt=`Serin <b>${S.streak} gün</b>! Bugün bir ders yapmazsan söner.`;cta=cur?['Derse başla','lesson']:['Atölye','#atolye']}
  else if(S.day.xp<S.goal){mood='happy';txt=`Bugünkü hedefine <b>${S.goal-S.day.xp} DP</b> kaldı. Hadi devam!`;cta=cur?['Devam et','lesson']:['Atölye','#atolye']}
  else if(!S.dailyDone[t]){mood='think';txt='Günün bulmacasını çözdün mü? <b>15 mozaik taşı</b> seni bekliyor.';cta=['Bulmaca','daily']}
  else{mood='cheer';txt='Bugünkü hedefini tamamladın! Laboratuvarda deney yapmaya ne dersin?';cta=['Laboratuvar','#lab']}
  return `<div class="card amsg">${anka(mood,84,undefined,'act-enter')}<div class="bub">${txt}</div>${cta?(cta[1][0]==='#'?`<a class="b3 sm" href="${cta[1]}">${cta[0]}</a>`:`<button class="b3 sm" type="button" data-amsg="${cta[1]}">${cta[0]}</button>`):''}<button class="x" type="button" data-amsg="hide" aria-label="Mesajı kapat">${ic('x',18)}</button></div>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-amsg]');if(!b)return;const a=b.dataset.amsg;
  if(a==='hide'){S.msgHide=dkey();save();renderPath();return}
  if(a==='lesson'){const c=curLesson();if(c)startMode('lesson',{lesson:c})}
  if(a==='daily')startMode('daily')});

/* ================= DERS YOLU ================= */
/* Sandık kimliği ünite kimliği + 'c'. Bir dersin kimliğiyle çakışırsa (ör. ünite tm1, ders tm1c) farklı bir kimlik kullan. */
const chestId=u=>u.lessons.some(l=>l.id===u.id+'c'||l.id===u.id+'t')?u.id+'-sandik':u.id+'c';
function allNodes(){const out=[];U.forEach((u,ui)=>{u.lessons.forEach((l,li)=>{out.push({k:'lesson',ui,li,id:l.id,l});if(li===1)out.push({k:'chest',ui,id:chestId(u),after:l.id})});out.push({k:'trophy',ui,id:u.id+'t'})});return out}
const curField=()=>FIELDS.some(f=>f.id===S.field)?S.field:'yazilim';
const curLesson=(fid=curField())=>ALL_LESSONS.find(l=>l.field===fid&&!S.done[l.id]);
const unitDone=ui=>U[ui].lessons.every(l=>S.done[l.id]);
function nodeState(n){
  if(n.k==='lesson'){if(S.done[n.id])return'done';const c=curLesson(U[n.ui].field);return c&&c.id===n.id?'cur':'lock'}
  if(n.k==='chest')return S.chests[n.id]?'open':S.done[n.after]?'ready':'lock';
  return S.trophies[n.ui]?'done':unitDone(n.ui)?'ready':'lock';
}
const OFF=[0,54,80,54,0,-54,-80,-54];
/* Alan seçici: üst çubukta küçük düğme (Duolingo'daki dil bayrağı gibi) */
function fieldBtn(){const f=fieldOf(curField());
  return `<button class="fbtn" type="button" data-fmenu aria-haspopup="true" aria-label="Alan: ${f.title}. Değiştirmek için dokun" title="Alan değiştir"><span class="fbi">${ic(f.icon,18)}</span><span class="fbt">${f.title}</span><svg class="fcar" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="square"/></svg></button>`}
function fieldCards(cls){const cf=curField();return FIELDS.map(f=>{const ls=ALL_LESSONS.filter(l=>l.field===f.id),d=ls.filter(l=>S.done[l.id]).length;
  return `<button type="button" class="${cls}" data-field="${f.id}" aria-pressed="${f.id===cf}"><span class="fci">${ic(f.icon,24)}</span><span class="fct"><b>${f.title}</b><small>${esc(f.desc)}</small><span class="bar"><i style="width:${ls.length?d/ls.length*100:0}%"></i><span>${d} / ${ls.length} ders</span></span></span>${f.id===cf?`<span class="fck">${ic('check',18)}</span>`:''}</button>`}).join('')}
function closeFmenu(){const m=$('.fmenu');if(m)m.remove();$$('[data-fmenu]').forEach(b=>b.setAttribute('aria-expanded','false'))}
function openFmenu(btn){closeFmenu();const r=btn.getBoundingClientRect(),m=document.createElement('div');m.className='fmenu';m.setAttribute('role','dialog');m.setAttribute('aria-label','Alan seç');
  m.innerHTML=`<p class="fmh">Hangi alanı öğrenmek istersin?</p>${fieldCards('fopt')}<p class="fmf">İlerlemen her alanda ayrı saklanır. İstediğin zaman geçebilirsin.</p>`;
  document.body.appendChild(m);const w=m.offsetWidth;m.style.top=(r.bottom+8)+'px';m.style.left=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2))+'px';
  btn.setAttribute('aria-expanded','true');const f=m.querySelector('[aria-pressed="true"]')||m.querySelector('button');if(f)f.focus()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-fmenu]');if(b){e.stopPropagation();if($('.fmenu'))closeFmenu();else{sfx.tap();openFmenu(b)}return}
  if($('.fmenu')&&!e.target.closest('.fmenu'))closeFmenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('.fmenu'))closeFmenu()});
addEventListener('resize',closeFmenu);
let PATH_ANIM=true;
function renderPath(){if(typeof petTick==='function')petTick();
  const ns=allNodes(),cf=curField(),F=fieldOf(cf);let h=ankaMsg()+mobileQuests(),gi=0;
  fieldUnits(cf).forEach(({u,ui},fi_)=>{
    const un=ns.filter(n=>n.ui===ui),k=fi_+1;
    h+=`<section class="unit" style="--c:var(--u${ui+1});--cd:var(--u${ui+1}d)">
      <div class="uhead frame"><div class="uin"><div><span class="lbl">${F.title.toLocaleUpperCase('tr')} · ${k}. ÜNİTE</span><h2>${u.title}</h2><p>${u.desc}</p></div>
      <div class="ubtns">${!unitDone(ui)&&!S.trophies[ui]?`<button class="guide" type="button" data-skip="${ui}" aria-label="${u.title} ünitesini atla">${ic('bolt',22)}<span>Atla</span></button>`:''}<button class="guide" type="button" data-guide="${ui}">${ic('book',22)}<span>Rehber</span></button></div></div></div><div class="nodes">`;
    un.forEach((n,i)=>{
      const st=nodeState(n),dx=OFF[i%8]*(k%2?1:-1);
      let inner,lbl;
      if(n.k==='lesson'){inner=st==='done'?ic('check',30):st==='cur'?(n.l.ex.some(e=>e.t==='robot')?ic('robot',30):fi('star',30)):ic('lock',24);lbl=n.l.title}
      else if(n.k==='chest'){inner=ic('chest',54);lbl='Hazine sandığı'}
      else{inner=ic('trophy',54);lbl=k+'. ünite kupası'}
      h+=`<div class="nw" style="--dx:${dx}px;--i:${gi++}" data-node="${n.id}">
        ${st==='cur'?'<span class="tipstart">BAŞLA</span>':''}${n.k==='trophy'&&st==='ready'?'<span class="tipstart">KUPA SINAVI</span>':''}
        <button class="node k-${n.k} ${st}" type="button" aria-label="${esc(lbl)}"><span>${inner}</span></button>
        ${st==='cur'&&n.k==='lesson'?`<div class="buddy" style="--side:${dx>=0?-1:1}">${anka(S.pet&&S.pet.food<25?'sad':S.lessons?'happy':'wave',100)}<span class="bb">${esc(S.pet&&S.pet.food<25?'Acıktım! Bana dokun, yuvama gidelim.':BUDDY_LINE)}</span></div>`:i===2&&!un.some(m=>nodeState(m)==='cur'&&m.k==='lesson')?`<div class="udeco" style="--side:${dx>=0?-1:1}">${ic(U[ui].icon||UDECO[ui]||'star',96)}</div>`:''}
      </div>`;
    });
    h+='</div>'+band(30,ui+2)+'</section>';
  });
  const nU=fieldUnits(cf).length;
  h+=F.soon.map((t,i)=>`<section class="unit soonunit"><div class="uhead frame"><div class="uin"><div><span class="lbl">${F.title.toLocaleUpperCase('tr')} · ${nU+i+1}. ÜNİTE · YAKINDA</span><h2>${esc(t)}</h2><p>Bu ünite hazırlanıyor.</p></div><span class="guide" aria-hidden="true">${ic('lock',22)}</span></div></div></section>`).join('');
  h+=`<div class="pathend">${anka('wow',90)}<h3>Yeni üniteler yolda!</h3><p>Diğer alanlara da göz at, atölyede çizim yap, laboratuvarda deney dene.</p><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${FIELDS.filter(f=>f.id!==cf).map(f=>`<button class="b3 ghost" type="button" data-field="${f.id}">${ic(f.icon,18)} ${f.title}</button>`).join('')}<a class="b3 ghost" href="#lab">Laboratuvar</a></div></div>`;
  $('#path').innerHTML=h;if(PATH_ANIM&&!reduce){const P=$('#path');P.classList.remove('path-in');void P.offsetWidth;P.classList.add('path-in');clearTimeout(P._pa);P._pa=setTimeout(()=>P.classList.remove('path-in'),1800)}PATH_ANIM=false;
}
function mobileQuests(){const n=Object.keys(S.day.claimed).length;
  return `<a class="card mquest" href="#gorevler"><span class="mq-i">${ic('target',22)}</span><span><b>Günlük görevler</b><small>${n} / 3 tamamlandı</small></span><span class="mq-go">${ic('arrowU',18)}</span></a>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-field]');if(!b||b.closest('#mbox'))return;const changed=S.field!==b.dataset.field;S.field=b.dataset.field;save();closeFmenu();sfx.tap();BUDDY_LINE=pickL(ANKA.path);PATH_ANIM=changed;renderStats();renderPath();
  if(page!=='ogren')location.hash='#ogren';else{window.scrollTo(0,0);scrollCur()}
  if(changed)toast(ic(fieldOf(S.field).icon,20)+' '+fieldOf(S.field).title+' yoluna geçtin')});
function closePops(){$$('.pop').forEach(p=>p.remove());$$('.nw.open').forEach(n=>n.classList.remove('open'))}
function popIn(w,html,cls,color){const p=document.createElement('div');p.className='pop'+(cls?' '+cls:'');if(color)p.style.setProperty('--c',color);p.innerHTML=html;w.appendChild(p);w.classList.add('open');
  /* Kutucuk ekrandan taşmasın: kenara yaslanınca içini kaydır, oku düğümün altında bırak */
  const r=p.getBoundingClientRect(),m=10,vw=document.documentElement.clientWidth;let s=0;
  if(r.right>vw-m)s=vw-m-r.right;if(r.left+s<m)s=m-r.left;
  if(s){p.style.transform=`translateX(calc(-50% + ${s}px))`;p.style.setProperty('--px',s+'px')}
  return p}
$('#path').addEventListener('click',e=>{
  const g=e.target.closest('[data-guide]');if(g){openGuide(+g.dataset.guide);return}
  const sk=e.target.closest('[data-skip]');if(sk){sfx.tap();askSkip(+sk.dataset.skip);return}
  const btn=e.target.closest('.node');if(!btn)return;
  const w=btn.closest('.nw'),id=w.dataset.node,n=allNodes().find(x=>x.id===id),st=nodeState(n);
  const had=$('.pop',w);closePops();if(had)return;sfx.tap();
  if(n.k==='chest'){if(st==='ready')return openChest(n);
    popIn(w,st==='open'?'<h3>Sandık açıldı</h3><p>Bu sandığın ödülünü aldın.</p>':'<h3>Hazine sandığı</h3><p>Önceki dersi bitirince açılır.</p>','lock');return}
  if(n.k==='trophy'){
    if(st==='done'){const p=popIn(w,`<h3>${UNIT_BADGE[n.ui]}!</h3><p>Kupa sınavını geçtin. Sertifikan hazır.</p><button class="b3" type="button">Sertifikayı aç</button>`,'','var(--olive)');p.querySelector('button').onclick=ev=>{ev.stopPropagation();closePops();openCert(n.ui)};return}
    if(st==='ready'){const p=popIn(w,`<h3>Kupa sınavı</h3><p>${U[n.ui].title} ünitesinden 8 soru. En fazla 2 hata yaparsan kupayı ve sertifikayı kazanırsın.</p><button class="b3" type="button">Sınava başla +20 DP</button>`,'','var(--ember)');p.querySelector('button').onclick=ev=>{ev.stopPropagation();closePops();startMode('exam',{ui:n.ui})};return}
    {const p=popIn(w,`<h3>${unitNo(n.ui)}. ünite kupası</h3><p>Bütün dersleri bitirince sınav açılır. Konuyu zaten biliyorsan sınava şimdi girip üniteyi atlayabilirsin.</p><button class="b3" type="button">${ic('bolt',20)} Sınava gir, üniteyi atla</button>`,'','var(--ember)');p.querySelector('button').onclick=ev=>{ev.stopPropagation();closePops();askSkip(n.ui)}}return}
  const u=U[n.ui];const xp=st==='done'?5:10;
  const p=popIn(w,`<h3>${esc(n.l.title)}</h3><p>${st==='lock'?'Önce önceki dersleri bitir.':`${n.li+1}. ders / ${u.lessons.length}`+(st==='done'?' · Bitirdin':'')}</p>
    <button class="b3" type="button" data-start="${n.id}">${st==='done'?'Tekrar et':'Başla'} +${xp} DP</button>`,st==='lock'?'lock':'');
  const b=p.querySelector('[data-start]');if(b)b.addEventListener('click',ev=>{ev.stopPropagation();closePops();startMode('lesson',{lesson:n.l})});
});
document.addEventListener('click',e=>{if(!e.target.closest('.nw'))closePops()});
/* Ünite atlama: bilen biri kupa sınavını geçerek o üniteyi (ve aynı alandaki önceki üniteleri) tamamlanmış saydırır */
function askSkip(ui){const u=U[ui],f=u.field,before=U.filter((x,i)=>x.field===f&&unitOrd(i)<unitOrd(ui)&&!x.lessons.every(l=>S.done[l.id])).length;
  openModal(`${anka('think',90)}<h2>${esc(u.title)} ünitesini atla</h2><p>Konuyu biliyorsan kupa sınavına gir: <b>8 soru</b>, en fazla <b>2 hata</b>. Sorular derslerdekinden farklı.</p>
    <p>Geçersen bu ünitenin dersleri${before?` ve önceki ${before} ünite`:''} tamamlanmış sayılır, kupayı da kazanırsın. Geçemezsen hiçbir şey kaybetmezsin.</p>
    <div class="ngbtns"><button class="b3 ghost" type="button" id="skNo">Vazgeç</button><button class="b3" type="button" id="skGo">${ic('bolt',20)} Sınava gir</button></div>`);
  $('#skNo').onclick=closeModal;$('#skGo').onclick=()=>{closeModal();startMode('exam',{ui,skip:true})}}
function openGuide(ui){const u=U[ui];
  openModal(`${anka('happy',80)}<h2>${fieldOf(u.field).title} · ${unitNo(ui)}. Ünite: ${u.title}</h2><p>Derse başlamadan önce bunları oku.</p>
  ${u.guide.map(g=>`<div class="gitem"><h3>${g.h}</h3><p>${g.p}</p>${g.code?`<pre class="code">${hl(g.code)}</pre>`:''}</div>`).join('')}
  <button class="b3" type="button" id="mok">Anladım</button>`);$('#mok').onclick=closeModal}
async function openChest(n){
  const g=15+(n.ui*5);
  openModal(`<div id="chestA" style="color:var(--ember)">${ic('chest',110)}</div><h2>Hazine sandığı!</h2><p>Açmak için dokun.</p><button class="b3 ember" type="button" id="mok">Aç</button>`);
  $('#mok').onclick=async()=>{const a=$('#chestA');if(a.animate&&!reduce)a.animate([{transform:'rotate(0)'},{transform:'rotate(-10deg)'},{transform:'rotate(10deg)'},{transform:'scale(1.2)'}],{duration:500});
    await sleep(450);S.chests[n.id]=1;S.gems+=g;save();sfx.coin();confetti();
    $('#mbox').innerHTML=`<div style="color:var(--olive)">${fi('gem',90)}</div><h2>+${g} mozaik taşı</h2><p>Taşlarla mağazadan kalp, seri koruyucu ve Anka'ya aksesuar alabilirsin.</p><button class="b3" type="button" id="mok2">Harika!</button>`;
    $('#mok2').onclick=()=>{closeModal();renderAll()};$('#mok2').focus()};
}

/* ================= ALIŞTIRMALAR ================= */
const norm=s=>String(s).toLocaleLowerCase('tr').replace(/["'“”]/g,'').replace(/\s+/g,' ').trim();
const mini=(m='happy')=>`<span class="mini">${anka(m,64,undefined,'act-enter')}</span>`;
const qHead=(ex,extra='')=>`${extra}<div class="qh">${mini()}<h2>${esc(ex.q)}</h2>${spkBtn(ex.q)}</div>${ex.code?`<pre class="code">${hl(ex.code)}</pre>`:''}`;
const DIRS=[[0,-1],[1,0],[0,1],[-1,0]];
const CMD={f:['İleri git','arrowU'],l:['Sola dön','rotL'],r:['Sağa dön','rotR']};
/* İpucu: soru başına 1 kez, ücretsiz; kupa sınavında yok */
function addHint(ex){
  if(!L||!L.cur||ex.t==='info'||L.mode==='exam'||L.mode==='speed')return;
  const el=L.cur.el;L.hinted=L.hinted||new Set();
  el.insertAdjacentHTML('beforeend',`<div class="hintrow"><button class="hintb" type="button" ${L.hinted.has(ex)?'disabled':''}>${ic('bulb',20)}İpucu</button><p class="hintt" role="status"></p></div>`);
  const b=$('.hintb',el),p=$('.hintt',el);
  b.addEventListener('click',()=>{if(!L||L.state!=='q'||L.hinted.has(ex))return;L.hinted.add(ex);b.disabled=true;sfx.tap();
    let msg='';
    if(ex.t==='mc'||ex.t==='fill'){
      const sel=ex.t==='mc'?'.opt':'.chip',c=$$(sel,el).filter(x=>+x.dataset.i!==ex.a&&x.getAttribute('aria-pressed')!=='true'&&!x.classList.contains('ghost-spot')&&!x.disabled);
      const x=c.length?c[Math.floor(Math.random()*c.length)]:null;
      if(x){x.disabled=true;x.classList.add('hinted');x.setAttribute('aria-disabled','true');msg='Bir yanlış seçeneği çıkardım.'}
    }
    if(!msg){
      const ans=ex.t==='mc'||ex.t==='fill'?ex.opts[ex.a]:ex.t==='type'?ex.a[0]:'';
      let t=String(ex.tip||'').split(/(?<=[.!?])\s+/)[0]||'';
      if(!t||(ans&&norm(t).includes(norm(ans))))t=ex.t==='robot'?'Robotun hangi yöne baktığına dikkat et. Komutları tek tek aklından çalıştır.':ex.t==='match'?'Önce bildiğin eşleri seç, kalanlar kolaylaşır.':ex.t==='order'?'İlk adımı bul, sonra sırayla devam et.':'Soruyu bir kez daha yavaşça oku. Cevap sorunun içinde saklı olabilir.';
      msg=t}
    p.textContent=msg});
}
function buildEx(ex,ch){const o=buildEx0(ex,ch);if(ex.fig&&typeof figHtml==='function'){const at=o.el.querySelector('.say,.qh');if(at)at.insertAdjacentHTML('afterend',figHtml(ex.fig))}return o}
function buildEx0(ex,ch){
  const el=document.createElement('div');el.className='ex';
  const o={el,ready:()=>false,check:()=>({ok:false})};
  const top=L.mode==='exam'?`<span class="lbl eyebrow">KUPA SINAVI · ${L.done+1} / ${L.total}</span>`:L.mode==='speed'?`<span class="lbl eyebrow">HIZLI TUR · ${L.score} PUAN</span>`:L.combo>=3?`<span class="combo lbl">${fi('flame',18)} ${L.combo} doğru üst üste!</span>`:'';
  if(ex.t==='info'){
    el.innerHTML=`<div class="say">${anka('wave',130,undefined,'act-enter')}<div class="bubble"><h3>${ex.h}${spkBtn(ex.h+'. '+ex.p)}</h3><p>${ex.p}</p></div></div>${ex.code?`<pre class="code">${hl(ex.code)}</pre>`:''}`;
    o.speech=ex.h+'. '+ex.p;o.ready=()=>true;o.check=()=>({ok:true,silent:true});return o}
  o.speech=ex.q;
  if(ex.t==='mc'){
    const order=shuffle(ex.opts.map((t,i)=>i));let sel=-1;
    el.innerHTML=qHead(ex,top)+`<div class="opts">${order.map((i,k)=>`<button class="opt" type="button" data-i="${i}" aria-pressed="false"><kbd>${k+1}</kbd>${ex.mono?`<pre>${hl(ex.opts[i])}</pre>`:`<span>${esc(ex.opts[i])}</span>`}</button>`).join('')}</div>`;
    const pickI=i=>{sel=i;$$('.opt',el).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.i===i));sfx.tap();ch()};
    el.addEventListener('click',e=>{const b=e.target.closest('.opt');if(b)pickI(+b.dataset.i)});
    o.key=k=>{const n=+k;if(n>=1&&n<=order.length)pickI(order[n-1])};
    o.ready=()=>sel>=0;o.check=()=>({ok:sel===ex.a,ans:ex.opts[ex.a],mono:ex.mono,tip:ex.tip});return o}
  if(ex.t==='order'){
    const pool=shuffle(ex.items.concat(ex.extra||[]).map((t,i)=>({t,i})));const ans=[];
    const lines=!!ex.lines,mono=ex.mono||(lines&&!ex.plain);
    el.innerHTML=qHead(ex,top)+`<div class="ans ${lines?'lines':''}"></div><div class="${lines?'bank lines':'chips bank'}"></div>`;
    const A=$('.ans',el),B=$('.bank',el);
    const chip=(p,where,gone)=>lines?`<button class="cl ${ex.plain?'plain':''} ${gone?'gone':''}" type="button" data-i="${p.i}" data-w="${where}">${ex.plain?esc(p.t):hl(p.t)}</button>`
      :`<button class="chip ${mono?'mono':''}" type="button" data-i="${p.i}" data-w="${where}">${esc(p.t)}</button>`;
    const draw=()=>{A.innerHTML=ans.map(p=>chip(p,'a')).join('');
      B.innerHTML=pool.map(p=>ans.includes(p)?(lines?chip(p,'b',true):`<span class="chip ghost-spot ${mono?'mono':''}">${esc(p.t)}</span>`):chip(p,'b')).join('');ch()};
    el.addEventListener('click',e=>{const b=e.target.closest('[data-w]');if(!b||b.classList.contains('gone'))return;const p=pool.find(x=>x.i===+b.dataset.i);
      if(b.dataset.w==='b')ans.push(p);else ans.splice(ans.indexOf(p),1);sfx.tap();draw()});
    draw();o.ready=()=>ans.length>0;
    o.check=()=>({ok:ans.map(p=>p.t).join('\n')===ex.items.join('\n'),ans:ex.items.join(lines?'\n':' '),mono:mono||lines,tip:ex.tip});return o}
  if(ex.t==='fill'){
    let sel=-1;const order=shuffle(ex.opts.map((t,i)=>i));
    const codeH=()=>hl(ex.code).replace('___',`<span class="slot ${sel>=0?'filled':''}">${sel>=0?esc(ex.opts[sel]):'&nbsp;'}</span>`);
    el.innerHTML=`${top}<div class="qh">${mini()}<h2>${esc(ex.q)}</h2>${spkBtn(ex.q)}</div><pre class="code">${codeH()}</pre><div class="chips">${order.map(i=>`<button class="chip mono" type="button" data-i="${i}">${esc(ex.opts[i])}</button>`).join('')}</div>`;
    el.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;sel=+b.dataset.i;$('.code',el).innerHTML=codeH();$$('.chip',el).forEach(c=>c.classList.toggle('ghost-spot',+c.dataset.i===sel));sfx.tap();ch()});
    o.key=k=>{const n=+k;if(n>=1&&n<=order.length)$$('.chip',el)[n-1].click()};
    o.ready=()=>sel>=0;o.check=()=>({ok:sel===ex.a,ans:ex.code.replace('___',ex.opts[ex.a]),mono:true,tip:ex.tip});return o}
  if(ex.t==='match'){
    const Lc=shuffle(ex.pairs.map((p,i)=>i)),Rc=shuffle(ex.pairs.map((p,i)=>i));let sl=null,sr=null,left=ex.pairs.length;o.miss=0;
    el.innerHTML=`${top}<div class="qh">${mini('wow')}<h2>${esc(ex.q)}</h2></div><div class="match"><div class="col">${Lc.map(i=>`<button class="mb ${ex.mono||ex.monoL?'mono':''}" type="button" data-s="l" data-i="${i}">${esc(ex.pairs[i][0])}</button>`).join('')}</div><div class="col">${Rc.map(i=>`<button class="mb" type="button" data-s="r" data-i="${i}">${esc(ex.pairs[i][1])}</button>`).join('')}</div></div>`;
    el.addEventListener('click',async e=>{const b=e.target.closest('.mb');if(!b||b.classList.contains('gone'))return;
      const s=b.dataset.s;$$(`.mb[data-s="${s}"]`,el).forEach(x=>x.setAttribute('aria-pressed','false'));
      if(s==='l')sl=b;else sr=b;b.setAttribute('aria-pressed','true');sfx.tap();
      if(sl&&sr){const a=sl,c=sr;sl=sr=null;a.setAttribute('aria-pressed','false');c.setAttribute('aria-pressed','false');
        if(a.dataset.i===c.dataset.i){a.classList.add('ok');c.classList.add('ok');sfx.ok();await sleep(350);a.classList.replace('ok','gone');c.classList.replace('ok','gone');if(--left===0){o.done=true;ch(true)}}
        else{o.miss++;a.classList.add('no');c.classList.add('no');sfx.bad();await sleep(420);a.classList.remove('no');c.classList.remove('no')}}});
    o.ready=()=>!!o.done;o.check=()=>({ok:true,match:true});return o}
  if(ex.t==='line'){
    let sel=-1;
    el.innerHTML=`${top}<div class="qh">${mini('think')}<h2>${esc(ex.q)}</h2>${spkBtn(ex.q)}</div><div class="lines-pick">${ex.lines.map((t,i)=>`<button class="lr ${ex.plain?'plain':''}" type="button" data-i="${i}" aria-pressed="false"><span>${i+1}</span>${ex.plain?esc(t):hl(t)}</button>`).join('')}</div>`;
    el.addEventListener('click',e=>{const b=e.target.closest('.lr');if(!b)return;sel=+b.dataset.i;$$('.lr',el).forEach(x=>x.setAttribute('aria-pressed',x===b));sfx.tap();ch()});
    o.key=k=>{const n=+k;if(n>=1&&n<=ex.lines.length)$$('.lr',el)[n-1].click()};
    o.ready=()=>sel>=0;o.check=()=>({ok:ex.a.includes(sel),ans:'"'+ex.lines[ex.a[0]].trim()+'" ('+(ex.a[0]+1)+'. satır)',mono:!ex.plain,tip:ex.tip});return o}
  if(ex.t==='type'){
    el.innerHTML=qHead(ex,top)+`<input class="tin" type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Cevabını buraya yaz" aria-label="Cevabın">`;
    const inp=$('input',el);inp.addEventListener('input',()=>ch());setTimeout(()=>inp.focus(),60);
    o.ready=()=>inp.value.trim().length>0;
    o.check=()=>{inp.disabled=true;return{ok:ex.a.map(norm).includes(norm(inp.value)),ans:ex.a[0][0].toLocaleUpperCase('tr')+ex.a[0].slice(1),tip:ex.tip}};return o}
  if(ex.t==='robot'){
    let prog=[],n=3;const loop=!!ex.loop;let walls=new Set(),stars=[],R0;
    ex.map.forEach((row,y)=>[...row].forEach((c,x)=>{if(c==='#')walls.add(x+','+y);if(c==='*')stars.push({x,y});if(c==='R')R0={x,y}}));
    el.innerHTML=`${top}<div class="qh"><h2>${esc(ex.q)}</h2>${spkBtn(ex.q)}</div><div class="robo"><div class="rgrid">${ex.map.map((row,y)=>[...row].map((c,x)=>`<div class="rc5 ${c==='#'?'w':''}">${c==='*'?`<span class="rstar" data-s="${x},${y}">${fi('star',40)}</span>`:''}</div>`).join('')).join('')}
      <div class="rbot" style="--x:${R0.x};--y:${R0.y};--r:${ex.dir*90}"><div>${botSVG()}</div></div></div>
      <div class="pbuild"><div class="pal">${Object.keys(CMD).map(k=>`<button class="pz ${k}" type="button" data-add="${k}">${ic(CMD[k][1],20)}${CMD[k][0]}</button>`).join('')}</div>
      <div class="prog"></div><div class="cnt"></div></div></div>`;
    const P=$('.prog',el),bot=$('.rbot',el);
    const blk=(k,i)=>`<button class="pz ${k}" type="button" data-del="${i}" aria-label="${CMD[k][0]} bloğunu sil">${ic(CMD[k][1],20)}${CMD[k][0]}<span class="x">${ic('x',16)}</span></button>`;
    const draw=()=>{const body=prog.map(blk).join('')||'<p class="ph">Yukarıdaki bloklara dokun.</p>';
      P.innerHTML=loop?`<div class="loopf"><div class="lh">${ic('loop',20)} <button type="button" data-n="-1" aria-label="Azalt">−</button><b>${n}</b><button type="button" data-n="1" aria-label="Artır">+</button> kez tekrarla</div><div class="body">${body}</div></div>`:body;
      $('.cnt',el).textContent=prog.length+' / '+ex.max+' blok'+(loop?' (döngünün içinde)':'');
      $$('[data-add]',el).forEach(b=>b.disabled=prog.length>=ex.max);ch()};
    el.addEventListener('click',e=>{if(o.busy)return;const a=e.target.closest('[data-add]'),d=e.target.closest('[data-del]'),m=e.target.closest('[data-n]');
      if(a&&prog.length<ex.max){prog.push(a.dataset.add);sfx.tap();draw()}
      if(d){prog.splice(+d.dataset.del,1);draw()}
      if(m){n=Math.max(2,Math.min(9,n+ +m.dataset.n));draw()}});
    draw();o.ready=()=>prog.length>0;
    o.check=async()=>{o.busy=true;el.classList.add('lock-ui');
      const ops=loop?Array.from({length:n},()=>prog).flat():prog.slice();
      let x=R0.x,y=R0.y,d=ex.dir,r=ex.dir*90,got=new Set(),crash=false;
      for(const op of ops){
        if(op==='l'){d=(d+3)%4;r-=90;bot.style.setProperty('--r',r);await sleep(300)}
        else if(op==='r'){d=(d+1)%4;r+=90;bot.style.setProperty('--r',r);await sleep(300)}
        else{const nx=x+DIRS[d][0],ny=y+DIRS[d][1];
          if(nx<0||ny<0||nx>4||ny>4||walls.has(nx+','+ny)){crash=true;bot.classList.add('bump');sfx.bad();await sleep(420);break}
          x=nx;y=ny;bot.style.setProperty('--x',x);bot.style.setProperty('--y',y);await sleep(320);
          if(stars.some(q=>q.x===x&&q.y===y)&&!got.has(x+','+y)){got.add(x+','+y);$(`[data-s="${x},${y}"]`,el).classList.add('got');sfx.coin()}
          if(got.size===stars.length)break}}
      const ok=got.size===stars.length;if(ok){bot.classList.add('yay');await sleep(500)}
      return{ok,robot:true,ans:crash?'Robot duvara ya da kenara çarptı.':ok?'':'Robot bütün yıldızlara ulaşamadı.',tip:crash?'Robotun hangi yöne baktığını unutma.':'Komutları tek tek takip ederek dene.'}};
    return o}
  return o;
}

/* ================= DERS AKIŞI (bütün modlar) ================= */
let L=null,timerI=null;
const MODES={
 lesson:{hearts:true,requeue:true},preview:{requeue:true},practice:{requeue:true},mistakes:{requeue:true},daily:{requeue:true},speed:{},exam:{}
};
function gradables(ex){return ex.filter(e=>e.t!=='info')}
function startMode(mode,o={}){
  dayCheck();
  if(mode==='lesson'&&S.hearts<=0)return heartsOut(false);
  let ex;
  if(mode==='lesson'||mode==='preview')ex=o.lesson.ex.slice();
  else if(mode==='practice')ex=shuffle(gradables(ALL_LESSONS.filter(l=>S.done[l.id]).flatMap(l=>l.ex))).slice(0,6);
  else if(mode==='mistakes')ex=shuffle(Object.keys(S.wrong).map(id=>EXBYID[id]).filter(Boolean)).slice(0,8);
  else if(mode==='daily')ex=[Object.assign({t:'robot',id:'daily'},dailyPuzzle())];
  else if(mode==='speed')ex=shuffle(ALL_LESSONS.filter(l=>S.done[l.id]).flatMap(l=>l.ex).filter(e=>['mc','fill','line'].includes(e.t)));
  else if(mode==='exam')ex=kupaQuestions(o.ui);
  if(!ex||!ex.length){toast('Önce birkaç ders bitirmelisin.');return}
  L=Object.assign({mode,queue:ex,total:mode==='speed'?0:ex.length,done:0,misses:0,first:new Set(),combo:0,maxCombo:0,t0:Date.now(),robotOK:0,cur:null,state:'q',score:0,gradable:gradables(ex).length},o);
  $('#lesson').hidden=false;document.body.style.overflow='hidden';
  $('#lclose').innerHTML=ic('x',28);
  if(mode==='speed'){L.end=Date.now()+60000;clearInterval(timerI);timerI=setInterval(tickTimer,250)}
  renderHead();showEx();
}
function renderHead(){
  const h=$('#lhearts');
  if(L.mode==='speed'){const s=Math.max(0,Math.ceil((L.end-Date.now())/1000));h.className='ltimer'+(s<=10?' low':'');h.innerHTML=`0:${String(s).padStart(2,'0')}`}
  else if(MODES[L.mode].hearts){h.className='lhearts';h.innerHTML=`${fi('heart',26)}<span>${S.hearts}</span>`}
  else{h.className='lhearts inf';h.innerHTML=fi('inf',28)}
  const bar=$('#lbar');
  if(L.mode==='speed'){bar.innerHTML=`<i class="on" style="background:var(--terra);width:${Math.max(0,(L.end-Date.now())/600)}%"></i>`;bar.style.display='block';$('i',bar).style.height='16px'}
  else{bar.style.display='';if(L._pd!=null&&L.done>L._pd)L._ft=Date.now();L._pd=L.done;const fr=L._ft&&Date.now()-L._ft<900;bar.innerHTML=Array.from({length:L.total},(_,i)=>`<i class="${i<L.done?'on':''} ${i===L.done&&L.state!=='end'?'now':''}${fr&&i===L.done-1?' fresh':''}"></i>`).join('')}
}
function tickTimer(){if(!L||L.mode!=='speed'){clearInterval(timerI);return}
  const s=Math.ceil((L.end-Date.now())/1000);renderHead();if(s<=5&&s>0&&L.lastTick!==s){L.lastTick=s;sfx.tick()}
  if(Date.now()>=L.end&&L.state!=='end'){clearInterval(timerI);finish()}}
function showEx(){
  const ex=L.queue[0];L.state='q';renderHead();
  $('#lfoot').className='lfoot';$('#fb').innerHTML='';
  const btn=$('#lbtn');btn.className='b3';
  L.cur=null;L.cur=buildEx(ex,(auto)=>{if(!L||!L.cur)return;btn.disabled=!L.cur.ready();if(auto===true)mainBtn()});
  const body=$('#lbody');body.innerHTML='';body.appendChild(L.cur.el);body.scrollTop=0;
  btn.textContent=ex.t==='info'?'Anladım':ex.t==='robot'?'Çalıştır':ex.t==='match'?'Eşleri bul':'Kontrol et';
  btn.disabled=!L.cur.ready();
  if(canSpeak)stopSpeak();
  if(S.tts&&L.cur.speech)setTimeout(()=>{if(L&&L.cur&&L.queue[0]===ex)speak(L.cur.speech)},250);
  addHint(ex);
}
async function mainBtn(){
  const btn=$('#lbtn');if(btn.disabled||!L)return;
  if(L.state==='q'){
    btn.disabled=true;const ex=L.queue[0];
    const r=await L.cur.check();if(!L)return;L.cur.el.classList.add('lock-ui');
    if(r.silent){advance(true);return}
    const ok=r.ok;L.lastOk=ok;
    if(ex.t==='match'&&L.cur.miss)L.first.add(ex);
    if(ok){L.combo++;L.maxCombo=Math.max(L.maxCombo,L.combo);if(r.robot)L.robotOK++;sfx.ok();
      if(L.mode==='speed')L.score++;
      if(L.mode==='mistakes'&&ex.id)delete S.wrong[ex.id]}
    else{L.combo=0;L.misses++;L.first.add(ex);sfx.bad();
      if(ex.id&&EXBYID[ex.id])S.wrong[ex.id]=1;
      if(MODES[L.mode].hearts){S.hearts=Math.max(0,S.hearts-1);if(!S.heartAt)S.heartAt=Date.now();renderStats()}
      save();renderHead()}
    if(L.mode==='speed'){advance(ok);return}
    const foot=$('#lfoot');foot.className='lfoot '+(ok?'ok':'bad');
    const okLine=L.combo>=8?ANKA.combo8:L.combo===5?ANKA.combo5:L.combo===3?ANKA.combo3:pickL(ANKA.ok);
    $('#fb').innerHTML=`<div class="fa">${anka(ok?'cheer':'sad',80,undefined,ok?(L.combo>=5?'act-spin':L.combo>=3?'act-flip':'act-jump'):'act-shake')}</div><div><h3>${ok?okLine:r.robot?pickL(ANKA.bad):'Doğru cevap:'}</h3>${!ok&&r.ans?(r.mono?`<pre>${esc(r.ans)}</pre>`:`<p>${esc(r.ans)}</p>`):''}${r.tip&&(!ok||ex.t==='mc')?`<p class="tp">${esc(r.tip)}</p>`:''}</div>`;
    btn.textContent=ok?'Devam':'Anladım';btn.className='b3 '+(ok?'olive':'garnet');btn.disabled=false;L.state='fb';btn.focus();
    if(!ok&&MODES[L.mode].hearts&&S.hearts<=0)L.state='dead';
  }else if(L.state==='fb')advance(L.lastOk);
  else if(L.state==='moment'){clearTimeout(L.momT);showEx()}
  else if(L.state==='dead')heartsOut(true);
  else if(L.state==='end')L.endStep&&L.endStep();
}
function advance(ok){
  const ex=L.queue.shift();
  if(ok||!MODES[L.mode].requeue){if(L.mode!=='speed'&&(ok||L.mode==='exam'))L.done++;}
  if(!ok&&MODES[L.mode].requeue)L.queue.push(ex);
  if(L.mode==='exam'&&!ok&&L.done<L.total){/* sınavda yanlış da ilerler */}
  if(!L.queue.length)return finish();
  const mk=ok&&typeof momentFor==='function'?momentFor(L):null;
  if(mk){showMoment(mk);return}
  showEx();
}
/* Duolingo'daki gibi ara an: büyük Anka animasyonu, kendiliğinden ya da Devam ile geçer */
/* Sonuç ekranındaki sayılar sıfırdan yukarı sayar */
function countUp(root){if(reduce)return;root.querySelectorAll('.trio b,.stat.gm').forEach(b=>{const n=[...b.childNodes].reverse().find(x=>x.nodeType===3&&/\d/.test(x.textContent));if(!n)return;
  const m=n.textContent.match(/^(\D*)(\d+)(.*)$/s);if(!m)return;const to=+m[2],t0=performance.now()+350,D=700;n.textContent=m[1]+'0'+m[3];
  const f=t=>{const p=Math.min(1,Math.max(0,(t-t0)/D)),e=1-Math.pow(1-p,3);n.textContent=m[1]+Math.round(to*e)+m[3];if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)})}
function showMoment(k){
  L.state='moment';$('#lbody').innerHTML=momentHtml(k,L);$('#lfoot').className='lfoot';$('#fb').innerHTML='';
  const b=$('#lbtn');b.className='b3';b.textContent='Devam';b.disabled=false;b.focus();
  sfx.win();haptic('heavy');clearTimeout(L.momT);L.momT=setTimeout(()=>{if(L&&L.state==='moment')showEx()},2800)}
$('#lbtn').addEventListener('click',mainBtn);
document.addEventListener('keydown',e=>{
  if(!$('#modal').hidden){if(e.key==='Escape'&&!$('#mbox').dataset.lockbg)closeModal();return}
  if($('#lesson').hidden||!L)return;
  if(e.key==='Enter'){e.preventDefault();mainBtn();return}
  if(e.key==='Escape'){askQuit();return}
  if(L.state==='q'&&L.cur&&L.cur.key&&/^[1-9]$/.test(e.key)&&e.target.tagName!=='INPUT')L.cur.key(e.key);
});
$('#lclose').addEventListener('click',askQuit);
function askQuit(){
  if(!L||L.state==='end'||L.mode==='preview'){closeLesson();return}
  openModal(`${anka('sad',100,undefined,'act-shake')}<h2>${ANKA.quit}</h2><p>Şimdi çıkarsan bu turdaki ilerlemen kaybolur.</p><button class="b3" type="button" id="mstay">Devam et</button><button class="b3 ghost" type="button" id="mquit" style="--oc:var(--garnet)">Çık</button>`);
  $('#mstay').onclick=closeModal;$('#mquit').onclick=()=>{closeModal();closeLesson()}}
function closeLesson(){clearInterval(timerI);if(canSpeak)stopSpeak();$('#lesson').hidden=true;document.body.style.overflow='';L=null;renderAll();scrollCur()}
function heartsOut(inLesson){
  const can=ALL_LESSONS.some(l=>S.done[l.id]),mins=S.heartAt?Math.max(1,Math.ceil((S.heartAt+HEART_MS-Date.now())/60000)):5;
  openModal(`${anka('sad',100)}<h2>Kalbin kalmadı</h2><p>Üzülme! Kalp kazanmanın ücretsiz yolu var. Ya da ${mins} dakika sonra yeni bir kalp gelir.</p>
    <button class="b3 olive" type="button" id="hp">${can?'Alıştırma yap, kalp kazan':'1 ücretsiz kalp al'}</button>
    <button class="b3 ember" type="button" id="hg" ${S.gems<50?'disabled':''}>Kalpleri doldur · 50 mozaik taşı</button>
    <button class="b3 ghost" type="button" id="hw">${inLesson?'Dersten çık':'Tamam'}</button>`);
  $('#mbox').dataset.lockbg=inLesson?'1':'';
  $('#hp').onclick=()=>{closeModal();
    if(can){if(inLesson)closeLesson();startMode('practice')}
    else{S.hearts=Math.min(5,S.hearts+1);if(S.hearts>=5)S.heartAt=null;save();sfx.coin();renderStats();
      if(inLesson&&L){L.state='fb';renderHead();toast(fi('heart',20)+' 1 kalp kazandın!')}else toast(fi('heart',20)+' 1 kalp kazandın! Derse başlayabilirsin.')}};
  $('#hg').onclick=()=>{S.gems-=50;S.hearts=5;S.heartAt=null;save();sfx.coin();closeModal();renderStats();
    if(inLesson&&L){L.state='fb';renderHead();toast(fi('heart',20)+' Kalplerin doldu!')}};
  $('#hw').onclick=()=>{closeModal();if(inLesson)closeLesson()};
}

/* ---------- Tur sonu ---------- */
function finish(){
  clearInterval(timerI);
  const m=L.mode,secs=Math.round((Date.now()-L.t0)/1000),acc=L.gradable?Math.round(Math.max(0,L.gradable-L.first.size)/L.gradable*100):100;
  const perfect=L.gradable>0&&L.first.size===0;
  const before=new Set(Object.keys(S.badges)),today=dkey();
  let xp=0,gems=0,title='Ders tamamlandı!',sub='',mood='cheer',extra='';
  /* Düzenleyicideki önizleme: ödül, seri ve ilerleme yok */
  if(m==='preview'){L.state='end';renderHead();$('#lfoot').className='lfoot';$('#fb').innerHTML='';const btn=$('#lbtn');btn.className='b3';btn.textContent='Düzenleyiciye dön';btn.disabled=false;
    $('#lbody').innerHTML=`<div class="done-screen">${anka('cheer',130)}<h1>Önizleme bitti</h1><p>Ders öğrencilere böyle görünecek. ${L.gradable} sorudan ${L.gradable-L.first.size} tanesini ilk denemede bildin.</p></div>`;
    L.endStep=()=>closeLesson();return}
  if(m==='lesson'){const lid=L.lesson.id,store=S.done,first=!store[lid];xp=(first?10:5)+(perfect?5:0);store[lid]=(store[lid]||0)+1;S.lessons++;S.day.lessons++;
    title=perfect?'Kusursuz ders!':'Ders tamamlandı!';sub=first?esc(L.lesson.title)+' dersini bitirdin.':'Tekrar yapmak bilgiyi güçlendirir.';sub+=' +1 kalp kazandın.';
    S.hearts=Math.min(5,S.hearts+1);if(S.hearts>=5)S.heartAt=null;
    gems=(first?5:2)+(perfect?2:0);S.pet.visit={title:L.lesson.title,gems,t:Date.now()}}
  else if(m==='practice'){xp=5;S.hearts=Math.min(5,S.hearts+1);if(S.hearts>=5)S.heartAt=null;S.day.lessons++;title='Alıştırma bitti!';sub='+1 kalp kazandın.'}
  else if(m==='mistakes'){xp=5;S.day.lessons++;const left=Object.keys(S.wrong).length;title='Hatalarını düzelttin!';sub=left?`Defterinde ${left} soru kaldı.`:'Hata defterin tertemiz!'}
  else if(m==='daily'){const fresh=!S.dailyDone[today];if(fresh){xp=10;gems=15;S.dailyDone={[today]:1}}title='Günün bulmacası çözüldü!';sub=fresh?'Yarın yeni bir bulmaca gelecek.':'Bugünün ödülünü daha önce almıştın.'}
  else if(m==='speed'){xp=Math.min(20,L.score);const rec=L.score>S.speedBest;if(rec)S.speedBest=L.score;title=rec&&L.score>0?'Yeni rekor!':'Süre doldu!';sub=`60 saniyede ${L.score} doğru cevap. En iyi skorun: ${S.speedBest}.`;mood=L.score?'cheer':'wow'}
  else if(m==='exam'){const pass=L.misses<=2;
    if(pass){const fresh=!S.trophies[L.ui];S.trophies[L.ui]=dkey();xp=fresh?20:5;gems=fresh?30:0;title='Kupa senin!';sub=`${U[L.ui].title} ünitesinin kupasını kazandın. Sertifikan profilinde.`;
      if(L.skip){const f=U[L.ui].field;U.forEach((u,ui)=>{if(u.field===f&&unitOrd(ui)<=unitOrd(L.ui))u.lessons.forEach(x=>{if(!S.done[x.id])S.done[x.id]=1})});title='Sınavı geçtin! Ünite tamam.';sub=`${U[L.ui].title} ünitesini zaten biliyormuşsun. Dersleri tamamlanmış sayıldı, kupa da senin.`}}
    else{xp=5;mood='sad';if(L.misses<=3){title='Az kaldı!';sub='3 hata yaptın, kupa için en fazla 2 hata olabilir. Bir kez daha dene, başaracaksın!'}else{title='Biraz daha çalışalım';sub=`${L.misses} hata yaptın. Bu ünite biraz daha çalışma istiyor. Dersleri tekrar et, sonra sınavı yeniden dene.`}}
    extra=pass?`<button class="b3 ghost" type="button" id="openCertNow">${ic('cert',20)} Sertifikayı aç</button>`:''}
  addXP(xp);S.gems+=gems;
  S.day.combo=Math.max(S.day.combo,L.maxCombo);S.day.robot+=L.robotOK;if(perfect&&m==='lesson')S.day.perfect++;
  const firstToday=xp>0&&touchStreak();
  const goalHit=S.day.xp>=S.goal&&S.day.xp-xp<S.goal;
  const qDone=questCheck();
  const newB=[...badgeSet()].filter(b=>!before.has(b));newB.forEach(b=>S.badges[b]=dkey());
  save();
  L.state='end';renderHead();
  $('#lfoot').className='lfoot';$('#fb').innerHTML='';
  const btn=$('#lbtn');btn.className='b3';btn.textContent='Devam';btn.disabled=false;
  const mm=Math.floor(secs/60)+':'+String(secs%60).padStart(2,'0');
  const third=m==='speed'?`<div style="--c:var(--terra)"><small>SKOR</small><b>${ic('timer',22)}${L.score}</b></div>`:`<div style="--c:var(--olive)"><small>SÜRE</small><b>${ic('clock',22)}${mm}</b></div>`;
  const steps=[()=>`<div class="done-screen"><div class="ds-ank ${mood==='sad'?'':'sun'}">${mood==='sad'?'':'<div class="mo-sun"></div>'}${anka(mood,150,undefined,mood==='sad'?'act-shake':'act-dance')}</div><h1 class="ds-h">${title}</h1><p>${sub}</p>
    <div class="trio"><div style="--c:var(--ember)"><small>DP</small><b>${fi('bolt',22)}${xp}</b></div>
    <div style="--c:var(--terra)"><small>DOĞRULUK</small><b>${ic('target2',22)}%${acc}</b></div>${third}</div>${gems?`<div class="stat gm" style="font-size:1.4rem">${fi('gem',28)} +${gems} mozaik taşı</div>`:''}${extra}</div>`];
  if(firstToday)steps.push(()=>`<div class="done-screen"><div class="bigflame ignite">${fi('flame',190)}<b>${S.streak}</b><i class="emb"></i><i class="emb"></i><i class="emb"></i><i class="emb"></i></div><h1 class="ds-h" style="color:var(--ember)">${S.streak} günlük seri!</h1><p>${S.streak===1?'Serin başladı! Yarın da gel, ateşi canlı tut.':'Bugün de geldin. Yarın görüşürüz!'}</p></div>`);
  if(goalHit)steps.push(()=>`<div class="done-screen">${anka('wow',130,undefined,'act-jump')}<h1>Günlük hedefe ulaştın!</h1><p>Bugün ${S.day.xp} DP topladın. Hedefin ${S.goal} DP idi.</p></div>`);
  qDone.forEach(q=>steps.push(()=>`<div class="done-screen"><div style="color:var(--ember)">${ic('chest',120)}</div><h1>Görev tamam!</h1><p>${esc(q.name)}</p><div class="stat gm" style="font-size:1.6rem">${fi('gem',32)} +${q.gems}</div></div>`));
  newB.forEach(id=>{const b=BADGES.find(x=>x.id===id);steps.push(()=>`<div class="done-screen"><div class="medal" style="width:120px;height:120px">${ic(b.icon,60)}</div><h1>Yeni rozet!</h1><h2>${b.name}</h2><p>${b.desc}</p></div>`)});
  let k=0;
  const show=()=>{$('#lbody').innerHTML=steps[k]();sfx.win();countUp($('#lbody'));if(k===0&&mood!=='sad')confetti();const c=$('#openCertNow');if(c)c.onclick=()=>openCert(L.ui)};
  L.endStep=()=>{k++;if(k<steps.length)show();else{const v=m==='lesson'&&S.pet.visit;closeLesson();if(v)location.hash='#yuva';if(typeof ankaAfterLesson==='function')ankaAfterLesson()}};
  show();
}

/* ================= GÖREVLER ================= */
function questRows(compact,noGoal){return quests().filter(q=>!(noGoal&&q.id==='xp')).map(q=>{const v=Math.min(q.n,S.day[q.f]||0),done=!!S.day.claimed[q.id];
  if(compact)return `<div><span>${esc(q.name)}</span><div class="bar"><i style="width:${v/q.n*100}%"></i><span>${v} / ${q.n}</span></div></div>`;
  return `<div class="q ${done?'done':''}"><div class="qi">${ic(q.icon,24)}</div><div ${q.f==='xp'?'data-dp role="button" tabindex="0"':''}><b>${esc(q.name)}</b><div class="bar"><i style="width:${v/q.n*100}%;${done?'background:var(--olive)':''}"></i><span>${v} / ${q.n}</span></div></div><span class="rw">${done?ic('check',22):fi('gem',18)+q.gems}</span></div>`}).join('')}
function hoursLeft(){const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);const h=Math.floor((m-n)/36e5),mi=Math.floor((m-n)%36e5/6e4);return h>0?h+' saat':mi+' dakika'}
function renderQuests(){
  $('#pgQuests').innerHTML=`<div class="frame"><div class="hero-q"><div><span class="lbl">GÜNLÜK GÖREVLER</span><h2>Bugün neler yapacaksın?</h2><p>Görevleri bitir, mozaik taşı kazan. Görevler her gece yenilenir.</p></div>${anka('cheer',80)}</div></div>
  <div class="sec-h">Bugünün görevleri <small>${hoursLeft()} kaldı</small></div>
  <div class="qlist">${questRows()}</div>
  <p style="color:var(--muted);margin-top:14px;font-size:.92rem">İlk görev günlük hedefindir. Hedefini profilden değiştirebilirsin.</p>`;
}

/* ================= ATÖLYE ================= */
function dailyPuzzle(){return DAILY[dayNum(dkey())%DAILY.length]}
function renderHub(){
  const anyDone=ALL_LESSONS.some(l=>S.done[l.id]),nWrong=Object.keys(S.wrong).length,dDone=!!S.dailyDone[dkey()];
  const drawn=Object.keys(S.draw).length;
  $('#pgHub').innerHTML=`<h1>Atölye</h1><p class="sub">Derslerin dışında oyna, çiz ve tekrar et.</p>
  <div class="hub">
   <div class="card hubc wide"><div class="hi" style="background:var(--ember);color:#2F2E24">${ic('puzzle',26)}</div><div><span class="tag">${dDone?'Bugün çözüldü':'+15 mozaik taşı · +10 DP'}</span><h3 style="margin-top:6px">Günün bulmacası</h3><p>Her gün yeni bir robot bulmacası. Yarın yeni bir bulmaca gelecek!</p></div><button class="b3 ${dDone?'ghost':'ember'}" type="button" id="hDaily">${dDone?'Tekrar oyna':'Çöz'}</button></div>
   <a class="card hubc" href="#cizim"><div class="hi" style="background:var(--terra)">${ic('pen',26)}</div><span class="tag">${drawn} / ${CHAL.length} çizim</span><h3>Çizim atölyesi</h3><p>Kalemli robota komut ver: kare, üçgen, yıldız çiz ya da serbest çalış.</p></a>
   <button class="card hubc" type="button" id="hSpeed" ${anyDone?'':'disabled'}><div class="hi" style="background:var(--olive)">${ic('timer',26)}</div><span class="tag">Rekor: ${S.speedBest}</span><h3>Hızlı tur</h3><p>60 saniyede bildiğin kadar soruyu cevapla.${anyDone?'':' Önce bir ders bitir.'}</p></button>
   <button class="card hubc" type="button" id="hWrong" ${nWrong?'':'disabled'}><div class="hi" style="background:var(--garnet)">${ic('bug',26)}</div><span class="tag">${nWrong} soru</span><h3>Hata defterim</h3><p>${nWrong?'Yanlış yaptığın soruları yeniden çöz. Doğru yaptıkça defterden silinir.':'Henüz yanlış yaptığın soru yok.'}</p></button>
   <button class="card hubc" type="button" id="hPract" ${anyDone?'':'disabled'}><div class="hi" style="background:var(--rust)">${ic('loop',26)}</div><span class="tag">+1 kalp</span><h3>Karışık tekrar</h3><p>Bitirdiğin derslerden 6 soru. Kalp gitmez.</p></button>
   <a class="card hubc" href="#sozluk"><div class="hi" style="background:var(--olive-deep)">${ic('book',26)}</div><span class="tag">${GLOSS.filter(g=>glossOpen(g)).length} / ${GLOSS.length} kelime</span><h3>Kodlama sözlüğü</h3><p>Öğrendiğin kelimeler burada. Her ünitede yenileri açılır.</p></a>
   <a class="card hubc" href="#lab"><div class="hi" style="background:var(--terra)">${ic('flask',26)}</div><span class="tag">${labDoneCount()} / ${labTotal()} bölüm</span><h3>Laboratuvar</h3><p>8 deney oyunu: sarkaç saati, kale kuşatması, lazer labirenti ve daha fazlası.</p></a>
   <a class="card hubc" href="#defter"><div class="hi" style="background:var(--olive)">${ic('notebook',26)}</div><span class="tag">${labNoteCount()} ölçüm</span><h3>Deney defterim</h3><p>Deney oyunlarındaki bütün denemelerin, tablo ve grafiklerle.</p></a>
  </div>`;
  $('#hDaily').onclick=()=>startMode('daily');
  $('#hSpeed').onclick=()=>startMode('speed');
  $('#hWrong').onclick=()=>startMode('mistakes');
  $('#hPract').onclick=()=>startMode('practice');
}
const glossOpen=g=>{const u=U[g.u],fu=fieldUnits(u.field),k=fu.findIndex(x=>x.ui===g.u);return k<=0||u.lessons.some(l=>S.done[l.id])||fu[k-1].u.lessons.every(l=>S.done[l.id])};
function renderGloss(){
  const term=(g,ui)=>{const op=glossOpen(g);
    return `<div class="card term ${op?'':'locked'}"><h3>${op?esc(g.t):'???'}${op?spkBtn(g.t+'. '+g.d):`<span style="color:var(--muted)">${ic('lock',20)}</span>`}</h3><p>${op?esc(g.d):'Bu kelime '+esc(U[ui].title)+' ünitesinde açılacak.'}</p>${op&&g.c?`<pre class="code">${hl(g.c)}</pre>`:''}</div>`};
  const fs=[curField()].concat(FIELDS.map(f=>f.id).filter(f=>f!==curField()));
  $('#pgGloss').innerHTML=`<p><a href="#atolye" style="text-decoration:none;font-weight:800">← Atölye</a></p><h1 style="font-size:2.2rem;margin:8px 0 6px">Sözlük</h1><p class="sub">Kilitli kelimeler, o üniteye gelince açılır.</p>
  ${fs.map(fid=>{const f=fieldOf(fid);return `<h2 class="gl-f">${ic(f.icon,24)} ${esc(f.title)}</h2>`+fieldUnits(fid).map(({u,ui})=>{const gs=GLOSS.filter(g=>g.u===ui);if(!gs.length)return'';
    return `<div class="sec-h">${unitNo(ui)}. ${esc(u.title)}</div><div class="gloss">${gs.map(g=>term(g,ui)).join('')}</div>`}).join('')}).join('')}`;
}

/* ---------- Çizim atölyesi (kalemli robot) ---------- */
let DR={ch:0,prog:[],target:null,running:false,segs:[],tx:0,ty:0,th:0,pen:true,col:0};
function newBlk(t){return t==='rep'?{t,n:4,kids:[]}:t==='f'?{t,n:50}:t==='r'||t==='l'?{t,n:90}:t==='c'?{t,n:0}:{t}}
function flatT(p,out=[]){for(const b of p){if(b.t==='rep'){for(let i=0;i<b.n;i++)flatT(b.kids,out)}else out.push(b);if(out.length>2000)break}return out}
function simT(prog,sx,sy){let x=sx,y=sy,h=0,pen=true,c=0;const segs=[];for(const b of flatT(prog)){
  if(b.t==='f'){const nx=x+Math.sin(h*Math.PI/180)*b.n,ny=y-Math.cos(h*Math.PI/180)*b.n;if(pen)segs.push([x,y,nx,ny,c]);x=nx;y=ny}
  else if(b.t==='r')h+=b.n;else if(b.t==='l')h-=b.n;else if(b.t==='c')c=b.n;else if(b.t==='u')pen=false;else if(b.t==='d')pen=true}return segs}
const segKey=s=>{const a=[Math.round(s[0]),Math.round(s[1])],b=[Math.round(s[2]),Math.round(s[3])];return (a[0]<b[0]||(a[0]===b[0]&&a[1]<=b[1])?[a,b]:[b,a]).join('|')};
const segSet=segs=>new Set(segs.filter(s=>Math.hypot(s[2]-s[0],s[3]-s[1])>1).map(segKey));
function renderDraw(){
  const c=CHAL[DR.ch];
  $('#pgDraw').innerHTML=`<p><a href="#atolye" style="text-decoration:none;font-weight:800">← Atölye</a></p><h1 style="font-size:2.2rem;margin:8px 0 6px">Çizim atölyesi</h1><p class="sub">Kalemli robota komut ver. Soluk çizginin üstünden geçen programı yaz.</p>
  <div class="chal" role="tablist">${CHAL.map((x,i)=>`<button type="button" role="tab" data-ch="${i}" aria-pressed="${i===DR.ch}">${S.draw[x.id]?`<span class="ok">${ic('check',16)}</span>`:''}${x.name}</button>`).join('')}</div>
  <div class="draw"><div><div class="cv"><canvas id="tcv" width="600" height="600" aria-label="Çizim alanı"></canvas></div>
    <p class="cnt" style="margin-top:8px">${esc(c.hint)}</p></div>
    <div style="display:grid;gap:12px">
      <div class="pal" id="tpal">
        <button class="pz f" type="button" data-tadd="f">${ic('arrowU',18)}İleri</button>
        <button class="pz r" type="button" data-tadd="r">${ic('rotR',18)}Sağa dön</button>
        <button class="pz l" type="button" data-tadd="l">${ic('rotL',18)}Sola dön</button>
        <button class="pz" type="button" data-tadd="rep" style="background:#D9822B;color:#2F2E24">${ic('loop',18)}Tekrarla</button>
        <button class="pz" type="button" data-tadd="c" style="background:#6F3420">${ic('pen',18)}Renk</button>
        <button class="pz" type="button" data-tadd="u" style="background:#6B604A">${ic('penOff',18)}Kalemi kaldır</button>
        <button class="pz" type="button" data-tadd="d" style="background:#6B604A">${ic('pen',18)}Kalemi indir</button>
      </div>
      <p class="cnt" id="ttip"></p>
      <div class="tprog" id="tprog"></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="b3" type="button" id="trun">${ic('play',18)}Çiz</button><button class="b3 ghost" type="button" id="tclear">${ic('trash',18)}Temizle</button></div>
      <p id="tres" role="status" style="font-weight:800;min-height:1.5em"></p>
    </div></div>`;
  DR.target=c.free?null:simT(c.prog,c.sx,c.sy);
  drawTProg();resetCanvas();
}
function tTarget(){return DR.sel!=null&&DR.prog[DR.sel]&&DR.prog[DR.sel].t==='rep'?DR.prog[DR.sel].kids:DR.prog}
function tbHTML(b,path){
  const label={f:'İleri',r:'Sağa dön',l:'Sola dön',c:'Renk',u:'Kalemi kaldır',d:'Kalemi indir',rep:'Tekrarla'}[b.t];
  const val=b.t==='f'?b.n:b.t==='r'||b.t==='l'?b.n+'°':b.t==='rep'?b.n+' kez':b.t==='c'?`<span class="swatch" style="background:${PENC[b.n]}"></span>`:'';
  const ctl=(b.t==='u'||b.t==='d')?'':`<button type="button" data-tv="-1" data-p="${path}" aria-label="Azalt">−</button><span class="v">${val}</span><button type="button" data-tv="1" data-p="${path}" aria-label="Artır">+</button>`;
  const row=b.t==='rep'?`<div class="tb">${ctl.replace(val,b.n)}<span>kez tekrarla</span><span class="sp"></span><button type="button" data-tdel="${path}" aria-label="Sil">${ic('x',14)}</button></div>`
    :`<div class="tb ${b.t}">${label}<span class="sp"></span>${ctl}<button type="button" data-tdel="${path}" aria-label="Sil">${ic('x',14)}</button></div>`;
  if(b.t!=='rep')return row;
  const i=+path;return `<div class="tloop ${DR.sel===i?'target':''}" data-tsel="${i}">${row}<div class="tbody">${b.kids.map((k,j)=>tbHTML(k,i+'.'+j)).join('')||'<p class="ph">Döngünün içi boş.</p>'}</div></div>`;
}
function drawTProg(){
  $('#tprog').innerHTML=DR.prog.map((b,i)=>tbHTML(b,String(i))).join('')||'<p class="cnt" style="padding:6px">Yukarıdaki bloklara dokun. Komutlar buraya sırayla eklenir.</p>';
  const tgt=DR.sel!=null&&DR.prog[DR.sel];$('#ttip').textContent=tgt?'Yeni bloklar seçili döngünün içine ekleniyor. Bırakmak için döngünün başlığına tekrar dokun.':'Bir döngünün içine blok eklemek için döngünün başlığına dokun.';
}
function getBlk(path){const p=path.split('.').map(Number);return p.length===1?[DR.prog,p[0]]:[DR.prog[p[0]].kids,p[1]]}
function resetCanvas(){const c=CHAL[DR.ch];DR.segs=[];DR.tx=c.sx;DR.ty=c.sy;DR.th=0;DR.pen=true;DR.col=0;paintT()}
function paintT(partial){
  const cv=$('#tcv');if(!cv)return;const x=cv.getContext('2d'),k=2;x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,600,600);x.setTransform(k,0,0,k,0,0);
  const cs=getComputedStyle(document.documentElement),line=cs.getPropertyValue('--line').trim(),mut=cs.getPropertyValue('--muted').trim();
  x.strokeStyle=line;x.lineWidth=.5;for(let i=0;i<=300;i+=25){x.beginPath();x.moveTo(i,0);x.lineTo(i,300);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(300,i);x.stroke()}
  if(DR.target){x.setLineDash([5,6]);x.strokeStyle=mut;x.globalAlpha=.55;x.lineWidth=4;x.lineCap='round';DR.target.forEach(s=>{x.beginPath();x.moveTo(s[0],s[1]);x.lineTo(s[2],s[3]);x.stroke()});x.setLineDash([]);x.globalAlpha=1}
  x.lineWidth=4;x.lineCap='round';
  DR.segs.concat(partial?[partial]:[]).forEach(s=>{x.strokeStyle=PENC[s[4]];x.beginPath();x.moveTo(s[0],s[1]);x.lineTo(s[2],s[3]);x.stroke()});
  x.save();x.translate(DR.tx,DR.ty);x.rotate(DR.th*Math.PI/180);
  x.fillStyle='#A3461F';x.strokeStyle='#2F2E24';x.lineWidth=1.5;x.beginPath();x.moveTo(0,-12);x.lineTo(9,9);x.lineTo(0,4);x.lineTo(-9,9);x.closePath();x.fill();x.stroke();
  if(DR.pen){x.fillStyle=PENC[DR.col];x.beginPath();x.arc(0,0,3,0,7);x.fill()}x.restore();
}
async function runT(){
  if(DR.running)return;const c=CHAL[DR.ch];if(!DR.prog.length){$('#tres').textContent='Önce birkaç blok ekle.';return}
  DR.running=true;resetCanvas();$('#tres').textContent='Çiziliyor…';$('#tres').style.color='var(--muted)';
  const ops=flatT(DR.prog);if(ops.length>=2000){$('#tres').textContent='Program çok uzun. Tekrar sayılarını azalt.';DR.running=false;return}
  for(const b of ops){if(!$('#tcv'))break;
    if(b.t==='f'){const sx=DR.tx,sy=DR.ty,nx=sx+Math.sin(DR.th*Math.PI/180)*b.n,ny=sy-Math.cos(DR.th*Math.PI/180)*b.n;
      const dur=reduce?0:Math.min(500,b.n*4),t0=performance.now();
      await new Promise(res=>{const f=t=>{const p=dur?Math.min(1,(t-t0)/dur):1;DR.tx=sx+(nx-sx)*p;DR.ty=sy+(ny-sy)*p;paintT(DR.pen?[sx,sy,DR.tx,DR.ty,DR.col]:null);if(p<1)requestAnimationFrame(f);else res()};requestAnimationFrame(f)});
      if(DR.pen)DR.segs.push([sx,sy,nx,ny,DR.col]);DR.tx=nx;DR.ty=ny}
    else if(b.t==='r'||b.t==='l'){const s=DR.th,e=s+(b.t==='r'?b.n:-b.n),dur=reduce?0:220,t0=performance.now();
      await new Promise(res=>{const f=t=>{const p=dur?Math.min(1,(t-t0)/dur):1;DR.th=s+(e-s)*p;paintT();if(p<1)requestAnimationFrame(f);else res()};requestAnimationFrame(f)})}
    else if(b.t==='c')DR.col=b.n;else if(b.t==='u')DR.pen=false;else if(b.t==='d')DR.pen=true;
    paintT()}
  DR.running=false;
  if(c.free){$('#tres').textContent='Güzel çizim!';$('#tres').style.color='var(--olive-ts)';if(!S.draw.serbest){S.draw.serbest=1;smallReward(5,0,'Serbest çizim')}return}
  const A=segSet(DR.segs),T=segSet(DR.target),M=segSet(DR.target.map(s=>[2*c.sx-s[0],s[1],2*c.sx-s[2],s[3]]));
  const eq=(a,b)=>a.size===b.size&&[...a].every(v=>b.has(v));
  if(eq(A,T)||eq(A,M)){sfx.win();confetti();$('#tres').textContent=c.name+' tamam! Harika çizim.';$('#tres').style.color='var(--olive-ts)';
    if(!S.draw[c.id]){S.draw[c.id]=1;smallReward(10,10,c.name+' çizimi');setTimeout(()=>{if(page==='cizim'){const keep=DR.prog;renderDraw();DR.prog=keep;drawTProg();paintT()}},1600)}}
  else{sfx.bad();$('#tres').textContent='Şekil tutmadı. Kenar uzunluklarını ve dönüş açılarını kontrol et.';$('#tres').style.color='var(--garnet)'}
}
document.addEventListener('click',e=>{
  if(page!=='cizim')return;
  const ch=e.target.closest('[data-ch]');if(ch){DR.ch=+ch.dataset.ch;DR.prog=[];DR.sel=null;renderDraw();return}
  if(DR.running)return;
  const a=e.target.closest('[data-tadd]');if(a){const tgt=tTarget();if(flatT(DR.prog).length>200||DR.prog.length+tgt.length>40)return;
    if(a.dataset.tadd==='rep'&&tgt!==DR.prog){DR.prog.push(newBlk('rep'))}else tgt.push(newBlk(a.dataset.tadd));
    if(a.dataset.tadd==='rep')DR.sel=DR.prog.length-1;sfx.tap();drawTProg();return}
  const d=e.target.closest('[data-tdel]');if(d){const [arr,i]=getBlk(d.dataset.tdel);arr.splice(i,1);if(!d.dataset.tdel.includes('.')&&DR.sel!=null){if(+d.dataset.tdel===DR.sel)DR.sel=null;else if(+d.dataset.tdel<DR.sel)DR.sel--}drawTProg();return}
  const v=e.target.closest('[data-tv]');if(v){const [arr,i]=getBlk(v.dataset.p),b=arr[i],s=+v.dataset.tv;
    if(b.t==='f')b.n=Math.max(10,Math.min(200,b.n+s*10));
    else if(b.t==='r'||b.t==='l'){const k=ANG.indexOf(b.n);b.n=ANG[(k+s+ANG.length)%ANG.length]}
    else if(b.t==='rep')b.n=Math.max(2,Math.min(12,b.n+s));
    else if(b.t==='c')b.n=(b.n+s+PENC.length)%PENC.length;
    drawTProg();return}
  const sel=e.target.closest('[data-tsel]');if(sel&&!e.target.closest('button')){const i=+sel.dataset.tsel;DR.sel=DR.sel===i?null:i;drawTProg();return}
  if(e.target.closest('#trun'))runT();
  if(e.target.closest('#tclear')){DR.prog=[];DR.sel=null;drawTProg();resetCanvas();$('#tres').textContent=''}
});

/* ================= MAĞAZA ================= */
function renderShop(){
  $('#pgShop').innerHTML=`<h1>Mağaza</h1><p class="sub">Elinde <b style="color:var(--olive)">${S.gems} mozaik taşı</b> var. Taşları görevlerden, sandıklardan, günün bulmacasından ve kupa sınavlarından kazanırsın.</p>
  <a class="card nestlink" href="#yuva">${anka(petMood(),70)}<div><b>Anka'nın yuvası</b><p>Aldığın yiyecekler ve giysiler yuvada seni bekliyor. Anka'yı besle, giydir, sev!</p></div><span class="b3 sm olive">Yuvaya git</span></a>
  <div class="sec-h">Güçlendirmeler</div><div class="shop">${SHOP.filter(i=>!i.cos&&!i.food).map(item).join('')}</div>
  <div class="sec-h">Anka'nın mutfağı <small>Yuvada Anka'yı beslersin</small></div><div class="shop">${SHOP.filter(i=>i.food).map(item).join('')}</div>
  <div class="sec-h">Anka'nın dolabı <small>Baş, yüz ve boyun için birer aksesuar</small></div><div class="shop">${SHOP.filter(i=>i.cos).map(item).join('')}</div>`;
  function item(i){let btn;
    if(i.cos&&S.owned[i.id]){const on=S.wear[i.slot]===i.id;btn=`<button class="b3 ${on?'ghost':'olive'}" type="button" data-eq="${i.id}" aria-pressed="${on}">${on?'Çıkar':'Giydir'}</button>`}
    else{const dis=S.gems<i.price||(i.id==='kalp'&&S.hearts>=5)||(i.id==='koruyucu'&&S.freeze>=2);
      btn=`<button class="b3 ember" type="button" data-buy="${i.id}" ${dis?'disabled':''}><span class="price">${fi('gem',16)}${i.price}</span></button>`}
    const extra=i.id==='koruyucu'?` Sende ${S.freeze} tane var.`:i.id==='kalp'?` Şu an ${S.hearts} / 5.`:i.food?` Yuvada ${S.pet.inv[i.id]||0} tane var. +${i.food.t} tokluk.`:i.cos?` ${SLOTS[i.slot]} aksesuarı.`:'';
    const pic=i.id==='kalp'?`<span style="color:var(--garnet)">${fi('heart',44)}</span>`:i.id==='koruyucu'?`<span style="color:var(--olive)">${ic('snow',40)}</span>`:i.food?foodIcon(i.id,52):anka('happy',58,i.id);
    return `<div class="card item"><div class="pic">${pic}</div><div><b>${i.name}</b><p>${i.desc}${extra}</p></div>${btn}</div>`}
}
$('#pgShop').addEventListener('click',e=>{
  const b=e.target.closest('[data-buy]'),q=e.target.closest('[data-eq]');
  if(b){const i=SHOP.find(x=>x.id===b.dataset.buy);if(S.gems<i.price)return;
    if(i.id==='kalp'||i.id==='koruyucu'){S.gems-=i.price;if(i.id==='kalp'){S.hearts=5;S.heartAt=null}else S.freeze++;save();sfx.coin();toast(fi('gem',20)+' '+i.name+' alındı!')}
    else buyItem(i.id);
    renderAll()}
  if(q){const i=SHOP.find(x=>x.id===q.dataset.eq);S.wear[i.slot]=S.wear[i.slot]===i.id?null:i.id;save();sfx.tap();renderAll()}
});

/* ================= ROZETLER, SERTİFİKA, PROFİL ================= */
const BADGES=[
 {id:'ilk',name:'İlk Adım',desc:'İlk dersini bitir.',icon:'star',t:()=>S.lessons>=1},
 {id:'seri3',name:'Ateş Yaktın',desc:'3 günlük seri yap.',icon:'bolt',t:()=>S.best>=3},
 {id:'seri7',name:'Sönmeyen Kıvılcım',desc:'7 günlük seri yap.',icon:'bolt',t:()=>S.best>=7},
 {id:'xp100',name:'100 DP',desc:'Toplam 100 DP topla.',icon:'target',t:()=>S.xp>=100},
 {id:'xp500',name:'500 DP',desc:'Toplam 500 DP topla.',icon:'target',t:()=>S.xp>=500},
 {id:'kusur',name:'Kusursuz',desc:'Bir dersi hiç hata yapmadan bitir.',icon:'target2',t:()=>S.day.perfect>0},
 {id:'u1',name:UNIT_BADGE[0],desc:'Algoritma ünitesini bitir.',icon:'split',t:()=>unitDone(0)},
 {id:'u2',name:UNIT_BADGE[1],desc:'Döngüler ünitesini bitir.',icon:'loop',t:()=>unitDone(1)},
 {id:'u3',name:UNIT_BADGE[2],desc:'Koşullar ünitesini bitir.',icon:'split',t:()=>unitDone(2)},
 {id:'u4',name:UNIT_BADGE[3],desc:'Değişkenler ünitesini bitir.',icon:'box',t:()=>unitDone(3)},
 {id:'u5',name:UNIT_BADGE[4],desc:'Python ünitesini bitir.',icon:'code',t:()=>unitDone(4)},
 {id:'kupa',name:'Kupa Avcısı',desc:'Bir kupa sınavını geç.',icon:'trophy',t:()=>Object.keys(S.trophies).length>0},
 {id:'ressam',name:'Kod Ressamı',desc:'Çizim atölyesinde 3 şekil çiz.',icon:'pen',t:()=>CHAL.filter(c=>!c.free&&S.draw[c.id]).length>=3},
 {id:'hizli',name:'Şimşek',desc:'Hızlı turda 10 doğru yap.',icon:'timer',t:()=>S.speedBest>=10},
 {id:'bulmaca',name:'Bulmaca Kurdu',desc:'Günün bulmacasını çöz.',icon:'puzzle',t:()=>Object.keys(S.dailyDone).length>0},
 {id:'brans',name:'Çok Yönlü Mühendis',desc:'Yazılım, Mekanik ve Elektronik alanlarının her birinden bir ders bitir.',icon:'tools',t:()=>FIELDS.every(f=>ALL_LESSONS.some(l=>l.field===f.id&&S.done[l.id]))},
 {id:'lab',name:'Laboratuvar Kâşifi',desc:'Laboratuvarda bir deney oyununun ilk bölümünü bitir.',icon:'flask',t:()=>labDoneCount()>=1},
 {id:'bilimci',name:'Genç Bilim İnsanı',desc:'8 deney oyununun hepsinde en az bir bölüm bitir.',icon:'eye',t:()=>EXPS.every(x=>labExpDone(x.id)>0)},
 {id:'labusta',name:'Laboratuvar Ustası',desc:'Laboratuvardaki bütün bölümleri bitir.',icon:'trophy',t:()=>labDoneCount()>=labTotal()},
 {id:'defter',name:'Titiz Gözlemci',desc:'Deney defterinde 5 ölçüm biriktir.',icon:'notebook',t:()=>labNoteCount()>=5}
];
const badgeSet=()=>new Set(BADGES.filter(b=>S.badges[b.id]||b.t()).map(b=>b.id));
function openCert(ui){
  const d=(S.trophies[ui]||dkey()).split('-').reverse().join('.');
  openModal(`<div class="certbox" id="certPrint"><img src="img/logo.png" alt="Antioch Rising logosu"><span class="lbl" style="color:#4B5A3A">#BİLİMKIVILCIMI · BAŞARI BELGESİ</span><h2>${UNIT_BADGE[ui]}</h2>
    <p>Bu belge</p><div class="nm">${esc(S.name||'Genç Mühendis')}</div><p>adlı öğrencinin <b style="color:#2F2E24">${fieldOf(U[ui].field).title} · ${unitNo(ui)}. Ünite: ${U[ui].title}</b> kupa sınavını başarıyla geçtiğini gösterir.</p>
    <p style="font-family:'JetBrains Mono',monospace;font-size:.85rem">${d} · Antioch Rising #10947 · Hatay</p></div>
    ${S.name?'':'<p>Belgede adının yazması için profilinde adını yaz.</p>'}
    ${framed?'':`<button class="b3" type="button" id="cprint">${ic('printer',18)} Yazdır</button>`}<button class="b3 ghost" type="button" id="cclose">Kapat</button>`,true);
  const p=$('#cprint');if(p)p.onclick=()=>{try{window.print()}catch(e){}};$('#cclose').onclick=closeModal;
}
/* BK2: anonim kimlik + ders, deney ve etkinlik özetleri. Öğretmen tablosu, yönetici paneli ve otomatik istatistik aynı biçimi kullanır. */
function progressObj(){
  const t=dkey(),tn=dayNum(t),ex={};Object.keys(S.lab.tasks).forEach(k=>{const id=k.split('-')[0];ex[id]=(ex[id]||0)+1});
  return{v:2,i:S.uid,n:S.name||'',x:S.xp,l:Object.keys(S.done),c:[],e:ex,w:Object.keys(S.draw).length,k:Object.keys(S.trophies).map(Number),
    b:S.best,s:S.streak,g:Object.keys(S.badges).length,h:S.days.map(d=>tn-dayNum(d)).filter(n=>n>=0&&n<60),a:S.lastDay||'',j:S.joined,t};
}
function progressCode(){
  try{return 'BK2.'+btoa(unescape(encodeURIComponent(JSON.stringify(progressObj())))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}catch(e){return ''}
}
function renderProfile(){
  BADGES.forEach(b=>{if(!S.badges[b.id]&&b.t())S.badges[b.id]=dkey()});save();
  const have=BADGES.filter(b=>S.badges[b.id]).length,code=progressCode();
  const certs=U.map((u,ui)=>S.trophies[ui]?`<div class="card cert-row"><span style="color:var(--olive)">${ic('cert',30)}</span><div><b style="font-family:var(--display);font-size:1.1rem">${UNIT_BADGE[ui]}</b><div style="color:var(--muted);font-size:.88rem">${fieldOf(u.field).title} · ${unitNo(ui)}. Ünite · ${u.title}</div></div><button class="b3 sm ghost" type="button" data-cert="${ui}">Aç</button></div>`:'').join('');
  $('#pgProfile').innerHTML=`<div class="prof">${anka('happy',96)}<div><label for="pname">Adın</label><input id="pname" maxlength="24" placeholder="Adını yaz" value="${esc(S.name)}"><p style="color:var(--muted);margin-top:6px;font-size:.9rem">${dkey()===S.joined?'Bugün katıldın':'Katılma: '+S.joined.split('-').reverse().join('.')}</p></div></div>
  <div class="sec-h">İstatistikler</div>
  <div class="tiles">
    <div class="card tile"><span style="color:var(--ember)">${fi('flame',30)}</span><div><b>${S.streak}</b><span>Günlük seri</span></div></div>
    <div class="card tile"><span style="color:var(--ember)">${fi('bolt',30)}</span><div data-dp role="button" tabindex="0"><b>${S.xp}</b><span>Toplam deneyim puanı (DP)</span></div></div>
    <div class="card tile"><span style="color:var(--olive)">${ic('book',30)}</span><div><b>${Object.keys(S.done).length}/${ALL_LESSONS.length}</b><span>Bitirilen ders</span></div></div>
    <div class="card tile"><span style="color:var(--terra)">${ic('trophy',30)}</span><div><b>${Object.keys(S.trophies).length}/${U.length}</b><span>Kupa</span></div></div>
    <div class="card tile"><span style="color:var(--olive)">${ic('flask',30)}</span><div><b>${labDoneCount()}/${labTotal()}</b><span>Deney bölümü</span></div></div>
    <div class="card tile"><span style="color:var(--ember)">${ic('pen',30)}</span><div><b>${CHAL.filter(c=>S.draw[c.id]).length}/${CHAL.length}</b><span>Çizim</span></div></div>
  </div>
  <div class="sec-h">Sertifikalarım</div>
  <div class="certs">${certs||`<div class="card"><p style="color:var(--muted)">Bir ünitenin bütün derslerini bitir, yolun sonundaki kupa sınavını geç. Sertifikan burada çıkar.</p></div>`}</div>
  <div class="sec-h">Rozetler <small>${have} / ${BADGES.length}</small></div>
  <div class="badges">${BADGES.map(b=>{const ok=!!S.badges[b.id];return `<div class="card bdg ${ok?'':'locked'}"><div class="medal">${ok?ic(b.icon,34):`<span class="back">${ic(b.icon,46)}</span><span class="lk">${ic('lock',15)}</span>`}</div><b>${b.name}</b><span>${b.desc}</span></div>`}).join('')}</div>
  <div class="sec-h">Öğretmenine göster</div>
  <div class="card" style="display:grid;gap:10px"><p>Bu kod ilerlemeni özetler. Öğretmenin sınıf tablosuna yapıştırınca kaç ders ve deney bitirdiğini görür. Kodda yalnızca adın ve puanların var.</p>
  <div class="codebox"><code id="pcode">${code}</code><button class="b3 sm" type="button" id="pcopy">${ic('copy',16)}Kopyala</button></div></div>
  ${typeof ANKA_N!=='undefined'&&ANKA_N?`<div class="sec-h">Ana ekran widget'ı</div>
  <div class="card wpick"><p class="muted" style="margin:0 0 12px;font-size:.92rem">Anka ve serin ana ekranında dursun. Birine dokun, telefon nereye koyacağını sorar.</p>
  <div class="wrow">${['l','m','s'].map((k,i)=>`<button type="button" class="wadd" data-w="${i}" aria-label="${['Büyük','Yatay','Küçük'][i]} widget ekle">${wMock(k)}<span>${['Büyük · 2×2','Yatay · 2×1','Küçük · 1×1'][i]}</span></button>`).join('')}</div></div>`:''}
  <div class="sec-h">Ayarlar</div>
  <div class="card set">
    <div><b>Titreşim</b><div class="seg" id="sVib"><button type="button" data-v="1" aria-pressed="${S.vib!==false}">Açık</button><button type="button" data-v="0" aria-pressed="${S.vib===false}">Kapalı</button></div></div>
    <div><b>Ses efektleri</b><div class="seg" id="sSound"><button type="button" data-v="1" aria-pressed="${S.sound}">Açık</button><button type="button" data-v="0" aria-pressed="${!S.sound}">Kapalı</button></div></div>
    ${canSpeak?`<div><b>Soruları sesli oku</b><div class="seg" id="sTts"><button type="button" data-v="1" aria-pressed="${S.tts}">Açık</button><button type="button" data-v="0" aria-pressed="${!S.tts}">Kapalı</button></div></div>`:''}
    <div><b>Görünüm</b><div class="seg" id="sTheme">${[['auto','Otomatik'],['light','Gündüz'],['dark','Gece']].map(t=>`<button type="button" data-v="${t[0]}" aria-pressed="${S.theme===t[0]}">${t[1]}</button>`).join('')}</div></div>
    <div><b>Anonim istatistik</b><div class="seg" id="sShare"><button type="button" data-v="1" aria-pressed="${S.share}">Açık</button><button type="button" data-v="0" aria-pressed="${!S.share}">Kapalı</button></div><p class="muted" style="font-size:.82rem;flex-basis:100%">Açıkken bitirdiğin ders ve deney sayıları adın olmadan, rastgele bir kimlikle proje ekibine gönderilir. Böylece sitenin kaç çocuğa ulaştığını görürüz.</p></div>
    ${typeof ANKA_N!=='undefined'&&ANKA_N?`<div><b>Günlük hatırlatma</b><div class="seg" id="sRem">${[[-1,'Kapalı'],[17,'17:00'],[19,'19:00'],[21,'21:00']].map(([v,t])=>`<button type="button" data-v="${v}" aria-pressed="${remHour()===v}">${t}</button>`).join('')}</div></div>`:''}
    <div><b>Günlük hedef</b><div class="seg" id="sGoal">${[10,20,30,50].map(g=>`<button type="button" data-v="${g}" aria-pressed="${S.goal===g}">${g} DP</button>`).join('')}</div></div>
    ${window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.CapacitorUpdater?`<div><b>Uygulama sürümü</b><span class="upd"><code>${esc(window.BK_BUILD)}</code><button class="b3 sm ghost" type="button" id="sUpd">Güncellemeleri denetle</button></span></div>`:''}
    <div><b>İlerlemeyi sıfırla</b><button class="b3 sm ghost" type="button" id="sReset" style="--oc:var(--garnet)">Sıfırla</button></div>
  </div>
  <p style="color:var(--muted);font-size:.88rem;margin-top:10px">İlerlemen yalnızca bu cihazda saklanır.</p>
  <div class="links"><a href="#magaza">Mağaza</a><a href="#defter">Deney defterim</a><a href="#ogretmen">Öğretmenler için</a><a href="#hakkinda">Proje hakkında</a><a href="#yonetici">Yönetici paneli</a></div>`;
  $('#pname').addEventListener('change',e=>{S.name=e.target.value.trim();save();renderProfile()});
  $('#pcopy').onclick=async()=>{try{await navigator.clipboard.writeText(code);toast(ic('check',20)+' Kod kopyalandı')}catch(e){const r=document.createRange();r.selectNodeContents($('#pcode'));const s=getSelection();s.removeAllRanges();s.addRange(r);toast('Kodu seçtim, kopyalayabilirsin')}};
  $$('[data-cert]').forEach(b=>b.onclick=()=>openCert(+b.dataset.cert));
  const segH=(id,fn)=>{const el=$(id);if(el)el.onclick=e=>{const b=e.target.closest('button');if(!b)return;fn(b.dataset.v);save();renderAll()}};
  segH('#sSound',v=>S.sound=v==='1');segH('#sVib',v=>{S.vib=v==='1';if(S.vib)haptic('heavy')});segH('#sTts',v=>{S.tts=v==='1';if(S.tts)speak('Sesli okuma açık.')});segH('#sTheme',v=>{S.theme=v;applyTheme()});segH('#sGoal',v=>S.goal=+v);$$('.wadd').forEach(b=>b.onclick=()=>{ANKA_N.pinWidget({size:+b.dataset.w}).then(r=>{if(!r||!r.ok)openModal(`${anka('think',100)}<h2>Kendin ekleyebilirsin</h2><p>Ana ekranda boş bir yere parmağını basılı tut, <b>Widget'lar</b>'a dokun ve listeden <b>Anka #BilimKıvılcımı</b>'nı bul.</p><button class="b3" type="button" onclick="closeModal()">Tamam</button>`)}).catch(()=>{})});segH('#sRem',v=>{S.remH=+v;if(S.remH>=0&&ANKA_N)ANKA_N.askNotif().then(r=>{if(r&&!r.granted)toast('Bildirim izni kapalı. Telefon ayarlarından açabilirsin.')}).catch(()=>{})});segH('#sShare',v=>{S.share=v==='1'});
  let armed=false;$('#sReset').onclick=e=>{if(!armed){armed=true;e.target.textContent='Emin misin? Tekrar bas';setTimeout(()=>{armed=false;if(e.target.isConnected)e.target.textContent='Sıfırla'},4000);return}
    try{localStorage.removeItem(KEY)}catch(_){ }S=DEF();S.lab.migrated=1;save();applyTheme();location.hash='#ogren';renderAll();onboard()};
}

/* ================= DURUM ÇUBUĞU, YAN KARTLAR ================= */
function renderStats(){
  const today=S.lastDay===dkey();
  const h=fieldBtn()+`<span class="stat fl ${today?'':'off'}" title="Günlük seri" role="button" tabindex="0" aria-label="Günlük seri: açıklama">${fi('flame',24)}${S.streak}</span><span class="stat gm" title="Mozaik taşı" role="button" tabindex="0" aria-label="Mozaik taşı: açıklama">${fi('gem',22)}${S.gems}</span><span class="stat ht" title="Kalp" role="button" tabindex="0" aria-label="Kalp: açıklama">${fi('heart',24)}${S.hearts}</span>`;
  $$('.stats-slot').forEach(s=>{if(s.classList.contains('stats'))s.innerHTML=h;else{s.style.display='flex';s.innerHTML=h}});
  const prev=renderStats.prev,cur={fl:S.streak,gm:S.gems,ht:S.hearts};if(prev&&!reduce)Object.keys(cur).forEach(k=>{if(cur[k]>prev[k])$$('.stat.'+k).forEach(e=>e.classList.add('up'));else if(cur[k]<prev[k])$$('.stat.'+k).forEach(e=>e.classList.add('down'))});renderStats.prev=cur;
  const t=dkey(),days=['Pt','Sa','Ça','Pe','Cu','Ct','Pz'],now=new Date(),wd=(now.getDay()+6)%7;
  $('#rcStreak').innerHTML=`<div class="streakbig"><span style="color:${today?'var(--ember)':'var(--off)'}">${fi('flame',40)}</span><div><b>${S.streak}</b><div style="color:var(--muted);font-size:.88rem">günlük seri</div></div></div>
    <p style="color:var(--muted);font-size:.9rem;margin-top:8px">${today?'Bugünkü dersini yaptın. Harika!':'Serini sürdürmek için bugün bir ders yap.'}</p>
    <div class="week">${days.map((d,i)=>{const dt=new Date(now);dt.setDate(now.getDate()-wd+i);const k=dkey(dt),on=S.days.includes(k);return `<div><i class="${on?'on':''} ${k===t?'today':''}">${on?`<span>${fi('flame',14)}</span>`:''}</i>${d}</div>`}).join('')}</div>`;
  const p=Math.min(1,S.day.xp/S.goal);
  $('#rcGoal').innerHTML=`<h3>Günlük hedef</h3><div style="display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center"><span style="color:var(--ember)">${fi('bolt',32)}</span><div class="bar" data-dp role="button" tabindex="0" aria-label="DP: açıklama"><i style="width:${p*100}%"></i><span>${Math.min(S.day.xp,S.goal)} / ${S.goal} DP</span></div></div>`;
  const dd=!!S.dailyDone[dkey()];
  $('#rcDaily').innerHTML=`<h3>Günün bulmacası</h3><p style="color:var(--muted);font-size:.9rem;margin-bottom:12px">${dd?'Bugünkü bulmacayı çözdün. Yarın yeni bir bulmaca gelecek!':esc(dailyPuzzle().q)}</p><button class="b3 sm ${dd?'ghost':'ember'}" type="button" id="rDaily" style="width:100%">${dd?'Tekrar oyna':'Çöz · +15 mozaik taşı'}</button>`;
  $('#rDaily').onclick=()=>startMode('daily');
  $('#rcQuests').innerHTML=`<h3 style="display:flex;justify-content:space-between">Günlük görevler <a href="#gorevler" class="lbl" style="text-decoration:none;align-self:center">TÜMÜ</a></h3><div class="minique">${questRows(true,true)}</div>`;
}

/* ================= TANIŞMA ================= */
/* Anka'nın konuşma balonu harf harf yazılır; her harfte telefon çok hafif titrer.
   Harfler baştan yerini alır (görünmez), böylece balonun boyu yazarken değişmez. */
let typeTok=0;
const bootOn=()=>{const b=document.getElementById('boot');return !!b&&!b.classList.contains('out')};
function typeBubbles(root){const tok=++typeTok;
  if(bootOn())return;
  $$('.obub',root).forEach((b,bi)=>{const txt=b.textContent;b.setAttribute('aria-label',txt);
    if(reduce)return;
    b.innerHTML=[...txt].map(ch=>`<span class="tch" aria-hidden="true">${esc(ch)}</span>`).join('');
    const sp=$$('.tch',b);let i=0;
    const step=()=>{if(tok!==typeTok||!b.isConnected)return;if(i>=sp.length)return;const ch=sp[i].textContent;sp[i].classList.add('on');i++;
      if(/[^\s.,!?'"…:;-]/.test(ch))haptic('type');setTimeout(step,/[.!?]/.test(ch)?130:/[,:]/.test(ch)?70:24)};
    setTimeout(step,bi===0?160:300)})}
function onboard(){
  if($('#onb'))return;
  const st={i:0,goal:0,field:null,dir:1};
  const qs=['field','name','goal'].concat(canSpeak?['tts']:[]).concat(typeof ANKA_N!=='undefined'&&ANKA_N?['notif']:[]).concat(['gains','start']);
  const steps=['hi','intro',...qs,'end'];
  const el=document.createElement('div');el.id='onb';el.className='onb';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Tanışma');document.body.appendChild(el);
  const bubble=(t,cls)=>`<div class="obub ${cls||''}">${t}</div>`;
  const opt=(k,v,on,a,b,icon)=>`<button type="button" class="oopt ${icon?'wide':''}" data-${k}="${v}" aria-pressed="${on}">${icon?`<span class="oic">${icon}</span><span class="otx"><b>${a}</b><small>${b}</small></span>`:`<b>${a}</b><span>${b}</span>`}</button>`;
  function view(){const k=steps[st.i],qi=qs.indexOf(k);
    const top=`<div class="otop"><button type="button" class="oback" data-oback aria-label="Geri" ${st.i===0?'hidden':''}><span style="display:inline-flex;transform:rotate(-90deg)">${ic('arrowU',28)}</span></button>${qi>=0?`<div class="obar" role="progressbar" aria-valuemin="0" aria-valuemax="${qs.length}" aria-valuenow="${qi+1}"><i style="width:${(qi+1)/qs.length*100}%"></i></div>`:''}</div>`;
    let body='',btn='DEVAM ET',ok=true;
    if(k==='hi')body=`<div class="ocenter">${bubble('Selam! Benim adım Anka!')}<div class="oank">${anka('wave',190,undefined,'act-enter')}</div></div>`;
    else if(k==='intro')body=`<div class="ocenter">${bubble(`İlk dersinden önce seni biraz tanıyalım. Sadece bir dakika sürer!`)}<div class="oank">${anka('cheer',190,undefined,'act-jump')}</div></div>`;
    else{const head=(t,m)=>`<div class="ohead"><div class="oank sm">${anka(m||'think',110,undefined,'act-enter')}</div>${bubble(t,'oside')}</div>`;
      if(k==='field'){ok=!!st.field;body=head('Ne öğrenmek istersin?')+`<div class="oopts">${FIELDS.map(f=>opt('of',f.id,st.field===f.id,f.title,esc(f.desc),ic(f.icon,26))).join('')}</div>`}
      if(k==='name'){body=head('Sana nasıl seslenelim?','happy')+`<label class="oname"><span class="sr">Adın</span><input id="oname" maxlength="24" placeholder="Adın" value="${esc(S.name)}" autocomplete="given-name"></label><p class="onote">Sertifikalarında bu ad yazacak. İstersen boş bırakabilirsin.</p>`}
      if(k==='goal'){ok=!!st.goal;btn='KARARLIYIM';body=head('Günlük öğrenim hedefin ne?','wow')+`<div class="oopts">${[[10,5,'Rahat'],[20,10,'Orta'],[30,15,'Ciddi'],[50,20,'Yoğun']].map(([g,m,t])=>opt('og',g,st.goal===g,`Günde ${m} dakika`,t)).join('')}</div>`}
      if(k==='tts'){ok=S.tts!=null&&st.ttsSet;body=head('Soruları sana sesli okuyayım mı?','happy')+`<div class="oopts">${opt('ot',1,st.ttsSet&&S.tts,'Evet, sesli oku','Okumayı yeni öğrenenler için')}${opt('ot',0,st.ttsSet&&!S.tts,'Hayır, gerek yok','Kendim okurum')}</div>`}
      if(k==='notif'){btn='DERS YAPMAMI HATIRLAT';body=head('Ders yapmanı hatırlatayım ki bir alışkanlık hâline gelsin!','happy')+`<div class="onotif" aria-hidden="true"><svg class="obell" viewBox="0 0 48 48" width="52" height="52"><path d="M24 6c-7 0-12 5.4-12 12.5v8.2L8 33h32l-4-6.3v-8.2C36 11.4 31 6 24 6z" fill="#F2B451"/><path d="M24 6c-3 0-5.6 1-7.6 2.8C21 8 30 10 31 20v13h9l-4-6.3v-8.2C36 11.4 31 6 24 6z" fill="#D9822B" opacity=".55"/><circle cx="24" cy="38" r="5" fill="#A3461F"/><path d="M8 12c1-3 3-5.5 5-7M40 12c-1-3-3-5.5-5-7" stroke="#F2B451" stroke-width="3" stroke-linecap="round" fill="none"/></svg>
        <p><b>Anka #BilimKıvılcımı</b> uygulamasının sana bildirim göndermesine izin verilsin mi?</p><div class="onbtns"><span class="onyes">İzin ver</span><span class="onno">İzin verme</span><span class="onarrow">←</span></div></div>`}
      if(k==='gains'){const f=fieldOf(st.field||S.field||'yazilim');const first={yazilim:['Kod yazmayı öğren','Algoritmalar, döngüler ve Python ile ilk programların'],mekanik:['Makineleri anla','Dişliler, kaldıraçlar ve robotun iskeleti'],elektronik:['Devreleri tanı','Akım, pil, motor ve sensörler']}[f.id]||['Yeni şeyler öğren','Adım adım, eğlenerek'];
        body=head('İşte 1 ayda kazanacakların!','wow')+`<div class="ogains">${[[f.icon,'#E58A2C',first[0],first[1]],['target','#5B8DEF','Bilim insanı gibi düşün','Tahmin et, dene, ölç ve sonucu yorumla'],['clock','#E0A526','Öğrenme alışkanlığı edin','Günlük seri, hatırlatmalar, kupalar ve ödüller']].map(([i,c,t,d],n)=>`<div class="ogain" style="--d:${.15+n*.18}s"><span class="ogic" style="--c:${c}">${ic(i,28)}</span><div><b>${t}</b><small>${d}</small></div></div>`).join('')}</div>`}
      if(k==='start'){ok=!!st.start;const f=fieldOf(st.field||S.field||'yazilim');
        body=head('Şimdi, başlaman gereken yeri bulalım!','think')+`<div class="oopts ostart">
        <button type="button" class="oopt wide" data-os="zero" aria-pressed="${st.start==='zero'}"><span class="otag">TAVSİYE EDİLEN</span><span class="oill"><svg viewBox="0 0 48 48" width="54" height="54"><rect x="9" y="5" width="30" height="38" rx="3" fill="#F2B451"/><rect x="33" y="7" width="4" height="34" rx="1" fill="#fff" opacity=".85"/><path d="M14 5h7v10l-3.5-2.5L14 15z" fill="#C2412D"/><text x="22" y="34" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="800" font-size="17" fill="#A3461F">1</text></svg></span><span class="otx"><b>${esc(f.title)} öğrenmeye yeni mi başlıyorsun?</b><small>Sıfırdan başla!</small></span></button>
        <button type="button" class="oopt wide" data-os="place" aria-pressed="${st.start==='place'}"><span class="oill"><svg viewBox="0 0 48 48" width="54" height="54"><circle cx="24" cy="24" r="20" fill="#2F7DB8"/><circle cx="24" cy="24" r="15" fill="#fff"/><path d="M31 15l-4.5 11.5L17 33l4.5-11.5z" fill="#C2412D"/><path d="M17 33l4.5-11.5 5 5z" fill="#B9B0A8"/></svg></span><span class="otx"><b>Zaten biraz biliyor musun?</b><small>Kısa bir sınavla başlayacağın yeri bulalım!</small></span></button></div>`}
      if(k==='end'){btn=st.start==='place'?'SINAVA BAŞLA':'İLK DERSİME BAŞLA';body=`<div class="ocenter">${bubble(st.start==='place'?`Harika${S.name?', '+esc(S.name):''}! 8 soruluk kısa bir sınav yapalım. Geçersen ilk üniteyi atlarsın.`:`Harika${S.name?', '+esc(S.name):''}! Hadi ilk dersine başlayalım.`)}<div class="oank">${anka('cheer',190,undefined,'act-dance')}</div></div>`}}
    el.innerHTML=`${top}<div class="obody ${st.dir<0?'back':''}">${body}</div><div class="ofoot"><button type="button" class="obtn" data-onext ${ok?'':'disabled'}>${btn}</button>${k==='notif'?'<button type="button" class="oskip" data-onskip>Şimdi değil</button>':''}</div>`;
    typeBubbles(el);
    const n=$('#oname');if(n){n.addEventListener('keydown',e=>{if(e.key==='Enter')next()});setTimeout(()=>n.focus(),300)}
    else setTimeout(()=>{const b=el.querySelector('.obtn:not([disabled])');if(b)b.focus({preventScroll:true})},60)}
  function next(){const k=steps[st.i];if(k==='name')S.name=($('#oname').value||'').trim();
    if(k==='notif'&&!st.asking){st.asking=true;S.notifAsked=true;const go=()=>{st.asking=false;st.i++;st.dir=1;sfx.tap();view()};
      ANKA_N.askNotif().then(r=>{if(r&&r.granted){if(S.remH==null||S.remH<0)S.remH=19}else S.remH=-1;save();go()}).catch(go);return}
    if(k==='notif')return;
    if(k==='end'){S.field=st.field||S.field;S.goal=st.goal||20;S.onb=true;save();el.classList.add('out');setTimeout(()=>el.remove(),300);renderAll();
      if(st.start==='place'){const fu=fieldUnits(S.field)[0];if(fu){startMode('exam',{ui:fu.ui,skip:true});return}}
      const l=curLesson();if(l)startMode('lesson',{lesson:l});return}
    st.i++;st.dir=1;sfx.tap();view()}
  el.addEventListener('click',e=>{
    if(e.target.closest('[data-oback]')){if(steps[st.i]==='name')S.name=($('#oname').value||'').trim();st.i=Math.max(0,st.i-1);st.dir=-1;view();return}
    if(e.target.closest('[data-onext]')){next();return}
    if(e.target.closest('[data-onskip]')){S.notifAsked=true;S.remH=-1;save();st.i++;st.dir=1;view();return}
    const pickOpt=b=>{el.querySelectorAll('.oopt').forEach(x=>x.setAttribute('aria-pressed',x===b));const n=el.querySelector('[data-onext]');if(n)n.disabled=false;sfx.chirp();
      const a=el.querySelector('.ohead .anka');if(a&&typeof ankaAct==='function')ankaAct(a,'jump')};
    const f=e.target.closest('[data-of]');if(f){st.field=f.dataset.of;S.field=st.field;pickOpt(f);return}
    const g=e.target.closest('[data-og]');if(g){st.goal=+g.dataset.og;pickOpt(g);return}
    const os=e.target.closest('[data-os]');if(os){st.start=os.dataset.os;pickOpt(os);return}
    const t=e.target.closest('[data-ot]');if(t){S.tts=t.dataset.ot==='1';st.ttsSet=true;pickOpt(t);if(S.tts)speak('Tamam, soruları sesli okuyacağım.')}});
  view();
  /* Uygulamada açılış ekranı varken Anka konuşmaya başlamasın: ekran kalkınca baştan çiz */
  if(bootOn()){const w=setInterval(()=>{if(bootOn())return;clearInterval(w);if(el.isConnected&&st.i===0)view()},60)}
}

