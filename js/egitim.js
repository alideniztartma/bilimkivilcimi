/* #BilimKıvılcımı · Alanlar: Yazılım, Mekanik, Elektronik
   Her alan, kodlama yolundaki gibi ünitelerden oluşan bir yol haritasıdır.
   Yeni ünite eklemek için U.push(...) ile field alanı verilmiş bir ünite ekleyin.
   Ünitenin dersleri, rehberi (guide) ve kupa adı (badge) olmalı. "soon" listesi yolun sonunda "Yakında" diye görünür. */
'use strict';

const FIELDS=[
 {id:'yazilim',title:'Yazılım',icon:'code',desc:'Algoritmadan Python\'a, robot yazılımına kadar.',soon:['Değişkenler ve veri tipleri','Robotu otonom sürmek']},
 {id:'mekanik',title:'Mekanik',icon:'gear',desc:'Kuvvetten dişlilere, basit makinelerden kendi tasarımına.',soon:['CAD ile robot tasarımı','Atölyede şasi yapımı']},
 {id:'elektronik',title:'Elektronik',icon:'chip',desc:'FRC robotunun güç sistemi, beyni, motorları ve sensörleri.',soon:['Lehim ve konnektörler','Elektrik panosunu düzenleme']}
];
U.forEach(u=>{if(!u.field)u.field='yazilim'});
U.forEach((u,i)=>{if(!u.badge)u.badge=['Algoritmacı','Döngü Ustası','Karar Verici','Kutu Bekçisi','Pythoncu'][i]});

U.push(
{id:'u6',field:'yazilim',title:'Robot yazılımı',desc:'Girdi, çıktı ve sensörle karar veren robotlar.',badge:'Robot Yazılımcısı',
 guide:[{h:'Girdi, işlem, çıktı',p:'Her program girdi alır, işler ve çıktı verir. Robotta girdi sensörlerden gelir, çıktı motorlara gider.'},
        {h:'Algıla, karar ver, hareket et',p:'Robot programı bu üç işi durmadan tekrarlar. FRC robotları bunu saniyede 50 kez yapar.'}],
 lessons:[
 {id:'yz1',title:'Program nasıl çalışır?',desc:'Girdi, işlem ve çıktı.',ex:[
  {t:'info',fig:'gio',h:'Girdi, işlem, çıktı',p:'Her program üç adımda çalışır: <b>girdi</b> alır, <b>işlem</b> yapar, <b>çıktı</b> verir. Hesap makinesinde bastığın tuşlar girdi, toplama işlem, ekrandaki sonuç çıktıdır.'},
  {t:'mc',q:'Marketin kapısı biri yaklaşınca kendiliğinden açılıyor. Kapının açılması nedir?',opts:['Çıktı','Girdi','İşlem'],a:0,tip:'Yaklaşan kişi girdidir. Kapının açılması programın sonucudur, yani çıktı.'},
  {t:'match',q:'Kavramları anlamlarıyla eşleştir.',pairs:[['Girdi','Klavyeden yazılan sayı'],['İşlem','Sayıları toplamak'],['Çıktı','Ekranda görünen sonuç'],['Hata','Programdaki yanlış']]},
  {t:'mc',q:'Robotun kamerası bir top gördü. Bu bilgi program için nedir?',opts:['Girdi','Çıktı','İşlem'],a:0,tip:'Programa dışarıdan gelen her bilgi girdidir.'},
  {t:'order',q:'Hesap makinesi programının adımlarını sırala.',lines:true,plain:true,items:['İki sayıyı al','Sayıları topla','Sonucu ekrana yaz'],tip:'Önce girdi (sayılar), sonra işlem (toplama), en son çıktı (sonuç).'},
  {t:'info',h:'Kodu satır satır oku',p:'Bilgisayar satırları yukarıdan aşağıya sırayla okur. <code>yaz</code> komutu kutudakini ekrana yazar.',code:'sayı = 4\nsayı = sayı + 3\nyaz(sayı)   # 7'},
  {t:'type',q:'Bu program ekrana ne yazar?',code:'sayı = 4\nsayı = sayı + 3\nyaz(sayı)',a:['7','yedi'],tip:'Kutuda 4 vardı, 3 eklendi: 7.'},
  {t:'line',q:'Program 10 yazmalı ama 2 yazıyor. Hangi satır hatalı?',lines:['a = 6','b = 4','toplam = a - b','yaz(toplam)'],a:[2],tip:'6 − 4 = 2 eder. 10 bulmak için eksi yerine artı kullanılmalı.'},
  {t:'mc',q:'Bir programa aynı girdiyi iki kez verirsen ne olur?',opts:['İki seferde de aynı çıktıyı verir','Her seferinde başka bir şey yapar','İkinci seferde çalışmaz'],a:0,tip:'Bilgisayarın keyfi yoktur; her seferinde aynı adımları aynı sırayla yapar.'}
 ]},
 {id:'yz2',title:'Algıla, karar ver, hareket et',desc:'Sensörle karar veren robot.',ex:[
  {t:'info',fig:'sdh',h:'Robotun üç işi',p:'<b>Sensörler</b> robotun gözü ve kulağıdır. Robot programı üç işi durmadan tekrarlar: <b>algılar</b>, <b>karar verir</b>, <b>hareket eder</b>. FRC robotları bunu saniyede 50 kez yapar.'},
  {t:'match',q:'Robotun parçalarını görevleriyle eşleştir.',pairs:[['Sensör','Çevreyi ölçer'],['Motor','Robotu hareket ettirir'],['Eğer','Karar verir'],['Döngü','İşi sürekli tekrarlar']]},
  {t:'info',h:'Mesafe sensörü',p:'Mesafe sensörü, önündeki engelin kaç santimetre uzakta olduğunu söyler. <code>mesafe &lt; 20</code>, "engel 20 cm\'den yakın" demektir.',code:'Eğer mesafe < 20:\n    Motoru durdur'},
  {t:'fill',q:'Engel yakınsa robot durmalı. Boşluğu doldur.',code:'Sürekli tekrarla:\n    mesafe = sensörü oku\n    ___ mesafe < 20:\n        Motoru durdur',opts:['Eğer','Tekrarla','Yaz'],a:0,tip:'Karar vermek için "Eğer" kullanırız.'},
  {t:'mc',q:'Mesafe sensörü 50 cm gösteriyor. Programda "Eğer mesafe < 20 ise dur" yazıyor. Robot ne yapar?',opts:['Gitmeye devam eder','Durur','Geri döner'],a:0,tip:'50, 20\'den küçük değil. Koşul yanlış, robot durmaz.'},
  {t:'mc',q:'Şimdi sensör 10 cm gösteriyor. Aynı programda robot ne yapar?',opts:['Durur','Gitmeye devam eder','Geri döner'],a:0,tip:'10, 20\'den küçüktür. Koşul doğru, robot durur.'},
  {t:'order',q:'Çizgi izleyen robotun programını sırala.',lines:true,items:['Sürekli tekrarla:','    Işık sensörünü oku','    Eğer çizgi soldaysa:','        Sola dön','    Değilse:','        Sağa dön'],tip:'En dışta sürekli tekrar; içinde önce oku, sonra karar ver, sonra dön.'},
  {t:'type',q:'Robotun döngüsü saniyede 50 kez çalışıyor. 2 saniyede kaç kez çalışır?',a:['100','yüz'],tip:'Her saniye 50 tur var. 2 saniye × 50 tur = 100 tur.'}
 ]}]},
/* ===== MEKANİK (FRC) ===== */
MEK[2],MEK[3],MEK[4],
/* ===== ELEKTRONİK (FRC) ===== */
{id:'e1',field:'elektronik',icon:'bolt',title:'Robotun güç sistemi',desc:'Robotun pili, şalteri ve elektriği dağıtan panosu.',badge:'Güç Ustası',
 guide:[{h:'Elektriğin yolu',p:'Pil (akü) → ana şalter → dağıtım panosu → sigortalar → motor ve diğer parçalar. Su borusu gibi düşün.'},
        {h:'Renkler',p:'Kırmızı kablo artı (+), siyah kablo eksi (−) içindir. Renkleri karıştırırsan parçalar bozulabilir.'},
        {h:'Güç: sadece bir çarpma',p:'Volt, elektriğin itme gücüdür. Amper, akan elektriğin miktarıdır. İkisini çarparsan watt, yani güç çıkar. 12 × 40 = 480 watt.'}],
 lessons:[
 {id:'fe1',title:'Güç nereden gelir?',ex:[
  {t:'info',fig:'guc',h:'Robotun enerjisi',p:'Robotun pili büyük bir <b>akü</b>dür, arabalardakine benzer. Üstünde <b>12 volt</b> yazar. Volt, elektriğin ne kadar güçlü itildiğini söyler: su borusundaki basınç gibi. Akü önce <b>ana şaltere</b> bağlanır. Ana şalter, robotun büyük açma-kapama düğmesidir. Sonra <b>dağıtım panosuna</b> gelir. Pano, elektriği bütün parçalara paylaştırır. Bir su dağıtım kutusu gibi.'},
  {t:'order',q:'Elektriğin aküden motora yolunu sırala.',lines:true,plain:true,items:['Akü','Ana şalter','Güç dağıtım panosu','Sigorta','Motor sürücü','Motor']},
  {t:'mc',q:'Ana şalter ne işe yarar?',opts:['Robotu açıp kapatır, tehlike olursa elektriği keser','Kodu çalıştırır','Motorların hızını ölçer'],a:0,tip:'Evdeki ana elektrik düğmesi gibi: kapatınca her şey durur.'},
  {t:'match',q:'Kablo renklerini anlamlarıyla eşleştir.',pairs:[['Kırmızı','Artı (+)'],['Siyah','Eksi (−)'],['Sarı ve yeşil','CAN haberleşme hattı']]},
  {t:'info',h:'Sigortalar',p:'Evde çok cihaz takınca sigorta atar, değil mi? Robotta da öyle. Her motorun yolunda bir <b>sigorta</b> vardır. Sigorta, bir güvenlik görevlisidir. Bir motor sıkışıp çok fazla elektrik çekerse sigorta atar. Elektrik kesilir, kablolar ısınıp yanmaz. Sürüş motorlarında genellikle <b>40 amperlik</b> sigorta olur. Amper, akan elektriğin miktarıdır: borudan akan su miktarı gibi.'},
  {t:'mc',q:'Bir motor sıkışıp çok fazla elektrik çekerse ne olur?',opts:['Sigorta atar ve kabloları korur','Akü daha çok dolar','Robot daha hızlı gider'],a:0,tip:'Sigorta, tehlikeli durumda elektriği kesen görevlidir.'},
  {t:'info',h:'Güç: iki sayıyı çarp',p:'<b>Watt</b>, bir cihazın ne kadar güçlü çalıştığını söyler. Hesabı çok kolay: <b>volt × amper = watt</b>. Yani itme gücü ile akan miktarı çarparsın. Mesela 12 volt ve 40 amper varsa 12 × 40 = 480 watt olur.'},
  {t:'fill',q:'Motor 12 volt ve 40 amper kullanıyor. Kaç watt?',code:'12 × 40 = ___ watt',opts:['480','52','300'],a:0,tip:'12 × 40 = 480. Sadece çarpma yaptık.'}
 ]},
 {id:'fe2',title:'Robotun beyni ve haberleşme',ex:[
  {t:'info',fig:'beyin',h:'roboRIO: robotun beyni',p:'Robotun da bir beyni var: <b>roboRIO</b>. Küçük bir bilgisayardır. Takımın yazdığı kod onun içinde çalışır. Sensörlere bakar, karar verir ve motorlara emir yollar. Sürücü ise kendi bilgisayarından, yani <b>Sürücü İstasyonu</b>ndan robota <b>radyo</b> ile bağlanır. Radyo, kablosuz internet gibi çalışır.'},
  {t:'match',q:'Kontrol sistemini görevleriyle eşleştir.',pairs:[['roboRIO','Kodu çalıştırır'],['Radyo','Kablosuz bağlantı kurar'],['Sürücü İstasyonu','Sürücünün bilgisayarı'],['Kumanda','Sürücünün robotu yönettiği cihaz']]},
  {t:'info',fig:'rsl',h:'Robot sinyal ışığı',p:'Her robotta turuncu bir ışık vardır: <b>RSL</b> (robot sinyal ışığı). Trafik ışığı gibi düşün. Işık <b>sabit yanıyorsa</b> robot açık ama uyuyor. Yani <b>devre dışı</b>, hareket etmez. Işık <b>yanıp sönüyorsa</b> robot uyanık ve <b>hareket edebilir</b>. Robota yaklaşmadan önce ışığa bak!'},
  {t:'mc',fig:'rsl',q:'Robotun turuncu ışığı yanıp sönüyor. Ne demek?',opts:['Robot uyanık, hareket edebilir. Dikkat!','Robot kapalı','Akü bitti'],a:0,tip:'Yanıp sönen ışık "dikkat, robot çalışıyor" demektir. Robota dokunmadan önce devre dışı bırakılır.'},
  {t:'order',q:'Robotu çalıştırma adımlarını sırala.',lines:true,plain:true,items:['Dolu aküyü tak','Ana şalteri aç','Radyonun bağlanmasını bekle','Sürücü İstasyonundan robotu etkinleştir']},
  {t:'mc',q:'roboRIO motoru doğrudan çalıştırır mı?',opts:['Hayır, motor sürücüye emir yollar','Evet, bütün elektrik ondan geçer','Evet, ama sadece maç başında'],a:0,tip:'roboRIO patron gibi "şu kadar hızlı git" der. Elektriği motor sürücü aküden alıp motora verir.'}
 ]}
]},
{id:'e2',field:'elektronik',icon:'chip',title:'Motorlar ve sensörler',desc:'Motoru yöneten parça, robotun konuşma hattı ve duyuları.',badge:'Sensör Avcısı',
 guide:[{h:'Motor sürücü',p:'Motorun gaz pedalı gibidir. Beyinden gelen emre göre motoru ileri, geri, hızlı ya da yavaş döndürür.'},
        {h:'CAN hattı',p:'Robotun parçalarının birbirleriyle konuştuğu telefon hattıdır. Sarı ve yeşil kablolarla zincir gibi bağlanır. Her parçanın kendi numarası vardır.'},
        {h:'Sensörler',p:'Robotun duyularıdır. Enkoder dönüşü sayar, jiroskop yönü bilir, sınır anahtarı "sona geldim" der, kamera görür.'}],
 lessons:[
 {id:'fe3',title:'Motor sürücüler ve CAN hattı',ex:[
  {t:'info',h:'Motor sürücü',p:'Oyuncak arabanın gaz düğmesini düşün. <b>Motor sürücü</b> da motorun gaz pedalıdır. Beyin ona "yarım hızla ileri" der. O da aküden gelen elektriği buna göre motora verir. Her motorun kendi sürücüsü vardır.'},
  {t:'mc',q:'Beyin motor sürücüye "−1" derse motor ne yapar?',opts:['Tam hızla geri gider','Durur','Tam hızla ileri gider'],a:0,tip:'Emir −1 ile +1 arasındadır. 0 dur demek, +1 tam ileri, −1 tam geri demek.'},
  {t:'info',fig:'can',h:'CAN hattı: robotun telefon hattı',p:'Robotun parçaları birbirleriyle <b>konuşmalı</b>. Bunu <b>CAN hattı</b> yapar. Telefon hattı gibi düşün. Kablolar <b>sarı ve yeşildir</b>. Parçalar zincir gibi sırayla bağlanır. Her parçaya bir <b>numara</b> verilir. Böylece mesaj doğru yere gider. Sınıftaki öğrenci numaraları gibi.'},
  {t:'mc',q:'İki motor sürücüye yanlışlıkla aynı numara verilirse ne olur?',opts:['Emirler karışır, robot doğru çalışmaz','Robot iki kat hızlı gider','Hiçbir şey olmaz'],a:0,tip:'Sınıfta iki öğrencinin numarası aynıysa öğretmen kimi çağırdığını karıştırır.'},
  {t:'line',q:'Zincirde bir kablo kopmuş. Hangi satırda kopuk var?',lines:['roboRIO','Motor sürücü 1','Motor sürücü 2  ✂ kablo kopuk','Motor sürücü 3','Güç dağıtım panosu'],a:[2],plain:true,tip:'Kopuk kablodan sonraki parçalar mesaj alamaz. Telefon hattı kopunca ötesi duymaz.'},
  {t:'match',q:'Emri anlamıyla eşleştir.',pairs:[['+1','Tam hızla ileri'],['0','Dur'],['−1','Tam hızla geri'],['0,5','Yarım hızla ileri']]}
 ]},
 {id:'fe4',title:'Sensörler: robotun duyuları',ex:[
  {t:'info',fig:'sensor',h:'Robotun duyuları',p:'<b>Enkoder</b>, bisikletin kilometre sayacı gibi tur sayar. Tekerlek kaç tur döndüyse robot o kadar yol gitmiştir. <b>Jiroskop</b>, telefonu çevirince ekranı döndüren sensör gibidir. Robotun yönünü bilir. <b>Sınır anahtarı</b>, kolun en uca gelince basılan küçük bir düğmedir. <b>Kamera</b> da sahadaki hedefleri görür.'},
  {t:'match',q:'Sensörü işiyle eşleştir.',pairs:[['Enkoder','Kaç tur döndüğünü sayar'],['Jiroskop','Robotun yönünü bilir'],['Sınır anahtarı','Parça sona gelince basılır'],['Kamera','Hedefleri görür']]},
  {t:'mc',q:'Robot kendi kendine tam 3 metre gitmeli. Hangi sensör en çok işe yarar?',opts:['Tekerlek enkoderi (tur sayar)','Sınır anahtarı','Hiçbiri, tahmin ederiz'],a:0,tip:'Tur sayısı ile tekerleğin çevresini çarparsan gidilen yolu bulursun.'},
  {t:'fill',q:'Asansör en üste gelince motor durmalı. Boşluğu doldur.',code:'Eğer ___ basıldıysa:\n    Asansör motorunu durdur',opts:['üst sınır anahtarı','kamera','jiroskop'],a:0},
  {t:'type',q:'Tekerleğin bir turu 0,5 metre. Enkoder 6 tur saydı. Robot kaç metre gitti? (sadece sayıyı yaz)',a:['3','üç'],tip:'6 tur × 0,5 metre = 3 metre. Her tur yarım metre.'},
  {t:'mc',q:'Robot sağa dönmeli ve dönüşü ölçmeli. Hangi sensör yönü bilir?',opts:['Jiroskop','Sınır anahtarı','Kamera'],a:0}
 ]}
]},
{id:'e3',field:'elektronik',icon:'bulb',title:'Güvenli kablolama ve arıza bulma',desc:'Doğru kablo, akü bakımı ve arıza dedektifliği.',badge:'Kablo Ustası',
 guide:[{h:'Çok elektrik, kalın kablo',p:'Çok elektrik taşıyacak kablo kalın olmalı. Kalın hortum gibi. Kalınlığın adı AWG: sayı küçüldükçe kablo kalınlaşır.'},
        {h:'Arıza dedektifi',p:'Robot çalışmazsa elektriğin yolunu baştan sona kontrol et: akü, şalter, sigorta, kablo, sürücü, motor.'}],
 lessons:[
 {id:'fe5',title:'Kablo kalınlığı ve akü bakımı',ex:[
  {t:'info',fig:'awg',h:'AWG: kablo kalınlığı',p:'Kabloların kalınlığı <b>AWG</b> adlı bir sayıyla söylenir. Bu sayı tuhaftır: <b>sayı küçüldükçe kablo kalınlaşır</b>. Çok elektrik taşıyan kablo kalın olmalı. Bahçe hortumu gibi: çok su akacaksa kalın hortum lazım. Aküden panoya giden kablo çok kalındır (6 AWG). 40 amperlik motor kablosu daha incedir (12 AWG).'},
  {t:'mc',fig:'awg',q:'Hangisi daha kalın bir kablodur?',opts:['6 AWG','12 AWG','22 AWG'],a:0,tip:'AWG sayısı küçüldükçe kablo kalınlaşır.'},
  {t:'mc',q:'İnce bir kabloya çok fazla elektrik yüklenirse ne olur?',opts:['Kablo ısınır, hatta yanabilir','Robot hızlanır','Akü dolar'],a:0,tip:'İnce hortumdan çok su geçirmeye çalışmak gibi. Zorlanır.'},
  {t:'info',fig:'aku',h:'Akü bakımı',p:'Dolu akü yaklaşık <b>12,5 volt</b> gösterir. Maçtan önce akünün voltuna bakılır. Akü ağırdır, düşürme. Kablolarından çekip taşıma. Kablo uçları gevşek olmasın: hafifçe çekip kontrol et.'},
  {t:'mc',q:'Maçtan önce akü ölçüldü: 11,6 volt. Ne yapılmalı?',opts:['Dolu bir aküyle değiştirmek','Olduğu gibi maça çıkmak','Aküyü sallamak'],a:0,tip:'Pili bitmek üzere olan oyuncak araba gibi: yavaşlar. Robotun beyni de kapanabilir.'},
  {t:'match',q:'Durumları doğru davranışla eşleştir.',pairs:[['Kablo ucu gevşek','Yeniden sıkıştır'],['Kablo yalıtımı yırtık','Kabloyu değiştir'],['Akü düşük','Şarja tak'],['Kablo hareketli parçaya yakın','Kelepçeyle uzaklaştır']]}
 ]},
 {id:'fe6',title:'Robot hareket etmiyor! Arıza bulma',ex:[
  {t:'info',fig:'ariza',h:'Dedektif gibi düşün',p:'Robot çalışmıyor mu? Panik yok! Bir dedektif gibi elektriğin yolunu <b>baştan sona</b> kontrol et. Akü dolu mu? Ana şalter açık mı? Sigorta atmış mı? Kablo kopuk mu? Motor sürücünün ışığı yanıyor mu? Teker teker bak, sorunu bulacaksın.'},
  {t:'order',q:'Robot hiç açılmıyor. Kontrolleri sırala.',lines:true,plain:true,items:['Akünün dolu olduğunu ölç','Akü kablosunun takılı olduğuna bak','Ana şalterin açık olduğunu kontrol et','Güç panosunun ışıklarına bak']},
  {t:'mc',q:'Robot açık ama sadece sol tekerlek dönmüyor. İlk nereye bakarsın?',opts:['Sol motorun sigortasına ve sürücüsüne','Aküyü değiştirmeye','Kodu baştan yazmaya'],a:0,tip:'Diğer parçalar çalışıyorsa sorun sadece o motorun yolunda.'},
  {t:'line',q:'Arıza ararken hangisi TEHLİKELİ?',lines:['Robotu devre dışı bıraktı','Ana şalteri kapattı','Robot uyanıkken elini tekerleğe soktu','Kabloları tek tek kontrol etti'],a:[2],plain:true,tip:'Robot uyanıkken dönen parçalara asla dokunulmaz.'},
  {t:'mc',q:'Motor sürücünün ışığı hiç yanmıyor. Bu neden olabilir?',opts:['Sürücüye elektrik gelmiyor','Kod çok iyi yazılmış','Motor çok hızlı'],a:0,tip:'Işık yanmıyorsa elektrik sürücüye ulaşmıyor olabilir. Yolu kontrol et.'},
  {t:'mc',q:'Arızayı bulup düzelttin. Şimdi ne yapmalısın?',opts:['Not al ve robotu güvenli şekilde test et','Hemen maça çık','Hiç kimseye söyleme'],a:0,tip:'Arıza notları bir sonraki sorunda takıma zaman kazandırır.'}
 ]}
]}
);

/* Mekanik 1. ve 2. üniteler: eski temel ünitelerin (tm1, tm2) yerinde. Kupa kayıtları ünite sırasına bağlı. */
U.push(MEK[0],MEK[1]);

/* Ders listeleri, sözlük ve kimlikler js/dersler.js içinde kurulur (temel ünite dosyalarından sonra). */
/* FRC sözlüğü: ünite kimliğiyle eklenir */
[['e1',[['Ana şalter','Robotun büyük açma-kapama düğmesi. Tehlikede elektriği keser.','Evdeki ana elektrik düğmesi gibi'],['Güç dağıtım panosu','Aküden gelen elektriği bütün parçalara paylaştıran kutu.'],['Sigorta','Çok fazla elektrik geçince atıp yolu kesen koruyucu.','Evde sigorta atması'],['Volt','Elektriğin ne kadar güçlü itildiğini gösteren sayı.','Su borusundaki basınç gibi'],['Amper','Akan elektriğin miktarı.','Borudan akan su miktarı gibi'],['Watt','Cihazın gücü. Volt ile amperi çarparsın.','12 × 40 = 480 watt']]],
 ['e2',[['roboRIO','Robotun beyni olan küçük bilgisayar. Takımın kodu onda çalışır.'],['Motor sürücü','Motorun gaz pedalı gibi. Beynin emrine göre motora elektrik verir.'],['CAN hattı','Robot parçalarının birbirleriyle konuştuğu telefon hattı. Sarı ve yeşil kablolarla yapılır.'],['Enkoder','Tur sayan sensör.','Bisikletin kilometre sayacı gibi'],['Jiroskop','Robotun yönünü bilen sensör.','Telefonu çevirince ekranın dönmesi']]],
 ['e3',[['AWG','Kablonun kalınlık numarası. Sayı küçüldükçe kablo kalınlaşır.'],['Arıza bulma','Robot bozulunca elektriğin yolunu baştan sona kontrol edip sorunu bulmak.'],['RSL','Robotun turuncu ışığı. Yanıp sönüyorsa robot uyanıktır.']]]
].forEach(([uid,items])=>{const ui=U.findIndex(u=>u.id===uid);if(ui>=0)items.forEach(([t,d,c])=>GLOSS.push(c?{u:ui,t,d,c}:{u:ui,t,d}))});
