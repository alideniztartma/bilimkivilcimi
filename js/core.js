/* #BilimKıvılcımı · Durum, ses, bildirim, ödüller */
'use strict';
/* Anka'nın telefon tarafı (yalnızca APK'da): widget, bildirim, simge. Bkz. main.js */
var ANKA_N=window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()&&Capacitor.Plugins&&Capacitor.Plugins.Anka||null;

const KEY='bk-duo-v1',OLDLAB='bilimkivilcimi-v1';
const dkey=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const dayNum=k=>{const [y,m,d]=k.split('-').map(Number);return Math.round(new Date(y,m-1,d).getTime()/864e5)};
const newDay=()=>({k:dkey(),xp:0,lessons:0,combo:0,perfect:0,robot:0,lab:0,claimed:{}});
const newUid=()=>{try{const a=new Uint8Array(6);crypto.getRandomValues(a);return [...a].map(x=>x.toString(36).padStart(2,'0')).join('').slice(0,10)}catch(e){return Math.random().toString(36).slice(2,12)}};
const DEF=()=>({v:1,name:'',goal:20,xp:0,gems:50,hearts:5,heartAt:null,streak:0,best:0,lastDay:null,days:[],freeze:0,done:{},chests:{},trophies:{},badges:{},owned:{},equip:null,
  sound:true,vib:true,tts:false,theme:'auto',onb:false,joined:dkey(),lessons:0,wrong:{},speedBest:0,draw:{},dailyDone:{},msgHide:null,
  lab:{tasks:{},notes:{},found:{},seen:{},st:{},ask:{}},cat:{},field:'yazilim',wear:{head:null,face:null,neck:null},pet:{food:70,joy:70,t:Date.now(),inv:{misir:3},fed:0,pets:0},uid:newUid(),tok:newUid()+newUid()+newUid(),share:true,syncH:'',day:newDay()});
let S=DEF();
try{const r=JSON.parse(localStorage.getItem(KEY));if(r&&r.v===1){S=Object.assign(DEF(),r);if(!r.uid||!r.tok){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(_){}}S.lab=Object.assign({tasks:{},notes:{},found:{},seen:{},st:{},ask:{}},r.lab||{})}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}if(typeof scheduleSync==='function')scheduleSync();if(typeof ankaSoon==='function')ankaSoon()}

/* Eski laboratuvar kayıtlarını yeni sisteme taşı */
/* Alan dersleri artık yol haritasında: eski ayrı kayıtları ders kayıtlarına taşı */
if(S.cat&&Object.keys(S.cat).length){Object.keys(S.cat).forEach(k=>{S.done[k]=Math.max(S.done[k]||0,S.cat[k])});S.cat={};save()}
/* Tek aksesuardan yuva sistemine geçiş: eski takılı aksesuar ilgili yuvaya geçer */
if(S.equip){const it=SHOP.find(i=>i.id===S.equip);if(it&&it.slot&&!S.wear[it.slot])S.wear[it.slot]=S.equip;S.equip=null}
S.wear=Object.assign({head:null,face:null,neck:null},S.wear);S.pet=Object.assign({food:70,joy:70,t:Date.now(),inv:{},fed:0,pets:0},S.pet);
/* v3: FRC müfredatı. Eski elektronik kupası 7. sıradan 9. sıraya taşınır. */
if(!S.frc){if(S.trophies&&S.trophies[7]&&!S.trophies[9]){S.trophies[9]=S.trophies[7];delete S.trophies[7]}S.frc=1}
if(!S.mek15){U.forEach((u,ui)=>{if(u.field==='mekanik'&&S.trophies)delete S.trophies[ui]});S.mek15=1;save()}
(function migrate(){if(S.lab.migrated)return;try{const o=JSON.parse(localStorage.getItem(OLDLAB));if(o&&o.done){
  const map={sarkac:'sarkac-1',kaldirac:'kaldirac-0',devre:'devre-0',kesir:'kesir-0'};Object.keys(map).forEach(k=>{if(o.done[k])S.lab.tasks[map[k]]=dkey()})}}catch(e){}
  S.lab.migrated=1;save()})();

function applyTheme(){if(S.theme==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',S.theme);if(typeof appBars==='function')appBars()}
applyTheme();

const HEART_MS=5*60*1000;/* her 5 dakikada 1 kalp */
function dayCheck(){
  const t=dkey();
  if(S.day.k!==t)S.day=newDay();
  if(S.lastDay&&S.streak>0){const gap=dayNum(t)-dayNum(S.lastDay);
    if(gap>1){const miss=gap-1;
      if(S.freeze>=miss){S.freeze-=miss;const y=new Date();y.setDate(y.getDate()-1);S.lastDay=dkey(y);setTimeout(()=>toast(ic('snow',20)+'Seri koruyucu serini kurtardı!'),600)}
      else S.streak=0}}
  const HR=HEART_MS;
  if(S.hearts<5&&S.heartAt){const n=Math.floor((Date.now()-S.heartAt)/HR);if(n>0){S.hearts=Math.min(5,S.hearts+n);S.heartAt=S.hearts>=5?null:S.heartAt+n*HR}}
  if(S.hearts>=5)S.heartAt=null;
  save();
}
function addXP(x){S.xp+=x;S.day.xp+=x}
function touchStreak(){const today=dkey();if(S.lastDay===today)return false;
  S.streak=(S.lastDay&&dayNum(today)-dayNum(S.lastDay)===1&&S.streak>0)?S.streak+1:1;S.lastDay=today;S.best=Math.max(S.best,S.streak);
  if(!S.days.includes(today))S.days=S.days.concat(today).slice(-21);return true}

/* Ses efektleri: js/ses.js (tone, sfx, AC) */
/* Titreşim: uygulamada Capacitor Haptics, tarayıcıda navigator.vibrate */
function haptic(k){if(!S||S.vib===false)return;try{const d=k==='bad'?[18,40,18]:k==='ok'||k==='win'?[10,30,12]:k==='heavy'?14:k==='type'?4:5;
  const H=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.Haptics;
  if(H){if(Array.isArray(d)){H.vibrate({duration:d[0]});setTimeout(()=>H.vibrate({duration:d[2]}),d[0]+d[1])}else H.vibrate({duration:d});return}
  if(navigator.vibrate)navigator.vibrate(d)}catch(e){}}
['ok','bad','win'].forEach(k=>{const f=sfx[k];sfx[k]=(...a)=>{haptic(k);return f(...a)}});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('button,a[href],[role="button"],[data-node],.node,label,summary');if(t&&!t.disabled)haptic('tap')},true);

/* Sesli okuma */
const nativeTTS=()=>{try{return window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.TextToSpeech||null}catch(e){return null}};
const canSpeak=!!nativeTTS()||('speechSynthesis' in window&&typeof SpeechSynthesisUtterance!=='undefined');
function stopSpeak(){try{const T=nativeTTS();if(T){const r=T.stop();if(r&&r.catch)r.catch(()=>{})}}catch(e){}try{if('speechSynthesis' in window)speechSynthesis.cancel()}catch(e){}}
function speak(text){if(!canSpeak)return;const t=strip(text).replace(/_{3}/g,'boşluk');
  const T=nativeTTS();
  if(T){try{const r=T.stop();const go=()=>{const q=T.speak({text:t,lang:'tr-TR',rate:.95,pitch:1,volume:1});if(q&&q.catch)q.catch(()=>{})};if(r&&r.then)r.then(go,go);else go()}catch(e){}return}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='tr-TR';u.rate=.95;
  const v=speechSynthesis.getVoices().find(v=>/^tr/i.test(v.lang));if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){}}
const spkBtn=t=>canSpeak?`<button class="spk" type="button" data-say="${esc(strip(t))}" aria-label="Sesli oku">${ic('vol',20)}</button>`:'';
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.stopPropagation();speak(b.dataset.say)}});

/* Bildirim, pencere, konfeti */
let toastT;
function toast(h,ms){const t=$('#toast');t.innerHTML=h;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),ms||1800)}
/* Bildirime dokununca hemen kapanır */
document.addEventListener('click',e=>{if(e.target.closest('#toast')){clearTimeout(toastT);$('#toast').classList.remove('show')}});
function openModal(html,wide){$('#mbox').className='mbox'+(wide?' wide':'');$('#mbox').innerHTML=html;{const m=$('#modal');clearTimeout(m._ct);m.classList.remove('closing')}$('#modal').hidden=false;const f=$('#mbox button,#mbox input');if(f)setTimeout(()=>f.focus(),30)}
function closeModal(){const m=$('#modal');delete $('#mbox').dataset.lockbg;
  if(m.hidden||reduce){m.hidden=true;return}
  /* Kapanış animasyonu: kısa süre sonra gerçekten gizlenir; bu arada yeniden açılırsa openModal iptal eder */
  m.classList.add('closing');clearTimeout(m._ct);m._ct=setTimeout(()=>{if(m.classList.contains('closing')){m.hidden=true;m.classList.remove('closing')}},170)}
document.addEventListener('DOMContentLoaded',()=>{$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'&&!$('#mbox').dataset.lockbg)closeModal()})});
function confetti(){
  if(reduce)return;const c=$('#fx'),x=c.getContext('2d');const ls=$('#lesson'),host=ls&&!ls.hidden?ls:document.body;if(c.parentNode!==host)host.appendChild(c);c.classList.toggle('fx-in',host===ls);c.width=innerWidth;c.height=innerHeight;
  const cols=['#E58A2C','#F2B451','#A3461F','#4B5A3A','#C2412D','#F7DDA6'],W=innerWidth,H=innerHeight;
  /* Üç patlama: sol ve sağ köşeden yukarı çapraz, ortadan yelpaze. Şekiller: kare, şerit, daire, üçgen */
  const mk=(x0,y0,ang,spread,pw,n)=>Array.from({length:n},()=>{const a=ang+(Math.random()-.5)*spread,v=(.55+Math.random()*.6)*pw;
    return{x:x0,y:y0,vx:Math.cos(a)*v,vy:Math.sin(a)*v,s:6+Math.random()*7,sh:(Math.random()*4)|0,r:Math.random()*6.3,vr:(Math.random()-.5)*.35,ph:Math.random()*6.3,fl:.1+Math.random()*.2,c:pick(cols),d:Math.random()*8|0}});
  const pw=Math.min(20,Math.max(13,H/42));
  const P=[].concat(mk(W*.08,H*.78,-1.15,.9,pw,45),mk(W*.92,H*.78,-Math.PI+1.15,.9,pw,45),mk(W/2,H*.45,-Math.PI/2,1.6,pw*.8,40));
  let n=0;const T=190;(function f(){x.clearRect(0,0,c.width,c.height);
    P.forEach(p=>{if(p.d>0){p.d--;return}p.vy+=.34;p.vx*=.985;p.vy*=.99;p.x+=p.vx+Math.sin(p.ph+n*.08)*.5;p.y+=p.vy;p.r+=p.vr;p.ph+=p.fl;
      const a=n>T-40?Math.max(0,(T-n)/40):1;x.globalAlpha=a;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;
      const k=Math.cos(p.ph*2.2),s=p.s;/* k: şeklin havada dönerken yassılması (3B his) */
      if(p.sh===0){x.scale(1,k);x.fillRect(-s/2,-s/2,s,s)}
      else if(p.sh===1){x.scale(1,k);x.fillRect(-s*.9,-s*.22,s*1.8,s*.44)}
      else if(p.sh===2){x.beginPath();x.arc(0,0,s*.45,0,6.3);x.fill()}
      else{x.scale(1,k);x.beginPath();x.moveTo(0,-s*.6);x.lineTo(s*.55,s*.45);x.lineTo(-s*.55,s*.45);x.closePath();x.fill()}
      x.restore()});
    x.globalAlpha=1;if(++n<T)requestAnimationFrame(f);else x.clearRect(0,0,c.width,c.height)})();
}
let framed=true;try{framed=window.self!==window.top}catch(e){}

/* Görev ve rozet kontrolü: ödülü ver, yeni kazanılanları döndür */
function questCheck(){const out=[];quests().forEach(q=>{if(!S.day.claimed[q.id]&&(S.day[q.f]||0)>=q.n){S.day.claimed[q.id]=1;S.gems+=q.gems;out.push(q)}});return out}
function quests(){const d=dayNum(S.day.k),a=QPOOL[d%QPOOL.length];let b=QPOOL[(d+2)%QPOOL.length];if(b.id===a.id)b=QPOOL[(d+1)%QPOOL.length];
  return[{id:'xp',name:S.goal+' DP kazan',n:S.goal,f:'xp',gems:10,icon:'bolt'},a,b]}
/* Ders dışı küçük ödül (atölye, laboratuvar): DP + mozaik taşı + seri + görevler + rozetler, hepsini bildirir */
function smallReward(xp,gems,why){
  const before=new Set(Object.keys(S.badges));addXP(xp);S.gems+=gems;touchStreak();
  const q=questCheck();const nb=[...badgeSet()].filter(b=>!before.has(b));nb.forEach(b=>S.badges[b]=dkey());save();renderStats();
  toast(`${fi('bolt',20)} ${why?esc(why)+' · ':''}+${xp} DP${gems?`, +${gems} mozaik taşı`:''}`);
  if(q.length)setTimeout(()=>toast(`${ic('chest',20)} Görev tamam: ${esc(q[0].name)} · +${q[0].gems} mozaik taşı`),2900);
  if(nb.length){const b=BADGES.find(x=>x.id===nb[0]);setTimeout(()=>{sfx.win();openModal(`<div class="medal" style="width:110px;height:110px">${ic(b.icon,54)}</div><h2>Yeni rozet: ${b.name}</h2><p>${b.desc}</p>${anka('cheer',90,undefined,'act-dance')}<button class="b3" type="button" id="mok">Harika!</button>`);$('#mok').onclick=closeModal},q.length?5800:2900)}
}

/* Uygulamada (APK) durum çubuğunu temaya uydur */
function appBars(){try{const SB=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.StatusBar;if(!SB)return;document.documentElement.classList.add('is-app');
  if(document.getElementById('boot')){SB.setOverlaysWebView({overlay:false});SB.setStyle({style:'DARK'});SB.setBackgroundColor({color:'#D9822B'});return}
  const dark=document.documentElement.dataset.theme==='dark'||(document.documentElement.dataset.theme!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);
  SB.setOverlaysWebView({overlay:false});SB.setStyle({style:dark?'DARK':'LIGHT'});SB.setBackgroundColor({color:getComputedStyle(document.documentElement).getPropertyValue('--tessera').trim()||(dark?'#1C1A14':'#F4EAD6')})}catch(e){}}
addEventListener('load',appBars);try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',appBars)}catch(e){}

/* Üst çubuktaki sayılara dokununca kısa açıklama */
const EXPLAIN={gm:'Mozaik taşı: ders, görev ve sandıklardan kazanılır; yuvada harcanır.',dp:'DP = Deneyim Puanı: her ders ve alıştırmada kazanılır.',ht:'Kalp: yanlış cevapta gider. 5 dakikada 1 kalp yenilenir; ders bitirince +1 kalp.',fl:'Seri: üst üste kaç gün ders yaptığını gösterir.'};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.stat.gm,.stat.ht,.stat.fl,[data-dp]');if(!t)return;
  const k=t.matches('[data-dp]')?'dp':t.classList.contains('gm')?'gm':t.classList.contains('ht')?'ht':'fl';toast(EXPLAIN[k],3600)});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('.stat[role="button"],[data-dp][role="button"]')){e.preventDefault();e.target.click()}});
