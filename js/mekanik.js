/* #BilimKıvılcımı · Mekanik müfredatı: 5 ünite, 15 ders
   1 Mekaniği Tanıyalım · 2 Kuvvet ve Basit Makineler · 3 Dişliler ve Hareket Aktarımı
   4 Mekanik Parçalar ve Yapılar · 5 Tasarım ve Mühendislik Uygulamaları
   temel-mekanik.js'ten (görsel yardımcıları) SONRA, egitim.js'ten ÖNCE yüklenir.
   Üniteler MEK dizisinde durur. Kupa kayıtları ünite sırasına bağlı olduğu için U'ya eski mekanik
   ünitelerinin yerlerinde eklenir: MEK[2..4] egitim.js içinde, MEK[0..1] egitim.js'in sonunda. */
'use strict';

/* ---------- Yeni görseller ---------- */
(function(){
  const st=document.createElement('style');
  st.textContent=
  '.mkSlide{animation:mkSlide 3s ease-in-out infinite}@keyframes mkSlide{0%,100%{transform:translate(0,0)}50%{transform:translate(165px,-55px)}}'+
  '.mkUp{animation:mkUp 2.6s ease-in-out infinite}@keyframes mkUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-26px)}}'+
  '.mkUp2{animation:mkUp2 2.6s ease-in-out infinite}@keyframes mkUp2{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}'+
  '.mkPull{animation:mkPull 2.6s ease-in-out infinite}@keyframes mkPull{0%,100%{transform:translateY(0)}50%{transform:translateY(26px)}}'+
  '.mkSag{animation:mkSag 2.4s ease-in-out infinite}@keyframes mkSag{0%,100%{transform:skewX(0)}50%{transform:skewX(-14deg)}}'+
  '.mkBall{animation:mkBall 2.8s ease-in infinite}@keyframes mkBall{0%{transform:translateX(0)}80%,100%{transform:translateX(170px)}}'+
  '@media (prefers-reduced-motion:reduce){.mkSlide,.mkUp,.mkUp2,.mkPull,.mkSag,.mkBall{animation:none}}';
  document.head.appendChild(st);
})();
const mkBox=(x,y,w,h,t,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c||GK.gold}" stroke="${GK.ink}" stroke-width="2.5"/>${t?gt(x+w/2,y+h/2+5,t,{s:13}):''}`;
const mkArrowD=(x,y1,y2,c)=>`<path d="M${x} ${y1}V${y2-8}" stroke="${c||GK.terra}" stroke-width="5" stroke-linecap="round"/><path d="M${x-9} ${y2-12}L${x} ${y2}L${x+9} ${y2-12}" fill="none" stroke="${c||GK.terra}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
const mkArrowU=(x,y1,y2,c)=>`<path d="M${x} ${y1}V${y2+8}" stroke="${c||GK.terra}" stroke-width="5" stroke-linecap="round"/><path d="M${x-9} ${y2+12}L${x} ${y2}L${x+9} ${y2+12}" fill="none" stroke="${c||GK.terra}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;

Object.assign(FIG,{
 /* Hareket ve denge: yuvarlanan top ve dengede kalem */
 mkHareket:`<svg viewBox="0 0 360 180">
  ${gt(95,24,'Hareket',{s:14,c:GK.terra})}${gt(275,24,'Denge',{s:14,c:GK.olive})}
  <path d="M10 140H190" stroke="${GK.line}" stroke-width="4" stroke-linecap="round"/>
  <g class="mkBall"><circle cx="20" cy="124" r="15" fill="${GK.ember}" stroke="${GK.ink}" stroke-width="2.5"/><path d="M8 124H32M20 112V136" stroke="${GK.ink}" stroke-width="1.5"/></g>
  ${gt(95,164,'Yeri değişiyor',{s:12})}
  <path d="M215 140H350" stroke="${GK.line}" stroke-width="4" stroke-linecap="round"/>
  <path d="M262 140L288 140L275 112Z" fill="${GK.rust}" stroke="${GK.ink}" stroke-width="2" stroke-linejoin="round"/>
  <rect x="215" y="102" width="120" height="10" rx="4" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2"/>
  ${mkBox(220,76,30,26,'',GK.blue)}${mkBox(300,76,30,26,'',GK.blue)}
  ${gt(282,164,'Eşit ağırlık: dengede',{s:12})}</svg>`,

 /* Kaldıraç: destek noktası, kuvvet kolu, yük kolu */
 mkKaldirac:`<svg viewBox="0 0 360 200">
  <path d="M10 164H350" stroke="${GK.line}" stroke-width="4" stroke-linecap="round"/>
  <g class="tmTilt" style="transform-origin:120px 128px;animation-duration:3.6s">
   <rect x="30" y="122" width="300" height="11" rx="4" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2"/>
   ${mkBox(34,82,52,40,'Yük',GK.steel)}
   ${mkArrowD(312,64,118)}</g>
  <path d="M100 164L140 164L120 132Z" fill="${GK.rust}" stroke="${GK.ink}" stroke-width="2" stroke-linejoin="round"/><circle cx="120" cy="130" r="5" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="2"/>
  ${gt(312,52,'Kuvvet',{s:13,c:GK.terra})}
  <path d="M38 180H118M122 180H326" stroke="${GK.ink}" stroke-width="2"/><path d="M38 174V186M118 174V186M122 174V186M326 174V186" stroke="${GK.ink}" stroke-width="2"/>
  ${gt(78,197,'Yük kolu',{s:12,c:GK.olive})}${gt(224,197,'Kuvvet kolu (uzun)',{s:12,c:GK.terra})}
  ${gt(120,30,'Destek noktası',{s:12})}${tmLine(120,36,120,124)}</svg>`,

 /* Sabit ve hareketli makara */
 mkMakara:`<svg viewBox="0 0 360 224">
  <path d="M20 34H340" stroke="${GK.ink}" stroke-width="6" stroke-linecap="round"/>
  ${gt(90,22,'Sabit makara',{s:13,c:GK.terra})}${gt(270,22,'Hareketli makara',{s:13,c:GK.olive})}
  <path d="M90 34V60" stroke="${GK.ink}" stroke-width="3"/>
  ${tmPulley(90,78,20,2.4)}
  <path d="M70 78V124" stroke="${GK.ink}" stroke-width="2.5"/>
  <g class="mkUp"><path d="M70 124V140" stroke="${GK.ink}" stroke-width="2.5"/>${mkBox(52,140,36,32,'',GK.steel)}</g>
  <g class="mkPull"><path d="M110 78V150" stroke="${GK.ink}" stroke-width="2.5"/>${mkArrowD(110,150,178)}</g>
  ${gt(90,214,'Yönü değiştirir',{s:11})}
  <path d="M236 34V120" stroke="${GK.ink}" stroke-width="2.5"/>
  <g class="mkUp2">${tmPulley(270,120,34,2.4)}<path d="M270 154V160" stroke="${GK.ink}" stroke-width="3"/>${mkBox(250,160,40,32,'',GK.steel)}</g>
  <path d="M304 120V68" stroke="${GK.ink}" stroke-width="2.5"/>${mkArrowU(304,70,44)}
  ${gt(270,214,'Kuvvet yarıya iner',{s:11})}</svg>`,

 /* Eğik düzlem: rampada kutu yukarı kayar */
 mkEgik:`<svg viewBox="0 0 360 190">
  ${gt(180,22,'Uzun yol, az kuvvet',{s:13})}
  <path d="M30 160H330V60Z" fill="${GK.sand}" stroke="${GK.ink}" stroke-width="3" stroke-linejoin="round"/>
  <g class="mkSlide"><g transform="translate(90 140) rotate(-18.43)">${mkBox(0,-30,40,30,'',GK.gold)}</g></g>
  <path d="M330 160V60" stroke="${GK.terra}" stroke-width="3" stroke-dasharray="6 5"/>
  ${gt(330,50,'Yükseklik',{s:11,c:GK.terra})}
  ${gt(150,182,'Rampa: kutuyu dik kaldırmaktan kolay',{s:12,c:'#6B604A'})}</svg>`,

 /* Çıkrık: kuyu kovası */
 mkCikrik:`<svg viewBox="0 0 360 200">
  <rect x="96" y="54" width="12" height="110" fill="${GK.rust}" stroke="${GK.ink}" stroke-width="2"/><rect x="252" y="54" width="12" height="110" fill="${GK.rust}" stroke="${GK.ink}" stroke-width="2"/>
  <rect x="104" y="64" width="152" height="18" rx="8" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2"/>
  <g class="gspin" style="transform-origin:290px 73px;animation-duration:3s"><path d="M290 73L290 33M290 33L318 33" stroke="${GK.ink}" stroke-width="6" stroke-linecap="round"/></g>
  <path d="M256 73H290" stroke="${GK.ink}" stroke-width="5"/>
  <rect x="80" y="160" width="200" height="30" rx="4" fill="${GK.steel}" stroke="${GK.ink}" stroke-width="2"/>
  <g class="mkUp"><path d="M180 82V124" stroke="${GK.ink}" stroke-width="2.5"/><path d="M164 124H196L192 156H168Z" fill="${GK.blue}" stroke="${GK.ink}" stroke-width="2"/></g>
  ${gt(318,22,'Kol (büyük daire)',{s:11,a:'end',c:GK.terra})}${gt(180,52,'Silindir (küçük daire)',{s:11})}
  ${gt(40,120,'Kuyu',{s:12})}</svg>`,

 /* Ara dişli: üç dişli */
 mkAraDisli:`<svg viewBox="0 0 360 180">
  ${gGear(80,86,34,10,GK.ember,'gspin',2.4)}${gGear(150,86,34,10,GK.gold,'gspinr',2.4)}${gGear(220,86,34,10,GK.olive,'gspin',2.4)}
  ${gt(80,140,'Saat yönü',{s:11})}${gt(150,140,'Ara dişli',{s:11,c:GK.terra})}${gt(220,140,'Yine saat yönü',{s:11})}
  ${gt(310,82,'1 → 3',{s:15,c:GK.terra})}${gt(310,100,'aynı yön',{s:11})}
  ${gt(180,170,'Araya bir dişli girince yön eskisi gibi olur',{s:11,c:'#6B604A'})}</svg>`,

 /* Düz ve çapraz kayış */
 mkKayis:`<svg viewBox="0 0 360 180">
  ${gt(90,22,'Düz kayış',{s:13,c:GK.olive})}${gt(270,22,'Çapraz kayış',{s:13,c:GK.terra})}
  <path d="${tmBelt(50,90,26,130,26)}" fill="none" stroke="${GK.ink}" stroke-width="5"/>
  ${tmPulley(50,90,22,2.4)}${tmPulley(130,90,22,2.4)}
  ${gt(90,148,'Aynı yöne döner',{s:11})}
  <path d="M230 64L310 116M230 116L310 64" stroke="${GK.ink}" stroke-width="5"/>
  <path d="M230 64A26 26 0 0 0 230 116M310 64A26 26 0 0 1 310 116" fill="none" stroke="${GK.ink}" stroke-width="5"/>
  ${tmPulley(230,90,22,2.4)}<g class="gspinr" style="transform-origin:310px 90px;animation-duration:2.4s"><circle cx="310" cy="90" r="22" fill="${GK.sand}" stroke="${GK.ink}" stroke-width="3"/><path d="M294 90H326M310 74V106" stroke="${GK.ink}" stroke-width="2"/><circle cx="310" cy="90" r="5" fill="${GK.ember}" stroke="${GK.ink}" stroke-width="2"/></g>
  ${gt(270,148,'Ters yöne döner',{s:11})}</svg>`,

 /* Mil ve rulman */
 mkRulman:`<svg viewBox="0 0 360 190">
  ${gt(90,24,'Rulman (içi)',{s:13,c:GK.terra})}
  <circle cx="90" cy="100" r="62" fill="${GK.steel}" stroke="${GK.ink}" stroke-width="3"/>
  <circle cx="90" cy="100" r="30" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="3"/>
  <g class="gspin" style="transform-origin:90px 100px;animation-duration:5s">${[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return `<circle cx="${(90+Math.cos(a)*46).toFixed(1)}" cy="${(100+Math.sin(a)*46).toFixed(1)}" r="11" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2"/>`}).join('')}</g>
  <circle cx="90" cy="100" r="14" fill="${GK.steelD}" stroke="${GK.ink}" stroke-width="2"/>
  ${gt(90,180,'Bilyeler yuvarlanır',{s:11})}
  ${gt(270,24,'Mil',{s:13,c:GK.terra})}
  <rect x="190" y="90" width="160" height="20" rx="4" fill="${GK.steel}" stroke="${GK.ink}" stroke-width="2"/>
  <rect x="214" y="72" width="22" height="56" rx="4" fill="${GK.olive}" stroke="${GK.ink}" stroke-width="2"/><rect x="304" y="72" width="22" height="56" rx="4" fill="${GK.olive}" stroke="${GK.ink}" stroke-width="2"/>
  ${gGear(270,100,26,9,GK.ember,'gspin',2)}
  ${gt(225,150,'Rulman',{s:11})}${gt(315,150,'Rulman',{s:11})}${gt(270,176,'Mil, dönmeyi taşıyan çubuktur',{s:11,c:'#6B604A'})}</svg>`,

 /* Üçgen sağlamdır: kare yamulur */
 mkUcgen:`<svg viewBox="0 0 360 190">
  ${gt(95,24,'Kare',{s:14})}${gt(265,24,'Üçgen',{s:14,c:GK.olive})}
  <g class="mkSag" style="transform-origin:95px 150px"><path d="M45 150V60H145V150Z" fill="none" stroke="${GK.steelD}" stroke-width="9" stroke-linejoin="round"/></g>
  ${mkArrowD(95,36,58)}
  <path d="M30 150H160" stroke="${GK.line}" stroke-width="4"/>
  ${gt(95,176,'Bastırınca yamulur',{s:12,c:GK.red})}
  <path d="M215 150L265 60L315 150Z" fill="none" stroke="${GK.olive}" stroke-width="9" stroke-linejoin="round"/>
  ${mkArrowD(265,36,56)}
  <path d="M200 150H330" stroke="${GK.line}" stroke-width="4"/>
  ${gt(265,176,'Şeklini korur',{s:12,c:GK.green})}</svg>`,

 /* Mühendislik tasarım döngüsü */
 mkDongu:`<svg viewBox="0 0 360 230">
  <circle cx="180" cy="118" r="80" fill="none" stroke="${GK.line}" stroke-width="5" stroke-dasharray="10 8"/>
  <g class="gspin" style="transform-origin:180px 118px;animation-duration:12s"><circle cx="180" cy="38" r="7" fill="${GK.ember}"/></g>
  ${[['1 Problemi belirle',180,30,GK.terra],['2 Fikir ve çizim',294,92,GK.ember],['3 Prototip yap',262,206,GK.olive],['4 Test et',98,206,GK.blue],['5 Geliştir',66,92,GK.rust]].map(([t,x,y,c])=>`<rect x="${x-58}" y="${y-16}" width="116" height="30" rx="15" fill="${GK.cream}" stroke="${c}" stroke-width="3"/>${gt(x,y+4,t,{s:11,c})}`).join('')}
  ${gt(180,114,'Mühendis',{s:13})}${gt(180,132,'döngüsü',{s:13})}</svg>`
});

/* ---------- Üniteler ---------- */
const MEK=[
/* ===== 1. ÜNİTE ===== */
{id:'mk1',field:'mekanik',icon:'bulb',ord:5.1,title:'Mekaniği Tanıyalım',desc:'Mekanik nedir?',badge:'Mekanik Kaşifi',
 guide:[{h:'Mekanik nedir?',p:'Mekanik, cisimlerin hareketini, kuvvetleri ve bu kuvvetlerin cisimler üzerindeki etkilerini inceleyen bilim dalıdır.'},
        {h:'Her yerde',p:'Kapı kolundan bisiklete, oyuncak arabalardan robotlara kadar birçok sistem mekanik prensiplerle çalışır.'},
        {h:'Bu ünitede',p:'Mekaniğin ne olduğunu, kuvveti, hareketi ve dengeyi öğreneceksin.'}],
 gloss:[
  ['Mekanik','Hareketi, kuvvetleri ve kuvvetlerin cisimlere etkisini inceleyen bilim dalı.'],
  ['Kuvvet','İtme ya da çekme. Newton (N) ile ölçülür.','Kapıyı itmek bir kuvvettir.'],
  ['Hareket','Bir cismin zamanla yerinin değişmesi.'],
  ['Hız','Bir cismin belli bir sürede ne kadar yol gittiği.','Saatte 60 km giden araba'],
  ['Denge','Cismin üzerindeki kuvvetlerin birbirini dengelemesi. Cisim devrilmez.']],
 lessons:[
 {id:'mk01',title:'Mekanik Nedir?',desc:'Mekaniğin ne olduğunu ve günlük hayattaki örneklerini.',ex:[
  {t:'info',fig:'tmMakine',h:'Mekanik nedir?',p:'<b>Mekanik</b>, cisimlerin <b>hareketini</b> ve onları hareket ettiren <b>kuvvetleri</b> inceleyen bilim dalıdır. Bir top neden yuvarlanır? Kapı neden açılır? Mekanik bu soruları cevaplar.'},
  {t:'mc',q:'Mekanik neyi inceler?',opts:['Hareketi ve kuvvetleri','Bitkilerin büyümesini','Yıldızların rengini'],a:0},
  {t:'info',h:'Etrafımız mekanik dolu',p:'Kapı kolu, makas, bisiklet, oyuncak araba, salıncak... Hepsi mekanik prensiplerle çalışır. Robotların kolları ve tekerlekleri de öyle!'},
  {t:'line',q:'Hangisi mekanik bir sistem DEĞİL?',lines:['Bisiklet','Kapı kolu','Oyuncak araba','Bir şiir'],a:[3],plain:true,tip:'Şiirde dönen, itilen ya da çekilen bir parça yoktur.'},
  {t:'match',q:'Mekanik sistemleri ne yaptıklarıyla eşleştir.',pairs:[['Bisiklet','Pedalı tekerleğe aktarır'],['Makas','Kâğıdı keser'],['Kapı kolu','Kilidi açar'],['Salıncak','İleri geri sallanır']]},
  {t:'mc',q:'Bir robotun kolunun nasıl kalkacağını hesaplayan kişi hangi bilgiyi kullanır?',opts:['Mekanik','Müzik','Coğrafya'],a:0,tip:'Kol bir kuvvetle hareket eder. Bu mekaniğin konusudur.'},
  {t:'type',q:'Bir oyuncak arabanın 4 tekerleği var. 3 araba kaç tekerlek eder? (sadece sayıyı yaz)',a:['12','on iki','oniki'],tip:'3 × 4 = 12'}
 ]},
 {id:'mk02',title:'Kuvvet Nedir?',desc:'İtme, çekme ve kuvvetin cisimlere etkisini.',ex:[
  {t:'info',fig:'tmKuvvet',h:'İtmek ve çekmek',p:'<b>Kuvvet</b>, bir cismi itmek ya da çekmektir. Kapıyı iterken, çekmeceyi çekerken kuvvet uygularsın. Kuvvet <b>newton</b> (N) ile ölçülür.'},
  {t:'mc',q:'Çekmeceyi açarken hangi kuvveti uygularız?',opts:['Çekme','İtme','Hiçbiri'],a:0},
  {t:'info',h:'Kuvvet ne yapar?',p:'Kuvvet bir cismi <b>harekete geçirir</b>, <b>durdurur</b>, <b>yönünü</b> ya da <b>şeklini</b> değiştirir. Topa vurunca top fırlar. Kaleci tutunca durur. Hamuru sıkınca şekli değişir.'},
  {t:'match',q:'Olayları kuvvetin etkisiyle eşleştir.',pairs:[['Duran topa vurmak','Harekete geçirir'],['Kalecinin topu tutması','Durdurur'],['Topa kafa vurmak','Yönünü değiştirir'],['Hamuru sıkmak','Şeklini değiştirir']]},
  {t:'mc',q:'Yerçekimi de bir kuvvettir. Elindeki top bırakınca ne olur?',opts:['Yere düşer','Havada kalır','Yukarı uçar'],a:0,tip:'Dünya her şeyi kendine doğru çeker. Buna yerçekimi denir.'},
  {t:'mc',q:'Aynı kutuyu iki kişi aynı yöne itiyor. Ne olur?',opts:['Kuvvetler toplanır, kutu daha kolay gider','Kutu hiç gitmez','Kutu geri gider'],a:0,tip:'Aynı yöndeki kuvvetler birbirine eklenir.'},
  {t:'mc',q:'İki kişi kutuyu eşit kuvvetle ZIT yönlere itiyor. Kutu ne yapar?',opts:['Yerinde kalır','Hızla kayar','Havaya kalkar'],a:0,tip:'Eşit ve zıt kuvvetler birbirini götürür.'},
  {t:'type',q:'Biri 30 N, diğeri 20 N ile kutuyu aynı yöne itiyor. Toplam kuvvet kaç N? (sadece sayıyı yaz)',a:['50','elli'],tip:'Aynı yöndeki kuvvetler toplanır: 30 + 20 = 50.'}
 ]},
 {id:'mk03',title:'Hareket ve Denge',desc:'Hareket, durma, hız ve dengede olma kavramlarını.',ex:[
  {t:'info',fig:'mkHareket',h:'Hareket ve hız',p:'Bir cismin yeri değişiyorsa <b>hareket</b> ediyordur. Yeri değişmiyorsa <b>duruyordur</b>. <b>Hız</b>, belli bir sürede ne kadar yol gidildiğidir. Hız = yol ÷ zaman.'},
  {t:'mc',q:'Hangisi hareket ediyor?',opts:['Yuvarlanan top','Masadaki kitap','Duvardaki tablo'],a:0},
  {t:'type',q:'Bir robot 10 saniyede 50 metre gidiyor. Saniyede kaç metre gider? (sadece sayıyı yaz)',a:['5','beş'],tip:'Hız = yol ÷ zaman = 50 ÷ 10 = 5.'},
  {t:'mc',q:'İki koşucu aynı yolu koşuyor. Ali 20 saniyede, Ece 25 saniyede bitiriyor. Kim daha hızlı?',opts:['Ali','Ece','İkisi eşit'],a:0,tip:'Aynı yolu daha kısa sürede giden daha hızlıdır.'},
  {t:'info',h:'Denge',p:'Bir cismin üzerindeki kuvvetler birbirini dengelerse cisim <b>dengede</b> kalır, devrilmez. Tahterevallide eşit ağırlıktaki iki çocuk dengede durur. Geniş ve alçak duran cisimler daha zor devrilir.'},
  {t:'mc',q:'Hangi robot daha zor devrilir?',opts:['Geniş ve alçak gövdeli robot','Dar ve çok uzun robot','Tek tekerlekli robot'],a:0,tip:'Ağırlık merkezi alçak ve tabanı geniş olan cisim dengede kalır.'},
  {t:'mc',q:'Tahterevallinin bir ucunda 30 kg, diğerinde 30 kg çocuk var. Ne olur?',opts:['Dengede kalır','Ağır taraf iner','İkisi birden kalkar'],a:0}
 ]}
]},
/* ===== 2. ÜNİTE ===== */
{id:'mk2',field:'mekanik',icon:'lever',ord:5.2,title:'Kuvvet ve Basit Makineler',desc:'Kuvveti nasıl daha etkili kullanırız?',badge:'Kuvvet Ustası',
 guide:[{h:'Basit makineler',p:'İnsanlar ağır cisimleri kaldırmak veya taşımak için basit makinelerden yararlanır. Basit makineler kuvvetin yönünü veya büyüklüğünü değiştirebilir.'},
        {h:'Bedava kazanç yok',p:'Basit makine kuvvetten kazandırırsa yoldan kaybettirir. Daha az kuvvetle iteriz ama daha uzun yol gideriz. Enerjiden bedava kazanç sağlamaz.'},
        {h:'Bu ünitede',p:'Kaldıraç, makara, eğik düzlem, çıkrık ve vidayı öğreneceksin.'}],
 gloss:[
  ['Kaldıraç','Bir destek noktası etrafında dönen çubuk.','Tahterevalli, makas, el arabası'],
  ['Destek noktası','Kaldıracın üzerinde döndüğü nokta.'],
  ['Kuvvet kolu','Kuvvetin uygulandığı yer ile destek noktası arasındaki uzaklık.'],
  ['Yük kolu','Yük ile destek noktası arasındaki uzaklık.'],
  ['Makara','Üzerinden ip geçen, dönebilen tekerlek.','Bayrak direği'],
  ['Eğik düzlem','Yükü yukarı çıkarmak için kullanılan rampa.'],
  ['Çıkrık','Büyük bir kolu küçük bir silindire bağlayan basit makine.','Kuyu çıkrığı']],
 lessons:[
 {id:'mk04',title:'Kaldıraçlar',desc:'Destek noktası, kuvvet kolu ve yük kolu.',ex:[
  {t:'info',fig:'mkKaldirac',h:'Kaldıraç',p:'<b>Kaldıraç</b>, bir nokta etrafında dönen çubuktur. Döndüğü noktaya <b>destek noktası</b> denir. Kuvvet ile destek arası <b>kuvvet kolu</b>, yük ile destek arası <b>yük kolu</b>dur.'},
  {t:'match',q:'Kaldıracın parçalarını eşleştir.',pairs:[['Destek noktası','Çubuğun döndüğü yer'],['Kuvvet kolu','Kuvvet ile destek arası'],['Yük kolu','Yük ile destek arası']]},
  {t:'info',h:'Uzun kol, az kuvvet',p:'Kuvvet kolu <b>uzunsa</b> az kuvvetle büyük yük kalkar. Kural: <b>kuvvet × kuvvet kolu = yük × yük kolu</b>. Kuvvet kolu yük kolunun 2 katıysa, yükün yarısı kadar kuvvet yeter.'},
  {t:'mc',q:'Ağır bir taşı kaldıraçla kaldırmak istiyorsun. En kolayı hangisi?',opts:['Destek noktasını taşa yaklaştırmak','Destek noktasını sana yaklaştırmak','Çubuğu kısaltmak'],a:0,tip:'Destek taşa yaklaşınca senin kolun uzar. Uzun kol daha az kuvvet ister.'},
  {t:'fill',q:'Yük 100 N, yük kolu 1 m, kuvvet kolu 4 m. Kaç N kuvvet gerekir?',code:'kuvvet × 4 = 100 × 1\nkuvvet = ___',opts:['25','400','100'],a:0,tip:'100 ÷ 4 = 25 N.'},
  {t:'match',q:'Kaldıraç örneklerini eşleştir.',pairs:[['Tahterevalli','Destek ortada'],['El arabası','Yük ortada'],['Makas','İki kaldıraç bir arada'],['Kerpeten','Teli sıkıca tutar']]},
  {t:'mc',q:'Kaldıraç az kuvvetle iş yaptırıyor. Karşılığında ne kaybederiz?',opts:['Elimizi daha uzun yol hareket ettiririz','Hiçbir şey kaybetmeyiz','Yük ağırlaşır'],a:0,tip:'Basit makineler enerjiden bedava kazanç sağlamaz. Kuvvetten kazanırsın, yoldan kaybedersin.'}
 ]},
 {id:'mk05',title:'Makaralar',desc:'Sabit ve hareketli makara sistemleri.',ex:[
  {t:'info',fig:'mkMakara',h:'Makara',p:'<b>Makara</b>, üzerinden ip geçen dönen bir tekerlektir. <b>Sabit makara</b> bir yere asılıdır, yerinden kıpırdamaz. Kuvvetin <b>yönünü</b> değiştirir: aşağı çekersin, yük yukarı çıkar.'},
  {t:'mc',q:'Bayrak direğinde ipi aşağı çekince bayrak yukarı çıkar. Burada hangi makara var?',opts:['Sabit makara','Hareketli makara','Makara yok'],a:0},
  {t:'mc',q:'Sabit makara kuvvetten kazandırır mı?',opts:['Hayır, sadece yönü değiştirir','Evet, kuvveti yarıya indirir','Evet, kuvveti 10 kat azaltır'],a:0,tip:'Sabit makarada 10 N yük için 10 N çekersin. Ama aşağı çekmek daha rahattır.'},
  {t:'info',h:'Hareketli makara',p:'<b>Hareketli makara</b> yükle birlikte yukarı çıkar. Yükü iki ip taşır, bu yüzden kuvvet <b>yarıya</b> iner. Ama ipi yükün çıktığı yolun <b>2 katı</b> çekersin.'},
  {t:'type',q:'Hareketli makarayla 80 N yük kaldırıyorsun. Kaç N kuvvet gerekir? (sadece sayıyı yaz)',a:['40','kırk'],tip:'Hareketli makara kuvveti yarıya indirir: 80 ÷ 2 = 40.'},
  {t:'mc',q:'Hareketli makarayla yükü 1 metre kaldırmak için ipi ne kadar çekersin?',opts:['2 metre','1 metre','Yarım metre'],a:0,tip:'Kuvvetten kazanç, yoldan kayıp: kuvvet yarıya iner, yol 2 katına çıkar.'},
  {t:'match',q:'Makara türlerini özellikleriyle eşleştir.',pairs:[['Sabit makara','Yönü değiştirir'],['Hareketli makara','Kuvveti yarıya indirir'],['Palanga','Çok makaralı sistem, kuvveti çok azaltır']]}
 ]},
 {id:'mk06',title:'Eğik Düzlem ve Diğer Basit Makineler',desc:'Eğik düzlem, çıkrık ve vida mantığı.',ex:[
  {t:'info',fig:'mkEgik',h:'Eğik düzlem',p:'<b>Eğik düzlem</b> bir rampadır. Ağır bir kutuyu dik kaldırmak yerine rampadan iterek çıkarırsın. Rampa ne kadar <b>uzun</b> ve <b>yatıksa</b> o kadar az kuvvet gerekir, ama yol uzar.'},
  {t:'mc',q:'Hangi rampada kutuyu itmek daha kolaydır?',opts:['Uzun ve yatık rampa','Kısa ve dik rampa','İkisi aynı'],a:0},
  {t:'mc',q:'Engelli rampası, merdivenin yanında neden uzun ve yatıktır?',opts:['Tekerlekli sandalyeyi az kuvvetle çıkarmak için','Daha çok yer kaplamak için','Süs olsun diye'],a:0},
  {t:'info',fig:'mkCikrik',h:'Çıkrık',p:'<b>Çıkrık</b>, büyük bir kolu küçük bir silindire bağlar. Kolu çevirince silindire ip sarılır. Kol büyük daire çizdiği için az kuvvet yeter. Kuyudan kova çekmek böyle kolaylaşır.'},
  {t:'info',fig:'tmVida',h:'Vida',p:'<b>Vida</b>, bir silindirin etrafına sarılmış eğik düzlemdir. Vidayı çevirdikçe yavaş yavaş ilerler ve parçaları güçlü bir şekilde sıkar. Kavanoz kapağı da bir vidadır!'},
  {t:'match',q:'Basit makineleri örnekleriyle eşleştir.',pairs:[['Eğik düzlem','Rampa'],['Çıkrık','Kuyu kovası'],['Vida','Kavanoz kapağı'],['Kaldıraç','Tahterevalli']]},
  {t:'mc',q:'Basit makineler için hangisi DOĞRU?',opts:['Kuvvetten kazandırırlar ama yoldan kaybettirirler','Enerjiyi bedavaya çoğaltırlar','Hiçbir işe yaramazlar'],a:0,tip:'Basit makineler işi kolaylaştırır ama enerjiden bedava kazanç sağlamaz.'}
 ]}
]},
/* ===== 3. ÜNİTE ===== */
{id:'mk3',field:'mekanik',icon:'gear',title:'Dişliler ve Hareket Aktarımı',desc:'Hareket bir parçadan diğerine nasıl aktarılır?',badge:'Dişli Ustası',
 guide:[{h:'Hareketi aktarmak',p:'Makinelerde bir parçanın hareketi başka parçalara aktarılabilir. Dişliler, kayışlar, kasnaklar ve zincirler bu aktarımı sağlar.'},
        {h:'Dişli oranı',p:'Oran = çevrilen dişlinin diş sayısı ÷ çeviren dişlinin diş sayısı. Oran 3 ise çevrilen dişli 3 kat yavaş ama 3 kat güçlü döner.'},
        {h:'Her yerde',p:'Bu sistemler robotlarda, bisikletlerde ve birçok makinede kullanılır.'}],
 gloss:[
  ['Dişli','Kenarında dişler olan, başka dişliyi çeviren çark.'],
  ['Ara dişli','İki dişlinin arasına konup dönme yönünü düzelten dişli.'],
  ['Dişli oranı','Çevrilen dişlinin diş sayısı ÷ çeviren dişlinin diş sayısı.','36 ÷ 12 = 3'],
  ['Tork','Döndürme kuvveti. Oran büyüdükçe tork artar, hız azalır.'],
  ['Kasnak','Üzerinden kayış geçen tekerlek.'],
  ['Kayış','İki kasnağı birbirine bağlayan esnek bant.'],
  ['Zincir','Dişlileri birbirine bağlayan, kaymayan halkalı bağlantı.','Bisiklet zinciri']],
 lessons:[
 {id:'mk07',title:'Dişlileri Tanıyalım',desc:'Dişli nedir, nasıl çalışır ve nasıl birbirine bağlanır?',ex:[
  {t:'info',fig:'tmDisliEs',h:'Dişli nedir?',p:'<b>Dişli</b>, kenarında dişler olan bir çarktır. İki dişlinin dişleri birbirine geçer. Biri dönünce diğerini de çevirir. Dişler sayesinde kaymazlar.'},
  {t:'mc',q:'Birbirine geçmiş iki dişliden biri saat yönünde dönüyor. Diğeri nasıl döner?',opts:['Saatin tersi yönünde','Saat yönünde','Hiç dönmez'],a:0,tip:'Birbirine dokunan dişliler hep ters yönde döner.'},
  {t:'info',fig:'mkAraDisli',h:'Ara dişli',p:'Üç dişliyi yan yana dizersek ortadaki <b>ara dişli</b> olur. 1. dişli saat yönünde dönerse 2. ters, 3. yine saat yönünde döner. Ara dişli yönü düzeltir.'},
  {t:'mc',q:'Yan yana 3 dişli var. Birincisi saat yönünde dönüyor. Üçüncüsü nasıl döner?',opts:['Saat yönünde','Saatin tersi yönünde','Durur'],a:0},
  {t:'mc',q:'Yan yana 4 dişli var. Birincisi saat yönünde dönüyor. Dördüncüsü nasıl döner?',opts:['Saatin tersi yönünde','Saat yönünde','Durur'],a:0,tip:'Yön her dişlide değişir: saat, ters, saat, ters.'},
  {t:'match',q:'Dişli örneklerini eşleştir.',pairs:[['Bisiklet','Pedal dişlisi'],['Mekanik saat','Akrep ve yelkovanı döndürür'],['Mikser','Çırpıcıları çevirir'],['Robot','Motoru tekerleğe bağlar']]},
  {t:'mc',q:'Dişlilerin dişleri neden vardır?',opts:['Birbirini kaymadan çevirsinler diye','Süs olsun diye','Hafif olsunlar diye'],a:0}
 ]},
 {id:'mk08',title:'Dişli Oranı',desc:'Büyük ve küçük dişlilerin hız ve tork ilişkisi.',ex:[
  {t:'info',fig:'tmDisliBK',h:'Büyük ve küçük dişli',p:'Küçük dişli büyük dişliyi çevirirse büyük dişli <b>yavaş</b> ama <b>güçlü</b> döner. Büyük dişli küçüğü çevirirse küçük dişli <b>hızlı</b> ama <b>güçsüz</b> döner. Döndürme gücüne <b>tork</b> denir.'},
  {t:'mc',q:'Küçük dişli büyük dişliyi çeviriyor. Büyük dişli nasıl döner?',opts:['Yavaş ama güçlü','Hızlı ama güçsüz','Aynı hızda'],a:0},
  {t:'info',fig:'disli',h:'Oranı hesaplamak',p:'<b>Oran = çevrilen dişlinin dişi ÷ çeviren dişlinin dişi.</b> Çeviren dişli 12, çevrilen 36 diş ise oran 36 ÷ 12 = <b>3</b>. Çevrilen dişli 3 kat yavaş, ama 3 kat güçlü döner.'},
  {t:'fill',q:'Çeviren dişli 10 diş, çevrilen dişli 40 diş. Oran kaçtır?',code:'40 ÷ 10 = ___',opts:['4','30','50'],a:0},
  {t:'type',q:'Motor dakikada 300 tur dönüyor. Oran 3 ise tekerlek dakikada kaç tur döner? (sadece sayıyı yaz)',a:['100','yüz'],tip:'Oran 3 demek 3 kat yavaş demek: 300 ÷ 3 = 100.'},
  {t:'mc',q:'Robot ağır bir kolu kaldıracak. Hangi oran daha iyi?',opts:['Büyük oran: yavaş ama güçlü','Küçük oran: hızlı ama güçsüz','Fark etmez'],a:0,tip:'Ağır iş için tork gerekir. Büyük oran torku artırır.'},
  {t:'mc',q:'Bisiklette yokuş çıkarken hangi vites seçilir?',opts:['Arkada büyük dişli: hafif ve güçlü','Arkada küçük dişli: ağır ve hızlı','Vites değişmez'],a:0,tip:'Arkadaki büyük dişli oranı büyütür. Pedal hafifler, bisiklet yavaş ama güçlü gider.'}
 ]},
 {id:'mk09',title:'Kayış, Kasnak ve Zincir Sistemleri',desc:'Hareketin farklı yöntemlerle aktarılması.',ex:[
  {t:'info',fig:'tmKasnak',h:'Kayış ve kasnak',p:'Bazen iki dönen parça birbirinden uzaktır. O zaman <b>kasnak</b> denen tekerleklere <b>kayış</b> geçiririz. Biri dönünce kayış diğerini de çevirir. Dişlilerdeki gibi küçük kasnak hızlı, büyük kasnak yavaş döner.'},
  {t:'info',fig:'mkKayis',h:'Düz ve çapraz kayış',p:'<b>Düz</b> kayışta iki kasnak <b>aynı yöne</b> döner. Kayışı <b>çapraz</b> takarsak kasnaklar <b>ters yöne</b> döner.'},
  {t:'mc',q:'İki kasnak düz kayışla bağlı. Biri saat yönünde dönüyor. Diğeri?',opts:['Saat yönünde','Saatin tersi yönünde','Durur'],a:0,tip:'Dişlilerin aksine, düz kayışla bağlı kasnaklar aynı yöne döner.'},
  {t:'info',fig:'tmZincir',h:'Zincir',p:'<b>Zincir</b>, dişlileri uzaktan birbirine bağlar. Kayış kayabilir ama zincir dişlere geçtiği için <b>kaymaz</b>. Bisikletin pedalı tekerleği zincirle çevirir.'},
  {t:'match',q:'Aktarma yollarını özellikleriyle eşleştir.',pairs:[['Dişli','Birbirine dokunur, yön değişir'],['Düz kayış','Uzağa taşır, aynı yön'],['Çapraz kayış','Uzağa taşır, ters yön'],['Zincir','Uzağa taşır, kaymaz']]},
  {t:'mc',q:'Zincir neden gevşek bırakılmamalı?',opts:['Dişliden atlayıp çıkabilir','Daha hızlı döner','Daha güçlü olur'],a:0},
  {t:'type',q:'Pedal dişlisi 40, arka dişli 20 diş. Pedal 1 tur dönünce arka tekerlek kaç tur döner? (sadece sayıyı yaz)',a:['2','iki'],tip:'Arka dişli yarı büyüklükte, 2 kat hızlı döner: 40 ÷ 20 = 2.'}
 ]}
]},
/* ===== 4. ÜNİTE ===== */
{id:'mk4',field:'mekanik',icon:'tools',title:'Mekanik Parçalar ve Yapılar',desc:'Bir makine hangi parçalardan oluşur?',badge:'Yapı Ustası',
 guide:[{h:'Sadece hareket eden parçalar değil',p:'Bir mekanik sistem yalnızca hareket eden parçalardan oluşmaz. Miller, yataklar, bağlantı elemanları ve taşıyıcı yapılar da vardır.'},
        {h:'Doğru parça',p:'Bu parçaların doğru seçilmesi sistemin güvenilir çalışması için önemlidir.'},
        {h:'Üçgen sağlamdır',p:'Üçgen şekli bastırınca yamulmaz. Köprüler ve vinçler bu yüzden üçgenlerle yapılır.'}],
 gloss:[
  ['Mil','Dişli ya da tekerleği taşıyan, dönmeyi ileten çubuk.'],
  ['Rulman','İçinde bilyeler olan, milin kolay dönmesini sağlayan parça.'],
  ['Sürtünme','Birbirine sürtünen yüzeylerin hareketi zorlaştırması.'],
  ['Cıvata','Somunla birlikte kullanılan, dişli çubuk.'],
  ['Somun','Cıvataya takılıp sıkılan, ortası dişli parça.'],
  ['Rondela','Cıvata ile parça arasına konan ince pul.'],
  ['Kafes yapı','Üçgenlerden oluşan sağlam ve hafif yapı.','Elektrik direği, vinç kolu']],
 lessons:[
 {id:'mk10',title:'Miller ve Rulmanlar',desc:'Dönme hareketi, mil ve sürtünmeyi azaltan rulmanlar.',ex:[
  {t:'info',fig:'mkRulman',h:'Mil',p:'<b>Mil</b>, dişlileri ve tekerlekleri taşıyan, dönmeyi bir yerden ötekine ileten çubuktur. Motor mili döndürür, mil de üzerindeki dişliyi ya da tekerleği çevirir.'},
  {t:'mc',q:'Milin görevi nedir?',opts:['Dönmeyi taşımak','Işık vermek','Ses çıkarmak'],a:0},
  {t:'info',h:'Sürtünme',p:'İki yüzey birbirine sürtünürse hareket zorlaşır ve ısı çıkar. Buna <b>sürtünme</b> denir. Ellerini birbirine sürtünce ısındığını hissedersin.'},
  {t:'info',h:'Rulman',p:'<b>Rulman</b>ın içinde küçük <b>bilyeler</b> vardır. Mil dönerken bilyeler yuvarlanır. Kaymak yerine yuvarlanmak sürtünmeyi çok azaltır. Kaykay ve paten tekerleklerinde de rulman vardır.'},
  {t:'mc',q:'Rulman neyi azaltır?',opts:['Sürtünmeyi','Hızı','Ağırlığı'],a:0},
  {t:'mc',q:'Ağır bir dolabı taşırken altına yuvarlak borular koymak neden işe yarar?',opts:['Kaymak yerine yuvarlanır, sürtünme azalır','Dolap hafifler','Dolap daha sağlam olur'],a:0,tip:'Rulmanın içindeki bilyeler de aynı fikirle çalışır.'},
  {t:'match',q:'Parçaları görevleriyle eşleştir.',pairs:[['Mil','Dönmeyi taşır'],['Rulman','Milin kolay dönmesini sağlar'],['Yağ','Sürtünmeyi azaltır'],['Motor','Mili döndürür']]}
 ]},
 {id:'mk11',title:'Bağlantı Elemanları',desc:'Vida, somun, cıvata ve bağlantı yöntemleri.',ex:[
  {t:'info',fig:'montaj',h:'Parçaları birleştirmek',p:'Parçalar <b>cıvata ve somunla</b> birleşir. İstersen sonra sökersin. <b>Vida</b> doğrudan malzemeye girer. <b>Perçin</b> ve <b>kaynak</b> ise kalıcıdır, sökülmez.'},
  {t:'match',q:'Bağlantı elemanlarını özellikleriyle eşleştir.',pairs:[['Cıvata ve somun','Sökülüp takılabilir'],['Perçin','Kalıcı, sökülmez'],['Kaynak','Metalleri eriterek birleştirir'],['Rondela','Cıvatanın altına konan pul']]},
  {t:'mc',q:'Robotun parçasını sık sık söküp değiştireceksin. Hangisini kullanırsın?',opts:['Cıvata ve somun','Kaynak','Perçin'],a:0,tip:'Cıvata ve somun sökülebilir. Kaynak ve perçin kalıcıdır.'},
  {t:'mc',q:'Robot sarsılırken somun gevşemesin. Ne kullanırız?',opts:['Kilitli somun (içinde plastik halka var)','Daha kısa cıvata','Bant'],a:0},
  {t:'info',h:'Sağa sıkı, sola gevşek',p:'Çoğu cıvata <b>saat yönünde</b> çevrilince sıkılır, <b>tersine</b> çevrilince gevşer. Akılda kalsın: <b>sağa sıkı, sola gevşek</b>.'},
  {t:'mc',q:'Cıvatayı gevşetmek için anahtarı hangi yöne çevirirsin?',opts:['Saatin tersi yönüne','Saat yönüne','Yukarı'],a:0},
  {t:'order',q:'İki parçayı cıvatayla birleştirmenin adımlarını sırala.',lines:true,plain:true,items:['Delikleri hizala','Cıvatayı deliklerden geçir','Rondelayı tak','Somunu tak ve sık']}
 ]},
 {id:'mk12',title:'Mekanik Yapılar ve Dayanıklılık',desc:'Taşıyıcı yapılar, yük ve dayanıklılık.',ex:[
  {t:'info',fig:'sasi',h:'Taşıyıcı yapı',p:'Her makinenin bir <b>iskeleti</b> vardır. Robotta buna <b>şasi</b> denir. Motorlar, tekerlekler ve kollar şasiye bağlanır. İskelet <b>yükü</b> taşır ve parçaları yerinde tutar.'},
  {t:'info',fig:'mkUcgen',h:'Üçgen sağlamdır',p:'Kare bir çerçeveye köşesinden bastırırsan <b>yamulur</b>. Üçgen ise şeklini <b>korur</b>. Köprüler, vinçler ve elektrik direkleri bu yüzden üçgenlerden yapılır. Buna <b>kafes yapı</b> denir.'},
  {t:'mc',q:'Hangi şekil bastırınca yamulmaz?',opts:['Üçgen','Kare','Dikdörtgen'],a:0},
  {t:'mc',q:'Kare bir çerçeveyi sağlamlaştırmak için ne yaparız?',opts:['Köşeden köşeye çapraz bir çubuk ekleriz','Rengini değiştiririz','Bir kenarını çıkarırız'],a:0,tip:'Çapraz çubuk kareyi iki üçgene böler.'},
  {t:'info',h:'Hafif ama sağlam',p:'Robotlarda <b>içi boş alüminyum borular</b> kullanılır. Hem hafif hem sağlamdır. Malzeme seçerken yüke ve ağırlığa bakılır. Çok ağır yapı yavaş, çok zayıf yapı kırılgandır.'},
  {t:'match',q:'Malzemeleri özellikleriyle eşleştir.',pairs:[['Alüminyum','Hafif ve sağlam metal'],['Çelik','Çok sağlam ama ağır'],['Ahşap','Kolay işlenir, nemden bozulur'],['Plastik','Hafif, kolay şekil alır']]},
  {t:'mc',q:'Bir rafa çok fazla kitap koyduk ve raf ortasından eğildi. Ne olmuş?',opts:['Yük, rafın dayanabileceğinden fazla','Kitaplar çok hafif','Raf çok kalın'],a:0,tip:'Her yapı belli bir yüke kadar dayanır. Mühendisler bu sınırı hesaplar.'}
 ]}
]},
/* ===== 5. ÜNİTE ===== */
{id:'mk5',field:'mekanik',icon:'pen',title:'Tasarım ve Mühendislik Uygulamaları',desc:'Öğrendiklerimizi nasıl kullanırız?',badge:'Genç Mühendis',
 guide:[{h:'Mühendis gibi',p:'Mühendisler bir problemi çözmek için önce ihtiyacı belirler, sonra tasarım yapar, prototip oluşturur ve sonuçları test eder.'},
        {h:'Hepsi bir arada',p:'Bu ünitede önceki dört ünitede öğrendiklerini bir araya getirerek kendi mekanik tasarımını oluşturursun.'},
        {h:'Hata öğretir',p:'İlk deneme nadiren mükemmel olur. Test et, hatayı bul, geliştir, tekrar dene.'}],
 gloss:[
  ['Tasarım','Bir problemi çözmek için yapılan plan ve çizim.'],
  ['Taslak','Fikri hızlıca anlatan basit çizim.'],
  ['Prototip','Fikri denemek için yapılan hızlı ve ucuz ilk örnek.','Kartondan bir kol modeli'],
  ['Test','Tasarımın istenen işi yapıp yapmadığını denemek.'],
  ['Mühendislik döngüsü','Belirle, tasarla, yap, test et, geliştir. Sonra yeniden.']],
 lessons:[
 {id:'mk13',title:'Mekanik Tasarıma Giriş',desc:'Problem belirleme, taslak çizme ve parça seçimi.',ex:[
  {t:'info',fig:'mkDongu',h:'Mühendis döngüsü',p:'Mühendisler hep aynı yolu izler: <b>problemi belirle</b>, fikir bul ve <b>çiz</b>, <b>prototip</b> yap, <b>test et</b>, <b>geliştir</b>. Sonra döngü yeniden başlar.'},
  {t:'order',q:'Mühendislik döngüsünün adımlarını sırala.',lines:true,plain:true,items:['Problemi belirle','Fikir bul ve taslak çiz','Prototip yap','Test et','Geliştir']},
  {t:'info',h:'Önce problem',p:'İyi bir tasarım doğru soruyla başlar. <b>Ne</b> yapmalı? <b>Kim</b> kullanacak? <b>Sınırlar</b> neler: boyut, ağırlık, para, zaman? Bunları yazmadan çizime başlanmaz.'},
  {t:'mc',q:'Sınıfa bitki sulama makinesi yapacaksın. İlk adım hangisi?',opts:['Makinenin ne yapması gerektiğini yazmak','Hemen kesip yapıştırmak','Boyamak'],a:0},
  {t:'info',h:'Taslak ve parça seçimi',p:'<b>Taslak</b>, fikri anlatan hızlı bir çizimdir. Ölçüler ve parçalar üzerine yazılır. Sonra her iş için doğru <b>parça</b> seçilir: ağır yük için kaldıraç ya da büyük dişli oranı, uzağa güç taşımak için zincir.'},
  {t:'match',q:'İhtiyaca uygun parçayı seç.',pairs:[['Ağır yükü kaldırmak','Büyük dişli oranı'],['Dönmeyi uzağa taşımak','Zincir veya kayış'],['Yükü yukarı itmek','Eğik düzlem'],['Milin kolay dönmesi','Rulman']]},
  {t:'mc',q:'Taslağa neden ölçüler yazılır?',opts:['Parçalar doğru boyutta yapılsın diye','Çizim güzel görünsün diye','Hiçbir sebebi yok'],a:0}
 ]},
 {id:'mk14',title:'Mekanik Sistem Tasarlama',desc:'Basit bir mekanizmayı tasarlama ve birleştirme.',ex:[
  {t:'info',fig:'mekanizma',h:'Parçalar birleşince',p:'Bir <b>mekanizma</b>, birlikte çalışan parçalardır. Örneğin bir vinç: motor <b>mili</b> çevirir, <b>dişliler</b> hızı azaltıp gücü artırır, <b>çıkrık</b> ipi sarar, <b>makara</b> yükü kaldırır.'},
  {t:'order',q:'Oyuncak vincin hareket yolunu sırala.',lines:true,plain:true,items:['Motor döner','Küçük dişli büyük dişliyi çevirir','Mil çıkrığı döndürür','İp sarılır','Yük yukarı kalkar']},
  {t:'mc',q:'Vinç ağır yükü kaldıramıyor. Hangisi en iyi çözüm?',opts:['Dişli oranını büyütmek','Motoru daha hızlı yapmak','İpi kısaltmak'],a:0,tip:'Büyük oran yavaş ama güçlü döndürür.'},
  {t:'info',fig:'tmRobot',h:'Robot da bir mekanizmadır',p:'Bir robotta hepsi bir aradadır: <b>şasi</b> iskeleti taşır, <b>tekerlek ve mil</b> yürütür, <b>dişliler</b> güç verir, <b>kol</b> bir kaldıraç gibi kalkar, <b>cıvatalar</b> her şeyi bir arada tutar.'},
  {t:'match',q:'Robot parçalarını öğrendiğin konularla eşleştir.',pairs:[['Robot kolu','Kaldıraç'],['Tekerlek dişli kutusu','Dişli oranı'],['Şasi','Taşıyıcı yapı'],['Tekerlek ekseni','Mil ve rulman']]},
  {t:'mc',q:'Kapıyı otomatik açan bir mekanizmada motor kapıdan uzakta. Hareketi nasıl taşırsın?',opts:['Zincir ya da kayışla','Bantla yapıştırarak','Taşıyamazsın'],a:0},
  {t:'mc',q:'Parçaları birleştirirken neden önce kartondan deneriz?',opts:['Ucuz ve hızlı olduğu için hatayı erken görürüz','Karton metalden sağlam olduğu için','Kural olduğu için'],a:0}
 ]},
 {id:'mk15',title:'Test Etme ve Geliştirme',desc:'Tasarımı test etme, hataları bulma ve iyileştirme.',ex:[
  {t:'info',h:'Test et',p:'<b>Test</b>, tasarımın istenen işi yapıp yapmadığını denemektir. Ölçülebilir bir hedef koy: "Vinç 500 gramı 30 cm kaldırmalı." Sonra dene ve sonucu yaz.'},
  {t:'mc',q:'Hangisi iyi bir test hedefidir?',opts:['Araba 2 metreyi 5 saniyede gitmeli','Araba güzel olmalı','Araba iyi çalışmalı'],a:0,tip:'İyi hedef ölçülebilir. Sayılarla kontrol edebilirsin.'},
  {t:'info',h:'Hata öğretir',p:'İlk deneme nadiren mükemmel olur. Bir şey bozulursa <b>neden</b> bozulduğunu bul. Her seferinde <b>tek bir şeyi</b> değiştir ve yeniden dene. Böylece neyin işe yaradığını anlarsın.'},
  {t:'mc',q:'Arabanın tekerleği takılıyor. Ne yaparsın?',opts:['Sebebini bulup tek bir şeyi değiştirir, yeniden denerim','Hepsini çöpe atarım','Hiç denemem'],a:0},
  {t:'match',q:'Sorunları çözümleriyle eşleştir.',pairs:[['Kol yükü kaldıramıyor','Dişli oranını büyüt'],['Çerçeve yamuluyor','Çapraz çubukla üçgen yap'],['Cıvata gevşiyor','Kilitli somun kullan'],['Mil zor dönüyor','Rulman ekle']]},
  {t:'order',q:'Bir sorunu çözmenin adımlarını sırala.',lines:true,plain:true,items:['Test et ve sonucu yaz','Sorunun sebebini bul','Tek bir şeyi değiştir','Yeniden test et']},
  {t:'mc',q:'Tasarımın hedefi tutturdu. Şimdi ne yaparsın?',opts:['Notlarını kaydeder, sonucu takımla paylaşırım','Notları silerim','Hiç kimseye göstermem'],a:0,tip:'Notlar bir sonraki tasarımda zaman kazandırır. Mühendisler öğrendiklerini paylaşır.'}
 ]}
]}
];
