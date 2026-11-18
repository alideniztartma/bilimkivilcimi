/* #BilimKıvılcımı · Alanlar: Yazılım, Mekanik, Elektronik
   Her alan, kodlama yolundaki gibi ünitelerden oluşan bir yol haritasıdır.
   Yeni ünite eklemek için U.push(...) ile field alanı verilmiş bir ünite ekleyin.
   Ünitenin dersleri, rehberi (guide) ve kupa adı (badge) olmalı. "soon" listesi yolun sonunda "Yakında" diye görünür. */
'use strict';

const FIELDS=[
 {id:'yazilim',title:'Yazılım',icon:'code',desc:'Algoritmadan Python\'a, robot yazılımına kadar.',soon:['Değişkenler ve veri tipleri','Robotu otonom sürmek']},
 {id:'mekanik',title:'Mekanik',icon:'gear',desc:'FRC robotunun iskeleti, hareketi ve mekanizmaları.',soon:['CAD ile robot tasarımı','Atölyede şasi yapımı']},
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
{id:'m1',field:'mekanik',icon:'box',title:'Robotun iskeleti',desc:'Robotun gövdesi neyden yapılır? Birlikte bakalım.',badge:'Şasi Ustası',
 guide:[{h:'Şasi',p:'Robotun iskeletine şasi denir. Tekerlekler ve motorlar şasiye bağlanır. FRC, liseli öğrencilerin robot yaptığı bir yarışmadır.'},
        {h:'Hafif ve sağlam',p:'Şasi çoğunlukla içi boş alüminyum borulardan yapılır. Hem hafif hem sağlamdır. Robotun ağırlık sınırı vardır, bu yüzden her gram önemlidir.'},
        {h:'Önce güvenlik',p:'Atölyede koruyucu gözlük takarız. Ölç, iki kez kontrol et, sonra kes.'}],
 lessons:[
 {id:'fm1',title:'FRC robotu neyden yapılır?',ex:[
  {t:'info',fig:'sasi',h:'Robotun iskeleti: şasi',p:'Robotun iskeletine <b>şasi</b> denir. Tekerlekler ve motorlar şasiye takılır. Şasi, içi boş <b>alüminyum borulardan</b> yapılır. Bu borulara kutu profil denir. Alüminyum hafif bir metaldir.'},
  {t:'mc',q:'Şasiye içi boş alüminyum boru neden takılır?',opts:['Hem hafif hem sağlam olduğu için','Çok ağır olduğu için','Tadı güzel olduğu için'],a:0,tip:'Robot ağır olmamalı. Alüminyum hafiftir, boru şekli de onu sağlam yapar.'},
  {t:'match',q:'Malzemeleri işleriyle eşleştir.',pairs:[['Alüminyum boru','Şasi ve kollar'],['Şeffaf plastik','Kırılmaz koruyucu'],['Civata ve somun','Sonra sökülebilen bağ'],['Perçin','Sökülmeyen kalıcı bağ']]},
  {t:'info',fig:'tampon',h:'Tampon (bumper)',p:'Robotun çevresinde yumuşak <b>tamponlar</b> vardır. Çarpışmada robotu korurlar. Maçta 3 takım bir araya gelir. Bu gruba <b>ittifak</b> denir. Tamponun rengi ittifakı gösterir: <b>kırmızı</b> ya da <b>mavi</b>.'},
  {t:'mc',q:'Tamponun rengi neyi gösterir?',opts:['Robotun hangi ittifakta olduğunu','Robotun ne kadar hızlı olduğunu','Robotun yaşını'],a:0},
  {t:'mc',q:'Yarışmada robotun ağırlığı neden önemlidir?',opts:['Kurallarda bir ağırlık sınırı var','Ağır robot hep kaybeder','Hakemler robotu taşır'],a:0,tip:'Kurallarda robotun en fazla ne kadar ağır olabileceği yazar. Sınırı aşan robot yarışamaz.'},
  {t:'type',q:'1 kilogram 1000 gramdır. Bir parça 2000 gram. Kaç kilogramdır? (sadece sayıyı yaz)',a:['2','iki']}
 ]},
 {id:'fm2',title:'Bağlantı ve montaj',ex:[
  {t:'info',fig:'montaj',h:'Parçaları birleştirmek',p:'Parçalar <b>civata ve somunla</b> birleşir. İstersen sonra sökersin. <b>Perçin</b> ise kalıcıdır, sökülmez. Robot maçta çok sarsılır. Somun gevşemesin diye özel somun kullanılır.'},
  {t:'mc',q:'Robot sarsılırken somun gevşemesin. Ne kullanırız?',opts:['Kilitli somun (içinde plastik halka var)','Daha uzun civata','Bant'],a:0,tip:'Somunun içindeki plastik halka civatayı sıkıca tutar.'},
  {t:'order',q:'Bir boruyu delip bağlamanın adımlarını sırala.',lines:true,plain:true,items:['Koruyucu gözlüğü tak','Delik yerini ölç ve işaretle','Matkapla del','Delikteki keskin kırıntıları temizle','Civatayı tak ve sık']},
  {t:'mc',q:'Atölyede hangisi her zaman gereklidir?',opts:['Koruyucu gözlük takmak','Eldivenle matkap kullanmak','Şapka takmak'],a:0,tip:'Gözlük gözlerini korur. Matkapla eldiven takılmaz, çünkü eldiven dönen matkaba sarılabilir.'},
  {t:'match',q:'Aletleri işleriyle eşleştir.',pairs:[['Alyan anahtarı','Civatayı sıkar'],['Matkap','Delik açar'],['Perçin tabancası','Perçin çakar'],['Kumpas','Küçük şeyleri ölçer']]},
  {t:'line',q:'Montaj adımlarında hangisi yanlış?',lines:['Ölçüleri iki kez kontrol et','Parçayı mengeneye sabitle','Eldiven takıp matkabı çalıştır','Deliği aç ve çapağını al'],a:[2],plain:true,tip:'Dönen aletlerle çalışırken eldiven takılmaz.'}
 ]}
]},
{id:'m2',field:'mekanik',icon:'gear',title:'Hareket ve güç aktarımı',desc:'Motor tekerleği nasıl çevirir? Dişliler, zincirler ve sürüş.',badge:'Güç Aktarıcı',
 guide:[{h:'Hız mı, güç mü?',p:'Motor hızlı döner ama güçsüzdür. Dişlilerle hızdan vazgeçip güç kazanırız. Bu döndürme gücüne tork denir.'},
        {h:'Dişli oranı',p:'Oran, büyük dişlinin kaç kat büyük olduğunu söyler. Oran 4 ise büyük dişli 4 kat yavaş döner. Hesap: büyük dişlinin diş sayısını küçüğe böl.'},
        {h:'Sürüş sistemleri',p:'Tank sürüş basit ve güçlüdür. Mecanum tekerlekle robot yana kayar. Swerve sistemde her tekerlek kendi yönüne döner.'}],
 lessons:[
 {id:'fm3',title:'Motorlar, dişliler ve tork',ex:[
  {t:'info',h:'Tork nedir?',p:'<b>Tork</b>, bir şeyi döndürme gücüdür. Motor çok hızlı döner ama gücü azdır. Bu yüzden motorla tekerleğin arasına bir <b>dişli kutusu</b> konur. Hızı azaltır, gücü artırır.'},
  {t:'mc',fig:'disli',q:'Küçük bir dişli büyük bir dişliyi çevirirse büyük dişli nasıl döner?',opts:['Daha yavaş ama daha güçlü','Daha hızlı ama daha güçsüz','Aynı hızda'],a:0},
  {t:'info',fig:'disli',h:'Dişli oranı',p:'Küçük dişlide 12 diş, büyük dişlide 48 diş var. Büyük dişlide 4 kat fazla diş var. Buna <b>oran 4</b> denir. Hesap: 48 ÷ 12 = 4. Büyük dişli, küçüğün 4 kat yavaşında döner.'},
  {t:'fill',q:'Küçük dişlide 10 diş, büyük dişlide 50 diş var. Oran kaçtır?',code:'50 ÷ 10 = ___',opts:['5','40','60'],a:0},
  {t:'type',q:'Motor dakikada 100 tur dönüyor. Oran 5 ise tekerlek dakikada kaç tur döner? (sadece sayıyı yaz)',a:['20','yirmi'],tip:'Oran 5 demek 5 kat yavaş demek. 100 ÷ 5 = 20.'},
  {t:'mc',q:'Robot ağır bir kolu kaldıracak. Hangisi iyi olur?',opts:['Büyük oran: yavaş ama güçlü','Küçük oran: hızlı ama güçsüz','Dişli kullanmamak'],a:0,tip:'Ağır şey kaldırmak için güç gerekir. Büyük oran gücü artırır.'},
  {t:'match',q:'Parçaları görevleriyle eşleştir.',pairs:[['Dişli kutusu','Hızı azaltır, gücü artırır'],['Mil','Dönmeyi taşıyan çubuk'],['Rulman','Milin kolay dönmesini sağlar'],['Motor','Elektrikle döner']]}
 ]},
 {id:'fm4',title:'Zincir, kayış ve sürüş sistemleri',ex:[
  {t:'info',fig:'zincir',h:'Uzağa güç taşımak',p:'Motor her zaman tekerleğin yanında olmaz. Dönmeyi uzağa <b>zincir</b> ya da <b>kayışla</b> taşırız. Bisikletin zinciri de aynı işi yapar.'},
  {t:'mc',q:'Pedaldaki dişlide 40 diş, arkadaki dişlide 20 diş var. Pedal 1 tur dönünce arka dişli kaç tur döner?',opts:['2','1','20'],a:0,tip:'Arka dişli yarı büyüklükte. Bu yüzden 2 kat hızlı döner.'},
  {t:'info',fig:'surus',h:'Sürüş sistemleri',p:'<b>Tank sürüş</b>: iki yanda tekerlekler. Basit ve sağlam. <b>Mecanum</b>: eğik makaralı tekerlekler. Robot yana kayabilir. <b>Swerve</b>: her tekerlek kendi yönüne döner. Robot her yöne gider.'},
  {t:'match',q:'Sürüş sistemlerini özellikleriyle eşleştir.',pairs:[['Tank sürüş','Basit ve itmede güçlü'],['Mecanum','Çapraz makaralarla yana kayar'],['Swerve','Her tekerlek kendi yönüne döner']]},
  {t:'mc',fig:'surus',q:'Robot dönmeden yana kaymak istiyor. Hangi sistem bunu yapamaz?',opts:['Tank sürüş','Mecanum','Swerve'],a:0},
  {t:'mc',q:'Zincir neden gevşek bırakılmamalıdır?',opts:['Dişliden atlayıp çıkabilir','Daha hızlı döner','Robot hafifler'],a:0,tip:'Gevşek zincir dişliden atlar. Bu yüzden zincir gergin tutulur.'},
  {t:'type',q:'Tekerleğin çevresi 50 cm. Tekerlek 10 tur dönerse robot kaç cm ilerler? (sadece sayıyı yaz)',a:['500','beş yüz'],tip:'Her turda 50 cm gider. 50 × 10 = 500.'}
 ]}
]},
{id:'m3',field:'mekanik',icon:'tools',title:'Mekanizmalar',desc:'Robot topu nasıl alır, atar, kaldırır? Havayla çalışan pistonlar.',badge:'Mekanizma Tasarımcısı',
 guide:[{h:'Robot ne yapar?',p:'Her yıl yeni bir oyun olur. Robot oyun parçasını yerden alır (toplayıcı), fırlatır (fırlatıcı) ya da yukarı koyar (asansör, kol). Bu parçalara mekanizma denir.'},
        {h:'Pnömatik',p:'Pnömatik, sıkıştırılmış havayla çalışan sistemdir. Hava bir pistonu hızla iter. Basıncın birimi psi. Kuralda en fazla 120 psi hava saklanır, pistonlarda en fazla 60 psi kullanılır.'}],
 lessons:[
 {id:'fm5',title:'Topla, taşı, fırlat',ex:[
  {t:'info',fig:'mekanizma',h:'Mekanizmalar',p:'<b>Toplayıcı</b> oyun parçasını yerden alır. <b>Fırlatıcı</b> parçayı hızla dönen tekerleklerle atar. <b>Asansör</b> yukarı aşağı gider. <b>Kol</b> bir noktada dönerek kalkar. <b>Tırmanıcı</b> robotu yukarı çeker.'},
  {t:'match',q:'Mekanizmaları görevleriyle eşleştir.',pairs:[['Toplayıcı','Parçayı yerden alır'],['Fırlatıcı','Parçayı uzağa atar'],['Asansör','Yukarı aşağı gider'],['Tırmanıcı','Robotu yukarı çeker']]},
  {t:'mc',q:'Fırlatıcının tekerlekleri daha hızlı dönerse top ne olur?',opts:['Daha uzağa gider','Daha kısa gider','Hiç değişmez'],a:0,tip:'Tekerlek topa daha çok hız verir. Top daha uzağa gider.'},
  {t:'mc',q:'Toplayıcının silindirleri neden kauçuktur?',opts:['Parçayı kavrayıp içeri çekmek için','Süs olması için','Ses çıkarması için'],a:0,tip:'Kauçuk kaymaz. Topu tutup içeri çeker.'},
  {t:'order',q:'Bir mekanizma yapmanın adımlarını sırala.',lines:true,plain:true,items:['Oyunun kurallarını oku','Fikirleri çiz ve tartış','Kartondan deneme modeli (prototip) yap','Dene, ölç ve geliştir','Son parçayı üret']},
  {t:'mc',q:'Prototip (deneme modeli) neden yapılır?',opts:['Fikri ucuza ve çabuk denemek için','Robotu ağırlaştırmak için','Hakemlere göstermek için'],a:0,tip:'Karton ucuzdur. Pahalı metali kesmeden önce fikrin çalışıp çalışmadığını görürsün.'}
 ]},
 {id:'fm6',title:'Pnömatik: havayla güç',ex:[
  {t:'info',fig:'pnomatik',h:'Havayla çalışan güç',p:'<b>Kompresör</b> havayı sıkıştırıp <b>hava tankına</b> doldurur. <b>Valf</b> bir kapı gibidir. Elektrikle açılır ve havayı <b>pistona</b> gönderir. Piston bir anda ileri ya da geri gider. Bisiklet pompası gibi düşün!'},
  {t:'order',q:'Havanın yolunu sırala.',lines:true,plain:true,items:['Kompresör havayı sıkıştırır','Hava tankta birikir','Basınç düşürücü basıncı azaltır','Valf açılır','Piston ileri gider']},
  {t:'match',q:'Pnömatik parçaları görevleriyle eşleştir.',pairs:[['Kompresör','Havayı sıkıştırır'],['Hava tankı','Sıkışmış havayı saklar'],['Valf','Havayı pistona gönderir'],['Piston','İleri geri gider']]},
  {t:'mc',q:'Kurallara göre pistonlarda en fazla kaç psi kullanılır?',opts:['60 psi','120 psi','500 psi'],a:0,tip:'Tankta en fazla 120 psi saklanır. Basınç düşürücü bunu pistonlar için 60 psi\'ye indirir.'},
  {t:'mc',q:'Pnömatik sisteme dokunmadan önce ne yapılmalı?',opts:['Havayı boşaltıp basıncın sıfır olduğunu görmek','Kompresörü açık bırakmak','Pistonu elle tutmak'],a:0,tip:'Basınçlı hava tehlikelidir. Önce tahliye vanasıyla basınç boşaltılır.'},
  {t:'mc',q:'Piston hangi iş için uygundur?',opts:['Bir kapağı hızla açıp kapamak','Tekerleği sürekli döndürmek','Kolu yavaşça istenen açıya getirmek'],a:0,tip:'Piston ileri geri hızlı gider. Sürekli dönmek için motor gerekir.'}
 ]}
]},
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

/* Ders listeleri, sözlük ve kimlikler js/dersler.js içinde kurulur (temel ünite dosyalarından sonra). */
/* FRC sözlüğü: ünite kimliğiyle eklenir */
[['m1',[['Şasi','Robotun iskeleti. Tekerlekler ve mekanizmalar şasiye bağlanır.'],['Kutu profil','İçi boş, kare kesitli alüminyum çubuk. Hafif ve sağlamdır.'],['Tampon (bumper)','Robotun çevresindeki köpüklü koruma. Rengi ittifakı gösterir.'],['Kilitli somun','İçindeki naylon halka sayesinde titreşimde gevşemeyen somun.']]],
 ['m2',[['Tork','Döndürme gücü. Dişli oranı büyüdükçe tork artar.'],['Dişli oranı','Çevrilen dişlinin diş sayısı ÷ çeviren dişlinin diş sayısı.','48 ÷ 12 = 4'],['Swerve','Her tekerleğin kendi yönüne döndüğü sürüş sistemi.'],['Mecanum','Çapraz makaralı tekerlek. Robotun yana kaymasını sağlar.']]],
 ['m3',[['Toplayıcı (intake)','Oyun parçasını yerden alan mekanizma.'],['Fırlatıcı (shooter)','Hızla dönen tekerleklerle parçayı fırlatan mekanizma.'],['Prototip','Fikri denemek için yapılan hızlı ve ucuz ilk örnek.'],['Selenoid valf','Elektrikle açılıp kapanan, havayı pistona yönlendiren valf.']]],
 ['e1',[['Ana şalter','Robotun büyük açma-kapama düğmesi. Tehlikede elektriği keser.','Evdeki ana elektrik düğmesi gibi'],['Güç dağıtım panosu','Aküden gelen elektriği bütün parçalara paylaştıran kutu.'],['Sigorta','Çok fazla elektrik geçince atıp yolu kesen koruyucu.','Evde sigorta atması'],['Volt','Elektriğin ne kadar güçlü itildiğini gösteren sayı.','Su borusundaki basınç gibi'],['Amper','Akan elektriğin miktarı.','Borudan akan su miktarı gibi'],['Watt','Cihazın gücü. Volt ile amperi çarparsın.','12 × 40 = 480 watt']]],
 ['e2',[['roboRIO','Robotun beyni olan küçük bilgisayar. Takımın kodu onda çalışır.'],['Motor sürücü','Motorun gaz pedalı gibi. Beynin emrine göre motora elektrik verir.'],['CAN hattı','Robot parçalarının birbirleriyle konuştuğu telefon hattı. Sarı ve yeşil kablolarla yapılır.'],['Enkoder','Tur sayan sensör.','Bisikletin kilometre sayacı gibi'],['Jiroskop','Robotun yönünü bilen sensör.','Telefonu çevirince ekranın dönmesi']]],
 ['e3',[['AWG','Kablonun kalınlık numarası. Sayı küçüldükçe kablo kalınlaşır.'],['Arıza bulma','Robot bozulunca elektriğin yolunu baştan sona kontrol edip sorunu bulmak.'],['RSL','Robotun turuncu ışığı. Yanıp sönüyorsa robot uyanıktır.']]]
].forEach(([uid,items])=>{const ui=U.findIndex(u=>u.id===uid);if(ui>=0)items.forEach(([t,d,c])=>GLOSS.push(c?{u:ui,t,d,c}:{u:ui,t,d}))});
