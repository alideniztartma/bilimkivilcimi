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

const YV={tab:'besle',sleep:false,busy:false,pet:0,lastPet:0};
function petTick(){const p=S.pet,now=Date.now(),h=(now-(p.t||now))/3.6e6;if(h>.02){p.food=Math.max(0,p.food-h*4);p.joy=Math.max(0,p.joy-h*3);p.t=now}else if(!p.t)p.t=now}
function petMood(){const p=S.pet;if(YV.sleep)return'sleep';if(p.food<25||p.joy<20)return'sad';if(p.food>=75&&p.joy>=75)return'love';return'happy'}
function petLine(){const p=S.pet;if(YV.sleep)return'Zzz… Anka uyuyor. Uyandırmak için Sev bölmesine bak.';
  if(p.food<25)return'Karnım guruldadı… Bana bir şey yedirir misin?';if(p.joy<20)return'Biraz oynayalım mı? Beni okşar mısın?';
  if(p.food>=75&&p.joy>=75)return pickL(['Yuvam sıcacık, karnım tok. Çok mutluyum!','Kanatlarım mutluluktan titriyor!','Bugün harika bir gün!']);
  return pickL(['Yuvama hoş geldin!','Burada çok rahatım.','Beni giydirmek ister misin?','Biraz atıştırmalık fena olmaz.'])}
const friendLv=()=>1+Math.floor(((S.pet.fed||0)+(S.pet.pets||0)/12)/6);
function nestBird(mood,act){const b=$('#nBird');if(!b)return;b.innerHTML=anka(mood||petMood(),230,undefined,act||'');}
function nestSay(t){const e=$('#nSay');if(!e)return;e.textContent=t;e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')}
function nestBars(){const p=S.pet,f=$('#nFood'),j=$('#nJoy');if(f){f.style.width=p.food+'%';f.parentElement.setAttribute('aria-valuenow',Math.round(p.food))}if(j){j.style.width=p.joy+'%';j.parentElement.setAttribute('aria-valuenow',Math.round(p.joy))}
  const l=$('#nLv');if(l)l.textContent=friendLv()+'. seviye'}
function renderNest(){
  petTick();const p=S.pet,night=(()=>{const h=new Date().getHours();return h>=21||h<6})();
  $('#pgNest').innerHTML=`<button class="back" type="button" id="nBack">${ic('rotL',18)} Geri</button>
  <div class="nest ${night?'night':''}">
    <div class="nscene" id="nScene">
      <div class="nwin" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><clipPath id="nwc"><circle cx="60" cy="60" r="54"/></clipPath></defs><g clip-path="url(#nwc)"><rect width="120" height="120" fill="${night?'#1E2436':'#F2D9A6'}"/>${night?'<circle cx="84" cy="34" r="12" fill="#F1E8D0"/><circle cx="30" cy="26" r="1.5" fill="#F1E8D0"/><circle cx="52" cy="18" r="1.2" fill="#F1E8D0"/>':'<circle cx="84" cy="36" r="14" fill="#F2B451"/>'}<path d="M0 86 L20 66 L38 78 L60 54 L82 74 L100 62 L120 76 V120 H0 Z" fill="${night?'#2F3A28':'#7C8F5A'}"/><path d="M0 96 Q30 84 60 94 T120 92 V120 H0 Z" fill="${night?'#232B1D':'#4B5A3A'}"/></g><circle cx="60" cy="60" r="54" fill="none" stroke="#6E4824" stroke-width="8"/><path d="M60 6 V114 M6 60 H114" stroke="#6E4824" stroke-width="5"/></svg></div>
      <div class="nbars"><div class="nbar"><span>${foodIcon('elma',22)} Tokluk</span><div class="bar" role="progressbar" aria-label="Tokluk" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p.food)}"><i id="nFood" style="width:${p.food}%"></i></div></div>
        <div class="nbar"><span>${fi('heart',18)} Mutluluk</span><div class="bar" role="progressbar" aria-label="Mutluluk" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p.joy)}"><i id="nJoy" style="width:${p.joy}%"></i></div></div>
        <span class="nlv">${ic('star',16)} Dostluk <b id="nLv">${friendLv()}. seviye</b></span></div>
      <p class="nsay" id="nSay" aria-live="polite">${esc(petLine())}</p>
      <div class="nbird" id="nBird" aria-label="Anka. Okşamak için dokun ya da parmağını üzerinde gezdir." role="button" tabindex="0">${anka(petMood(),230,undefined,'act-enter')}</div>
      ${NEST_SVG}
      <div class="nfx" id="nFx" aria-hidden="true"></div>
    </div>
    <div class="ntabs" role="tablist">${[['besle','Besle',foodIcon('nar',24)],['giydir','Giydir',ic('user',22)],['sev','Sev',fi('heart',22)]].map(([k,t,i])=>`<button type="button" role="tab" class="ntab" data-ntab="${k}" aria-selected="${YV.tab===k}">${i}<span>${t}</span></button>`).join('')}</div>
    <div class="npanel" id="nPanel" role="tabpanel"></div>
  </div>`;
  nestPanel();
  $('#nBack').onclick=()=>{if(history.length>1)history.back();else location.hash='#ogren'};
  const bird=$('#nBird');let last=null,acc=0;
  bird.addEventListener('pointermove',e=>{if(YV.busy||YV.sleep)return;if(e.pointerType==='mouse'&&!e.buttons)return;const p=[e.clientX,e.clientY];if(last){acc+=Math.hypot(p[0]-last[0],p[1]-last[1])}last=p;if(acc>34){acc=0;stroke(e.clientX,e.clientY)}});
  bird.addEventListener('pointerleave',()=>{last=null});
  bird.addEventListener('click',e=>{if(YV.busy)return;if(YV.sleep){wake();return}heartsAt(e.clientX,e.clientY,4);addJoy(3,false);if(Math.random()<.45)nestSay(pickL(['Hihi!','Teşekkürler!','Bir daha!','Mutluluktan uçacağım!']))});
  bird.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const r=bird.getBoundingClientRect();heartsAt(r.left+r.width/2,r.top+r.height/2,4);addJoy(3,true)}});
}
function heartsAt(x,y,n){const fx=$('#nFx');if(!fx||reduce)return;const r=fx.getBoundingClientRect();for(let i=0;i<(n||1);i++){const h=document.createElement('span');h.className='nh';h.innerHTML=fi('heart',18+Math.random()*12|0);
  h.style.left=(x-r.left+(Math.random()-.5)*40)+'px';h.style.top=(y-r.top+(Math.random()-.5)*20)+'px';h.style.setProperty('--dx',((Math.random()-.5)*60)+'px');h.style.animationDelay=(i*.06)+'s';fx.appendChild(h);setTimeout(()=>h.remove(),1500)}}
function stroke(x,y){heartsAt(x,y,1);YV.pet++;if(YV.pet%4===0){addJoy(2,false);if(YV.pet%12===0){nestBird('love','act-wiggle');sfx.chirp();nestSay(pickL(['Hihi, gıdıklanıyorum!','Çok güzel okşuyorsun!','Tüylerim parlıyor!']))}}}
function addJoy(n,act){const p=S.pet;p.joy=Math.min(100,p.joy+n);p.pets=(p.pets||0)+1;p.t=p.t||Date.now();save();nestBars();if(act){const b=$('#nBird svg.anka');if(b)ankaAct(b,pick(['jump','wiggle','nod','dance']));sfx.chirp();if(Math.random()<.4)nestSay(pickL(['Hihi!','Teşekkürler!','Bir daha!','Mutluluktan uçacağım!']))}}
function wake(){YV.sleep=false;nestBird(petMood(),'act-jump');nestSay('Günaydın! Ne güzel uyudum.');sfx.chirp();$('#pgNest .nest').classList.remove('sleeping');if(YV.tab==='sev')nestPanel()}
function feed(id){const it=SHOP.find(i=>i.id===id),p=S.pet;if(YV.busy||!it)return;if(YV.sleep){nestSay('Anka uyuyor. Önce onu uyandır.');return}
  if(!(p.inv[id]>0)){nestSay('Bundan hiç kalmadı. Hemen yanından alabilirsin.');return}
  if(p.food>=96){nestSay('Doydum, teşekkürler! Biraz sonra yerim.');nestBird('happy','act-nod');return}
  YV.busy=true;p.inv[id]--;
  const fx=$('#nFx'),bird=$('#nBird');if(fx&&bird&&!reduce){const r=fx.getBoundingClientRect(),b=bird.getBoundingClientRect(),f=document.createElement('span');f.className='nfood';f.innerHTML=foodIcon(id,52);
    f.style.left=(b.left-r.left+b.width/2-26)+'px';f.style.top=(b.top-r.top+b.height*.48)+'px';fx.appendChild(f);setTimeout(()=>f.remove(),900)}
  setTimeout(()=>{nestBird('eat');sfx.tick();setTimeout(()=>sfx.tick(),220);setTimeout(()=>sfx.tick(),440);
    nestSay({misir:'Tık tık tık, ne lezzetli!',elma:'Çıtır çıtır! Bayıldım.',nar:'Hatay narı! Mmm, çok sulu!',kunefe:'Künefe! Bayram gibi oldu!'}[id]||'Mmm!')},reduce?0:700);
  setTimeout(()=>{p.food=Math.min(100,p.food+it.food.t);p.joy=Math.min(100,p.joy+it.food.j);p.fed=(p.fed||0)+1;p.t=p.t||Date.now();save();nestBars();
    nestBird(p.food>=75&&p.joy>=75?'love':'cheer','act-jump');sfx.ok();YV.busy=false;nestPanel();
    const r=$('#nBird').getBoundingClientRect();heartsAt(r.left+r.width/2,r.top+r.height*.3,3)},reduce?300:2000)}
function buyItem(id){const it=SHOP.find(i=>i.id===id);if(!it||S.gems<it.price){toast(fi('gem',20)+' Yeterli mozaik taşın yok. Ders yaparak taş kazanabilirsin.');return false}
  S.gems-=it.price;if(it.food)S.pet.inv[id]=(S.pet.inv[id]||0)+1;else if(it.cos){S.owned[id]=1;S.wear[it.slot]=id}save();sfx.coin();renderStats();toast(fi('gem',20)+' '+it.name+' alındı!');return true}
function nestPanel(){const P=$('#nPanel');if(!P)return;const p=S.pet;
  $$('#pgNest [data-ntab]').forEach(b=>b.setAttribute('aria-selected',b.dataset.ntab===YV.tab));
  const gems=`<p class="ngem">Elinde ${fi('gem',16)} <b>${S.gems}</b> mozaik taşı var.</p>`;
  if(YV.tab==='besle'){
    P.innerHTML=gems+`<div class="nfoods">${FOODS().map(f=>{const n=p.inv[f.id]||0;return `<div class="card nfc"><div class="nfi">${foodIcon(f.id,56)}<span class="nct">${n}</span></div><div class="nft"><b>${f.name}</b><small>+${f.food.t} tokluk · +${f.food.j} mutluluk</small></div>
      <div class="nfb"><button class="b3 sm" type="button" data-feed="${f.id}" ${n?'':'disabled'}>Yedir</button><button class="b3 sm ghost" type="button" data-nbuy="${f.id}" ${S.gems<f.price?'disabled':''} aria-label="${f.name} satın al, ${f.price} taş">${fi('gem',14)} ${f.price}</button></div></div>`}).join('')}</div><p class="muted nnote">Yiyecekleri mağazadan da alabilirsin. Aldıkların burada birikir.</p>`}
  else if(YV.tab==='giydir'){
    P.innerHTML=gems+Object.entries(SLOTS).map(([sl,nm])=>`<div class="nslot"><h4>${nm}</h4><div class="nwears">${WEARS().filter(w=>w.slot===sl).map(w=>{const own=S.owned[w.id],on=S.wear[sl]===w.id;
      return `<button type="button" class="nwc ${own?'':'locked'} ${on?'on':''}" ${own?`data-wear="${w.id}" aria-pressed="${on}"`:`data-nbuy="${w.id}"`} aria-label="${w.name}${own?(on?', takılı':''):', '+w.price+' taş'}">${anka('happy',64,w.id)}<b>${w.name}</b><small>${own?(on?'Takılı':'Giydir'):`${fi('gem',12)} ${w.price}`}</small></button>`}).join('')}</div></div>`).join('')+`<p class="muted nnote">Her bölgeye bir aksesuar takılır: baş, yüz ve boyun. Aynı anda üçünü birden giyebilir.</p>`}
  else{P.innerHTML=`<div class="nsev"><p>Anka'yı okşamak için ona dokun ya da parmağını üzerinde gezdir. Her okşayışta mutluluğu artar.</p>
    <div class="nacts"><button class="b3" type="button" data-nact="dans">${ic('play',16)} Dans ettir</button><button class="b3 ghost" type="button" data-nact="gidikla">Gıdıkla</button><button class="b3 ghost" type="button" data-nact="uyku">${YV.sleep?'Uyandır':'Uyut'}</button></div>
    <p class="muted nnote">Toplam ${p.fed||0} kez besledin, ${p.pets||0} kez sevdin.</p></div>`}
}
document.addEventListener('click',e=>{
  if(!e.target.closest('#pgNest'))return;
  const t=e.target.closest('[data-ntab]');if(t){YV.tab=t.dataset.ntab;sfx.tap();nestPanel();return}
  const f=e.target.closest('[data-feed]');if(f){feed(f.dataset.feed);return}
  const b=e.target.closest('[data-nbuy]');if(b){if(buyItem(b.dataset.nbuy)){const it=SHOP.find(i=>i.id===b.dataset.nbuy);if(it.cos){nestBird('wow','act-spin');nestSay('Yeni bir şey mi? Hemen giyiyorum!')}nestPanel()}return}
  const w=e.target.closest('[data-wear]');if(w){const it=SHOP.find(i=>i.id===w.dataset.wear);S.wear[it.slot]=S.wear[it.slot]===it.id?null:it.id;save();sfx.tap();
    nestBird(S.wear[it.slot]?'wow':'happy','act-spin');nestSay(S.wear[it.slot]?pickL(['Nasıl görünüyorum?','Bu bana çok yakıştı!','Şimdi çok havalıyım!']):'Tamam, onu çıkardım.');nestPanel();return}
  const a=e.target.closest('[data-nact]');if(a){const k=a.dataset.nact;
    if(k==='uyku'){if(YV.sleep){wake();return}YV.sleep=true;$('#pgNest .nest').classList.add('sleeping');nestBird('sleep');nestSay('İyi geceler… Zzz…');nestPanel();return}
    if(YV.sleep){nestSay('Anka uyuyor. Önce onu uyandır.');return}
    if(k==='dans'){nestBird('cheer','act-dance');sfx.win();nestSay('Hadi dans edelim!');addJoy(5,false);const r=$('#nBird').getBoundingClientRect();heartsAt(r.left+r.width/2,r.top+30,6)}
    if(k==='gidikla'){nestBird('cheer','act-wiggle');sfx.chirp();nestSay(pickL(['Hihihi! Dur, dur!','Gıdıklanıyorum!','Haha, yeter!']));addJoy(4,false)}}
});
/* Yuvanın dışında Anka'ya dokununca yuva açılır (ders, pencere, oyun ve mağaza hariç) */
function openNestFrom(el){if(!el||el.closest('#lesson,#modal,[data-page="yuva"],#pgShop,.gtip,.gov,.fpick,.item'))return;setTimeout(()=>{if(location.hash!=='#yuva')location.hash='#yuva'},420)}
