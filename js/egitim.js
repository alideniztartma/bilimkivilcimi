/* #BilimKıvılcımı · Temel eğitim: Yazılım, Mekanik ve Elektronik alanları */
'use strict';

/* Yeni ders eklemek için ilgili alanın lessons listesine bir ders nesnesi ekleyin.
   Alıştırma türleri kodlama yolundakilerle aynıdır: info, mc, fill, order, match, line, type, robot.
   "soon" listesi sayfada "Yakında" olarak görünür. */
const TRACKS=[
{id:'yazilim',title:'Yazılım',icon:'code',col:'var(--terra)',short:'YZ',
 desc:'Bir program nasıl düşünür? Robotlar sensörden gelen bilgiyle nasıl karar verir?',
 soon:['Değişkenler ve veri tipleri','Fonksiyonlarla düzenli kod','Robotu otonom sürmek'],
 lessons:[
 {id:'yz1',title:'Program nasıl çalışır?',desc:'Girdi, işlem ve çıktı. Kodu okuyup sonucunu bulma.',ex:[
  {t:'info',h:'Girdi, işlem, çıktı',p:'Her program üç adımda çalışır: <b>girdi</b> alır, bir <b>işlem</b> yapar ve bir <b>çıktı</b> verir. Hesap makinesinde bastığın sayılar girdi, toplama işlem, ekranda gördüğün sonuç ise çıktıdır.'},
  {t:'match',q:'Kavramları anlamlarıyla eşleştir.',pairs:[['Girdi','Klavyeden yazılan sayı'],['İşlem','Sayıları toplamak'],['Çıktı','Ekranda görünen sonuç'],['Hata','Programdaki yanlış']]},
  {t:'mc',q:'Robotun kamerası bir top gördü. Bu bilgi program için nedir?',opts:['Girdi','Çıktı','İşlem'],a:0,tip:'Programa dışarıdan gelen her bilgi girdidir.'},
  {t:'order',q:'Hesap makinesi programının adımlarını sırala.',lines:true,plain:true,items:['İki sayıyı al','Sayıları topla','Sonucu ekrana yaz']},
  {t:'info',h:'Kodu adım adım oku',p:'Bilgisayar satırları yukarıdan aşağıya sırayla yapar. <b>sayı = sayı + 3</b> satırı, "sayının eski değerine 3 ekle ve yeniden kaydet" demektir.'},
  {t:'type',q:'Bu program ekrana ne yazar?',code:'sayı = 4\nsayı = sayı + 3\nyaz(sayı)',a:['7','yedi']},
  {t:'line',q:'Program 10 yazmalı ama 2 yazıyor. Hangi satır hatalı?',lines:['a = 6','b = 4','toplam = a - b','yaz(toplam)'],a:[2],tip:'Toplamak için eksi değil artı kullanılmalı.'},
  {t:'mc',q:'Bir programa aynı girdiyi iki kez verirsen ne olur?',opts:['İki seferde de aynı çıktıyı verir','Her seferinde başka bir şey yapar','İkinci seferde çalışmaz'],a:0,tip:'Bilgisayar her seferinde aynı adımları aynı sırayla yapar.'}
 ]},
 {id:'yz2',title:'Robot yazılımı: algıla, karar ver, hareket et',desc:'Sensör okuma, "eğer" ile karar verme ve sürekli dönen döngü.',ex:[
  {t:'info',h:'Robotun üç işi',p:'Bir robot programı sürekli üç işi tekrar eder: <b>algılar</b> (sensörden okur), <b>karar verir</b> ("eğer … ise") ve <b>hareket eder</b> (motoru çalıştırır). FRC robotları bu döngüyü saniyede 50 kez yapar.'},
  {t:'match',q:'Robotun parçalarını görevleriyle eşleştir.',pairs:[['Sensör','Çevreyi ölçer'],['Motor','Robotu hareket ettirir'],['Eğer','Karar verir'],['Döngü','İşi sürekli tekrarlar']]},
  {t:'fill',q:'Engel yakınsa robot durmalı. Boşluğu doldur.',code:'Sürekli tekrarla:\n    mesafe = sensörü oku\n    ___ mesafe < 20:\n        Motoru durdur',opts:['Eğer','Tekrarla','Yaz'],a:0},
  {t:'mc',q:'Mesafe sensörü 50 cm gösteriyor. Programda "Eğer mesafe < 20 ise dur" yazıyor. Robot ne yapar?',opts:['Gitmeye devam eder','Durur','Geri döner'],a:0,tip:'50, 20\'den küçük değil. Koşul doğru olmadığı için robot durmaz.'},
  {t:'order',q:'Çizgi izleyen robotun programını sırala.',lines:true,items:['Sürekli tekrarla:','    Işık sensörünü oku','    Eğer çizgi soldaysa:','        Sola dön','    Değilse:','        Sağa dön']},
  {t:'type',q:'Robotun döngüsü saniyede 50 kez çalışıyor. 2 saniyede kaç kez çalışır?',a:['100','yüz']}
 ]}
]},
{id:'mekanik',title:'Mekanik',icon:'gear',col:'var(--olive)',short:'MK',
 desc:'Kaldıraçlar, dişliler ve kuvvet. Bir robot kolu ağır bir yükü nasıl kaldırır?',
 soon:['Malzemeler ve bağlantı elemanları','Zincir ve kayış sistemleri','Robot şasisi tasarımı'],
 lessons:[
 {id:'mk1',title:'Basit makineler',desc:'Kaldıraç, makara, eğik düzlem. Kuvvetten kazanç.',ex:[
  {t:'info',h:'İşimizi kolaylaştıran makineler',p:'<b>Kaldıraç</b>, <b>makara</b>, <b>eğik düzlem</b>, <b>tekerlek ve dingil</b>, <b>vida</b> ve <b>kama</b> basit makinelerdir. Daha az kuvvetle iş yapmamızı sağlarlar, ama bunun için daha uzun yol gitmemiz gerekir.'},
  {t:'match',q:'Örnekleri basit makinelerle eşleştir.',pairs:[['Tahterevalli','Kaldıraç'],['Rampa','Eğik düzlem'],['Bayrak direğindeki ip','Makara'],['Balta','Kama']]},
  {t:'mc',q:'Ağır bir kutuyu kamyona rampayla çıkarırsak ne olur?',opts:['Daha az kuvvetle ama daha uzun yoldan çıkarırız','Kutu hafifler','Daha çok kuvvet gerekir'],a:0,tip:'Basit makineler kuvvetten kazandırır, yoldan kaybettirir.'},
  {t:'info',h:'Kaldıracın kuralı',p:'<b>Yük × yükün uzaklığı = kuvvet × kuvvetin uzaklığı</b>. Uzaklıklar destek noktasına göre ölçülür. Yani destekten uzağa bastıkça daha az kuvvet yeter.'},
  {t:'fill',q:'60 kg\'lık yük destekten 1 metre uzakta. Sen 3 metre uzaktan basıyorsun. Kaç kg\'lık kuvvet yeter?',code:'60 × 1 = ___ × 3',opts:['20','30','180'],a:0},
  {t:'mc',q:'Bir kapıyı itmek için en kolay yer neresidir?',opts:['Menteşeden en uzak kenar','Menteşenin hemen yanı','Kapının tam ortası'],a:0,tip:'Kuvvet, dönme noktasından ne kadar uzağa uygulanırsa o kadar az kuvvet gerekir.'}
 ]},
 {id:'mk2',title:'Dişliler: hız ve güç',desc:'Dişli oranı, dönme yönü ve tork.',ex:[
  {t:'info',h:'Dişliler dönmeyi aktarır',p:'Büyük bir dişli küçük bir dişliyi çevirirse küçük dişli <b>daha hızlı</b> döner. Küçük dişli büyüğü çevirirse büyük dişli <b>daha yavaş ama daha güçlü</b> döner. Bu döndürme gücüne <b>tork</b> denir.'},
  {t:'mc',q:'Birbirine geçmiş iki dişliden biri saat yönünde dönüyor. Öbürü hangi yöne döner?',opts:['Saat yönünün tersine','Saat yönünde','Hiç dönmez'],a:0},
  {t:'info',h:'Dişli oranı',p:'<b>Dişli oranı = çevrilen dişlinin diş sayısı ÷ çeviren dişlinin diş sayısı</b>. Oran 3 ise çevrilen dişli 3 kat yavaş, 3 kat güçlü döner.'},
  {t:'fill',q:'Çeviren dişlide 10 diş, çevrilen dişlide 40 diş var. Dişli oranı kaçtır?',code:'40 ÷ 10 = ___',opts:['4','30','50'],a:0},
  {t:'mc',q:'Robot kolu ağır bir yükü kaldıracak. Hangi düzen daha uygun?',opts:['Küçük dişli büyük dişliyi çevirsin','Büyük dişli küçük dişliyi çevirsin','Dişli kullanmayalım'],a:0,tip:'Küçük dişli büyüğü çevirince tork artar.'},
  {t:'match',q:'Dişli kavramlarını anlamlarıyla eşleştir.',pairs:[['Dişli','Dönmeyi aktarır'],['Tork','Döndürme gücü'],['Mil','Dişlinin takıldığı çubuk'],['Zincir','Uzaktaki dişlileri bağlar']]},
  {t:'type',q:'Bir bisikletin ön dişlisi 1 tur dönünce arka dişli 3 tur dönüyor. Ön dişli 2 tur dönerse arka dişli kaç tur döner?',a:['6','altı']}
 ]}
]},
{id:'elektronik',title:'Elektronik',icon:'chip',col:'var(--ember)',short:'EL',
 desc:'Devreler, gerilim, akım ve direnç. Robotun içindeki elektrik nasıl dolaşır?',
 soon:['Sensörler ve motor sürücüler','Lehim ve güvenli çalışma','Robotun elektrik panosu'],
 lessons:[
 {id:'el1',title:'Devrenin parçaları',desc:'Pil, kablo, anahtar ve lamba. Açık ve kapalı devre.',ex:[
  {t:'info',h:'Devre nedir?',p:'Elektrik akımının dolaştığı kapalı yola <b>devre</b> denir. Basit bir devrede <b>pil</b> (enerji kaynağı), <b>kablo</b> (yol), <b>anahtar</b> (aç-kapa) ve <b>lamba</b> (enerjiyi kullanan alıcı) bulunur.'},
  {t:'match',q:'Devre parçalarını görevleriyle eşleştir.',pairs:[['Pil','Enerji verir'],['Kablo','Akımı taşır'],['Anahtar','Devreyi açar ve kapatır'],['Lamba','Işık verir']]},
  {t:'mc',q:'Anahtar açıkken lamba yanar mı?',opts:['Hayır, akım geçemez','Evet, daha parlak yanar','Evet, sönük yanar'],a:0,tip:'Açık anahtar yolu keser. Akım ancak kapalı devrede dolaşır.'},
  {t:'mc',q:'Hangisi elektriği iyi iletir?',opts:['Bakır tel','Plastik cetvel','Tahta kalem'],a:0,tip:'Metaller elektriği iyi iletir. Kabloların içi bu yüzden bakırdır.'},
  {t:'order',q:'Lambayı yakmak için adımları sırala.',lines:true,plain:true,items:['Pili yuvasına tak','Kabloları pile ve lambaya bağla','Anahtarı kapat','Lambanın yandığını gözle']},
  {t:'mc',q:'Evde bir lamba bozulunca öbür lambalar neden yanmaya devam eder?',opts:['Lambalar paralel bağlıdır','Lambalar seri bağlıdır','Her lambanın kendi pili vardır'],a:0,tip:'Paralel bağlamada her lambanın kendi yolu vardır. Laboratuvardaki devre deneyinde deneyebilirsin.'}
 ]},
 {id:'el2',title:'Gerilim, akım ve direnç',desc:'Ohm yasası ve LED\'i korumak.',ex:[
  {t:'info',h:'Su borusu benzetmesi',p:'Elektriği bir su borusuna benzetebiliriz. <b>Gerilim</b> (volt, V) suyu iten basınçtır. <b>Akım</b> (amper, A) borudan geçen su miktarıdır. <b>Direnç</b> (ohm, Ω) borunun darlığıdır.'},
  {t:'match',q:'Büyüklükleri birimleriyle eşleştir.',pairs:[['Gerilim','Volt (V)'],['Akım','Amper (A)'],['Direnç','Ohm (Ω)'],['Güç','Watt (W)']]},
  {t:'info',h:'Ohm yasası',p:'<b>Akım = Gerilim ÷ Direnç</b>. Gerilim artarsa akım artar. Direnç artarsa akım azalır. Borudaki basınç artarsa daha çok su akar, boru daralırsa daha az su akar.'},
  {t:'fill',q:'Gerilim 12 volt, direnç 4 ohm. Akım kaç amperdir?',code:'Akım = 12 ÷ 4 = ___',opts:['3','8','48'],a:0},
  {t:'mc',q:'Devredeki direnci artırırsak akıma ne olur?',opts:['Azalır','Artar','Değişmez'],a:0},
  {t:'mc',q:'LED\'i pile bağlarken yanına neden bir direnç koyarız?',opts:['Fazla akımı sınırlayıp LED\'i korumak için','LED\'i daha parlak yakmak için','Devreyi açıp kapatmak için'],a:0,tip:'Dirençsiz bağlanan LED\'den çok fazla akım geçer ve LED bozulur.'},
  {t:'type',q:'Gerilim 9 volt, direnç 3 ohm. Akım kaç amperdir?',a:['3','üç']}
 ]}
]}
];
const TRACK_LESSONS=TRACKS.flatMap(t=>t.lessons.map(l=>Object.assign(l,{cat:t.id})));
TRACKS.forEach(t=>t.lessons.forEach(l=>l.ex.forEach((e,i)=>{e.id=l.id+'-'+i;EXBYID[e.id]=e})));
const trackDone=t=>t.lessons.filter(l=>S.cat[l.id]).length;
const trackLessonOpen=(t,i)=>i===0||!!S.cat[t.lessons[i-1].id];

function renderEgitim(){
  const tot=TRACK_LESSONS.length,done=TRACK_LESSONS.filter(l=>S.cat[l.id]).length;
  $('#pgEgitim').innerHTML=`<div class="frame"><div class="hero-q ol"><div><span class="lbl">TEMEL EĞİTİM</span><h2>Bir robot takımı gibi öğren</h2><p>Robot yapan takımlarda üç ana alan vardır: yazılım, mekanik ve elektronik. Her alanın temel derslerini burada bulursun.</p>
    <div class="bar" style="margin-top:14px;max-width:340px;background:rgba(244,234,214,.25)"><i style="width:${done/tot*100}%"></i><span style="color:#FBF6EA">${done} / ${tot} ders</span></div></div>${anka('happy',96,'baret')}</div></div>
  <div class="sec-h">Alanlar <small>Bir alana dokun</small></div>
  <div class="trgrid">${TRACKS.map(t=>{const n=trackDone(t);return `<a class="card trcard" href="#egitim-${t.id}"><div class="tri" style="background:${t.col}">${ic(t.icon,30)}</div>
    <h3>${t.title}</h3><p>${t.desc}</p><div class="trmeta"><div class="bar"><i style="width:${n/t.lessons.length*100}%"></i><span>${n} / ${t.lessons.length} ders</span></div></div></a>`}).join('')}</div>
  <p class="muted" style="margin-top:18px;font-size:.92rem">Bu bölüm yeni açıldı. Her alana yakında yeni dersler eklenecek.</p>`;
}
function renderTrack(id){
  const t=TRACKS.find(x=>x.id===id);if(!t){location.hash='#egitim';return}
  $('#pgTrack').innerHTML=`<a class="back" href="#egitim">${ic('rotL',18)} Temel eğitim</a>
  <div class="trhead"><div class="tri big" style="background:${t.col}">${ic(t.icon,40)}</div><div><span class="eyebrow">ALAN</span><h1 class="ph1" style="margin:4px 0 4px">${t.title}</h1><p class="sub" style="margin:0">${t.desc}</p></div></div>
  <div class="trlist">${t.lessons.map((l,i)=>{const done=!!S.cat[l.id],open=trackLessonOpen(t,i);
    return `<div class="card trl ${done?'done':open?'open':'lock'}"><span class="trn"><span>${done?ic('check',18):open?i+1:ic('lock',16)}</span></span>
      <div><small>${i+1}. DERS · ${l.ex.filter(e=>e.t!=='info').length} SORU</small><h3>${esc(l.title)}</h3><p>${esc(l.desc)}</p></div>
      ${open?`<button class="b3 ${done?'ghost':''} sm" type="button" data-trl="${l.id}">${done?'Tekrar et':'Başla'}</button>`:`<span class="muted" style="font-size:.88rem">Önceki dersi bitir</span>`}</div>`}).join('')}
    ${t.soon.map(s=>`<div class="card trl soon"><span class="trn"><span>${ic('clock',16)}</span></span><div><small>YAKINDA</small><h3>${esc(s)}</h3></div></div>`).join('')}</div>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-trl]');if(!b)return;const l=TRACK_LESSONS.find(x=>x.id===b.dataset.trl);if(l)startMode('lesson',{lesson:l})});
