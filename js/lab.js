/* #BilimKıvılcımı · Laboratuvar: 8 deney oyunu (2B tuval). Her oyunda 5 bölüm, yıldızlar ve kendiliğinden dolan deney defteri. */
'use strict';

/* ================= ORTAK ÇİZİM ================= */
const GW=800,GH=520,MONTH=29.53;
const K={sky:'#F6E9CC',sky2:'#E8D2A6',ink:'#2F2E24',muted:'#6B604A',cream:'#FBF6EA',sand:'#DCC190',terra:'#A3461F',terraL:'#C4602F',ember:'#D9822B',gold:'#EBC27A',
  olive:'#4B5A3A',oliveL:'#7C8F5A',oliveD:'#2F3A28',rust:'#6F3420',garnet:'#8E2B22',stone:'#A39882',stoneD:'#7A705E',steel:'#8C979C',wood:'#A8743F',woodD:'#73491F',
  water:'#5B9DB5',night:'#1B2130',board:'#2B3324',copper:'#E3B25A'};
const FNT=(w,s)=>`${w} ${s}px Manrope,"Segoe UI",system-ui,sans-serif`;
const FSL=s=>`700 ${s}px "Zilla Slab","Roboto Slab",Georgia,serif`;
function tx(c,s,x,y,o){o=o||{};c.font=o.f||FNT(o.w||800,o.s||16);c.textAlign=o.a||'center';c.textBaseline=o.b||'middle';
  if(o.st){c.lineJoin='round';c.lineWidth=o.sw||4;c.strokeStyle=o.st;c.strokeText(s,x,y)}c.fillStyle=o.c||K.ink;c.fillText(s,x,y)}
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r||0);else c.rect(x,y,w,h)}
function circ(c,x,y,r){c.beginPath();c.arc(x,y,r,0,Math.PI*2)}
function fillR(c,x,y,w,h,col,r){rr(c,x,y,w,h,r);c.fillStyle=col;c.fill()}
function star5(c,x,y,r){c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}c.closePath()}
function lgrad(c,x0,y0,x1,y1,stops){const g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach((s,i)=>g.addColorStop(i/Math.max(1,stops.length-1),s));return g}
function tess(c,x0,x1,y,s,cols){let i=0;for(let x=x0;x<x1;x+=s+2){c.fillStyle=cols[(i*5+2)%cols.length];c.fillRect(x,y,s,s);i++}}
function wrapTx(c,s,x,y,maxW,lh,o){c.font=(o&&o.f)||FNT((o&&o.w)||800,(o&&o.s)||16);const words=s.split(' ');let line='',lines=[];
  words.forEach(w=>{const t=line?line+' '+w:w;if(c.measureText(t).width>maxW&&line){lines.push(line);line=w}else line=t});if(line)lines.push(line);
  const y0=y-(lines.length-1)*lh/2;lines.forEach((l,i)=>tx(c,l,x,y0+i*lh,o));return lines.length}
const lerp=(a,b,t)=>a+(b-a)*t;
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
let SEED=1;const srnd=()=>(SEED=(SEED*16807)%2147483647)/2147483647;
const SKYST=(()=>{SEED=11;return Array.from({length:70},()=>({x:srnd()*GW,y:srnd()*GH*.8,r:.6+srnd()*1.6,p:srnd()*6}))})();
function nightSky(c,x,y,w,h,t){c.save();rr(c,x,y,w,h,0);c.clip();c.fillStyle=lgrad(c,0,y,0,y+h,['#141A28','#232B40']);c.fillRect(x,y,w,h);
  SKYST.forEach(s=>{const sx=x+(s.x/GW)*w,sy=y+(s.y/GH)*h;c.globalAlpha=.45+.45*Math.sin(t*1.3+s.p);circ(c,sx,sy,s.r);c.fillStyle='#F4EAD6';c.fill()});c.globalAlpha=1;c.restore()}

/* Ay evreleri (ortak) */
function phaseName(d){d=((d%MONTH)+MONTH)%MONTH;return d<1||d>28.5?'Yeni Ay':d<6.4?'Hilal (büyüyen)':d<8.4?'İlk dördün':d<13.8?'Şişkin Ay (büyüyen)':d<15.8?'Dolunay':d<21.1?'Şişkin Ay (küçülen)':d<23.1?'Son dördün':'Hilal (küçülen)'}
const litFrac=d=>(1-Math.cos(2*Math.PI*d/MONTH))/2;
function moonPhase(c,cx,cy,r,d){
  const th=2*Math.PI*(((d%MONTH)+MONTH)%MONTH)/MONTH,k=Math.cos(th),wax=th<Math.PI,DK='#2B3040',LT='#F1E8D0';
  c.save();circ(c,cx,cy,r);c.fillStyle=DK;c.fill();c.clip();
  c.beginPath();c.arc(cx,cy,r,-Math.PI/2,Math.PI/2,!wax);c.closePath();c.fillStyle=LT;c.fill();
  c.beginPath();c.ellipse(cx,cy,Math.max(.01,r*Math.abs(k)),r,0,0,Math.PI*2);c.fillStyle=k>0?DK:LT;c.fill();
  c.globalAlpha=.13;c.fillStyle='#2F2E24';[[-.3,-.25,.18],[.25,.1,.14],[-.05,.38,.12],[.35,-.38,.08],[-.42,.15,.09]].forEach(([a,b,s])=>{circ(c,cx+a*r,cy+b*r,s*r);c.fill()});
  c.restore();c.globalAlpha=1;circ(c,cx,cy,r);c.strokeStyle='rgba(244,234,214,.25)';c.lineWidth=1.5;c.stroke()}

/* ================= İLERLEME ================= */
const lvKey=(id,i)=>id+'-'+i;
const lvDone=(id,i)=>!!S.lab.tasks[lvKey(id,i)];
const lvStars=(id,i)=>Math.max((S.lab.st||{})[lvKey(id,i)]||0,lvDone(id,i)?1:0);
const lvOpen=(id,i)=>i===0||lvDone(id,i-1)||lvDone(id,i);
function labTotal(){return EXPS.reduce((s,x)=>s+x.levels.length,0)}
function labExpDone(id){const x=EXPS.find(e=>e.id===id);return x?x.levels.filter((l,i)=>lvDone(id,i)).length:0}
function labDoneCount(){return EXPS.reduce((s,x)=>s+labExpDone(x.id),0)}
function labStarSum(id){const x=EXPS.find(e=>e.id===id);return x?x.levels.reduce((s,l,i)=>s+lvStars(id,i),0):0}
function labNoteCount(){return Object.values(S.lab.notes||{}).reduce((s,a)=>s+a.length,0)}
const starRow=(n,sz)=>[0,1,2].map(j=>`<i class="${j<n?'on':''}">${fi('star',sz||14)}</i>`).join('');

/* ================= OYUN MOTORU ================= */
let GM=null;
function unmountExp(){if(!GM)return;cancelAnimationFrame(GM.raf);GM.timers.forEach(clearTimeout);try{GM.ro&&GM.ro.disconnect()}catch(e){}try{GM.g&&GM.g.dispose&&GM.g.dispose()}catch(e){}GM=null}
function gLater(fn,ms){if(!GM)return;const me=GM,id=setTimeout(()=>{if(GM===me)fn()},ms);GM.timers.push(id);return id}

function renderExp(id){
  unmountExp();
  const x=EXPS.find(e=>e.id===id);if(!x){location.hash='#lab';return}
  S.lab.st=S.lab.st||{};S.lab.ask=S.lab.ask||{};
  if(!S.lab.seen[id]){S.lab.seen[id]=1;save()}
  let lv=x.levels.findIndex((l,i)=>!lvDone(id,i));if(lv<0)lv=0;
  const nx=EXPS[(EXPS.indexOf(x)+1)%EXPS.length];
  $('#pgExp').innerHTML=`<a class="back" href="#lab">${ic('rotL',18)} Laboratuvar</a>
  <section class="game" style="--gc:${x.col}" aria-label="${esc(x.title)} deney oyunu">
    <header class="ghead"><span class="gico">${ic(x.icon,26)}</span><div class="gti"><span class="tag">${x.grade}</span><h1>${x.title}</h1></div><div class="glv" id="gLv" role="group" aria-label="Bölümler"></div></header>
    <div class="gframe">
      <div class="ggoal" id="gGoal" aria-live="polite"></div>
      <div class="gstage" id="gStage"><canvas class="gcv" id="gCv" role="img" aria-label="${esc(x.title)} oyun alanı. ${esc(x.hint)}"></canvas><div class="gov" id="gOv" hidden></div></div>
      <div class="gdock" id="gDock"></div>
      <div class="gtip" id="gTip" aria-live="polite"></div>
    </div>
  </section>
  <div class="gbelow">
    <div class="card xrec"><div class="gnh"><div><h3>Deney defteri</h3><p class="muted">Her denemen buraya kendiliğinden yazılır.</p></div><button class="b3 ghost sm" type="button" id="xClear" aria-label="Ölçümleri sil">${ic('trash',16)}</button></div>
      <div id="xTable"></div>${x.chart?`<canvas class="chart" id="xChart" style="margin-top:12px" aria-label="Ölçüm grafiği"></canvas><p class="muted" style="font-size:.82rem;margin-top:4px">Kare noktalar senin denemelerin, turuncu çizgi ${esc(x.chart.curveName)}.</p>`:''}</div>
    <div class="card xinfo"><h3 style="margin-bottom:10px">Bu nasıl çalışıyor?</h3><span class="formula">${esc(x.formula)}</span><p class="explain">${x.explain}</p>
      <div class="fact"><span>${ic('home',20)}</span><p><b>Gerçek hayatta:</b> ${esc(x.real)}</p></div><div class="fact"><span>${ic('star',20)}</span><p><b>Biliyor muydun?</b> ${esc(x.fact)}</p></div>
      <a class="b3 ghost sm" style="margin-top:14px" href="#lab-${nx.id}">${ic(nx.icon,16)} Sıradaki deney: ${nx.title}</a></div>
  </div>`;
  const cv=$('#gCv');
  GM={x,lv,nx,fx:[],sh:0,raf:0,over:false,ov:false,cv,c:cv.getContext('2d'),sc:1,ctl:{},timers:[],tipT:'',t:0};
  const G=gApi();GM.G=G;
  try{GM.g=x.mk(G)}catch(err){console.error(err);$('#gStage').insertAdjacentHTML('beforeend','<div class="s3err"><p>Bu oyun açılamadı. Sayfayı yenilemeyi dene.</p></div>');return}
  /* dokunma */
  const pt=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*GW,y:(e.clientY-r.top)/r.height*GH}};
  cv.addEventListener('pointerdown',e=>{if(!GM||GM.over||GM.ov||!GM.g.down)return;const p=pt(e);if(GM.g.down(p)){GM.drag=true;try{cv.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault()}});
  cv.addEventListener('pointermove',e=>{if(!GM)return;const p=pt(e);if(GM.drag){GM.g.move&&GM.g.move(p)}else if(GM.g.hover&&!GM.over)cv.style.cursor=GM.g.hover(p)?'pointer':''});
  const end=e=>{if(GM&&GM.drag){GM.drag=false;GM.g.up&&GM.g.up(e&&e.type==='pointerup'?pt(e):null)}};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  /* kontroller */
  const dk=$('#gDock');
  dk.addEventListener('input',e=>{const r=e.target.closest('[data-rg]');if(!r)return;const d=GM.ctl[r.dataset.rg];if(d){d.set(+r.value);G.sync(r.dataset.rg,true)}});
  dk.addEventListener('click',e=>{if(!GM||GM.over||GM.ov)return;
    const sg=e.target.closest('[data-sg] button');if(sg){const k=sg.parentElement.dataset.sg,d=GM.ctl[k];if(d&&!sg.disabled){d.set(isNaN(+sg.dataset.v)?sg.dataset.v:+sg.dataset.v);sfx.tap();G.sync(k)}return}
    const a=e.target.closest('[data-act]');if(a&&!a.disabled&&GM.g.act)GM.g.act(a.dataset.act,a.dataset.v,a)});
  let hold=null;const stopHold=()=>{clearTimeout(hold&&hold.t);clearInterval(hold&&hold.i);hold=null};
  dk.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-pm]');if(!b||GM.over||GM.ov)return;e.preventDefault();const k=b.dataset.pm,d=GM.ctl[k],s=+b.dataset.d;
    const step=()=>{d.set(clamp(+(d.get()+s*(d.pstep||d.step)).toFixed(4),d.min,d.max));G.sync(k)};step();sfx.tap();stopHold();hold={t:setTimeout(()=>{hold.i=setInterval(step,70)},380)}});
  ['pointerup','pointerleave','pointercancel'].forEach(t=>dk.addEventListener(t,stopHold));
  /* bölümler ve üst katman */
  $('#gLv').addEventListener('click',e=>{const b=e.target.closest('[data-lv]');if(!b||b.disabled)return;sfx.tap();startLevel(+b.dataset.lv)});
  $('#gOv').addEventListener('click',e=>{const o=e.target.closest('[data-ov]');if(o){sfx.tap();const a=o.dataset.ov;if(a==='next')startLevel(GM.lv+1);else if(a==='again')startLevel(GM.lv);else if(a==='close')hideOv();return}
    const pk=e.target.closest('[data-pk]');if(pk)pickAsk(+pk.dataset.pk)});
  $('#xClear').onclick=e=>{const b=e.currentTarget;if(!b.dataset.arm){b.dataset.arm=1;b.textContent='Sil?';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.innerHTML=ic('trash',16)}},3000);return}
    delete S.lab.notes[x.id];save();renderNotes();b.innerHTML=ic('trash',16);delete b.dataset.arm};
  GM.ro=new ResizeObserver(()=>{fitCv();if(GM&&GM.x.chart)renderNotes()});GM.ro.observe(cv);fitCv();
  startLevel(lv);renderNotes();
  let last=performance.now();
  const loop=t=>{if(!GM)return;const dt=Math.min(.033,(t-last)/1000);last=t;GM.t+=dt;
    try{GM.g.frame&&GM.g.frame(dt,GM.t);gRender(dt)}catch(err){console.error(err)}GM.raf=requestAnimationFrame(loop)};
  GM.raf=requestAnimationFrame(loop);
}
function fitCv(){if(!GM)return;const cv=GM.cv,w=cv.clientWidth;if(!w)return;const d=Math.min(window.devicePixelRatio||1,2);cv.width=Math.round(w*d);cv.height=Math.round(w*GH/GW*d);GM.sc=cv.width/GW}
function gRender(dt){
  const c=GM.c;c.setTransform(GM.sc,0,0,GM.sc,0,0);c.clearRect(0,0,GW,GH);
  if(GM.sh>0){c.translate((Math.random()-.5)*GM.sh,(Math.random()-.5)*GM.sh);GM.sh=Math.max(0,GM.sh-dt*36)}
  c.save();GM.g.draw(c,GM.t);c.restore();
  GM.fx=GM.fx.filter(f=>(f.t+=dt)<f.life);
  GM.fx.forEach(f=>{const k=f.t/f.life;
    if(f.k==='t'){c.globalAlpha=k<.7?1:1-(k-.7)/.3;tx(c,f.s,f.x,f.y-k*46,{s:f.sz||22,c:f.col,st:K.cream,sw:5});c.globalAlpha=1}
    else{f.vy+=f.g*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;c.globalAlpha=1-k;c.save();c.translate(f.x,f.y);c.rotate(f.t*6+f.r);c.fillStyle=f.col;c.fillRect(-f.s/2,-f.s/2,f.s,f.s);c.restore();c.globalAlpha=1}});
  if(GM.flash>0){c.fillStyle=`rgba(255,250,235,${GM.flash})`;c.fillRect(0,0,GW,GH);GM.flash=Math.max(0,GM.flash-dt*3)}
}
function gApi(){return{
  W:GW,H:GH,
  get lv(){return GM.lv},get L(){return GM.x.levels[GM.lv]},get busy(){return GM.over||GM.ov},
  dock(h){$('#gDock').innerHTML=h},
  ctl(k,d){GM.ctl[k]=d},
  range(k,label){const d=GM.ctl[k],v=d.get();return `<div class="grg"><div class="grl"><span>${label}</span><output data-out="${k}">${d.fmt(v)}</output></div><div class="grw"><button type="button" class="gpm" data-pm="${k}" data-d="-1" aria-label="${label}: azalt">−</button><input type="range" data-rg="${k}" min="${d.min}" max="${d.max}" step="${d.step}" value="${v}" aria-label="${label}"><button type="button" class="gpm" data-pm="${k}" data-d="1" aria-label="${label}: artır">+</button></div></div>`},
  seg(k,label,opts){const v=GM.ctl[k].get();return `<div class="gsg"><div class="grl"><span>${label}</span></div><div class="seg" data-sg="${k}">${opts.map(([val,t])=>`<button type="button" data-v="${val}" aria-pressed="${String(val)===String(v)}">${t}</button>`).join('')}</div></div>`},
  sync(k,fromInput){const d=GM.ctl[k];if(!d)return;const v=d.get(),dk=$('#gDock');if(!dk)return;const o=dk.querySelector(`[data-out="${k}"]`);if(o)o.textContent=d.fmt(v);
    const r=dk.querySelector(`[data-rg="${k}"]`);if(r&&!fromInput)r.value=v;dk.querySelectorAll(`[data-sg="${k}"] button`).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v)===String(v)))},
  tip(mood,t,act){if(!GM||GM.tipT===t)return;GM.tipT=t;const el=$('#gTip');if(el)el.innerHTML=`${anka(mood||'think',46,undefined,act||(mood==='cheer'?'act-jump':mood==='sad'?'act-shake':''))}<p>${esc(t)}</p>`},
  pop(x,y,s,col,sz){GM.fx.push({k:'t',x,y,s,col:col||K.ink,sz,t:0,life:1.3})},
  burst(x,y,col,n,sp,g){if(reduce)return;n=n||14;sp=sp||220;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=sp*(.35+Math.random()*.65);GM.fx.push({k:'p',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-sp*.3,g:g==null?600:g,col:Array.isArray(col)?pick(col):col,s:3+Math.random()*5,r:Math.random()*3,t:0,life:.5+Math.random()*.5})}},
  shake(a){if(!reduce)GM.sh=Math.max(GM.sh,a||8)},
  flash(){if(!reduce)GM.flash=.85},
  later:gLater,
  win:gWin,fail:gFail,log:gLog
}}
function startLevel(i){
  if(!GM)return;const x=GM.x;i=clamp(i,0,x.levels.length-1);GM.lv=i;GM.over=false;GM.fx=[];GM.timers.forEach(clearTimeout);GM.timers=[];hideOv();
  const L=x.levels[i],k=lvKey(x.id,i);
  drawLvChips();drawGoal();GM.tipT='';GM.G.tip('think',L.tip||x.hint);
  GM.g.start(i,L);
  if(L.ask&&S.lab.ask[k]==null)showAsk(L.ask);
}
function drawLvChips(){const x=GM.x;$('#gLv').innerHTML=x.levels.map((l,i)=>{const op=lvOpen(x.id,i),s=lvStars(x.id,i);
  return `<button type="button" class="glc ${i===GM.lv?'on':''} ${s?'won':''}" data-lv="${i}" ${op?'':'disabled'} aria-pressed="${i===GM.lv}" aria-label="${i+1}. bölüm${op?(s?', '+s+' yıldız':''):', kilitli'}"><b>${op?i+1:ic('lock',14)}</b><span class="gls">${starRow(s,10)}</span></button>`}).join('')}
function drawGoal(){const x=GM.x,i=GM.lv,L=x.levels[i],s=lvStars(x.id,i);
  $('#gGoal').innerHTML=`<span class="gbadge">BÖLÜM ${i+1}/${x.levels.length}</span><p>${esc(L.goal)}</p><span class="gst" aria-label="En iyi sonucun: ${s} yıldız">${starRow(s,16)}</span>`}
function showOv(h,cls){const o=$('#gOv');o.className='gov '+(cls||'');o.innerHTML=`<div class="govc">${h}</div>`;o.hidden=false;GM.ov=true;const b=o.querySelector('button,a');if(b)setTimeout(()=>{try{b.focus({preventScroll:true})}catch(e){}},80)}
function hideOv(){const o=$('#gOv');if(o){o.hidden=true;o.innerHTML=''}if(GM)GM.ov=false}
function showAsk(a){showOv(`<span class="gey">${ic('bulb',16)} ÖNCE TAHMİN ET</span><h3>${esc(a.q)}</h3><div class="popts">${a.opts.map((o,j)=>`<button class="popt" type="button" data-pk="${j}">${esc(o)}</button>`).join('')}</div><p class="tres" id="gAskRes"></p><button class="b3" type="button" data-ov="close" id="gAskGo" hidden>Deneyerek gör</button>`,'ask')}
function pickAsk(j){const x=GM.x,k=lvKey(x.id,GM.lv),a=x.levels[GM.lv].ask;if(S.lab.ask[k]!=null&&$('#gAskGo')&&!$('#gAskGo').hidden)return;
  const first=S.lab.ask[k]==null;S.lab.ask[k]=j;const ok=j===a.a;
  $$('#gOv [data-pk]').forEach(b=>{b.disabled=true;if(+b.dataset.pk===j)b.classList.add(ok?'ok':'no')});
  $('#gAskRes').className='tres '+(ok?'good':'bad');$('#gAskRes').textContent=ok?'Güzel tahmin! Şimdi deneyerek kontrol et.':'Bakalım deney ne gösterecek. Dikkatle gözle!';
  if(ok&&first){S.gems+=2;renderStats();sfx.coin();toast(fi('gem',20)+' Doğru tahmin · +2 taş')}else if(!ok)sfx.tap();
  save();$('#gAskGo').hidden=false;$('#gAskGo').focus({preventScroll:true});GM.G.tip('think',x.levels[GM.lv].tip||x.hint)}
function gWin(stars,msg){
  if(!GM||GM.over)return;GM.over=true;
  const x=GM.x,i=GM.lv,k=lvKey(x.id,i),first=!S.lab.tasks[k],prev=lvStars(x.id,i),L=x.levels[i];stars=clamp(Math.round(stars),1,3);
  if(stars>(S.lab.st[k]||0))S.lab.st[k]=stars;
  if(first){S.lab.tasks[k]=dkey();S.day.lab=(S.day.lab||0)+1;smallReward(10,5,x.title+' · '+(i+1)+'. bölüm')}
  else if(stars===3&&prev<3){S.gems+=3;save();renderStats();toast(fi('gem',20)+' Üç yıldız! +3 taş')}else save();
  GM.G.tip('cheer',stars===3?'Üç yıldız! Tam bir bilim insanı gibi!':pickL(ANKA.ok));
  const last=i>=x.levels.length-1,a=L.ask;
  gLater(()=>{sfx.win();if(first||stars===3)confetti();
    showOv(`<div class="gstars">${[0,1,2].map(j=>`<i class="${j<stars?'on':''}" style="--d:${.1+j*.2}s">${fi('star',46)}</i>`).join('')}</div><h3>${last?'Deney tamamlandı!':'Bölüm tamam!'}</h3><p>${esc(msg||L.win)}</p>${a?`<p class="gwhy"><b>Tahmin sorusu:</b> ${esc(a.why)}</p>`:''}
      ${stars<3?`<p class="gmore">${esc(L.three||'Üç yıldız için daha az denemede bitirmeyi dene.')}</p>`:''}
      <div class="gobt"><button class="b3 ghost" type="button" data-ov="again">${ic('reset',16)} Tekrar oyna</button>${last?`<a class="b3" href="#lab-${GM.nx.id}">Sıradaki deney</a>`:`<button class="b3" type="button" data-ov="next">Sonraki bölüm</button>`}</div>`,'win');drawLvChips();drawGoal()},650);
}
function gFail(msg){if(!GM||GM.over)return;GM.over=true;sfx.bad();
  gLater(()=>showOv(`${anka('sad',76,undefined,'act-shake')}<h3>Olmadı!</h3><p>${esc(msg)}</p><div class="gobt"><button class="b3" type="button" data-ov="again">${ic('reset',16)} Tekrar dene</button></div>`,'fail'),600)}
function gLog(r){if(!GM)return;const id=GM.x.id,a=S.lab.notes[id]=(S.lab.notes[id]||[]);a.push(r);if(a.length>40)a.shift();
  const nb=BADGES.filter(b=>!S.badges[b.id]&&b.t());nb.forEach(b=>S.badges[b.id]=dkey());save();renderNotes();
  if(nb.length)toast(ic('notebook',20)+' Yeni rozet: '+nb[0].name)}

/* ================= OYUN 1: SARKAÇ SAATİ ================= */
const PLAN={dunya:{n:'Dünya',g:9.81,s:['#F7E8C6','#E7CC9A'],gr:'#8E9C62',gr2:'#6F7C48'},ay:{n:'Ay',g:1.62,s:['#1E2436','#2E3550'],gr:'#B5AFA2',gr2:'#8D877B',night:1},
  mars:{n:'Mars',g:3.71,s:['#F0C29A','#D08B5E'],gr:'#B25A30',gr2:'#8A4120'},jup:{n:'Jüpiter',g:24.79,s:['#F3DDB4','#DCAA70'],gr:'#C38A50',gr2:'#9C6634'}};
function mkSarkac(G){
  const OX=290,OY=82,PX=150,AMP=13*Math.PI/180,GY=470;
  const P={L:.5,m:1,pl:'dunya',T:2,th:AMP,w:0,mode:'idle',t:0,cr:[],beatT:-9,tickT:-9,beats:0,drag:false,last:null,tries:0};
  const gv=()=>PLAN[P.pl].g,br=()=>12+Math.sqrt(P.m)*5;
  const bob=()=>({x:OX+Math.sin(P.th)*P.L*PX,y:OY+Math.cos(P.th)*P.L*PX});
  G.ctl('L',{get:()=>P.L,set:v=>{P.L=clamp(Math.round(v*100)/100,.2,2.5);if(P.mode!=='run'){P.mode='idle';P.th=AMP;P.w=0}},min:.2,max:2.5,step:.01,fmt:v=>trn(v)+' m'});
  G.ctl('m',{get:()=>P.m,set:v=>{P.m=+v},fmt:v=>v+' kg'});
  const btn=()=>{const b=$('#gDock [data-act="go"]');if(b)b.innerHTML=P.mode==='run'?`${ic('pause',18)}<span>Durdur</span>`:`${ic('play',18)}<span>Bırak!</span>`};
  function hold(){P.mode='idle';P.th=AMP;P.w=0;P.t=0;P.cr=[];P.beats=0;P.beatT=P.tickT=-9;btn()}
  function finish(){const Tm=(P.cr[2]-P.cr[0])/2,err=Math.abs(Tm-P.T)/P.T;P.mode='after';P.last=Tm;P.tries++;btn();
    const st=err<=.02?3:err<=.05?2:err<=.1?1:0;
    G.log({c:{'İp':trn(P.L)+' m','Kütle':P.m+' kg','Yer':PLAN[P.pl].n,'Süre':trn(Tm)+' sn'},x:P.L,y:Tm});
    if(st){sfx.ok();G.pop(640,330,st===3?'Kusursuz!':st===2?'Çok iyi!':'Oldu!',K.olive,28);G.win(st)}
    else{sfx.bad();G.tip('think',`Sarkacın ${trn(Tm)} saniyede bir gidip geliyor, hedef ${trn(P.T)} saniye. ${Tm<P.T?'Çok hızlı! İpi uzat.':'Çok yavaş! İpi kısalt.'}`)}}
  return{
    start(i,L){P.pl=L.pl;P.T=L.T;P.L=L.L0;P.m=L.m||1;P.last=null;P.tries=0;hold();
      G.dock(`<div class="gctl">${G.range('L','İp uzunluğu')}${G.seg('m','Topun kütlesi',[[1,'1 kg'],[5,'5 kg'],[10,'10 kg']])}</div><div class="gacts"><button class="gact" type="button" data-act="go"></button></div>`);btn()},
    act(a){if(a!=='go')return;if(P.mode==='run'){hold();G.tip('think','Durdurdun. İpi ayarlayıp yeniden bırak.');return}
      hold();P.mode='run';P.beatT=P.tickT=0;btn();sfx.tap();G.tip('think','İki ışığı izle: hedef ışığı ile sarkaç ışığı aynı anda yanıyor mu?')},
    frame(dt){
      if(P.mode==='run'||P.mode==='after'){const n=12,h=dt/n;for(let k=0;k<n;k++){const th0=P.th,w0=P.w;P.w+=-(gv()/P.L)*Math.sin(P.th)*h;P.th+=P.w*h;P.t+=h;
          if(P.mode!=='run')continue;
          if(th0>0&&P.th<=0)P.cr.push(P.t-h+h*th0/(th0-P.th));
          if(w0>0&&P.w<=0&&P.th>0){P.tickT=P.t;sfx.tick()}}
        if(P.mode==='run'){const nb=Math.floor(P.t/P.T+1e-6);if(nb>P.beats){P.beats=nb;P.beatT=P.t;sfx.tap()}if(P.cr.length>=3)finish()}
        else P.w*=1-dt*.05}
    },
    down(p){if(P.mode==='run')return false;const b=bob();if(Math.hypot(p.x-b.x,p.y-b.y)<br()+22){P.drag=true;hold();return true}return false},
    move(p){if(!P.drag)return;GM.ctl.L.set(Math.hypot(p.x-OX,p.y-OY)/PX);G.sync('L')},
    up(){P.drag=false},
    hover(p){const b=bob();return P.mode!=='run'&&Math.hypot(p.x-b.x,p.y-b.y)<br()+22},
    curve:x=>2*Math.PI*Math.sqrt(x/gv()),
    draw(c,t){const pl=PLAN[P.pl];
      c.fillStyle=lgrad(c,0,0,0,GY,pl.s);c.fillRect(0,0,GW,GH);
      if(pl.night){SKYST.forEach(s=>{c.globalAlpha=.5+.4*Math.sin(t*1.5+s.p);circ(c,s.x,s.y*.8,s.r);c.fillStyle='#F4EAD6';c.fill()});c.globalAlpha=1;
        circ(c,700,70,26);c.fillStyle='#5B9DB5';c.fill();c.fillStyle='#7C8F5A';c.beginPath();c.ellipse(694,64,12,8,.4,0,7);c.fill()}
      else if(P.pl==='jup'){c.globalAlpha=.25;['#C98E52','#E8C38E','#B5713C'].forEach((col,i)=>{c.fillStyle=col;c.fillRect(0,60+i*90,GW,34)});c.globalAlpha=1}
      else if(P.pl==='mars'){circ(c,690,80,16);c.fillStyle='#FBEFD8';c.fill()}
      else{circ(c,700,74,30);c.fillStyle='#F2C46A';c.fill();c.fillStyle='rgba(251,246,234,.8)';[[120,80],[520,60]].forEach(([x,y])=>{circ(c,x,y,20);c.fill();circ(c,x+22,y-6,24);c.fill();circ(c,x+46,y,18);c.fill()})}
      c.fillStyle=pl.gr;c.fillRect(0,GY,GW,GH-GY);c.fillStyle=pl.gr2;c.fillRect(0,GY,GW,8);tess(c,0,GW,GY+16,10,[pl.gr2,pl.gr,K.sand]);
      /* saat kulesi */
      fillR(c,OX-178,OY-6,18,GY-OY+6,K.woodD,3);fillR(c,OX+160,OY-6,18,GY-OY+6,K.woodD,3);fillR(c,OX-196,OY-34,392,28,K.wood,5);fillR(c,OX-196,OY-12,392,6,K.woodD);
      tx(c,PLAN[P.pl].n.toLocaleUpperCase('tr')+' · g = '+trn(gv())+' m/s²',OX,OY-20,{s:13,c:K.cream});
      /* cetvel */
      fillR(c,OX+178,OY,26,2.5*PX,'rgba(251,246,234,.92)',3);
      for(let v=0;v<=25;v++){const y=OY+v/10*PX;c.fillStyle=K.ink;c.fillRect(OX+178,y,v%5?7:13,1.5);if(v%5===0&&v)tx(c,trn(v/10,1),OX+197,y,{s:10,w:700,a:'center'})}
      tx(c,'m',OX+191,OY+6,{s:10});
      const b=bob(),R=br();
      if(P.mode==='idle'){c.setLineDash([4,6]);c.strokeStyle='rgba(47,46,36,.35)';c.lineWidth=2;c.beginPath();c.arc(OX,OY,P.L*PX,Math.PI/2-AMP,Math.PI/2+AMP);c.stroke();c.setLineDash([])}
      c.strokeStyle=K.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(OX,OY);c.lineTo(b.x,b.y);c.stroke();
      c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(b.x,GY+4,R*.9,5,0,0,7);c.fill();
      circ(c,b.x,b.y,R);c.fillStyle=lgrad(c,b.x-R,b.y-R,b.x+R,b.y+R,[K.terraL,K.rust]);c.fill();c.lineWidth=2;c.strokeStyle=K.oliveD;c.stroke();
      circ(c,b.x-R*.35,b.y-R*.35,R*.25);c.fillStyle='rgba(255,255,255,.35)';c.fill();
      tx(c,P.m+' kg',b.x,b.y+1,{s:R>20?13:11,c:K.cream});
      if(P.mode!=='run'&&!P.drag){c.globalAlpha=.55+.35*Math.sin(t*4);tx(c,'↕ sürükle',b.x,b.y+R+16,{s:12,c:pl.night?K.cream:K.ink});c.globalAlpha=1}
      circ(c,OX,OY,7);c.fillStyle=K.ink;c.fill();circ(c,OX,OY,3);c.fillStyle=K.gold;c.fill();
      /* ritim paneli */
      const X=500,Y=104;fillR(c,X,Y,270,300,'rgba(251,246,234,.94)',10);c.strokeStyle=K.sand;c.lineWidth=2;rr(c,X,Y,270,300,10);c.stroke();
      tx(c,'RİTİM KARŞILAŞTIRMA',X+135,Y+24,{s:12,c:K.muted});
      const lamp=(x,y,on,col,lab)=>{const k=clamp(1-on/.32,0,1);if(k>0){c.fillStyle=col;c.globalAlpha=.25*k;circ(c,x,y,46);c.fill();c.globalAlpha=1}
        circ(c,x,y,30);c.fillStyle=k>0?col:'#D8C7A4';c.fill();c.lineWidth=4;c.strokeStyle=K.ink;c.stroke();tx(c,lab,x,y+50,{s:13})};
      lamp(X+72,Y+82,P.mode==='run'?P.t-P.beatT:9,K.ember,'HEDEF');lamp(X+198,Y+82,P.mode==='run'?P.t-P.tickT:9,K.oliveL,'SARKAÇ');
      tx(c,'Hedef süre',X+20,Y+176,{s:13,a:'left',c:K.muted});tx(c,trn(P.T)+' sn',X+250,Y+176,{f:FSL(26),a:'right'});
      tx(c,'Son ölçüm',X+20,Y+216,{s:13,a:'left',c:K.muted});tx(c,P.last?trn(P.last)+' sn':'—',X+250,Y+216,{f:FSL(26),a:'right',c:P.last?(Math.abs(P.last-P.T)/P.T<=.1?K.olive:K.garnet):K.muted});
      tx(c,P.mode==='run'?`Ölçülüyor… ${trn(P.t,1)} sn`:P.tries?`${P.tries}. deneme`:'Bırak\'a bas, ölçelim',X+135,Y+266,{s:13,c:K.muted,w:700});
    }
  };
}

/* ================= OYUN 2: DENGE USTASI (KALDIRAÇ) ================= */
function mkKaldirac(G){
  const CX=400,PY=360,SP=60,HL=5.4*SP,GY=466,MAXA=Math.asin((GY-PY-10)/HL);
  const B={pegs:{},tray:[],sel:-1,ang:0,av:0,st:'build',t:0,fails:0,help:true,hov:null,wedge:0,hitG:false};
  const COLS={1:'#D9822B',2:'#C4602F',3:'#7C8F5A',4:'#A3461F',5:'#4B5A3A',6:'#8E2B22',8:'#6F3420',10:'#2F3A28'};
  const sz=m=>30+m*4;
  function torque(){let l=0,r=0;const L=[],R=[];Object.keys(B.pegs).forEach(k=>{const d=+k;B.pegs[k].forEach(b=>{const v=b.m*Math.abs(d);if(d<0){l+=v;L.push(b.m+'×'+(-d))}else{r+=v;R.push(b.m+'×'+d)}})});return{l,r,L,R}}
  function dock(){const left=B.tray.filter(b=>!b.used).length;
    G.dock(`<div class="gtray" role="group" aria-label="Bloklar">${B.tray.map((b,i)=>`<button type="button" class="gblk" data-act="blk" data-v="${i}" aria-pressed="${B.sel===i}" ${b.used?'disabled':''} style="--bc:${COLS[b.m]||K.terra}"><b>${b.m}</b><small>kg</small></button>`).join('')}<span class="gtrayh">${left?'Bir blok seç, sonra tahtadaki bir deliğe dokun.':'Bütün bloklar tahtada. Yerleşimi değiştirmek için bloğa dokun.'}</span></div><div class="gacts"><button class="gact ghost" type="button" data-act="reset">${ic('reset',16)}<span>Sıfırla</span></button><button class="gact" type="button" data-act="go">${ic('play',18)}<span>Takozları çek</span></button></div>`)}
  const autoSel=()=>{B.sel=B.tray.findIndex(b=>!b.used)};
  function pegAt(p){if(B.st!=='build')return null;const d=Math.round((p.x-CX)/SP);if(!d||Math.abs(d)>5||Math.abs(p.x-CX-d*SP)>SP*.5)return null;if(p.y<PY-230||p.y>PY+34)return null;return d}
  function place(d){const pg=B.pegs[d]=B.pegs[d]||[];const top=pg[pg.length-1];
    if(top&&!top.fx){pg.pop();B.tray[top.ti].used=false;B.sel=top.ti;sfx.tap();dock();return}
    if(B.sel<0||B.tray[B.sel].used){G.tip('think','Önce aşağıdan bir blok seç.');return}
    if(pg.length>=4){G.tip('think','Bu delik dolu. Başka bir deliğe koy.');return}
    const b=B.tray[B.sel];b.used=true;pg.push({m:b.m,fx:false,ti:B.sel});sfx.thud();autoSel();dock()}
  function result(){const T=torque();return T.l===T.r?'Denge':T.l>T.r?'Sol ağır':'Sağ ağır'}
  return{
    start(i,L){B.pegs={};L.fixed.forEach(([d,m])=>{(B.pegs[d]=B.pegs[d]||[]).push({m,fx:true})});B.tray=L.tray.map(m=>({m,used:false}));B.sel=0;B.ang=0;B.av=0;B.st='build';B.fails=0;B.help=!!L.help;B.wedge=0;dock()},
    act(a,v){if(B.st!=='build')return;
      if(a==='blk'){B.sel=+v;sfx.tap();dock()}
      else if(a==='reset'){Object.keys(B.pegs).forEach(k=>{B.pegs[k]=B.pegs[k].filter(b=>b.fx)});B.tray.forEach(b=>b.used=false);B.sel=0;sfx.tap();dock()}
      else if(a==='go'){if(!B.tray.some(b=>b.used)){G.tip('think','Önce en az bir bloğu tahtaya koy.');return}B.st='fall';B.t=0;B.av=0;B.hitG=false;sfx.whoosh()}},
    frame(dt){B.wedge=lerp(B.wedge,B.st==='build'?0:1,Math.min(1,dt*10));
      if(B.st==='fall'){B.t+=dt;const T=torque(),tq=T.r-T.l;
        if(tq===0){B.ang*=1-dt*5;if(B.t>1.3){B.st='done';const r=torque();G.log({c:{'Sol':r.L.join(' + ')+' = '+r.l,'Sağ':r.R.join(' + ')+' = '+r.r,'Sonuç':'Denge'}});G.pop(CX,PY-200,'Dengede!',K.olive,30);G.win(B.fails===0?3:B.fails===1?2:1)}}
        else{const acc=Math.sign(tq)*Math.min(7,1.2+Math.abs(tq)*.22);B.av+=acc*dt;B.ang+=B.av*dt;
          if(Math.abs(B.ang)>=MAXA){B.ang=Math.sign(B.ang)*MAXA;if(!B.hitG){B.hitG=true;sfx.thud();G.shake(7);G.burst(CX+Math.sign(B.ang)*HL*Math.cos(MAXA),GY-4,[K.sand,K.stone],12,160)}B.av=-B.av*.3;if(Math.abs(B.av)<.08)B.av=0}
          if(B.t>1.5){B.st='back';B.t=0;B.fails++;const r=torque();G.log({c:{'Sol':r.L.join(' + ')+' = '+r.l,'Sağ':r.R.join(' + ')+' = '+r.r,'Sonuç':result()}});sfx.bad();
            G.tip('think',`${tq>0?'Sağ':'Sol'} taraf ağır geldi: sol ${r.l}, sağ ${r.r}. ${B.help?'Çubukları eşitle.':'Kütle × uzaklık değerlerini eşitle.'}`)}}}
      else if(B.st==='back'){B.ang*=1-Math.min(1,dt*5);if(Math.abs(B.ang)<.004){B.ang=0;B.st='build';B.av=0}}
    },
    down(p){const d=pegAt(p);if(d==null)return false;place(d);return false},
    hover(p){B.hov=pegAt(p);return B.hov!=null},
    draw(c,t){
      c.fillStyle=lgrad(c,0,0,0,GY,['#F7E8C6','#E9D2A4']);c.fillRect(0,0,GW,GH);
      c.fillStyle='rgba(251,246,234,.8)';[[90,70],[600,50]].forEach(([x,y])=>{x=(x+t*6)%900-60;circ(c,x,y,18);c.fill();circ(c,x+20,y-6,22);c.fill();circ(c,x+42,y,16);c.fill()});
      c.fillStyle='#B9C496';c.beginPath();c.moveTo(0,GY);c.quadraticCurveTo(200,GY-70,420,GY);c.quadraticCurveTo(620,GY-50,800,GY);c.fill();
      c.fillStyle=K.oliveL;c.fillRect(0,GY,GW,GH-GY);c.fillStyle=K.olive;c.fillRect(0,GY,GW,6);tess(c,0,GW,GY+14,10,[K.olive,K.oliveL,K.sand]);
      /* tork çubukları */
      if(B.help){const T=torque(),sc=Math.min(5,150/Math.max(T.l,T.r,1)),bx=CX,by=180;
        fillR(c,bx-150,by-160,300,176,'rgba(251,246,234,.85)',8);tx(c,'KÜTLE × UZAKLIK',bx,by-144,{s:11,c:K.muted});
        fillR(c,bx-90,by-T.l*sc,60,T.l*sc,K.terra,3);fillR(c,bx+30,by-T.r*sc,60,T.r*sc,K.olive,3);c.fillStyle=K.ink;c.fillRect(bx-130,by,260,2);
        tx(c,'Sol '+T.l,bx-60,by+14,{s:13});tx(c,'Sağ '+T.r,bx+60,by+14,{s:13});tx(c,T.l===T.r?'=':T.l>T.r?'>':'<',bx,by-30,{f:FSL(30),c:T.l===T.r?K.olive:K.garnet})}
      /* destek ve takozlar */
      c.fillStyle=K.stoneD;c.beginPath();c.moveTo(CX-46,GY);c.lineTo(CX,PY+8);c.lineTo(CX+46,GY);c.closePath();c.fill();c.fillStyle=K.stone;c.beginPath();c.moveTo(CX-30,GY);c.lineTo(CX,PY+22);c.lineTo(CX+10,GY);c.closePath();c.fill();
      [-1,1].forEach(s=>{const wx=CX+s*(HL-26)+s*B.wedge*70,wy=GY;c.globalAlpha=1-B.wedge*.6;c.fillStyle=K.wood;c.beginPath();c.moveTo(wx-24,wy);c.lineTo(wx+24,wy);c.lineTo(wx+s*0,PY+10);c.closePath();c.fill();c.strokeStyle=K.woodD;c.lineWidth=2;c.stroke();c.globalAlpha=1});
      /* tahta */
      c.save();c.translate(CX,PY);c.rotate(B.ang);
      fillR(c,-HL,-8,HL*2,18,K.wood,5);fillR(c,-HL,6,HL*2,4,K.woodD);
      for(let d=-5;d<=5;d++){if(!d)continue;const x=d*SP;circ(c,x,0,4.5);c.fillStyle=K.woodD;c.fill();
        if(B.hov===d&&B.st==='build'){c.strokeStyle=K.ember;c.lineWidth=3;rr(c,x-SP/2+4,-200,SP-8,226,8);c.stroke()}
        tx(c,String(Math.abs(d)),x,26,{s:13,c:K.ink})}
      tx(c,'0',0,26,{s:13,c:K.muted});
      Object.keys(B.pegs).forEach(k=>{let y=-8;B.pegs[k].forEach(b=>{const s=sz(b.m),x=+k*SP;
        if(b.fx){c.fillStyle=K.stoneD;c.beginPath();c.moveTo(x-s/2,y);c.lineTo(x-s/2+3,y-s*.8);c.lineTo(x-s*.1,y-s);c.lineTo(x+s/2-4,y-s*.85);c.lineTo(x+s/2,y);c.closePath();c.fill();c.fillStyle=K.stone;c.beginPath();c.moveTo(x-s/2+6,y-4);c.lineTo(x-s/2+8,y-s*.72);c.lineTo(x,y-s*.88);c.lineTo(x+s/2-10,y-s*.7);c.lineTo(x+4,y-4);c.closePath();c.fill()}
        else{fillR(c,x-s/2,y-s,s,s,COLS[b.m]||K.terra,4);c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=2;rr(c,x-s/2,y-s,s,s,4);c.stroke();fillR(c,x-s/2+3,y-s+3,s-6,4,'rgba(255,255,255,.25)',2)}
        tx(c,b.m+' kg',x,y-s/2,{s:s>40?14:11,c:K.cream});y-=s+2})});
      c.restore();
      if(B.st==='build'&&B.sel>=0&&!B.tray[B.sel].used){c.globalAlpha=.6+.3*Math.sin(t*5);tx(c,B.tray[B.sel].m+' kg seçili · bir deliğe dokun',CX,PY+66,{s:14,c:K.ink,st:'rgba(251,246,234,.9)'});c.globalAlpha=1}
    }
  };
}

/* ================= OYUN 3: IŞIKLARI YAK (DEVRE) ================= */
function gauss(A,b,n){for(let i=0;i<n;i++){let p=i;for(let r=i+1;r<n;r++)if(Math.abs(A[r][i])>Math.abs(A[p][i]))p=r;[A[i],A[p]]=[A[p],A[i]];[b[i],b[p]]=[b[p],b[i]];
    const d=A[i][i]||1e-12;for(let r=i+1;r<n;r++){const f=A[r][i]/d;if(!f)continue;for(let c=i;c<n;c++)A[r][c]-=f*A[i][c];b[r]-=f*b[i]}}
  const x=new Float64Array(n);for(let i=n-1;i>=0;i--){let s=b[i];for(let c=i+1;c<n;c++)s-=A[i][c]*x[c];x[i]=s/(A[i][i]||1e-12)}return x}
const RBAT=.05,LREF=1/(1.05*1.05);
function solveCircuit(E){
  const id={};let n=0;const nid=p=>{const k=p[0]+','+p[1];if(id[k]==null)id[k]=n++;return id[k]};E.forEach(e=>{e.ia=nid(e.a);e.ib=nid(e.b)});
  const A=Array.from({length:n},()=>new Float64Array(n)),I=new Float64Array(n),add=(a,b,g)=>{A[a][a]+=g;A[b][b]+=g;A[a][b]-=g;A[b][a]-=g};
  E.forEach(e=>{if(e.k==='B'){add(e.ia,e.ib,1/RBAT);I[e.ib]+=1/RBAT;I[e.ia]-=1/RBAT}else if(e.k==='L')add(e.ia,e.ib,1);else if(e.on)add(e.ia,e.ib,1000)});
  for(let i=0;i<n;i++)A[i][i]+=1e-9;
  const g0=E.find(e=>e.k==='B').ia;for(let j=0;j<n;j++)A[g0][j]=0;A[g0][g0]=1;I[g0]=0;
  const v=gauss(A,I,n);
  E.forEach(e=>{const dv=v[e.ia]-v[e.ib];e.I=e.k==='B'?(1-(v[e.ib]-v[e.ia]))/RBAT:e.k==='L'?dv:e.on?dv*1000:0;
    if(e.k==='L'){const b=e.I*e.I/LREF;e.br=b;e.st=b<.1?'off':b<.6?'dim':b<=2.2?'full':'over'}});
  return{short:E.some(e=>e.k==='B'&&Math.abs(e.I)>5),L:Object.fromEntries(E.filter(e=>e.k==='L').map(e=>[e.nm,e.st]))}}
const LSTN={off:'Sönük',dim:'Az ışık',full:'Tam parlak',over:'Çok parlak!'};
function mkDevre(G){
  const DX=142,DY=122;
  const D={E:[],moves:0,shorts:0,st:null,done:false,ox:0,oy:0,hov:null,wasShort:false};
  const P=q=>({x:D.ox+q[0]*DX,y:D.oy+q[1]*DY});
  function recompute(fromUser){D.st=solveCircuit(D.E);
    if(D.st.short&&!D.wasShort&&fromUser){D.shorts++;sfx.bad();G.shake(9);const b=D.E.find(e=>e.k==='B'&&Math.abs(e.I)>5),pa=P(b.a),pb=P(b.b);G.burst((pa.x+pb.x)/2,(pa.y+pb.y)/2,[K.ember,K.gold,'#FFF'],22,260);
      G.tip('sad','Kısa devre! Akım lambaya uğramadan doğrudan pile döndü. Pil ısınır, tehlikelidir. O kabloyu çıkar.');G.log({c:{'Bölüm':G.lv+1,'Hamle':D.moves,'Lambalar':'—','Sonuç':'Kısa devre'}})}
    D.wasShort=D.st.short;dock();
    if(!D.done&&!D.st.short&&G.L.ok(D.st)){D.done=true;const L=G.L;G.later(()=>{const base=D.moves<=L.opt?3:D.moves<=L.opt+2?2:1;
      G.log({c:{'Bölüm':G.lv+1,'Hamle':D.moves,'Lambalar':Object.entries(D.st.L).map(([n,s])=>n+': '+LSTN[s].toLocaleLowerCase('tr')).join(', '),'Sonuç':'Başarılı'}});G.win(Math.max(1,base-D.shorts))},900);sfx.ok()}
    else if(fromUser&&!D.st.short){const on=Object.values(D.st.L).filter(s=>s==='full').length;if(on)G.tip('think',`${on} lamba tam parlak yanıyor. ${G.L.ok(D.st)?'':'Hedefe bak, devam et!'}`)}}
  function dock(){const st=D.st;G.dock(`<div class="gchips" aria-live="polite">${Object.entries(st.L).map(([n,s])=>`<span class="gchip ${s}">${ic('bulb',16)} ${esc(n)}: <b>${LSTN[s]}</b></span>`).join('')}${st.short?`<span class="gchip bad">${ic('bolt',16)} Kısa devre!</span>`:''}</div><div class="gacts"><span class="gmv">Hamle: <b>${D.moves}</b></span><button class="gact ghost" type="button" data-act="reset">${ic('reset',16)}<span>Baştan kur</span></button></div>`)}
  function hit(p){let best=null,bd=36;D.E.forEach(e=>{if(e.k!=='?'&&e.k!=='S')return;const a=P(e.a),b=P(e.b),vx=b.x-a.x,vy=b.y-a.y,L2=vx*vx+vy*vy,u=clamp(((p.x-a.x)*vx+(p.y-a.y)*vy)/L2,0,1),d=Math.hypot(a.x+u*vx-p.x,a.y+u*vy-p.y);if(d<bd){bd=d;best=e}});return best}
  function build(L){D.E=L.edges.map(e=>({a:[e[0],e[1]],b:[e[2],e[3]],k:e[4],on:e[4]==='?'||e[4]==='S'?!!e[5]:true,nm:e[4]==='L'?e[5]:e[4]==='S'?e[6]:'',ph:0,I:0}));
    const cs=D.E.flatMap(e=>[e.a[0],e.b[0]]),rs=D.E.flatMap(e=>[e.a[1],e.b[1]]);D.ox=GW/2-(Math.min(...cs)+Math.max(...cs))/2*DX;D.oy=GH/2+8-(Math.min(...rs)+Math.max(...rs))/2*DY}
  function comp(c,e,t){const a=P(e.a),b=P(e.b),mx=(a.x+b.x)/2,my=(a.y+b.y)/2,ang=Math.atan2(b.y-a.y,b.x-a.x),len=Math.hypot(b.x-a.x,b.y-a.y);
    c.save();c.translate(mx,my);c.rotate(ang);
    const wire=(x0,x1)=>{c.strokeStyle='#1A2016';c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(x0,0);c.lineTo(x1,0);c.stroke();c.strokeStyle=K.copper;c.lineWidth=5;c.stroke()};
    if(e.k==='w')wire(-len/2,len/2);
    else if(e.k==='?'){if(e.on){wire(-len/2,len/2);circ(c,0,0,9);c.fillStyle=K.copper;c.fill();c.strokeStyle='#1A2016';c.lineWidth=3;c.stroke()}
      else{c.setLineDash([8,8]);c.strokeStyle='rgba(244,234,214,.55)';c.lineWidth=3;c.beginPath();c.moveTo(-len/2,0);c.lineTo(len/2,0);c.stroke();c.setLineDash([]);
        const pul=1+.08*Math.sin(t*5);circ(c,0,0,14*pul);c.fillStyle=D.hov===e?K.ember:'rgba(217,130,43,.85)';c.fill();c.fillStyle='#1A2016';c.fillRect(-7,-1.5,14,3);c.fillRect(-1.5,-7,3,14)}}
    else if(e.k==='L'){wire(-len/2,-20);wire(20,len/2);const br=clamp(e.br||0,0,2.4);
      if(br>.1){const g=c.createRadialGradient(0,0,4,0,0,70*Math.min(1.4,br));g.addColorStop(0,`rgba(255,226,140,${.75*Math.min(1,br)})`);g.addColorStop(1,'rgba(255,226,140,0)');c.fillStyle=g;circ(c,0,0,70*Math.min(1.4,br));c.fill()}
      circ(c,0,0,22);c.fillStyle=br>.1?`rgba(255,${200+Math.min(55,br*40)|0},120,${.55+Math.min(.4,br*.3)})`:'rgba(244,234,214,.25)';c.fill();c.lineWidth=3;c.strokeStyle=br>2.2?K.garnet:'#F4EAD6';c.stroke();
      c.strokeStyle=br>.1?'#FFF6D8':'#8C979C';c.lineWidth=2;c.beginPath();c.moveTo(-20,0);for(let i=0;i<=6;i++)c.lineTo(-12+i*4,i%2?-6:6);c.lineTo(20,0);c.stroke()}
    else if(e.k==='B'){wire(-len/2,-30);wire(30,len/2);const hot=Math.abs(e.I)>5;fillR(c,-30,-17,60,34,hot?(Math.sin(t*20)>0?'#E8776A':K.garnet):K.terra,5);fillR(c,30,-8,6,16,K.gold,2);
      c.fillStyle='rgba(255,255,255,.2)';c.fillRect(-26,-13,52,6);c.save();c.rotate(-ang);tx(c,'+',Math.cos(ang)*18,Math.sin(ang)*18,{s:18,c:K.cream});tx(c,'−',-Math.cos(ang)*18,-Math.sin(ang)*18,{s:18,c:K.cream});c.restore()}
    else if(e.k==='S'){wire(-len/2,-22);wire(22,len/2);circ(c,-22,0,6);c.fillStyle=K.cream;c.fill();circ(c,22,0,6);c.fill();
      c.save();c.translate(-22,0);c.rotate(e.on?0:-.55);c.strokeStyle=D.hov===e?K.ember:K.cream;c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(44,0);c.stroke();c.restore()}
    c.restore();
    /* akım noktaları */
    const I=e.k==='B'?e.I:(e.k==='L'||e.on?e.I:0);if(Math.abs(I)>.03&&!(e.k==='?'&&!e.on)){
      const sp=t*Math.sign(I)*Math.min(110,40+Math.abs(I)*60),n=Math.max(1,Math.floor(len/30));c.fillStyle='#FFF3C4';
      for(let i=0;i<n;i++){let u=((i/n+sp/len)%1+1)%1;circ(c,a.x+(b.x-a.x)*u,a.y+(b.y-a.y)*u,3.2);c.fill()}}
    if(e.nm){const nx=-Math.sin(ang),ny=Math.cos(ang),off=e.k==='L'?40:30;tx(c,e.nm,mx+nx*off,my+ny*off,{s:13,c:K.cream,st:K.board,sw:4})}}
  return{
    start(i,L){build(L);D.moves=0;D.shorts=0;D.done=false;D.wasShort=false;recompute(false)},
    act(a){if(a==='reset'&&!D.done){build(G.L);D.moves=0;D.wasShort=false;sfx.tap();recompute(false);G.tip('think','Devre baştaki hâline döndü.')}},
    down(p){if(D.done)return false;const e=hit(p);if(!e)return false;e.on=!e.on;D.moves++;sfx.tap();recompute(true);return false},
    hover(p){D.hov=hit(p);return !!D.hov&&!D.done},
    draw(c,t){c.fillStyle='#232A1E';c.fillRect(0,0,GW,GH);fillR(c,14,14,GW-28,GH-28,K.board,14);
      c.fillStyle='rgba(244,234,214,.07)';for(let x=40;x<GW-20;x+=24)for(let y=40;y<GH-20;y+=24)c.fillRect(x,y,2,2);
      tx(c,G.L.label||'DEVRE TAHTASI',30,40,{s:12,a:'left',c:'rgba(244,234,214,.55)'});
      D.E.forEach(e=>{if(e.k==='w'||(e.k==='?'))comp(c,e,t)});D.E.forEach(e=>{if(e.k!=='w'&&e.k!=='?')comp(c,e,t)});
      const seen={};D.E.forEach(e=>[e.a,e.b].forEach(q=>{const k=q+'';if(seen[k])return;seen[k]=1;const p=P(q);circ(c,p.x,p.y,6);c.fillStyle='#1A2016';c.fill();circ(c,p.x,p.y,3.5);c.fillStyle=K.copper;c.fill()}));
      if(D.st&&D.st.short){c.fillStyle=`rgba(232,119,106,${.12+.08*Math.sin(t*12)})`;c.fillRect(0,0,GW,GH)}}
  };
}

/* ================= OYUN 4: PİZZA DÜKKANI (KESİR) ================= */
function mkKesir(G){
  const PC={x:250,y:290,r:160},CU={x:615,y:330};
  SEED=7;const TOP=Array.from({length:26},()=>({a:srnd()*Math.PI*2,d:.18+Math.sqrt(srnd())*.66,k:srnd()<.62?'p':'o'}));
  const F={n:4,sel:new Set(),oi:0,mist:0,mood:0,fly:0,flying:null,cust:0,coins:0,wait:false};
  const CUST=[['#A3461F','#F2C9A0'],['#4B5A3A','#D9A877'],['#8E2B22','#F0D2B0'],['#6F3420','#C98E5F']];
  const fr=(a,b)=>a+'/'+b;
  const val=o=>o.t==='sum'?(()=>{const[[a,b],[c,d]]=o.f;return[a*d+c*b,b*d]})():o.f;
  const label=o=>o.t==='eq'?fr(...o.f):o.t==='sum'?fr(...o.f[0])+' + '+fr(...o.f[1]):`${fr(...o.lo)} ile ${o.hi[0]===o.hi[1]?'bütün pizza':fr(...o.hi)} arasında`;
  const okFn=(k,n,o)=>{if(o.t==='rng')return k*o.lo[1]>o.lo[0]*n&&k*o.hi[1]<o.hi[0]*n;const[a,b]=val(o);return k*b===a*n};
  const simp=(k,n)=>{const g=gcd(k,n);return g>1?` (= ${k/g}/${n/g})`:''};
  const cur=()=>G.L.orders[F.oi];
  G.ctl('n',{get:()=>F.n,set:v=>{if(F.flying)return;F.n=+v;F.sel.clear();sfx.whoosh();upd()}});
  function upd(){const o=$('#kSel');if(o)o.textContent=F.sel.size+'/'+F.n}
  function dock(){const L=G.L;G.dock(`<div class="gctl">${L.cuts&&L.cuts.length>1?G.seg('n','Pizzayı kaç dilime keselim?',L.cuts.map(v=>[v,v])):`<div class="gread"><span>Pizza</span><b>${F.n} dilim</b></div>`}<div class="gread"><span>Seçtiğin</span><b id="kSel">${F.sel.size}/${F.n}</b></div></div><div class="gacts"><button class="gact ghost" type="button" data-act="clear">${ic('x',16)}<span>Temizle</span></button><button class="gact" type="button" data-act="go">${ic('send',16)}<span>Servis et</span></button></div>`)}
  function newOrder(){const o=cur(),L=G.L;F.sel.clear();F.mood=0;F.n=L.cuts?(L.cuts.length===1?L.cuts[0]:L.cuts.includes(F.n)?F.n:L.cuts[0]):val(o)[1];dock()}
  return{
    start(i,L){F.oi=0;F.mist=0;F.cust=0;F.coins=0;F.flying=null;F.wait=false;F.n=L.cuts?L.cuts[0]:4;newOrder()},
    act(a){if(F.flying||F.wait)return;
      if(a==='clear'){F.sel.clear();upd();sfx.tap()}
      if(a==='go'){const k=F.sel.size,n=F.n,o=cur();if(!k){G.tip('think','Önce dilimlere dokunarak seç.');return}
        const ok=okFn(k,n,o);
        G.log({c:{'Sipariş':label(o),'Verilen':k+'/'+n,'Sonuç':ok?'Doğru':'Yanlış'}});
        if(ok){F.flying={idx:[...F.sel],n,t:0};F.mood=1;F.coins++;sfx.coin();G.pop(CU.x,CU.y-170,'Teşekkürler!',K.olive,24);G.tip('cheer',`Doğru! ${k}/${n}${simp(k,n)} tam istenen kadar.`);
          G.later(()=>{F.flying=null;F.oi++;if(F.oi>=G.L.orders.length){G.win(F.mist===0?3:F.mist===1?2:1)}else{F.cust++;newOrder()}},1100)}
        else{F.mist++;F.mood=-1;sfx.bad();G.shake(5);const[a2,b2]=o.t==='rng'?[0,1]:val(o);
          G.tip('think',o.t==='rng'?`${k}/${n} istenen aralıkta değil. Müşteri ${label(o)} istiyor.`:`${k}/${n}${simp(k,n)} verdin. Müşteri ${label(o)} istiyor. ${k*b2<a2*n?'Az geldi!':'Fazla geldi!'}`);
          F.wait=true;G.later(()=>{F.mood=0;F.wait=false},900)}}},
    frame(dt){if(F.flying)F.flying.t=Math.min(1,F.flying.t+dt*1.6)},
    down(p){if(F.flying)return false;const dx=p.x-PC.x,dy=p.y-PC.y;if(Math.hypot(dx,dy)>PC.r+20)return false;
      const a=(Math.atan2(dy,dx)+Math.PI/2+Math.PI*4)%(Math.PI*2),i=Math.floor(a/(Math.PI*2/F.n));F.sel.has(i)?F.sel.delete(i):F.sel.add(i);sfx.tap();upd();return false},
    hover(p){return Math.hypot(p.x-PC.x,p.y-PC.y)<PC.r+20&&!F.flying},
    draw(c,t){
      c.fillStyle=lgrad(c,0,0,0,GH,['#F3DFC0','#E7C9A0']);c.fillRect(0,0,GW,GH);
      for(let x=0;x<GW;x+=40){c.fillStyle=(x/40)%2?'rgba(163,70,31,.08)':'rgba(255,255,255,.12)';c.fillRect(x,0,40,150)}
      fillR(c,0,148,GW,10,K.terra);tx(c,'#BİLİMKIVILCIMI PİZZA',140,40,{f:FSL(20),c:K.rust});
      tx(c,`Sipariş ${Math.min(F.oi+1,G.L.orders.length)}/${G.L.orders.length}`,140,70,{s:14,c:K.muted});
      for(let i=0;i<F.coins;i++){circ(c,40+i*26,104,10);c.fillStyle=K.gold;c.fill();c.strokeStyle=K.woodD;c.lineWidth=2;c.stroke()}
      c.fillStyle=K.woodD;c.fillRect(0,455,GW,65);c.fillStyle=K.wood;c.fillRect(0,447,GW,12);
      /* müşteri */
      const [body,skin]=CUST[F.cust%CUST.length],bob=Math.sin(t*2)*3,cx=CU.x,cy=CU.y+bob;
      fillR(c,cx-62,cy-10,124,130,body,30);circ(c,cx,cy-58,48);c.fillStyle=skin;c.fill();
      fillR(c,cx-50,cy-112,100,22,K.ink,8);fillR(c,cx-34,cy-136,68,32,K.ink,8);
      circ(c,cx-16,cy-62,5);c.fillStyle=K.ink;c.fill();circ(c,cx+16,cy-62,5);c.fill();
      c.strokeStyle=K.ink;c.lineWidth=4;c.lineCap='round';c.beginPath();if(F.mood>0)c.arc(cx,cy-44,14,.15*Math.PI,.85*Math.PI);else if(F.mood<0)c.arc(cx,cy-30,12,1.2*Math.PI,1.8*Math.PI);else{c.moveTo(cx-10,cy-38);c.lineTo(cx+10,cy-38)}c.stroke();
      if(F.mood>0){circ(c,cx-30,cy-46,7);c.fillStyle='rgba(217,130,43,.4)';c.fill();circ(c,cx+30,cy-46,7);c.fill()}
      fillR(c,cx-70,cy+70,140,14,K.cream,7);
      /* konuşma balonu */
      const o=cur();if(o){const bx=cx-118,by=172;fillR(c,bx,by-112,236,104,K.cream,14);c.strokeStyle=K.ink;c.lineWidth=3;rr(c,bx,by-112,236,104,14);c.stroke();
        c.fillStyle=K.cream;c.beginPath();c.moveTo(cx-14,by-10);c.lineTo(cx+4,by+14);c.lineTo(cx+16,by-10);c.fill();c.beginPath();c.moveTo(cx-14,by-9);c.lineTo(cx+4,by+14);c.lineTo(cx+16,by-9);c.stroke();
        if(o.t==='eq'){tx(c,'Bana',bx+52,by-60,{s:16,c:K.muted});tx(c,String(o.f[0]),cx+16,by-80,{f:FSL(34)});c.fillStyle=K.ink;c.fillRect(cx-4,by-62,40,4);tx(c,String(o.f[1]),cx+16,by-36,{f:FSL(34)});tx(c,'pizza',cx+82,by-60,{s:16,c:K.muted})}
        else wrapTx(c,(o.t==='sum'?'Bana '+label(o)+' kadar pizza!':'Bana '+label(o)+' bir pizza!'),cx,by-60,200,22,{s:17})}
      /* pizza */
      c.fillStyle='rgba(0,0,0,.15)';c.beginPath();c.ellipse(PC.x,PC.y+PC.r+6,PC.r*1.02,18,0,0,7);c.fill();
      circ(c,PC.x,PC.y,PC.r+16);c.fillStyle=K.wood;c.fill();circ(c,PC.x,PC.y,PC.r+16);c.strokeStyle=K.woodD;c.lineWidth=3;c.stroke();
      const n=F.flying?F.flying.n:F.n,step=Math.PI*2/n;
      for(let i=0;i<n;i++){const flying=F.flying&&F.flying.idx.includes(i),sel=F.sel.has(i)||flying,a0=-Math.PI/2+i*step,am=a0+step/2;
        let ox=sel?Math.cos(am)*14:0,oy=sel?Math.sin(am)*14:0,s=1;
        if(flying){const k=F.flying.t,e=k*k*(3-2*k);ox=lerp(ox,CU.x-PC.x-Math.cos(am)*PC.r*.25,e);oy=lerp(oy,CU.y+76-PC.y-Math.sin(am)*PC.r*.25,e);s=lerp(1,.32,e)}
        c.save();c.translate(PC.x+ox,PC.y+oy);c.scale(s,s);c.beginPath();c.moveTo(0,0);c.arc(0,0,PC.r,a0,a0+step);c.closePath();c.save();c.clip();
        circ(c,0,0,PC.r);c.fillStyle='#E9A84F';c.fill();circ(c,0,0,PC.r-14);c.fillStyle='#C2502A';c.fill();circ(c,0,0,PC.r-20);c.fillStyle='#F4D58A';c.fill();
        TOP.forEach(q=>{const x=Math.cos(q.a)*q.d*PC.r,y=Math.sin(q.a)*q.d*PC.r;if(q.k==='p'){circ(c,x,y,12);c.fillStyle='#A3341F';c.fill();circ(c,x-3,y-3,3);c.fillStyle='rgba(255,255,255,.25)';c.fill()}else{circ(c,x,y,6);c.fillStyle=K.oliveD;c.fill();circ(c,x,y,2.5);c.fillStyle='#F4D58A';c.fill()}});
        c.restore();c.strokeStyle=sel?K.ember:'rgba(111,52,32,.55)';c.lineWidth=sel?5:2;c.stroke();c.restore()}
      if(!F.sel.size&&!F.flying){c.globalAlpha=.6+.3*Math.sin(t*4);tx(c,'Dilimlere dokun',PC.x,PC.y+PC.r+34,{s:14,c:K.cream});c.globalAlpha=1}
    }
  };
}

/* ================= OYUN 5: KALE KUŞATMASI (MANCINIK) ================= */
function mkAtis(G){
  const SC=11.4,OX=60,GY=462,H0=2,GR=9.81,wx=x=>OX+x*SC,wy=y=>GY-y*SC;
  const A={ang:45,v:15,st:'aim',s:null,tr:[],used:0,T:[],W:[],aim:null,stones:3,help:false,land:[]};
  G.ctl('ang',{get:()=>A.ang,set:v=>{A.ang=clamp(Math.round(v),5,85)},min:5,max:85,step:1,fmt:v=>v+'°'});
  G.ctl('v',{get:()=>A.v,set:v=>{A.v=clamp(Math.round(v*2)/2,8,25)},min:8,max:25,step:.5,fmt:v=>trn(v,1)+' m/s'});
  const rangeAt=(deg,v)=>{const a=deg*Math.PI/180,vx=v*Math.cos(a),vy=v*Math.sin(a);return vx/GR*(vy+Math.sqrt(vy*vy+2*GR*H0))};
  const inR=(x,y,r)=>x>=r.x0&&x<=r.x1&&y>=r.y0&&y<=r.y1;
  function fire(){if(A.st!=='aim'||A.used>=A.stones)return;const a=A.ang*Math.PI/180;A.s={x:.4,y:H0,vx:A.v*Math.cos(a),vy:A.v*Math.sin(a),tr:[[.4,H0]],k:0};A.st='fly';sfx.whoosh();dockBtn()}
  function dockBtn(){const b=$('#gDock [data-act="go"]');if(b)b.disabled=A.st!=='aim';const s=$('#aSt');if(s)s.textContent=(A.stones-A.used)+' taş'}
  function endShot(kind,x){A.st='wait';A.used++;const sh={tr:A.s.tr,kind,x};A.tr.push(sh);if(A.tr.length>3)A.tr.shift();A.s=null;
    const hitAll=A.T.every(q=>q.hit),flat=kind==='ground'&&!A.W.some(w=>x>=w.x0-.3&&x<=w.x1+.3);
    G.log({c:{'Açı':A.ang+'°','Hız':trn(A.v,1)+' m/s','Menzil':kind==='ground'?trn(x,1)+' m':'—','Sonuç':kind==='hit'?'İsabet':kind==='wall'?'Sura çarptı':kind==='out'?'Çok uzak':'Iska'},x:A.ang,y:flat?x:null});
    G.later(()=>{dockBtn();
      if(hitAll){const n=A.T.length,u=A.used;G.win(u<=n?3:u===n+1?2:1);return}
      if(A.used>=A.stones){G.fail('Taşların bitti ama kule hâlâ ayakta. Açıyı ve hızı küçük adımlarla değiştirerek yeniden dene.');return}
      A.st='aim';dockBtn();const q=A.T.find(q=>!q.hit);
      if(kind==='wall')G.tip('think','Taş sura çarptı! Açıyı büyüt, taş daha yükseğe çıksın.');
      else if(kind==='out')G.tip('think','Taş hedefin çok ötesine uçtu. Hızı azalt.');
      else if(kind==='hit')G.tip('cheer','İsabet! Sıradaki kuleye nişan al.');
      else{const d=x-q.x;G.tip('think',d<0?`Kısa kaldı: taş ${trn(x,1)} m'ye düştü, kule ${q.x} m'de. Hızı artır ya da açıyı 45°'ye yaklaştır.`:`Kuleyi geçti: taş ${trn(x,1)} m'ye düştü, kule ${q.x} m'de. Hızı azalt.`)}},700)}
  return{
    start(i,L){A.T=L.targets.map(q=>({x:q.x,y0:q.y||0,hit:false,r:{x0:q.x-1,x1:q.x+1,y0:q.y||0,y1:(q.y||0)+4},fall:0}));A.W=L.walls.map(w=>({x0:w.x,x1:w.x+w.w,y0:0,y1:w.h,hill:!!w.hill}));
      A.stones=L.stones||3;A.used=0;A.tr=[];A.s=null;A.st='aim';A.help=!!L.help;A.ang=L.ang0||30;A.v=L.v0||12;
      G.dock(`<div class="gctl">${G.range('ang','Atış açısı')}${G.range('v','Atış hızı')}</div><div class="gacts"><span class="gmv" id="aSt">${A.stones} taş</span><button class="gact" type="button" data-act="go">${ic('target',18)}<span>Fırlat!</span></button></div>`);dockBtn()},
    act(a){if(a==='go')fire()},
    frame(dt){if(A.st!=='fly'||!A.s)return;const s=A.s,n=8,h=dt/n;
      for(let k=0;k<n;k++){s.vy-=GR*h;s.x+=s.vx*h;s.y+=s.vy*h;s.k+=h;if(s.k>.04){s.k=0;s.tr.push([s.x,s.y])}
        const q=A.T.find(q=>!q.hit&&inR(s.x,s.y,q.r));if(q){q.hit=true;sfx.thud();G.shake(10);G.burst(wx(q.x),wy(q.y0+2),[K.wood,K.woodD,K.terra,K.gold],26,280);G.pop(wx(q.x),wy(q.y0+5),'İsabet!',K.olive,28);s.tr.push([s.x,s.y]);endShot('hit',s.x);return}
        if(A.W.some(w=>inR(s.x,s.y,w))){sfx.thud();G.burst(wx(s.x),wy(s.y),[K.stone,K.stoneD],12,160);s.tr.push([s.x,s.y]);endShot('wall',s.x);return}
        if(s.y<=0){s.y=0;s.tr.push([s.x,0]);sfx.thud();G.burst(wx(s.x),GY,[K.sand,K.oliveL],10,140);endShot('ground',s.x);return}
        if(s.x>64){endShot('out',s.x);return}}},
    down(p){if(A.st!=='aim')return false;if(Math.hypot(p.x-wx(0),p.y-wy(2))>130)return false;A.aim={x0:p.x,y0:p.y,x:p.x,y:p.y};return true},
    move(p){if(!A.aim)return;A.aim.x=p.x;A.aim.y=p.y;const dx=p.x-A.aim.x0,dy=p.y-A.aim.y0,len=Math.hypot(dx,dy);if(len<14)return;
      GM.ctl.ang.set(Math.atan2(dy,-dx)*180/Math.PI);GM.ctl.v.set(8+Math.min(1,len/210)*17);G.sync('ang');G.sync('v')},
    up(p){const a=A.aim;A.aim=null;if(a&&Math.hypot(a.x-a.x0,a.y-a.y0)>26)fire()},
    hover(p){return A.st==='aim'&&Math.hypot(p.x-wx(0),p.y-wy(2))<130},
    curve:x=>rangeAt(x,A.v),
    draw(c,t){
      c.fillStyle=lgrad(c,0,0,0,GY,['#F2DDB6','#E9C994']);c.fillRect(0,0,GW,GH);circ(c,690,80,34);c.fillStyle='#F2C46A';c.fill();
      c.fillStyle='#C9B98B';c.beginPath();c.moveTo(0,GY);[[80,330],[200,370],[330,300],[470,360],[600,310],[720,350],[800,330]].forEach(([x,y])=>c.lineTo(x,y));c.lineTo(GW,GY);c.fill();
      c.fillStyle='#B3A275';for(let x=420;x<640;x+=26){c.fillRect(x,346-((x/26)%2)*6,20,30)}
      c.fillStyle=K.oliveL;c.fillRect(0,GY,GW,GH-GY);c.fillStyle=K.olive;c.fillRect(0,GY,GW,5);tess(c,0,GW,GY+12,9,[K.olive,K.oliveL,K.sand]);
      for(let m=10;m<=60;m+=10){c.fillStyle=K.cream;c.fillRect(wx(m)-1,GY+28,2,10);tx(c,m+' m',wx(m),GY+48,{s:11,c:K.cream})}
      /* surlar ve tepeler */
      A.W.forEach(w=>{const x=wx(w.x0),y=wy(w.y1),ww=(w.x1-w.x0)*SC,hh=w.y1*SC;
        if(w.hill){c.fillStyle='#8C7650';c.beginPath();c.moveTo(x-30,GY);c.quadraticCurveTo(x-6,y-4,x+8,y);c.lineTo(x+ww-8,y);c.quadraticCurveTo(x+ww+6,y-4,x+ww+30,GY);c.fill();fillR(c,x,y-6,ww,10,K.oliveL,4)}
        else{fillR(c,x,y,ww,hh,K.stone,2);c.fillStyle=K.stoneD;for(let yy=y+10;yy<GY;yy+=14){const off=((yy-y)/14)%2?ww/2:0;for(let xx=x+off;xx<x+ww;xx+=ww/2)c.fillRect(xx,yy,1.5,14);c.fillRect(x,yy,ww,1.5)}
          for(let xx=x;xx<x+ww;xx+=ww/2)fillR(c,xx,y-8,ww/2-3,10,K.stone,1)}});
      /* kuleler */
      A.T.forEach(q=>{const x=wx(q.x),y=wy(q.y0);if(q.hit){q.fall=Math.min(1,q.fall+.03);c.globalAlpha=1-q.fall*.6;fillR(c,x-SC,y-8,SC*2,8,K.woodD,2);c.globalAlpha=1;tx(c,'✓',x,y-26,{f:FSL(28),c:K.olive,st:K.cream});return}
        fillR(c,x-SC,y-4*SC,SC*2,4*SC,K.wood,3);c.fillStyle=K.woodD;for(let k=1;k<4;k++)c.fillRect(x-SC,y-k*SC,SC*2,2);
        circ(c,x,y-2*SC,9);c.fillStyle=K.cream;c.fill();circ(c,x,y-2*SC,5);c.fillStyle=K.garnet;c.fill();
        c.fillStyle=K.ink;c.fillRect(x-1,y-4*SC-30,2,30);c.fillStyle=K.terra;c.beginPath();c.moveTo(x+1,y-4*SC-30);c.lineTo(x+22+Math.sin(t*4)*3,y-4*SC-24);c.lineTo(x+1,y-4*SC-18);c.fill();
        tx(c,q.x+' m',x,y+(q.y0?-4*SC-44:16),{s:12,c:q.y0?K.ink:K.cream,st:q.y0?'rgba(251,246,234,.8)':null})});
      /* eski izler */
      A.tr.forEach((s,i)=>{c.fillStyle=`rgba(47,46,36,${.18+i*.12})`;s.tr.forEach(([x,y],j)=>{if(j%2)return;circ(c,wx(x),wy(y),2.2);c.fill()});
        if(s.kind==='ground'){const x=wx(s.x);c.fillStyle=K.garnet;c.fillRect(x-1,GY-14,2,14);tx(c,trn(s.x,1)+' m',x,GY-22,{s:11,c:K.ink,st:'rgba(251,246,234,.85)',sw:3})}});
      /* önizleme */
      if(A.help&&A.st==='aim'){const a=A.ang*Math.PI/180,vx=A.v*Math.cos(a),vy=A.v*Math.sin(a),tt=(vy+Math.sqrt(vy*vy+2*GR*H0))/GR*.33;c.fillStyle='rgba(163,70,31,.55)';for(let k=1;k<=12;k++){const tk=tt*k/12;circ(c,wx(.4+vx*tk),wy(H0+vy*tk-GR*tk*tk/2),2.6);c.fill()}}
      /* mancınık */
      const px=wx(-.4),py=wy(1.1);fillR(c,wx(-2.2),GY-26,wx(1.4)-wx(-2.2),12,K.woodD,3);[-1.6,.8].forEach(xx=>{circ(c,wx(xx),GY-10,10);c.fillStyle=K.ink;c.fill();circ(c,wx(xx),GY-10,4);c.fillStyle=K.stone;c.fill()});
      c.strokeStyle=K.woodD;c.lineWidth=7;c.beginPath();c.moveTo(wx(-1.6),GY-26);c.lineTo(px,py);c.lineTo(wx(.8),GY-26);c.stroke();
      const aa=A.st==='aim'?A.ang*Math.PI/180:-.2;c.save();c.translate(px,py);c.rotate(-aa+Math.PI);c.strokeStyle=K.wood;c.lineWidth=8;c.beginPath();c.moveTo(-30,0);c.lineTo(10,0);c.stroke();c.restore();
      const cupX=px+Math.cos(aa)*30,cupY=py-Math.sin(aa)*30;circ(c,cupX,cupY,9);c.fillStyle=K.woodD;c.fill();
      if(A.st==='aim'){circ(c,cupX,cupY-3,7);c.fillStyle=K.stoneD;c.fill();
        const L=40+(A.v-8)*5,a=A.ang*Math.PI/180,ex=wx(.4)+Math.cos(a)*L,ey=wy(H0)-Math.sin(a)*L;c.strokeStyle=K.terra;c.lineWidth=4;c.setLineDash([8,6]);c.beginPath();c.moveTo(wx(.4),wy(H0));c.lineTo(ex,ey);c.stroke();c.setLineDash([]);
        c.save();c.translate(ex,ey);c.rotate(-a);c.fillStyle=K.terra;c.beginPath();c.moveTo(10,0);c.lineTo(-6,-7);c.lineTo(-6,7);c.fill();c.restore();
        tx(c,`${A.ang}° · ${trn(A.v,1)} m/s`,wx(3.2),wy(H0)-Math.sin(a)*L-22,{s:14,a:'left',st:'rgba(251,246,234,.9)'});
        if(!A.aim&&A.used===0){c.globalAlpha=.55+.35*Math.sin(t*4);tx(c,'← geri çek, bırak',wx(2),GY-62,{s:13,a:'left',st:'rgba(251,246,234,.8)'});c.globalAlpha=1}}
      if(A.aim){c.strokeStyle='rgba(47,46,36,.5)';c.lineWidth=2;c.beginPath();c.moveTo(A.aim.x0,A.aim.y0);c.lineTo(A.aim.x,A.aim.y);c.stroke();circ(c,A.aim.x,A.aim.y,8);c.fillStyle='rgba(47,46,36,.3)';c.fill()}
      if(A.s){c.fillStyle='rgba(47,46,36,.5)';A.s.tr.forEach(([x,y],j)=>{if(j%2)return;circ(c,wx(x),wy(y),2.2);c.fill()});const sx=wx(A.s.x),sy=wy(A.s.y);c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(sx,GY+2,8,3,0,0,7);c.fill();circ(c,sx,sy,8);c.fillStyle=K.stoneD;c.fill();circ(c,sx-2,sy-2,3);c.fillStyle='rgba(255,255,255,.35)';c.fill()}
      for(let i=0;i<A.stones;i++){circ(c,24+i*22,24,8);c.fillStyle=i<A.stones-A.used?K.stoneD:'rgba(47,46,36,.15)';c.fill()}
    }
  };
}

/* ================= OYUN 6: YÜZER Mİ, BATAR MI? (YOĞUNLUK) ================= */
const OBJ={mantar:{n:'Mantar tıpa',r:.24,c:'#C9A26B',k:'cyl'},tahta:{n:'Tahta blok',r:.6,c:'#A8743F',k:'box'},elma:{n:'Elma',r:.85,c:'#B7372A',k:'apple'},buz:{n:'Buz küpü',r:.92,c:'#CFE8EF',k:'ice'},
  yumurta:{n:'Yumurta',r:1.03,c:'#F1E3C8',k:'egg'},patates:{n:'Patates',r:1.08,c:'#B9925A',k:'pot'},uzum:{n:'Üzüm',r:1.1,c:'#6B3A6E',k:'grape'},silgi:{n:'Silgi',r:1.3,c:'#E59AA0',k:'box'},
  tas:{n:'Taş',r:2.6,c:'#8C8578',k:'rock'},vida:{n:'Demir vida',r:7.8,c:'#7E878C',k:'bolt'},para:{n:'Bozuk para',r:8.9,c:'#C9A227',k:'coin'}};
const LIQ={tatli:{n:'Tatlı su',r:1,col:'#5B9DB5'},tuzlu:{n:'Çok tuzlu su',r:1.2,col:'#7FB9C4'},zeytin:{n:'Zeytinyağı',r:.91,col:'#C9A227'},bal:{n:'Bal',r:1.42,col:'#D98E1F'}};
function drawObj(c,o,x,y,h){const w=h*.9;c.save();c.translate(x,y);
  if(o.k==='box'){fillR(c,-w/2,-h/2,w,h,o.c,5);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(-w/2,h/2-8,w,8);if(o===OBJ.tahta){c.strokeStyle='rgba(115,73,31,.6)';c.lineWidth=2;for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(-w/2+4,i*12);c.quadraticCurveTo(0,i*12+6,w/2-4,i*12);c.stroke()}}}
  else if(o.k==='cyl'){fillR(c,-w*.35,-h/2,w*.7,h,o.c,8);c.fillStyle='rgba(0,0,0,.15)';for(let i=0;i<6;i++){circ(c,-8+(i%3)*8,-12+Math.floor(i/3)*16,2);c.fill()}}
  else if(o.k==='apple'){circ(c,-8,4,h*.42);c.fillStyle=o.c;c.fill();circ(c,8,4,h*.42);c.fill();c.fillStyle=K.woodD;c.fillRect(-2,-h/2,4,12);c.fillStyle=K.oliveL;c.beginPath();c.ellipse(9,-h/2+6,9,5,-.5,0,7);c.fill()}
  else if(o.k==='ice'){c.globalAlpha=.85;fillR(c,-w/2,-h/2,w,h,o.c,8);c.globalAlpha=1;c.strokeStyle='#FFFFFF';c.lineWidth=3;rr(c,-w/2+6,-h/2+6,w-12,h-12,5);c.stroke()}
  else if(o.k==='egg'){c.beginPath();c.ellipse(0,0,h*.36,h*.48,0,0,7);c.fillStyle=o.c;c.fill();c.strokeStyle='rgba(0,0,0,.15)';c.lineWidth=2;c.stroke()}
  else if(o.k==='pot'){c.beginPath();c.ellipse(0,0,h*.52,h*.38,.2,0,7);c.fillStyle=o.c;c.fill();c.fillStyle='rgba(0,0,0,.2)';[[-8,-4],[10,6],[2,-10]].forEach(([a,b])=>{circ(c,a,b,2.5);c.fill()})}
  else if(o.k==='grape'){[[-8,-8],[8,-8],[0,4],[-10,10],[10,10],[0,-18]].forEach(([a,b])=>{circ(c,a,b,9);c.fillStyle=o.c;c.fill();circ(c,a-3,b-3,2.5);c.fillStyle='rgba(255,255,255,.3)';c.fill()})}
  else if(o.k==='rock'){c.beginPath();[[-24,10],[-18,-14],[0,-22],[20,-12],[26,8],[8,20],[-12,20]].forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.closePath();c.fillStyle=o.c;c.fill();c.fillStyle='rgba(255,255,255,.15)';c.beginPath();c.moveTo(-14,-10);c.lineTo(0,-16);c.lineTo(-4,-2);c.fill()}
  else if(o.k==='bolt'){fillR(c,-14,-h/2,28,12,o.c,3);fillR(c,-6,-h/2+10,12,h-12,o.c,2);c.strokeStyle='rgba(0,0,0,.3)';c.lineWidth=2;for(let yy=-h/2+16;yy<h/2;yy+=6){c.beginPath();c.moveTo(-6,yy);c.lineTo(6,yy+3);c.stroke()}}
  else if(o.k==='coin'){c.beginPath();c.ellipse(0,0,h*.42,h*.42,0,0,7);c.fillStyle=o.c;c.fill();c.strokeStyle=K.woodD;c.lineWidth=3;c.stroke();tx(c,'1',0,1,{f:FSL(20),c:K.woodD})}
  c.restore()}
function mkYogunluk(G){
  const TK={x:200,y:150,w:400,h:318},SURF=232,BOT=TK.y+TK.h-6,OH=54,SLOTS=[250,325,400,475,550];
  const Y={liq:'tatli',col:LIQ.tatli.col,mode:'pred',q:[],qi:0,items:[],cur:null,crane:400,ok:0,mist:0,busy:false,hide:false,task:null,boat:null};
  const L=()=>LIQ[Y.liq];
  const subF=it=>clamp((it.y+it.h/2-SURF)/it.h,0,1);
  function newItem(o){return{o,x:Y.crane,y:112,vy:0,h:OH,st:'hang',settle:0,tag:false,slot:0}}
  function dockPred(){G.dock(`<div class="gpred"><button class="gact big up" type="button" data-act="up">${ic('arrowU',20)}<span>Yüzer</span></button><button class="gact big down" type="button" data-act="down"><span style="display:inline-flex;transform:rotate(180deg)">${ic('arrowU',20)}</span><span>Batar</span></button></div><div class="gacts"><span class="gmv">Doğru: <b>${Y.ok}</b> / ${Y.q.length}</span></div>`)}
  function dockLiq(){G.dock(`<div class="gliq" role="group" aria-label="Sıvı seç">${Object.entries(LIQ).map(([k,l])=>`<button type="button" class="gact ghost liq" data-act="liq" data-v="${k}" style="--lc:${l.col}"><i></i><span>${l.n}<small>${trn(l.r)} g/cm³</small></span></button>`).join('')}</div>`)}
  function dockBoat(){const b=Y.boat;G.dock(`<div class="gtray" role="group" aria-label="Yük sandıkları">${b.crates.map((m,i)=>`<button type="button" class="gblk" data-act="crate" data-v="${i}" aria-pressed="${b.on[i]}" style="--bc:${K.wood}"><b>${m}</b><small>kg</small></button>`).join('')}<span class="gtrayh">Sandığa dokun: gemiye yükle ya da indir.</span></div><div class="gacts"><span class="gmv">Yük: <b>${b.load()}</b> kg</span><button class="gact" type="button" data-act="sail">${ic('send',16)}<span>Yola çık!</span></button></div>`)}
  function nextObj(){Y.busy=false;if(Y.mode==='pred'){if(Y.qi>=Y.q.length){const s=Y.ok>=Y.q.length?3:Y.ok>=Y.q.length-1?2:Y.ok>=Y.q.length-2?1:0;s?G.win(s):G.fail(`${Y.q.length} cisimden ${Y.ok} tanesini doğru tahmin ettin. Yoğunlukları karşılaştırarak yeniden dene.`);return}
      Y.crane=SLOTS[Y.qi];Y.cur=newItem(OBJ[Y.q[Y.qi]]);Y.cur.slot=Y.qi;dockPred()}
    else if(Y.mode==='liq'){if(Y.qi>=Y.q.length){G.win(Y.mist===0?3:Y.mist===1?2:1);return}Y.task=Y.q[Y.qi];Y.crane=400;Y.cur=newItem(OBJ[Y.task.o]);Y.items=[];dockLiq();G.tip('think',`Görev: ${Y.task.want==='up'?OBJ[Y.task.o].n+' yüzsün.':OBJ[Y.task.o].n+' batsın.'} Hangi sıvıyı seçersin?`)}}
  function drop(){Y.busy=true;Y.cur.st='fall';sfx.whoosh();Y.items.push(Y.cur);const it=Y.cur;Y.cur=null;
    G.later(()=>resolve(it),2300)}
  function resolve(it){const up=it.o.r<L().r,l=L();it.tag=true;
    G.log({c:{'Cisim':it.o.n,'Yoğunluk':trn(it.o.r)+' g/cm³','Sıvı':l.n,'Sonuç':up?'Yüzer':'Batar'}});
    const why=`${it.o.n} ${trn(it.o.r)} g/cm³, ${l.n.toLocaleLowerCase('tr')} ${trn(l.r)} g/cm³. ${up?'Cisim sıvıdan hafif, yüzer.':'Cisim sıvıdan ağır, batar.'}`;
    if(Y.mode==='pred'){const ok=(it.pred==='up')===up;if(ok){Y.ok++;sfx.ok();G.pop(it.x,SURF-70,'Doğru!',K.olive,24)}else{Y.mist++;sfx.bad();G.pop(it.x,SURF-70,'Tersi oldu!',K.garnet,22)}G.tip(ok?'cheer':'think',why);Y.qi++;G.later(nextObj,1300)}
    else{const ok=(Y.task.want==='up')===up;if(ok){sfx.ok();G.pop(it.x,SURF-70,'Başardın!',K.olive,24);G.tip('cheer',why);Y.qi++;G.later(nextObj,1500)}
      else{Y.mist++;sfx.bad();G.tip('think',why+' Başka bir sıvı dene.');G.later(()=>{Y.items=[];Y.cur=newItem(it.o);Y.busy=false},1500)}}}
  function boatState(){const b=Y.boat,M=b.base+b.load();return{M,f:M/b.cap,sink:M>b.cap}}
  return{
    start(i,Lv){Y.items=[];Y.cur=null;Y.ok=0;Y.mist=0;Y.qi=0;Y.busy=false;Y.boat=null;Y.mode=Lv.mode||'pred';Y.hide=!!Lv.hide;Y.liq=Lv.liq||'tatli';Y.col=L().col;
      if(Y.mode==='boat'){const b=Y.boat={base:Lv.base,cap:Lv.cap,crates:Lv.crates,on:Lv.crates.map(()=>false),y:0,vy:0,sinkT:0,sailX:0,sail:false,load(){return this.crates.reduce((s,m,i)=>s+(this.on[i]?m:0),0)}};dockBoat()}
      else{Y.q=Lv.objs||Lv.tasks;nextObj()}},
    act(a,v){if(Y.mode==='boat'){const b=Y.boat;if(b.sail||b.sinkT>0)return;
        if(a==='crate'){b.on[+v]=!b.on[+v];sfx.thud();dockBoat();const s=boatState();if(s.sink){b.sinkT=.01;Y.mist++;sfx.bad();G.shake(6);G.tip('sad',`Gemi battı! Toplam kütle ${s.M} kg oldu. Bu gemi en fazla ${b.cap} kg taşıyabilir.`);G.log({c:{'Cisim':'Gemi + '+b.load()+' kg yük','Yoğunluk':trn(s.M/1000)+' g/cm³','Sıvı':'Tatlı su','Sonuç':'Batar'}});
            G.later(()=>{b.on[+v]=false;b.sinkT=0;b.y=-60;dockBoat();G.tip('think','Son sandığı indirdik, gemi yeniden yüzüyor. Başka bir yük dene.')},1800)}
          else G.tip('think',`Gemi + yük: ${s.M} kg. ${s.f>.9?'Gemi iyice battı, dikkat!':'Gemi rahat yüzüyor.'}`)}
        if(a==='sail'){const s=boatState(),ld=b.load(),need=G.L.need;if(ld<need){G.tip('think',`Şu an ${ld} kg yük var. Kaptan en az ${need} kg istiyor!`);sfx.bad();return}
          b.sail=true;sfx.win();G.log({c:{'Cisim':'Gemi + '+ld+' kg yük','Yoğunluk':trn(s.M/1000)+' g/cm³','Sıvı':'Tatlı su','Sonuç':'Yüzer'}});G.later(()=>G.win(ld>=G.L.best?3:ld>=G.L.good?2:1),1400)}
        return}
      if(Y.busy||!Y.cur)return;
      if(Y.mode==='pred'&&(a==='up'||a==='down')){Y.cur.pred=a;drop()}
      if(Y.mode==='liq'&&a==='liq'){Y.liq=v;sfx.splash();drop()}},
    frame(dt){Y.col=L().col;
      if(Y.cur){Y.cur.x=lerp(Y.cur.x,Y.crane,Math.min(1,dt*6))}
      Y.items.forEach(it=>{if(it.st==='hang')return;const f=subF(it),l=L().r/it.o.r,before=f;
        const g=1400,a=g*(1-l*f)-(f>0?4.2:.2)*it.vy;it.vy+=a*dt;it.y+=it.vy*dt;
        if(before===0&&subF(it)>0&&it.vy>150){sfx.splash();G.burst(it.x,SURF,[Y.col,'#FFFFFF'],14,200)}
        if(it.y+it.h/2>BOT){it.y=BOT-it.h/2;it.vy=0}});
      if(Y.boat){const b=Y.boat,s=boatState(),HH=96,target=b.sinkT>0?BOT-SURF+40:clamp(s.f,0,1)*HH-HH*.5;
        if(b.sinkT>0)b.sinkT+=dt;b.vy+=(target-b.y)*dt*14;b.vy*=1-dt*4;b.y+=b.vy*dt;if(b.sail)b.sailX+=dt*(60+b.sailX*1.5)}},
    draw(c,t){
      c.fillStyle=lgrad(c,0,0,0,GH,['#EFE2C6','#E2CDA6']);c.fillRect(0,0,GW,GH);
      c.fillStyle='rgba(111,52,32,.08)';for(let x=0;x<GW;x+=60)c.fillRect(x,0,2,GH);
      fillR(c,0,TK.y+TK.h+6,GW,GH,K.woodD);fillR(c,0,TK.y+TK.h,GW,10,K.wood);
      const boat=Y.mode==='boat';
      /* sıvı */
      c.save();rr(c,TK.x,TK.y,TK.w,TK.h,10);c.clip();c.fillStyle='rgba(251,246,234,.5)';c.fillRect(TK.x,TK.y,TK.w,TK.h);
      c.fillStyle=Y.col;c.globalAlpha=.78;c.beginPath();c.moveTo(TK.x,SURF);for(let x=TK.x;x<=TK.x+TK.w;x+=10)c.lineTo(x,SURF+Math.sin(x*.05+t*2)*2.5);c.lineTo(TK.x+TK.w,TK.y+TK.h);c.lineTo(TK.x,TK.y+TK.h);c.closePath();c.fill();c.globalAlpha=1;
      c.fillStyle='rgba(255,255,255,.18)';c.fillRect(TK.x+14,SURF+10,12,TK.h-100);
      /* cisimler */
      Y.items.forEach(it=>{drawObj(c,it.o,it.x,it.y,it.h)});
      if(boat){const b=Y.boat,s=boatState(),bx=400+b.sailX,by=SURF+b.y,HW=260,HH=96;c.save();c.translate(bx,by);if(b.sinkT>0)c.rotate(Math.min(.35,b.sinkT*.3));
        c.fillStyle=K.terra;c.beginPath();c.moveTo(-HW/2,-HH/2);c.lineTo(HW/2,-HH/2);c.lineTo(HW/2-30,HH/2);c.lineTo(-HW/2+30,HH/2);c.closePath();c.fill();
        c.fillStyle=K.rust;c.fillRect(-HW/2,-HH/2,HW,12);c.fillStyle=K.cream;c.fillRect(-HW/2+20,-HH/2+22,HW-40,4);
        let x=-HW/2+18;b.crates.forEach((m,i)=>{if(!b.on[i])return;const s2=18+m/8;fillR(c,x,-HH/2-s2,s2,s2,K.wood,3);c.strokeStyle=K.woodD;c.lineWidth=2;rr(c,x,-HH/2-s2,s2,s2,3);c.stroke();tx(c,String(m),x+s2/2,-HH/2-s2/2,{s:11,c:K.cream});x+=s2+4});
        c.restore()}
      c.restore();
      if(boat){const b=Y.boat,s=boatState();tx(c,`Gemi ${b.base} kg + yük ${b.load()} kg = ${s.M} kg`,400,TK.y-62,{f:FSL(22),c:s.sink?K.garnet:K.ink});tx(c,`Bu gemi en fazla ${b.cap} kg taşır. Kaptan en az ${G.L.need} kg yük istiyor.`,400,TK.y-30,{s:14,c:K.muted})}
      c.strokeStyle='rgba(47,46,36,.55)';c.lineWidth=4;rr(c,TK.x,TK.y,TK.w,TK.h,10);c.stroke();
      fillR(c,TK.x+TK.w-150,TK.y+TK.h-34,140,26,'rgba(251,246,234,.92)',6);tx(c,`${L().n} · ${trn(L().r)} g/cm³`,TK.x+TK.w-80,TK.y+TK.h-21,{s:12});
      /* etiketler */
      Y.items.forEach(it=>{if(!it.tag&&Y.hide)return;const up=it.o.r<L().r;tx(c,it.o.n,it.x,Math.min(it.y-it.h/2-14,SURF-26),{s:11,st:'rgba(251,246,234,.92)',sw:4});
        if(it.tag||!Y.hide)tx(c,trn(it.o.r)+' g/cm³',it.x,Math.min(it.y-it.h/2-14,SURF-26)+14,{s:10,w:700,c:it.tag?(up?K.olive:K.garnet):K.muted,st:'rgba(251,246,234,.92)',sw:4})});
      /* vinç */
      if(!boat){c.fillStyle=K.ink;c.fillRect(170,58,460,8);const cx=Y.cur?Y.cur.x:Y.crane;fillR(c,cx-20,52,40,18,K.terra,3);
        if(Y.cur){const sw=Math.sin(t*2)*4;c.strokeStyle=K.ink;c.lineWidth=2;c.beginPath();c.moveTo(cx,70);c.lineTo(cx+sw,Y.cur.y-Y.cur.h/2);c.stroke();drawObj(c,Y.cur.o,cx+sw,Y.cur.y,Y.cur.h);
          tx(c,Y.cur.o.n,cx+sw+52,Y.cur.y-8,{s:15,a:'left',st:'rgba(251,246,234,.92)'});tx(c,Y.hide?'? g/cm³':trn(Y.cur.o.r)+' g/cm³',cx+sw+52,Y.cur.y+12,{s:13,w:700,a:'left',c:K.muted,st:'rgba(251,246,234,.92)'})}}
      if(Y.mode==='liq'&&Y.task){fillR(c,20,20,250,44,'rgba(251,246,234,.92)',8);tx(c,`Görev ${Y.qi+1}/${Y.q.length}: ${OBJ[Y.task.o].n} ${Y.task.want==='up'?'yüzsün':'batsın'}`,145,42,{s:14})}
      if(Y.mode==='pred'){for(let i=0;i<Y.q.length;i++){c.save();c.translate(30+i*22,30);c.rotate(Math.PI/4);c.fillStyle=i<Y.qi?K.ember:'rgba(47,46,36,.15)';c.fillRect(-6,-6,12,12);c.restore()}}
    }
  };
}

/* ================= OYUN 7: AY FOTOĞRAFÇISI ================= */
function mkAy(G){
  const E={x:240,y:285},R=150;
  const M={d:3,play:false,ti:0,shots:[],mist:0,drag:false,last:null};
  G.ctl('d',{get:()=>M.d,set:v=>{M.d=((+v%MONTH)+MONTH)%MONTH;M.d=Math.round(M.d*10)/10},min:0,max:29.5,step:.1,pstep:1,fmt:v=>trn(v,1)+'. gün'});
  const pos=d=>{const p=Math.PI+2*Math.PI*d/MONTH;return{x:E.x+R*Math.cos(p),y:E.y-R*Math.sin(p)}};
  const cur=()=>G.L.targets[M.ti];
  const dd=(a,b)=>{const d=Math.abs(a-b)%MONTH;return Math.min(d,MONTH-d)};
  function dock(){G.dock(`<div class="gctl">${G.range('d','Ay\'ın günü')}</div><div class="gacts"><button class="gact ghost" type="button" data-act="play">${ic(M.play?'pause':'play',16)}<span>${M.play?'Durdur':'Oynat'}</span></button><button class="gact" type="button" data-act="shot">${ic('eye',18)}<span>Fotoğraf çek</span></button></div>`)}
  return{
    start(i,L){M.ti=0;M.shots=[];M.mist=0;M.play=false;M.d=L.d0!=null?L.d0:3;dock()},
    act(a){if(a==='play'){M.play=!M.play;dock();sfx.tap()}
      if(a==='shot'){if(M.ti>=G.L.targets.length)return;M.play=false;dock();G.flash();sfx.tick();const tg=cur(),e=dd(M.d,tg.d),st=e<=.8?3:e<=1.6?2:e<=2.6?1:0;
        G.log({c:{'Gün':trn(M.d,1),'Evre':phaseName(M.d),'Aydınlık':'%'+Math.round(litFrac(M.d)*100)},x:M.d,y:litFrac(M.d)*100});
        if(st){M.shots.push({d:M.d,st});sfx.ok();G.pop(640,170,st===3?'Harika kare!':'Güzel!',K.olive,24);M.ti++;
          if(M.ti>=G.L.targets.length){const avg=M.shots.reduce((s,x)=>s+x.st,0)/M.shots.length;G.win(Math.max(1,Math.floor(avg+.34)-(M.mist>=3?1:0)))}
          else G.tip('cheer',`Bu ${phaseName(M.d).toLocaleLowerCase('tr')}. Sıradaki hedefe geç!`)}
        else{M.mist++;sfx.bad();const ahead=((tg.d-M.d)%MONTH+MONTH)%MONTH<MONTH/2;G.tip('think',`Bu ${phaseName(M.d).toLocaleLowerCase('tr')}, hedef bu değil. Ay'ı biraz ${ahead?'ileri':'geri'} götür.`)}}},
    frame(dt){if(M.play){M.d=(M.d+dt*2.4)%MONTH;G.sync('d')}},
    down(p){const m=pos(M.d),r=Math.hypot(p.x-E.x,p.y-E.y);if(Math.hypot(p.x-m.x,p.y-m.y)<40||Math.abs(r-R)<38){M.drag=true;M.play=false;this.move(p);return true}return false},
    move(p){if(!M.drag)return;const a=Math.atan2(-(p.y-E.y),p.x-E.x);GM.ctl.d.set(((a-Math.PI)/(2*Math.PI))*MONTH);G.sync('d')},
    up(){if(M.drag){M.drag=false;dock()}},
    hover(p){const r=Math.hypot(p.x-E.x,p.y-E.y);return Math.abs(r-R)<38},
    curve:x=>litFrac(x)*100,
    draw(c,t){nightSky(c,0,0,GW,GH,t);
      const sg=c.createRadialGradient(-40,E.y,10,-40,E.y,170);sg.addColorStop(0,'rgba(242,196,106,1)');sg.addColorStop(.4,'rgba(242,196,106,.5)');sg.addColorStop(1,'rgba(242,196,106,0)');c.fillStyle=sg;c.fillRect(0,0,240,GH);
      tx(c,'GÜNEŞ IŞIĞI',18,E.y-130,{s:11,a:'left',c:'#F2C46A'});c.strokeStyle='rgba(242,196,106,.35)';c.lineWidth=2;for(let y=150;y<=420;y+=45){c.beginPath();c.moveTo(20,y);c.lineTo(70,y);c.stroke();c.beginPath();c.moveTo(70,y);c.lineTo(62,y-5);c.lineTo(62,y+5);c.closePath();c.fillStyle='rgba(242,196,106,.5)';c.fill()}
      c.setLineDash([3,7]);c.strokeStyle='rgba(244,234,214,.3)';c.lineWidth=2;circ(c,E.x,E.y,R);c.stroke();c.setLineDash([]);
      /* dünya */
      circ(c,E.x,E.y,36);c.fillStyle='#24405A';c.fill();c.save();circ(c,E.x,E.y,36);c.clip();c.fillStyle='#5B9DB5';c.fillRect(E.x-36,E.y-36,36,72);c.fillStyle=K.oliveL;c.beginPath();c.ellipse(E.x-14,E.y-8,10,16,.4,0,7);c.fill();c.fillStyle='rgba(0,0,0,.35)';c.fillRect(E.x,E.y-36,36,72);c.restore();
      tx(c,'Dünya',E.x,E.y+52,{s:12,c:K.cream});
      const m=pos(M.d);c.strokeStyle='rgba(244,234,214,.35)';c.setLineDash([6,6]);c.beginPath();c.moveTo(E.x,E.y);c.lineTo(m.x,m.y);c.stroke();c.setLineDash([]);
      circ(c,m.x,m.y,20);c.fillStyle='#2B3040';c.fill();c.beginPath();c.arc(m.x,m.y,20,Math.PI/2,Math.PI*1.5);c.fillStyle='#F1E8D0';c.fill();
      circ(c,m.x,m.y,M.drag?28:24+2*Math.sin(t*4));c.strokeStyle=K.ember;c.lineWidth=3;c.stroke();
      tx(c,'Ay',m.x,m.y-34,{s:12,c:K.cream});
      /* hedef ve kamera */
      const X=470,W=310,tg=cur();fillR(c,X,18,W,56,'rgba(251,246,234,.95)',10);
      if(tg){tx(c,`HEDEF ${M.ti+1}/${G.L.targets.length}`,X+14,34,{s:11,a:'left',c:K.terra});
        if(tg.k==='pic'){moonPhase(c,X+W-34,46,20,tg.d);tx(c,tg.t,X+14,56,{s:16,a:'left'})}else wrapTx(c,tg.t,X+W/2,56,W-28,17,{s:14})}
      else tx(c,'Albüm tamam!',X+W/2,46,{f:FSL(22)});
      fillR(c,X,86,W,250,'#0F131C',10);nightSky(c,X+6,92,W-12,238,t+3);moonPhase(c,X+W/2,211,82,M.d);
      tx(c,'DÜNYA\'DAN GÖRÜNÜŞ',X+16,106,{s:11,a:'left',c:'rgba(244,234,214,.7)'});
      c.strokeStyle='rgba(244,234,214,.6)';c.lineWidth=3;[[X+14,98,1,1],[X+W-14,98,-1,1],[X+14,326,1,-1],[X+W-14,326,-1,-1]].forEach(([x,y,a,b])=>{c.beginPath();c.moveTo(x,y+b*18);c.lineTo(x,y);c.lineTo(x+a*18,y);c.stroke()});
      /* albüm */
      G.L.targets.forEach((q,i)=>{const x=X+i*(W/3)+6,y=350,w=W/3-12;fillR(c,x,y,w,96,i===M.ti?'rgba(217,130,43,.25)':'rgba(251,246,234,.1)',8);c.strokeStyle=i===M.ti?K.ember:'rgba(244,234,214,.25)';c.lineWidth=2;rr(c,x,y,w,96,8);c.stroke();
        const s=M.shots[i];if(s){moonPhase(c,x+w/2,y+38,24,s.d);c.fillStyle=K.gold;for(let j=0;j<3;j++){star5(c,x+w/2-20+j*20,y+80,7);c.fillStyle=j<s.st?K.gold:'rgba(244,234,214,.2)';c.fill()}}
        else tx(c,i===M.ti?'Sıradaki':'?',x+w/2,y+48,{s:13,c:'rgba(244,234,214,.7)'})});
      tx(c,trn(M.d,1)+'. gün',E.x,E.y+R+40,{f:FSL(22),c:K.cream});
    }
  };
}

/* ================= OYUN 8: LAZER LABİRENTİ (IŞIK) ================= */
const MREF={'/':{0:3,3:0,2:1,1:2},'\\':{0:1,1:0,2:3,3:2}},DXY=[[1,0],[0,1],[-1,0],[0,-1]];
function traceBeam(g,em,cols,rows){let c=em[0],r=em[1],d=0;const pts=[[c,r]],lit=new Set(),hits=[];let b=0,end='edge';
  for(let s=0;s<120;s++){c+=DXY[d][0];r+=DXY[d][1];if(c<0||r<0||c>=cols||r>=rows){end='edge';break}const ch=g[r][c];
    if(ch==='#'){end='wall';break}if(ch==='E'){end='wall';break}if(ch==='C')lit.add(c+','+r);
    const m=ch==='/'||ch==='F'?'/':ch==='\\'||ch==='G'?'\\':null;if(m){pts.push([c,r]);hits.push({c,r,din:d,m});d=MREF[m][d];b++}}
  pts.push([c,r]);return{pts,lit,b,end,d}}
function mkIsik(G){
  const CS=76,COLS=8,ROWS=5,X0=(GW-COLS*CS)/2,Y0=90;
  const I={g:[],base:[],em:[0,0],inv:0,moves:0,tr:null,done:false,hov:null,crys:0};
  const placed=()=>I.g.flat().filter((ch,k)=>(ch==='/'||ch==='\\')&&I.base[Math.floor(k/COLS)][k%COLS]==='.').length;
  function load(L){I.base=L.grid.map(r=>r.split(''));I.g=L.grid.map(r=>r.split('').map(ch=>ch==='r'?'/':ch==='l'?'\\':ch));I.inv=L.inv||0;I.moves=0;I.done=false;
    I.base.forEach((row,r)=>row.forEach((ch,c)=>{if(ch==='E')I.em=[c,r]}));I.crys=I.g.flat().filter(ch=>ch==='C').length;retrace()}
  function retrace(){I.tr=traceBeam(I.g,I.em,COLS,ROWS);dock()}
  function dock(){G.dock(`<div class="gchips"><span class="gchip ${I.tr.lit.size===I.crys?'full':'dim'}">${ic('target2',16)} Kristal: <b>${I.tr.lit.size} / ${I.crys}</b></span><span class="gchip">${ic('mirror',16)} Yansıma: <b>${I.tr.b}</b></span>${I.inv?`<span class="gchip">Elde ayna: <b>${I.inv-placed()}</b></span>`:''}</div><div class="gacts"><span class="gmv">Hamle: <b>${I.moves}</b></span><button class="gact ghost" type="button" data-act="reset">${ic('reset',16)}<span>Baştan</span></button></div>`)}
  const cell=p=>{const c=Math.floor((p.x-X0)/CS),r=Math.floor((p.y-Y0)/CS);return c>=0&&r>=0&&c<COLS&&r<ROWS?[c,r]:null};
  const canTap=q=>{if(!q)return false;const b=I.base[q[1]][q[0]];return b==='r'||b==='l'||(b==='.'&&I.inv>0)};
  function tap(q){const [c,r]=q,b=I.base[r][c],ch=I.g[r][c];
    if(b==='r'||b==='l')I.g[r][c]=ch==='/'?'\\':'/';
    else if(b==='.'&&I.inv){if(ch==='.'){if(placed()>=I.inv){G.tip('think','Elinde ayna kalmadı. Yerleştirdiğin bir aynayı kaldırmak için ona dokun.');return}I.g[r][c]='/'}else I.g[r][c]=ch==='/'?'\\':'.'}
    else return;
    I.moves++;sfx.tap();retrace();
    if(I.tr.lit.size===I.crys&&!I.done){I.done=true;sfx.ok();const L=G.L;const lp=I.tr.pts[I.tr.pts.length-1];G.pop(X0+lp[0]*CS+CS/2,Y0+lp[1]*CS,'Işık ulaştı!',K.olive,24);
      G.log({c:{'Bölüm':G.lv+1,'Yansıma':I.tr.b,'Hamle':I.moves,'Sonuç':'Kristal yandı'}});G.later(()=>G.win(I.moves<=L.opt?3:I.moves<=L.opt+2?2:1),900)}}
  return{
    start(i,L){load(L)},
    act(a){if(a==='reset'&&!I.done){load(G.L);sfx.tap()}},
    down(p){if(I.done)return false;const q=cell(p);if(canTap(q))tap(q);return false},
    hover(p){const q=cell(p);I.hov=canTap(q)?q:null;return !!I.hov&&!I.done},
    draw(c,t){c.fillStyle='#161B26';c.fillRect(0,0,GW,GH);
      tx(c,'LAZER LABİRENTİ',X0,46,{s:13,a:'left',c:'rgba(244,234,214,.6)'});tx(c,'Gelme açısı = Yansıma açısı',X0+COLS*CS,46,{s:13,a:'right',c:K.gold});
      for(let r=0;r<ROWS;r++)for(let cc=0;cc<COLS;cc++){const x=X0+cc*CS,y=Y0+r*CS;fillR(c,x+2,y+2,CS-4,CS-4,(r+cc)%2?'#1F2533':'#232A3A',4);
        if(I.hov&&I.hov[0]===cc&&I.hov[1]===r){c.strokeStyle=K.ember;c.lineWidth=2;rr(c,x+3,y+3,CS-6,CS-6,5);c.stroke()}
        if(I.base[r][cc]==='.'&&I.inv&&I.g[r][cc]==='.'){circ(c,x+CS/2,y+CS/2,3);c.fillStyle='rgba(244,234,214,.25)';c.fill()}}
      /* ışın */
      const P=q=>[X0+q[0]*CS+CS/2,Y0+q[1]*CS+CS/2],tr=I.tr,pts=tr.pts.map(P);const lp=tr.pts[tr.pts.length-1],d=tr.d;
      let ex=X0+lp[0]*CS+CS/2-DXY[d][0]*CS/2,ey=Y0+lp[1]*CS+CS/2-DXY[d][1]*CS/2;pts[pts.length-1]=[ex,ey];
      c.lineCap='round';c.lineJoin='round';[[14,'rgba(232,90,60,.18)'],[7,'rgba(240,120,80,.45)'],[3,'#FFD9C2']].forEach(([w,col])=>{c.strokeStyle=col;c.lineWidth=w;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()});
      const pulse=(t*2)%1;if(pts.length>1){let tot=0;const seg=[];for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(l);tot+=l}
        for(let k=0;k<3;k++){let u=((pulse+k/3)%1)*tot;for(let i=0;i<seg.length;i++){if(u<=seg[i]){const f=u/seg[i];circ(c,lerp(pts[i][0],pts[i+1][0],f),lerp(pts[i][1],pts[i+1][1],f),4);c.fillStyle='#FFF3E8';c.fill();break}u-=seg[i]}}}
      /* elemanlar */
      for(let r=0;r<ROWS;r++)for(let cc=0;cc<COLS;cc++){const ch=I.g[r][cc],b=I.base[r][cc],x=X0+cc*CS+CS/2,y=Y0+r*CS+CS/2;
        if(ch==='#'){fillR(c,x-CS/2+4,y-CS/2+4,CS-8,CS-8,K.stoneD,4);c.fillStyle=K.stone;c.fillRect(x-CS/2+8,y-CS/2+8,CS/2-10,CS/2-12);c.fillRect(x+2,y+2,CS/2-10,CS/2-12)}
        else if(ch==='E'){fillR(c,x-30,y-18,48,36,K.terra,6);fillR(c,x+16,y-7,16,14,K.ink,3);circ(c,x+30,y,5);c.fillStyle='#FF8A6A';c.fill();tx(c,'LAZER',x-6,y+28,{s:9,c:'rgba(244,234,214,.6)'})}
        else if(ch==='C'){const on=tr.lit.has(cc+','+r);if(on){const g=c.createRadialGradient(x,y,4,x,y,46);g.addColorStop(0,'rgba(169,185,143,.8)');g.addColorStop(1,'rgba(169,185,143,0)');c.fillStyle=g;circ(c,x,y,46);c.fill()}
          c.beginPath();c.moveTo(x,y-24);c.lineTo(x+18,y-6);c.lineTo(x+10,y+22);c.lineTo(x-10,y+22);c.lineTo(x-18,y-6);c.closePath();c.fillStyle=on?'#C9E2A6':'#5E6B78';c.fill();c.strokeStyle=on?'#FFFFFF':'#8C979C';c.lineWidth=2;c.stroke();
          c.beginPath();c.moveTo(x,y-24);c.lineTo(x,y+22);c.moveTo(x-18,y-6);c.lineTo(x+18,y-6);c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=1;c.stroke()}
        else if(ch==='/'||ch==='\\'||ch==='F'||ch==='G'){const m=ch==='/'||ch==='F'?'/':'\\',fixed=ch==='F'||ch==='G',mine=b==='.';
          c.save();c.translate(x,y);c.rotate(Math.PI/4);fillR(c,-12,-12,24,24,fixed?'#4A5160':mine?K.olive:K.terra,4);c.restore();
          c.save();c.translate(x,y);c.rotate(m==='/'?-Math.PI/4:Math.PI/4);fillR(c,-30,-4,60,8,'#DDE6EA',3);fillR(c,-30,2,60,4,'#7E878C',2);c.restore();
          if(!fixed){c.globalAlpha=.5+.3*Math.sin(t*3+cc);circ(c,x+26,y-26,8);c.fillStyle=K.ember;c.fill();c.globalAlpha=1;c.strokeStyle=K.ink;c.lineWidth=2;c.beginPath();c.arc(x+26,y-26,4,0,4.5);c.stroke()}}}
      /* yansıma açıları */
      tr.pts.slice(1,-1).forEach(q=>{const [x,y]=P(q);c.strokeStyle='rgba(235,194,122,.6)';c.lineWidth=1.5;c.setLineDash([3,4]);const m=I.g[q[1]][q[0]],n=m==='/'||m==='F'?[1,1]:[1,-1];c.beginPath();c.moveTo(x-n[0]*22,y-n[1]*22);c.lineTo(x+n[0]*22,y+n[1]*22);c.stroke();c.setLineDash([])});
    }
  };
}

/* ================= DENEY KATALOĞU ================= */
const EXPS=[
 {id:'sarkac',title:'Sarkaç saati',icon:'pendulum',col:'#A3461F',grade:'6–8. sınıf · Fen',desc:'İpin boyunu ayarla, saatin ritmini yakala. Ay\'da ve Jüpiter\'de de dene!',hint:'Topu yukarı aşağı sürükleyerek ya da aşağıdaki ayarla ipi uzat, kısalt. Sonra Bırak\'a bas.',mk:mkSarkac,
  chart:{xl:'İpin uzunluğu (m)',yl:'Süre (sn)',x0:0,x1:2.5,y0:0,y1:7,curveName:'bu gezegendeki formül'},curveFn:(x,g)=>g.curve(x),
  formula:'T = 2π × √(L ÷ g)',explain:'<b>T</b>, topun bir kez gidip gelme süresidir. <b>L</b> ipin uzunluğu, <b>g</b> yer çekimidir. İp uzarsa top daha yavaş gidip gelir. Yer çekimi büyürse daha hızlı gidip gelir. Formülde kütle yok, yani topun ağırlığı süreyi değiştirmez.',
  real:'Eski duvar saatlerindeki sarkaç, her salınımda saati bir adım ilerletir.',fact:'Galileo, kilisedeki bir avizenin salınımını nabzıyla ölçerek sarkacın sırrını keşfetti.',
  levels:[
   {goal:'Dünya\'da 2 saniyede bir gidip gelen bir sarkaç saati kur.',pl:'dunya',T:2,L0:.5,win:'Yaklaşık 1 metrelik bir ip, Dünya\'da 2 saniyede bir gidip gelir. Eski duvar saatleri bu sırrı kullanır.',three:'Üç yıldız için süreyi hedefe %2 kadar yaklaştır.'},
   {goal:'Hedef ritim 1,5 saniye. Kütleyi değiştirmek işe yarar mı? Dene ve gör.',pl:'dunya',T:1.5,L0:1.2,m:10,ask:{q:'Topun kütlesini 1 kg\'dan 10 kg\'a çıkarırsan bir gidip gelme süresi ne olur?',opts:['Uzar','Kısalır','Değişmez'],a:2,why:'Süre yalnızca ipin uzunluğuna ve yer çekimine bağlıdır. Kütle süreyi değiştirmez.'},win:'Kütleyi ne yaparsan yap süre değişmedi. Sarkacın süresini yalnızca ip uzunluğu ve yer çekimi belirler.'},
   {goal:'Ay\'a geldin! Ay\'da 3 saniyede bir gidip gelen bir sarkaç kur.',pl:'ay',T:3,L0:1,ask:{q:'Ay\'da yer çekimi Dünya\'dakinin altıda biri kadar. Aynı sarkaç Ay\'da nasıl sallanır?',opts:['Daha yavaş','Daha hızlı','Aynı hızda'],a:0,why:'Yer çekimi azalınca top daha yavaş geri çekilir, bu yüzden sarkaç daha yavaş sallanır.'},win:'Ay\'da yer çekimi az olduğu için kısa bir ip bile yavaş sallanır. Dünya\'dan götürülen bir sarkaçlı saat Ay\'da geri kalırdı!'},
   {goal:'Mars\'ta 2,5 saniyelik bir sarkaç saati kur.',pl:'mars',T:2.5,L0:1.5,win:'Mars\'ın yer çekimi Dünya\'nınkinin yaklaşık üçte biri. Bu yüzden Mars saati için daha kısa bir ip yetti.'},
   {goal:'Jüpiter\'de saniyede bir gidip gelen süper hızlı bir saat kur.',pl:'jup',T:1,L0:.3,win:'Jüpiter\'in yer çekimi çok güçlü. Top hızla geri çekildiği için uzunca bir ip bile hızlı sallanır.'}
  ]},
 {id:'kaldirac',title:'Denge ustası',icon:'lever',col:'#4B5A3A',grade:'8. sınıf · Basit makineler',desc:'Blokları doğru deliklere koy, tahterevalliyi dengele.',hint:'Aşağıdan bir blok seç, sonra tahtadaki bir deliğe dokun. Hazır olunca takozları çek.',mk:mkKaldirac,
  formula:'kütle × uzaklık = kütle × uzaklık',explain:'Her yük için kütleyi ortaya olan uzaklıkla çarp. Sol taraftaki çarpımların toplamı sağ taraftakine <b>eşitse</b> tahta dengede durur. Hafif bir yük, ortadan uzakta durursa ağır bir yükü dengeleyebilir.',
  real:'Tahterevalli, makas, kerpeten ve el arabası birer kaldıraçtır.',fact:'Arşimet: "Bana bir dayanak noktası verin, Dünya\'yı yerinden oynatayım" demiştir.',
  levels:[
   {goal:'2 kg\'lık bloğu doğru deliğe koy ve tahterevalliyi dengele.',fixed:[[-2,4]],tray:[2],help:true,win:'2 kg × 4 = 4 kg × 2. Hafif blok iki kat uzakta durunca ağır yükü dengeledi.',three:'Üç yıldız için takozları ilk çekişte dengeyi kur.'},
   {goal:'10 kg\'lık kayayı yalnızca 2 kg\'lık bir blokla dengele.',fixed:[[-1,10]],tray:[2],help:true,ask:{q:'Ağır bir kayayı hafif bir blokla dengelemek istiyorsun. Hafif blok nereye konmalı?',opts:['Ortaya yakın','Uca yakın','Fark etmez'],a:1,why:'Uzaklık büyüdükçe kütle × uzaklık değeri büyür. Uca konan hafif blok ağır kayayı dengeleyebilir.'},win:'2 × 5 = 10 × 1. Uzun bir kolla küçük bir kuvvet büyük bir yükü kaldırır. Arşimet bunu biliyordu!'},
   {goal:'6 kg\'lık yükü dengele. Blokların hepsini kullanmak zorunda değilsin.',fixed:[[-2,6]],tray:[3,1,2],help:true,win:'Sol 6 × 2 = 12. Sağda çarpımların toplamı 12 olunca denge kuruldu. Birden çok doğru yol var!'},
   {goal:'İki yükü birlikte dengele. Bu kez yardımcı çubuklar yok!',fixed:[[-3,5],[-1,2]],tray:[4,3,1],win:'Sol: 5 × 3 + 2 × 1 = 17. Sağda da toplam 17 yaptın. Kafadan hesap ustası oldun!'},
   {goal:'Dev kayayı üç blokla dengele. Bir deliğe birden çok blok koyabilirsin.',fixed:[[-3,12]],tray:[5,2,1],win:'12 × 3 = 36. Sağda 5 × 5 + 2 × 5 + 1 × 1 = 36. Uzak delikler küçük blokları güçlü yapar!'}
  ]},
 {id:'devre',title:'Işıkları yak',icon:'bulb',col:'#D9822B',grade:'4–7. sınıf · Elektrik',desc:'Kabloları tak, anahtarları kullan, lambaları yak. Kısa devreye dikkat!',hint:'Kesikli çizgilere dokunarak kablo tak ya da çıkar. Anahtarlara dokunarak aç, kapat.',mk:mkDevre,
  formula:'Akım = Gerilim ÷ Direnç',explain:'Elektrik akımı ancak <b>kapalı bir yol</b> bulunca dolaşır. <b>Seri bağlamada</b> lambalar tek yol üzerinde arka arkaya durur ve pilin gücünü paylaşır. <b>Paralel bağlamada</b> her lambanın pile giden kendi yolu vardır. Akım lambaya uğramadan pile dönerse <b>kısa devre</b> olur.',
  real:'Evimizdeki lambalar paralel bağlıdır. Bu yüzden bir lamba bozulunca diğerleri yanmaya devam eder.',fact:'Eski yılbaşı ışıklarında tek ampul bozulunca bütün dizi sönerdi, çünkü seri bağlıydılar.',
  levels:[
   {goal:'Devredeki boşluğa dokunup kabloyu tamamla. Lamba yansın!',opt:1,label:'İLK DEVRE',edges:[[0,2,0,1,'B'],[0,1,1,1,'w'],[1,1,2,1,'w'],[2,1,3,1,'L','Lamba'],[3,1,4,1,'w'],[4,1,4,2,'w'],[4,2,3,2,'?',0],[3,2,2,2,'w'],[2,2,1,2,'w'],[1,2,0,2,'w']],
    ok:s=>s.L.Lamba==='full',win:'Devre tamamlandı! Elektrik akımı ancak kapalı bir yolda dolaşır.',three:'Üç yıldız için gereksiz hamle yapmadan bitir.'},
   {goal:'İki lambayı da tam parlak yak.',opt:2,label:'İKİ LAMBA',edges:[[0,2,0,1,'B'],[0,1,1,1,'w'],[1,1,2,1,'w'],[2,1,3,1,'?',0],[3,1,4,1,'w'],[0,2,1,2,'w'],[1,2,2,2,'w'],[2,2,3,2,'?',0],[3,2,4,2,'w'],[2,1,2,2,'L','A'],[4,1,4,2,'L','B']],
    ok:s=>s.L.A==='full'&&s.L.B==='full',ask:{q:'İki lamba aynı pile bağlanacak. Hangi bağlamada ikisi de tam parlak yanar?',opts:['Seri: arka arkaya, tek yol','Paralel: her lambaya ayrı yol','İkisinde de aynı'],a:1,why:'Paralel bağlamada her lamba pilin bütün gerilimini alır. Seri bağlamada gerilimi paylaşırlar ve sönük yanarlar.'},win:'Paralel bağlamada her lambanın pile giden kendi yolu vardır, bu yüzden ikisi de tam parlak yandı. Evlerimizdeki lambalar da böyle bağlıdır.'},
   {goal:'Lambayı yak ama kısa devre yapma!',opt:2,label:'TUZAKLI DEVRE',edges:[[0,2,0,1,'B'],[0,1,1,1,'w'],[1,1,2,1,'?',0],[2,1,3,1,'w'],[3,1,3,2,'L','Lamba'],[0,2,1,2,'w'],[1,2,2,2,'w'],[2,2,3,2,'?',0],[1,1,1,2,'?',0],[2,1,2,2,'?',0]],
    ok:s=>s.L.Lamba==='full',ask:{q:'Pilin iki ucunu doğrudan bir kabloyla birleştirirsen ne olur?',opts:['Lambalar daha parlak yanar','Kısa devre olur, pil ısınır','Hiçbir şey olmaz'],a:1,why:'Akım dirençsiz kısa yolu seçer. Lambaya uğramadan pile döner, pil hızla ısınır. Bu tehlikelidir.'},win:'Akım lambanın içinden geçince lamba yanar. Kablo lambayı atlayıp pilin iki ucunu birleştirirse buna kısa devre denir.'},
   {goal:'Akşam yemeği! Yalnızca mutfak lambası yansın, salon kapalı kalsın.',opt:3,label:'EVİN ELEKTRİĞİ',edges:[[0,3,0,2,'B'],[0,2,0,1,'w'],[0,1,1,1,'S',0,'Ana'],[1,1,2,1,'w'],[2,1,3,1,'w'],[3,1,4,1,'w'],[2,1,2,2,'S',0,'M. anahtarı'],[2,2,2,3,'L','Mutfak'],[4,1,4,2,'S',1,'S. anahtarı'],[4,2,4,3,'L','Salon'],[0,3,1,3,'w'],[1,3,2,3,'w'],[2,3,3,3,'w'],[3,3,4,3,'w']],
    ok:s=>s.L.Mutfak==='full'&&s.L.Salon==='off',win:'Anahtar devreyi açıp kapatır. Ana anahtar bütün evi, odadaki anahtar yalnızca o odanın lambasını yönetir.'},
   {goal:'İki lamba seri bağlı. İkisini de tam parlak yakmak için ikinci pili devreye kat.',opt:2,label:'İKİ PİL',edges:[[0,2,0,1,'B'],[0,1,1,1,'w'],[1,1,2,1,'L','A'],[2,1,3,1,'L','B'],[3,1,4,1,'w'],[4,1,4,2,'w'],[4,2,3,2,'?',0],[3,2,2,2,'B'],[2,2,1,2,'w'],[1,2,0,2,'w'],[4,2,4,3,'?',1],[4,3,3,3,'w'],[3,3,2,3,'w'],[2,3,1,3,'w'],[1,3,1,2,'w']],
    ok:s=>s.L.A==='full'&&s.L.B==='full',win:'Seri bağlı iki lamba pilin gerilimini paylaşır. İki pili seri bağlayınca gerilim iki katına çıktı ve iki lamba da tam parlak yandı.'}
  ]},
 {id:'kesir',title:'Pizza dükkanı',icon:'pie',col:'#8E2B22',grade:'3–6. sınıf · Matematik',desc:'Müşterilere istedikleri kesir kadar pizza ver.',hint:'Dilimlere dokunarak seç. Doğru miktarı bulunca Servis et\'e bas.',mk:mkKesir,
  formula:'a/b = (a × k)/(b × k)',explain:'<b>Payda</b> bütünün kaç eşit parçaya bölündüğünü, <b>pay</b> kaç parça aldığımızı gösterir. Payı ve paydayı aynı sayıyla çarparsan kesrin büyüklüğü değişmez: 1/2 = 2/4 = 4/8.',
  real:'Pizzayı 8 dilime bölüp 4 dilim yemek, yarısını yemekle aynıdır: 4/8 = 1/2.',fact:'Eski Mısırlılar kesirleri neredeyse hep payı 1 olan kesirlerle yazardı.',
  levels:[
   {goal:'Müşterilere istedikleri kadar pizza ver.',cuts:null,orders:[{t:'eq',f:[1,2]},{t:'eq',f:[3,4]},{t:'eq',f:[2,3]}],win:'Payda pizzanın kaç eşit dilime bölündüğünü, pay da kaç dilim verdiğini gösterir.',three:'Üç yıldız için hiç yanlış servis yapmadan bitir.'},
   {goal:'Bütün pizzalar 8 dilim. İstenen kesri 8\'lik dilimlerle ver.',cuts:[8],orders:[{t:'eq',f:[1,2]},{t:'eq',f:[1,4]},{t:'eq',f:[3,4]}],win:'4/8 = 1/2, 2/8 = 1/4, 6/8 = 3/4. Pay ve paydayı aynı sayıyla çarpınca kesrin değeri değişmez.'},
   {goal:'Bıçak sende! Pizzayı uygun sayıda dilime kes, sonra ver.',cuts:[4,6,8,12],orders:[{t:'eq',f:[1,3]},{t:'eq',f:[5,6]},{t:'eq',f:[2,3]}],ask:{q:'2/3 ile 3/4\'ten hangisi daha büyük?',opts:['2/3','3/4','İkisi eşit'],a:1,why:'Paydaları 12 yapalım: 2/3 = 8/12, 3/4 = 9/12. Demek ki 3/4 daha büyük.'},win:'1/3 = 2/6, 5/6 = 10/12, 2/3 = 4/6. Doğru bıçağı seçmek kesri kolaylaştırır.'},
   {goal:'Müşteriler bu kez bir aralık söylüyor. Aralığın içinde kalan bir kesir ver.',cuts:[4,6,8,12],orders:[{t:'rng',lo:[1,2],hi:[3,4]},{t:'rng',lo:[1,4],hi:[1,2]},{t:'rng',lo:[2,3],hi:[1,1]}],win:'Kesirleri karşılaştırmanın en kolay yolu paydaları eşitlemektir. 1/2 = 6/12 ile 3/4 = 9/12 arasında 7/12 ve 8/12 vardır.'},
   {goal:'Toplama günü! Müşteriler iki kesrin toplamı kadar pizza istiyor.',cuts:[2,3,4,6,8,12],orders:[{t:'sum',f:[[1,4],[1,2]]},{t:'sum',f:[[1,3],[1,6]]},{t:'sum',f:[[1,4],[1,6]]}],win:'1/4 + 1/2 = 3/4, 1/3 + 1/6 = 1/2, 1/4 + 1/6 = 5/12. Paydaları eşitleyip payları topladın!'}
  ]},
 {id:'atis',title:'Kale kuşatması',icon:'catapult',col:'#6F3420',grade:'6–8. sınıf · Kuvvet ve hareket',desc:'Mancınıkla açıyı ve hızı ayarla, kuleleri yık.',hint:'Mancınığı parmağınla geriye çekip bırak ya da aşağıdaki ayarları kullan. Her bölümde sınırlı taşın var.',mk:mkAtis,
  chart:{xl:'Atış açısı (°)',yl:'Menzil (m)',x0:0,x1:90,y0:0,y1:70,curveName:'şu anki hızla formül'},curveFn:(x,g)=>g.curve(x),
  formula:'Menzil ≈ hız² × sin(2 × açı) ÷ g',explain:'Taşın ne kadar uzağa gideceği <b>hıza</b> ve <b>açıya</b> bağlıdır. Hız iki katına çıkınca menzil yaklaşık dört katına çıkar. Hava direnci yoksa en uzak atış <b>45 dereceye</b> yakın açıda olur. 30° ile 60° neredeyse aynı yere düşer!',
  real:'Basketbolda topu potaya atarken, futbolda frikik çekerken hep eğik atış yaparız.',fact:'Eski çağlarda Antakya surlarını kuşatan ordular büyük taşları mancınıklarla fırlatırdı.',
  levels:[
   {goal:'20 metredeki kuleyi yık. 3 taşın var.',targets:[{x:20}],walls:[],help:true,ang0:30,v0:12,win:'Açıyı ve hızı birlikte ayarlayarak hedefi vurdun!',three:'Üç yıldız için kuleyi ilk taşla yık.'},
   {goal:'40 metredeki uzak kuleyi yık.',targets:[{x:40}],walls:[],help:true,ang0:25,v0:16,ask:{q:'Aynı hızla fırlatırsan hangi açı taşı en uzağa gönderir?',opts:['30°','45°','60°'],a:1,why:'Hava direnci yoksa en uzak atış 45 dereceye yakın açıyla olur. 30° ile 60° neredeyse aynı uzaklığa düşer.'},win:'Uzak hedef için hem hızı artırdın hem de açıyı 45 dereceye yaklaştırdın.'},
   {goal:'Surun arkasındaki kuleyi yık. Taşı surun üstünden aşır!',targets:[{x:30}],walls:[{x:22,w:2,h:9}],ang0:35,v0:18,win:'Yüksek bir açıyla taşı surun üstünden aşırdın. Yüksek açı, taşı yukarı gönderir.'},
   {goal:'Tepedeki kuleyi yık.',targets:[{x:37,y:6}],walls:[{x:33,w:8,h:6,hill:true}],ang0:40,v0:15,win:'Tepedeki hedef için taşın daha uzun süre havada kalması gerekti.'},
   {goal:'İki kuleyi de yık. 4 taşın var.',targets:[{x:19},{x:47}],walls:[{x:14,w:1.5,h:4}],stones:4,ang0:35,v0:14,win:'Yakın ve uzak hedef için açıyla hızı farklı ayarladın. Gerçek bir mancınık ustası!'}
  ]},
 {id:'yogunluk',title:'Yüzer mi, batar mı?',icon:'drop',col:'#4B5A3A',grade:'6. sınıf · Yoğunluk',desc:'Önce tahmin et, sonra sıvıya bırak. En sonda bir gemiyi yükle!',hint:'Önce tahmin et: cisim yüzer mi, batar mı?',mk:mkYogunluk,
  formula:'Yoğunluk = Kütle ÷ Hacim',explain:'Bir cismin yoğunluğu sıvınınkinden <b>azsa</b> yüzer, <b>fazlaysa</b> batar. Yüzen cismin ne kadarının sıvıya gömüleceği de yoğunlukların oranına bağlıdır.',
  real:'Gemiler demirden yapılır ama içleri hava doludur. Bu yüzden ortalama yoğunlukları sudan azdır ve yüzerler.',fact:'Lut Gölü (Ölü Deniz) o kadar tuzludur ki insanlar suda hiç çabalamadan yüzer.',
  levels:[
   {goal:'Her cisim için tahmin et: tatlı suda yüzer mi, batar mı?',liq:'tatli',hide:true,objs:['tahta','tas','elma','vida','mantar'],win:'Yoğunluğu sudan az olan cisimler yüzer, fazla olanlar batar. Tatlı suyun yoğunluğu 1 g/cm³.',three:'Üç yıldız için bütün tahminlerin doğru olmalı.'},
   {goal:'Bu kez sıvı çok tuzlu su. Tahminlerin değişir mi?',liq:'tuzlu',objs:['yumurta','uzum','patates','silgi','tas'],ask:{q:'Yumurta tatlı suda batar. Çok tuzlu suya bırakırsan ne olur?',opts:['Yine batar','Yüzer','Erir'],a:1,why:'Tuz suyu yoğunlaştırır. Çok tuzlu suyun yoğunluğu (1,20) yumurtanınkinden (1,03) fazla olduğu için yumurta yüzer.'},win:'Tuz suyu daha yoğun yapar. Tatlı suda batan yumurta, üzüm ve patates çok tuzlu suda yüzdü!'},
   {goal:'Sıvı zeytinyağı. Dikkat, sürprizler var!',liq:'zeytin',objs:['buz','mantar','elma','uzum','tahta'],win:'Zeytinyağının yoğunluğu (0,91) sudan az. Suda yüzen buz (0,92) zeytinyağında battı!'},
   {goal:'Sıvıyı sen seç! Her görevde cismi istenen şekilde davrandır.',mode:'liq',tasks:[{o:'yumurta',want:'up'},{o:'buz',want:'down'},{o:'silgi',want:'up'},{o:'patates',want:'down'}],win:'Aynı cisim bir sıvıda yüzer, başka bir sıvıda batar. Belirleyici olan iki yoğunluğun karşılaştırmasıdır.',three:'Üç yıldız için her görevde ilk denemede doğru sıvıyı seç.'},
   {goal:'Kaptan en az 700 kg yük istiyor. Gemiyi batırmadan en çok yükü taşı!',mode:'boat',base:180,cap:1000,crates:[60,90,120,150,180,240],need:700,good:740,best:780,win:'Bu gemi en fazla 1000 kg suyu yerinden itebilir. Gemi ile yükün toplamı 1000 kg\'ı geçmedikçe gemi yüzer.',three:'Üç yıldız için gemiyi batırmadan taşınabilecek en çok yükü bul.'}
  ]},
 {id:'ay',title:'Ay fotoğrafçısı',icon:'moon',col:'#2F3A28',grade:'5. sınıf · Güneş, Dünya ve Ay',desc:'Ay\'ı yörüngesinde gezdir, hedefteki evreyi fotoğrafla.',hint:'Ay\'ı yörüngesinde sürükle ya da günü ayarla. Hedefteki görünüşü yakalayınca fotoğraf çek!',mk:mkAy,
  chart:{xl:'Ayın günü',yl:'Aydınlık (%)',x0:0,x1:30,y0:0,y1:100,curveName:'gerçek değer'},curveFn:(x,g)=>g.curve(x),
  formula:'1 ay ≈ 29,5 gün',explain:'Ay kendisi ışık saçmaz, Güneş\'ten gelen ışığı yansıtır. Ay\'ın her zaman yarısı aydınlıktır. Ay Dünya\'nın etrafında dönerken bu aydınlık yarının <b>ne kadarını gördüğümüz</b> değişir. Evreler buna denir.',
  real:'Takvimlerdeki dolunay ve yeni ay günleri, Ay\'ın Dünya etrafındaki konumuna göre hesaplanır.',fact:'Ay hep aynı yüzünü bize gösterir. Arka yüzünü ilk kez 1959\'da bir uzay aracı fotoğrafladı.',
  levels:[
   {goal:'Albüm için üç fotoğraf çek: hedefteki Ay\'ı yakala.',d0:20,targets:[{k:'pic',d:14.77,t:'Dolunay'},{k:'pic',d:7.38,t:'İlk dördün'},{k:'pic',d:3.7,t:'Hilal (büyüyen)'}],win:'Ay Dünya\'nın etrafında dolaşırken aydınlık yüzünü farklı açılardan görüyoruz.',three:'Üç yıldız için Ay\'ı hedef güne tam yaklaştır.'},
   {goal:'Ayın ikinci yarısını fotoğrafla.',d0:2,targets:[{k:'pic',d:22.15,t:'Son dördün'},{k:'pic',d:11.07,t:'Şişkin Ay (büyüyen)'},{k:'pic',d:25.8,t:'Hilal (küçülen)'}],ask:{q:'Ay\'ın evreleri neden oluşur?',opts:['Ay\'ın aydınlık yüzünü farklı açılardan gördüğümüz için','Dünya\'nın gölgesi Ay\'ın üstüne düştüğü için','Ay\'ın kendi ışığı azalıp çoğaldığı için'],a:0,why:'Dünya\'nın gölgesi Ay\'a yalnızca Ay tutulmasında düşer. Evreler, Ay\'ın Güneş ve Dünya\'ya göre konumundan oluşur.'},win:'Büyüyen Ay\'da sağ taraf, küçülen Ay\'da sol taraf aydınlıktır.'},
   {goal:'Bu kez resim yok, yalnızca evrenin adı var.',d0:10,targets:[{k:'name',d:0,t:'Bul: Yeni Ay'},{k:'name',d:18.45,t:'Bul: Şişkin Ay (küçülen)'},{k:'name',d:7.38,t:'Bul: İlk dördün'}],win:'Yeni Ay\'da Ay, Dünya ile Güneş\'in arasındadır. Aydınlık yüzü bize bakmadığı için onu göremeyiz.'},
   {goal:'Ay takvimi bulmacası: tarifteki Ay\'ı bul.',d0:3,targets:[{k:'desc',d:21.77,t:'Dolunaydan 7 gün sonraki Ay'},{k:'desc',d:4,t:'Yeni Ay\'dan 4 gün sonraki Ay'},{k:'desc',d:11.77,t:'Dolunaydan 3 gün önceki Ay'}],win:'Dolunaydan yaklaşık 7 gün sonra son dördün gelir. Ay\'ın evreleri her ay aynı sırayla tekrarlanır.'},
   {goal:'Bilim insanı gibi: aydınlık yüzdesine göre Ay\'ı bul.',d0:15,targets:[{k:'desc',d:7.38,t:'Yarısı aydınlık ve her gece büyüyor'},{k:'desc',d:24.61,t:'Dörtte biri aydınlık ve küçülüyor'},{k:'desc',d:9.84,t:'Dörtte üçü aydınlık ve büyüyor'}],win:'Deney defterindeki grafik, aydınlık yüzdesinin günlere göre nasıl dalgalandığını gösterir.'}
  ]},
 {id:'isik',title:'Lazer labirenti',icon:'mirror',col:'#A3461F',grade:'7. sınıf · Işığın yansıması',desc:'Aynaları çevir, lazeri kristallere ulaştır.',hint:'Aynalara dokunarak çevir. Lazeri kristale ulaştır.',mk:mkIsik,
  formula:'Gelme açısı = Yansıma açısı',explain:'Işık düz bir çizgide ilerler. Bir aynaya çarptığında, geldiği açıyla aynı açıda yansır. Bu oyunda aynalar 45° eğik durduğu için ışık her aynada 90° döner. Kesikli çizgi aynanın normalidir.',
  real:'Denizaltılardaki periskoplar ve arabaların dikiz aynaları ışığın yansımasıyla çalışır.',fact:'Astronotların Ay\'a bıraktığı aynalara Dünya\'dan lazer gönderilerek Ay\'ın uzaklığı santimetre hassasiyetinde ölçülür.',
  levels:[
   {goal:'Aynayı çevirip lazeri kristale ulaştır.',grid:['........','........','E...r...','........','....C...'],opt:1,win:'Bir aynayla ışığı 90° döndürdün.',three:'Üç yıldız için gereksiz hamle yapma.'},
   {goal:'İki ayna, bir kristal. Işığa yol çiz!',grid:['..C..r..','........','E....l..','........','........'],opt:2,ask:{q:'Işık bir aynaya 30 derecelik açıyla gelirse kaç derecelik açıyla yansır?',opts:['30°','60°','90°'],a:0,why:'Yansıma kanunu: gelme açısı yansıma açısına eşittir.'},win:'Her aynada gelme açısı yansıma açısına eşit oldu. Işık iki kez dönerek kristale ulaştı.'},
   {goal:'Duvarların arasından üç aynayla geç.',grid:['........','....C#..','E.r.....','........','..r.l...'],opt:3,win:'Üç yansımayla ışığı istediğin yere götürdün. Periskoplar da böyle çalışır.'},
   {goal:'Aynaları sen yerleştir! Boş bir kareye dokun: önce / sonra \\ olur.',grid:['........','E..#....','........','.....C..','........'],inv:2,opt:4,win:'Aynaları doğru yere ve doğru yöne koyarak duvarın etrafından dolaştın.'},
   {goal:'İki kristali de tek ışınla yak.',grid:['...F....','...C....','E..l...#','......C.','........'],inv:1,opt:3,win:'Işık kristallerin içinden geçerek yoluna devam etti. Tek bir ışınla iki hedefi vurdun!'}
  ]}
];

/* ================= GRAFİK VE TABLO ================= */
function drawChart(cv,pts,cfg,curve){
  const d=Math.min(window.devicePixelRatio||1,2),w=cv.clientWidth||300,h=cv.clientHeight||210;cv.width=w*d;cv.height=h*d;const x=cv.getContext('2d');x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,w,h);
  const cs=getComputedStyle(document.documentElement),ink=cs.getPropertyValue('--ink').trim(),mut=cs.getPropertyValue('--muted').trim(),line=cs.getPropertyValue('--line').trim(),terra=cs.getPropertyValue('--terra').trim(),ember=cs.getPropertyValue('--ember').trim(),bg=cs.getPropertyValue('--raised').trim();
  const L=46,R=12,Tp=12,B=38,X=v=>L+(v-cfg.x0)/(cfg.x1-cfg.x0)*(w-L-R),Y=v=>h-B-(v-cfg.y0)/(cfg.y1-cfg.y0)*(h-Tp-B);
  x.font='600 11px Manrope,system-ui,sans-serif';x.fillStyle=mut;x.strokeStyle=line;x.lineWidth=1;
  for(let i=0;i<=5;i++){const vx=cfg.x0+(cfg.x1-cfg.x0)*i/5,vy=cfg.y0+(cfg.y1-cfg.y0)*i/5;
    x.beginPath();x.moveTo(L,Y(vy));x.lineTo(w-R,Y(vy));x.stroke();x.textAlign='right';x.textBaseline='middle';x.fillText(String(+vy.toFixed(1)).replace('.',','),L-6,Y(vy));
    x.textAlign='center';x.textBaseline='top';x.fillText(String(+vx.toFixed(1)).replace('.',','),X(vx),h-B+6)}
  x.strokeStyle=ink;x.lineWidth=1.5;x.beginPath();x.moveTo(L,Tp);x.lineTo(L,h-B);x.lineTo(w-R,h-B);x.stroke();
  x.fillStyle=ink;x.font='700 11px Manrope,system-ui,sans-serif';x.textAlign='center';x.textBaseline='bottom';x.fillText(cfg.xl,L+(w-L-R)/2,h-2);
  x.save();x.translate(12,Tp+(h-Tp-B)/2);x.rotate(-Math.PI/2);x.textBaseline='middle';x.fillText(cfg.yl,0,0);x.restore();
  if(curve){x.strokeStyle=ember;x.lineWidth=2.5;x.beginPath();let st=false;for(let i=0;i<=80;i++){const vx=cfg.x0+(cfg.x1-cfg.x0)*i/80,vy=curve(vx);if(!isFinite(vy))continue;const py=Y(clamp(vy,cfg.y0,cfg.y1));st?x.lineTo(X(vx),py):x.moveTo(X(vx),py);st=true}x.stroke()}
  const ok=pts.filter(p=>p.x!=null&&p.y!=null);
  ok.forEach(p=>{const px=X(clamp(p.x,cfg.x0,cfg.x1)),py=Y(clamp(p.y,cfg.y0,cfg.y1));x.save();x.translate(px,py);x.rotate(Math.PI/4);x.fillStyle=terra;x.fillRect(-5,-5,10,10);x.strokeStyle=bg;x.lineWidth=1.5;x.strokeRect(-5,-5,10,10);x.restore()});
  if(!ok.length){x.fillStyle=mut;x.font='600 12px Manrope,system-ui,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('Denedikçe noktalar burada görünür.',L+(w-L-R)/2,Tp+(h-Tp-B)/2)}
}
function noteTable(rows,max){if(!rows.length)return '<p class="muted" style="font-size:.9rem">Henüz deneme yok. Oyunu oynadıkça her denemen buraya yazılır.</p>';
  const cols=[...new Set(rows.flatMap(r=>Object.keys(r.c)))],list=rows.map((r,i)=>[r,i]).reverse().slice(0,max||rows.length);
  return `<div class="tscroll"><table class="dtable"><thead><tr><th>#</th>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${list.map(([r,i])=>`<tr><td>${i+1}</td>${cols.map(c=>`<td>${esc(r.c[c]??'—')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${max&&rows.length>max?`<p class="muted" style="font-size:.82rem;margin-top:6px">Son ${max} deneme gösteriliyor. Hepsi deney defterinde.</p>`:''}`}
function renderNotes(){if(!GM)return;const x=GM.x,rows=S.lab.notes[x.id]||[],t=$('#xTable');if(!t)return;t.innerHTML=noteTable(rows,8);
  const cv=$('#xChart');if(x.chart&&cv)drawChart(cv,rows,x.chart,v=>x.curveFn(v,GM.g))}

/* ================= LABORATUVAR SAYFASI ================= */
function renderLab(){
  const done=labDoneCount(),tot=labTotal(),stars=EXPS.reduce((s,x)=>s+labStarSum(x.id),0);
  $('#pgLab').innerHTML=`<div class="frame"><div class="hero-q ol"><div><span class="lbl">LABORATUVAR</span><h2>Deney yap, oyna, keşfet!</h2><p>8 deney oyunu, her birinde 5 bölüm. Önce tahmin et, sonra dene, yıldızları topla.</p>
    <div class="bar" style="margin-top:14px;max-width:340px;background:rgba(244,234,214,.25)"><i style="width:${done/tot*100}%"></i><span style="color:#FBF6EA">${done} / ${tot} bölüm · ${stars} yıldız</span></div></div>${anka('think',96)}</div></div>
  <div class="sec-h">Deney oyunları <small>Bir oyuna dokun</small></div>
  <div class="xgrid">${EXPS.map(x=>{const n=labExpDone(x.id),s=labStarSum(x.id);return `<a class="card xcard" href="#lab-${x.id}" style="--gc:${x.col}"><div class="xi" style="background:${x.col}">${ic(x.icon,28)}</div><div><span class="tag">${x.grade}</span>${!S.lab.seen[x.id]?' <span class="xnew">YENİ</span>':''}<h3>${x.title}</h3><p>${x.desc}</p>
    <div class="xmeta"><span class="dots" aria-label="${n} / ${x.levels.length} bölüm">${x.levels.map((l,i)=>`<i class="${lvDone(x.id,i)?'on':''}"></i>`).join('')}</span><span class="muted" style="font-size:.85rem">${n} / ${x.levels.length} bölüm</span><span class="xst">${fi('star',14)} ${s} / ${x.levels.length*3}</span></div></div></a>`}).join('')}</div>
  <div class="sec-h">Bilim insanı gibi çalış</div>
  <div class="hub">
    <a class="card hubc" href="#defter"><div class="hi" style="background:var(--olive)">${ic('notebook',26)}</div><span class="tag">${labNoteCount()} ölçüm</span><h3>Deney defterim</h3><p>Oyunlardaki bütün denemelerin, tablolar ve grafiklerle.</p></a>
    <div class="card hubc" style="cursor:default"><div class="hi" style="background:var(--ember);color:#2F2E24">${ic('info',26)}</div><h3>Deney adımları</h3><p><b>1.</b> Tahmin et. <b>2.</b> Dene ve gözle. <b>3.</b> Sonucu kaydet. <b>4.</b> Sonucu tahminle karşılaştır.</p></div>
  </div>`;
}

/* ================= DENEY DEFTERİ ================= */
function renderNotebook(){
  const has=EXPS.filter(x=>(S.lab.notes[x.id]||[]).length);
  $('#pgNote').innerHTML=`<a class="back" href="#lab">${ic('rotL',18)} Laboratuvar</a><h1 class="ph1">Deney defterim</h1><p class="sub">Deney oyunlarındaki bütün denemelerin burada. ${has.length?`Toplam ${labNoteCount()} ölçüm.`:''}</p>
  ${has.length?`${framed?'':`<p style="margin-bottom:14px"><button class="b3 sm ghost" type="button" id="nPrint">${ic('printer',16)} Defteri yazdır</button></p>`}
   <div id="notebookPrint" style="display:grid;gap:14px">${has.map(x=>`<div class="card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px"><h3 style="font-size:1.3rem;display:flex;gap:10px;align-items:center"><span style="color:${x.col}">${ic(x.icon,22)}</span>${x.title}</h3><a class="b3 sm ghost" href="#lab-${x.id}">Oyuna git</a></div>
     ${noteTable(S.lab.notes[x.id])}${x.chart?`<canvas class="chart" data-nc="${x.id}" style="margin-top:12px"></canvas>`:''}</div>`).join('')}</div>`
  :`<div class="card" style="display:grid;justify-items:center;gap:12px;text-align:center;padding:30px">${anka('think',110)}<h3>Defterin henüz boş</h3><p class="muted">Bir deney oyunu oynadığında her denemen burada tablo ve grafik olarak birikir.</p><a class="b3" href="#lab">Laboratuvara git</a></div>`}`;
  $$('[data-nc]').forEach(cv=>{const x=EXPS.find(e=>e.id===cv.dataset.nc);const curve=x.id==='sarkac'?(v=>2*Math.PI*Math.sqrt(v/9.81)):x.id==='ay'?(v=>litFrac(v)*100):null;drawChart(cv,S.lab.notes[x.id],x.chart,curve)});
  const p=$('#nPrint');if(p)p.onclick=()=>{try{window.print()}catch(e){}};
}
