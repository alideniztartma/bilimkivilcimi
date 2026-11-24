/* #BilimKıvılcımı · Mekanik temel üniteleri (çok basit başlangıç)
   Görsel yardımcıları ve tm* görselleri. Dersler js/mekanik.js içindedir.
   gorsel.js'ten sonra, mekanik.js ve egitim.js'ten önce yüklenir. Görseller FIG nesnesine eklenir. */
'use strict';

/* ---------- Küçük animasyon stilleri (bu dosyaya özel) ---------- */
(function(){
  const st=document.createElement('style');
  st.textContent=
  '.tmTilt{animation:tmTilt 3.2s ease-in-out infinite}@keyframes tmTilt{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}'+
  '.tmScA{animation:tmScA 2.4s ease-in-out infinite}@keyframes tmScA{0%,100%{transform:rotate(3deg)}50%{transform:rotate(15deg)}}'+
  '.tmScB{animation:tmScB 2.4s ease-in-out infinite}@keyframes tmScB{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(-15deg)}}'+
  '.tmPush{animation:tmPush 2.4s ease-in-out infinite}@keyframes tmPush{0%,100%{transform:translateX(0)}50%{transform:translateX(16px)}}'+
  '.tmNut{animation:tmNut 4s ease-in-out infinite}@keyframes tmNut{0%,10%,100%{transform:translateX(0)}50%,60%{transform:translateX(80px)}}'+
  '.tmLever{animation:tmLv 2.4s ease-in-out infinite}@keyframes tmLv{0%,100%{transform:rotate(0)}50%{transform:rotate(28deg)}}'+
  '@media (prefers-reduced-motion:reduce){.tmTilt,.tmScA,.tmScB,.tmPush,.tmNut,.tmLever{animation:none}}';
  document.head.appendChild(st);
})();

/* ---------- Yardımcılar ---------- */
const tmF=n=>n.toFixed(1);
/* İki çemberi saran kayış/zincir yolu (merkezler aynı yükseklikte, r1>r2) */
function tmBelt(x1,y,r1,x2,r2){
  const d=x2-x1,s=(r1-r2)/d,c=Math.sqrt(1-s*s);
  const ax=x1+r1*s,bx=x2+r2*s;
  return `M${tmF(ax)} ${tmF(y-r1*c)} L${tmF(bx)} ${tmF(y-r2*c)} A${r2} ${r2} 0 0 1 ${tmF(bx)} ${tmF(y+r2*c)} L${tmF(ax)} ${tmF(y+r1*c)} A${r1} ${r1} 0 1 1 ${tmF(ax)} ${tmF(y-r1*c)}Z`;
}
const tmLine=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${GK.ink}" stroke-width="1.5" fill="none"/>`;
function tmWheel(cx,cy,r,dur,cls){
  return `<g class="${cls||'gspin'}" style="transform-origin:${cx}px ${cy}px;animation-duration:${dur}s"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="4"/>`+
    `<path d="M${cx-r} ${cy}H${cx+r}M${cx} ${cy-r}V${cy+r}" stroke="${GK.ink}" stroke-width="2"/></g>`;
}
function tmPulley(cx,cy,r,dur){
  return `<g class="gspin" style="transform-origin:${cx}px ${cy}px;animation-duration:${dur}s"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${GK.sand}" stroke="${GK.ink}" stroke-width="3"/>`+
    [0,60,120].map(a=>`<path d="M${tmF(cx-Math.cos(a*Math.PI/180)*(r-6))} ${tmF(cy-Math.sin(a*Math.PI/180)*(r-6))}L${tmF(cx+Math.cos(a*Math.PI/180)*(r-6))} ${tmF(cy+Math.sin(a*Math.PI/180)*(r-6))}" stroke="${GK.ink}" stroke-width="2"/>`).join('')+
    `<circle cx="${cx}" cy="${cy}" r="5" fill="${GK.ember}" stroke="${GK.ink}" stroke-width="2"/></g>`;
}
const tmPerson=(x,col)=>`<circle cx="${x}" cy="76" r="10" fill="${col}" stroke="${GK.ink}" stroke-width="2"/><path d="M${x} 86V118M${x} 118L${x-8} 140M${x} 118L${x+8} 140" stroke="${GK.ink}" stroke-width="5" stroke-linecap="round" fill="none"/>`;
const tmArrow=(x1,x2,y)=>`<path d="M${x1} ${y}H${x2-6}" stroke="${GK.terra}" stroke-width="5" stroke-linecap="round"/><path d="M${x2-10} ${y-9}L${x2} ${y}L${x2-10} ${y+9}Z" fill="${GK.terra}"/>`;

/* ---------- Yeni görseller ---------- */
Object.assign(FIG,{
 tmMakine:`<svg viewBox="0 0 360 170">
  <g class="gbob"><path d="M38 28L82 100M82 28L38 100" stroke="${GK.steelD}" stroke-width="7" stroke-linecap="round"/><circle cx="84" cy="110" r="11" fill="none" stroke="${GK.ember}" stroke-width="5"/><circle cx="36" cy="110" r="11" fill="none" stroke="${GK.terra}" stroke-width="5"/><circle cx="60" cy="64" r="4.5" fill="${GK.ink}"/></g>
  <g class="gbob" style="animation-delay:.5s">${tmWheel(140,102,26,3)}${tmWheel(225,102,26,3)}<path d="M140 102L180 102L168 64Z M168 64H212L180 102M212 64L225 102M208 50L212 64M200 50H218M158 58H178" stroke="${GK.terra}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" fill="none"/><circle cx="180" cy="102" r="6" fill="${GK.ember}" stroke="${GK.ink}" stroke-width="2"/></g>
  <g class="gbob" style="animation-delay:1s"><rect x="272" y="26" width="56" height="100" rx="4" fill="${GK.sand}" stroke="${GK.ink}" stroke-width="3"/><g class="tmLever" style="transform-origin:288px 80px"><rect x="284" y="75" width="36" height="10" rx="5" fill="${GK.steelD}" stroke="${GK.ink}" stroke-width="2"/></g><circle cx="288" cy="80" r="7" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2"/></g>
  ${gt(60,150,'Makas',{s:13})}${gt(182,150,'Bisiklet',{s:13})}${gt(300,150,'Kapı kolu',{s:13})}</svg>`,

 tmKuvvet:`<svg viewBox="0 0 360 180">
  <path d="M10 140H350" stroke="${GK.line}" stroke-width="4" stroke-linecap="round"/>
  ${gt(90,28,'İTME',{s:15,c:GK.terra})}${gt(270,28,'ÇEKME',{s:15,c:GK.terra})}
  <g class="tmPush">${tmPerson(36,GK.ember)}<path d="M36 95L78 104" stroke="${GK.ink}" stroke-width="5" stroke-linecap="round"/><rect x="78" y="98" width="46" height="42" rx="4" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="3"/>${tmArrow(60,140,60)}</g>
  <g class="tmPush"><path d="M246 118H300" stroke="${GK.ink}" stroke-width="3" stroke-dasharray="5 3"/><rect x="200" y="98" width="46" height="42" rx="4" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="3"/>${tmArrow(210,290,60)}</g>
  ${tmPerson(322,GK.blue)}<path d="M322 95L300 118" stroke="${GK.ink}" stroke-width="5" stroke-linecap="round"/>
  ${gt(90,166,'İtme: uzaklaştırır',{s:12})}${gt(270,166,'Çekme: yaklaştırır',{s:12})}</svg>`,

 tmTahterevalli:`<svg viewBox="0 0 360 200">
  ${gt(180,22,'Tahterevalli bir kaldıraçtır',{s:13})}
  <path d="M10 172H350" stroke="${GK.line}" stroke-width="4" stroke-linecap="round"/>
  <g class="tmTilt" style="transform-origin:180px 140px"><rect x="40" y="134" width="280" height="9" rx="4" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2"/>
   <circle cx="72" cy="86" r="11" fill="${GK.ember}" stroke="${GK.ink}" stroke-width="2"/><rect x="61" y="98" width="22" height="36" rx="7" fill="${GK.olive}" stroke="${GK.ink}" stroke-width="2"/>
   <circle cx="288" cy="86" r="11" fill="${GK.terra}" stroke="${GK.ink}" stroke-width="2"/><rect x="277" y="98" width="22" height="36" rx="7" fill="${GK.blue}" stroke="${GK.ink}" stroke-width="2"/></g>
  <path d="M158 172L202 172L180 142Z" fill="${GK.rust}" stroke="${GK.ink}" stroke-width="2" stroke-linejoin="round"/><circle cx="180" cy="141" r="5" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="2"/>
  ${tmLine(180,184,180,160)}${gt(180,196,'Dayanak noktası (döndüğü yer)',{s:12,c:GK.terra})}</svg>`,

 tmMakas:`<svg viewBox="0 0 360 190">
  ${gt(180,24,'Makas da bir kaldıraçtır!',{s:13})}
  <g class="tmScA" style="transform-origin:170px 90px"><path d="M168 84L312 90L168 96Z" fill="${GK.steel}" stroke="${GK.steelD}" stroke-width="2" stroke-linejoin="round"/><path d="M170 90H100" stroke="${GK.ember}" stroke-width="8" stroke-linecap="round"/><circle cx="84" cy="90" r="16" fill="none" stroke="${GK.ember}" stroke-width="6"/></g>
  <g class="tmScB" style="transform-origin:170px 90px"><path d="M168 84L312 90L168 96Z" fill="${GK.steel}" stroke="${GK.steelD}" stroke-width="2" stroke-linejoin="round"/><path d="M170 90H100" stroke="${GK.terra}" stroke-width="8" stroke-linecap="round"/><circle cx="84" cy="90" r="16" fill="none" stroke="${GK.terra}" stroke-width="6"/></g>
  <circle cx="170" cy="90" r="7" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="2.5"/>
  ${tmLine(170,150,170,102)}
  ${gt(70,166,'Parmaklar sıkar',{s:11})}${gt(178,168,'Dönme noktası (vida)',{s:11,c:GK.terra})}${gt(300,166,'Bıçaklar keser',{s:11})}</svg>`,

 tmTekerlek:`<svg viewBox="0 0 360 200">
  <g class="gspin" style="transform-origin:95px 100px;animation-duration:4s"><circle cx="95" cy="100" r="48" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="10"/><path d="M95 56V144M51 100H139M64 69L126 131M126 69L64 131" stroke="${GK.ink}" stroke-width="3"/></g>
  <circle cx="95" cy="100" r="9" fill="${GK.ember}" stroke="${GK.ink}" stroke-width="2.5"/>
  ${tmLine(150,44,102,93)}${gt(158,40,'Aks',{s:13,a:'start',c:GK.terra})}${tmLine(38,50,64,72)}${gt(36,44,'Tekerlek',{s:12,a:'start'})}
  <rect x="226" y="72" width="94" height="52" rx="10" fill="${GK.terra}" stroke="${GK.ink}" stroke-width="2.5"/>
  <rect x="208" y="58" width="16" height="80" rx="5" fill="${GK.ink}"/><rect x="322" y="58" width="16" height="80" rx="5" fill="${GK.ink}"/>
  <rect x="208" y="94" width="130" height="8" rx="3" fill="${GK.steel}" stroke="${GK.steelD}" stroke-width="2"/>
  ${tmLine(273,150,273,106)}${gt(273,166,'Aks',{s:13,c:GK.terra})}
  ${gt(95,190,'Yandan bakış',{s:12,c:'#6B604A'})}${gt(273,190,'Üstten bakış: oyuncak araba',{s:12,c:'#6B604A'})}</svg>`,

 tmDisliEs:`<svg viewBox="0 0 360 190">
  ${gGear(90,90,40,12,GK.ember,'gspin',3)}${gGear(166,90,40,12,GK.olive,'gspinr',3)}
  ${tmLine(262,48,198,66)}${gt(266,52,'Diş',{s:14,a:'start',c:GK.terra})}
  ${gt(90,152,'Saat yönünde',{s:11})}${gt(166,152,'Ters yönde',{s:11})}
  ${gt(180,180,'Birine dokunan diğerini ters yöne çevirir',{s:11,c:'#6B604A',w:700})}</svg>`,

 tmDisliBK:`<svg viewBox="0 0 360 200">
  ${gGear(100,95,30,10,GK.ember,'gspin',1.5)}${gGear(186,95,60,20,GK.olive,'gspinr',3)}
  ${gt(100,148,'Küçük dişli',{s:12})}${gt(100,164,'10 diş · hızlı',{s:11,w:700,c:GK.terra})}
  ${gt(186,176,'Büyük dişli',{s:12})}${gt(186,192,'20 diş · yavaş ama güçlü',{s:11,w:700,c:GK.olive})}
  <rect x="262" y="62" width="92" height="66" rx="10" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="2"/>${gt(308,86,'Küçük 2 tur',{s:12})}${gt(308,104,'atarken',{s:11,w:600,c:'#6B604A'})}${gt(308,120,'büyük 1 tur',{s:12})}</svg>`,

 tmZincir:`<svg viewBox="0 0 360 190">
  <circle cx="270" cy="95" r="62" fill="none" stroke="${GK.ink}" stroke-width="6"/>
  ${gGear(110,95,44,22,GK.olive,'gspin',3)}${gGear(270,95,22,11,GK.ember,'gspin',1.5)}
  <path d="${tmBelt(110,95,41,270,19)}" fill="none" stroke="${GK.ink}" stroke-width="5"/>
  <path class="gchain" d="${tmBelt(110,95,41,270,19)}" fill="none" stroke="${GK.gold}" stroke-width="2" stroke-dasharray="4 8"/>
  ${tmLine(190,44,190,60)}${gt(190,38,'Zincir',{s:13,c:GK.terra})}
  ${gt(110,160,'Pedal dişlisi (büyük)',{s:11})}${gt(270,178,'Arka dişli (küçük)',{s:11})}</svg>`,

 tmKasnak:`<svg viewBox="0 0 360 180">
  ${gt(180,22,'Kayış dönmeyi bir kasnaktan ötekine taşır',{s:12})}
  <path d="${tmBelt(110,95,45,250,25)}" fill="none" stroke="${GK.ink}" stroke-width="6"/>
  <path class="gchain" d="${tmBelt(110,95,45,250,25)}" fill="none" stroke="${GK.gold}" stroke-width="2" stroke-dasharray="4 10"/>
  ${tmPulley(110,95,40,3)}${tmPulley(250,95,21,1.7)}
  ${gt(110,158,'Büyük kasnak',{s:11})}${gt(250,138,'Küçük kasnak',{s:11})}${gt(335,100,'Kayış',{s:12,a:'end',c:GK.terra})}${tmLine(300,98,276,86)}</svg>`,

 tmVida:`<svg viewBox="0 0 360 190">
  <rect x="34" y="55" width="36" height="70" rx="6" fill="${GK.steelD}" stroke="${GK.ink}" stroke-width="2"/>
  <rect x="70" y="75" width="232" height="30" fill="${GK.steel}" stroke="${GK.steelD}" stroke-width="2"/>
  ${Array.from({length:19},(_,i)=>`<path d="M${80+i*12} 75l8 30" stroke="${GK.steelD}" stroke-width="2"/>`).join('')}
  <g class="tmNut"><rect x="116" y="60" width="44" height="60" rx="7" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2.5"/><path d="M126 62V118M150 62V118" stroke="${GK.ink}" stroke-width="1.5"/></g>
  ${gt(52,146,'Vida başı',{s:11})}${gt(250,146,'Helezon dişler',{s:11})}${tmLine(250,132,250,108)}
  ${gt(200,38,'Somun',{s:13,c:GK.terra})}${tmLine(200,44,200,58)}
  ${gt(180,180,'Somunu çevirdikçe ilerler ve sıkılır',{s:12,c:'#6B604A'})}</svg>`,

 tmRobot:`<svg viewBox="0 0 360 230">
  ${gt(180,20,'Robot = basit makineler',{s:13})}
  <rect x="90" y="104" width="160" height="58" rx="8" fill="${GK.olive}" stroke="${GK.ink}" stroke-width="2.5"/>
  ${[[102,114],[238,114],[102,152],[238,152]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="1.5"/><path d="M${x-3} ${y}H${x+3}" stroke="${GK.ink}" stroke-width="1.2"/>`).join('')}
  ${gGear(170,133,18,8,GK.ember,'gspin',1.5)}
  ${tmWheel(120,178,26,2.5)}${tmWheel(220,178,26,2.5)}<circle cx="120" cy="178" r="6" fill="${GK.ember}" stroke="${GK.ink}" stroke-width="2"/><circle cx="220" cy="178" r="6" fill="${GK.ember}" stroke="${GK.ink}" stroke-width="2"/>
  <g class="garm" style="transform-origin:251px 112px"><rect x="245" y="44" width="12" height="74" rx="5" fill="${GK.terra}" stroke="${GK.ink}" stroke-width="2"/><path d="M243 52Q251 36 259 52" stroke="${GK.ink}" stroke-width="4" fill="none"/></g>
  <circle cx="251" cy="112" r="7" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="2"/>
  ${gt(8,70,'Vida ve somun',{s:11,a:'start'})}${tmLine(40,76,98,110)}
  ${gt(150,76,'Dişli',{s:11,c:GK.terra})}${tmLine(160,82,168,114)}
  ${gt(284,36,'Kol (kaldıraç)',{s:11,a:'start',c:GK.terra})}${tmLine(290,42,260,60)}
  ${gt(300,214,'Tekerlek ve aks',{s:11})}${tmLine(280,205,244,192)}</svg>`
});
/* Üniteler artık js/mekanik.js içinde (MEK). Bu dosya yalnızca görsel yardımcılarını ve tm* görsellerini tanımlar. */
