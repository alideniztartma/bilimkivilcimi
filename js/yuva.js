/* #BilimKıvılcımı · Anka'nın yuvası: besle, giydir, sev. Mağazadan alınan yiyecekler ve giysiler burada kullanılır. */
'use strict';

const FOODS=()=>SHOP.filter(i=>i.food),WEARS=()=>SHOP.filter(i=>i.cos);
/* Küçük yiyecek resimleri */
function foodIcon(id,s){s=s||40;const v={
  misir:`<ellipse cx="20" cy="22" rx="9" ry="15" fill="#E8B53A" transform="rotate(20 20 22)"/>${[[16,12],[21,13],[14,18],[19,19],[24,19],[16,24],[21,25],[18,30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.4" fill="#F7D774"/>`).join('')}<path d="M10 30 C 4 26 4 18 8 12 C 10 20 14 26 18 30 Z" fill="#7C8F5A"/><path d="M30 32 C 36 26 36 18 32 12 C 30 20 26 26 22 30 Z" fill="#6B7F50"/>`,
  elma:`<path d="M6 26 A 14 14 0 0 1 34 26 Z" fill="#B7372A"/><path d="M9 26 A 11 11 0 0 1 31 26 Z" fill="#F4E3BE"/><path d="M17 22 l1.5 -3 l1.5 3 z M22 22 l1.5 -3 l1.5 3 z" fill="#5C3A1E"/>`,
  nar:`<circle cx="20" cy="23" r="13" fill="#B7372A"/><path d="M15 11 L17 6 L20 10 L23 6 L25 11 Z" fill="#8E2B22"/><circle cx="15" cy="19" r="3" fill="#E8776A" opacity=".7"/><path d="M12 30 Q20 35 28 30" stroke="#8E2B22" stroke-width="2" fill="none"/>`,
  kunefe:`<rect x="5" y="14" width="30" height="16" rx="3" fill="#D9822B"/><rect x="5" y="14" width="30" height="5" rx="2" fill="#E8B53A"/>${[[10,16],[16,15],[22,16],[28,15],[13,18],[25,18]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="#7C8F5A"/>`).join('')}<path d="M5 26 H35" stroke="#F7DDA6" stroke-width="2.5"/>`};
  return `<svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">${v[id]||''}</svg>`}
const NEST_SVG=(()=>{SEED=23;let tw='';for(let i=0;i<34;i++){const x=10+srnd()*280,y=34+srnd()*44,l=40+srnd()*60,a=(srnd()-.5)*.5;tw+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)} l${(l*Math.cos(a)).toFixed(1)} ${(l*Math.sin(a)).toFixed(1)}" stroke="${['#6E4824','#A8743F','#C9A26B','#8A5A2B'][i%4]}" stroke-width="${(3+srnd()*3).toFixed(1)}" stroke-linecap="round"/>`}
  return `<svg class="nnest" viewBox="0 0 300 96" aria-hidden="true"><path d="M6 36 Q150 10 294 36 Q290 92 150 94 Q10 92 6 36 Z" fill="#8A5A2B"/>${tw}<path d="M6 36 Q150 58 294 36" stroke="#5C3A1E" stroke-width="5" fill="none" opacity=".5"/></svg>`})();

const YV={tray:null,slot:'head',sleep:false,busy:false,pet:0,music:false,drag:null};
function petTick(){const p=S.pet,now=Date.now(),h=(now-(p.t||now))/3.6e6;if(h>.02){p.food=Math.max(0,p.food-h*4);p.joy=Math.max(0,p.joy-h*3);p.t=now}else if(!p.t)p.t=now}
function petMood(){const p=S.pet;if(YV.sleep)return'sleep';if(p.food<25||p.joy<20)return'sad';if(p.food>=75&&p.joy>=75)return'love';return'happy'}
function petLine(){const p=S.pet;if(YV.sleep)return'Zzz… Uyandırmak için pencereye dokun.';
  if(p.food<25)return'Karnım guruldadı… Sepetten bir şey getirir misin?';if(p.joy<20)return'Biraz oynayalım mı? Beni okşar mısın?';
  if(p.food>=75&&p.joy>=75)return pickL(['Yuvam sıcacık, karnım tok. Çok mutluyum!','Kanatlarım mutluluktan titriyor!','Bugün harika bir gün!']);
  return pickL(['Yuvama hoş geldin!','Sepete dokun, birlikte yiyelim.','Dolaba bak, bana bir şey giydir!','Radyoyu açarsan dans ederim!'])}
const friendLv=()=>1+Math.floor(((S.pet.fed||0)+(S.pet.pets||0)/12)/6);
function nestBird(mood,act){const b=$('#nBird');if(!b)return;b.innerHTML=anka(mood||petMood(),260,undefined,act||'')}
function nestSay(t){const e=$('#nSay');if(!e)return;e.textContent=t;e.classList.remove('spop');void e.offsetWidth;e.classList.add('spop')}
function nestBars(){const p=S.pet,f=$('#nFood'),j=$('#nJoy');if(f)f.style.width=p.food+'%';if(j)j.style.width=p.joy+'%';
  const l=$('#nLv');if(l)l.textContent=friendLv();const g=$('#nGem');if(g)g.textContent=S.gems;
  const c=$('#nBasketN');if(c){const n=Object.values(p.inv).reduce((a,b)=>a+(b||0),0);c.textContent=n;c.hidden=!n}}
const OBJ_SVG={
  basket:`<svg viewBox="0 0 120 90"><ellipse cx="60" cy="82" rx="52" ry="7" fill="rgba(0,0,0,.18)"/><circle cx="40" cy="34" r="14" fill="#B7372A"/><circle cx="62" cy="28" r="15" fill="#B7372A"/><path d="M56 14 L58 8 L62 12 L66 8 L68 14 Z" fill="#8E2B22"/><circle cx="82" cy="36" r="12" fill="#E8B53A"/><path d="M42 21 q4 -8 10 -6" stroke="#4B5A3A" stroke-width="3" fill="none"/><path d="M10 40 H110 L98 80 H22 Z" fill="#A8743F"/><path d="M14 52 H106 M18 64 H102" stroke="#6E4824" stroke-width="3"/><path d="M30 40 L36 80 M50 40 L52 80 M70 40 L68 80 M90 40 L84 80" stroke="#6E4824" stroke-width="2.5"/><path d="M10 40 H110" stroke="#6E4824" stroke-width="5" stroke-linecap="round"/></svg>`,
  wardrobe:`<svg viewBox="0 0 110 170"><ellipse cx="55" cy="164" rx="48" ry="6" fill="rgba(0,0,0,.18)"/><rect x="8" y="10" width="94" height="148" rx="6" fill="#8A5A2B"/><rect x="4" y="4" width="102" height="12" rx="4" fill="#6E4824"/><rect x="15" y="22" width="38" height="128" rx="3" fill="#A8743F"/><rect x="57" y="22" width="38" height="128" rx="3" fill="#A8743F"/><circle cx="49" cy="88" r="3.5" fill="#EBC27A"/><circle cx="61" cy="88" r="3.5" fill="#EBC27A"/><path d="M22 34 h24 M22 40 h24 M64 34 h24 M64 40 h24" stroke="#C9A26B" stroke-width="2"/><path d="M60 -2 L88 -14 L100 -2 Z" fill="#D9822B" stroke="#2F2E24" stroke-width="2"/></svg>`,
  radio:`<svg viewBox="0 0 110 100"><ellipse cx="55" cy="94" rx="46" ry="6" fill="rgba(0,0,0,.18)"/><path d="M30 26 L70 4" stroke="#2F2E24" stroke-width="3" stroke-linecap="round"/><circle cx="70" cy="4" r="3.5" fill="#2F2E24"/><rect x="8" y="24" width="94" height="64" rx="12" fill="#A3461F"/><rect x="16" y="32" width="46" height="48" rx="8" fill="#6F3420"/>${[0,1,2,3].map(r=>[0,1,2,3].map(c=>`<circle cx="${23+c*11}" cy="${39+r*11}" r="3" fill="#C4602F"/>`).join('')).join('')}<rect x="68" y="34" width="26" height="14" rx="3" fill="#F1E8D0"/><path d="M74 36 V46" stroke="#D9822B" stroke-width="2"/><circle cx="74" cy="64" r="7" fill="#EBC27A" stroke="#2F2E24" stroke-width="2"/><circle cx="90" cy="64" r="5" fill="#EBC27A" stroke="#2F2E24" stroke-width="2"/></svg>`};
function renderNest(){
  petTick();const p=S.pet,night=(()=>{const h=new Date().getHours();return h>=21||h<6})();YV.tray=null;YV.music=false;
  $('#pgNest').innerHTML=`<div class="nest ${night?'night':''} ${YV.sleep?'sleeping':''}"><div class="nscene" id="nScene">
    <div class="nwall" aria-hidden="true"></div><div class="nfloor" aria-hidden="true"></div>
    <button type="button" class="nobj nwin" data-nobj="window" aria-label="${YV.sleep?'Uyandır':'Uyut'}: perdeyi aç ya da kapat"><svg viewBox="0 0 120 120"><defs><clipPath id="nwc"><circle cx="60" cy="60" r="54"/></clipPath></defs><g clip-path="url(#nwc)"><rect width="120" height="120" fill="${night?'#1E2436':'#F2D9A6'}"/>${night?'<circle cx="84" cy="34" r="12" fill="#F1E8D0"/><circle cx="30" cy="26" r="1.5" fill="#F1E8D0"/><circle cx="52" cy="18" r="1.2" fill="#F1E8D0"/>':'<circle cx="84" cy="36" r="14" fill="#F2B451"/>'}<path d="M0 86 L20 66 L38 78 L60 54 L82 74 L100 62 L120 76 V120 H0 Z" fill="${night?'#2F3A28':'#7C8F5A'}"/><path d="M0 96 Q30 84 60 94 T120 92 V120 H0 Z" fill="${night?'#232B1D':'#4B5A3A'}"/><rect class="ncurt" x="0" y="0" width="120" height="120" fill="#6F3420"/></g><circle cx="60" cy="60" r="54" fill="none" stroke="#6E4824" stroke-width="8"/><path d="M60 6 V114 M6 60 H114" stroke="#6E4824" stroke-width="5"/></svg><span class="nlab">${YV.sleep?'Uyandır':'Uyut'}</span></button>
    <div class="nhud">
      <button type="button" class="nround" id="nBack" aria-label="Geri">${ic('rotL',22)}</button>
      <div class="nmeters"><div class="nmeter" title="Tokluk"><span class="nmi">${foodIcon('elma',22)}</span><div class="nmb"><i id="nFood" style="width:${p.food}%"></i></div></div>
        <div class="nmeter joy" title="Mutluluk"><span class="nmi">${fi('heart',18)}</span><div class="nmb"><i id="nJoy" style="width:${p.joy}%"></i></div></div></div>
      <div class="nchips"><span class="nchip" title="Dostluk seviyesi">${ic('star',16)}<b id="nLv">${friendLv()}</b></span><span class="nchip gem" title="Mozaik taşı">${fi('gem',16)}<b id="nGem">${S.gems}</b></span></div>
    </div>
    <p class="nsay" id="nSay" aria-live="polite">${esc(petLine())}</p>
    <button type="button" class="nobj nwd" data-nobj="wear" aria-label="Dolap: Anka'yı giydir">${OBJ_SVG.wardrobe}<span class="nlab">Dolap</span></button>
    <button type="button" class="nobj nrad" data-nobj="music" aria-label="Radyo: müzik aç, Anka dans etsin">${OBJ_SVG.radio}<span class="nlab">Müzik</span><span class="nnotes" aria-hidden="true"></span></button>
    <div class="nbird" id="nBird" role="button" tabindex="0" aria-label="Anka. Okşamak için dokun ya da parmağını üzerinde gezdir.">${anka(petMood(),260,undefined,'act-enter')}</div>
    ${NEST_SVG}
    <button type="button" class="nobj nbas" data-nobj="food" aria-label="Sepet: Anka'yı besle">${OBJ_SVG.basket}<span class="ncnt" id="nBasketN"></span><span class="nlab">Sepet</span></button>
    <div class="ntray" id="nTray" hidden></div>
    <div class="nfx" id="nFx" aria-hidden="true"></div>
  </div></div>`;
  nestBars();
  $('#nBack').onclick=()=>{if(history.length>1)history.back();else location.hash='#ogren'};
  const bird=$('#nBird');let last=null,acc=0;
  bird.addEventListener('pointermove',e=>{if(YV.busy||YV.sleep||YV.drag)return;if(e.pointerType==='mouse'&&!e.buttons)return;const q=[e.clientX,e.clientY];if(last)acc+=Math.hypot(q[0]-last[0],q[1]-last[1]);last=q;if(acc>34){acc=0;stroke(e.clientX,e.clientY)}});
  bird.addEventListener('pointerleave',()=>{last=null});
  bird.addEventListener('click',e=>{if(YV.busy)return;if(YV.sleep){wake();return}closeTray();heartsAt(e.clientX,e.clientY,4);addJoy(3,false);if(Math.random()<.45)nestSay(pickL(['Hihi!','Teşekkürler!','Bir daha!','Mutluluktan uçacağım!']))});
  bird.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const r=bird.getBoundingClientRect();heartsAt(r.left+r.width/2,r.top+r.height/2,4);addJoy(3,false)}});
}
function heartsAt(x,y,n,cls){const fx=$('#nFx');if(!fx||reduce)return;const r=fx.getBoundingClientRect();for(let i=0;i<(n||1);i++){const h=document.createElement('span');h.className=cls||'nh';h.innerHTML=cls==='nnote'?pick(['♪','♫','♬']):fi('heart',18+Math.random()*12|0);
  h.style.left=(x-r.left+(Math.random()-.5)*40)+'px';h.style.top=(y-r.top+(Math.random()-.5)*20)+'px';h.style.setProperty('--dx',((Math.random()-.5)*70)+'px');h.style.animationDelay=(i*.08)+'s';fx.appendChild(h);setTimeout(()=>h.remove(),1700)}}
function stroke(x,y){heartsAt(x,y,1);YV.pet++;if(YV.pet%4===0){addJoy(2,false);if(YV.pet%12===0){nestBird('love','act-wiggle');sfx.chirp();nestSay(pickL(['Hihi, gıdıklanıyorum!','Çok güzel okşuyorsun!','Tüylerim parlıyor!']))}}}
function addJoy(n){const p=S.pet;p.joy=Math.min(100,p.joy+n);p.pets=(p.pets||0)+1;p.t=p.t||Date.now();save();nestBars()}
function setSleep(on){YV.sleep=on;const n=$('#pgNest .nest');if(n)n.classList.toggle('sleeping',on);const w=$('#pgNest .nwin .nlab');if(w)w.textContent=on?'Uyandır':'Uyut';
  if(on){stopMusic();closeTray();nestBird('sleep');nestSay('İyi geceler… Zzz…')}else{nestBird(petMood(),'act-jump');nestSay('Günaydın! Ne güzel uyudum.');sfx.chirp()}}
function wake(){setSleep(false)}
let musicT=null;
function stopMusic(){YV.music=false;clearInterval(musicT);const r=$('#pgNest .nrad');if(r)r.classList.remove('on')}
function toggleMusic(){if(YV.sleep){nestSay('Şşş… Anka uyuyor.');return}if(YV.music){stopMusic();nestBird(petMood(),'act-nod');nestSay('Ne güzel danstı!');return}
  YV.music=true;$('#pgNest .nrad').classList.add('on');closeTray();nestBird('cheer','act-dance');sfx.win();nestSay('Hadi dans edelim!');addJoy(5);
  const notes=()=>{const r=$('#pgNest .nrad');if(!r||!YV.music){stopMusic();return}const b=r.getBoundingClientRect();heartsAt(b.left+b.width/2,b.top+10,2,'nnote');const s=$('#nBird svg.anka');if(s&&!YV.busy)ankaAct(s,pick(['dance','wiggle','jump','spin']))};
  notes();musicT=setInterval(notes,1300);setTimeout(()=>{if(YV.music)stopMusic()},12000)}
function feed(id,from){const it=SHOP.find(i=>i.id===id),p=S.pet;if(YV.busy||!it)return;if(YV.sleep){nestSay('Anka uyuyor. Önce onu uyandır.');return}
  if(!(p.inv[id]>0)){nestSay('Bundan hiç kalmadı.');return}
  if(p.food>=96){nestSay('Doydum, teşekkürler! Biraz sonra yerim.');nestBird('happy','act-nod');return}
  YV.busy=true;p.inv[id]--;save();trayRender();
  const fx=$('#nFx'),bird=$('#nBird');if(fx&&bird&&!reduce){const r=fx.getBoundingClientRect(),b=bird.getBoundingClientRect(),f=document.createElement('span');f.className='nfood';f.innerHTML=foodIcon(id,56);
    const tx=b.left-r.left+b.width/2-28,ty=b.top-r.top+b.height*.42;f.style.left=tx+'px';f.style.top=ty+'px';
    if(from){f.style.setProperty('--fx',(from[0]-r.left-28-tx)+'px');f.style.setProperty('--fy',(from[1]-r.top-28-ty)+'px');f.classList.add('from')}
    fx.appendChild(f);setTimeout(()=>f.remove(),900)}
  setTimeout(()=>{nestBird('eat');sfx.tick();setTimeout(()=>sfx.tick(),220);setTimeout(()=>sfx.tick(),440);
    nestSay({misir:'Tık tık tık, ne lezzetli!',elma:'Çıtır çıtır! Bayıldım.',nar:'Hatay narı! Mmm, çok sulu!',kunefe:'Künefe! Bayram gibi oldu!'}[id]||'Mmm!')},reduce?0:600);
  setTimeout(()=>{p.food=Math.min(100,p.food+it.food.t);p.joy=Math.min(100,p.joy+it.food.j);p.fed=(p.fed||0)+1;p.t=p.t||Date.now();save();nestBars();
    nestBird(p.food>=75&&p.joy>=75?'love':'cheer','act-jump');sfx.ok();YV.busy=false;
    const b=$('#nBird');if(b){const r=b.getBoundingClientRect();heartsAt(r.left+r.width/2,r.top+r.height*.3,3)}},reduce?300:1900)}
function buyItem(id,inNest){const it=SHOP.find(i=>i.id===id);if(!it||S.gems<it.price){if(inNest){nestSay('Bunun için '+(it?it.price:'')+' mozaik taşı lazım. Ders yaparak taş kazanabilirsin!');nestBird('sad');sfx.bad();return false}toast(fi('gem',20)+' Yeterli mozaik taşın yok. Ders yaparak taş kazanabilirsin.');sfx.bad();return false}
  S.gems-=it.price;if(it.food)S.pet.inv[id]=(S.pet.inv[id]||0)+1;else if(it.cos){S.owned[id]=1;S.wear[it.slot]=id}save();sfx.coin();renderStats();nestBars();return true}
function openTray(k){if(YV.sleep){nestSay('Anka uyuyor. Önce pencereye dokunup uyandır.');return}if(YV.tray===k){closeTray();return}YV.tray=k;sfx.tap();trayRender();
  nestSay(k==='food'?'Bir yiyeceği bana sürükle ya da dokun!':'Hangisini giyeyim?')}
function closeTray(){YV.tray=null;const t=$('#nTray');if(t){t.hidden=true;t.innerHTML=''}$$('#pgNest .nobj').forEach(o=>o.classList.remove('on'))}
function trayRender(){const t=$('#nTray');if(!t||!YV.tray)return;const p=S.pet;t.hidden=false;
  $$('#pgNest .nobj').forEach(o=>o.classList.toggle('on',o.dataset.nobj===YV.tray));
  if(YV.tray==='food'){t.innerHTML=`<div class="nth"><b>Sepet</b><span>Sürükle ya da dokun</span><button type="button" class="nx" data-nclose aria-label="Kapat">${ic('x',18)}</button></div><div class="ntrow">${FOODS().map(f=>{const n=p.inv[f.id]||0;
      return `<button type="button" class="nti ${n?'':'empty'}" ${n?`data-food="${f.id}"`:`data-nbuy="${f.id}"`} aria-label="${f.name}${n?', '+n+' tane':', satın al '+f.price+' taş'}">${foodIcon(f.id,54)}${n?`<span class="ncnt">${n}</span>`:`<span class="nprice">${fi('gem',12)}${f.price}</span>`}<small>${f.name}</small></button>`}).join('')}</div>`}
  else{t.innerHTML=`<div class="nth"><b>Dolap</b><span class="nslots">${Object.entries(SLOTS).map(([k,n])=>`<button type="button" data-nslot="${k}" aria-pressed="${YV.slot===k}">${n}</button>`).join('')}</span><button type="button" class="nx" data-nclose aria-label="Kapat">${ic('x',18)}</button></div><div class="ntrow">${WEARS().filter(w=>w.slot===YV.slot).map(w=>{const own=S.owned[w.id],on=S.wear[w.slot]===w.id;
      return `<button type="button" class="nti ${own?'':'empty'} ${on?'on':''}" ${own?`data-wear="${w.id}"`:`data-nbuy="${w.id}"`} aria-pressed="${on}" aria-label="${w.name}${own?(on?', takılı':''):', satın al '+w.price+' taş'}">${anka('happy',58,w.id)}${own?(on?`<span class="ncnt">${ic('check',12)}</span>`:''):`<span class="nprice">${fi('gem',12)}${w.price}</span>`}<small>${w.name}</small></button>`}).join('')}</div>`}}
/* yiyecek sürükleme */
document.addEventListener('pointerdown',e=>{const f=e.target.closest('#pgNest [data-food]');if(!f||YV.busy)return;YV.drag={id:f.dataset.food,x0:e.clientX,y0:e.clientY,moved:false,el:null}});
document.addEventListener('pointermove',e=>{const d=YV.drag;if(!d)return;if(!d.moved&&Math.hypot(e.clientX-d.x0,e.clientY-d.y0)>8){d.moved=true;d.el=document.createElement('div');d.el.className='ndrag';d.el.innerHTML=foodIcon(d.id,64);document.body.appendChild(d.el);const b=$('#nBird');if(b)b.classList.add('want')}
  if(d.el){d.el.style.left=e.clientX+'px';d.el.style.top=e.clientY+'px';const b=$('#nBird');if(b){const r=b.getBoundingClientRect();b.classList.toggle('over',e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top&&e.clientY<r.bottom)}}});
document.addEventListener('pointerup',e=>{const d=YV.drag;if(!d)return;YV.drag=null;const b=$('#nBird');if(b)b.classList.remove('want','over');if(d.el)d.el.remove();
  if(!d.moved){feed(d.id);return}const r=b&&b.getBoundingClientRect();if(r&&e.clientX>r.left-20&&e.clientX<r.right+20&&e.clientY>r.top-20&&e.clientY<r.bottom+20)feed(d.id,[e.clientX,e.clientY]);else nestSay('Ağzıma kadar getir!')});
document.addEventListener('pointercancel',()=>{const d=YV.drag;if(d&&d.el)d.el.remove();YV.drag=null});
document.addEventListener('click',e=>{
  if(!e.target.closest('#pgNest'))return;
  const o=e.target.closest('[data-nobj]');if(o){const k=o.dataset.nobj;if(k==='window'){sfx.tap();setSleep(!YV.sleep);return}if(k==='music'){toggleMusic();return}openTray(k);return}
  if(e.target.closest('[data-nclose]')){closeTray();return}
  const sl=e.target.closest('[data-nslot]');if(sl){YV.slot=sl.dataset.nslot;sfx.tap();trayRender();return}
  const b=e.target.closest('[data-nbuy]');if(b){const it=SHOP.find(i=>i.id===b.dataset.nbuy);if(buyItem(it.id,true)){if(it.cos){nestBird('wow','act-spin');nestSay('Yeni bir şey mi? Hemen giyiyorum!')}else nestSay(it.name+' sepete eklendi!');trayRender()}return}
  const w=e.target.closest('[data-wear]');if(w){const it=SHOP.find(i=>i.id===w.dataset.wear);S.wear[it.slot]=S.wear[it.slot]===it.id?null:it.id;save();sfx.tap();
    nestBird(S.wear[it.slot]?'wow':'happy','act-spin');nestSay(S.wear[it.slot]?pickL(['Nasıl görünüyorum?','Bu bana çok yakıştı!','Şimdi çok havalıyım!']):'Tamam, onu çıkardım.');trayRender();return}
  if(YV.tray&&!e.target.closest('#nTray'))closeTray();
});
addEventListener('hashchange',()=>{if(location.hash!=='#yuva'){stopMusic();YV.drag=null}});
/* Yuvanın dışında Anka'ya dokununca yuva açılır (ders, pencere, oyun ve mağaza hariç) */
function openNestFrom(el){if(!el||el.closest('#lesson,#modal,[data-page="yuva"],#pgShop,.gtip,.gov,.fpick,.item'))return;setTimeout(()=>{if(location.hash!=='#yuva')location.hash='#yuva'},420)}
