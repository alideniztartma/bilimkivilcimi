/* #BilimKıvılcımı · Müfredat ve içerik verileri */
'use strict';

/* Robot haritası: . boş, # duvar, * yıldız, R robot. Yön: 0 yukarı, 1 sağ, 2 aşağı, 3 sol */
const U=[
{id:'u1',title:'Algoritma',desc:'Adım adım düşünmeyi öğren.',deco:'happy',
 guide:[{h:'Algoritma nedir?',p:'Bir işi yapmak için sırayla izlenen adımlara algoritma denir. Bir yemek tarifi de bir algoritmadır.'},
        {h:'Sıra önemlidir',p:'Bilgisayar adımları yazıldığı sırayla yapar. Sıra yanlışsa sonuç da yanlış olur.'},
        {h:'Hata (bug)',p:'Programdaki yanlışa hata denir. İngilizcede bug, yani böcek derler. Hatayı bulup düzeltmeye hata ayıklama denir.'}],
 lessons:[
 {id:'u1l1',title:'Algoritma nedir?',ex:[
  {t:'info',h:'Merhaba! Ben Anka.',p:'Bir işi yapmak için sırayla izlediğimiz adımlara <b>algoritma</b> denir. Sabah okula hazırlanman bile bir algoritma!'},
  {t:'mc',q:'Hangisi bir algoritmadır?',opts:['Bir kek tarifi','Bir elma','Mavi renk','Bir kedi'],a:0,tip:'Tarif, keki yapmak için sırayla izlenen adımları anlatır.'},
  {t:'order',q:'Dişlerini fırçalamak için adımları sırala.',lines:true,items:['Diş fırçasını al','Üstüne diş macunu sür','Dişlerini fırçala','Ağzını çalkala'],plain:true},
  {t:'mc',q:'Adımların sırası karışırsa ne olur?',opts:['İş yanlış yapılır','Hiçbir şey değişmez','İş daha hızlı biter'],a:0},
  {t:'order',q:'Bir bitki yetiştirmek için adımları sırala.',lines:true,plain:true,items:['Saksıya toprak koy','Tohumu ek','Su ver','Filizlenmesini bekle']},
  {t:'match',q:'Eşleri bul',pairs:[['Algoritma','Sıralı adımlar'],['Komut','Tek bir adım'],['Program','Bilgisayar için algoritma'],['Bilgisayar','Komutları sırayla yapar']]}
 ]},
 {id:'u1l2',title:'Robota komut ver',ex:[
  {t:'info',h:'Robot üç komut biliyor',p:'<b>İleri git</b>, <b>Sola dön</b> ve <b>Sağa dön</b>. Robot her zaman baktığı yöne doğru ilerler.'},
  {t:'robot',q:'Robotu yıldıza götür.',map:['.....','.....','R..*.','.....','.....'],dir:1,max:5},
  {t:'mc',q:'Robot sağa bakıyor. "Sola dön" komutunu alırsa hangi yöne bakar?',opts:['Yukarı','Aşağı','Sola','Sağa'],a:0,tip:'Sağa bakarken sola dönen biri yukarıya bakar.'},
  {t:'robot',q:'Robotu yıldıza götür. Bu sefer dönmen gerekecek!',map:['.R...','.....','.....','...*.','.....'],dir:1,max:8},
  {t:'robot',q:'İki yıldızı da topla.',map:['R.*..','.....','..*..','.....','.....'],dir:1,max:6}
 ]},
 {id:'u1l3',title:'Hata avcısı',ex:[
  {t:'info',h:'Hata avına çıkıyoruz',p:'Programdaki yanlışa <b>hata</b> denir. İngilizcede buna <b>bug</b>, yani böcek derler. Hatayı bulup düzeltmeye <b>hata ayıklama</b> denir.'},
  {t:'line',q:'Sandviç yapma algoritmasında hangi adım yanlış yerde?',lines:['Ekmeği ikiye kes','Sandviçi ye','Arasına peynir koy','Ekmeği kapat'],a:[1],plain:true,tip:'Sandviçi en sonda yemeliyiz.'},
  {t:'robot',q:'Duvarın etrafından dolaşarak yıldıza ulaş.',map:['.....','R.#..','..#*.','.....','.....'],dir:1,max:11},
  {t:'fill',q:'Robot sağa bakıyor. Yukarıdaki yıldıza gitmeli. İlk komut ne olmalı?',code:'1. ___\n2. İleri git',opts:['Sola dön','Sağa dön','İleri git'],a:0},
  {t:'line',q:'Okula hazırlanma algoritmasında hangi adım yanlış yerde?',lines:['Uyan','Kahvaltı yap','Okula git','Giyin'],a:[2,3],plain:true,tip:'Okula gitmeden önce giyinmeliyiz.'},
  {t:'mc',q:'Hatayı bulup düzeltmeye ne denir?',opts:['Hata ayıklama','Kopyalama','Boyama'],a:0}
 ]}
]},
{id:'u2',title:'Döngüler',desc:'Aynı işi tekrar tekrar yaptır.',deco:'wow',
 guide:[{h:'Döngü nedir?',p:'Aynı adımları tekrar tekrar yapmaya döngü denir.',code:'4 kez tekrarla:\n    İleri git'},
        {h:'Kısa ve doğru',p:'Yukarıdaki program, dört kez "İleri git" yazmakla aynıdır. Döngü programı kısaltır ve hata yapmayı azaltır.'},
        {h:'İçerdeki satırlar',p:'Döngünün içindeki komutlar biraz içeriden başlar. Böylece hangi komutların tekrar edileceği anlaşılır.'}],
 lessons:[
 {id:'u2l1',title:'Tekrar eden adımlar',ex:[
  {t:'info',h:'Döngülerle tanış',p:'Aynı şeyi tekrar tekrar yapmaya <b>döngü</b> denir. "3 kez tekrarla: Zıpla" demek, üç kez "Zıpla" yazmakla aynıdır.',code:'3 kez tekrarla:\n    Zıpla'},
  {t:'mc',q:'Hangisi "İleri git, İleri git, İleri git" programının kısa hâlidir?',mono:true,opts:['3 kez tekrarla:\n    İleri git','2 kez tekrarla:\n    İleri git','İleri git'],a:0},
  {t:'fill',q:'Kurbağa 5 kez zıplamalı. Boşluğu doldur.',code:'___ kez tekrarla:\n    Zıpla',opts:['5','3','1'],a:0},
  {t:'mc',q:'Hangisi günlük hayattan bir döngüdür?',opts:['Her sabah dişlerini fırçalamak','Doğum günü pastasını bir kez kesmek','Okula ilk gün gitmek'],a:0},
  {t:'type',q:'Bu program kaç kez "Merhaba" der?',code:'4 kez tekrarla:\n    Merhaba de',a:['4','dört']},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['2 kez tekrarla: Alkışla','2 alkış'],['3 kez tekrarla: Zıpla','3 zıplama'],['1 kez tekrarla: Dön','1 dönüş'],['4 kez tekrarla: Adım at','4 adım']]}
 ]},
 {id:'u2l2',title:'Döngülü robot',ex:[
  {t:'info',h:'Robota döngü öğretelim',p:'Turuncu çerçeve bir döngüdür. Kaç kez tekrar edileceğini <b>−</b> ve <b>+</b> ile seç. Komutları çerçevenin içine koy.'},
  {t:'robot',q:'Döngü kullanarak robotu yıldıza götür.',map:['.....','.....','R...*','.....','.....'],dir:1,max:1,loop:true},
  {t:'type',q:'Bu program kaç kez alkışlar?',code:'3 kez tekrarla:\n    Alkışla\n    Zıpla',a:['3','üç']},
  {t:'robot',q:'Merdiveni çık! Aynı dört komut tekrar ediyor.',map:['...#*','..#..','.#...','#....','R....'],dir:1,max:4,loop:true},
  {t:'robot',q:'Üç yıldızı da topla. Karenin her kenarı aynı.',map:['R..*.','.....','.....','*..*.','.....'],dir:1,max:4,loop:true}
 ]},
 {id:'u2l3',title:'Döngüyle düşün',ex:[
  {t:'mc',q:'Toplam kaç alkış olur?',code:'2 kez tekrarla:\n    3 kez tekrarla:\n        Alkışla',opts:['6','5','3','2'],a:0,tip:'Her dış turda 3 alkış var. 2 tur × 3 alkış = 6 alkış.'},
  {t:'mc',q:'Hangi program robota bir kare çizdirir?',mono:true,opts:['4 kez tekrarla:\n    İleri git\n    Sağa dön','2 kez tekrarla:\n    İleri git\n    Sağa dön','4 kez tekrarla:\n    İleri git'],a:0},
  {t:'order',q:'Merdiven çıkan programı sırala.',lines:true,items:['4 kez tekrarla:','    İleri git','    Sola dön','    İleri git','    Sağa dön']},
  {t:'type',q:'Robot toplam kaç adım ileri gider?',code:'5 kez tekrarla:\n    İleri git\n    İleri git',a:['10','on'],tip:'Her turda 2 adım var. 5 tur × 2 adım = 10 adım.'},
  {t:'match',q:'Eşleri bul',pairs:[['Döngü','Tekrar etmek'],['Tekrar sayısı','Kaç kez'],['Döngünün içi','Tekrar eden komutlar']]}
 ]}
]},
{id:'u3',title:'Koşullar',desc:'Bilgisayara karar verdir.',deco:'cheer',
 guide:[{h:'Eğer... ise',p:'Koşul, bir şeyin doğru olup olmadığına bakar. Doğruysa içindeki komut çalışır.',code:'Eğer ışık kırmızıysa:\n    Dur'},
        {h:'Değilse',p:'Koşul yanlışsa ne yapılacağını "Değilse" söyler. İki yoldan biri mutlaka seçilir.',code:'Eğer yağmur yağıyorsa:\n    Şemsiye al\nDeğilse:\n    Şapka tak'},
        {h:'Karşılaştırma',p:'> büyüktür, < küçüktür, == eşittir, != eşit değildir demektir. Sonuç ya doğru ya yanlıştır.'}],
 lessons:[
 {id:'u3l1',title:'Eğer... ise',ex:[
  {t:'info',h:'Bilgisayar da karar verir',p:'<b>Eğer</b> ile başlayan cümleler bir koşul kurar. Koşul doğruysa komut çalışır, yanlışsa çalışmaz.',code:'Eğer ışık kırmızıysa:\n    Dur'},
  {t:'mc',q:'Bugün hava güneşli. Ne olur?',code:'Eğer hava yağmurluysa:\n    Şemsiye al',opts:['Şemsiye almayız','Şemsiye alırız','Yağmur başlar'],a:0,tip:'Koşul yanlış olduğu için içindeki komut çalışmaz.'},
  {t:'match',q:'Eşleri bul',pairs:[['Işık kırmızıysa','Dur'],['Acıktıysan','Yemek ye'],['Kapı çalarsa','Kapıyı aç'],['Hava soğuksa','Mont giy']]},
  {t:'mc',q:'Telefonun şarjı %90. Telefonu şarja takar mıyız?',code:'Eğer şarj azsa:\n    Şarja tak',opts:['Hayır','Evet'],a:0},
  {t:'fill',q:'Boşluğu doldur.',code:'___ ışık yeşilse:\n    Karşıdan geç',opts:['Eğer','Tekrarla','Değilse'],a:0}
 ]},
 {id:'u3l2',title:'Eğer... değilse',ex:[
  {t:'info',h:'İki yol var',p:'<b>Değilse</b>, koşul yanlış olduğunda ne yapılacağını söyler. İki yoldan biri mutlaka seçilir.',code:'Eğer zar 6 ise:\n    Sevin\nDeğilse:\n    Tekrar at'},
  {t:'mc',q:'Sayı 7. Ekrana ne yazılır?',code:'Eğer sayı 10\'dan büyükse:\n    "Büyük" yaz\nDeğilse:\n    "Küçük" yaz',opts:['Küçük','Büyük','Hiçbir şey'],a:0},
  {t:'type',q:'Sayı 15 olursa ekrana ne yazılır?',code:'Eğer sayı 10\'dan büyükse:\n    "Büyük" yaz\nDeğilse:\n    "Küçük" yaz',a:['büyük']},
  {t:'order',q:'Programı sırala: Hava soğuksa mont giy, değilse tişört giy.',lines:true,items:['Eğer hava soğuksa:','    Mont giy','Değilse:','    Tişört giy']},
  {t:'mc',q:'"Değilse" kısmı ne zaman çalışır?',opts:['Koşul yanlış olduğunda','Koşul doğru olduğunda','Her zaman'],a:0}
 ]},
 {id:'u3l3',title:'Karşılaştır',ex:[
  {t:'info',h:'Büyük mü, küçük mü?',p:'Bilgisayar sayıları karşılaştırabilir: <code>&gt;</code> büyüktür, <code>&lt;</code> küçüktür, <code>==</code> eşittir. Sonuç ya <b>doğru</b> ya <b>yanlış</b> olur.'},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['>','büyüktür'],['<','küçüktür'],['==','eşittir'],['!=','eşit değildir']]},
  {t:'mc',q:'Bu doğru mu, yanlış mı?',code:'8 > 3',opts:['Doğru','Yanlış'],a:0},
  {t:'mc',q:'Bu doğru mu, yanlış mı?',code:'4 == 5',opts:['Yanlış','Doğru'],a:0},
  {t:'mc',q:'Ekrana ne yazılır?',code:'yaş = 9\nEğer yaş >= 10:\n    "Büyük çocuk" yaz\nDeğilse:\n    "Küçük çocuk" yaz',opts:['Küçük çocuk','Büyük çocuk'],a:0,tip:'>= "büyük veya eşit" demektir. 9, 10\'dan küçüktür.'},
  {t:'fill',q:'Puan 50\'den büyükse kazanalım.',code:'Eğer puan ___ 50:\n    "Kazandın" yaz',opts:['>','<','=='],a:0}
 ]}
]},
{id:'u4',title:'Değişkenler',desc:'Bilgiyi kutularda sakla.',deco:'happy',
 guide:[{h:'Değişken bir kutudur',p:'Değişken, üzerinde adı yazan bir kutu gibidir. İçine bilgi koyarız.',code:'puan = 5'},
        {h:'= işareti',p:'Burada = işareti "kutuya koy" demektir. Matematikteki eşittir gibi değildir.',code:'puan = 5\npuan = puan + 2\n# artık puan 7'},
        {h:'Sayaç',p:'Her turda 1 artan değişkene sayaç denir. Döngülerle birlikte çok kullanılır.'}],
 lessons:[
 {id:'u4l1',title:'Bilgi kutusu',ex:[
  {t:'info',h:'Değişkenler kutu gibidir',p:'<b>Değişken</b>, adı olan bir kutudur. <code>puan = 5</code> yazınca "puan" adlı kutuya 5 koyarız.',code:'puan = 5'},
  {t:'mc',q:'puan kutusunda ne var?',code:'puan = 5',opts:['5','puan','0'],a:0},
  {t:'mc',q:'isim kutusunda ne var?',code:'isim = "Ela"',opts:['Ela','isim','Hiçbir şey'],a:0},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['yaş = 10','yaş kutusunda 10'],['can = 3','can kutusunda 3'],['renk = "mavi"','renk kutusunda mavi']]},
  {t:'fill',q:'elma kutusuna 4 koy.',code:'elma ___ 4',opts:['=','+','?'],a:0}
 ]},
 {id:'u4l2',title:'Kutuyu değiştir',ex:[
  {t:'info',h:'Yeni değer, eskisinin yerine',p:'Kutudaki değeri değiştirebiliriz. Yeni koyduğumuz değer eskisinin yerini alır.',code:'can = 3\ncan = 2\n# artık can 2'},
  {t:'type',q:'Sonunda x kaç?',code:'x = 4\nx = 9',a:['9']},
  {t:'type',q:'puan kaç oldu?',code:'puan = 5\npuan = puan + 3',a:['8']},
  {t:'mc',q:'a kaç oldu?',code:'a = 2\na = a * 3',opts:['6','5','2','23'],a:0,tip:'* çarpı demektir. 2 × 3 = 6.'},
  {t:'line',q:'Elif\'in 3 elması var ve 1 elma daha alıyor. Hangi satır yanlış?',lines:['elma = 3','elma = elma - 1','"elma" sayısını yaz'],a:[1],tip:'Elma aldıysa eklemeliyiz: elma = elma + 1'}
 ]},
 {id:'u4l3',title:'Sayaç',ex:[
  {t:'info',h:'Döngü + değişken',p:'Döngü ile değişkeni birlikte kullanabiliriz. Her turda 1 artan değişkene <b>sayaç</b> denir.',code:'sayaç = 0\n3 kez tekrarla:\n    sayaç = sayaç + 1\n# sayaç artık 3'},
  {t:'type',q:'Sonunda sayaç kaç?',code:'sayaç = 0\n5 kez tekrarla:\n    sayaç = sayaç + 1',a:['5','beş']},
  {t:'type',q:'Sonunda toplam kaç?',code:'toplam = 0\n4 kez tekrarla:\n    toplam = toplam + 2',a:['8','sekiz'],tip:'Her turda 2 eklenir: 2, 4, 6, 8.'},
  {t:'mc',q:'Sonunda yıldız kaç?',code:'yıldız = 10\n3 kez tekrarla:\n    yıldız = yıldız - 1',opts:['7','13','10','3'],a:0},
  {t:'order',q:'Sayaç programını sırala.',lines:true,items:['sayaç = 0','3 kez tekrarla:','    sayaç = sayaç + 1']}
 ]}
]},
{id:'u5',title:'İlk Python kodum',desc:'Gerçek bir programlama dili yaz.',deco:'cheer',
 guide:[{h:'Python',p:'Python gerçek bir programlama dilidir. Dünyada milyonlarca kişi kullanır.'},
        {h:'print ile yazdır',p:'Ekrana yazı yazdırmak için print kullanılır. Yazılar tırnak içine yazılır.',code:'print("Merhaba!")'},
        {h:'Girinti önemli',p:'for ve if satırlarının sonuna iki nokta (:) konur. İçlerindeki satırlar 4 boşluk içeriden başlar.',code:'for i in range(3):\n    print("Hey!")'}],
 lessons:[
 {id:'u5l1',title:'print ile yazdır',ex:[
  {t:'info',h:'Python\'a hoş geldin!',p:'Python\'da ekrana yazı yazdırmak için <code>print</code> kullanılır. Yazı tırnak içinde olmalı.',code:'print("Merhaba Hatay!")'},
  {t:'mc',q:'Ekranda ne görünür?',code:'print("Bilim")',opts:['Bilim','print','"Bilim"','Hiçbir şey'],a:0},
  {t:'line',q:'Hangi satırda hata var?',lines:['print("Merhaba")','print("Nasılsın?)','print("Görüşürüz")'],a:[1],tip:'Tırnak kapanmamış. Doğrusu: print("Nasılsın?")'},
  {t:'fill',q:'Ekrana Kıvılcım yazdır.',code:'print(___)',opts:['"Kıvılcım"','Kıvılcım','(Kıvılcım)'],a:0},
  {t:'order',q:'Ekrana Merhaba yazan kodu kur.',items:['print','(','"Merhaba"',')'],extra:['yaz'],mono:true},
  {t:'mc',q:'Ekranda ne görünür?',code:'print(3 + 4)',opts:['7','3 + 4','34'],a:0,tip:'Tırnak yoksa Python işlemi yapar.'}
 ]},
 {id:'u5l2',title:'Python\'da değişken',ex:[
  {t:'info',h:'Kutular Python\'da da var',p:'Python\'da değişken aynı şekilde yazılır. Değişkeni yazdırırken tırnak <b>kullanmayız</b>.',code:'can = 3\nprint(can)  # 3 yazar'},
  {t:'mc',q:'Ekranda ne görünür?',code:'isim = "Ali"\nprint(isim)',opts:['Ali','isim','"isim"'],a:0},
  {t:'mc',q:'Peki bu kod ne yazar?',code:'isim = "Ali"\nprint("isim")',opts:['isim','Ali'],a:0,tip:'Tırnak içindeki her şey olduğu gibi yazılır.'},
  {t:'type',q:'Ekranda hangi sayı görünür?',code:'x = 5\ny = 3\nprint(x + y)',a:['8']},
  {t:'fill',q:'Ekranda 15 yazsın.',code:'puan = 10\npuan = puan ___ 5\nprint(puan)',opts:['+','-','*'],a:0}
 ]},
 {id:'u5l3',title:'for döngüsü',ex:[
  {t:'info',h:'Python\'da döngü',p:'Python\'da döngü <code>for</code> ile yazılır. <code>range(3)</code> "3 kez" demektir. Döngünün içindeki satırlar 4 boşluk içeriden başlar.',code:'for i in range(3):\n    print("Hey!")'},
  {t:'type',q:'Kıvılcım kaç kez yazılır?',code:'for i in range(4):\n    print("Kıvılcım")',a:['4','dört']},
  {t:'fill',q:'Zıpla 5 kez yazılsın.',code:'for i in range(___):\n    print("Zıpla")',opts:['5','4','6'],a:0},
  {t:'mc',q:'Ekranda hangi sayılar görünür?',code:'for i in range(3):\n    print(i)',opts:['0 1 2','1 2 3','3','0 1 2 3'],a:0,tip:'range(3) saymaya 0\'dan başlar: 0, 1, 2.'},
  {t:'line',q:'Hangi satırda hata var?',lines:['for i in range(3):','print("Merhaba")'],a:[1],tip:'Döngünün içindeki satır 4 boşluk içeriden başlamalı.'}
 ]},
 {id:'u5l4',title:'if ile karar',ex:[
  {t:'info',h:'Python\'da eğer',p:'Python\'da "eğer" <code>if</code>, "değilse" <code>else</code> ile yazılır. Bu satırların sonuna iki nokta <code>:</code> koyarız.',code:'puan = 70\nif puan > 50:\n    print("Geçtin!")\nelse:\n    print("Tekrar dene")'},
  {t:'mc',q:'Ekranda ne görünür?',code:'puan = 30\nif puan > 50:\n    print("Geçtin!")\nelse:\n    print("Tekrar dene")',opts:['Tekrar dene','Geçtin!','İkisi de'],a:0},
  {t:'match',q:'Python kelimelerini eşleştir',pairs:[['if','eğer'],['else','değilse'],['for','tekrarla'],['print','yazdır']],monoL:true},
  {t:'line',q:'Hangi satırda hata var?',lines:['hava = "yağmurlu"','if hava == "yağmurlu"','    print("Şemsiye al")'],a:[1],tip:'if satırının sonunda iki nokta (:) olmalı.'},
  {t:'order',q:'Programı sırala: sayı 0\'dan büyükse Pozitif yazsın.',lines:true,items:['sayi = 5','if sayi > 0:','    print("Pozitif")']},
  {t:'type',q:'Ekranda ne görünür?',code:'a = 4\nif a == 4:\n    print("Evet")\nelse:\n    print("Hayır")',a:['evet']}
 ]}
]}
];
/* ALL_LESSONS, EXBYID ve UNIT_BADGE, alan ünitelerinden sonra js/egitim.js dosyasında oluşturulur. */

/* Günün bulmacaları (kısa çözüm uzunluğu + 3 blok sınırı) */
const DAILY=[
 {q:'Duvarın ucundan dolaşıp yıldıza ulaş.',map:['R....','####.','*....','.....','.....'],dir:1,max:15},
 {q:'İki yıldızı da topla. Duvarlara dikkat!',map:['*...R','.###.','.....','.###.','*....'],dir:3,max:12},
 {q:'Duvarın iki yanındaki yıldızları topla.',map:['.....','.*#*.','..#..','..R..','.....'],dir:0,max:14},
 {q:'Dört yöndeki yıldızları topla.',map:['..*..','.#.#.','R...*','.#.#.','..*..'],dir:1,max:18},
 {q:'Yukarı tırman ve iki yıldızı topla.',map:['....*','...#.','..*..','.#...','R....'],dir:0,max:13},
 {q:'Labirentten çık ve iki yıldızı topla.',map:['*#...','..#.R','.#...','..#.#','*....'],dir:3,max:17},
 {q:'Sütunların arasından geçerek yıldıza ulaş.',map:['R....','.#.#.','.....','.#.#.','....*'],dir:1,max:12},
 {q:'Duvarların uçlarındaki iki yıldızı topla.',map:['....*','.###.','R....','.###.','....*'],dir:1,max:16}
];
/* Sözlük */
const GLOSS=[
 {u:0,t:'Algoritma',d:'Bir işi yapmak için sırayla izlenen adımlar.',c:'1. Ekmeği al\n2. Peynir koy\n3. Ye'},
 {u:0,t:'Komut',d:'Bilgisayara verilen tek bir emir. "İleri git" bir komuttur.'},
 {u:0,t:'Program',d:'Bilgisayarın anlayacağı şekilde yazılmış algoritma.'},
 {u:0,t:'Hata (bug)',d:'Programdaki yanlış. İngilizcede böcek anlamına gelen bug denir.'},
 {u:0,t:'Hata ayıklama',d:'Programdaki hatayı bulup düzeltmek.'},
 {u:1,t:'Döngü',d:'Aynı komutları tekrar tekrar çalıştırmak.',c:'4 kez tekrarla:\n    İleri git'},
 {u:1,t:'Tekrar sayısı',d:'Döngünün kaç kez döneceği.'},
 {u:2,t:'Koşul',d:'Doğru mu yanlış mı diye bakılan bir soru. Doğruysa içindeki komut çalışır.',c:'Eğer ışık kırmızıysa:\n    Dur'},
 {u:2,t:'Değilse',d:'Koşul yanlış olduğunda çalışan kısım.'},
 {u:2,t:'Karşılaştırma',d:'İki değeri büyüklük ya da eşitlik bakımından kıyaslamak.',c:'8 > 3   # doğru\n4 == 5  # yanlış'},
 {u:3,t:'Değişken',d:'Adı olan ve içinde bilgi saklanan bir kutu.',c:'puan = 5'},
 {u:3,t:'Sayaç',d:'Her turda bir artan değişken. Kaç kez olduğunu sayar.',c:'sayaç = sayaç + 1'},
 {u:4,t:'Python',d:'Dünyada çok kullanılan gerçek bir programlama dili.'},
 {u:4,t:'print',d:'Python\'da ekrana yazı yazdıran komut.',c:'print("Merhaba")'},
 {u:4,t:'for',d:'Python\'da döngü kurmak için kullanılır.',c:'for i in range(3):\n    print("Hey")'},
 {u:4,t:'if / else',d:'Python\'da "eğer" ve "değilse".',c:'if puan > 50:\n    print("Geçtin")\nelse:\n    print("Tekrar dene")'},
 {u:4,t:'Girinti',d:'Satır başındaki boşluk. Python\'da hangi satırın döngünün ya da koşulun içinde olduğunu gösterir.'}
];


/* Çizim atölyesi görevleri (kalemli robot) */
const ANG=[30,45,60,72,90,120,144];
const PENC=['#A3461F','#4B5A3A','#D9822B','#2F2E24','#8E2B22','#2F6FB0'];
const CHAL=[
 {id:'kare',name:'Kare',hint:'4 eşit kenar, her köşede 90° dön.',sx:100,sy:200,prog:[{t:'rep',n:4,kids:[{t:'f',n:100},{t:'r',n:90}]}]},
 {id:'ucgen',name:'Üçgen',hint:'3 eşit kenar. 360 ÷ 3 = 120° dön.',sx:90,sy:220,prog:[{t:'rep',n:3,kids:[{t:'f',n:120},{t:'r',n:120}]}]},
 {id:'altigen',name:'Altıgen',hint:'6 kenar. 360 ÷ 6 = 60° dön.',sx:110,sy:210,prog:[{t:'rep',n:6,kids:[{t:'f',n:60},{t:'r',n:60}]}]},
 {id:'merdiven',name:'Merdiven',hint:'Yukarı, sağa, yukarı, sağa... 4 basamak.',sx:60,sy:250,prog:[{t:'rep',n:4,kids:[{t:'f',n:30},{t:'r',n:90},{t:'f',n:30},{t:'l',n:90}]}]},
 {id:'yildiz',name:'Yıldız',hint:'5 kenar, her köşede 144° dön.',sx:135,sy:200,prog:[{t:'rep',n:5,kids:[{t:'f',n:150},{t:'r',n:144}]}]},
 {id:'serbest',name:'Serbest çizim',hint:'İstediğini çiz! Kontrol yok.',sx:150,sy:150,free:true}
];

/* Mağaza */
const SHOP=[
 {id:'kalp',name:'Kalpleri doldur',desc:'Bütün kalplerin dolar.',price:50},
 {id:'koruyucu',name:'Seri koruyucu',desc:'Bir gün ders yapmazsan serin bozulmaz. En fazla 2 tane alabilirsin.',price:80},
 /* Anka'nın mutfağı: yuvada Anka'yı besler. t: tokluk, j: mutluluk */
 {id:'misir',name:'Mısır taneleri',desc:'Küçük ama doyurucu bir atıştırmalık.',price:5,food:{t:15,j:3}},
 {id:'elma',name:'Elma dilimi',desc:'Taze ve çıtır.',price:8,food:{t:20,j:6}},
 {id:'nar',name:'Hatay narı',desc:'Antakya\'nın kıpkırmızı narı. Anka bayılır!',price:12,food:{t:25,j:12}},
 {id:'kunefe',name:'Künefe',desc:'Hatay\'ın meşhur tatlısı. Anka için en büyük ödül.',price:20,food:{t:35,j:25}},
 /* Anka'nın dolabı: yuvada giydirilir */
 {id:'zeytin',name:'Zeytin tacı',desc:'Antakya\'nın zeytin dalları.',price:40,cos:1,slot:'head'},
 {id:'papyon',name:'Kırmızı papyon',desc:'Ödül töreni için şık bir papyon.',price:50,cos:1,slot:'neck'},
 {id:'gozluk',name:'Bilge gözlüğü',desc:'Anka daha bilge görünsün.',price:60,cos:1,slot:'face'},
 {id:'gunes',name:'Güneş gözlüğü',desc:'Hatay güneşine hazır.',price:70,cos:1,slot:'face'},
 {id:'atki',name:'Takım atkısı',desc:'Antioch Rising renklerinde sıcacık bir atkı.',price:80,cos:1,slot:'neck'},
 {id:'baret',name:'Mühendis bareti',desc:'Robot takımına hazır!',price:100,cos:1,slot:'head'},
 {id:'kep',name:'Mezuniyet kepi',desc:'Bütün dersleri bitirenlere yakışır.',price:120,cos:1,slot:'head'},
 {id:'tac',name:'Kıvılcım tacı',desc:'Kodlamanın kralı.',price:150,cos:1,slot:'head'}
];
const SLOTS={head:'Baş',face:'Yüz',neck:'Boyun'};

/* Günlük görev havuzu */
const QPOOL=[
 {id:'les2',name:'2 ders bitir',n:2,f:'lessons',gems:15,icon:'book'},
 {id:'combo5',name:'5 soruyu arka arkaya doğru bil',n:5,f:'combo',gems:15,icon:'bolt'},
 {id:'perf1',name:'Bir dersi hiç hata yapmadan bitir',n:1,f:'perfect',gems:20,icon:'target2'},
 {id:'robot3',name:'Robotu 3 kez yıldıza ulaştır',n:3,f:'robot',gems:15,icon:'robot'},
 {id:'lab2',name:'Laboratuvarda 2 görev bitir',n:2,f:'lab',gems:20,icon:'flask'},
 {id:'les3',name:'3 ders bitir',n:3,f:'lessons',gems:20,icon:'book'}
];
