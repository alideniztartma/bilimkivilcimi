/* #BilimKıvılcımı · Anka canlı
   1) Boşta küçük davranışlar: çift göz kırpma, etrafa bakma, gerinme, tüy düzeltme, minik zıplama.
   2) Gözler parmağı / fareyi izler.
   3) Ders içinde Duolingo'daki gibi ara anlar: 5 ve 8 doğru üst üste, dersin yarısı.
   anka.js ve learn.js'ten SONRA yüklenir. */
'use strict';
(function(){
  if(typeof reduce!=='undefined'&&reduce)return;
  const MICRO=['mi-blink','mi-look','mi-stretch','mi-preen','mi-hop','mi-blink','mi-look'];
  const vis=a=>{const r=a.getBoundingClientRect();return r.width>30&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth&&!a.closest('[hidden]')};
  const busy=a=>[...a.classList].some(c=>c.startsWith('act-')||c.startsWith('mi-'));
  function life(){
    if(document.visibilityState==='visible'){
      const all=[...document.querySelectorAll('svg.anka')].filter(a=>vis(a)&&!busy(a)&&!a.closest('.wm'));
      if(all.length){const a=all[Math.random()*all.length|0];
        const sleepy=a.classList.contains('sleep')||a.classList.contains('sad');
        const m=sleepy?'mi-blink':MICRO[Math.random()*MICRO.length|0];
        a.classList.add(m);setTimeout(()=>a.classList.remove(m),1700)}}
    setTimeout(life,2600+Math.random()*3800);
  }
  setTimeout(life,3000);

  /* Gözler parmağı izler (göz bebeği en fazla ~3 birim kayar) */
  let raf=0,px=-1,py=-1;
  function track(){raf=0;
    document.querySelectorAll('svg.anka').forEach(a=>{
      if(a.closest('.wm'))return;const r=a.getBoundingClientRect();if(r.width<30||r.bottom<0||r.top>innerHeight)return;
      const cx=r.left+r.width/2,cy=r.top+r.height*.42,dx=px-cx,dy=py-cy,d=Math.hypot(dx,dy)||1,k=Math.min(1,d/260);
      const tx=(dx/d)*3.2*k,ty=(dy/d)*2.6*k;
      a.querySelectorAll('.pup').forEach(p=>p.style.translate=`${tx.toFixed(2)}px ${ty.toFixed(2)}px`)})}
  const mv=e=>{const t=e.touches?e.touches[0]:e;if(!t)return;px=t.clientX;py=t.clientY;if(!raf)raf=requestAnimationFrame(track)};
  addEventListener('pointermove',mv,{passive:true});addEventListener('touchstart',mv,{passive:true});
  /* Bir süre dokunulmazsa bakış ortaya döner */
  let idleT;addEventListener('pointermove',()=>{clearTimeout(idleT);idleT=setTimeout(()=>document.querySelectorAll('svg.anka .pup').forEach(p=>p.style.translate=''),2500)},{passive:true});
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
