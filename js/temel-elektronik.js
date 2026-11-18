/* #BilimKıvılcımı · Elektronik: en başa gelen iki temel ünite (ord 8.1 ve 8.2).
   Hiçbir şey bilmeyen biri için: elektrik, pil, devre, anahtar, iletken, kablo, motor, sensör.
   Sonunda mevcut "Robotun güç sistemi" (e1) ünitesine köprü kurulur. */
'use strict';

/* ---------- Görseller ---------- */
/* Pil + lamba devresi. o.on: elektrik akıyor mu; o.sw: 'none' | 'open' | 'closed' | 'cut' (kopuk tel) */
function teCircuit(o){
  const L=76,R=272,T=34,B=150,M=92,up=M-26,dn=M+26,mL=144,mR=204,sw=o.sw||'none',on=!!o.on;
  const full=`M${L} ${up}V${T}H${R}V${up}M${R} ${dn}V${B}H${L}V${dn}`;
  const gap=`M${L} ${up}V${T}H${mL}M${mR} ${T}H${R}V${up}M${R} ${dn}V${B}H${L}V${dn}`;
  let s=`<path d="${(sw==='open'||sw==='cut')?gap:full}" fill="none" stroke="${GK.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(sw==='closed')s+=`<path d="M${mL} ${T}H${mR}" stroke="${GK.ember}" stroke-width="8" stroke-linecap="round"/><circle cx="${mL}" cy="${T}" r="6" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="3"/><circle cx="${mR}" cy="${T}" r="6" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="3"/>`;
  if(sw==='open')s+=`<path d="M${mL} ${T}L${mR-8} ${T-26}" stroke="${GK.ember}" stroke-width="8" stroke-linecap="round"/><circle cx="${mL}" cy="${T}" r="6" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="3"/><circle cx="${mR}" cy="${T}" r="6" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="3"/>`;
  if(sw==='cut')s+=gt(174,T-10,'kopuk!',{s:13,c:GK.red});
  if(sw==='closed'||sw==='open')s+=gt(174,sw==='open'?T+26:T-14,'Anahtar',{s:12});
  if(on)s+=`<path class="gflow" d="${full}" fill="none" stroke="${GK.yellow}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 13"/>`;
  s+=`<rect x="${L-22}" y="${M-26}" width="44" height="52" rx="7" fill="${GK.ink}"/><rect x="${L-9}" y="${M-32}" width="18" height="7" rx="2" fill="${GK.red}"/>${gt(L,M-5,'+',{s:20,c:GK.gold})}${gt(L,M+18,'−',{s:20,c:GK.cream})}`;
  if(on)s+=`<circle cx="${R}" cy="${M-2}" r="38" fill="${GK.ember}" opacity=".28"/>`+[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return `<path d="M${(R+Math.cos(a)*31).toFixed(1)} ${(M-2+Math.sin(a)*31).toFixed(1)}L${(R+Math.cos(a)*38).toFixed(1)} ${(M-2+Math.sin(a)*38).toFixed(1)}" stroke="${GK.ember}" stroke-width="3" stroke-linecap="round"/>`}).join('');
  s+=`<rect x="${R-11}" y="${M+20}" width="22" height="12" rx="3" fill="${GK.steel}" stroke="${GK.ink}" stroke-width="2"/><circle cx="${R}" cy="${M-2}" r="24" fill="${on?GK.gold:GK.sand}" stroke="${GK.ink}" stroke-width="3"/><path d="M${R-8} ${M+14}L${R-4} ${M+2}L${R} ${M+10}L${R+4} ${M+2}L${R+8} ${M+14}" fill="none" stroke="${on?GK.terra:GK.steelD}" stroke-width="2.5" stroke-linejoin="round"/>`;
  s+=gt(L-30,M+4,'Pil',{s:13,a:'end'})+gt(R+44,M+4,'Lamba',{s:13,a:'start'});
  if(o.cap)s+=gt(180,184,o.cap,{s:13,c:o.capc||GK.terra});
  return s;
}
/* İletken / yalıtkan deney paneli: küçük devre, altta kaşık */
function teSpoon(x,metal){
  const L=28,R=142,T=40,B=112,on=metal,col=metal?GK.steel:'#8FB8D0';
  const full=`M${L} 60V${T}H${R}V64M${R} 90V${B}H${L}V94`;
  const wire=`M${L} 60V${T}H${R}V64M${R} 90V${B}H116M54 ${B}H${L}V94`;
  return `<g transform="translate(${x} 0)"><path d="${wire}" fill="none" stroke="${GK.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
   <rect x="${L-13}" y="58" width="26" height="36" rx="5" fill="${GK.ink}"/><rect x="${L-5}" y="53" width="10" height="6" rx="1" fill="${GK.red}"/>${gt(L,72,'+',{s:13,c:GK.gold})}${gt(L,88,'−',{s:13,c:GK.cream})}
   ${on?`<circle cx="${R}" cy="77" r="26" fill="${GK.ember}" opacity=".28"/>`:''}<circle cx="${R}" cy="77" r="14" fill="${on?GK.gold:GK.sand}" stroke="${GK.ink}" stroke-width="2.5"/><rect x="${R-6}" y="89" width="12" height="7" rx="2" fill="${GK.steel}" stroke="${GK.ink}" stroke-width="1.5"/>
   <rect x="58" y="${B-5}" width="40" height="10" rx="4" fill="${col}" stroke="${GK.ink}" stroke-width="2"/><ellipse cx="106" cy="${B}" rx="12" ry="9" fill="${col}" stroke="${GK.ink}" stroke-width="2"/>
   ${on?`<path class="gflow" d="${full}M116 ${B}H54" fill="none" stroke="${GK.yellow}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="1 13"/>`:''}
   ${gt(85,18,metal?'Metal kaşık':'Plastik kaşık',{s:14})}${gt(85,142,metal?'İletken':'Yalıtkan',{s:14,c:metal?GK.olive:GK.red})}${gt(85,158,metal?'Elektrik geçer, lamba yanar':'Elektrik geçmez, lamba yanmaz',{s:10,w:600,c:'#6B604A'})}</g>`;
}
const teBlades=(cx,cy,len,col,dur)=>`<g class="gspin" style="transform-origin:${cx}px ${cy}px;animation-duration:${dur}s">${[0,120,240].map(a=>`<ellipse cx="${cx}" cy="${cy-len/2}" rx="${len*.22}" ry="${len/2}" fill="${col}" stroke="${GK.ink}" stroke-width="2" transform="rotate(${a} ${cx} ${cy})"/>`).join('')}<circle cx="${cx}" cy="${cy}" r="${len*.16}" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="2"/></g>`;

Object.assign(FIG,{
 teElek:`<svg viewBox="0 0 360 170">${gt(180,16,'Hepsi elektrikle çalışır',{s:13,c:GK.terra})}
  <circle cx="65" cy="68" r="38" fill="${GK.ember}" opacity=".25"/><circle cx="65" cy="62" r="24" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="3"/><rect x="54" y="84" width="22" height="14" rx="3" fill="${GK.steel}" stroke="${GK.ink}" stroke-width="2"/>${gt(65,128,'Lamba',{s:13})}${gt(65,144,'ışık verir',{s:10,w:600,c:'#6B604A'})}
  <rect x="155" y="30" width="50" height="84" rx="9" fill="${GK.ink}"/><rect x="160" y="38" width="40" height="66" rx="3" fill="#8FB8D0"/><path d="M182 46L173 70H181L178 94L191 64H183Z" fill="${GK.yellow}" stroke="${GK.ink}" stroke-width="1.5" stroke-linejoin="round"/>${gt(180,128,'Telefon',{s:13})}${gt(180,144,'şarjla dolar',{s:10,w:600,c:'#6B604A'})}
  <rect x="291" y="84" width="8" height="18" fill="${GK.steelD}"/><rect x="277" y="102" width="36" height="8" rx="3" fill="${GK.steelD}"/>${teBlades(295,62,44,GK.olive,1.1)}${gt(295,128,'Vantilatör',{s:13})}${gt(295,144,'rüzgar çıkarır',{s:10,w:600,c:'#6B604A'})}</svg>`,
 tePil:`<svg viewBox="0 0 360 190"><rect x="70" y="52" width="80" height="112" rx="12" fill="${GK.ink}"/><rect x="95" y="38" width="30" height="16" rx="4" fill="${GK.red}"/>${gt(110,51,'+',{s:15,c:GK.cream})}
  ${[62,84,106,128].map(y=>`<rect x="80" y="${y}" width="60" height="16" rx="4" fill="${GK.gold}"/>`).join('')}${gt(110,159,'−',{s:16,c:GK.cream})}
  <path d="M128 46H176" stroke="${GK.ink}" stroke-width="2"/><path d="M150 158H176" stroke="${GK.ink}" stroke-width="2"/>
  ${gt(184,51,'Artı (+) uç',{s:14,a:'start'})}${gt(184,163,'Eksi (−) uç',{s:14,a:'start'})}${gt(184,100,'Enerji deposu',{s:15,a:'start',c:GK.terra})}${gt(184,118,'Dolu pilde çok enerji var',{s:11,a:'start',w:600,c:'#6B604A'})}${gt(184,134,'Bitince enerji biter',{s:11,a:'start',w:600,c:'#6B604A'})}</svg>`,
 teDevre:`<svg viewBox="0 0 360 192">${teCircuit({on:true,cap:'Halka tam: elektrik dönüyor, lamba yanıyor'})}</svg>`,
 teDevreAcik:`<svg viewBox="0 0 360 192">${teCircuit({on:false,sw:'cut',cap:'Halka açık: elektrik duruyor, lamba yanmıyor',capc:GK.red})}</svg>`,
 teAnahtarAcik:`<svg viewBox="0 0 360 192">${teCircuit({on:false,sw:'open',cap:'Anahtar açık: yolda boşluk var, lamba sönük',capc:GK.red})}</svg>`,
 teAnahtarKapali:`<svg viewBox="0 0 360 192">${teCircuit({on:true,sw:'closed',cap:'Anahtar kapalı: yol tam, lamba yanıyor'})}</svg>`,
 teIletken:`<svg viewBox="0 0 360 170">${teSpoon(10,true)}${teSpoon(180,false)}</svg>`,
 teKablo:`<svg viewBox="0 0 360 190"><circle cx="95" cy="98" r="62" fill="${GK.red}" stroke="${GK.ink}" stroke-width="3"/><circle cx="95" cy="98" r="44" fill="#C98B4A" stroke="${GK.ink}" stroke-width="2"/>
  ${[[0,0],...[0,1,2,3,4,5].map(i=>[Math.cos(i*Math.PI/3)*24,Math.sin(i*Math.PI/3)*24])].map(([dx,dy])=>`<circle cx="${(95+dx).toFixed(1)}" cy="${(98+dy).toFixed(1)}" r="9" fill="#E3B25A" stroke="#8A5A25" stroke-width="1.5"/>`).join('')}
  ${gt(95,20,'Plastik kılıf (yalıtkan)',{s:12,c:GK.red})}${gt(95,182,'Bakır teller (iletken)',{s:12,c:'#8A5A25'})}
  <rect x="190" y="76" width="110" height="44" rx="9" fill="${GK.red}" stroke="${GK.ink}" stroke-width="3"/><rect x="298" y="86" width="52" height="24" rx="3" fill="#C98B4A" stroke="${GK.ink}" stroke-width="2"/>${[92,98,104].map(y=>`<path d="M300 ${y}H348" stroke="#E3B25A" stroke-width="2.5"/>`).join('')}
  ${gt(245,142,'Dışı plastik',{s:12})}${gt(324,134,'İçi bakır',{s:12})}${gt(270,62,'Kablonun yan görünüşü',{s:11,w:600,c:'#6B604A'})}</svg>`,
 teMotor:`<svg viewBox="0 0 360 192"><path d="M72 64V34H262V66M262 126V158H72V122" fill="none" stroke="${GK.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path class="gflow" d="M72 64V34H262V66M262 126V158H72V122" fill="none" stroke="${GK.yellow}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 13"/>
  <rect x="50" y="70" width="44" height="52" rx="7" fill="${GK.ink}"/><rect x="63" y="64" width="18" height="7" rx="2" fill="${GK.red}"/>${gt(72,90,'+',{s:18,c:GK.gold})}${gt(72,114,'−',{s:18,c:GK.cream})}${gt(40,100,'Pil',{s:13,a:'end'})}
  <rect x="228" y="66" width="74" height="60" rx="12" fill="${GK.steel}" stroke="${GK.ink}" stroke-width="3"/>${gt(265,101,'MOTOR',{s:13})}<rect x="302" y="90" width="20" height="12" fill="${GK.ink}"/>${teBlades(332,96,44,GK.olive,.6)}${gt(332,150,'Pervane',{s:12})}
  ${gt(180,184,'Elektrik gelir, motor döner',{s:13,c:GK.terra})}</svg>`,
 teSensor:`<svg viewBox="0 0 360 192"><path class="gcone" d="M258 40L150 78V170Z" fill="${GK.ember}" opacity=".3"/>
  <rect x="232" y="56" width="104" height="112" rx="4" fill="${GK.sand}" stroke="${GK.ink}" stroke-width="3"/><rect x="238" y="62" width="46" height="106" fill="${GK.steel}"/><rect x="286" y="62" width="44" height="106" fill="${GK.steel}"/>
  <rect x="258" y="20" width="52" height="26" rx="6" fill="${GK.olive}"/><circle cx="284" cy="33" r="8" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="2"/><circle cx="284" cy="33" r="3.5" fill="${GK.ink}"/>${gt(284,14,'Sensör',{s:12})}
  <g class="gbob"><circle cx="105" cy="96" r="15" fill="${GK.terra}" stroke="${GK.ink}" stroke-width="2"/><rect x="90" y="112" width="30" height="42" rx="12" fill="${GK.blue}" stroke="${GK.ink}" stroke-width="2"/><path d="M98 154V168M112 154V168" stroke="${GK.ink}" stroke-width="5" stroke-linecap="round"/></g>
  ${gt(105,74,'Biri geliyor!',{s:12})}${gt(180,186,'Sensör görür, kapı açılır',{s:13,c:GK.terra})}</svg>`,
 teRobot:`<svg viewBox="0 0 360 200"><g transform="translate(-8 0)"><rect x="50" y="60" width="262" height="92" rx="12" fill="${GK.olive}" stroke="${GK.ink}" stroke-width="3"/>
  <circle cx="92" cy="160" r="20" fill="${GK.ink}"/><circle cx="92" cy="160" r="7" fill="${GK.cream}"/><circle cx="272" cy="160" r="20" fill="${GK.ink}"/><g class="gspin" style="transform-origin:272px 160px;animation-duration:1s"><circle cx="272" cy="160" r="9" fill="${GK.cream}"/><path d="M272 152V168M264 160H280" stroke="${GK.ink}" stroke-width="2.5"/></g>
  <rect x="66" y="82" width="58" height="40" rx="6" fill="${GK.ink}"/><rect x="74" y="76" width="16" height="7" rx="2" fill="${GK.red}"/>${gt(95,108,'PİL',{s:13,c:GK.gold})}
  <path d="M124 102H222" stroke="${GK.ink}" stroke-width="7" stroke-linecap="round"/><path class="gflow" d="M124 102H222" stroke="${GK.yellow}" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 13"/>
  <rect x="222" y="82" width="46" height="40" rx="8" fill="${GK.steel}" stroke="${GK.ink}" stroke-width="3"/><path d="M262 122L272 150" stroke="${GK.ink}" stroke-width="5" stroke-linecap="round"/>
  <path class="gcone" d="M334 100L366 80V122Z" fill="${GK.ember}" opacity=".35"/><rect x="310" y="88" width="26" height="24" rx="5" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2.5"/><circle cx="326" cy="100" r="5" fill="${GK.ink}"/></g>
  ${gt(86,48,'Pil',{s:13})}${gt(160,48,'Kablo',{s:13})}${gt(237,48,'Motor',{s:13})}${gt(318,48,'Sensör',{s:13})}${gt(180,194,'Robotun da pili ve kabloları var!',{s:14,c:GK.terra})}</svg>`
});

/* ---------- Üniteler ---------- */
U.push({id:'te1',field:'elektronik',icon:'bulb',ord:8.1,title:'Elektrik nedir?',desc:'Pil, devre ve anahtar. Lambayı nasıl yakarız?',badge:'Kıvılcım Çırağı',
 guide:[{h:'Elektrik nedir?',p:'Lamba, telefon, vantilatör... Hepsini çalıştıran enerjiye elektrik denir.'},
        {h:'Pil ve devre',p:'Pil enerji saklayan küçük bir depodur. Elektrik pilden çıkar, lambadan geçer, pile geri döner. Bu halkaya devre denir.'},
        {h:'Anahtar',p:'Anahtar, halkayı açıp kapatan düğmedir. Halka tamsa lamba yanar.'}],
 gloss:[['Elektrik','Lamba, telefon ve vantilatör gibi şeyleri çalıştıran bir enerji türü.','Işık düğmesine basınca lamba yanar'],['Pil','İçinde enerji saklayan küçük depo. Enerjiyi elektrik olarak verir.','El fenerinin pili'],['Devre','Elektriğin pilden çıkıp pile geri döndüğü halka.','Başladığın yere dönen koşu pisti'],['Anahtar','Devreyi açıp kapatan düğme.','Odanın ışık düğmesi']],
 lessons:[
 {id:'te1a',title:'Elektrik nerede?',ex:[
  {t:'info',fig:'teElek',h:'Merhaba, ben Anka!',p:'Odana bak. Lamba yanıyor, telefon şarj oluyor, vantilatör dönüyor. Hepsi <b>elektrikle</b> çalışır. Elektrik, cihazlara "çalış!" diyen bir <b>enerjidir</b>. Enerji, bir işi yaptıran güç demek. Bisikleti pedallarken kullandığın güç de bir enerjidir.'},
  {t:'mc',q:'Hangisi elektrikle çalışır?',opts:['Televizyon','Tahta kaşık','Kum kalesi'],a:0,tip:'Televizyonu çalıştıran şey elektriktir.'},
  {t:'match',q:'Cihazı yaptığı işle eşleştir.',pairs:[['Lamba','Işık verir'],['Vantilatör','Rüzgar çıkarır'],['Kapı zili','Ses çıkarır'],['Telefon şarjı','Telefonun pilini doldurur']]},
  {t:'info',h:'Önce güvenlik!',p:'Evdeki <b>priz</b> çok güçlüdür ve <b>tehlikelidir</b>. Prize hiçbir şey sokmayız. Islak elle prize ya da kabloya dokunmayız. Deneyleri sadece <b>küçük pillerle</b> yaparız. Yanımızda da bir büyük olur.'},
  {t:'mc',q:'Duvarda bir priz gördün. Ne yaparsın?',opts:['Dokunmam ve oynamam','Parmağımı sokarım','İçine bir tel sokarım'],a:0,tip:'Priz çok tehlikelidir. Ona sadece büyükler dikkatle yaklaşır.'},
  {t:'line',q:'Hangisi elektrikle ÇALIŞMAZ?',lines:['Lamba','Televizyon','Tahta sandalye','Telefon'],a:[2],plain:true,tip:'Sandalye hiçbir şeye bağlanmaz, kendi kendine durur.'},
  {t:'mc',q:'Deneyleri hangi elektrikle yaparız?',opts:['Küçük pillerle','Prizle','Fırtınadaki yıldırımla'],a:0,tip:'Küçük piller güvenlidir. Yine de yanımızda bir büyük olsun.'}
 ]},
 {id:'te1b',title:'Pil: enerji deposu',ex:[
  {t:'info',fig:'tePil',h:'Pil nedir?',p:'<b>Pil</b>, içinde enerji saklayan küçük bir depodur. Bu enerjiyi elektrik olarak verir. Kumandanın içinde de, el fenerinin içinde de pil vardır. Pil bitince enerji de biter.'},
  {t:'mc',q:'Pil ne işe yarar?',opts:['Enerji saklar ve elektrik verir','Sadece süs olur','Su depolar'],a:0},
  {t:'info',fig:'tePil',h:'İki ucu var',p:'Pilin iki ucu vardır: <b>artı (+)</b> ve <b>eksi (−)</b>. Elektrik artı uçtan çıkar, dolaşır, eksi uca döner. Kaydırağın tepesinden kayıp aşağıya inmek gibi.'},
  {t:'mc',q:'Pilin iki ucuna ne ad verilir?',opts:['Artı (+) ve eksi (−)','Sağ ve sol','Büyük ve küçük'],a:0},
  {t:'fill',q:'Boşluğu doldur.',code:'Pil bir enerji ___',opts:['deposudur','boyasıdır','sesidir'],a:0},
  {t:'mc',q:'Kumandanın pili bitti. Ne olur?',opts:['Kumanda çalışmaz, çünkü enerji bitti','Kumanda daha hızlı çalışır','Hiçbir şey olmaz'],a:0},
  {t:'info',h:'Pille güvenli deney',p:'Deneylerde küçük pil (AA ya da AAA) kullanırız. Pilleri ağzımıza almayız, ısıtmayız, delmeyiz. Eski pilleri çöpe değil, <b>pil kutusuna</b> atarız.'},
  {t:'mc',q:'Eski bir pil buldun. Nereye atarsın?',opts:['Pil toplama kutusuna','Normal çöpe','Ateşe'],a:0,tip:'Eski piller doğaya zarar verir. Pil kutularında toplanır.'}
 ]},
 {id:'te1c',title:'Devre: elektriğin halkası',ex:[
  {t:'info',fig:'teDevre',h:'Elektrik dönüp gelir',p:'Lamba yanmak için elektriğin <b>bir yoldan geçmesi</b> gerekir. Yol pilin artı ucundan çıkar, lambadan geçer, pilin eksi ucuna döner. Bu halkaya <b>devre</b> denir. Koşu pisti gibi: koşar, başladığın yere dönersin. Sarı noktalar elektriği gösteriyor.'},
  {t:'mc',q:'Devre neye benzer?',opts:['Başladığı yere dönen bir koşu pisti','Hiç dönmeyen düz bir yol','Kapalı bir kutu'],a:0},
  {t:'info',fig:'teDevreAcik',h:'Yol koparsa',p:'Tel koparsa halka <b>açılır</b>. Elektrik yolun sonuna gelir ve duruverir. Lamba yanmaz. Köprü yıkılınca arabaların geçememesi gibi.'},
  {t:'mc',fig:'teDevreAcik',q:'Lamba yanmıyor. Neden?',opts:['Halka açık, elektrik dönemiyor','Lamba uyuyor','Pil çok büyük'],a:0,tip:'Tel kopuk olduğu için yol tamamlanmıyor.'},
  {t:'order',q:'Elektriğin yolunu sırala.',lines:true,plain:true,items:['Pilin artı ucu','Lamba','Pilin eksi ucu']},
  {t:'line',q:'Hangisi lambanın yanmasını ENGELLER?',lines:['Pil takılı','Teller birbirine bağlı','Bir tel kopuk','Lamba sağlam'],a:[2],plain:true,tip:'Kopuk tel halkayı açar, elektrik dönemez.'},
  {t:'fill',q:'Halka tamamsa ne olur?',code:'Lamba ___',opts:['yanar','sönük kalır','kaçar'],a:0},
  {t:'mc',q:'En basit devre için neler lazım?',opts:['Pil, kablo ve lamba','Sadece lamba','Sadece kablo'],a:0,tip:'Pil enerji verir, kablo yolu kurar, lamba ışık verir.'}
 ]},
 {id:'te1d',title:'Anahtar: yolu aç, yolu kapat',ex:[
  {t:'info',fig:'teAnahtarAcik',h:'Işığı nasıl yakarsın?',p:'Düğmeye basarak! Bu düğmenin gerçek adı <b>anahtardır</b>. Anahtar, halkadaki bir <b>köprü</b> gibidir. Köprü kalkıksa yol kesilir, elektrik geçemez. Lamba söner.'},
  {t:'info',fig:'teAnahtarKapali',h:'Anahtarı kapatınca',p:'Anahtarı <b>kapatınca</b> köprü iner, yol tamamlanır. Elektrik döner, lamba yanar. Küçük bir ipucu: anahtar "kapalı" ise halka tamdır. "Açık" ise halkada boşluk vardır.'},
  {t:'mc',fig:'teAnahtarKapali',q:'Anahtar kapalı. Lamba ne yapar?',opts:['Yanar','Söner','Pil olur'],a:0},
  {t:'mc',fig:'teAnahtarAcik',q:'Anahtar açık. Lamba ne yapar?',opts:['Sönük kalır','Yanar','Uçar'],a:0,tip:'Anahtar açıkken yol kesiktir, elektrik geçemez.'},
  {t:'match',q:'Durumu sonucuyla eşleştir.',pairs:[['Anahtar açık','Yol kesik, lamba sönük'],['Anahtar kapalı','Halka tam, lamba yanık'],['Pil','Enerji verir']]},
  {t:'mc',q:'Hangisi günlük hayatta bir anahtar örneğidir?',opts:['Odanın ışık düğmesi','Yastık','Su bardağı'],a:0},
  {t:'order',q:'Işığı yakma adımlarını sırala.',lines:true,plain:true,items:['Karanlık odaya gir','Düğmeye bas','Halka tamamlanır','Lamba yanar']}
 ]}
],
 kupa:[
  {t:'mc',q:'El fenerinin pilini çıkardın. Fener yanar mı?',opts:['Yanmaz, çünkü enerji kaynağı yok','Yanar','Daha parlak yanar','Rengi değişir'],a:0},
  {t:'fill',q:'Pilin iki ucu: artı ve ___',code:'Artı (+) ve ___ (−)',opts:['eksi','büyük','hızlı'],a:0},
  {t:'mc',q:'Bir telin ortası koptu. Lamba neden söner?',opts:['Halka açıldı, elektrik dönemiyor','Lamba korktu','Pil büyüdü','Tel eridi'],a:0},
  {t:'order',q:'Lambayı yakmak için adımları sırala.',lines:true,plain:true,items:['Pili tak','Kabloları bağla','Anahtarı kapat','Lamba yanar']},
  {t:'line',q:'Hangisi güvenli DEĞİLDİR?',lines:['Küçük pille deney yapmak','Eski pili pil kutusuna atmak','Prize tel sokmak','Büyükle birlikte deney yapmak'],a:[2],plain:true},
  {t:'mc',q:'Elektriğin pilden çıkıp pile geri döndüğü halkaya ne denir?',opts:['Devre','Kaydırak','Merdiven','Köprü'],a:0}
 ]});

U.push({id:'te2',field:'elektronik',icon:'loop',ord:8.2,title:'Elektriğin yolu',desc:'Kablo, motor ve sensör. Robota giden köprü.',badge:'Devre Kaşifi',
 guide:[{h:'İletken ve yalıtkan',p:'Metal elektriği geçirir: iletkendir. Plastik geçirmez: yalıtkandır. Kablonun içi bakır, dışı plastiktir.'},
        {h:'Motor',p:'Motor elektriği harekete çevirir. Vantilatörü ve oyuncak arabayı o döndürür.'},
        {h:'Sensör',p:'Sensör, çevreyi hisseden parçadır. Robotun gözü ve kulağı gibidir.'}],
 gloss:[['İletken','Elektriği geçiren madde.','Metal kaşık, bakır tel'],['Yalıtkan','Elektriği geçirmeyen madde.','Plastik, lastik'],['Kablo','İçi bakır tel, dışı plastik olan elektrik yolu.'],['Motor','Elektriği harekete çeviren parça.','Vantilatör, oyuncak araba'],['Sensör','Çevreyi hisseden parça.','Otomatik kapının gözü']],
 lessons:[
 {id:'te2a',title:'İletken ve yalıtkan',ex:[
  {t:'info',fig:'teIletken',h:'Bazıları geçirir, bazıları geçirmez',p:'Elektrik her şeyin içinden geçmez. <b>Metal kaşık</b> elektriği geçirir, lamba yanar. <b>Plastik kaşık</b> geçirmez, lamba yanmaz. Geçirenlere <b>iletken</b>, geçirmeyenlere <b>yalıtkan</b> denir.'},
  {t:'mc',fig:'teIletken',q:'Metal kaşığı devreye koyunca lamba yandı. Kaşık nedir?',opts:['İletken','Yalıtkan','Pil'],a:0},
  {t:'match',q:'Eşyayı türüyle eşleştir.',pairs:[['Metal kaşık','İletken'],['Plastik kaşık','Yalıtkan'],['Bakır tel','İletken'],['Lastik','Yalıtkan']]},
  {t:'info',h:'Yalıtkan bizi korur',p:'Elektrikçilerin tornavidasının sapı plastiktir. Böylece elektrik ellerine geçmez. Yalıtkanlar, elektriği olması gereken yerde tutar.'},
  {t:'mc',q:'Elektrikçi tornavidasının sapı neden plastik?',opts:['Elektrik ele geçmesin diye','Daha renkli olsun diye','Daha ağır olsun diye'],a:0},
  {t:'line',q:'Hangisi iletken DEĞİLDİR?',lines:['Demir çivi','Bakır tel','Plastik cetvel','Alüminyum folyo'],a:[2],plain:true,tip:'Plastik yalıtkandır, elektriği geçirmez.'},
  {t:'fill',q:'Boşluğu doldur.',code:'Metaller elektriği ___',opts:['geçirir','geçirmez','yutar'],a:0},
  {t:'mc',q:'Lambanın yanmasını durdurmak istiyorsun. Devreye ne koyarsın?',opts:['Plastik kaşık','Metal kaşık','Bakır tel'],a:0,tip:'Plastik yalıtkandır, yolu keser.'}
 ]},
 {id:'te2b',title:'Kablo: elektriğin yolu',ex:[
  {t:'info',fig:'teKablo',h:'Kablonun içi',p:'<b>Kablo</b>, elektriğin yoludur. İçinde ince <b>bakır teller</b> vardır. Bakır iletkendir. Dışı <b>plastiktir</b>. Plastik yalıtkandır. Böylece elektrik içeride kalır ve bize zarar vermez.'},
  {t:'mc',fig:'teKablo',q:'Kablonun içinde ne var?',opts:['Bakır teller','Su','Kum'],a:0},
  {t:'mc',q:'Kablonun dışı neden plastik?',opts:['Elektrik dışarı kaçmasın diye','Daha hafif olsun diye','Çocuklar sevsin diye'],a:0},
  {t:'match',q:'Kablo parçasını görevle eşleştir.',pairs:[['Bakır tel','Elektriği taşır'],['Plastik kılıf','Elektriği içeride tutar'],['Pil','Enerji verir']]},
  {t:'info',h:'Kalın mı, ince mi?',p:'Çok elektrik taşıyan kablo <b>kalın</b> olur. Bahçe hortumu gibi: çok su akacaksa kalın hortum gerekir. Az elektrik taşıyan kablo ince olabilir.'},
  {t:'mc',q:'Hangi kablo daha çok elektrik taşıyabilir?',opts:['Kalın kablo','İnce kablo','Kopuk kablo'],a:0},
  {t:'mc',q:'Bir kablonun plastiği yırtılmış, bakır tel görünüyor. Ne yaparsın?',opts:['Dokunmam, büyüğüme haber veririm','Parmağımla yoklarım','Ağzıma alırım'],a:0,tip:'Plastik yırtılınca elektrik dışarı çıkabilir. Bunu büyükler onarır.'}
 ]},
 {id:'te2c',title:'Motor: elektrik harekete dönüşür',ex:[
  {t:'info',fig:'teMotor',h:'Motor nedir?',p:'<b>Motor</b>, elektriği harekete çevirir. Pilden elektrik gelince <b>döner</b>. Vantilatörün pervanesini döndüren de, oyuncak arabanın tekerini döndüren de motordur.'},
  {t:'mc',q:'Motor elektriği neye çevirir?',opts:['Harekete','Suya','Kâğıda'],a:0},
  {t:'match',q:'Cihazı motorun işiyle eşleştir.',pairs:[['Vantilatör','Pervaneyi döndürür'],['Oyuncak araba','Tekerleri döndürür'],['Çamaşır makinesi','Davulu döndürür'],['Matkap','Ucu döndürür']]},
  {t:'info',h:'Motorun da pili lazım',p:'Motor tek başına dönmez. <b>Pil, kablo ve motor</b> bir halka kurar. Pilin enerjisi bitince motor durur. Oyuncak araba yavaşlayıp durursa genellikle pili bitmiştir.'},
  {t:'mc',q:'Oyuncak araba yavaşladı ve durdu. İlk neye bakarsın?',opts:['Pilini kontrol ederim','Rengine bakarım','Lastiği boyarım'],a:0},
  {t:'fill',q:'Boşluğu doldur.',code:'Motora elektrik gelir,\nmotordan ___ çıkar.',opts:['hareket','kâğıt','boya'],a:0},
  {t:'mc',q:'Hangisinde motor vardır?',opts:['Elektrikli vantilatör','Tahta kaşık','Kitap'],a:0}
 ]},
 {id:'te2d',title:'Sensör ve robota köprü',ex:[
  {t:'info',fig:'teSensor',h:'Sensör nedir?',p:'Market kapısına yaklaşınca kapı kendiliğinden açılır. Çünkü kapıda bir <b>sensör</b> vardır. Sensör, çevreyi <b>hisseden</b> parçadır. Göz, kulak ya da dokunma gibi çalışır.'},
  {t:'mc',q:'Otomatik kapıyı açan şey nedir?',opts:['Sensör','Kaşık','Boya'],a:0},
  {t:'match',q:'Sensörü hissettiği şeyle eşleştir.',pairs:[['Otomatik kapı sensörü','Birinin yaklaştığını'],['Kamera','Görüntüyü'],['Mikrofon','Sesi'],['Termometre','Sıcaklığı']]},
  {t:'mc',q:'Robotun gözü olarak hangisini kullanırız?',opts:['Kamera ya da mesafe sensörü','Motor','Pil'],a:0},
  {t:'info',fig:'teRobot',h:'Robotun da pili ve kabloları var!',p:'Şimdi robota bakalım. Robotun da bir <b>pili</b> (adı akü), elektriği taşıyan <b>kabloları</b>, hareket için <b>motorları</b> ve çevreyi hisseden <b>sensörleri</b> var. Bunların hepsini az önce öğrendin! Sıradaki ünitede bu parçaların bir robotta nasıl çalıştığına bakacağız.'},
  {t:'match',q:'Robot parçasını görevle eşleştir.',pairs:[['Pil (akü)','Enerji saklar'],['Kablo','Elektriği taşır'],['Motor','Tekerleği döndürür'],['Sensör','Çevreyi hisseder']]},
  {t:'mc',q:'Robot önündeki duvarı görüp durdu. Hangi parça işe yaradı?',opts:['Mesafe sensörü','Tekerlek lastiği','Plastik kılıf'],a:0,tip:'Sensör duvarı hisseder. Robot da buna göre durur.'},
  {t:'order',q:'Robotun duvarın önünde durmasını sırala.',lines:true,plain:true,items:['Sensör duvarı görür','Robot karar verir','Motor durur']}
 ]}
],
 kupa:[
  {t:'mc',q:'Hangisi yalıtkandır?',opts:['Lastik','Bakır','Demir','Alüminyum folyo'],a:0},
  {t:'mc',q:'Kablonun içinde bakır, dışında plastik var. Hangisi iletken?',opts:['Bakır','Plastik','İkisi de','İkisi de değil'],a:0},
  {t:'mc',q:'Oyuncak helikopterin pervanesini ne döndürür?',opts:['Motor','Sensör','Plastik kılıf','Kablo'],a:0},
  {t:'mc',q:'Karanlık olunca kendiliğinden yanan sokak lambasında hangi parça vardır?',opts:['Işık sensörü','Pervane','Bakır çubuk','Tahta direk'],a:0,tip:'Işık sensörü ortamın karanlık olduğunu hisseder.'},
  {t:'order',q:'Elektriğin robotta yolunu sırala.',lines:true,plain:true,items:['Pil','Kablo','Motor','Tekerlek döner']},
  {t:'mc',q:'Bir kablonun plastik kılıfı soyulmuş. Neden tehlikeli?',opts:['Elektrik dışarı çıkıp zarar verebilir','Kablo daha parlak olur','Pil büyür','Tel renk değiştirir'],a:0}
 ]});
