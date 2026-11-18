/* #BilimKıvılcımı · Mekanik temel üniteleri (çok basit başlangıç)
   tm1 "Makineler etrafımızda" (ord 5.1) ve tm2 "Dönen dünyalar" (ord 5.2).
   egitim.js ve gorsel.js'ten sonra, dersler.js'ten önce yüklenir. Görseller FIG nesnesine eklenir. */
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

/* ---------- Üniteler ---------- */
U.push(
{id:'tm1',field:'mekanik',icon:'lever',ord:5.1,title:'Makineler etrafımızda',desc:'Makas, tahterevalli, bisiklet: makineler işimizi nasıl kolaylaştırır?',badge:'Makine Çırağı',
 guide:[{h:'Makine nedir?',p:'Makine, işimizi kolaylaştıran araçtır. Makas, bisiklet ve kapı kolu birer makinedir. Elektrik şart değil!'},
        {h:'Kuvvet',p:'İtmek ve çekmek birer kuvvettir. Kuvvet bir şeyi oynatır, durdurur ya da yönünü değiştirir.'},
        {h:'Eski dostlar',p:'Kaldıraç ve tekerlek çok eski makinelerdir. En modern robotta bile varlar.'}],
 gloss:[
  ['Makine','İşimizi kolaylaştıran araç.','Makas, kâğıdı elle yırtmaktan daha kolay ve düzgün keser.'],
  ['Kuvvet','İtme ya da çekme.','Kapıyı iterken kuvvet uygularsın.'],
  ['Kaldıraç','Bir noktada dönen çubuk.','Tahterevalli ve makas birer kaldıraçtır.'],
  ['Tekerlek','Dönen yuvarlak parça.','Bisikletin tekerleği.'],
  ['Aks','Tekerleğin ortasından geçen çubuk.','Oyuncak arabanın tekerleklerini bağlayan çubuk.']],
 lessons:[
 {id:'tm1a',title:'Makine nedir?',desc:'Makas, bisiklet ve kapı kolu birer makine.',ex:[
  {t:'info',fig:'tmMakine',h:'Merhaba, ben Anka!',p:'Bugün makinelerin sırrını öğreneceğiz. <b>Makine</b>, işimizi kolaylaştıran araçtır. Makas bir makinedir. Bisiklet de! Kapı kolu da! Makine olmak için elektrik gerekmez.'},
  {t:'mc',q:'Hangisi bir makinedir?',opts:['Makas','Bulut','Çiçek'],a:0,tip:'Makas, kâğıdı kesmeyi kolaylaştırır. İşimizi kolaylaştıran araç makinedir.'},
  {t:'info',h:'Makine ne yapar?',p:'Makine işi <b>kolaylaştırır</b> ya da <b>hızlandırır</b>. Kapı kolu olmasa kapıyı açmak zor olurdu. Düşün: kapı kolu yerine düz bir kapı olsaydı ne yapardın?'},
  {t:'mc',q:'Kapı kolu ne işe yarar?',opts:['Kapıyı kolayca açmaya','Kapıyı boyamaya','Kapıyı ısıtmaya'],a:0},
  {t:'match',q:'Makineleri işleriyle eşleştir.',pairs:[['Makas','Kâğıdı keser'],['Bisiklet','Bizi hızlı taşır'],['Kapı kolu','Kapıyı açar'],['Çekiç','Çivi çakar']]},
  {t:'line',q:'Hangisi makine DEĞİL?',lines:['Makas','Bisiklet','Kapı kolu','Yağmur'],a:[3],plain:true,tip:'Yağmur doğada olur. Makineyi insanlar yapar.'},
  {t:'type',q:'Bir bisikletin kaç tekerleği vardır? (sadece sayıyı yaz)',a:['2','iki']}
 ]},
 {id:'tm1b',title:'İtme ve çekme',desc:'Kuvvet nedir? Bir şeyi nasıl oynatırız?',ex:[
  {t:'info',fig:'tmKuvvet',h:'İtmek ve çekmek',p:'Kapıyı iterken ya da çekmeceyi çekerken <b>kuvvet</b> uygularsın. Kuvvet, itme ya da çekmedir.'},
  {t:'mc',q:'Çekmeceyi açmak için ne yaparız?',opts:['Çekeriz','İteriz','Üfleriz'],a:0},
  {t:'info',h:'Kuvvet ne yapar?',p:'Kuvvet bir şeyi <b>hareket ettirir</b>, <b>durdurur</b> ya da <b>yönünü değiştirir</b>. Futbol topuna vurmak buna güzel bir örnek. Top hızla fırlar!'},
  {t:'mc',q:'Hangisinde bir kuvvet YOK?',opts:['Bir şarkı dinlemek','Kapıyı itmek','Çekmeceyi çekmek'],a:0,tip:'Şarkı dinlerken bir şeyi itmiyoruz ya da çekmiyoruz.'},
  {t:'match',q:'Ne olduğunu eşleştir.',pairs:[['Topa vurmak','Top yuvarlanmaya başlar'],['Frene basmak','Bisiklet yavaşlar'],['Duvara çarpan top','Yönü değişir']]},
  {t:'mc',q:'Ağır bir kutuyu itiyorsun ama kıpırdamıyor. Ne yapabilirsin?',opts:['Daha çok iterim ya da arkadaşımdan yardım isterim','Kutuya şarkı söylerim','Hiçbir şey yapmam'],a:0,tip:'Daha büyük bir kuvvet gerekir. Arkadaşın da iterse kuvvetler toplanır.'},
  {t:'type',q:'Kutuyu 2 arkadaşın itiyor. Sen de katıldın. Kutuyu şimdi kaç kişi itiyor? (sadece sayıyı yaz)',a:['3','üç']}
 ]},
 {id:'tm1c',title:'Kaldıraç: tahterevalli ve makas',desc:'Dönen bir çubuk, büyük bir fark yaratır.',ex:[
  {t:'info',fig:'tmTahterevalli',h:'Tahterevalli bir kaldıraçtır',p:'Tahterevalli ortadaki bir noktada döner. Bu noktaya <b>dayanak noktası</b> denir. <b>Kaldıraç</b>, dayanak noktasında dönen bir çubuktur.'},
  {t:'mc',q:'Tahterevallinin döndüğü orta noktaya ne denir?',opts:['Dayanak noktası','Bitiş çizgisi','Çıkış kapısı'],a:0},
  {t:'info',h:'Uzaktan itmek kolay',p:'Dayanak noktasından <b>uzağa</b> kuvvet uygulamak daha kolaydır. Kapıyı kol tarafından iter, menteşe tarafından itmezsin. Deneyince farkı hissedersin!'},
  {t:'mc',q:'Bir kapıyı hangi yerinden itmek daha kolaydır?',opts:['Menteşeden uzak, kol tarafından','Menteşeye çok yakın yerinden','Fark etmez'],a:0,tip:'Menteşe, kapının dayanak noktasıdır. Ondan uzaktan itmek daha kolaydır.'},
  {t:'info',fig:'tmMakas',h:'Makas da bir kaldıraçtır!',p:'Makasın iki kolu ortadaki vidada döner. Parmaklarınla kolları sıkarsın, bıçaklar kâğıdı keser. Dayanak noktası ortadaki vidadır.'},
  {t:'mc',q:'Makasın dayanak noktası neresidir?',opts:['Ortadaki vida','Bıçağın ucu','Parmak halkası'],a:0},
  {t:'mc',q:'Tahterevallide ağır bir arkadaşın var. Sen hafifsin. Dengeyi nasıl kurarsın?',opts:['Dayanak noktasından daha uzağa otururum','Tam dayanak noktasının üstüne otururum','Fark etmez'],a:0,tip:'Uzakta oturan hafif kişi, dayanağa yakın oturan ağır kişiyi dengeleyebilir.'},
  {t:'match',q:'Kaldıraçları dönme yerleriyle eşleştir.',pairs:[['Tahterevalli','Ortadaki dayanak'],['Makas','Ortadaki vida'],['Kapı','Menteşe'],['Kaldıraç','Dönen çubuk']]}
 ]},
 {id:'tm1d',title:'Tekerlek ve aks',desc:'Yuvarlak şeyler neden bu kadar işe yarar?',ex:[
  {t:'info',fig:'tmTekerlek',h:'Tekerlek ve aks',p:'<b>Tekerlek</b> yuvarlaktır ve döner. Ortasından geçen çubuğa <b>aks</b> denir. Tekerlek aksın etrafında döner.'},
  {t:'mc',q:'Tekerleğin ortasından geçen çubuğa ne denir?',opts:['Aks','Lastik','Kapak'],a:0},
  {t:'info',h:'Yuvarlanmak kolaydır',p:'Ağır bir kutuyu yerde sürüklemek zordur. Çünkü yere <b>sürtünür</b>. Sürtünme, iki şeyin birbirine sürtünce yavaşlamasıdır. Altına tekerlek koyarsan kutu kolayca yuvarlanır.'},
  {t:'mc',q:'Ağır bir kutuyu taşımanın en kolay yolu hangisi?',opts:['Altına tekerlek koymak','Yerde sürüklemek','Sırtımda taşımak'],a:0},
  {t:'line',q:'Hangisinde tekerlek YOK?',lines:['Oyuncak araba','Bisiklet','Kâğıt makası','Alışveriş arabası'],a:[2],plain:true},
  {t:'match',q:'Parçaları görevleriyle eşleştir.',pairs:[['Aks','Tekerleğin ortasındaki çubuk'],['Tekerlek','Aksın etrafında döner'],['Sürtünme','Hareketi yavaşlatır'],['El arabası','Ağır yükü kolay taşır']]},
  {t:'type',q:'Bir oyuncak arabanın 2 aksı var. Her aksın ucunda 2 tekerlek var. Arabada kaç tekerlek var? (sadece sayıyı yaz)',a:['4','dört']}
 ]}
],
kupa:[
 {t:'mc',q:'Kuvvet nedir?',opts:['İtme ya da çekme','Bir renk','Bir yemek'],a:0},
 {t:'mc',q:'Makas kâğıdı nasıl keser?',opts:['İki kaldıraç gibi çalışarak','Elektrikle çalışarak','Kâğıdı eriterek'],a:0,tip:'İki kol ortadaki vidada döner ve bıçaklar kâğıdı keser.'},
 {t:'mc',q:'İki arkadaş aynı ağırlıkta. İkisi de tahterevallinin ortasından aynı uzaklıkta oturuyor. Ne olur?',opts:['Tahterevalli dengede kalır','Biri yukarı çıkar','Tahterevalli yere batar'],a:0},
 {t:'order',q:'Kapıyı açmanın adımlarını sırala.',items:['Kapı koluna uzan','Kolu aşağı bastır','Kapıyı it ya da çek'],lines:true,plain:true},
 {t:'fill',q:'Boşluğu doldur.',code:'Tahterevalli bir ___ örneğidir.',opts:['kaldıraç','aks','somun'],a:0},
 {t:'mc',q:'Bir top duvara çarpıp geri dönüyor. Kuvvet topa ne yaptı?',opts:['Yönünü değiştirdi','Onu eritti','Onu büyüttü'],a:0}]
},
{id:'tm2',field:'mekanik',icon:'gear',ord:5.2,title:'Dönen dünyalar',desc:'Dişliler, zincirler ve vidalar: dönen parçalar hareketi nasıl taşır?',badge:'Dişli Dostu',
 guide:[{h:'Dişli',p:'Dişli, kenarında dişleri olan dönen çarktır. İki dişli birbirine geçince biri diğerini çevirir.'},
        {h:'Hızlı mı, güçlü mü?',p:'Küçük dişli büyük dişliyi çevirirse büyük dişli yavaş ama güçlü döner. Bisiklet vitesi bunu kullanır.'},
        {h:'Tutan ve taşıyan parçalar',p:'Vida ve somun parçaları sıkıca birleştirir. Zincir ve kayış dönmeyi uzağa taşır.'}],
 gloss:[
  ['Dişli','Kenarında dişleri olan dönen çark.','Saatin içinde, bisikletin vitesinde dişliler vardır.'],
  ['Zincir','Birbirine bağlı halkalar.','Bisikletin pedalını tekerleğe bağlar.'],
  ['Kasnak','Üzerinden kayış geçen düz çark.','Arabanın motorunda kasnak ve kayış kullanılır.'],
  ['Vida','Etrafında helezon çizgiler olan çubuk.','Şişe kapağının içindeki çizgiler de böyledir.'],
  ['Somun','Vidaya döne döne geçen sıkıştırıcı parça.','Bir tekerleği tutan somun.']],
 lessons:[
 {id:'tm2a',title:'Dişli: dönen çarklar',desc:'Dişliler birbirini nasıl çevirir?',ex:[
  {t:'info',fig:'tmDisliEs',h:'Dişli nedir?',p:'<b>Dişli</b>, kenarında çıkıntılar olan dönen bir çarktır. Çıkıntılara <b>diş</b> denir. İki dişli birbirine geçince biri döner, diğerini de döndürür.'},
  {t:'mc',q:'Dişlinin kenarındaki çıkıntılara ne denir?',opts:['Diş','Kulak','Tırnak'],a:0},
  {t:'mc',fig:'tmDisliEs',q:'Soldaki dişli saat yönünde dönüyor. Sağdaki dişli nasıl döner?',opts:['Ters yönde','Aynı yönde','Durur'],a:0,tip:'Birbirine geçen dişliler ters yönde döner.'},
  {t:'info',h:'Dişliler nerede?',p:'Mekanik saatin içinde, bisikletin vitesinde, el çırpıcıda hep dişli var. Küçücük dişliler saatin ibrelerini döndürür. Sence başka nerede olabilir?'},
  {t:'match',q:'Eşleri bul.',pairs:[['Diş','Dişlinin çıkıntısı'],['Saat','Dişlilerle ibreleri döndürür'],['Bisiklet','Dişli ve zincirle ilerler'],['Dişli','Dönen çark']]},
  {t:'mc',q:'Üç dişli yan yana. 1. dişli saat yönünde dönüyor. 3. dişli nasıl döner?',opts:['Saat yönünde','Ters yönde','Durur'],a:0,tip:'1. saat yönünde, 2. ters, 3. yine saat yönünde döner.'},
  {t:'type',q:'Aynı büyüklükte iki dişli birbirine geçiyor. Biri 5 tur dönerse diğeri kaç tur döner? (sadece sayıyı yaz)',a:['5','beş']}
 ]},
 {id:'tm2b',title:'Büyük dişli, küçük dişli',desc:'Hızlı mı olalım, güçlü mü?',ex:[
  {t:'info',fig:'tmDisliBK',h:'Küçük dişli hızlı döner',p:'Büyük dişlinin dişi iki kat fazla. Küçük dişli 2 tur atınca büyük dişli sadece 1 tur atar. Yani küçük dişli daha hızlıdır.'},
  {t:'mc',fig:'tmDisliBK',q:'Büyük dişlinin dişi küçüğün 2 katı. Küçük dişli 2 tur dönünce büyük dişli kaç tur döner?',opts:['1','2','4'],a:0},
  {t:'info',h:'Hızdan vazgeç, güç kazan',p:'Küçük dişli büyük dişliyi çevirirse büyük dişli <b>yavaş ama güçlü</b> döner. Bu döndürme gücüne <b>tork</b> denir. Ağır bir şeyi çevirmek için tork gerekir.'},
  {t:'mc',q:'Ağır bir şeyi çevirmek için güç lazım. Hangisini yaparsın?',opts:['Küçük dişli, büyük dişliyi çevirir','Büyük dişli, küçük dişliyi çevirir','Dişli kullanmam'],a:0,tip:'Küçük dişli büyüğü çevirince yavaş ama güçlü döner.'},
  {t:'info',h:'Bisiklet vitesi',p:'Bisikletin vitesi, zincirin hangi dişliye takılacağını değiştirir. Yokuşta <b>kolay vites</b> seçersin: tekerlek yavaş döner ama pedalı çevirmek kolaydır. Düzlükte hızlı vitese geçersin.'},
  {t:'mc',q:'Yokuş çıkıyorsun. Hangi vitesi seçersin?',opts:['Pedalı kolay çevirdiğim vitesi','Pedalı çok zor çevirdiğim vitesi','Hiç pedal çevirmem'],a:0},
  {t:'fill',q:'Cümleyi tamamla.',code:'Küçük dişli büyüğü çevirir.\nBüyük dişli ___ döner.',opts:['yavaş ama güçlü','hızlı ama zayıf','hiç'],a:0},
  {t:'type',q:'Küçük dişlinin 10 dişi, büyük dişlinin 20 dişi var. Büyük dişli 1 tur dönerken küçük dişli kaç tur döner? (sadece sayıyı yaz)',a:['2','iki']},
  {t:'match',q:'Eşleri bul.',pairs:[['Küçük dişli çeviriyor, büyük dönüyor','Yavaş ve güçlü'],['Büyük dişli çeviriyor, küçük dönüyor','Hızlı ama zayıf'],['İki dişli aynı boyda','İkisi aynı hızda döner']]}
 ]},
 {id:'tm2c',title:'Zincir ve kasnak',desc:'Dönmeyi uzağa taşıyan parçalar.',ex:[
  {t:'info',fig:'tmZincir',h:'Bisiklet zinciri',p:'Pedaldaki dişli, <b>zincir</b> sayesinde arka tekerleğin dişlisini çevirir. Zincir, birbirine bağlı halkalardan oluşur. İki dişli uzak olsa bile dönmeyi taşır.'},
  {t:'mc',q:'Pedala bastığında güç arka tekerleğe nasıl ulaşır?',opts:['Zincirle','Kabloyla','Rüzgârla'],a:0},
  {t:'mc',fig:'tmZincir',q:'Zincirle bağlı iki dişli hangi yöne döner?',opts:['İkisi de aynı yöne','Ters yönlere','İkisi de durur'],a:0,tip:'Zincir iki dişliyi birlikte sarar. İkisi de aynı yöne döner.'},
  {t:'info',fig:'tmKasnak',h:'Kasnak ve kayış',p:'<b>Kasnak</b> düz bir çarktır. Üzerinden bir <b>kayış</b> geçer. Kasnak dönünce kayış hareket eder, o da diğer kasnağı çevirir. Arabanın motorunda da kasnak ve kayış vardır.'},
  {t:'mc',q:'Zincir ve kayış ne işe yarar?',opts:['Dönmeyi uzağa taşır','Işık yakar','Su ısıtır'],a:0},
  {t:'match',q:'Parçaları eşleştir.',pairs:[['Zincir','Halkalardan oluşur'],['Kayış','Esnek bir bant'],['Kasnak','Kayışı döndüren çark'],['Pedal','Bacağımızın gücünü verir']]},
  {t:'mc',q:'Bisiklet zinciri gevşek olursa ne olabilir?',opts:['Dişliden atlayıp çıkabilir','Bisiklet uçar','Hiçbir şey olmaz'],a:0},
  {t:'order',q:'Bisikletin ilerleme sırasını diz.',items:['Pedala basarsın','Ön dişli döner','Zincir hareket eder','Arka tekerlek döner'],lines:true,plain:true}
 ]},
 {id:'tm2d',title:'Vida, somun ve robot',desc:'Her şeyi bir arada tutan parçalar. Ve robot!',ex:[
  {t:'info',fig:'tmVida',h:'Vida ve somun',p:'<b>Vida</b>, etrafında helezon çizgiler olan bir çubuktur. <b>Somun</b> onun üstüne döne döne geçer. İkisi parçaları sıkıca birbirine tutturur. Şişe kapağı da böyle döner.'},
  {t:'mc',q:'Somunu vidaya nasıl takarız?',opts:['Döndürerek','Çekiçle vurarak','Yapıştırarak'],a:0},
  {t:'info',h:'Sıkmak ve gevşetmek',p:'Vidanın helezon dişleri somuna kilitlenir. Somunu <b>saat yönünde</b> çevirince sıkılır. Ters yönde çevirince gevşer ve çıkar.'},
  {t:'mc',q:'Bir somunu gevşetmek için hangi yöne çevirirsin?',opts:['Saat yönünün tersine','Saat yönüne','Yukarı doğru'],a:0},
  {t:'mc',q:'Hangisi vida gibi döndürülerek kapanır?',opts:['Şişe kapağı','Çanta fermuarı','Çıtçıt'],a:0,tip:'Şişe kapağının içinde de helezon çizgiler vardır.'},
  {t:'info',fig:'tmRobot',h:'Robot da bir makinedir!',p:'Robotun tekerlekleri, dişlileri, kolu ve vidaları var. Hepsini az önce öğrendin! Robot, birçok basit makinenin bir araya gelmesidir.'},
  {t:'match',q:'Robot parçasını, basit makinesiyle eşleştir.',pairs:[['Robot kolu','Kaldıraç'],['Robot tekerleği','Tekerlek ve aks'],['Motordan tekerleğe dönme','Dişli ve zincir'],['Parçaları birleştiren','Vida ve somun']]},
  {t:'mc',q:'Robotun motorunu tekerleğine bağlayan zincir ne yapar?',opts:['Dönmeyi tekerleğe taşır','Işık yapar','Ses çıkarır'],a:0},
  {t:'info',h:'Sıradaki durak',p:'Basit makineleri öğrendin. Şimdi gerçek bir robotun iskeletine bakacağız: <b>Robotun iskeleti</b>. Hazır mısın?'}
 ]}
],
kupa:[
 {t:'mc',q:'Dişlinin dişleri ne işe yarar?',opts:['Diğer dişliye geçip onu çevirmek','Süs olmak','Kâğıt kesmek'],a:0},
 {t:'mc',q:'Küçük dişli büyük dişliyi çeviriyor. Hangisi daha hızlı döner?',opts:['Küçük dişli','Büyük dişli','İkisi aynı hızda'],a:0},
 {t:'type',q:'Bir dişli 4 tur atıyor. Yanındaki aynı büyüklükteki dişli kaç tur atar? (sadece sayıyı yaz)',a:['4','dört']},
 {t:'mc',q:'Vida ve somunun görevi nedir?',opts:['Parçaları sıkıca birleştirmek','Zıplamak','Işık vermek'],a:0},
 {t:'order',q:'Somun takmanın adımlarını sırala.',items:['Vidayı delikten geçir','Somunu vidanın ucuna tak','Somunu saat yönünde çevir','Sıkılığını kontrol et'],lines:true,plain:true},
 {t:'mc',q:'Hangisi robotun bir makine olduğunu gösterir?',opts:['Tekerlek, dişli ve kol gibi parçaları var','Adı olması','Rengi mavi olması'],a:0}]
}
);
