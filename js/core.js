/* #BilimKıvılcımı · Durum, ses, bildirim, ödüller */
'use strict';

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
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}if(typeof scheduleSync==='function')scheduleSync()}

/* Eski laboratuvar kayıtlarını yeni sisteme taşı */
/* Alan dersleri artık yol haritasında: eski ayrı kayıtları ders kayıtlarına taşı */
if(S.cat&&Object.keys(S.cat).length){Object.keys(S.cat).forEach(k=>{S.done[k]=Math.max(S.done[k]||0,S.cat[k])});S.cat={};save()}
/* Tek aksesuardan yuva sistemine geçiş: eski takılı aksesuar ilgili yuvaya geçer */
if(S.equip){const it=SHOP.find(i=>i.id===S.equip);if(it&&it.slot&&!S.wear[it.slot])S.wear[it.slot]=S.equip;S.equip=null}
S.wear=Object.assign({head:null,face:null,neck:null},S.wear);S.pet=Object.assign({food:70,joy:70,t:Date.now(),inv:{},fed:0,pets:0},S.pet);
/* v3: FRC müfredatı. Eski elektronik kupası 7. sıradan 9. sıraya taşınır. */
if(!S.frc){if(S.trophies&&S.trophies[7]&&!S.trophies[9]){S.trophies[9]=S.trophies[7];delete S.trophies[7]}S.frc=1}
(function migrate(){if(S.lab.migrated)return;try{const o=JSON.parse(localStorage.getItem(OLDLAB));if(o&&o.done){
  const map={sarkac:'sarkac-1',kaldirac:'kaldirac-0',devre:'devre-0',kesir:'kesir-0'};Object.keys(map).forEach(k=>{if(o.done[k])S.lab.tasks[map[k]]=dkey()})}}catch(e){}
  S.lab.migrated=1;save()})();

function applyTheme(){if(S.theme==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',S.theme)}
applyTheme();

function dayCheck(){
  const t=dkey();
  if(S.day.k!==t)S.day=newDay();
  if(S.lastDay&&S.streak>0){const gap=dayNum(t)-dayNum(S.lastDay);
    if(gap>1){const miss=gap-1;
      if(S.freeze>=miss){S.freeze-=miss;const y=new Date();y.setDate(y.getDate()-1);S.lastDay=dkey(y);setTimeout(()=>toast(ic('snow',20)+'Seri koruyucu serini kurtardı!'),600)}
      else S.streak=0}}
  const HR=10*60*1000;
  if(S.hearts<5&&S.heartAt){const n=Math.floor((Date.now()-S.heartAt)/HR);if(n>0){S.hearts=Math.min(5,S.hearts+n);S.heartAt=S.hearts>=5?null:S.heartAt+n*HR}}
  if(S.hearts>=5)S.heartAt=null;
  save();
}
function addXP(x){S.xp+=x;S.day.xp+=x}
function touchStreak(){const today=dkey();if(S.lastDay===today)return false;
  S.streak=(S.lastDay&&dayNum(today)-dayNum(S.lastDay)===1&&S.streak>0)?S.streak+1:1;S.lastDay=today;S.best=Math.max(S.best,S.streak);
  if(!S.days.includes(today))S.days=S.days.concat(today).slice(-21);return true}

/* Ses efektleri */
let AC=null;
function tone(seq,type='sine',vol=.12){if(!S.sound)return;
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();let t=AC.currentTime;
    seq.forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d);t+=d*.8})}catch(e){}}
const sfx={ok:()=>tone([[660,.09],[990,.16]]),bad:()=>tone([[196,.14],[147,.22]],'triangle',.16),tap:()=>tone([[520,.04]],'sine',.05),
  win:()=>tone([[523,.12],[659,.12],[784,.12],[1047,.3]],'triangle',.12),coin:()=>tone([[1200,.06],[1600,.12]],'square',.05),tick:()=>tone([[880,.03]],'square',.03),chirp:()=>tone([[1180,.05],[1560,.06],[1320,.07]],'sine',.06),
  whoosh:()=>tone([[300,.08],[500,.08],[800,.12]],'sawtooth',.04),splash:()=>tone([[180,.06],[120,.18]],'triangle',.1),thud:()=>tone([[90,.15]],'square',.12)};
/* Titreşim: uygulamada Capacitor Haptics, tarayıcıda navigator.vibrate */
function haptic(k){if(!S||S.vib===false)return;try{const H=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.Haptics;
  if(H){if(k==='ok')H.notification({type:'SUCCESS'});else if(k==='bad')H.notification({type:'ERROR'});else if(k==='win')H.notification({type:'SUCCESS'});else H.impact({style:k==='heavy'?'MEDIUM':'LIGHT'});return}
  if(navigator.vibrate)navigator.vibrate(k==='bad'?[35,50,35]:k==='ok'||k==='win'?[15,40,20]:k==='heavy'?25:12)}catch(e){}}
['ok','bad','win'].forEach(k=>{const f=sfx[k];sfx[k]=(...a)=>{haptic(k);return f(...a)}});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('button,a[href],[role="button"],[data-node],.node,label,summary');if(t&&!t.disabled)haptic('tap')},true);

/* Sesli okuma */
const canSpeak='speechSynthesis' in window&&typeof SpeechSynthesisUtterance!=='undefined';
function speak(text){if(!canSpeak)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(strip(text).replace(/_{3}/g,'boşluk'));u.lang='tr-TR';u.rate=.95;
  const v=speechSynthesis.getVoices().find(v=>/^tr/i.test(v.lang));if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){}}
const spkBtn=t=>canSpeak?`<button class="spk" type="button" data-say="${esc(strip(t))}" aria-label="Sesli oku">${ic('vol',20)}</button>`:'';
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.stopPropagation();speak(b.dataset.say)}});

/* Bildirim, pencere, konfeti */
let toastT;
function toast(h){const t=$('#toast');t.innerHTML=h;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2800)}
function openModal(html,wide){$('#mbox').className='mbox'+(wide?' wide':'');$('#mbox').innerHTML=html;$('#modal').hidden=false;const f=$('#mbox button,#mbox input');if(f)setTimeout(()=>f.focus(),30)}
function closeModal(){$('#modal').hidden=true;delete $('#mbox').dataset.lockbg}
document.addEventListener('DOMContentLoaded',()=>{$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'&&!$('#mbox').dataset.lockbg)closeModal()})});
function confetti(){
  if(reduce)return;const c=$('#fx'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;
  const cols=['#A3461F','#D9822B','#4B5A3A','#DCC190','#8E2B22','#EBC27A'];
  const P=Array.from({length:150},()=>({x:innerWidth/2+(Math.random()-.5)*220,y:innerHeight*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,s:7+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:pick(cols)}));
  let n=0;(function f(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.vy+=.38;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s);x.restore()});
    if(++n<170)requestAnimationFrame(f);else x.clearRect(0,0,c.width,c.height)})();
}
let framed=true;try{framed=window.self!==window.top}catch(e){}

/* Görev ve rozet kontrolü: ödülü ver, yeni kazanılanları döndür */
function questCheck(){const out=[];quests().forEach(q=>{if(!S.day.claimed[q.id]&&(S.day[q.f]||0)>=q.n){S.day.claimed[q.id]=1;S.gems+=q.gems;out.push(q)}});return out}
function quests(){const d=dayNum(S.day.k),a=QPOOL[d%QPOOL.length];let b=QPOOL[(d+2)%QPOOL.length];if(b.id===a.id)b=QPOOL[(d+1)%QPOOL.length];
  return[{id:'xp',name:S.goal+' DP kazan',n:S.goal,f:'xp',gems:10,icon:'bolt'},a,b]}
/* Ders dışı küçük ödül (atölye, laboratuvar): DP + taş + seri + görevler + rozetler, hepsini bildirir */
function smallReward(xp,gems,why){
  const before=new Set(Object.keys(S.badges));addXP(xp);S.gems+=gems;touchStreak();
  const q=questCheck();const nb=[...badgeSet()].filter(b=>!before.has(b));nb.forEach(b=>S.badges[b]=dkey());save();renderStats();
  toast(`${fi('bolt',20)} ${why?esc(why)+' · ':''}+${xp} DP${gems?`, +${gems} taş`:''}`);
  if(q.length)setTimeout(()=>toast(`${ic('chest',20)} Görev tamam: ${esc(q[0].name)} · +${q[0].gems} taş`),2900);
  if(nb.length){const b=BADGES.find(x=>x.id===nb[0]);setTimeout(()=>{sfx.win();openModal(`<div class="medal" style="width:110px;height:110px">${ic(b.icon,54)}</div><h2>Yeni rozet: ${b.name}</h2><p>${b.desc}</p>${anka('cheer',90,undefined,'act-dance')}<button class="b3" type="button" id="mok">Harika!</button>`);$('#mok').onclick=closeModal},q.length?5800:2900)}
}
