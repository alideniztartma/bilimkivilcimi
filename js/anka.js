/* #BilimKıvılcımı · Anka
   Antioch Rising'in yavru anka kuşu. Logodaki anka gibi küllerinden doğar:
   her hatadan sonra yeniden kalkar. Duygular: happy, cheer, wow, sad, wave, sleep, think. */
'use strict';

const ANKA_NAME='Anka';

/* cls: ek sınıflar. Örn. 'act-jump' ilk gösterimde bir kez zıplatır. */
function anka(mood='happy',size=100,acc,cls){
  if(acc===undefined)acc=(typeof S!=='undefined'&&S&&S.equip)||null;
  const ink='#2F2E24',body='#E58A2C',dark='#A3461F',deep='#7A2E16',belly='#F7DDA6',tile='#EBC27A',beak='#8E2B22';
  const cheer=mood==='cheer',sad=mood==='sad',wow=mood==='wow',wave=mood==='wave',sleep=mood==='sleep',think=mood==='think';
  const W=140,H=150;
  /* kuyruk alevleri (arkada) */
  const tail=`<path d="M46 126 C 26 134 12 126 8 110 C 18 118 30 116 40 108 Z" fill="${dark}"/>
    <path d="M94 126 C 114 134 128 126 132 110 C 122 118 110 116 100 108 Z" fill="${dark}"/>
    <path d="M58 134 C 50 146 38 149 28 145 C 38 141 44 134 48 124 Z" fill="#D9822B"/>
    <path d="M82 134 C 90 146 102 149 112 145 C 102 141 96 134 92 124 Z" fill="#D9822B"/>`;
  /* tepe tüyleri: alev gibi */
  const crest=`<g class="crest"><path d="M61 33 C 48 27 43 16 47 7 C 52 17 60 20 67 28 Z" fill="#D9822B"/>
    <path d="M79 33 C 92 27 97 16 93 7 C 88 17 80 20 73 28 Z" fill="#F2B451"/>
    <path d="M70 30 C 59 18 61 6 72 0 C 69 11 80 15 77 30 Z" fill="${dark}"/></g>`;
  const bodyP=`<path d="M70 24 C 108 24 124 52 124 86 C 124 120 102 140 70 140 C 38 140 16 120 16 86 C 16 52 32 24 70 24 Z" fill="${body}"/>
    <path d="M28 112 C 36 130 52 140 70 140 C 88 140 104 130 112 112 C 100 124 86 130 70 130 C 54 130 40 124 28 112 Z" fill="${dark}" opacity=".22"/>`;
  /* göğüste mozaik taşları */
  let tiles='';
  [[60,104],[67,104],[74,104],[56,111],[63,111],[70,111],[77,111],[52,118],[59,118],[66,118],[73,118],[80,118],[56,125],[63,125],[70,125],[77,125],[62,132],[69,132]]
    .forEach(([x,y],i)=>{tiles+=`<rect x="${x}" y="${y}" width="5.4" height="5.4" rx=".8" fill="${i%5===2?'#E58A2C':tile}" opacity="${i%5===2?.55:.9}"/>`});
  const bellyP=`<path d="M70 94 C 92 94 102 108 100 123 C 98 134 86 140 70 140 C 54 140 42 134 40 123 C 38 108 48 94 70 94 Z" fill="${belly}"/>${tiles}`;
  /* kanatlar: dış g pozisyon, iç g animasyon */
  const wingL=`<path d="M24 82 C 6 88 2 112 12 126 C 17 113 25 104 33 97 C 31 90 28 85 24 82 Z" fill="${dark}"/><path d="M12 126 C 10 116 13 107 18 100 M18 124 C 18 116 21 109 25 104" stroke="#F2B451" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const wingR=`<path d="M116 82 C 134 88 138 112 128 126 C 123 113 115 104 107 97 C 109 90 112 85 116 82 Z" fill="${dark}"/><path d="M128 126 C 130 116 127 107 122 100 M122 124 C 122 116 119 109 115 104" stroke="#F2B451" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const upWL=`<path d="M40 90 C 24 93 4 82 -6 56 C 4 63 13 63 20 59 C 11 51 9 42 11 33 C 22 48 33 62 44 75 Z" fill="${dark}"/><path d="M-6 56 C 6 70 18 76 30 79 M11 33 C 16 48 24 60 34 68" stroke="#F2B451" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const upWR=`<path d="M100 90 C 116 93 136 82 146 56 C 136 63 127 63 120 59 C 129 51 131 42 129 33 C 118 48 107 62 96 75 Z" fill="${dark}"/><path d="M146 56 C 134 70 122 76 110 79 M129 33 C 124 48 116 60 106 68" stroke="#F2B451" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const wingsBack=`${cheer?'':`<g class="wg wgl">${wingL}</g>`}${(cheer||wave)?'':`<g class="wg wgr">${wingR}</g>`}`;
  const wingsFront=`${cheer?`<g class="wg wgl">${upWL}</g>`:''}${(cheer||wave)?`<g class="wg wgr">${upWR}</g>`:''}`;
  /* gözler */
  let eyes;
  if(cheer||sleep){
    const d=sleep?'M42 68 Q54 76 66 68 M74 68 Q86 76 98 68':'M41 70 Q54 55 67 70 M73 70 Q86 55 99 70';
    eyes=`<path d="${d}" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  }else{
    const pr=wow?6:8,py=sad?72:think?62:68,px=think?3:2;
    eyes=[54,86].map(cx=>`<ellipse cx="${cx}" cy="66" rx="16" ry="17.5" fill="#fff"/><g class="pup"><circle cx="${cx+px}" cy="${py}" r="${pr}" fill="${ink}"/><circle cx="${cx+px+3}" cy="${py-3}" r="2.6" fill="#fff"/></g><ellipse class="lid" cx="${cx}" cy="66" rx="17" ry="18.5" fill="${body}"/>`).join('');
    if(sad)eyes+=`<path d="M37 56 C 44 50 56 47 66 49 L66 54 C 56 52 45 55 37 60 Z" fill="${body}"/><path d="M103 56 C 96 50 84 47 74 49 L74 54 C 84 52 95 55 103 60 Z" fill="${body}"/>`;
  }
  let brows='';
  if(sad)brows=`<path d="M40 50 L62 43 M100 50 L78 43" stroke="${deep}" stroke-width="4" stroke-linecap="round"/>`;
  if(wow)brows=`<path d="M40 42 Q52 34 64 40 M76 40 Q88 34 100 42" stroke="${deep}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(think)brows=`<path d="M42 46 L62 44 M78 42 Q90 36 100 42" stroke="${deep}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  /* gaga */
  let beakP;
  if(cheer)beakP=`<path d="M60 82 L80 82 L70 90 Z" fill="${beak}"/><path d="M62 90 Q70 106 78 90 Z" fill="#5C1A14"/><path d="M65 96 Q70 100 75 96 Q70 103 65 96 Z" fill="#E8776A"/>`;
  else if(wow)beakP=`<path d="M61 82 L79 82 L70 89 Z" fill="${beak}"/><ellipse cx="70" cy="92" rx="6" ry="4" fill="#5C1A14"/><path d="M64 94 L76 94 L70 101 Z" fill="${beak}"/>`;
  else beakP=`<path d="M61 83 L79 83 L70 96 Z" fill="${beak}"/><path d="M61 83 L79 83 L70 87 Z" fill="#B23A2A"/>`;
  const cheeks=`<ellipse cx="34" cy="88" rx="7" ry="4.5" fill="#E8776A" opacity=".5"/><ellipse cx="106" cy="88" rx="7" ry="4.5" fill="#E8776A" opacity=".5"/>`;
  const feet=`<path d="M57 139 l-6 7 M57 139 v8 M57 139 l6 7 M83 139 l-6 7 M83 139 v8 M83 139 l6 7" stroke="${deep}" stroke-width="3.6" stroke-linecap="round"/>`;
  let extra='';
  if(sad)extra=`<path class="tear" d="M38 80 C 35 86 34 90 38 92 C 42 90 41 86 38 80 Z" fill="#8FC1D9"/>`;
  if(sleep)extra=`<g class="zz"><text x="104" y="30" font-family="JetBrains Mono,monospace" font-weight="700" font-size="16" fill="${deep}">z</text><text x="116" y="18" font-family="JetBrains Mono,monospace" font-weight="700" font-size="12" fill="${deep}">z</text></g>`;
  if(think)extra=`<circle class="thd" cx="112" cy="30" r="4" fill="${dark}" opacity=".5"/><circle class="thd thd2" cx="122" cy="18" r="6" fill="${dark}" opacity=".5"/>`;
  /* aksesuarlar (mağaza) */
  let a='';
  if(acc==='gozluk')a=`<g fill="rgba(255,255,255,.18)" stroke="${ink}" stroke-width="3.5"><circle cx="54" cy="66" r="19"/><circle cx="86" cy="66" r="19"/></g><path d="M66 64 Q70 60 74 64" stroke="${ink}" stroke-width="3.5" fill="none"/>`;
  if(acc==='baret')a=`<path d="M32 40 Q70 -8 108 40 Z" fill="#D9822B" stroke="${ink}" stroke-width="3"/><path d="M70 9 V40" stroke="#A3461F" stroke-width="5"/><rect x="26" y="36" width="88" height="10" rx="3" fill="#A3461F" stroke="${ink}" stroke-width="3"/>`;
  if(acc==='tac')a=`<path d="M44 34 L50 10 L60 24 L70 4 L80 24 L90 10 L96 34 Z" fill="#E8C35A" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/><rect x="66" y="21" width="8" height="8" transform="rotate(45 70 25)" fill="#8E2B22"/>`;
  if(acc==='zeytin')a=`<g fill="#4B5A3A" stroke="${ink}" stroke-width="1.4"><ellipse cx="34" cy="44" rx="12" ry="5" transform="rotate(-40 34 44)"/><ellipse cx="46" cy="32" rx="12" ry="5" transform="rotate(-20 46 32)"/><ellipse cx="94" cy="32" rx="12" ry="5" transform="rotate(20 94 32)"/><ellipse cx="106" cy="44" rx="12" ry="5" transform="rotate(40 106 44)"/></g><circle cx="40" cy="38" r="3" fill="#2F3A28"/><circle cx="100" cy="38" r="3" fill="#2F3A28"/>`;
  const d=-(Math.random()*7).toFixed(2);
  return `<svg class="anka ${mood}${cls?' '+cls:''}" style="--ad:${d}s" width="${size}" height="${Math.round(size*(H+10)/(W+20))}" viewBox="-10 -6 ${W+20} ${H+10}" aria-hidden="true"><g class="ak-all"><g class="ak-tail">${tail}</g><g class="ak-bd">${wingsBack}${crest}${bodyP}${bellyP}${wingsFront}${cheeks}<g class="ak-face">${eyes}${brows}${beakP}</g>${a}</g>${feet}${extra}</g></svg>`;
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
  ANKA_ACTS.forEach(a=>el.classList.remove('act-'+a));void el.getBoundingClientRect();
  el.classList.add('act-'+name);clearTimeout(el._akT);el._akT=setTimeout(()=>el.classList.remove('act-'+name),2600);
}
const ANKA_TAP=['Hey, gıdıklanıyorum!','Uçmaya hazırım!','Bir ders daha yapalım mı?','Kanatlarım ısındı!','Kıvılcım gibiyim!','Beni seçtiğin için teşekkürler!','Hadi öğrenelim!'];
document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('svg.anka');if(!a)return;
  const n=pick(['jump','spin','wiggle','dance','nod','flip']);ankaAct(a,n);
  if(typeof sfx!=='undefined'&&sfx.chirp)sfx.chirp();
  const bb=a.parentElement&&a.parentElement.querySelector('.bb');if(bb)bb.textContent=pickL(ANKA_TAP);
});
