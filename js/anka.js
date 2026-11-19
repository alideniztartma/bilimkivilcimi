/* #BilimKıvılcımı · Anka
   Antioch Rising'in yavru anka kuşu. Logodaki anka gibi küllerinden doğar:
   her hatadan sonra yeniden kalkar. Duygular: happy, cheer, wow, sad, wave, sleep, think, love, eat. */
'use strict';

const ANKA_NAME='Anka';

/* Giyilen aksesuarlar: boyun, yüz, baş sırasıyla çizilir. */
const ankaWorn=()=>{try{const w=(typeof S!=='undefined'&&S&&S.wear)||{};return ['neck','face','head'].map(k=>w[k]).filter(Boolean)}catch(e){return[]}};

/* cls: ek sınıflar. Örn. 'act-jump' ilk gösterimde bir kez zıplatır.
   2.5D: gradyanlarla hacim (ışık sol üstten), yer gölgesi (.ak-shd), parçalar katmanlı (yüz, yanak, göbek, aksesuar)
   böylece anka3d.css --lx/--ly ile kafayı gerçekten döndürüyormuş gibi kaydırır. Gradyan id'leri her çağrıda benzersizdir. */
let ankaSeq=0;
function anka(mood='happy',size=100,acc,cls){
  const A=new Set(acc===undefined?ankaWorn():acc==null?[]:Array.isArray(acc)?acc:[acc]);
  const ink='#2F2E24',body='#E58A2C',dark='#A3461F',deep='#7A2E16',belly='#F7DDA6',tile='#EBC27A',beak='#8E2B22';
  const cheer=mood==='cheer',sad=mood==='sad',wow=mood==='wow',wave=mood==='wave',sleep=mood==='sleep',think=mood==='think',love=mood==='love',eat=mood==='eat';
  const W=140,H=150;
  const u='ak'+(++ankaSeq).toString(36)+'_',U=k=>`url(#${u}${k})`;
  const st=(o,c,a)=>`<stop offset="${o}" stop-color="${c}"${a!=null?` stop-opacity="${a}"`:''}/>`;
  const lin=(k,x1,y1,x2,y2,stops)=>`<linearGradient id="${u}${k}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops}</linearGradient>`;
  const rad=(k,cx,cy,r,stops,us)=>`<radialGradient id="${u}${k}" cx="${cx}" cy="${cy}" r="${r}"${us?' gradientUnits="userSpaceOnUse"':''}>${stops}</radialGradient>`;
  const defs=`<defs>${rad('b',50,46,96,st(0,'#F7B868')+st(.3,'#EC983C')+st(.58,body)+st(.84,'#CC6C28')+st(1,'#B0522A'),1)}
    ${rad('y',.42,.28,.85,st(0,'#FFF4DA')+st(.5,belly)+st(1,'#E5BE82'))}
    ${lin('w',0,0,.35,1,st(0,'#C65D2A')+st(.5,dark)+st(1,'#80321A'))}
    ${lin('l',0,0,0,1,st(0,'#F09D44')+st(1,'#CF7328'))}
    ${rad('e',.42,.36,.7,st(0,'#FFFFFF')+st(.62,'#FFFDF8')+st(1,'#E4D9C8'))}
    ${rad('p',.38,.32,.75,st(0,'#56523F')+st(.55,ink)+st(1,'#1A1913'))}
    ${lin('k',0,0,0,1,st(0,'#C9493B')+st(.5,beak)+st(1,'#681C17'))}
    ${lin('c1',0,1,0,0,st(0,'#C26826')+st(1,'#F0A848'))}
    ${lin('c2',0,1,0,0,st(0,'#E39A3E')+st(1,'#FFD889'))}
    ${lin('c3',0,1,0,0,st(0,'#86331A')+st(1,'#CC6230'))}
    ${rad('c',.5,.5,.5,st(0,'#E8776A',1)+st(.55,'#E8776A',.75)+st(1,'#E8776A',0))}
    ${rad('g',.5,.5,.5,st(0,'#FFFFFF',.75)+st(1,'#FFFFFF',0))}
    ${rad('s',.5,.5,.5,st(0,ink,.34)+st(.6,ink,.16)+st(1,ink,0))}</defs>`;
  /* kuyruk alevleri (arkada) */
  const tail=`<path d="M46 126 C 26 134 12 126 8 110 C 18 118 30 116 40 108 Z" fill="${U('c3')}"/>
    <path d="M94 126 C 114 134 128 126 132 110 C 122 118 110 116 100 108 Z" fill="${U('c3')}"/>
    <path d="M58 134 C 50 146 38 149 28 145 C 38 141 44 134 48 124 Z" fill="${U('c1')}"/>
    <path d="M82 134 C 90 146 102 149 112 145 C 102 141 96 134 92 124 Z" fill="${U('c1')}"/>`;
  /* tepe tüyleri: alev gibi */
  const crest=`<g class="crest"><path d="M61 33 C 48 27 43 16 47 7 C 52 17 60 20 67 28 Z" fill="${U('c1')}"/>
    <path d="M79 33 C 92 27 97 16 93 7 C 88 17 80 20 73 28 Z" fill="${U('c2')}"/>
    <path d="M70 30 C 59 18 61 6 72 0 C 69 11 80 15 77 30 Z" fill="${U('c3')}"/><path d="M68.5 24 C 64 17 65 10 69.5 5" stroke="#F2B451" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".55"/></g>`;
  const bodyP=`<path d="M70 24 C 108 24 124 52 124 86 C 124 120 102 140 70 140 C 38 140 16 120 16 86 C 16 52 32 24 70 24 Z" fill="${U('b')}"/>
    <path d="M28 112 C 36 130 52 140 70 140 C 88 140 104 130 112 112 C 100 124 86 130 70 130 C 54 130 40 124 28 112 Z" fill="${dark}" opacity=".22"/>
    <path d="M30 52 C 38 38 52 30 66 29" stroke="#FFE2B0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"/>
    <ellipse class="ak-gl" cx="41" cy="45" rx="15" ry="8.5" transform="rotate(-38 41 45)" fill="${U('g')}"/>`;
  /* göğüste mozaik taşları */
  let tiles='';
  [[60,104],[67,104],[74,104],[56,111],[63,111],[70,111],[77,111],[52,118],[59,118],[66,118],[73,118],[80,118],[56,125],[63,125],[70,125],[77,125],[62,132],[69,132]]
    .forEach(([x,y],i)=>{tiles+=`<rect x="${x}" y="${y}" width="5.4" height="5.4" rx=".8" fill="${i%5===2?'#E58A2C':tile}" opacity="${i%5===2?.55:.9}"/>`});
  const bellyP=`<g class="ak-bly"><path d="M70 94 C 92 94 102 108 100 123 C 98 134 86 140 70 140 C 54 140 42 134 40 123 C 38 108 48 94 70 94 Z" fill="${U('y')}"/>${tiles}<ellipse cx="60" cy="102" rx="10" ry="4.5" transform="rotate(-14 60 102)" fill="${U('g')}" opacity=".7"/><path d="M42 126 C 46 135 56 140 70 140 C 84 140 94 135 98 126 C 92 132 82 135 70 135 C 58 135 48 132 42 126 Z" fill="#C98F4E" opacity=".28"/></g>`;
  /* kanatlar: dış g pozisyon, iç g animasyon */
  const wingL=`<path d="M24 82 C 6 88 2 112 12 126 C 17 113 25 104 33 97 C 31 90 28 85 24 82 Z" fill="${U('w')}"/><path d="M12 126 C 10 116 13 107 18 100 M18 124 C 18 116 21 109 25 104" stroke="#F2B451" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const wingR=`<path d="M116 82 C 134 88 138 112 128 126 C 123 113 115 104 107 97 C 109 90 112 85 116 82 Z" fill="${U('w')}"/><path d="M128 126 C 130 116 127 107 122 100 M122 124 C 122 116 119 109 115 104" stroke="#F2B451" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const upWL=`<path d="M40 90 C 24 93 4 82 -6 56 C 4 63 13 63 20 59 C 11 51 9 42 11 33 C 22 48 33 62 44 75 Z" fill="${U('w')}"/><path d="M-6 56 C 6 70 18 76 30 79 M11 33 C 16 48 24 60 34 68" stroke="#F2B451" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const upWR=`<path d="M100 90 C 116 93 136 82 146 56 C 136 63 127 63 120 59 C 129 51 131 42 129 33 C 118 48 107 62 96 75 Z" fill="${U('w')}"/><path d="M146 56 C 134 70 122 76 110 79 M129 33 C 124 48 116 60 106 68" stroke="#F2B451" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const wingsBack=`${cheer?'':`<g class="wg wgl">${wingL}</g>`}${(cheer||wave)?'':`<g class="wg wgr">${wingR}</g>`}`;
  const wingsFront=`${cheer?`<g class="wg wgl">${upWL}</g>`:''}${(cheer||wave)?`<g class="wg wgr">${upWR}</g>`:''}`;
  /* arka görünüş: yalnızca dönerken (act-spin/act-flip) görünür. CSS'siz çizimlerde gizli kalsın diye opacity="0". */
  const back=`<g class="ak-bk" opacity="0"><path d="M70 30 C 84 34 92 44 94 56 C 86 48 78 44 70 44 C 62 44 54 48 46 56 C 48 44 56 34 70 30 Z" fill="${dark}" opacity=".35"/>
    ${cheer?'':wingL}${(cheer||wave)?'':wingR}
    <path d="M70 116 C 58 126 44 134 30 146 C 46 147 60 141 70 132 C 80 141 94 147 110 146 C 96 134 82 126 70 116 Z" fill="${U('c3')}"/><path d="M70 120 C 63 130 61 141 65 150 C 68 145 72 145 75 150 C 79 141 77 130 70 120 Z" fill="${U('c2')}"/></g>`;
  /* gözler */
  let eyes;
  if(love){
    eyes=[54,86].map(cx=>`<path class="hrt" d="M${cx} 80 C ${cx-20} 66 ${cx-17} 48 ${cx-7} 50 C ${cx-3} 51 ${cx} 55 ${cx} 58 C ${cx} 55 ${cx+3} 51 ${cx+7} 50 C ${cx+17} 48 ${cx+20} 66 ${cx} 80 Z" fill="#C2412D" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="${cx-6}" cy="58" r="3" fill="#fff" opacity=".8"/><circle cx="${cx-9}" cy="63" r="1.4" fill="#fff" opacity=".6"/>`).join('');
  }else if(cheer||sleep||eat){
    const d=sleep?'M42 68 Q54 76 66 68 M74 68 Q86 76 98 68':'M41 70 Q54 55 67 70 M73 70 Q86 55 99 70';
    eyes=`<path d="${d}" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  }else{
    const pr=wow?6:8,py=sad?72:think?62:68,px=think?3:2;
    eyes=[54,86].map(cx=>`<ellipse cx="${cx}" cy="66" rx="16" ry="17.5" fill="${U('e')}"/><g class="pup"><circle cx="${cx+px}" cy="${py}" r="${pr}" fill="${U('p')}"/><circle cx="${cx+px+3}" cy="${py-3}" r="2.6" fill="#fff"/><circle cx="${cx+px-2.6}" cy="${py+3}" r="1.2" fill="#fff" opacity=".7"/></g><ellipse class="lid" cx="${cx}" cy="66" rx="17" ry="18.5" fill="${U('l')}"/>`).join('');
    if(sad)eyes+=`<path d="M37 56 C 44 50 56 47 66 49 L66 54 C 56 52 45 55 37 60 Z" fill="${U('b')}"/><path d="M103 56 C 96 50 84 47 74 49 L74 54 C 84 52 95 55 103 60 Z" fill="${U('b')}"/>`;
  }
  let brows='';
  if(sad)brows=`<path d="M40 50 L62 43 M100 50 L78 43" stroke="${deep}" stroke-width="4" stroke-linecap="round"/>`;
  if(wow)brows=`<path d="M40 42 Q52 34 64 40 M76 40 Q88 34 100 42" stroke="${deep}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(think)brows=`<path d="M42 46 L62 44 M78 42 Q90 36 100 42" stroke="${deep}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  /* gaga (hacim: üstten ışık, altta gölge) */
  const bk=U('k'),shine=`<path d="M64.5 84.6 L71 84.6" stroke="#fff" stroke-opacity=".45" stroke-width="1.5" stroke-linecap="round"/>`;
  let beakP;
  if(cheer)beakP=`<path d="M60 82 L80 82 L70 90 Z" fill="${bk}"/><path d="M62 90 Q70 106 78 90 Z" fill="#5C1A14"/><path d="M65 96 Q70 100 75 96 Q70 103 65 96 Z" fill="#E8776A"/><path d="M63.5 83.4 L70 83.4" stroke="#fff" stroke-opacity=".45" stroke-width="1.4" stroke-linecap="round"/>`;
  else if(wow)beakP=`<path d="M61 82 L79 82 L70 89 Z" fill="${bk}"/><ellipse cx="70" cy="92" rx="6" ry="4" fill="#5C1A14"/><path d="M64 94 L76 94 L70 101 Z" fill="${bk}"/><path d="M64.5 83.4 L70 83.4" stroke="#fff" stroke-opacity=".45" stroke-width="1.4" stroke-linecap="round"/>`;
  else if(eat)beakP=`<path d="M60 80 L80 80 L70 88 Z" fill="${bk}"/><g class="chew"><path d="M62 88 L78 88 L70 99 Z" fill="#5C1A14"/><path d="M63 88 L77 88 L70 92 Z" fill="${beak}"/></g>`;
  else beakP=`<path d="M61 83 L79 83 L70 96 Z" fill="${bk}"/><path d="M61 83 L79 83 L70 87 Z" fill="#B23A2A"/>${shine}<path d="M70 96 L73.5 91" stroke="#5C1A14" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>`;
  const cr=love||eat?11:9,cy2=love||eat?7.5:6;
  const cheeks=`<g class="ak-chk"><ellipse cx="34" cy="88" rx="${cr}" ry="${cy2}" fill="${U('c')}" opacity="${love||eat?.95:.75}"/><ellipse cx="106" cy="88" rx="${cr}" ry="${cy2}" fill="${U('c')}" opacity="${love||eat?.95:.75}"/></g>`;
  const feet=`<path d="M57 139 l-6 7 M57 139 v8 M57 139 l6 7 M83 139 l-6 7 M83 139 v8 M83 139 l6 7" stroke="${deep}" stroke-width="3.6" stroke-linecap="round"/>`;
  let extra='';
  if(sad)extra=`<path class="tear" d="M38 80 C 35 86 34 90 38 92 C 42 90 41 86 38 80 Z" fill="#8FC1D9"/>`;
  if(sleep)extra=`<g class="zz"><text x="104" y="30" font-family="JetBrains Mono,monospace" font-weight="700" font-size="16" fill="${deep}">z</text><text x="116" y="18" font-family="JetBrains Mono,monospace" font-weight="700" font-size="12" fill="${deep}">z</text></g>`;
  if(think)extra=`<circle class="thd" cx="112" cy="30" r="4" fill="${dark}" opacity=".5"/><circle class="thd thd2" cx="122" cy="18" r="6" fill="${dark}" opacity=".5"/>`;
  /* aksesuarlar (mağaza): boyun / yüz / baş ayrı katman (kafa dönerken farklı kayarlar) */
  let an='',af='',ah='';
  /* boyun */
  if(A.has('atki'))an+=`<path d="M24 100 Q70 120 116 100 L118 113 Q70 134 22 113 Z" fill="#A3461F" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M40 108 Q70 122 100 108" stroke="#4B5A3A" stroke-width="4" fill="none"/><path d="M90 112 L100 140 L86 143 L80 115 Z" fill="#A3461F" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M86 125 L96 123 M88 132 L98 130" stroke="#4B5A3A" stroke-width="3"/>`;
  if(A.has('papyon'))an+=`<path d="M70 104 L52 94 L52 114 Z M70 104 L88 94 L88 114 Z" fill="#8E2B22" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/><rect x="65" y="98" width="10" height="12" rx="3" fill="#B23A2A" stroke="${ink}" stroke-width="2.5"/><circle cx="58" cy="104" r="1.8" fill="#F7DDA6"/><circle cx="82" cy="104" r="1.8" fill="#F7DDA6"/>`;
  /* yüz */
  if(A.has('gozluk'))af+=`<g fill="rgba(255,255,255,.18)" stroke="${ink}" stroke-width="3.5"><circle cx="54" cy="66" r="19"/><circle cx="86" cy="66" r="19"/></g><path d="M66 64 Q70 60 74 64" stroke="${ink}" stroke-width="3.5" fill="none"/><path d="M42 56 Q46 51 52 50 M74 56 Q78 51 84 50" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".55"/>`;
  if(A.has('gunes'))af+=`<rect x="34" y="54" width="34" height="24" rx="10" fill="#2F2E24" stroke="${ink}" stroke-width="3"/><rect x="72" y="54" width="34" height="24" rx="10" fill="#2F2E24" stroke="${ink}" stroke-width="3"/><path d="M68 60 Q70 56 72 60" stroke="${ink}" stroke-width="3.5" fill="none"/><path d="M40 60 L48 58 M78 60 L86 58" stroke="#F7DDA6" stroke-width="3" stroke-linecap="round" opacity=".8"/><path d="M34 60 L22 56 M106 60 L118 56" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/>`;
  /* baş */
  if(A.has('baret'))ah+=`<path d="M32 40 Q70 -8 108 40 Z" fill="#D9822B" stroke="${ink}" stroke-width="3"/><path d="M70 9 V40" stroke="#A3461F" stroke-width="5"/><rect x="26" y="36" width="88" height="10" rx="3" fill="#A3461F" stroke="${ink}" stroke-width="3"/><path d="M42 33 Q48 20 58 14" stroke="#FFE2B0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>`;
  if(A.has('tac'))ah+=`<path d="M44 34 L50 10 L60 24 L70 4 L80 24 L90 10 L96 34 Z" fill="#E8C35A" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/><path d="M48 31 L52 16" stroke="#FFF1B8" stroke-width="2.2" stroke-linecap="round" opacity=".8"/><rect x="66" y="21" width="8" height="8" transform="rotate(45 70 25)" fill="#8E2B22"/>`;
  if(A.has('zeytin'))ah+=`<g fill="#4B5A3A" stroke="${ink}" stroke-width="1.4"><ellipse cx="34" cy="44" rx="12" ry="5" transform="rotate(-40 34 44)"/><ellipse cx="46" cy="32" rx="12" ry="5" transform="rotate(-20 46 32)"/><ellipse cx="94" cy="32" rx="12" ry="5" transform="rotate(20 94 32)"/><ellipse cx="106" cy="44" rx="12" ry="5" transform="rotate(40 106 44)"/></g><circle cx="40" cy="38" r="3" fill="#2F3A28"/><circle cx="100" cy="38" r="3" fill="#2F3A28"/>`;
  if(A.has('kep'))ah+=`<path d="M48 30 V42 Q70 52 92 42 V30 Z" fill="#3A382C" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/><path d="M26 26 L70 10 L114 26 L70 42 Z" fill="#2F2E24" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/><path d="M70 26 L104 32 L106 54" stroke="#D9822B" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M101 52 L106 64 L111 52 Z" fill="#D9822B"/><circle cx="70" cy="26" r="3.5" fill="#D9822B"/>`;
  const a=(an?`<g class="ak-acn">${an}</g>`:'')+(af?`<g class="ak-acf">${af}</g>`:'')+(ah?`<g class="ak-ach">${ah}</g>`:'');
  const d=-(Math.random()*7).toFixed(2);
  return `<svg class="anka ${mood}${cls?' '+cls:''}" style="--ad:${d}s" width="${size}" height="${Math.round(size*(H+10)/(W+20))}" viewBox="-10 -6 ${W+20} ${H+10}" aria-hidden="true">${defs}<ellipse class="ak-shd" cx="70" cy="147.6" rx="40" ry="5.4" fill="${U('s')}"/><g class="ak-all"><g class="ak-tail">${tail}</g><g class="ak-bd">${wingsBack}${crest}${bodyP}${bellyP}${back}${wingsFront}${cheeks}<g class="ak-face">${eyes}${brows}${beakP}</g>${a}</g>${feet}${extra}</g></svg>`;
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
