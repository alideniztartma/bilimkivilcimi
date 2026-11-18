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
 guide:[{h:'Girdi, işlem, çıktı',p:'Her program girdi alır, bir işlem yapar ve çıktı verir. Robotta girdi sensörlerden gelir, çıktı motorlara gider.'},
        {h:'Algıla, karar ver, hareket et',p:'Robot programı bu üç işi sürekli tekrar eder. FRC robotları bu döngüyü saniyede 50 kez çalıştırır.'}],
 lessons:[
 {id:'yz1',title:'Program nasıl çalışır?',desc:'Girdi, işlem ve çıktı. Kodu okuyup sonucunu bulma.',ex:[
  {t:'info',fig:'gio',h:'Girdi, işlem, çıktı',p:'Her program üç adımda çalışır: <b>girdi</b> alır, bir <b>işlem</b> yapar ve bir <b>çıktı</b> verir. Hesap makinesinde bastığın sayılar girdi, toplama işlem, ekranda gördüğün sonuç ise çıktıdır.'},
  {t:'match',q:'Kavramları anlamlarıyla eşleştir.',pairs:[['Girdi','Klavyeden yazılan sayı'],['İşlem','Sayıları toplamak'],['Çıktı','Ekranda görünen sonuç'],['Hata','Programdaki yanlış']]},
  {t:'mc',q:'Robotun kamerası bir top gördü. Bu bilgi program için nedir?',opts:['Girdi','Çıktı','İşlem'],a:0,tip:'Programa dışarıdan gelen her bilgi girdidir.'},
  {t:'order',q:'Hesap makinesi programının adımlarını sırala.',lines:true,plain:true,items:['İki sayıyı al','Sayıları topla','Sonucu ekrana yaz']},
  {t:'info',h:'Kodu adım adım oku',p:'Bilgisayar satırları yukarıdan aşağıya sırayla yapar. <b>sayı = sayı + 3</b> satırı, "sayının eski değerine 3 ekle ve yeniden kaydet" demektir.'},
  {t:'type',q:'Bu program ekrana ne yazar?',code:'sayı = 4\nsayı = sayı + 3\nyaz(sayı)',a:['7','yedi']},
  {t:'line',q:'Program 10 yazmalı ama 2 yazıyor. Hangi satır hatalı?',lines:['a = 6','b = 4','toplam = a - b','yaz(toplam)'],a:[2],tip:'Toplamak için eksi değil artı kullanılmalı.'},
  {t:'mc',q:'Bir programa aynı girdiyi iki kez verirsen ne olur?',opts:['İki seferde de aynı çıktıyı verir','Her seferinde başka bir şey yapar','İkinci seferde çalışmaz'],a:0,tip:'Bilgisayar her seferinde aynı adımları aynı sırayla yapar.'}
 ]},
 {id:'yz2',title:'Robot yazılımı: algıla, karar ver, hareket et',desc:'Sensör okuma, "eğer" ile karar verme ve sürekli dönen döngü.',ex:[
  {t:'info',fig:'sdh',h:'Robotun üç işi',p:'Bir robot programı sürekli üç işi tekrar eder: <b>algılar</b> (sensörden okur), <b>karar verir</b> ("eğer … ise") ve <b>hareket eder</b> (motoru çalıştırır). FRC robotları bu döngüyü saniyede 50 kez yapar.'},
  {t:'match',q:'Robotun parçalarını görevleriyle eşleştir.',pairs:[['Sensör','Çevreyi ölçer'],['Motor','Robotu hareket ettirir'],['Eğer','Karar verir'],['Döngü','İşi sürekli tekrarlar']]},
  {t:'fill',q:'Engel yakınsa robot durmalı. Boşluğu doldur.',code:'Sürekli tekrarla:\n    mesafe = sensörü oku\n    ___ mesafe < 20:\n        Motoru durdur',opts:['Eğer','Tekrarla','Yaz'],a:0},
  {t:'mc',q:'Mesafe sensörü 50 cm gösteriyor. Programda "Eğer mesafe < 20 ise dur" yazıyor. Robot ne yapar?',opts:['Gitmeye devam eder','Durur','Geri döner'],a:0,tip:'50, 20\'den küçük değil. Koşul doğru olmadığı için robot durmaz.'},
  {t:'order',q:'Çizgi izleyen robotun programını sırala.',lines:true,items:['Sürekli tekrarla:','    Işık sensörünü oku','    Eğer çizgi soldaysa:','        Sola dön','    Değilse:','        Sağa dön']},
  {t:'type',q:'Robotun döngüsü saniyede 50 kez çalışıyor. 2 saniyede kaç kez çalışır?',a:['100','yüz']}
 ]}]},
/* ===== MEKANİK (FRC) ===== */
{id:'m1',field:'mekanik',icon:'box',title:'Robotun iskeleti',desc:'Bir FRC robotu neyden ve nasıl yapılır?',badge:'Şasi Ustası',
 guide:[{h:'Şasi',p:'Robotun iskeletine şasi denir. Tekerlekler, motorlar ve bütün mekanizmalar şasiye bağlanır.'},
        {h:'Hafif ve sağlam',p:'FRC robotlarında genellikle içi boş alüminyum kutu profil kullanılır. Hem hafif hem sağlamdır. Robotun bir ağırlık sınırı vardır, bu yüzden her gram önemlidir.'},
        {h:'Önce güvenlik',p:'Atölyede ve pitte koruyucu gözlük takmak zorunludur. Ölç, iki kez kontrol et, sonra kes.'}],
 lessons:[
 {id:'fm1',title:'FRC robotu neyden yapılır?',ex:[
  {t:'info',fig:'sasi',h:'Robotun iskeleti: şasi',p:'Bir FRC robotunun iskeletine <b>şasi</b> denir. Tekerlekler, motorlar ve bütün mekanizmalar şasiye takılır. Şasi çoğunlukla içi boş <b>alüminyum kutu profillerden</b> yapılır.'},
  {t:'mc',q:'FRC şasilerinde içi boş alüminyum profil neden çok kullanılır?',opts:['Hem hafif hem sağlam olduğu için','Paslanıp güzel göründüğü için','Mıknatısa yapıştığı için'],a:0,tip:'Robotun bir ağırlık sınırı var. Alüminyum hafiftir, kutu şekli de onu sağlam yapar.'},
  {t:'match',q:'Malzemeleri kullanıldıkları yerlerle eşleştir.',pairs:[['Alüminyum profil','Şasi ve kollar'],['Polikarbonat','Şeffaf, kırılmaz koruyucu'],['Civata ve somun','Parçaları sökülebilir bağlar'],['Perçin','Parçaları kalıcı bağlar']]},
  {t:'info',fig:'tampon',h:'Tampon (bumper)',p:'Her FRC robotunun çevresinde kumaş kaplı, köpüklü <b>tamponlar</b> bulunur. Tamponlar çarpışmada robotu ve rakibi korur. Rengi takımın ittifakını gösterir: <b>kırmızı</b> ya da <b>mavi</b>.'},
  {t:'mc',q:'Tamponların rengi neyi gösterir?',opts:['Robotun hangi ittifakta olduğunu','Robotun ne kadar hızlı olduğunu','Takımın hangi ülkeden geldiğini'],a:0},
  {t:'mc',q:'Yarışmada robotun ağırlığı neden önemlidir?',opts:['Kurallarda bir ağırlık sınırı olduğu için','Ağır robot her zaman kaybettiği için','Hakemler robotları elle taşıdığı için'],a:0,tip:'Her sezonun kurallarında robotun en fazla ne kadar ağır olabileceği yazar. Sınırı aşan robot yarışamaz.'},
  {t:'type',q:'Bir robot parçası 2.400 gram. Bu kaç kilogramdır? (sadece sayıyı yaz)',a:['2,4','2.4']}
 ]},
 {id:'fm2',title:'Bağlantı ve montaj',ex:[
  {t:'info',fig:'montaj',h:'Parçaları birleştirmek',p:'Robot parçaları <b>civata ve somunla</b> (sonra sökülebilir) ya da <b>perçinle</b> (kalıcı) birleştirilir. Robot maçta çok sarsılır, bu yüzden somunlar gevşememelidir.'},
  {t:'mc',q:'Robot titreşirken somunun gevşememesi için ne kullanılır?',opts:['Kilitli (naylon halkalı) somun','Daha uzun civata','Bant'],a:0,tip:'Kilitli somunun içindeki naylon halka civatayı sıkıca kavrar. Vida sabitleyici sıvı da aynı işi yapar.'},
  {t:'order',q:'Bir alüminyum profili delip bağlamanın adımlarını sırala.',lines:true,plain:true,items:['Koruyucu gözlüğü tak','Delik yerini ölç ve işaretle','Matkapla del','Çapakları temizle','Civatayı tak ve sık']},
  {t:'mc',q:'Atölyede ve pitte hangisi her zaman zorunludur?',opts:['Koruyucu gözlük takmak','Eldivenle matkap kullanmak','Takım tişörtü giymek'],a:0,tip:'FRC etkinliklerinde pitte herkes koruyucu gözlük takar. Matkap kullanırken eldiven takılmaz, çünkü eldiven dönen parçaya takılabilir.'},
  {t:'match',q:'Aletleri işleriyle eşleştir.',pairs:[['Alyan anahtarı','Altıgen başlı civatayı sıkar'],['Matkap','Delik açar'],['Perçin tabancası','Perçin çakar'],['Kumpas','Hassas ölçer']]},
  {t:'line',q:'Montaj adımlarında hangisi yanlış?',lines:['Ölçüleri iki kez kontrol et','Parçayı mengeneye sabitle','Eldiven takıp matkabı çalıştır','Deliği aç ve çapağını al'],a:[2],plain:true,tip:'Dönen aletlerle çalışırken eldiven takılmaz.'}
 ]}
]},
{id:'m2',field:'mekanik',icon:'gear',title:'Hareket ve güç aktarımı',desc:'Motorlar, dişliler, zincirler ve sürüş sistemleri.',badge:'Güç Aktarıcı',
 guide:[{h:'Hız mı, güç mü?',p:'Bir motor hem çok hızlı hem çok güçlü dönemez. Dişlilerle hızdan vazgeçip güç (tork) kazanırız, ya da tersini yaparız.'},
        {h:'Dişli oranı',p:'Dişli oranı = çevrilen dişlinin diş sayısı ÷ çeviren dişlinin diş sayısı. Oran 4 ise çıkış 4 kat yavaş ama 4 kat güçlü döner.'},
        {h:'Sürüş sistemleri',p:'Tank sürüş basit ve güçlüdür. Mecanum tekerlekler yana kaymayı sağlar. Swerve sistemde her tekerlek kendi yönünü değiştirir.'}],
 lessons:[
 {id:'fm3',title:'Motorlar, dişliler ve tork',ex:[
  {t:'info',h:'Tork nedir?',p:'<b>Tork</b>, bir şeyi döndürme gücüdür. Robot motorları çok hızlı döner ama torku azdır. Bu yüzden motorla tekerlek arasına bir <b>dişli kutusu</b> (redüktör) konur.'},
  {t:'mc',fig:'disli',q:'Küçük bir dişli büyük bir dişliyi çevirirse büyük dişli nasıl döner?',opts:['Daha yavaş ama daha güçlü','Daha hızlı ama daha güçsüz','Aynı hızda'],a:0},
  {t:'info',fig:'disli',h:'Dişli oranı',p:'<b>Dişli oranı = çevrilen dişlinin diş sayısı ÷ çeviren dişlinin diş sayısı.</b> Motor 12 dişli bir dişliyi, o da 48 dişli bir dişliyi çeviriyorsa oran 48 ÷ 12 = 4 olur.'},
  {t:'fill',q:'Motordaki dişli 10 dişli, tekerleğe giden dişli 50 dişli. Oran kaçtır?',code:'50 ÷ 10 = ___',opts:['5','40','60'],a:0},
  {t:'type',q:'Motor dakikada 6.000 tur dönüyor. Dişli oranı 6 ise tekerlek dakikada kaç tur döner? (sadece sayıyı yaz)',a:['1000','1.000','bin']},
  {t:'mc',q:'Robot ağır bir kolu kaldıracak. Dişli oranı nasıl olmalı?',opts:['Büyük oran: yavaş ama güçlü','Küçük oran: hızlı ama güçsüz','Dişli olmadan doğrudan motor'],a:0,tip:'Ağır yük kaldırmak için tork gerekir. Büyük dişli oranı torku artırır.'},
  {t:'match',q:'Güç aktarma parçalarını görevleriyle eşleştir.',pairs:[['Dişli kutusu','Hızı düşürür, torku artırır'],['Mil','Dönmeyi taşır'],['Rulman','Milin rahat dönmesini sağlar'],['Motor','Elektrikle dönme üretir']]}
 ]},
 {id:'fm4',title:'Zincir, kayış ve sürüş sistemleri',ex:[
  {t:'info',fig:'zincir',h:'Uzağa güç taşımak',p:'Motor her zaman tekerleğin yanında olmaz. Dönmeyi uzaktaki bir mile <b>zincir</b> ya da <b>kayışla</b> taşırız. Bisikletteki zincir de aynı işi yapar.'},
  {t:'mc',q:'Bisikletin pedalındaki dişli 40, arka dişli 20 dişli. Pedal 1 tur dönünce arka tekerlek kaç tur döner?',opts:['2','1','20'],a:0,tip:'40 ÷ 20 = 2. Büyük dişli küçüğü çevirdiği için arka dişli 2 tur döner.'},
  {t:'info',fig:'surus',h:'Sürüş sistemleri',p:'<b>Tank sürüş</b>: iki yanda tekerlekler, sağlam ve basit. <b>Mecanum</b>: çapraz makaralı tekerlekler, robot yana kayabilir. <b>Swerve</b>: her tekerlek kendi yönünü çevirir, robot her yöne gidip dönebilir.'},
  {t:'match',q:'Sürüş sistemlerini özellikleriyle eşleştir.',pairs:[['Tank sürüş','Basit ve itmede güçlü'],['Mecanum','Çapraz makaralarla yana kayar'],['Swerve','Her tekerlek kendi yönüne döner']]},
  {t:'mc',fig:'surus',q:'Robotun yönünü değiştirmeden sağa doğru kayması gerekiyor. Hangi sistem bunu yapamaz?',opts:['Tank sürüş','Mecanum','Swerve'],a:0},
  {t:'mc',q:'Zincir neden gevşek bırakılmamalıdır?',opts:['Dişliden atlayıp çıkabilir','Daha hızlı döner','Robot hafifler'],a:0,tip:'Gevşek zincir dişlinin üstünden atlar. Bu yüzden zincir gerdirici kullanılır.'},
  {t:'type',q:'Tekerleğin çevresi 50 cm. Tekerlek 10 tur dönerse robot kaç cm gider? (sadece sayıyı yaz)',a:['500','beş yüz']}
 ]}
]},
{id:'m3',field:'mekanik',icon:'tools',title:'Mekanizmalar',desc:'Toplayıcı, fırlatıcı, asansör, kol ve pnömatik.',badge:'Mekanizma Tasarımcısı',
 guide:[{h:'Oyun parçasıyla ne yapacağız?',p:'Her sezon yeni bir oyun gelir. Mekanizmalar oyun parçasını yerden almak (toplayıcı), taşımak, fırlatmak (fırlatıcı) ya da yükseğe koymak (asansör, kol) için tasarlanır.'},
        {h:'Pnömatik',p:'Sıkıştırılmış havayla çalışan pistonlar hızlı ve güçlü itiş yapar. FRC kurallarında depolanan hava en fazla 120 psi, çalışma basıncı en fazla 60 psi olabilir.'}],
 lessons:[
 {id:'fm5',title:'Topla, taşı, fırlat',ex:[
  {t:'info',fig:'mekanizma',h:'Mekanizmalar',p:'<b>Toplayıcı</b> (intake) oyun parçasını yerden alır. <b>Fırlatıcı</b> (shooter) hızla dönen tekerleklerle parçayı fırlatır. <b>Asansör</b> (elevator) yukarı aşağı, <b>kol</b> (arm) bir eksen etrafında döner. <b>Tırmanıcı</b> (climber) robotu askıya kaldırır.'},
  {t:'match',q:'Mekanizmaları görevleriyle eşleştir.',pairs:[['Toplayıcı','Parçayı yerden alır'],['Fırlatıcı','Parçayı uzağa atar'],['Asansör','Dikey olarak yükselir'],['Tırmanıcı','Robotu askıya kaldırır']]},
  {t:'mc',q:'Fırlatıcıdaki tekerleklerin hızı artarsa top ne olur?',opts:['Daha uzağa gider','Daha kısa gider','Hiç değişmez'],a:0},
  {t:'mc',q:'Toplayıcı silindirleri neden genellikle yumuşak, kauçuk kaplıdır?',opts:['Parçayı kavrayıp içeri çekmek için','Robotu süslemek için','Elektriği iletmek için'],a:0},
  {t:'order',q:'Bir tasarım sürecini sırala.',lines:true,plain:true,items:['Oyunun kurallarını oku','Fikirleri çiz ve tartış','Karton ya da tahtadan prototip yap','Dene, ölç ve geliştir','Son parçayı üret']},
  {t:'mc',q:'Prototip neden yapılır?',opts:['Fikri ucuz ve hızlı denemek için','Robotu ağırlaştırmak için','Hakemlere göstermek için'],a:0,tip:'Kartondan ya da tahtadan prototip, pahalı alüminyumu kesmeden önce fikrin işe yarayıp yaramadığını gösterir.'}
 ]},
 {id:'fm6',title:'Pnömatik: havayla güç',ex:[
  {t:'info',fig:'pnomatik',h:'Havayla çalışan güç',p:'<b>Kompresör</b> havayı sıkıştırıp <b>hava tankına</b> doldurur. <b>Selenoid valf</b> elektrikle açılıp kapanır ve havayı <b>pistona</b> gönderir. Piston bir anda ileri ya da geri itilir.'},
  {t:'order',q:'Havanın yolunu sırala.',lines:true,plain:true,items:['Kompresör havayı sıkıştırır','Hava tankta birikir','Basınç düşürücü basıncı ayarlar','Selenoid valf açılır','Piston ileri itilir']},
  {t:'match',q:'Pnömatik parçaları görevleriyle eşleştir.',pairs:[['Kompresör','Havayı sıkıştırır'],['Hava tankı','Sıkışmış havayı saklar'],['Selenoid valf','Havayı yönlendirir'],['Piston','İtip çeker']]},
  {t:'mc',q:'FRC kurallarına göre pistonların çalışma basıncı en fazla kaç psi olabilir?',opts:['60 psi','120 psi','500 psi'],a:0,tip:'Tankta en fazla 120 psi saklanır. Basınç düşürücü bunu pistonlar için en fazla 60 psi\'ye indirir.'},
  {t:'mc',q:'Pnömatik sistemde çalışmadan önce ne yapılmalı?',opts:['Havayı boşaltıp basıncın sıfır olduğunu görmek','Kompresörü açık bırakmak','Pistonu elle tutmak'],a:0,tip:'Basınçlı hava tehlikelidir. Önce tahliye vanasıyla basınç boşaltılır.'},
  {t:'mc',q:'Hangi iş için piston daha uygundur?',opts:['Bir kapağı hızla açıp kapamak','Tekerleği sürekli döndürmek','Kolu yavaşça istenen açıya getirmek'],a:0,tip:'Piston iki konumlu, hızlı hareketlerde iyidir. Sürekli dönme ve hassas konum için motor kullanılır.'}
 ]}
]},
/* ===== ELEKTRONİK (FRC) ===== */
{id:'e1',field:'elektronik',icon:'bolt',title:'Robotun güç sistemi',desc:'Akü, ana şalter, güç dağıtımı ve sigortalar.',badge:'Güç Ustası',
 guide:[{h:'Güç yolu',p:'Akü → ana şalter → güç dağıtım panosu → sigortalar → motor sürücüler ve diğer cihazlar.'},
        {h:'Renkler',p:'Kırmızı kablo artı (+), siyah kablo eksi (−) tarafıdır. Renkleri karıştırmak cihazları yakabilir.'},
        {h:'Güç formülü',p:'Güç (watt) = Gerilim (volt) × Akım (amper). 12 V ile 40 A çeken bir motor 480 W güç kullanır.'}],
 lessons:[
 {id:'fe1',title:'Güç nereden gelir?',ex:[
  {t:'info',fig:'guc',h:'Robotun enerjisi',p:'FRC robotu <b>12 voltluk bir aküyle</b> çalışır. Akünün gücü önce <b>ana şaltere</b> (120 amperlik ana sigorta ve açma-kapama düğmesi), sonra <b>güç dağıtım panosuna</b> gelir. Pano gücü sigortalarla bütün cihazlara dağıtır.'},
  {t:'order',q:'Elektriğin aküden motora yolunu sırala.',lines:true,plain:true,items:['Akü','Ana şalter','Güç dağıtım panosu','Sigorta','Motor sürücü','Motor']},
  {t:'mc',q:'Ana şalterin görevi nedir?',opts:['Robotu açıp kapatmak ve aşırı akımda gücü kesmek','Kodu çalıştırmak','Motorların hızını ölçmek'],a:0},
  {t:'match',q:'Kablo renklerini anlamlarıyla eşleştir.',pairs:[['Kırmızı','Artı (+)'],['Siyah','Eksi (−)'],['Sarı ve yeşil','CAN haberleşme hattı']]},
  {t:'info',h:'Sigortalar',p:'Her motorun hattında bir <b>sigorta</b> (devre kesici) vardır. Bir motor sıkışıp fazla akım çekerse sigorta atar ve kabloların ısınıp yanmasını önler. Sürüş motorları için genellikle <b>40 amperlik</b> sigortalar kullanılır.'},
  {t:'mc',q:'Bir motor sıkışıp çok fazla akım çekerse ne olur?',opts:['Sigorta atar ve hattı korur','Akü daha çok şarj olur','Robot daha hızlı gider'],a:0},
  {t:'fill',q:'Motor 12 voltla 40 amper çekiyor. Kaç watt güç kullanır?',code:'Güç = 12 × 40 = ___ W',opts:['480','52','300'],a:0}
 ]},
 {id:'fe2',title:'Robotun beyni ve haberleşme',ex:[
  {t:'info',fig:'beyin',h:'roboRIO: robotun beyni',p:'Takımın yazdığı kod <b>roboRIO</b> adlı bilgisayarda çalışır. roboRIO sensörleri okur, karar verir ve motor sürücülere komut gönderir. Sürücü, <b>Sürücü İstasyonu</b> (Driver Station) bilgisayarından robota <b>radyo</b> ile bağlanır.'},
  {t:'match',q:'Kontrol sistemini görevleriyle eşleştir.',pairs:[['roboRIO','Kodu çalıştırır'],['Radyo','Kablosuz bağlantı kurar'],['Sürücü İstasyonu','Sürücünün bilgisayarı'],['Kumanda','Sürücünün robotu yönettiği cihaz']]},
  {t:'info',fig:'rsl',h:'Robot sinyal ışığı',p:'Her robotta turuncu bir <b>Robot Sinyal Işığı</b> (RSL) bulunur. Işık sabit yanıyorsa robot açık ama <b>devre dışıdır</b>. Yanıp sönüyorsa robot <b>etkindir</b> ve hareket edebilir. Robota yaklaşmadan önce bu ışığa bakılır.'},
  {t:'mc',fig:'rsl',q:'Robot sinyal ışığı yanıp sönüyor. Bu ne demek?',opts:['Robot etkin, hareket edebilir','Robot kapalı','Akü bitti'],a:0,tip:'Yanıp sönen ışık "dikkat, robot çalışıyor" demektir. Robota dokunmadan önce devre dışı bırakılır.'},
  {t:'order',q:'Robotu çalıştırma adımlarını sırala.',lines:true,plain:true,items:['Dolu aküyü tak','Ana şalteri aç','Radyonun bağlanmasını bekle','Sürücü İstasyonundan robotu etkinleştir']},
  {t:'mc',q:'roboRIO motorlara doğrudan güç verir mi?',opts:['Hayır, motor sürücülere komut gönderir','Evet, bütün akım roboRIO\'dan geçer','Evet, ama yalnızca maç başında'],a:0,tip:'roboRIO "ne kadar hızlı" komutunu verir. Güçlü akımı motor sürücü aküden alıp motora iletir.'}
 ]}
]},
{id:'e2',field:'elektronik',icon:'chip',title:'Motorlar ve sensörler',desc:'Motor sürücüler, CAN hattı ve robotun duyuları.',badge:'Sensör Avcısı',
 guide:[{h:'Motor sürücü',p:'roboRIO\'dan gelen komuta göre motora ne kadar güç gideceğini ayarlar. Motoru ileri, geri, hızlı ya da yavaş döndürür.'},
        {h:'CAN hattı',p:'Cihazlar sarı ve yeşil kablolarla bir zincir gibi sırayla birbirine bağlanır. Her cihazın kendi numarası (kimliği) vardır.'},
        {h:'Sensörler',p:'Enkoder dönmeyi, jiroskop robotun yönünü, sınır anahtarı bir parçanın sona geldiğini, kamera hedefleri algılar.'}],
 lessons:[
 {id:'fe3',title:'Motor sürücüler ve CAN hattı',ex:[
  {t:'info',h:'Motor sürücü',p:'<b>Motor sürücü</b> (motor kontrolcüsü), roboRIO\'dan gelen "yüzde 50 hızla ileri" gibi komutları alır ve aküden gelen gücü buna göre motora verir. Her motorun kendi sürücüsü vardır.'},
  {t:'mc',q:'roboRIO bir motora "−1" gücü gönderirse motor ne yapar?',opts:['Tam güçle geri döner','Durur','Tam güçle ileri döner'],a:0,tip:'Güç −1 ile +1 arasında verilir. 0 durmak, +1 tam ileri, −1 tam geri demektir.'},
  {t:'info',fig:'can',h:'CAN hattı',p:'Motor sürücüler, güç panosu ve bazı sensörler <b>CAN</b> adlı bir haberleşme hattıyla bağlanır. Cihazlar <b>sarı ve yeşil</b> kablolarla bir zincir gibi sırayla bağlanır. Her cihaza ayrı bir <b>kimlik numarası</b> verilir.'},
  {t:'mc',q:'İki motor sürücüye yanlışlıkla aynı CAN kimliği verilirse ne olur?',opts:['Komutlar karışır, robot doğru çalışmaz','Robot iki kat hızlı gider','Hiçbir şey olmaz'],a:0},
  {t:'line',q:'CAN zincirinde kopukluk var. Hangi cihazdan sonraki cihazlar haber alamaz?',lines:['roboRIO','Motor sürücü 1','Motor sürücü 2  ✂ kablo kopuk','Motor sürücü 3','Güç dağıtım panosu'],a:[2],plain:true,tip:'Zincir motor sürücü 2\'den sonra koptuğu için ondan sonraki cihazlara mesaj gitmez.'},
  {t:'match',q:'Değerleri anlamlarıyla eşleştir.',pairs:[['+1','Tam güç ileri'],['0','Dur'],['−1','Tam güç geri'],['0,5','Yarım güç ileri']]}
 ]},
 {id:'fe4',title:'Sensörler: robotun duyuları',ex:[
  {t:'info',fig:'sensor',h:'Robotun duyuları',p:'<b>Enkoder</b> bir milin kaç tur döndüğünü sayar; böylece robot ne kadar yol gittiğini bilir. <b>Jiroskop</b> robotun ne kadar döndüğünü ölçer. <b>Sınır anahtarı</b> bir kol en uca gelince basılır. <b>Kamera</b> sahadaki hedefleri görür.'},
  {t:'match',q:'Sensörleri ölçtükleriyle eşleştir.',pairs:[['Enkoder','Kaç tur dönüldüğü'],['Jiroskop','Robotun yönü'],['Sınır anahtarı','Parçanın sona gelmesi'],['Kamera','Sahadaki hedefler']]},
  {t:'mc',q:'Otonom bölümde robotun tam 3 metre gitmesi gerekiyor. Hangi sensör en çok işe yarar?',opts:['Tekerlek enkoderi','Sınır anahtarı','Hiçbiri, süreyi tahmin ederiz'],a:0,tip:'Enkoder tekerleğin kaç tur döndüğünü sayar. Tur sayısı × tekerlek çevresi = gidilen yol.'},
  {t:'fill',q:'Asansör en üste gelince motor durmalı. Boşluğu doldur.',code:'Eğer ___ basıldıysa:\n    Asansör motorunu durdur',opts:['üst sınır anahtarı','kamera','jiroskop'],a:0},
  {t:'type',q:'Tekerlek çevresi 0,5 metre. Enkoder 6 tur sayıyor. Robot kaç metre gitti? (sadece sayıyı yaz)',a:['3','üç']},
  {t:'mc',q:'Robot 90 derece sağa dönmeli. Hangi sensör dönüşü ölçer?',opts:['Jiroskop','Sınır anahtarı','Enkoder sayısı ile sadece tahmin'],a:0}
 ]}
]},
{id:'e3',field:'elektronik',icon:'bulb',title:'Güvenli kablolama ve arıza bulma',desc:'Kablo kalınlığı, akü bakımı ve sorun çözme.',badge:'Kablo Ustası',
 guide:[{h:'Kalın kablo, çok akım',p:'Çok akım taşıyan kablo kalın olmalıdır. Kablo kalınlığı AWG ile gösterilir: sayı küçüldükçe kablo kalınlaşır.'},
        {h:'Arıza bulma',p:'Sorun olduğunda akımın yolunu baştan sona takip et: akü, ana şalter, sigorta, kablo, sürücü, motor.'}],
 lessons:[
 {id:'fe5',title:'Kablo kalınlığı ve akü bakımı',ex:[
  {t:'info',fig:'awg',h:'AWG: kablo kalınlığı',p:'Kablo kalınlığı <b>AWG</b> sayısıyla gösterilir. Dikkat: <b>sayı küçüldükçe kablo kalınlaşır</b>. Aküden ana panoya giden kablolar çok kalındır (6 AWG). 40 amperlik motor hatlarında 12 AWG kablo kullanılır.'},
  {t:'mc',fig:'awg',q:'Hangisi daha kalın bir kablodur?',opts:['6 AWG','12 AWG','22 AWG'],a:0,tip:'AWG sayısı küçüldükçe kablo kalınlaşır.'},
  {t:'mc',q:'İnce bir kablodan çok fazla akım geçerse ne olur?',opts:['Kablo ısınır, erir ya da yanabilir','Robot hızlanır','Akü dolar'],a:0},
  {t:'info',fig:'aku',h:'Akü bakımı',p:'Tam dolu bir akü 12,5 voltun üstünde görünür. Maçtan önce aküyü ölçün. Aküyü düşürmeyin, kablolarını çekerek taşımayın. Kablo uçları gevşek olmamalıdır: hafifçe çekerek kontrol edin.'},
  {t:'mc',q:'Maçtan önce akü ölçüldü: 11,6 volt. Ne yapılmalı?',opts:['Dolu bir aküyle değiştirmek','Olduğu gibi maça çıkmak','Aküyü sallamak'],a:0,tip:'Düşük voltajlı aküyle robot yavaşlar ve roboRIO kapanabilir.'},
  {t:'match',q:'Durumları doğru davranışla eşleştir.',pairs:[['Kablo ucu gevşek','Yeniden sıkıştır'],['Kablo yalıtımı yırtık','Kabloyu değiştir'],['Akü düşük','Şarja tak'],['Kablo hareketli parçaya yakın','Kelepçeyle uzaklaştır']]}
 ]},
 {id:'fe6',title:'Robot hareket etmiyor! Arıza bulma',ex:[
  {t:'info',fig:'ariza',h:'Dedektif gibi düşün',p:'Robot çalışmıyorsa paniğe gerek yok. Elektriğin yolunu <b>baştan sona</b> kontrol et: akü dolu mu, ana şalter açık mı, sigorta atmış mı, kablo kopuk mu, sürücünün ışığı yanıyor mu?'},
  {t:'order',q:'Robot hiç açılmıyor. Kontrolleri sırala.',lines:true,plain:true,items:['Akünün dolu olduğunu ölç','Akü kablosunun takılı olduğuna bak','Ana şalterin açık olduğunu kontrol et','Güç panosunun ışıklarına bak']},
  {t:'mc',q:'Robot açık, sadece sol tekerlek dönmüyor. İlk nereye bakarsın?',opts:['Sol motorun sigortasına ve sürücüsüne','Aküyü değiştirmeye','Kodu baştan yazmaya'],a:0,tip:'Robotun geri kalanı çalıştığına göre sorun yalnızca o motorun hattındadır.'},
  {t:'line',q:'Bir takım arıza bulurken şunları yaptı. Hangisi tehlikeli?',lines:['Robotu devre dışı bıraktı','Ana şalteri kapattı','Robot etkinken elini tekerleğe soktu','Kabloları tek tek kontrol etti'],a:[2],plain:true,tip:'Robot etkinken hareketli parçalara asla dokunulmaz.'},
  {t:'mc',q:'Motor sürücünün ışığı hiç yanmıyor. Bu neyi gösterebilir?',opts:['Sürücüye güç gelmiyor','Kod çok iyi çalışıyor','Motor fazla hızlı'],a:0},
  {t:'mc',q:'Arızayı bulup düzelttin. Şimdi ne yapmalısın?',opts:['Not al ve robotu güvenli şekilde test et','Hemen maça çık','Hiç kimseye söyleme'],a:0,tip:'Arıza notları bir sonraki sorunda takıma zaman kazandırır.'}
 ]}
]}
);

const ALL_LESSONS=U.flatMap(u=>u.lessons.map(l=>Object.assign(l,{field:u.field})));
const EXBYID={};
U.forEach((u,ui)=>u.lessons.forEach(l=>l.ex.forEach((e,i)=>{e.id=l.id+'-'+i;e.ui=ui;EXBYID[e.id]=e})));
const UNIT_BADGE=U.map(u=>u.badge);
const fieldOf=id=>FIELDS.find(f=>f.id===id)||FIELDS[0];
const fieldUnits=fid=>U.map((u,ui)=>({u,ui})).filter(x=>x.u.field===fid);
const unitNo=ui=>fieldUnits(U[ui].field).findIndex(x=>x.ui===ui)+1;
/* FRC sözlüğü: ünite kimliğiyle eklenir */
[['m1',[['Şasi','Robotun iskeleti. Tekerlekler ve mekanizmalar şasiye bağlanır.'],['Kutu profil','İçi boş, kare kesitli alüminyum çubuk. Hafif ve sağlamdır.'],['Tampon (bumper)','Robotun çevresindeki köpüklü koruma. Rengi ittifakı gösterir.'],['Kilitli somun','İçindeki naylon halka sayesinde titreşimde gevşemeyen somun.']]],
 ['m2',[['Tork','Döndürme gücü. Dişli oranı büyüdükçe tork artar.'],['Dişli oranı','Çevrilen dişlinin diş sayısı ÷ çeviren dişlinin diş sayısı.','48 ÷ 12 = 4'],['Swerve','Her tekerleğin kendi yönüne döndüğü sürüş sistemi.'],['Mecanum','Çapraz makaralı tekerlek. Robotun yana kaymasını sağlar.']]],
 ['m3',[['Toplayıcı (intake)','Oyun parçasını yerden alan mekanizma.'],['Fırlatıcı (shooter)','Hızla dönen tekerleklerle parçayı fırlatan mekanizma.'],['Prototip','Fikri denemek için yapılan hızlı ve ucuz ilk örnek.'],['Selenoid valf','Elektrikle açılıp kapanan, havayı pistona yönlendiren valf.']]],
 ['e1',[['Ana şalter','Robotu açıp kapatan, 120 A\'de gücü kesen ana sigorta.'],['Güç dağıtım panosu','Aküden gelen gücü sigortalarla cihazlara dağıtan pano.'],['Sigorta','Fazla akım geçince hattı kesip kabloları koruyan parça.'],['Watt','Güç birimi. Güç = gerilim × akım.','12 V × 40 A = 480 W']]],
 ['e2',[['roboRIO','Takımın kodunu çalıştıran robot bilgisayarı.'],['Motor sürücü','Komuta göre motora ne kadar güç gideceğini ayarlayan cihaz.'],['CAN hattı','Sarı ve yeşil kablolarla cihazları zincir gibi bağlayan haberleşme hattı.'],['Enkoder','Bir milin kaç tur döndüğünü sayan sensör.'],['Jiroskop','Robotun ne kadar döndüğünü ölçen sensör.']]],
 ['e3',[['AWG','Kablo kalınlığı ölçüsü. Sayı küçüldükçe kablo kalınlaşır.'],['Arıza bulma','Sorunu, elektriğin yolunu baştan sona kontrol ederek bulmak.'],['RSL','Robot sinyal ışığı. Yanıp sönüyorsa robot etkindir.']]]
].forEach(([uid,items])=>{const ui=U.findIndex(u=>u.id===uid);if(ui>=0)items.forEach(([t,d,c])=>GLOSS.push(c?{u:ui,t,d,c}:{u:ui,t,d}))});
