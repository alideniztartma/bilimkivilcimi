/* #BilimKıvılcımı · Anka
   Antioch Rising'in yavru anka kuşu. Logodaki anka gibi küllerinden doğar:
   her hatadan sonra yeniden kalkar. Duygular: happy, cheer, wow, sad, wave, sleep, think, love, eat. */
'use strict';

const ANKA_NAME='Anka';

/* Giyilen aksesuarlar: boyun, yüz, baş sırasıyla çizilir. */
const ankaWorn=()=>{try{const w=(typeof S!=='undefined'&&S&&S.wear)||{};return ['neck','face','head'].map(k=>w[k]).filter(Boolean)}catch(e){return[]}};

/* cls: ek sınıflar. Örn. 'act-jump' ilk gösterimde bir kez zıplatır.
   Stil: Duolingo gibi "cel shading" — düz renk blokları, sert kenarlı açık (sol üst) ve koyu (sağ alt) şeritler, kontur yok.
   Katmanlar (yüz, yanak, göbek, aksesuar) anka3d.css'te --lx/--ly ile kayar; yüz ve göbek gövde siluetine kırpılır,
   böylece kafa dönerken yüz kürenin kenarından kaybolur. clipPath id'leri her çağrıda benzersizdir. */
let ankaSeq=0;
/* Mutlak komutlu (M C Q L Z) yolu kaydır / yatayda aynala (x -> 140-x) */
const akMv=(d,dx,dy)=>{let i=0;return d.replace(/-?\d*\.?\d+/g,n=>(+n+((i++)%2?dy:dx)).toString())};
const akMir=d=>{let i=0;return d.replace(/-?\d*\.?\d+/g,n=>((i++)%2?+n:140-n).toString())};
const AK_BODY='M70 22 C 103 22 121 40 122 70 C 123 96 126 118 118 130 C 110 140 94 142 70 142 C 46 142 30 140 22 130 C 14 118 17 96 18 70 C 19 40 37 22 70 22 Z';
const AK_BELLY='M70 98 C 92 98 105 110 104 123 C 103 134 89 139 70 139 C 51 139 37 134 36 123 C 35 110 48 98 70 98 Z';
const AK_MASK='M70 46 C 62 39 50 37 42 40 C 31 44 26 55 27 66 C 28 78 35 87 46 90 C 56 93 63 92 70 97 C 77 92 84 93 94 90 C 105 87 112 78 113 66 C 114 55 109 44 98 40 C 90 37 78 39 70 46 Z';
const AK_WING='M31 80 C 16 80 4 95 4 111 C 4 123 14 127 21 120 C 28 113 32 103 34 94 C 35 87 34 81 31 80 Z';
function anka(mood='happy',size=100,acc,cls){
  const A=new Set(acc===undefined?ankaWorn():acc==null?[]:Array.isArray(acc)?acc:[acc]);
  /* palet: gövde + açık ton + koyu ton; yüz maskesi daha açık; göz/mürekkep koyu gri */
  const body='#E58A2C',lite='#F4A851',shade='#C96A22',mask='#FAC57D',wing='#C2601E',dark='#A3461F',deep='#7A2E16',
        belly='#F7DDA6',bellyD='#EBC78C',tile='#EBC27A',tile2='#E3A65A',eye='#4B4B4B',bk='#FFB020',bkD='#E8901A',mouth='#8E2B22',tongue='#FF7F98',foot='#F0A020';
  const cheer=mood==='cheer',sad=mood==='sad',wow=mood==='wow',wave=mood==='wave',sleep=mood==='sleep',think=mood==='think',love=mood==='love',eat=mood==='eat';
  const W=140,H=150;
  const u='ak'+(++ankaSeq).toString(36)+'_',CB=`url(#${u}b)`,CY=`url(#${u}y)`;
  const defs=`<defs><clipPath id="${u}b"><path d="${AK_BODY}"/></clipPath><clipPath id="${u}y"><path d="${AK_BELLY}"/></clipPath></defs>`;
  /* kuyruk alevleri (arkada) */
  const tailL=`<path d="M40 116 C 26 123 13 120 7 107 C 17 112 27 110 36 103 Z" fill="${wing}"/><path d="M53 134 C 45 146 35 149 26 146 C 36 142 42 136 46 125 Z" fill="${lite}"/>`;
  const mirD=h=>h.replace(/d="([^"]+)"/g,(m,d)=>`d="${akMir(d)}"`);
  const tail=tailL+mirD(tailL);
  /* tepe tüyleri: üç alev */
  const crest=`<g class="crest"><path d="M60 31 C 49 27 43 17 46 8 C 52 15 59 18 66 25 Z" fill="${lite}"/><path d="${akMir('M60 31 C 49 27 43 17 46 8 C 52 15 59 18 66 25 Z')}" fill="#FFC24A"/><path d="M70 29 C 59 18 61 6 72 0 C 69 10 80 14 77 29 Z" fill="#D2601F"/></g>`;
  /* gövde: düz renk + sert kenarlı açık şerit (sol üst) + koyu şerit (sağ alt) */
  const bodyP=`<path d="${AK_BODY}" fill="${body}"/><g clip-path="${CB}"><path class="ak-gl" d="${AK_BODY} ${akMv(AK_BODY,5,6)}" fill="${lite}" fill-rule="evenodd"/><path d="${AK_BODY} ${akMv(AK_BODY,-5,-9)}" fill="${shade}" fill-rule="evenodd"/></g>`;
  /* göğüste mozaik taşları: büyük, sade */
  let tiles='';
  [[56.5,106,3],[52.25,114.5,4],[52.25,123,4],[56.5,131.5,3]].forEach(([x0,y,n],r)=>{for(let i=0;i<n;i++){const k=r*4+i;tiles+=`<rect x="${x0+i*8.5}" y="${y}" width="7" height="7" rx="1.8" fill="${k%5===2?tile2:tile}"/>`}});
  const bellyP=`<g clip-path="${CB}"><g class="ak-bly"><path d="${AK_BELLY}" fill="${belly}"/><path d="${AK_BELLY} ${akMv(AK_BELLY,0,-5)}" fill="${bellyD}" fill-rule="evenodd" clip-path="${CY}"/>${tiles}</g></g>`;
  /* kanatlar: kalın, yuvarlak uçlu, düz koyu ton */
  const wingL=`<path d="${AK_WING}" fill="${wing}"/><path d="M10 113 C 12 104 17 97 23 92" stroke="${dark}" stroke-width="3.2" fill="none" stroke-linecap="round" opacity=".5"/>`;
  const wingR=mirD(wingL);
  /* kalkık kanat: aynı kanat, omuz çevresinde yukarı döndürülmüş */
  const upWL=`<g transform="rotate(108 31 88)">${wingL}</g>`;
  const upWR=`<g transform="rotate(-108 109 88)">${wingR}</g>`;
  const wingsBack=`${cheer?'':`<g class="wg wgl">${wingL}</g>`}${(cheer||wave)?'':`<g class="wg wgr">${wingR}</g>`}`;
  const wingsFront=`${cheer?`<g class="wg wgl">${upWL}</g>`:''}${(cheer||wave)?`<g class="wg wgr">${upWR}</g>`:''}`;
  /* arka görünüş: yalnızca dönerken (act-spin/act-flip) görünür. CSS'siz çizimlerde gizli kalsın diye opacity="0". */
  const back=`<g class="ak-bk" opacity="0"><path d="M70 116 C 58 126 44 134 30 146 C 46 147 60 141 70 132 C 80 141 94 147 110 146 C 96 134 82 126 70 116 Z" fill="${wing}"/><path d="M70 120 C 63 130 61 141 65 150 C 68 145 72 145 75 150 C 79 141 77 130 70 120 Z" fill="${lite}"/></g>`;
  /* yüz maskesi + gözler */
  let eyes=`<path d="${AK_MASK}" fill="${mask}"/>`;
  if(love){
    eyes+=[52,88].map(cx=>`<path class="hrt" d="M${cx} 79 C ${cx-21} 66 ${cx-18} 47 ${cx-8} 49 C ${cx-3} 50 ${cx} 54 ${cx} 57 C ${cx} 54 ${cx+3} 50 ${cx+8} 49 C ${cx+18} 47 ${cx+21} 66 ${cx} 79 Z" fill="#FF4B4B"/><path d="M${cx} 79 C ${cx+10} 72 ${cx+17} 64 ${cx+16} 57 C ${cx+14} 66 ${cx+8} 72 ${cx} 76 Z" fill="#E03B3B"/><circle cx="${cx-8}" cy="57" r="3.4" fill="#fff"/>`).join('');
  }else if(cheer||sleep||eat){
    const d=sleep?'M39 64 Q52 73 65 64 M75 64 Q88 73 101 64':'M39 69 Q52 54 65 69 M75 69 Q88 54 101 69';
    eyes+=`<path d="${d}" stroke="${eye}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
  }else{
    const pr=wow?5.6:8.2,py=sad?69:think?59:65,px=think?3:2,ey=wow?17.5:16.5;
    eyes+=[52,88].map(cx=>`<ellipse cx="${cx}" cy="64" rx="${ey-1}" ry="${ey}" fill="#fff"/><g class="pup"><circle cx="${cx+px}" cy="${py}" r="${pr}" fill="${eye}"/><circle cx="${cx+px+(wow?2:3.2)}" cy="${py-(wow?2:3.2)}" r="${wow?2.2:3.3}" fill="#fff"/></g><ellipse class="lid" cx="${cx}" cy="64" rx="${ey}" ry="${ey+1}" fill="${mask}"/>`).join('');
    /* göz kapağı kesiği: üzgün (dış uçlar aşağı), düşünceli (biraz kısık) */
    if(sad){const c='M34 53 C 36 44 46 39 54 40 C 62 41 68 44 71 47 L71 52 L34 62 Z';eyes+=`<path d="${c}" fill="${mask}"/><path d="${akMir(c)}" fill="${mask}"/>`}
    if(think)eyes+=`<path d="M35 52 C 37 44 46 39 54 40 C 62 41 68 44 70 47 L70 52 Z" fill="${mask}"/>`;
  }
  let brows='';
  if(sad)brows=`<path d="M39 47 L60 41 M101 47 L80 41" stroke="${deep}" stroke-width="4.5" stroke-linecap="round"/>`;
  if(wow)brows=`<path d="M38 39 Q50 31 62 37 M78 37 Q90 31 102 39" stroke="${deep}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  if(think)brows=`<path d="M40 45 L62 43 M78 39 Q90 33 100 39" stroke="${deep}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  /* gaga: üst açık sarı-turuncu, alt koyu; neşeliyken ağız açık, pembe dil */
  const upper=y=>`<path d="M59 ${y} C 63 ${y-4} 77 ${y-4} 81 ${y} C 79 ${y+5} 74 ${y+8} 70 ${y+8} C 66 ${y+8} 61 ${y+5} 59 ${y} Z" fill="${bk}"/><ellipse cx="65.5" cy="${y-1}" rx="3.6" ry="1.4" fill="#FFD36B"/>`;
  let beakP;
  if(cheer)beakP=`<path d="M60 86 C 61 103 79 103 80 86 Z" fill="${bkD}"/><path d="M62.5 87 C 64 99 76 99 77.5 87 Z" fill="${mouth}"/><path d="M64.5 95 Q70 90 75.5 95 Q70 99.5 64.5 95 Z" fill="${tongue}"/>${upper(81)}`;
  else if(wow)beakP=`<ellipse cx="70" cy="93" rx="7.5" ry="6.8" fill="${bkD}"/><ellipse cx="70" cy="93" rx="5.2" ry="4.8" fill="${mouth}"/><ellipse cx="70" cy="95.6" rx="3" ry="1.8" fill="${tongue}"/>${upper(81)}`;
  else if(eat)beakP=`<g class="chew"><path d="M61 86 C 62 97 78 97 79 86 Z" fill="${bkD}"/><path d="M64 87 C 65 93 75 93 76 87 Z" fill="${mouth}"/></g>${upper(81)}`;
  else beakP=`<path d="M59 82 C 63 78 77 78 81 82 C 80 89 75 95 70 97 C 65 95 60 89 59 82 Z" fill="${bk}"/><path d="M61 88 C 64 93 67 96 70 97 C 73 96 76 93 79 88 C 75 90.5 65 90.5 61 88 Z" fill="${bkD}"/><ellipse cx="65.5" cy="81.6" rx="3.6" ry="1.4" fill="#FFD36B"/>`;
  const cr=love||eat?7.5:6,cy2=love||eat?5:4;
  const cheeks=`<g class="ak-chk"><ellipse cx="39" cy="83" rx="${cr}" ry="${cy2}" fill="#F7826A" opacity="${love||eat?.85:.6}"/><ellipse cx="101" cy="83" rx="${cr}" ry="${cy2}" fill="#F7826A" opacity="${love||eat?.85:.6}"/></g>`;
  /* ayaklar: yuvarlak parmaklı turuncu */
  const ft=x=>`<ellipse cx="${x}" cy="142.6" rx="7" ry="3.6" fill="${bkD}"/><circle cx="${x-5.6}" cy="145.2" r="3.4" fill="${foot}"/><circle cx="${x}" cy="146.2" r="3.6" fill="${foot}"/><circle cx="${x+5.6}" cy="145.2" r="3.4" fill="${foot}"/>`;
  const feet=ft(54)+ft(86);
  let extra='';
  if(sad)extra=`<path class="tear" d="M37 76 C 34 82 33 86 37 88 C 41 86 40 82 37 76 Z" fill="#7CC8F0"/>`;
  if(sleep)extra=`<g class="zz"><text x="104" y="30" font-family="JetBrains Mono,monospace" font-weight="700" font-size="16" fill="${deep}">z</text><text x="116" y="18" font-family="JetBrains Mono,monospace" font-weight="700" font-size="12" fill="${deep}">z</text></g>`;
  if(think)extra=`<circle class="thd" cx="112" cy="30" r="4" fill="${dark}" opacity=".5"/><circle class="thd thd2" cx="122" cy="18" r="6" fill="${dark}" opacity=".5"/>`;
  /* aksesuarlar (mağaza): düz renk, konturusuz; boyun / yüz / baş ayrı katman */
  let an='',af='',ah='';
  if(A.has('atki'))an+=`<path d="M21 100 Q70 122 119 100 L121 114 Q70 137 19 114 Z" fill="#C2412D"/><path d="M20 108 Q70 130 120 108 L121 114 Q70 137 19 114 Z" fill="#9E3222"/><path d="M38 108 Q70 123 102 108" stroke="#4B5A3A" stroke-width="4" fill="none"/><path d="M90 113 L101 141 L87 144 L80 116 Z" fill="#C2412D"/><path d="M95 127 L101 141 L94 143 Z" fill="#9E3222"/><path d="M86 125 L96 123 M88 132 L98 130" stroke="#4B5A3A" stroke-width="3"/>`;
  if(A.has('papyon'))an+=`<path d="M70 106 L51 95 L51 117 Z M70 106 L89 95 L89 117 Z" fill="#E0412F"/><path d="M70 106 L51 111 L51 117 Z M70 106 L89 111 L89 117 Z" fill="#B23224"/><rect x="64.5" y="99.5" width="11" height="13" rx="4" fill="#B23224"/><circle cx="57" cy="103" r="2" fill="#FFE7C2"/><circle cx="83" cy="103" r="2" fill="#FFE7C2"/>`;
  if(A.has('gozluk'))af+=`<g fill="rgba(255,255,255,.2)" stroke="${eye}" stroke-width="3.6"><circle cx="52" cy="64" r="18.5"/><circle cx="88" cy="64" r="18.5"/></g><path d="M68 61 Q70 58 72 61" stroke="${eye}" stroke-width="3.6" fill="none"/><path d="M40 55 Q44 50 50 49 M76 55 Q80 50 86 49" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".7"/>`;
  if(A.has('gunes'))af+=`<rect x="32" y="52" width="36" height="25" rx="11" fill="${eye}"/><rect x="72" y="52" width="36" height="25" rx="11" fill="${eye}"/><path d="M32 66 Q50 80 68 66 L68 66 Q66 77 57 77 L43 77 Q34 77 32 66 Z M72 66 Q90 80 108 66 Q106 77 97 77 L83 77 Q74 77 72 66 Z" fill="#333"/><path d="M67 58 Q70 54 73 58" stroke="${eye}" stroke-width="3.6" fill="none"/><path d="M38 59 L47 57 M78 59 L87 57" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".75"/><path d="M33 58 L21 54 M107 58 L119 54" stroke="${eye}" stroke-width="3.6" stroke-linecap="round"/>`;
  if(A.has('baret'))ah+=`<path d="M31 40 Q70 -8 109 40 Z" fill="#FFB020"/><path d="M70 9 Q95 14 109 40 L86 40 Q84 20 70 9 Z" fill="#E8901A"/><path d="M42 33 Q48 20 58 14" stroke="#FFE08A" stroke-width="3.4" fill="none" stroke-linecap="round"/><rect x="66.5" y="9" width="7" height="31" rx="3" fill="#E8901A"/><rect x="25" y="36" width="90" height="11" rx="5.5" fill="#E8901A"/><rect x="25" y="42" width="90" height="5" rx="2.5" fill="#C8711A"/>`;
  if(A.has('tac'))ah+=`<path d="M43 35 L49 9 L60 23 L70 3 L80 23 L91 9 L97 35 Z" fill="#FFC83D"/><path d="M43 35 L97 35 L95 28 L45 28 Z" fill="#E8A82A"/><circle cx="49" cy="9" r="3.4" fill="#FFC83D"/><circle cx="70" cy="3" r="3.6" fill="#FFC83D"/><circle cx="91" cy="9" r="3.4" fill="#FFC83D"/><rect x="66" y="16" width="8" height="8" rx="1.6" transform="rotate(45 70 20)" fill="#FF4B4B"/><path d="M50 26 L53 15" stroke="#FFE9A6" stroke-width="2.4" stroke-linecap="round"/>`;
  if(A.has('zeytin'))ah+=`<g fill="#6A8A3A"><ellipse cx="34" cy="44" rx="12" ry="5.4" transform="rotate(-40 34 44)"/><ellipse cx="46" cy="32" rx="12" ry="5.4" transform="rotate(-20 46 32)"/><ellipse cx="94" cy="32" rx="12" ry="5.4" transform="rotate(20 94 32)"/><ellipse cx="106" cy="44" rx="12" ry="5.4" transform="rotate(40 106 44)"/></g><g fill="#4B5A3A"><ellipse cx="36" cy="46" rx="9" ry="2.4" transform="rotate(-40 36 46)"/><ellipse cx="104" cy="46" rx="9" ry="2.4" transform="rotate(40 104 46)"/></g><circle cx="40" cy="38" r="3.4" fill="#3A4A28"/><circle cx="100" cy="38" r="3.4" fill="#3A4A28"/>`;
  if(A.has('kep'))ah+=`<path d="M48 30 V42 Q70 52 92 42 V30 Z" fill="#3A3A3A"/><path d="M26 26 L70 10 L114 26 L70 42 Z" fill="${eye}"/><path d="M26 26 L70 42 L114 26 L114 29 L70 45 L26 29 Z" fill="#333"/><path d="M70 26 L104 32 L106 54" stroke="#FFB020" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M101 52 L106 65 L111 52 Z" fill="#FFB020"/><circle cx="70" cy="26" r="3.8" fill="#FFB020"/>`;
  /* yüz aksesuarı gövde siluetine kırpılır (kafa dönerken yüzle birlikte kenardan kaybolur) */
  const a=(an?`<g class="ak-acn">${an}</g>`:'')+(ah?`<g class="ak-ach">${ah}</g>`:''),acf=af?`<g class="ak-acf">${af}</g>`:'';
  const d=-(Math.random()*7).toFixed(2);
  return `<svg class="anka ${mood}${cls?' '+cls:''}" style="--ad:${d}s" width="${size}" height="${Math.round(size*(H+10)/(W+20))}" viewBox="-10 -6 ${W+20} ${H+10}" aria-hidden="true">${defs}<ellipse class="ak-shd" cx="70" cy="148" rx="42" ry="5.6" fill="#2F2E24" fill-opacity=".22"/><g class="ak-all"><g class="ak-tail">${tail}</g><g class="ak-bd">${crest}${bodyP}${bellyP}${back}${wingsBack}${wingsFront}<g clip-path="${CB}"><g class="ak-face">${eyes}${brows}${beakP}</g>${cheeks}${acf}</g>${a}</g>${feet}${extra}</g></svg>`;
}

/* Anka'nın sözleri */
const ANKA={
  hello:['Merhaba! Hazır mısın?','Hadi biraz kod yazalım!','Bugün neler öğreneceğiz?','Kanatlarımı açtım, başlayalım!'],
  ok:['Harika!','Süpersin!','Aynen öyle!','Mükemmel!','Ateş gibisin!','Bravo!','Çok iyi!','İşte bu!'],
  bad:['Sorun değil, tekrar deneriz.','Anka kuşları hep yeniden kalkar!','Hata yapmak öğrenmenin parçası.','Bir dahakine olacak!','Az kaldı, pes etmek yok!'],
  combo3:'3 doğru üst üste! Alev aldın!',combo5:'5 doğru üst üste! Durdurulamıyorsun!',combo8:'8 doğru! Gerçek bir anka gibi uçuyorsun!',
  path:['Sıradaki ders seni bekliyor!','Hadi, bir ders daha!','Kıvılcımı büyütelim!','Birlikte yükselelim!','Bunu yapabilirsin!'],
  lab:['Önce tahmin et, sonra dene. Bilim insanları böyle çalışır!','Deney yaparken hata diye bir şey yok, sadece yeni bilgi var.','Ölçümünü kaydetmeyi unutma!'],
  quit:'Gitme! Kıvılcımımız sönmesin.'
};
const pickL=a=>a[Math.random()*a.length|0];

/* ================= HAREKETLER =================
   Anka'ya dokununca ya da bir şey olunca kısa bir hareket yapar (Duolingo'daki Duo gibi). */
const ANKA_ACTS=['jump','spin','wiggle','dance','nod','shake','enter','flip'];
function ankaAct(el,name){
  if(!el||(typeof reduce!=='undefined'&&reduce))return;
  ANKA_ACTS.forEach(a=>el.classList.remove('act-'+a));
  [...el.classList].forEach(c=>{if(c.startsWith('mi-'))el.classList.remove(c)});void el.getBoundingClientRect();
  el.classList.add('act-'+name);clearTimeout(el._akT);el._akT=setTimeout(()=>el.classList.remove('act-'+name),2600);
}
const ANKA_TAP=['Hey, gıdıklanıyorum!','Uçmaya hazırım!','Bir ders daha yapalım mı?','Kanatlarım ısındı!','Kıvılcım gibiyim!','Beni seçtiğin için teşekkürler!','Hadi öğrenelim!'];
document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('svg.anka');if(!a)return;
  const n=pick(['jump','spin','wiggle','dance','nod','flip']);ankaAct(a,n);
  if(typeof sfx!=='undefined'&&sfx.chirp)sfx.chirp();
  const bb=a.parentElement&&a.parentElement.querySelector('.bb');if(bb)bb.textContent=pickL(ANKA_TAP);
  if(typeof openNestFrom==='function')openNestFrom(a);
});
