/* #BilimKıvılcımı · Anka canlı
   1) Boşta küçük davranışlar (ruh hâline göre): göz kırpma, etrafa bakınma, merakla bakma, gerinme, tüy düzeltme,
      minik zıplama, tüy silkeleme; üzgünken iç çekme, uykuda horlama, düşünürken kafa yatırma. (css/anka3d.css)
   2) Parmağı / fareyi izler: gözler önden, kafa (yüz katmanları) arkadan döner, gövde hafifçe eğilir (--lx, --ly, --tl).
   3) Ders içinde Duolingo'daki gibi ara anlar: 5 ve 8 doğru üst üste, dersin yarısı.
   anka.js ve learn.js'ten SONRA yüklenir. */
'use strict';
(function(){
  if(typeof reduce!=='undefined'&&reduce)return;
  /* süreler (ms) anka3d.css'teki animasyonlarla aynı */
  const DUR={'mi-blink':750,'mi-look':1850,'mi-peek':1650,'mi-stretch':1550,'mi-preen':1450,'mi-hop':950,'mi-fluff':1150,'mi-sigh':2050,'mi-snore':2450,'mi-ponder':1850};
  const POOL={
    def:['mi-blink','mi-look','mi-peek','mi-stretch','mi-preen','mi-hop','mi-fluff','mi-blink','mi-look'],
    nolid:['mi-look','mi-peek','mi-stretch','mi-preen','mi-hop','mi-fluff','mi-look'],
    cheer:['mi-hop','mi-look','mi-fluff','mi-peek'],
    sad:['mi-blink','mi-sigh','mi-look','mi-sigh'],
    sleep:['mi-snore'],
    think:['mi-blink','mi-ponder','mi-peek','mi-look','mi-ponder']};
  const poolOf=a=>{const c=a.classList;
    if(c.contains('sleep'))return POOL.sleep;if(c.contains('sad'))return POOL.sad;if(c.contains('think'))return POOL.think;
    if(c.contains('cheer'))return POOL.cheer;return a.querySelector('.lid')?POOL.def:POOL.nolid};
  const vis=a=>{const r=a.getBoundingClientRect();return r.width>30&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth&&!a.closest('[hidden]')};
  const busy=a=>[...a.classList].some(c=>c.startsWith('act-')||c.startsWith('mi-'));
  function life(){
    if(document.visibilityState==='visible'){
      const all=[...document.querySelectorAll('svg.anka')].filter(a=>vis(a)&&!busy(a)&&!a.closest('.wm'));
      if(all.length){const a=all[Math.random()*all.length|0],P=poolOf(a),m=P[Math.random()*P.length|0];
        a.classList.add(m);clearTimeout(a._miT);a._miT=setTimeout(()=>a.classList.remove(m),DUR[m]||1700)}}
    setTimeout(life,2600+Math.random()*3800);
  }
  setTimeout(life,3000);

  /* Parmağı izler. --lx/--ly: -1..1 bakış yönü (anka3d.css'te yüz +4, yanak +3, tepe −1.4, kuyruk −2.2 birim kayar),
     --tl: gövde eğimi (derece). Telefonda (kaba işaretçi) eğim hafif kalır. */
  const TILT=matchMedia('(pointer:coarse)').matches?1.6:3;
  let raf=0,px=-1,py=-1;
  function track(){raf=0;
    document.querySelectorAll('svg.anka').forEach(a=>{
      if(a.closest('.wm'))return;const r=a.getBoundingClientRect();if(r.width<30||r.bottom<0||r.top>innerHeight)return;
      const cx=r.left+r.width/2,cy=r.top+r.height*.42,dx=px-cx,dy=py-cy,d=Math.hypot(dx,dy)||1,k=Math.min(1,d/260);
      const lx=(dx/d)*k,ly=(dy/d)*k*.85,tl=(dx/d)*k*TILT;
      if(Math.abs((a._lx||0)-lx)+Math.abs((a._ly||0)-ly)<.02)return;a._lx=lx;a._ly=ly;
      a.style.setProperty('--lx',lx.toFixed(3));a.style.setProperty('--ly',ly.toFixed(3));a.style.setProperty('--tl',tl.toFixed(2))})}
  const mv=e=>{const t=e.touches?e.touches[0]:e;if(!t)return;px=t.clientX;py=t.clientY;if(!raf)raf=requestAnimationFrame(track)};
  addEventListener('pointermove',mv,{passive:true});addEventListener('touchstart',mv,{passive:true});
  /* Bir süre dokunulmazsa bakış yumuşakça ortaya döner (geçişler anka3d.css'te) */
  let idleT;const rest=()=>{clearTimeout(idleT);idleT=setTimeout(()=>document.querySelectorAll('svg.anka').forEach(a=>{a._lx=a._ly=0;['--lx','--ly','--tl'].forEach(v=>a.style.removeProperty(v))}),2500)};
  addEventListener('pointermove',rest,{passive:true});addEventListener('touchstart',rest,{passive:true});
})();

/* ===== Ders içi ara anlar ===== */
function momentFor(L){
  if(!L||!['lesson','practice','preview'].includes(L.mode)||!L.queue.length)return null;
  L.moments=L.moments||{};
  if(L.combo===5&&!L.moments.c5)return L.moments.c5='c5';
  if(L.combo===8&&!L.moments.c8)return L.moments.c8='c8';
  if(L.total>=8&&L.done===Math.ceil(L.total/2)&&!L.moments.half&&L.combo>=1)return L.moments.half='half';
  return null;
}
function momentHtml(k,L){
  const T={c5:['5 doğru üst üste!','Alev aldın! Durdurulamıyorsun.','cheer','act-spin'],
           c8:['8 doğru üst üste!','Gerçek bir anka gibi uçuyorsun!','love','act-flip'],
           half:['Yarıladın!','Dersin yarısı bitti. Böyle devam!','wave','act-jump']}[k];
  const sparks=Array.from({length:10},(_,i)=>`<i style="--a:${i*36}deg;--d:${(i%3)*.08}s"></i>`).join('');
  return `<div class="moment mo-${k}" role="status"><div class="mo-stage"><div class="mo-sun"></div><div class="mo-spark">${sparks}</div>
    <div class="mo-ank">${anka(T[2],200,undefined,T[3])}</div>${k!=='half'?`<div class="mo-fl">${fi('flame',62)}<b>${L.combo}</b></div>`:''}</div>
    <h2 class="mo-h">${T[0]}</h2><p class="mo-p">${T[1]}</p></div>`;
}
