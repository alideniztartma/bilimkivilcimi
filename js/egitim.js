/* #BilimKıvılcımı · Alanlar: Yazılım, Mekanik, Elektronik
   Her alan, kodlama yolundaki gibi ünitelerden oluşan bir yol haritasıdır.
   Yeni ünite eklemek için U.push(...) ile field alanı verilmiş bir ünite ekleyin.
   Ünitenin dersleri, rehberi (guide) ve kupa adı (badge) olmalı. "soon" listesi yolun sonunda "Yakında" diye görünür. */
'use strict';

const FIELDS=[
 {id:'yazilim',title:'Yazılım',icon:'code',desc:'Algoritmadan Python\'a, robot yazılımına kadar.',soon:['Değişkenler ve veri tipleri','Robotu otonom sürmek']},
 {id:'mekanik',title:'Mekanik',icon:'gear',desc:'Kuvvet, basit makineler ve dişliler.',soon:['Malzemeler ve bağlantı elemanları','Zincir ve kayış sistemleri','Robot şasisi tasarımı']},
 {id:'elektronik',title:'Elektronik',icon:'chip',desc:'Devreler, gerilim, akım ve direnç.',soon:['Sensörler ve motor sürücüler','Lehim ve güvenli çalışma','Robotun elektrik panosu']}
];
U.forEach(u=>{if(!u.field)u.field='yazilim'});
U.forEach((u,i)=>{if(!u.badge)u.badge=['Algoritmacı','Döngü Ustası','Karar Verici','Kutu Bekçisi','Pythoncu'][i]});

U.push(
{id:'u6',field:'yazilim',title:'Robot yazılımı',desc:'Girdi, çıktı ve sensörle karar veren robotlar.',badge:'Robot Yazılımcısı',
 guide:[{h:'Girdi, işlem, çıktı',p:'Her program girdi alır, bir işlem yapar ve çıktı verir. Robotta girdi sensörlerden gelir, çıktı motorlara gider.'},
        {h:'Algıla, karar ver, hareket et',p:'Robot programı bu üç işi sürekli tekrar eder. FRC robotları bu döngüyü saniyede 50 kez çalıştırır.'}],
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
 ]}]},
{id:'m1',field:'mekanik',title:'Basit makineler ve dişliler',desc:'Daha az kuvvetle daha çok iş yapmanın yolları.',badge:'Genç Makinist',
 guide:[{h:'Basit makineler',p:'Kaldıraç, makara, eğik düzlem, tekerlek, vida ve kama işimizi kolaylaştırır. Kuvvetten kazandırır, yoldan kaybettirir.'},
        {h:'Kaldıracın kuralı',p:'Yük × yükün uzaklığı = kuvvet × kuvvetin uzaklığı. Destek noktasından uzağa bastıkça daha az kuvvet yeter.'},
        {h:'Dişli oranı',p:'Çevrilen dişlinin diş sayısı ÷ çeviren dişlinin diş sayısı. Oran büyüdükçe dişli yavaşlar ama güçlenir.'}],
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
 ]}]},
{id:'e1',field:'elektronik',title:'Elektrik devreleri',desc:'Devrenin parçaları ve Ohm yasası.',badge:'Devre Ustası',
 guide:[{h:'Devre',p:'Elektrik akımının dolaştığı kapalı yola devre denir. Pil enerji verir, kablo akımı taşır, anahtar devreyi açıp kapatır, lamba ışık verir.'},
        {h:'Ohm yasası',p:'Akım = Gerilim ÷ Direnç. Gerilim artarsa akım artar, direnç artarsa akım azalır.'}],
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
 ]}]}
);

const ALL_LESSONS=U.flatMap(u=>u.lessons.map(l=>Object.assign(l,{field:u.field})));
const EXBYID={};
U.forEach((u,ui)=>u.lessons.forEach(l=>l.ex.forEach((e,i)=>{e.id=l.id+'-'+i;e.ui=ui;EXBYID[e.id]=e})));
const UNIT_BADGE=U.map(u=>u.badge);
const fieldOf=id=>FIELDS.find(f=>f.id===id)||FIELDS[0];
const fieldUnits=fid=>U.map((u,ui)=>({u,ui})).filter(x=>x.u.field===fid);
const unitNo=ui=>fieldUnits(U[ui].field).findIndex(x=>x.ui===ui)+1;
