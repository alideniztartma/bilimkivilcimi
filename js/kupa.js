/* #BilimKıvılcımı · Kupa sınavı soru bankası.
   Bu sorular derslerde çıkmaz. Kupa sınavı 6 yeni soru + derslerden 2 soru ile kurulur,
   böylece bilen biri dersleri ezberlemeden sınavı geçip üniteyi atlayabilir. */
'use strict';

const KUPA={
/* 0 · Algoritma */
0:[
 {t:'mc',q:'Hangisi bir algoritmanın özelliği DEĞİLDİR?',opts:['Adımları sıralıdır','Bir sonu vardır','Adımları rastgele yapılır','Her adım açıktır'],a:2,tip:'Algoritmada adımlar belli bir sırayla yapılır, rastgele değil.'},
 {t:'order',q:'Bitki sulama algoritmasını sırala.',items:['Sulama kabını al','Kabı suyla doldur','Toprağa su dök','Kabı yerine koy'],lines:true,plain:true},
 {t:'fill',q:'Robot sola bakıyor. Yıldız tam yukarıda. İlk komut ne olmalı?',code:'1. ___\n2. İleri git',opts:['Sağa dön','Sola dön','İleri git'],a:0,tip:'Sola bakan robot sağa dönünce yukarı bakar. Sonra ileri gidebilir.'},
 {t:'mc',q:'Bir programın beklenmedik şekilde çalışmasına ne denir?',opts:['Döngü','Hata (bug)','Değişken','Komut'],a:1,tip:'Programdaki yanlışlara "bug", yani hata denir.'},
 {t:'line',q:'Çay demleme algoritmasında hangi adım yanlış yerde?',lines:['Suyu kaynat','Bardağa çay koy','Çayı demliğe koy','Kaynar suyu demliğe dök'],a:[1],plain:true,tip:'Çay demlenmeden bardağa konamaz.'},
 {t:'mc',q:'Robota "3 adım ileri git" yerine "ileri git" komutunu üç kez yazdık. Ne olur?',opts:['Robot hiç gitmez','Robot yine 3 adım gider','Robot 1 adım gider','Robot geri gider'],a:1,tip:'İki yol da aynı sonucu verir; aynı işi farklı algoritmalarla yapabiliriz.'}],
/* 1 · Döngüler */
1:[
 {t:'type',q:'Bu program kaç kez "Zıpla" der?',code:'2 kez tekrarla:\n    3 kez tekrarla:\n        Zıpla',a:['6','altı'],tip:'İç içe döngü: 2 × 3 = 6.'},
 {t:'mc',q:'Hangisi bir döngü örneğidir?',opts:['Bir kez kapıyı açmak','Her sabah dişlerini fırçalamak','Doğum günü kutlamak','Bir mektup yazmak'],a:1,tip:'Her gün tekrar eden işler döngüye benzer.'},
 {t:'fill',q:'Robot bir kareyi çizmeli. Boşluğu doldur.',code:'___ kez tekrarla:\n    İleri git\n    Sağa dön',opts:['4','3','2'],a:0,tip:'Karenin 4 kenarı var.'},
 {t:'type',q:'Bu programın sonunda kaç elma toplanır?',code:'5 kez tekrarla:\n    2 elma topla',a:['10','on'],tip:'5 × 2 = 10.'},
 {t:'mc',q:'Döngü kullanmanın en büyük faydası nedir?',opts:['Programı uzatır','Aynı kodu tekrar tekrar yazmamızı önler','Robotu yavaşlatır','Hataları gizler'],a:1},
 {t:'mc',q:'Robota "Duvara gelene kadar ileri git" dedik. Robot ne zaman durur?',opts:['Hiç durmaz','Duvarın önüne gelince','10 adım sonra','Hemen'],a:1,tip:'"-e kadar" demek, belirtilen şey olunca durmak demektir. Burada şey duvardır.'}],
/* 2 · Koşullar */
2:[
 {t:'mc',q:'"Eğer yağmur yağıyorsa şemsiye al." Güneşli bir günde ne olur?',opts:['Şemsiye alınır','Şemsiye alınmaz','Program hata verir','Yağmur başlar'],a:1,tip:'Koşul doğru değilse içindeki komut çalışmaz.'},
 {t:'fill',q:'Trafik ışığı programını tamamla.',code:'Eğer ışık kırmızıysa:\n    Dur\n___:\n    Yürü',opts:['Değilse','Tekrarla','Her zaman'],a:0},
 {t:'mc',q:'Hangisi DOĞRU bir karşılaştırmadır?',opts:['7 < 3','10 = 12','5 > 2','4 > 9'],a:2},
 {t:'type',q:'Sayı 8. Program ne yazar?',code:'Eğer sayı > 5 ise:\n    "Büyük" yaz\nDeğilse:\n    "Küçük" yaz',a:['büyük','Büyük'],tip:'8, 5\'ten büyük olduğu için "Büyük" yazar.'},
 {t:'mc',q:'Robotun önünde engel var. Hangi kod onu kurtarır?',opts:['İleri git','Eğer engel varsa sağa dön, değilse ileri git','5 kez ileri git','Dur ve bekle'],a:1},
 {t:'mc',q:'"Hem acıktıysam hem de yemek hazırsa yerim." Acıktım ama yemek hazır değil. Ne olur?',opts:['Yerim','Yemem','İki kez yerim','Uyurum'],a:1,tip:'"Ve" ile bağlanan iki koşulun ikisi de doğru olmalı.'}],
/* 3 · Değişkenler */
3:[
 {t:'type',q:'Programın sonunda puan kaçtır?',code:'puan = 10\npuan = puan + 5\npuan = puan - 3',a:['12','on iki'],tip:'10 + 5 = 15, 15 − 3 = 12.'},
 {t:'mc',q:'Değişken neye benzer?',opts:['Üstüne isim yazılmış bir kutuya','Bir döngüye','Bir hataya','Bir robota'],a:0,tip:'Değişken, içinde bilgi saklayan isimli bir kutudur.'},
 {t:'type',q:'Bu program ekrana ne yazar?',code:'x = 2\ny = 5\nx = x + y\nyaz(x)',a:['7','yedi'],tip:'x kutusundaki 2\'ye y kutusundaki 5 eklenir: 7. Sonra 7, x kutusuna konur.'},
 {t:'mc',q:'Hangisi değişkene iyi bir isimdir?',opts:['x1y2z3','toplam_puan','asdfg','???'],a:1,tip:'İsim, kutuda ne olduğunu anlatmalı.'},
 {t:'fill',q:'Her alkışta sayaç bir artmalı. Boşluğu doldur.',code:'sayac = 0\n3 kez tekrarla:\n    sayac = ___',opts:['sayac + 1','sayac - 1','0'],a:0},
 {t:'type',q:'Döngü bitince sayaç kaçtır?',code:'sayac = 0\n4 kez tekrarla:\n    sayac = sayac + 2',a:['8','sekiz']}],
/* 4 · İlk Python kodum */
4:[
 {t:'type',q:'Bu kod ekrana ne yazar?',code:'x = 3\nprint(x * 4)',a:['12','on iki']},
 {t:'mc',q:'Python\'da ekrana yazı yazdıran komut hangisidir?',opts:['write()','print()','show()','say()'],a:1},
 {t:'type',q:'Bu kod kaç satır yazdırır?',code:'for i in range(5):\n    print("Kıvılcım")',a:['5','beş'],tip:'range(5) 0, 1, 2, 3, 4 sayılarını verir: 5 tur.'},
 {t:'fill',q:'Yaş 12 ise "Hoş geldin" yazsın.',code:'yas = 12\n___ yas == 12:\n    print("Hoş geldin")',opts:['if','for','print'],a:0},
 {t:'mc',q:'Python\'da girinti (satır başındaki boşluk) neden önemlidir?',opts:['Süs içindir','Hangi kodun döngü ya da if içinde olduğunu gösterir','Kodu yavaşlatır','Önemli değildir'],a:1},
 {t:'line',q:'Bu kodda hangi satır hatalı?',lines:['isim = "Anka"','print("Merhaba")','print(isim','print("Hoşça kal")'],a:[2],tip:'Üçüncü satırda kapanan parantez eksik.'}],
/* 5 · Robot yazılımı */
5:[
 {t:'order',q:'Robotun çalışma döngüsünü sırala.',items:['Sensörlerle algıla','Karar ver','Motorları hareket ettir'],lines:true,plain:true},
 {t:'mc',q:'Robot programı neden sürekli tekrar eden bir döngü içinde çalışır?',opts:['Pil tasarrufu için','Dünya sürekli değiştiği için her an yeniden algılayıp karar vermesi gerekir','Hata yapmak için','Daha çok kod olsun diye'],a:1},
 {t:'mc',q:'FRC maçında sürücünün kumandayla robotu yönettiği bölüme ne denir?',opts:['Otonom','Teleop','Kalibrasyon','Pit'],a:1,tip:'Teleop: sürücü kontrolü. Otonom: robot kendi kendine.'},
 {t:'mc',q:'Otonom bölümde robot neye göre hareket eder?',opts:['Sürücünün kumandasına','Önceden yazılmış koda ve sensörlere','Seyircilere','Rastgele'],a:1},
 {t:'fill',q:'Mesafe sensörü engeli görünce robot dursun.',code:'Eğer mesafe < 30 cm ise:\n    ___\nDeğilse:\n    İleri git',opts:['Dur','İleri git','Hızlan'],a:0},
 {t:'mc',q:'FRC takımları robot kodunu en çok hangi dillerle yazar?',opts:['Java, C++ ve Python','Sadece HTML','Excel','Hiç kod yazmazlar'],a:0}],
/* 6 · Robotun iskeleti */
6:[
 {t:'mc',q:'FRC robotunun iskeleti (şasisi) en çok hangi malzemeden yapılır?',opts:['Alüminyum','Cam','Kâğıt','Kurşun'],a:0,tip:'Alüminyum hem hafif hem sağlamdır.'},
 {t:'mc',q:'Robot neden olabildiğince hafif yapılmaya çalışılır?',opts:['Daha güzel görünsün diye','Ağırlık sınırı var, hafif robot da daha hızlıdır','Kolay kırılsın diye','Fark etmez'],a:1},
 {t:'mc',q:'Somunun titreşimle gevşemesini ne önler?',opts:['Kilitli somun ya da vida sabitleyici','Daha uzun vida','Boya','Bant'],a:0},
 {t:'mc',q:'Robotun kenarlarındaki yumuşak, kumaş kaplı parçaya ne denir?',opts:['Tampon (bumper)','Şasi','Teker','Anten'],a:0,tip:'Tamponlar çarpışmaları yumuşatır ve takım rengini/numarasını gösterir.'},
 {t:'mc',q:'Bir parçayı kesmeden önce ne yapılmalı?',opts:['Ölçüp işaretlemek','Hemen kesmek','Boyamak','Tartmak'],a:0,tip:'İki kez ölç, bir kez kes!'},
 {t:'mc',q:'Atölyede çalışırken hangisi her zaman takılmalıdır?',opts:['Koruyucu gözlük','Kulaklık','Şapka','Saat'],a:0}],
/* 7 · Hareket ve güç aktarımı */
7:[
 {t:'mc',q:'Küçük dişli büyük dişliyi döndürüyor. Büyük dişli nasıl döner?',opts:['Daha hızlı ama daha zayıf','Daha yavaş ama daha güçlü','Aynı hızda','Hiç dönmez'],a:1},
 {t:'type',q:'Küçük dişlide 12 diş, büyük dişlide 36 diş var. Oran kaçtır? (sadece sayıyı yaz)',a:['3','3:1','üç'],tip:'36 ÷ 12 = 3.'},
 {t:'mc',q:'İki dişli birbirine değerek dönerken yönleri nasıldır?',opts:['Aynı yöne','Ters yöne','Biri durur','Rastgele'],a:1},
 {t:'mc',q:'Zincir ya da kayışla bağlı iki dişli (kasnak) hangi yöne döner?',opts:['Aynı yöne','Ters yöne','Hiç dönmez','Sadece biri döner'],a:0},
 {t:'mc',q:'Her yöne kayabilen, dönerken de ilerleyebilen sürüş sistemi hangisidir?',opts:['Swerve sürüş','Tank sürüş','Tek tekerlek','Paletli'],a:0,tip:'Swerve\'de her teker ayrı ayrı döner.'},
 {t:'mc',q:'Tork nedir?',opts:['Döndürme gücü','Hız','Ağırlık','Elektrik'],a:0}],
/* 8 · Mekanizmalar */
8:[
 {t:'mc',q:'Yerden top toplayan mekanizmaya ne denir?',opts:['Toplayıcı (intake)','Fırlatıcı (shooter)','Şasi','Akü'],a:0},
 {t:'mc',q:'Fırlatıcıda topu atan genelde nedir?',opts:['Hızla dönen tekerlekler','Mıknatıs','Su','Hoparlör'],a:0},
 {t:'mc',q:'Pnömatik sistemler gücü nereden alır?',opts:['Basınçlı havadan','Sudan','Güneşten','Sesten'],a:0},
 {t:'mc',q:'Pnömatik pistonun en büyük özelliği nedir?',opts:['İki konum arasında hızlı gidip gelmesi','Çok yavaş olması','Sürekli dönmesi','Işık vermesi'],a:0},
 {t:'order',q:'Bir robotun topu atma sırasını diz.',items:['Intake topu yerden alır','Top robotun içinde taşınır','Atıcı tekerlekler hızlanır','Top hedefe fırlatılır'],lines:true,plain:true},
 {t:'mc',q:'Asansör (elevator) mekanizması ne işe yarar?',opts:['Bir şeyi yukarı aşağı taşır','Robotu soğutur','Işık yakar','Akü şarj eder'],a:0}],
/* 9 · Robotun güç sistemi */
9:[
 {t:'mc',q:'FRC robotunun aküsü kaç volttur?',opts:['12 volt','220 volt','1,5 volt','5 volt'],a:0},
 {t:'mc',q:'Ana şalter ne işe yarar?',opts:['Robotun büyük açma-kapama düğmesidir','Müzik çalar','Motoru hızlandırır','Kamerayı açar'],a:0,tip:'Evdeki ana elektrik düğmesi gibi.'},
 {t:'mc',q:'Elektriği robotun bütün parçalarına paylaştıran kutu hangisi?',opts:['Güç dağıtım panosu','Kamera','Tampon','Tekerlek'],a:0},
 {t:'mc',q:'Robotun beyni olan küçük bilgisayar hangisi?',opts:['roboRIO','Akü','Teker','Tampon'],a:0},
 {t:'order',q:'Elektriğin yolunu baştan sona sırala.',items:['Akü','Ana şalter','Güç dağıtım panosu','Motor sürücü','Motor'],lines:true,plain:true},
 {t:'mc',q:'Robot sahada sürücünün bilgisayarıyla nasıl konuşur?',opts:['Radyo ile, kablosuz internet gibi','Mektupla','Seyircilerin kablosuyla','Konuşmaz'],a:0}],
/* 10 · Motorlar ve sensörler */
10:[
 {t:'mc',q:'Motor sürücü ne yapar?',opts:['Motorun gaz pedalı gibi, motora ne kadar elektrik gideceğini ayarlar','Topu fırlatır','Aküyü şarj eder','Fotoğraf çeker'],a:0},
 {t:'mc',q:'CAN hattı ne işe yarar?',opts:['Robot parçalarının birbirleriyle konuşmasını sağlar','Robotu boyar','Topu tutar','Işık yakar'],a:0,tip:'Robotun telefon hattı gibidir.'},
 {t:'mc',q:'Tekerleğin kaç tur döndüğünü sayan sensör hangisi?',opts:['Enkoder','Kamera','Sınır anahtarı','Mikrofon'],a:0,tip:'Bisikletin kilometre sayacı gibi tur sayar.'},
 {t:'mc',q:'Robotun hangi yöne baktığını bilen sensör hangisi?',opts:['Jiroskop','Termometre','Enkoder','Sınır anahtarı'],a:0},
 {t:'mc',q:'Kolun en uca geldiğini anlamak için ne kullanılır?',opts:['Sınır anahtarı','Hoparlör','Akü','Tampon'],a:0,tip:'Sınır anahtarı basılınca "sona geldim" der.'},
 {t:'mc',q:'Robotun gözü olarak hangisi kullanılır?',opts:['Kamera','Akü','Sigorta','Tampon'],a:0}],
/* 11 · Güvenli kablolama ve arıza bulma */
11:[
 {t:'mc',q:'Çok elektrik kullanan bir motor için kablo nasıl olmalı?',opts:['Daha kalın','Daha ince','Fark etmez','Hiç kablo olmamalı'],a:0,tip:'Çok su için kalın hortum gerekir. Kablo da öyle.'},
 {t:'mc',q:'Kırmızı ve siyah kablo genelde neyi gösterir?',opts:['Kırmızı artı (+), siyah eksi (−)','Kırmızı eksi, siyah artı','İkisi de toprak','Renklerin anlamı yok'],a:0},
 {t:'mc',q:'Robot hiç açılmıyor. İlk neye bakarsın?',opts:['Akü dolu mu, ana şalter açık mı','Tamponların rengine','Tekerlerin boyasına','Hiçbirine'],a:0,tip:'Önce en basit şeylere bak.'},
 {t:'mc',q:'Sadece bir motor çalışmıyor, diğerleri çalışıyor. Neden olabilir?',opts:['O motorun kablosu gevşek ya da sigortası atmış','Bütün akü bitmiş','Sahada ışık yok','Robot çok hafif'],a:0},
 {t:'order',q:'Arıza bulma adımlarını sırala.',items:['Sorunu gözle ve not al','En basit sebepten başlayarak kontrol et','Tek bir şeyi değiştir','Tekrar dene'],lines:true,plain:true},
 {t:'mc',q:'Kablolar neden düzgün toplanıp bağlanır?',opts:['Dönen parçalara takılıp kopmasın, arıza da kolay bulunsun','Süs olsun diye','Robot ağırlaşsın diye','Gerek yok'],a:0}]
};
/* Soruları sistemdeki diğer sorular gibi kaydet (hata defteri de bu sorularla çalışır) */
U.forEach((u,ui)=>{if(u.kupa)KUPA[ui]=u.kupa});
Object.entries(KUPA).forEach(([ui,list])=>list.forEach((e,i)=>{e.id='kupa-'+ui+'-'+i;e.ui=+ui;e.kupa=1;EXBYID[e.id]=e}));
/* 8 soruluk sınav: bu ünitenin yeni soruları + derslerden 2 soru */
function kupaQuestions(ui){
  const fresh=shuffle(KUPA[ui]||[]).slice(0,6);
  const old=shuffle(gradables(U[ui].lessons.flatMap(l=>l.ex)).filter(e=>e.t!=='match'&&e.t!=='robot')).slice(0,8-fresh.length);
  return shuffle(fresh.concat(old));
}
