/* #BilimKıvılcımı · Anka'nın yuvası, ek özellikler:
   ders sonrası ziyaret, üç mini oyun (Top Yakala, Mısır Topla, Sırayı Tekrarla) ve Anka fotoğrafı. */
'use strict';

/* Anka çizimini tuvale çizilebilir bir resme çevirir (göz kapakları CSS ile gizlendiği için çıkarılır). */
function ankaImg(mood,acc){
  const s=anka(mood,300,acc).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace(/<ellipse class="lid"[^>]*?(\/>|><\/ellipse>)/g,'');
  const i=new Image();i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);return i}
function svgImg(svg){const i=new Image();i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '));return i}
const imgReady=i=>i.complete&&i.naturalWidth>0;

const TOY_SVG=`<svg viewBox="0 0 120 96"><ellipse cx="60" cy="90" rx="52" ry="6" fill="rgba(0,0,0,.18)"/>
<circle cx="40" cy="30" r="17" fill="#FBF6EA"/><path d="M23 30h34M40 13c-7 6-7 28 0 34M40 13c7 6 7 28 0 34" stroke="#B7372A" stroke-width="4" fill="none"/>
<path d="M80 8l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="#E8B53A"/>
<rect x="10" y="40" width="100" height="48" rx="6" fill="#4B5A3A"/><rect x="10" y="40" width="100" height="12" rx="4" fill="#7C8F5A"/>
<rect x="18" y="60" width="18" height="18" rx="2" fill="#D9822B"/><rect x="40" y="60" width="18" height="18" rx="2" fill="#EBC27A"/><rect x="62" y="60" width="18" height="18" rx="2" fill="#B7372A"/><rect x="84" y="60" width="18" height="18" rx="2" fill="#FBF6EA"/></svg>`;

/* ---------- yuvaya ekler ---------- */
const _renderNest=renderNest;
renderNest=function(){
  _renderNest();
  const sc=$('#nScene');if(!sc)return;
  S.pet.best=S.pet.best||{};
  sc.insertAdjacentHTML('beforeend',`<button type="button" class="nobj ntoy" data-nobj="games" aria-label="Oyuncak kutusu: Anka ile oyun oyna">${TOY_SVG}<span class="nlab">Oyunlar</span></button>`);
  const ch=$('#pgNest .nchips');if(ch)ch.insertAdjacentHTML('beforeend',`<button type="button" class="nround ncam" id="nCam" aria-label="Anka'nın fotoğrafını çek">${ic('camera',20)}</button>`);
  nestVisit();
};
const _trayRender=trayRender;
trayRender=function(){if(YV.tray==='games')return gamesTray();return _trayRender()};

/* ---------- ders sonrası ziyaret ---------- */
function nestVisit(){
  const v=S.pet.visit;if(!v)return;S.pet.visit=null;save();
  if(Date.now()-v.t>864e5)return;
  const g=$('#nGem');let shown=S.gems-(v.gems||0);if(g&&v.gems)g.textContent=shown;
  setTimeout(()=>{
    if(!$('#nBird'))return;
    nestBird('cheer','act-jump');sfx.win();
    nestSay(`Hoş geldin! "${v.title}" dersini bitirdin, aferin!`+(v.gems?` ${v.gems} taş kazandın.`:''));
    const fx=$('#nFx'),bas=$('#pgNest .nbas');if(!v.gems||!fx||!bas)return;
    const r=fx.getBoundingClientRect(),b=bas.getBoundingClientRect(),bird=$('#nBird').getBoundingClientRect();
    const x0=bird.left-r.left+bird.width/2,y0=bird.top-r.top+bird.height*.35,x1=b.left-r.left+b.width/2,y1=b.top-r.top+b.height*.35;
    for(let i=0;i<v.gems;i++)setTimeout(()=>{
      const e=document.createElement('span');e.className='ngemfly';e.innerHTML=fi('gem',30);
      e.style.left=x0+(Math.random()-.5)*60+'px';e.style.top=y0+(Math.random()-.5)*30+'px';fx.appendChild(e);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.transform=`translate(${x1-parseFloat(e.style.left)}px,${y1-parseFloat(e.style.top)}px) scale(.7)`;e.style.opacity='.2'}));
      setTimeout(()=>{e.remove();shown++;if(g){g.textContent=shown;g.parentElement.classList.remove('bump');void g.offsetWidth;g.parentElement.classList.add('bump')}
        bas.classList.remove('nbump');void bas.offsetWidth;bas.classList.add('nbump');sfx.coin()},reduce?50:820)},reduce?0:900+i*170);
  },500);
}

/* ---------- oyun kutusu ---------- */
const GAMES=[
  {id:'ball',name:'Top Yakala',desc:'Parmağınla topu Anka\'ya fırlat.',pic:()=>`<span style="color:#B7372A">${ic('ball',40)}</span>`},
  {id:'corn',name:'Mısır Topla',desc:'Sepeti kaydır, mısırları topla.',pic:()=>foodIcon('misir',48)},
  {id:'simon',name:'Sırayı Tekrarla',desc:'Anka\'nın sırasını aklında tut.',pic:()=>`<svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><rect x="2" y="2" width="19" height="19" rx="3" fill="#D9822B"/><rect x="23" y="2" width="19" height="19" rx="3" fill="#4B5A3A"/><rect x="2" y="23" width="19" height="19" rx="3" fill="#B7372A"/><rect x="23" y="23" width="19" height="19" rx="3" fill="#E8B53A"/></svg>`}];
function gamesTray(){const t=$('#nTray');if(!t)return;t.hidden=false;
  $$('#pgNest .nobj').forEach(o=>o.classList.toggle('on',o.dataset.nobj==='games'));
  const best=S.pet.best||{};
  t.innerHTML=`<div class="nth"><b>Oyunlar</b><span>30 saniyelik mini oyunlar</span><button type="button" class="nx" data-nclose aria-label="Kapat">${ic('x',18)}</button></div>
  <div class="ntrow">${GAMES.map(g=>`<button type="button" class="nti ngi" data-ngame="${g.id}" aria-label="${g.name}. ${g.desc}">${g.pic()}<small>${g.name}</small>${best[g.id]?`<span class="nbest">${fi('star',11)} ${best[g.id]}</span>`:''}</button>`).join('')}</div>`}

/* ---------- oyun çerçevesi ---------- */
let NG=null;
function gameOpen(id){
  if(YV.sleep){nestSay('Anka uyuyor. Önce onu uyandır.');return}
  stopMusic();closeTray();
  const sc=$('#nScene');if(!sc)return;
  const g=GAMES.find(x=>x.id===id);
  sc.insertAdjacentHTML('beforeend',`<div class="ngame" id="nGame" role="dialog" aria-label="${g.name}">
    <div class="nghud"><button type="button" class="nround" id="ngX" aria-label="Oyundan çık">${ic('x',20)}</button>
      <b class="ngname">${g.name}</b>
      ${id==='simon'?'':`<span class="nchip" title="Kalan süre">${ic('timer',16)}<b id="ngT">30</b></span>`}
      <span class="nchip" title="Puan">${fi('star',16)}<b id="ngS">0</b></span></div>
    <div class="ngplay" id="ngPlay"></div>
    <p class="nghint" id="ngHint"></p>
    <div class="ngend" id="ngEnd" hidden></div></div>`);
  NG={id,score:0,t0:0,left:30,raf:0,timer:0,over:false};
  $('#ngX').onclick=()=>gameClose();
  ({ball:ballGame,corn:cornGame,simon:simonGame})[id]();
}
function gameClose(){if(!NG)return;cancelAnimationFrame(NG.raf);clearInterval(NG.timer);if(NG.stop)NG.stop();NG=null;const e=$('#nGame');if(e)e.remove();nestBird(petMood(),'act-nod')}
function gameScore(d){NG.score=Math.max(0,NG.score+d);const s=$('#ngS');if(s){s.textContent=NG.score;s.parentElement.classList.remove('bump');void s.offsetWidth;s.parentElement.classList.add('bump')}}
function gameTimer(onEnd){NG.left=30;const t=$('#ngT');NG.timer=setInterval(()=>{if(!NG)return;NG.left--;if(t)t.textContent=NG.left;if(NG.left<=5&&NG.left>0)sfx.tick&&sfx.tick();if(NG.left<=0){clearInterval(NG.timer);onEnd()}},1000)}
function gameEnd(unit){
  if(!NG||NG.over)return;NG.over=true;cancelAnimationFrame(NG.raf);clearInterval(NG.timer);if(NG.stop)NG.stop();
  const id=NG.id,sc=NG.score,best=S.pet.best[id]||0,rec=sc>best;if(rec)S.pet.best[id]=sc;
  const joy=Math.min(25,6+sc*(id==='simon'?3:1));addJoy(joy);save();
  const e=$('#ngEnd');if(!e)return;e.hidden=false;
  e.innerHTML=`<div class="ngcard">${anka(sc>0?'cheer':'wow',110,undefined,'act-jump')}
    <h3>${rec&&sc>0?'Yeni rekor!':id==='simon'?'Oyun bitti!':'Süre doldu!'}</h3>
    <p><b>${sc}</b> ${unit}. ${best&&!rec?`En iyi skorun ${best}.`:''}</p>
    <p class="ngjoy">${fi('heart',16)} Anka'nın mutluluğu +${joy}</p>
    <div class="ngbtns"><button type="button" class="b3 ghost" id="ngHome">Yuvaya dön</button><button type="button" class="b3" id="ngAgain">Tekrar oyna</button></div></div>`;
  sfx.win();if(sc>0&&typeof confetti==='function'&&rec)confetti();
  $('#ngHome').onclick=()=>gameClose();
  $('#ngAgain').onclick=()=>{const k=NG.id;gameClose();gameOpen(k)};
}
/* Tuval: oyun alanının boyutunda, keskin görünmesi için piksel yoğunluğuna göre */
function gameCanvas(){
  const p=$('#ngPlay'),c=document.createElement('canvas');p.appendChild(c);
  const fit=()=>{const r=p.getBoundingClientRect(),d=Math.min(2.5,devicePixelRatio||1);c.width=r.width*d;c.height=r.height*d;c.style.width=r.width+'px';c.style.height=r.height+'px';
    const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);NG.W=r.width;NG.H=r.height};
  fit();return c}
function gameLoop(step){let last=performance.now();const f=now=>{if(!NG||NG.over)return;const dt=Math.min(.05,(now-last)/1000);last=now;step(dt);NG.raf=requestAnimationFrame(f)};NG.raf=requestAnimationFrame(f)}
function drawBg(x,W,H){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#F7E7C6');g.addColorStop(.72,'#EED3A0');g.addColorStop(.72,'#C9A26B');g.addColorStop(1,'#A8743F');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle='rgba(163,70,31,.08)';for(let i=0;i<W;i+=26)for(let j=0;j<H*.7;j+=26)if(((i+j)/26)%2===0)x.fillRect(i+3,j+3,20,20)}
function hearts(list,x,y,n){for(let i=0;i<n;i++)list.push({x,y,vx:(Math.random()-.5)*120,vy:-80-Math.random()*90,a:1,s:10+Math.random()*8})}
function drawHearts(x,list,dt){for(const h of list){h.x+=h.vx*dt;h.y+=h.vy*dt;h.vy+=60*dt;h.a-=dt*1.1;if(h.a<=0)continue;x.globalAlpha=Math.max(0,h.a);x.fillStyle='#B7372A';const s=h.s;x.beginPath();x.moveTo(h.x,h.y+s*.3);x.bezierCurveTo(h.x-s,h.y-s*.4,h.x-s*.4,h.y-s,h.x,h.y-s*.35);x.bezierCurveTo(h.x+s*.4,h.y-s,h.x+s,h.y-s*.4,h.x,h.y+s*.3);x.fill()}x.globalAlpha=1;for(let i=list.length-1;i>=0;i--)if(list[i].a<=0)list.splice(i,1)}

/* ---------- 1) Top Yakala ---------- */
function ballGame(){
  const c=gameCanvas(),x=c.getContext('2d');
  const im={happy:ankaImg('happy'),cheer:ankaImg('cheer'),wow:ankaImg('wow')};
  let mood='happy',moodT=0,ax=.5,aTarget=.5,aSpeed=.25;const hs=[];
  const ball={x:0,y:0,vx:0,vy:0,fly:false,r:24,spin:0};
  const reset=()=>{ball.x=NG.W/2;ball.y=NG.H-70;ball.vx=ball.vy=0;ball.fly=false;ball.spin=0};reset();
  $('#ngHint').textContent='Parmağını topun üstünden Anka\'ya doğru kaydırıp bırak!';
  let down=null;
  const pos=e=>{const r=c.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top,performance.now()]};
  c.onpointerdown=e=>{if(ball.fly)return;down=[pos(e)];c.setPointerCapture(e.pointerId)};
  c.onpointermove=e=>{if(down){down.push(pos(e));if(down.length>6)down.splice(1,1)}};
  c.onpointerup=e=>{if(!down||ball.fly){down=null;return}const p=pos(e),a=down.length>1?down[Math.max(0,down.length-4)]:down[0];down=null;
    let dx=p[0]-a[0],dy=p[1]-a[1];if(Math.hypot(dx,dy)<25){dx=p[0]-ball.x;dy=p[1]-ball.y}
    if(dy>-10){$('#ngHint').textContent='Yukarı, Anka\'ya doğru kaydır!';return}
    const L=Math.hypot(dx,dy),sp=NG.H*1.25;ball.vx=dx/L*sp;ball.vy=dy/L*sp;ball.fly=true;$('#ngHint').textContent='';sfx.tap()};
  gameTimer(()=>gameEnd('top yakaladın'));
  gameLoop(dt=>{const W=NG.W,H=NG.H,aw=Math.min(W*.42,H*.36),ay=H*.12;
    if(Math.abs(aTarget-ax)<.02)aTarget=.2+Math.random()*.6;ax+=Math.sign(aTarget-ax)*Math.min(Math.abs(aTarget-ax),aSpeed*dt);
    moodT-=dt;if(moodT<=0)mood='happy';
    if(ball.fly){ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;ball.spin+=dt*8;
      const catchY=ay+aw*.55,cx=ax*W;
      if(ball.y<=catchY){if(Math.abs(ball.x-cx)<aw*.42){gameScore(1);mood='cheer';moodT=1;hearts(hs,cx,catchY,5);sfx.ok();aSpeed=Math.min(.75,.25+NG.score*.04)}else{mood='wow';moodT=.8;sfx.bad()}reset()}
      else if(ball.x<-40||ball.x>W+40)reset()}
    drawBg(x,W,H);
    const ai=im[mood];if(imgReady(ai)){const h=aw*ai.naturalHeight/ai.naturalWidth;x.drawImage(ai,ax*W-aw/2,ay,aw,h)}
    const k=ball.fly?Math.max(.55,Math.min(1,(ball.y-ay)/(H-70-ay)*.5+.5)):1,r=ball.r*k;
    x.fillStyle='rgba(0,0,0,.15)';x.beginPath();x.ellipse(ball.x,(ball.fly?ball.y+r*1.6:H-70+r*.9),r*.9,r*.3,0,0,7);x.fill();
    x.save();x.translate(ball.x,ball.y);x.rotate(ball.spin);x.fillStyle='#FBF6EA';x.beginPath();x.arc(0,0,r,0,7);x.fill();
    x.fillStyle='#B7372A';x.beginPath();x.moveTo(0,0);x.arc(0,0,r,0,1.05);x.fill();x.fillStyle='#E8B53A';x.beginPath();x.moveTo(0,0);x.arc(0,0,r,2.1,3.15);x.fill();
    x.fillStyle='#4B5A3A';x.beginPath();x.moveTo(0,0);x.arc(0,0,r,4.2,5.25);x.fill();x.strokeStyle='#2F2E24';x.lineWidth=2;x.beginPath();x.arc(0,0,r,0,7);x.stroke();x.restore();
    drawHearts(x,hs,dt)});
}

/* ---------- 2) Mısır Topla ---------- */
function cornGame(){
  const c=gameCanvas(),x=c.getContext('2d');
  const ai=ankaImg('cheer'),corn=svgImg(foodIcon('misir',80)),
    gold=svgImg(foodIcon('misir',80).replace(/#E8B53A/g,'#F5C542').replace(/#F7D774/g,'#FFF3B0')),
    rock=svgImg('<svg width="80" height="80" viewBox="0 0 40 40"><path d="M6 28 L10 14 L22 8 L33 14 L35 28 L22 34 Z" fill="#7A7468"/><path d="M10 14 L22 8 L24 18 Z" fill="#9A9486"/></svg>'),
    bas=svgImg(`<svg width="160" height="100" viewBox="0 0 120 75"><path d="M6 20 H114 L102 72 H18 Z" fill="#A8743F"/><path d="M6 20 H114" stroke="#6E4824" stroke-width="7" stroke-linecap="round"/><path d="M24 34 H96 M28 48 H92 M32 62 H88" stroke="#8A5A2B" stroke-width="4"/></svg>`);
  let bx=.5;const items=[],hs=[];let spawn=0;
  $('#ngHint').textContent='Sepeti parmağınla sağa sola kaydır. Taşlardan kaç!';
  const mv=e=>{const r=c.getBoundingClientRect();bx=clamp((e.clientX-r.left)/r.width,.08,.92)};
  c.onpointerdown=e=>{mv(e);c.setPointerCapture(e.pointerId);$('#ngHint').textContent=''};c.onpointermove=e=>{if(e.buttons||e.pointerType!=='mouse')mv(e)};
  gameTimer(()=>gameEnd('mısır topladın'));
  let at=0;
  gameLoop(dt=>{const W=NG.W,H=NG.H,el=30-NG.left,aw=Math.min(W*.3,H*.22);at+=dt;
    const axp=W/2+Math.sin(at*1.3)*W*.3;
    spawn-=dt;if(spawn<=0){spawn=Math.max(.38,.95-el*.02);const r=Math.random(),k=r<.16?'rock':r<.26?'gold':'corn';
      items.push({k,x:axp,y:H*.17,vx:(Math.random()-.5)*W*.35,vy:-60,rot:Math.random()*6,vr:(Math.random()-.5)*5})}
    const bw=Math.min(W*.3,150),bh=bw*.62,bxp=bx*W,by=H-bh-14;
    drawBg(x,W,H);
    if(imgReady(ai)){const h=aw*ai.naturalHeight/ai.naturalWidth;x.drawImage(ai,axp-aw/2,H*.02,aw,h)}
    for(let i=items.length-1;i>=0;i--){const it=items[i];it.vy+=(260+el*9)*dt;it.x+=it.vx*dt;it.y+=it.vy*dt;it.rot+=it.vr*dt;
      if(it.x<20||it.x>W-20)it.vx*=-1;
      if(it.y>by&&it.y<by+bh*.5&&Math.abs(it.x-bxp)<bw*.48){items.splice(i,1);
        if(it.k==='rock'){gameScore(-2);sfx.bad();if(navigator.vibrate&&S.vib)try{navigator.vibrate(30)}catch(e){}}else{gameScore(it.k==='gold'?3:1);hearts(hs,bxp,by,it.k==='gold'?4:1);(it.k==='gold'?sfx.coin:sfx.tick||sfx.tap)()}continue}
      if(it.y>H+40){items.splice(i,1);continue}
      const im=it.k==='rock'?rock:it.k==='gold'?gold:corn,s=it.k==='rock'?38:44;
      if(imgReady(im)){x.save();x.translate(it.x,it.y);x.rotate(it.rot);x.drawImage(im,-s/2,-s/2,s,s);x.restore()}}
    if(imgReady(bas))x.drawImage(bas,bxp-bw/2,by,bw,bh);
    drawHearts(x,hs,dt)});
}

/* ---------- 3) Sırayı Tekrarla ---------- */
function simonGame(){
  const P=$('#ngPlay'),COL=[['#D9822B','Turuncu',523],['#4B5A3A','Yeşil',659],['#B7372A','Kırmızı',784],['#E8B53A','Sarı',1047]];
  P.innerHTML=`<div class="nsimon"><div class="nsbird" id="nsBird">${anka('think',150)}</div>
    <div class="nspad">${COL.map((c,i)=>`<button type="button" class="nsb" data-si="${i}" style="--c:${c[0]}" aria-label="${c[1]}"></button>`).join('')}</div></div>`;
  const seq=[];let pos=0,busy=true;
  const say=t=>{$('#ngHint').textContent=t},bird=(m,a)=>{const b=$('#nsBird');if(b)b.innerHTML=anka(m,150,undefined,a||'')};
  const lit=(i,ms)=>{const b=P.querySelector(`[data-si="${i}"]`);if(!b)return;b.classList.add('lit');tone([[COL[i][2],ms/1000*.9]],'triangle',.14);setTimeout(()=>b&&b.classList.remove('lit'),ms)};
  const play=async()=>{busy=true;bird('think');say('Anka gösteriyor… İyi bak!');await sleep(700);
    const ms=Math.max(260,520-seq.length*25);for(const i of seq){if(!NG||NG.over)return;lit(i,ms);await sleep(ms+140)}
    if(!NG||NG.over)return;busy=false;pos=0;bird('happy');say('Şimdi sen! Aynı sırayla dokun.')};
  const next=()=>{seq.push(Math.random()*4|0);play()};
  P.onclick=e=>{const b=e.target.closest('[data-si]');if(!b||busy||!NG||NG.over)return;const i=+b.dataset.si;lit(i,220);
    if(i!==seq[pos]){busy=true;sfx.bad();bird('wow','act-shake');say(`Ah! Sıradaki ${COL[seq[pos]][1].toLowerCase()} olacaktı.`);setTimeout(()=>gameEnd('tur tamamladın'),1100);return}
    pos++;if(pos===seq.length){busy=true;gameScore(1);sfx.ok();bird('cheer','act-jump');say(pickL(['Harika!','Süper hafıza!','Aynen öyle!']));setTimeout(next,900)}};
  NG.stop=()=>{P.onclick=null};
  next();
}

/* ---------- Fotoğraf ---------- */
async function nestPhoto(){
  if(YV.busy)return;closeTray();sfx.tap();
  const sc=$('#nScene');if(!sc)return;
  sc.insertAdjacentHTML('beforeend','<div class="nflash" aria-hidden="true"></div>');setTimeout(()=>{const f=$('#nScene .nflash');if(f)f.remove()},600);
  tone([[1800,.03],[900,.05]],'square',.06);
  const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  try{await Promise.all([document.fonts.load('700 64px "Zilla Slab"'),document.fonts.load('800 28px Manrope')])}catch(e){}
  const mood=S.pet.food>=60&&S.pet.joy>=60?'love':'happy',ai=ankaImg(mood),ni=svgImg(NEST_SVG);
  await Promise.all([ai,ni].map(i=>i.decode?i.decode().catch(()=>{}):new Promise(r=>{i.onload=r;i.onerror=r})));
  /* çerçeve */
  x.fillStyle='#FBF6EA';x.fillRect(0,0,W,H);
  const px=56,py=56,pw=W-112,ph=H-300;
  const g=x.createLinearGradient(0,py,0,py+ph);g.addColorStop(0,'#F7E7C6');g.addColorStop(.74,'#EED3A0');g.addColorStop(.74,'#C9A26B');g.addColorStop(1,'#A8743F');
  x.fillStyle=g;x.fillRect(px,py,pw,ph);
  x.save();x.beginPath();x.rect(px,py,pw,ph);x.clip();
  x.fillStyle='rgba(163,70,31,.09)';for(let i=px;i<px+pw;i+=48)for(let j=py;j<py+ph*.74;j+=48)if(((i-px+j-py)/48)%2===0)x.fillRect(i+5,j+5,38,38);
  /* mozaik şeritler */
  const tc=['#D9822B','#4B5A3A','#B7372A','#E8B53A'];for(let i=0;i<pw/30;i++){x.fillStyle=tc[i%4];x.fillRect(px+i*30+3,py+ph*.74-34,24,24)}
  const nw=pw*.86,nh=nw*96/300;if(imgReady(ni))x.drawImage(ni,W/2-nw/2,py+ph-nh-30,nw,nh);
  const aw=pw*.66;if(imgReady(ai)){const ah=aw*ai.naturalHeight/ai.naturalWidth;x.drawImage(ai,W/2-aw/2,py+ph-nh-ah+nh*.42,aw,ah)}
  x.restore();
  x.strokeStyle='#2F2E24';x.lineWidth=6;x.strokeRect(px,py,pw,ph);
  /* yazılar */
  x.textAlign='center';x.fillStyle='#2F2E24';x.font='700 76px "Zilla Slab", Georgia, serif';
  x.fillText('Anka',W/2,py+ph+100);
  x.fillStyle='#A3461F';x.font='800 34px Manrope, system-ui, sans-serif';x.fillText('#BilimKıvılcımı',W/2,py+ph+152);
  const d=new Date();x.fillStyle='#4A463A';x.font='600 26px Manrope, system-ui, sans-serif';
  x.fillText(`Antioch Rising #10947 · ${d.toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'})}`,W/2,py+ph+200);
  const url=c.toDataURL('image/png');
  photoSheet(url);
  nestBird('cheer','act-spin');nestSay(pickL(['Gülümse! Çok güzel çıktım, değil mi?','Bu fotoğrafı herkese göster!','Kanatlarım çok havalı çıktı!']));addJoy(2);
}
function photoSheet(url){
  const sc=$('#nScene');const old=$('#nPhoto');if(old)old.remove();
  const native=!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform());
  sc.insertAdjacentHTML('beforeend',`<div class="nphoto" id="nPhoto" role="dialog" aria-label="Anka'nın fotoğrafı"><div class="npcard">
    <img src="${url}" alt="Anka'nın yuvasında çekilmiş fotoğrafı">
    <div class="ngbtns"><button type="button" class="b3 ghost" id="npX">Kapat</button>
    ${native?'':`<a class="b3 ghost" id="npDl" href="${url}" download="Anka-${dkey()}.png">${ic('download',18)} İndir</a>`}
    <button type="button" class="b3" id="npShare">${ic('share',18)} ${native?'Kaydet / Paylaş':'Paylaş'}</button></div></div></div>`);
  $('#npX').onclick=()=>$('#nPhoto').remove();
  $('#npShare').onclick=()=>sharePhoto(url);
  if(!native&&!(navigator.canShare&&navigator.canShare({files:[new File([new Blob()],'a.png',{type:'image/png'})]})))$('#npShare').hidden=true;
}
async function sharePhoto(url){
  const name=`Anka-${dkey()}.png`,text='Anka\'m #BilimKıvılcımı yuvasında! @antiochrising #10947';
  try{
    const P=window.Capacitor&&Capacitor.Plugins;
    if(P&&P.Filesystem&&P.Share){const w=await P.Filesystem.writeFile({path:name,data:url.split(',')[1],directory:'CACHE'});
      await P.Share.share({title:'Anka\'nın fotoğrafı',text,files:[w.uri],dialogTitle:'Kaydet ya da paylaş'});return}
    const b=await (await fetch(url)).blob(),f=new File([b],name,{type:'image/png'});
    await navigator.share({files:[f],title:'Anka\'nın fotoğrafı',text});
  }catch(e){if(e&&e.name!=='AbortError'&&!/cancel/i.test(String(e&&e.message)))toast('Paylaşılamadı. Fotoğrafı İndir ile kaydedebilirsin.')}
}

/* ---------- tıklamalar ---------- */
document.addEventListener('click',e=>{
  if(!e.target.closest('#pgNest'))return;
  const t=e.target.closest('[data-nobj="games"]');
  if(t){e.stopPropagation();if(YV.sleep){nestSay('Anka uyuyor. Önce pencereye dokunup uyandır.');return}
    if(YV.tray==='games'){closeTray();return}YV.tray='games';sfx.tap();gamesTray();nestSay('Hangi oyunu oynayalım?');return}
  const g=e.target.closest('[data-ngame]');if(g){e.stopPropagation();sfx.tap();gameOpen(g.dataset.ngame);return}
  if(e.target.closest('#nCam')){e.stopPropagation();if(YV.sleep){nestSay('Uyurken fotoğraf çekme, flaş beni uyandırır!');return}nestPhoto();return}
},true);
addEventListener('hashchange',()=>{if(location.hash!=='#yuva'&&NG)gameClose()});
