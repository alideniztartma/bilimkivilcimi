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

const YV={sel:null,prevT:0,tray:null,slot:'head',sleep:false,busy:false,pet:0,music:false,drag:null};
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
      <div class="nmeters"><button type="button" class="nmeter" data-nmeter="food" aria-label="Tokluk çubuğu. Dokun, ne olduğunu söyleyeyim."><span class="nmi">${foodIcon('elma',22)}</span><span class="nml">Tok</span><div class="nmb"><i id="nFood" style="width:${p.food}%"></i></div></button>
        <button type="button" class="nmeter joy" data-nmeter="joy" aria-label="Mutluluk çubuğu. Dokun, ne olduğunu söyleyeyim."><span class="nmi">${fi('heart',18)}</span><span class="nml">Mutlu</span><div class="nmb"><i id="nJoy" style="width:${p.joy}%"></i></div></button></div>
      <div class="nchips"><span class="nchip" title="Dostluk seviyesi">${ic('star',16)}<b id="nLv">${friendLv()}</b></span><span class="nchip gem" title="Mozaik taşı">${fi('gem',16)}<b id="nGem">${S.gems}</b></span></div>
    </div>
    <p class="nsay" id="nSay" aria-live="polite">${esc(petLine())}</p>
    <button type="button" class="nobj nwd" data-nobj="wear" aria-label="Dolap: Anka'yı giydir">${OBJ_SVG.wardrobe}<span class="nlab">Dolap</span></button>
    <button type="button" class="nobj nrad" data-nobj="music" aria-pressed="false" aria-label="Radyo: müzik aç, Anka dans etsin">${OBJ_SVG.radio}<span class="nlab">Müzik</span><span class="nplay" aria-hidden="true"><i class="nled"></i>Çalıyor<small>Durdurmak için dokun</small></span><span class="nnotes" aria-hidden="true"><b>♪</b><b>♫</b><b>♪</b></span></button>
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
/* Radyo: Web Audio ile çalan küçük, özgün şarkılar. Her basışta sıradaki şarkı çalar. */
const SONGS=[
  {name:'Antioch Rising Marşı',bpm:112,lead:'sawtooth',
   mel:'G4 . C5 . E5 . G5 . A5 - G5 E5 F5 - D5 . E5 . G5 . C6 - B5 A5 G5 - - - . . . . C6 - C6 . B5 - A5 . G5 - E5 . G5 - - . A5 - A5 . G5 - F5 . E5 - D5 . C5 - - .',
   bass:'C3 G2 C3 G2 F2 C3 G2 D3 C3 G2 A2 E3 G2 D3 G2 B2 C3 G2 C3 E3 C3 G2 C3 G2 F2 C3 F2 C3 G2 D3 C3 C3',
   drum:'K.H.S.H.K.H.S.H.K.H.S.H.K.S.SSSS',vox:{24:'ar',30:'hey',56:'ar',62:'hey'},harm:true},
  {name:'Kıvılcım Dansı',bpm:122,lead:'triangle',
   mel:'C5 E5 G5 E5 A5 - G5 . F5 A5 G5 E5 D5 - C5 . E5 G5 C6 B5 A5 - G5 . F5 E5 D5 E5 C5 - - .',
   bass:'C3 G3 C3 G3 F3 C4 G3 D3 A2 E3 A2 E3 G2 D3 C3 G2',drum:'K.H.S.H.K.H.S.HK'},
  {name:'Antakya Ezgisi',bpm:100,lead:'sawtooth',
   mel:'D5 Eb5 F#5 G5 A5 - G5 F#5 G5 A5 Bb5 A5 G5 F#5 Eb5 D5 F#5 G5 A5 - D6 C6 Bb5 A5 G5 F#5 Eb5 F#5 D5 - - .',
   bass:'D3 A2 D3 A2 G2 D3 G2 D3 D3 A2 C3 Bb2 G2 A2 D3 D3',drum:'D.TT.TD.D.T.T...'},
  {name:'Robot Bip Bop',bpm:128,lead:'square',
   mel:'A4 . C5 E5 A5 . G5 E5 F5 . E5 D5 E5 - . . A4 . C5 E5 A5 . B5 C6 B5 A5 G5 E5 A5 - - .',
   bass:'A2 A2 E3 A2 F2 F2 C3 F2 A2 A2 E3 A2 G2 G2 E2 A2',drum:'K.HSK.HSKKHSK.HS'}];
const NOTE={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
/* Do majörde bir üçlü aşağısı (marşın ikinci sesi) */
function third(n){const L='CDEFGAB',i=L.indexOf(n[0]),o=+n.slice(-1);return L[(i+5)%7]+(i<2?o-1:o)}
function nfreq(n){const m=/^([A-G])([#b]?)(\d)$/.exec(n);if(!m)return 0;const k=NOTE[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0)+12*(+m[3]+1);return 440*Math.pow(2,(k-69)/12)}
const MZ={songI:-1,t:null,out:null,next:0,step:0,song:null,noise:null,vox:{}};
/* Marştaki 'Antioch Rising!' ve 'Hey!' sesleri (robot korosu) */
function mzLoadVox(){if(!AC||MZ.voxL)return;MZ.voxL=1;[['ar','audio/antioch-rising.mp3'],['hey','audio/hey.mp3']].forEach(([k,u])=>fetch(u).then(r=>r.arrayBuffer()).then(a=>AC.decodeAudioData(a)).then(b=>{MZ.vox[k]=b}).catch(()=>{MZ.voxL=0}))}
function mzVoice(f,t,d,type,vol){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.012);g.gain.setValueAtTime(vol*.8,t+Math.max(.03,d-.06));g.gain.linearRampToValueAtTime(0,t+d);
  o.connect(g);g.connect(MZ.out);o.start(t);o.stop(t+d+.02)}
function mzNoise(){if(MZ.noise)return MZ.noise;const b=AC.createBuffer(1,AC.sampleRate*.3,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return MZ.noise=b}
function mzDrum(k,t){
  if(k==='K'||k==='D'){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(k==='D'?150:120,t);o.frequency.exponentialRampToValueAtTime(45,t+.14);g.gain.setValueAtTime(.55,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g);g.connect(MZ.out);o.start(t);o.stop(t+.22);return}
  const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=mzNoise();
  f.type=k==='H'?'highpass':'bandpass';f.frequency.value=k==='H'?7000:k==='T'?2600:1800;
  const v=k==='H'?.12:k==='T'?.22:.28,d=k==='H'?.05:k==='T'?.08:.13;
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(MZ.out);s.start(t);s.stop(t+d+.02)}
function mzTick(){const s=MZ.song,mel=s.mel.split(' '),bass=s.bass.split(' '),e=60/s.bpm/2;
  while(MZ.next<AC.currentTime+.2){const i=MZ.step%mel.length,t=MZ.next;
    const n=mel[i];if(n!=='.'&&n!=='-'){let len=1;while(mel[(i+len)%mel.length]==='-'&&len<8)len++;mzVoice(nfreq(n),t,e*len*.95,s.lead,s.lead==='triangle'?.22:.09);if(s.harm)mzVoice(nfreq(third(n)),t,e*len*.95,'triangle',.11)}
    if(i%2===0){const b=bass[(i/2)%bass.length];mzVoice(nfreq(b),t,e*1.8,'triangle',.26)}
    const dk=s.drum[i%s.drum.length];if(dk&&dk!=='.')mzDrum(dk,t);
    if(s.vox&&s.vox[i]){const b=MZ.vox[s.vox[i]];if(b){const src=AC.createBufferSource(),g=AC.createGain();src.buffer=b;g.gain.value=1.5;src.connect(g);g.connect(MZ.out);src.start(t)}}
    MZ.step++;MZ.next+=e}}
function startTune(){if(!S.sound)return false;
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
    mzLoadVox();stopTune(true);MZ.songI=(MZ.songI+1)%SONGS.length;MZ.song=SONGS[MZ.songI];
    MZ.out=AC.createGain();MZ.out.gain.value=0;MZ.out.gain.linearRampToValueAtTime(.55,AC.currentTime+.3);MZ.out.connect(AC.destination);
    MZ.step=0;MZ.next=AC.currentTime+.08;mzTick();MZ.t=setInterval(mzTick,40);return MZ.song.name}catch(e){return false}}
function stopTune(now){clearInterval(MZ.t);MZ.t=null;const o=MZ.out;MZ.out=null;if(o&&AC){try{o.gain.cancelScheduledValues(AC.currentTime);o.gain.setValueAtTime(o.gain.value,AC.currentTime);o.gain.linearRampToValueAtTime(0,AC.currentTime+(now?.05:.4));setTimeout(()=>o.disconnect(),now?120:500)}catch(e){}}}
let musicT=null;
function stopMusic(){YV.music=false;clearInterval(musicT);stopTune();const r=$('#pgNest .nrad');if(r){r.classList.remove('playing');r.setAttribute('aria-pressed','false');r.setAttribute('aria-label','Radyo: müzik aç, Anka dans etsin')}}
function toggleMusic(){if(YV.sleep){nestSay('Şşş… Anka uyuyor.');return}if(YV.music){stopMusic();nestBird(petMood(),'act-nod');nestSay('Ne güzel danstı!');return}
  YV.music=true;{const r=$('#pgNest .nrad');r.classList.add('playing');r.setAttribute('aria-pressed','true');r.setAttribute('aria-label','Radyo çalıyor. Durdurmak için dokun.')}closeTray();nestBird('cheer','act-dance');addJoy(5);
  const name=startTune();nestSay(name?'♪ '+name+' çalıyor. Hadi dans edelim!':'Ses kapalı, Profil\'den açabilirsin. Ben yine de dans ediyorum!');
  const notes=()=>{const r=$('#pgNest .nrad');if(!r||!YV.music){stopMusic();return}const b=r.getBoundingClientRect();heartsAt(b.left+b.width/2,b.top+10,2,'nnote');const s=$('#nBird svg.anka');if(s&&!YV.busy)ankaAct(s,pick(['dance','wiggle','jump','spin']))}
  notes();musicT=setInterval(notes,1300)}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&YV.music)stopMusic()});
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
function buyItem(id,inNest){const it=SHOP.find(i=>i.id===id);if(!it||S.gems<it.price){if(inNest){nestSay('Bunun için '+(it?it.price:'')+' mozaik taşı lazım. Ders yaparak mozaik taşı kazanabilirsin!');nestBird('sad');sfx.bad();return false}toast(fi('gem',20)+' Yeterli mozaik taşın yok. Ders yaparak mozaik taşı kazanabilirsin.');sfx.bad();return false}
  S.gems-=it.price;if(it.food)S.pet.inv[id]=(S.pet.inv[id]||0)+1;else if(it.cos){S.owned[id]=1;S.wear[it.slot]=id}save();sfx.coin();renderStats();nestBars();return true}
function openTray(k){if(YV.sleep){nestSay('Anka uyuyor. Önce pencereye dokunup uyandır.');return}if(YV.tray===k){closeTray();return}YV.tray=k;sfx.tap();trayRender();
  nestSay(k==='food'?'Bir yiyeceği bana sürükle ya da dokun!':'Hangisini giyeyim?')}
function closeTray(){YV.tray=null;YV.sel=null;const t=$('#nTray');if(t){t.hidden=true;t.innerHTML=''}$$('#pgNest .nobj').forEach(o=>o.classList.remove('on'))}
const needTxt=pr=>S.gems>=pr?'':`<em class="nneed">${pr} mozaik taşı gerekli</em>`;
const priceTag=pr=>`<span class="nprice ${S.gems>=pr?'':'no'}">${fi('gem',12)} ${pr}</span>`;
const trayRow=h=>`<div class="ntwrap"><div class="ntrow">${h}</div><span class="nthint" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></span></div>`;
function trayRender(){const t=$('#nTray');if(!t||!YV.tray)return;const p=S.pet;t.hidden=false;
  $$('#pgNest .nobj').forEach(o=>o.classList.toggle('on',o.dataset.nobj===YV.tray));
  const keep=t.querySelector('.ntrow'),sl=keep?keep.scrollLeft:0;
  if(YV.tray==='food'){t.innerHTML=`<div class="nth"><b>Sepet</b><span>Sürükle ya da dokun</span><button type="button" class="nx" data-nclose aria-label="Kapat">${ic('x',18)}</button></div>`+trayRow(FOODS().map(f=>{const n=p.inv[f.id]||0;
      return `<button type="button" class="nti ${n?'':'empty'}" ${n?`data-food="${f.id}"`:`data-nbuy="${f.id}"`} aria-label="${f.name}${n?', '+n+' tane var':', '+(S.gems>=f.price?'satın al '+f.price+' mozaik taşı':f.price+' mozaik taşı gerekli')}">${foodIcon(f.id,54)}${n?`<span class="ncnt">×${n}</span>`:priceTag(f.price)}<small>${f.name}</small>${n?'':needTxt(f.price)}</button>`}).join(''))}
  else{t.innerHTML=`<div class="nth"><b>Dolap</b><span class="nslots">${Object.entries(SLOTS).map(([k,n])=>`<button type="button" data-nslot="${k}" aria-pressed="${YV.slot===k}">${n}</button>`).join('')}</span><button type="button" class="nx" data-nclose aria-label="Kapat">${ic('x',18)}</button></div>`+trayRow(WEARS().filter(w=>w.slot===YV.slot).map(w=>{const own=S.owned[w.id],on=S.wear[w.slot]===w.id,sel=!own&&YV.sel===w.id,can=S.gems>=w.price;
      return `<button type="button" class="nti wr ${own?'':'empty'} ${on?'on':''} ${sel?'sel':''}" ${own?`data-wear="${w.id}"`:`data-npre="${w.id}"`} aria-pressed="${on}" aria-label="${w.name}${own?(on?', takılı':', giy'):(sel?(can?', satın al '+w.price+' mozaik taşı':', '+w.price+' mozaik taşı gerekli'):', önizle')}">${anka('happy',58,w.id)}${own?(on?`<span class="ncnt">${ic('check',12)}</span>`:''):priceTag(w.price)}<small>${w.name}</small>${own?'':sel?(can?'<em class="nbuy">Satın al</em>':needTxt(w.price)):'<em class="nneed ok">Önizle</em>'}</button>`}).join(''))}
  const r=t.querySelector('.ntrow');if(r){r.scrollLeft=sl;nthintUpd(r)}}
function nthintUpd(r){const w=r&&r.parentElement;if(!w)return;w.classList.toggle('more',r.scrollWidth-r.clientWidth-r.scrollLeft>6)}
document.addEventListener('scroll',e=>{if(e.target&&e.target.classList&&e.target.classList.contains('ntrow'))nthintUpd(e.target)},true);
/* Dolap önizleme: Anka seçilen kıyafeti 2-3 saniye giymiş görünür */
function previewWear(id){const it=SHOP.find(i=>i.id===id);if(!it)return;const b=$('#nBird');if(!b)return;
  const acc=['neck','face','head'].map(k=>k===it.slot?id:S.wear[k]).filter(Boolean);
  b.innerHTML=anka('wow',260,acc,'act-spin');clearTimeout(YV.prevT);YV.prevT=setTimeout(()=>{YV.prevT=0;if(!YV.busy&&$('#nBird'))nestBird(petMood())},2800)}
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
  const sl=e.target.closest('[data-nslot]');if(sl){YV.slot=sl.dataset.nslot;YV.sel=null;sfx.tap();trayRender();return}
  const m=e.target.closest('[data-nmeter]');if(m){sfx.tap();nestSay(m.dataset.nmeter==='food'?'Tok: karnımın ne kadar dolu olduğunu gösterir. Sepetten yiyecek verirsen dolar.':'Mutlu: ne kadar neşeli olduğumu gösterir. Beni okşa, oyun oyna ya da müzik aç, dolsun!');return}
  const pv=e.target.closest('[data-npre]');if(pv){const it=SHOP.find(i=>i.id===pv.dataset.npre);
    if(YV.sel===it.id){if(buyItem(it.id,true)){YV.sel=null;nestBird('wow','act-spin');nestSay('Yeni bir şey mi? Hemen giyiyorum!');trayRender()}return}
    YV.sel=it.id;sfx.tap();previewWear(it.id);nestSay(it.name+' böyle görünüyor! '+(S.gems>=it.price?'Almak için tekrar dokun.':it.price+' mozaik taşı gerekli, ders yaparak kazanabilirsin.'));trayRender();return}
  const b=e.target.closest('[data-nbuy]');if(b){const it=SHOP.find(i=>i.id===b.dataset.nbuy);if(buyItem(it.id,true)){if(it.cos){nestBird('wow','act-spin');nestSay('Yeni bir şey mi? Hemen giyiyorum!')}else nestSay(it.name+' sepete eklendi!');trayRender()}return}
  const w=e.target.closest('[data-wear]');if(w){const it=SHOP.find(i=>i.id===w.dataset.wear);S.wear[it.slot]=S.wear[it.slot]===it.id?null:it.id;save();sfx.tap();
    nestBird(S.wear[it.slot]?'wow':'happy','act-spin');nestSay(S.wear[it.slot]?pickL(['Nasıl görünüyorum?','Bu bana çok yakıştı!','Şimdi çok havalıyım!']):'Tamam, onu çıkardım.');trayRender();return}
  if(YV.tray&&!e.target.closest('#nTray'))closeTray();
});
addEventListener('hashchange',()=>{if(location.hash!=='#yuva'){stopMusic();YV.drag=null}});
/* Yuvanın dışında Anka'ya dokununca yuva açılır (ders, pencere, oyun ve mağaza hariç) */
function openNestFrom(el){if(!el||el.closest('#lesson,#modal,[data-page="yuva"],#pgShop,.gtip,.gov,.fpick,.item'))return;setTimeout(()=>{if(location.hash!=='#yuva')location.hash='#yuva'},420)}
