/* #BilimKıvılcımı · Müfredat ve içerik verileri */
'use strict';

/* Robot haritası: . boş, # duvar, * yıldız, R robot. Yön: 0 yukarı, 1 sağ, 2 aşağı, 3 sol */
const U=[
{id:'u1',title:'Algoritma',desc:'Adım adım düşünmeyi öğren.',deco:'happy',
 guide:[{h:'Algoritma nedir?',p:'Bir işi yapmak için sırayla izlenen adımlara algoritma denir. Yemek tarifi de bir algoritmadır.'},
        {h:'Sıra önemlidir',p:'Bilgisayar adımları yazıldığı sırayla yapar. Sıra yanlışsa sonuç da yanlış olur.'},
        {h:'Hata',p:'Programdaki yanlışa hata (bug) denir. Hatayı bulup düzeltmeye hata ayıklama denir.'}],
 lessons:[
 {id:'u1l1',title:'Algoritma nedir?',ex:[
  {t:'info',h:'Adım adım',p:'Bir işi yapmak için sırayla izlediğimiz adımlara <b>algoritma</b> denir. Yemek tarifi de bir algoritmadır: önce tavayı ısıtırsın, sonra yumurtayı kırarsın.'},
  {t:'mc',q:'Hangisi bir algoritmadır?',opts:['Bir kek tarifi','Bir elma','Mavi renk','Bir kedi'],a:0,tip:'Tarif adım adım uygulanır. Ötekiler adım değil, birer nesnedir.'},
  {t:'order',q:'Dişlerini fırçalamanın adımlarını sırala.',lines:true,plain:true,items:['Diş fırçasını al','Üstüne macun sür','Dişlerini fırçala','Ağzını çalkala'],tip:'Önce fırçayı hazırlarız, sonra fırçalarız. Çalkalamak en sona kalır.'},
  {t:'mc',q:'Önce ayakkabını, sonra çorabını giyersen ne olur?',opts:['Olmaz, sıra yanlış','Fark etmez','Daha çabuk giyinirim'],a:0,tip:'Adımların sırası önemlidir. Sıra bozulursa iş de bozulur.'},
  {t:'info',h:'Komut ve program',p:'Algoritmanın her adımına <b>komut</b> denir. Komutları bilgisayarın anlayacağı biçimde yazarsak bir <b>program</b> olur. Bilgisayar komutları olduğu gibi yapar, kafasına göre davranmaz.'},
  {t:'order',q:'Bir çiçek yetiştirmenin adımlarını sırala.',lines:true,plain:true,items:['Saksıya toprak koy','Tohumu ek','Su ver','Filizlenmesini bekle'],tip:'Önce toprak, sonra tohum, sonra su. Filiz en son çıkar.'},
  {t:'match',q:'Eşleri bul',pairs:[['Algoritma','Sıralı adımlar'],['Komut','Tek bir adım'],['Program','Bilgisayar için yazılan adımlar']]}
 ]},
 {id:'u1l2',title:'Robota komut ver',ex:[
  {t:'info',h:'Robotun üç komutu',p:'Robotumuz üç komut bilir: <b>İleri git</b>, <b>Sola dön</b> ve <b>Sağa dön</b>. İleri giderken baktığı yöne yürür. Dönerken yerinden kıpırdamaz, yalnızca yüzünü çevirir.'},
  {t:'robot',q:'Robotu yıldıza götür. Yıldız tam karşısında!',map:['.....','.....','R..*.','.....','.....'],dir:1,max:5},
  {t:'mc',q:'Robot yukarı bakıyor ve "Sağa dön" komutunu alıyor. Artık nereye bakar?',opts:['Sağa','Sola','Aşağı','Yukarı'],a:0,tip:'Yukarı bakan biri sağa dönünce sağ tarafına bakar.'},
  {t:'mc',q:'Robot sağa bakıyor ve "Sola dön" komutunu alıyor. Artık nereye bakar?',opts:['Yukarı','Aşağı','Sola','Sağa'],a:0,tip:'Sağa bakan biri sola dönünce yukarıya, yani haritanın üst tarafına bakar.'},
  {t:'robot',q:'Robotu yıldıza götür. Bu sefer dönmen gerekecek.',map:['.R...','.....','.....','...*.','.....'],dir:1,max:8},
  {t:'robot',q:'İki yıldızı da topla. Hangisinden başlayacağına sen karar ver.',map:['R.*..','.....','..*..','.....','.....'],dir:1,max:6},
  {t:'mc',q:'Robotun önünde duvar var ve ona "İleri git" dedik. Ne olur?',opts:['Duvara çarpar','Duvarın içinden geçer','Duvarın üstünden atlar'],a:0,tip:'Robot yalnızca söyleneni yapar, duvarı görmez. Yolu sen planlamalısın.'}
 ]},
 {id:'u1l3',title:'Hata avcısı',ex:[
  {t:'info',h:'Hata avı',p:'Programdaki yanlışa <b>hata</b> denir. İngilizcede buna <i>bug</i>, yani böcek derler. Hatayı bulup düzeltmeye <b>hata ayıklama</b> denir.'},
  {t:'line',q:'Sandviç yapma adımlarından hangisi yanlış yerde?',lines:['Ekmeği ikiye kes','Sandviçi ye','Arasına peynir koy','Ekmeği kapat'],a:[1],plain:true,tip:'Sandviç hazır olmadan yenmez. Yemek en sona gelmeli.'},
  {t:'mc',q:'Robot sağa bakıyor, yıldız tam altında. Hangi program robotu yıldıza götürür?',mono:true,opts:['Sağa dön\nİleri git','Sola dön\nİleri git','İleri git\nİleri git'],a:0,tip:'Sağa bakan robot sağa dönünce aşağı bakar. Sonra yıldıza ilerler.'},
  {t:'robot',q:'Duvarın etrafından dolaşıp yıldıza ulaş.',map:['.....','R.#..','..#*.','.....','.....'],dir:1,max:11},
  {t:'fill',q:'Robot sağa bakıyor, yıldız tam yukarıda. İlk komut ne olmalı?',code:'1. ___\n2. İleri git',opts:['Sola dön','Sağa dön','İleri git'],a:0,tip:'Sağa bakan robot sola dönünce yukarı bakar.'},
  {t:'line',q:'Okula hazırlanma adımlarından hangisi yanlış yerde?',lines:['Uyan','Okula git','Giyin','Çantanı al'],a:[1],plain:true,tip:'Okula gitmek en sona gelmeli. Önce giyinip çantanı alırsın.'},
  {t:'mc',q:'Programın beklediğin gibi çalışmadı. İlk ne yaparsın?',opts:['Komutları tek tek izleyip yanlış yeri ararım','Programı tümden silerim','Bilgisayarı kapatırım'],a:0,tip:'Hata avcıları komutları sırayla izler, yanlış yeri bulunca yalnızca orayı düzeltir.'}
 ]}
]},
{id:'u2',title:'Döngüler',desc:'Aynı işi tekrar tekrar yaptır.',deco:'wow',
 guide:[{h:'Döngü nedir?',p:'Aynı komutları tekrar tekrar yaptırmaya döngü denir.',code:'4 kez tekrarla:\n    İleri git'},
        {h:'Kısa ve doğru',p:'Bu program dört kez "İleri git" yazmakla aynıdır. Döngü programı kısaltır.'},
        {h:'İçeriden başlayan satırlar',p:'Döngüye ait komutlar biraz içeriden başlar. Yalnızca onlar tekrarlanır.'}],
 lessons:[
 {id:'u2l1',title:'Tekrar eden adımlar',ex:[
  {t:'info',h:'Döngüyle tanış',p:'Anka üç kez zıplayacak. Üç kez "Zıpla" yazabiliriz. Peki yüz kez zıplayacaksa? Burada <b>döngü</b> imdadımıza yetişir: aynı komutu istediğimiz kadar tekrarlatır.',code:'3 kez tekrarla:\n    Zıpla'},
  {t:'mc',q:'"İleri git, İleri git, İleri git" programının kısa hâli hangisi?',mono:true,opts:['3 kez tekrarla:\n    İleri git','2 kez tekrarla:\n    İleri git','İleri git'],a:0,tip:'"3 kez tekrarla", içindeki komutu 3 kez yaptırır.'},
  {t:'fill',q:'Kurbağa 5 kez zıplamalı. Boşluğu doldur.',code:'___ kez tekrarla:\n    Zıpla',opts:['5','3','1'],a:0,tip:'Buraya yazılan sayı, kaç kez tekrarlanacağını söyler.'},
  {t:'info',h:'İçeride mi, dışarıda mı?',p:'Döngüye ait komutlar satıra biraz <b>içeriden</b> başlar ve yalnızca onlar tekrarlanır. Hizadan başlayan satır döngünün dışındadır, bir kez çalışır.',code:'2 kez tekrarla:\n    Zıpla\nAlkışla'},
  {t:'type',q:'Bu programda Anka kaç kez zıplar?',code:'2 kez tekrarla:\n    Zıpla\nAlkışla',a:['2','iki'],tip:'Yalnızca içeriden başlayan "Zıpla" tekrarlanır: 2 kez. "Alkışla" bir kez yapılır.'},
  {t:'mc',q:'Hangisi bir döngüye benzer?',opts:['İp atlarken 20 kez zıplamak','Pastayı bir kez kesmek','Okulun ilk günü'],a:0,tip:'Aynı hareketi tekrar tekrar yapıyorsan ortada bir döngü vardır.'},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['2 kez tekrarla: Alkışla','2 alkış'],['3 kez tekrarla: Zıpla','3 zıplama'],['4 kez tekrarla: Adım at','4 adım']]}
 ]},
 {id:'u2l2',title:'Döngülü robot',ex:[
  {t:'info',h:'Robota döngü',p:'Turuncu çerçeve bir döngüdür. Tekrar sayısını <b>−</b> ve <b>+</b> ile seç, komutları çerçevenin içine yerleştir.'},
  {t:'robot',q:'Robotu yıldıza götür. Tek komut yeter: İleri git. Kaç kez tekrarlanmalı?',map:['.....','.....','R...*','.....','.....'],dir:1,max:1,loop:true},
  {t:'type',q:'Bu program kaç kez alkışlar?',code:'3 kez tekrarla:\n    Alkışla\n    Zıpla',a:['3','üç'],tip:'Döngü 3 tur döner, her turda bir kez alkışlanır.'},
  {t:'robot',q:'Küçük merdiven! Dört komut tekrarlanıyor: ileri, sola dön, ileri, sağa dön.',map:['..*..','.....','R....','.....','.....'],dir:1,max:4,loop:true},
  {t:'robot',q:'Büyük merdiveni çık! Aynı dört komut, ama daha çok tekrar.',map:['...#*','..#..','.#...','#....','R....'],dir:1,max:4,loop:true},
  {t:'robot',q:'Üç yıldızı da topla. Karenin bütün kenarları eşit.',map:['R..*.','.....','.....','*..*.','.....'],dir:1,max:4,loop:true}
 ]},
 {id:'u2l3',title:'Döngüyle düşün',ex:[
  {t:'info',h:'Döngünün içinde döngü',p:'Bir döngünün içine başka bir döngü de koyabiliriz. 2 tepside 3\'er börek varsa toplam 2 × 3 = 6 börek eder. Dıştaki döngü tepsileri, içteki börekleri sayar.',code:'2 kez tekrarla:\n    3 kez tekrarla:\n        Börek ye'},
  {t:'mc',q:'Toplam kaç alkış olur?',code:'2 kez tekrarla:\n    3 kez tekrarla:\n        Alkışla',opts:['6','5','3','2'],a:0,tip:'Her dış turda 3 alkış var: 2 × 3 = 6.'},
  {t:'mc',q:'Hangi program robota bir kare çizdirir?',mono:true,opts:['4 kez tekrarla:\n    İleri git\n    Sağa dön','2 kez tekrarla:\n    İleri git\n    Sağa dön','4 kez tekrarla:\n    İleri git'],a:0,tip:'Karenin 4 kenarı var. Her kenarda ileri gidip sağa döneriz.'},
  {t:'order',q:'Merdiven çıkan robotun programını sırala.',lines:true,items:['4 kez tekrarla:','    İleri git','    Sola dön','    İleri git','    Sağa dön'],tip:'Önce döngünün başlığı gelir, komutlar altında ve içeriden başlar.'},
  {t:'type',q:'Robot toplam kaç adım ilerler?',code:'5 kez tekrarla:\n    İleri git\n    İleri git',a:['10','on'],tip:'Her turda 2 adım: 5 × 2 = 10.'},
  {t:'mc',q:'Robot 20 adım ilerleyecek. Döngüyle program kaç satır olur?',opts:['2 satır','20 satır','10 satır'],a:0,tip:'"20 kez tekrarla:" ve "İleri git" yeter. Döngünün gücü burada!'}
 ]}
]},
{id:'u3',title:'Koşullar',desc:'Bilgisayara karar verdir.',deco:'cheer',
 guide:[{h:'Eğer',p:'Koşul doğru ya da yanlış olabilen bir sorudur. Doğruysa içindeki komut çalışır.',code:'Eğer ışık kırmızıysa:\n    Dur'},
        {h:'Değilse',p:'Koşul yanlışsa ne yapılacağını "Değilse" söyler. İki yoldan biri mutlaka seçilir.',code:'Eğer yağmur yağıyorsa:\n    Şemsiye al\nDeğilse:\n    Şapka tak'},
        {h:'Karşılaştırma',p:'> büyüktür, < küçüktür, == eşittir, != eşit değildir demektir. Sonuç ya doğrudur ya yanlış.'}],
 lessons:[
 {id:'u3l1',title:'Eğer',ex:[
  {t:'info',h:'Bilgisayar da karar verir',p:'Sabah pencereden bakarsın: yağmur yağıyorsa şemsiyeni alırsın. Doğru ya da yanlış olabilen bu soruya <b>koşul</b> denir ve <b>Eğer</b> ile başlar. Koşul doğruysa komut çalışır, yanlışsa çalışmaz.',code:'Eğer ışık kırmızıysa:\n    Dur'},
  {t:'mc',q:'Bugün hava güneşli. Ne olur?',code:'Eğer hava yağmurluysa:\n    Şemsiye al',opts:['Şemsiye almayız','Şemsiye alırız','Hava yağmurlu olur'],a:0,tip:'Hava yağmurlu değil, yani koşul yanlış. İçindeki komut çalışmaz.'},
  {t:'match',q:'Eşleri bul',pairs:[['Işık kırmızıysa','Dur'],['Acıktıysan','Yemek ye'],['Kapı çalarsa','Kapıyı aç'],['Hava soğuksa','Mont giy']]},
  {t:'mc',q:'Telefonun şarjı %90. Şarja takar mıyız?',code:'Eğer şarj azsa:\n    Şarja tak',opts:['Hayır','Evet'],a:0,tip:'%90 az değildir. Koşul yanlış olduğu için şarja takmayız.'},
  {t:'info',h:'Koşulun içi',p:'Koşula bağlı komutlar da içeriden başlar. Hizadan başlayan komut koşula bağlı değildir, her zaman çalışır.',code:'Eğer acıktıysan:\n    Elma ye\nSu iç'},
  {t:'mc',q:'Hava soğuk değil. Hangi komut yine de çalışır?',code:'Eğer hava soğuksa:\n    Mont giy\nŞapka tak',opts:['Şapka tak','Mont giy','İkisi de','Hiçbiri'],a:0,tip:'"Şapka tak" içeriden başlamıyor, koşula bağlı değil. Her zaman çalışır.'},
  {t:'fill',q:'Boşluğu doldur.',code:'___ ışık yeşilse:\n    Karşıya geç',opts:['Eğer','Tekrarla','Değilse'],a:0,tip:'Koşul "Eğer" ile başlar. "Tekrarla" döngü içindir.'}
 ]},
 {id:'u3l2',title:'Değilse',ex:[
  {t:'info',fig:'kosul2',h:'Yol ikiye ayrılır',p:'Koşul yanlış olduğunda ne yapılacağını <b>Değilse</b> söyler. Koşul doğruysa bir yoldan, yanlışsa ötekinden gidilir.',code:'Eğer yağmur yağıyorsa:\n    Şemsiye al\nDeğilse:\n    Şapka tak'},
  {t:'mc',q:'Güneşli bir gün. Anka ne yapar?',code:'Eğer yağmur yağıyorsa:\n    Şemsiye al\nDeğilse:\n    Şapka tak',opts:['Şapka takar','Şemsiye alır','İkisini de yapar'],a:0,tip:'Yağmur yağmıyor, koşul yanlış. "Değilse" kısmı çalışır.'},
  {t:'mc',q:'Sayı 7. Ekrana ne yazılır?',code:'Eğer sayı 10\'dan büyükse:\n    "Büyük" yaz\nDeğilse:\n    "Küçük" yaz',opts:['Küçük','Büyük','Hiçbir şey'],a:0,tip:'7, 10\'dan büyük değil. Koşul yanlış, "Değilse" kısmı çalışır.'},
  {t:'type',q:'Sayı 15 olursa ekrana ne yazılır? (Tek kelime yaz.)',code:'Eğer sayı 10\'dan büyükse:\n    "Büyük" yaz\nDeğilse:\n    "Küçük" yaz',a:['büyük'],tip:'15, 10\'dan büyük. Koşul doğru, "Büyük" yazılır.'},
  {t:'order',q:'Programı sırala: Hava soğuksa mont giy, değilse tişört giy.',lines:true,items:['Eğer hava soğuksa:','    Mont giy','Değilse:','    Tişört giy'],tip:'Önce koşul ve altında yapılacak iş. Sonra "Değilse" ve altındaki iş.'},
  {t:'mc',q:'"Değilse" kısmı ne zaman çalışır?',opts:['Koşul yanlış olduğunda','Koşul doğru olduğunda','Her zaman'],a:0,tip:'"Değilse" yalnızca koşul yanlış olduğunda devreye girer.'}
 ]},
 {id:'u3l3',title:'Karşılaştır',ex:[
  {t:'info',h:'Hangisi büyük?',p:'Bilgisayar iki sayıyı karşılaştırabilir. <code>&gt;</code> "büyüktür", <code>&lt;</code> "küçüktür" demektir. İşaretin geniş ağzı büyük sayıya bakar. Sonuç ya doğrudur ya yanlış.',code:'8 > 3   # doğru\n2 > 6   # yanlış'},
  {t:'mc',q:'Bu doğru mu, yanlış mı?',code:'8 > 3',opts:['Doğru','Yanlış'],a:0,tip:'8, 3\'ten büyüktür.'},
  {t:'info',h:'Eşit mi?',p:'İki eşittir <code>==</code> "eşit mi?" diye sorar. <code>!=</code> "eşit değil", <code>&gt;=</code> ise "büyük ya da eşit" demektir.',code:'4 == 4   # doğru\n4 != 4   # yanlış\n5 >= 5   # doğru'},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['>','büyüktür'],['<','küçüktür'],['==','eşittir'],['!=','eşit değildir']]},
  {t:'mc',q:'Bu doğru mu, yanlış mı?',code:'4 == 5',opts:['Yanlış','Doğru'],a:0,tip:'4 ile 5 eşit değildir.'},
  {t:'mc',q:'Ela 9 yaşında. Ekrana ne yazılır?',code:'Eğer yaş >= 10:\n    "Büyük çocuk" yaz\nDeğilse:\n    "Küçük çocuk" yaz',opts:['Küçük çocuk','Büyük çocuk'],a:0,tip:'9 ne 10\'dan büyük ne de 10\'a eşit. Koşul yanlış.'},
  {t:'fill',q:'Puan 50\'den büyükse kazanalım.',code:'Eğer puan ___ 50:\n    "Kazandın" yaz',opts:['>','<','=='],a:0,tip:'"Büyükse" için > kullanılır.'}
 ]}
]},
{id:'u4',title:'Değişkenler',desc:'Bilgiyi kutularda sakla.',deco:'happy',
 guide:[{h:'Değişken bir kutudur',p:'Değişken, üzerinde adı yazan bir kutuya benzer. İçine bilgi koyarız.',code:'puan = 5'},
        {h:'= işareti',p:'Burada = "kutuya koy" demektir, matematikteki eşittir değildir.',code:'puan = 5\npuan = puan + 2\n# puan artık 7'},
        {h:'Sayaç',p:'Her turda bir artan değişkene sayaç denir. Döngülerle birlikte çok kullanılır.'}],
 lessons:[
 {id:'u4l1',title:'Bilgi kutusu',ex:[
  {t:'info',fig:'kutu',h:'Adı olan kutular',p:'<b>Değişken</b>, üzerinde adı yazan bir kutuya benzer. <code>puan = 5</code> yazınca "puan" adlı kutuya 5 koyarız.'},
  {t:'mc',q:'puan kutusunda ne var?',code:'puan = 5',opts:['5','puan','0'],a:0,tip:'Kutunun adı puan, içindeki değer 5.'},
  {t:'info',h:'Yazı da konur',p:'Kutuya yazı da koyabiliriz. Yazıyı <b>tırnak</b> içine alırız; tırnak "bu bir yazı" demektir.',code:'isim = "Ela"'},
  {t:'mc',q:'isim kutusunda ne var?',code:'isim = "Ela"',opts:['Ela','isim','Hiçbir şey'],a:0,tip:'Kutunun adı isim, içindeki yazı Ela.'},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['yaş = 10','yaş kutusunda 10'],['can = 3','can kutusunda 3'],['renk = "mavi"','renk kutusunda mavi']]},
  {t:'fill',q:'elma kutusuna 4 koy.',code:'elma ___ 4',opts:['=','+','?'],a:0,tip:'Kutuya bir şey koymak için = kullanırız.'}
 ]},
 {id:'u4l2',title:'Kutuyu değiştir',ex:[
  {t:'info',h:'Yeni değer, eskisinin yerine',p:'Kutudaki değeri değiştirebiliriz; yeni değer eskisinin yerini alır. <code>puan = puan + 2</code> şöyle okunur: "puandaki sayıya 2 ekle, sonucu yine puana koy." Kumbarandaki 5 liraya 2 lira eklemek gibi.',code:'puan = 5\npuan = puan + 2\n# puan artık 7'},
  {t:'type',q:'Sonunda x kaç?',code:'x = 4\nx = 9',a:['9'],tip:'Yeni değer eskisinin yerine geçer: x artık 9.'},
  {t:'type',q:'puan kaç oldu?',code:'puan = 5\npuan = puan + 3',a:['8'],tip:'Kutudaki 5\'e 3 eklenir: 8.'},
  {t:'info',h:'İşlem işaretleri',p:'<code>+</code> toplar, <code>-</code> çıkarır, <code>*</code> çarpar.',code:'a = 2\na = a * 3   # 2 çarpı 3'},
  {t:'mc',q:'a kaç oldu?',code:'a = 2\na = a * 3',opts:['6','5','2','23'],a:0,tip:'* çarpı demektir: 2 × 3 = 6.'},
  {t:'line',q:'Elif\'in 3 elması var, 1 elma daha alıyor. Hangi satır yanlış?',lines:['elma = 3','elma = elma - 1','Ekrana elma yaz'],a:[1],tip:'Elma aldıysa sayı artmalı: elma = elma + 1'},
  {t:'type',q:'Anka\'nın 10 künefesi var, 4\'ünü yedi. Kaç künefe kaldı?',code:'künefe = 10\nkünefe = künefe - 4',a:['6','altı'],tip:'10 − 4 = 6.'}
 ]},
 {id:'u4l3',title:'Sayaç',ex:[
  {t:'info',h:'Döngü ve değişken',p:'Her turda bir artan değişkene <b>sayaç</b> denir. Maçtaki skor tabelası gibi sayar.',code:'sayaç = 0\n3 kez tekrarla:\n    sayaç = sayaç + 1\n# sayaç artık 3'},
  {t:'mc',q:'Sayaç neden 0\'dan başlar?',opts:['Henüz hiçbir şey saymadık','Sıfır uğurludur','Bilgisayar sıfırı sever'],a:0,tip:'Saymaya başlamadan önce elimizde hiçbir şey yoktur.'},
  {t:'type',q:'Sonunda sayaç kaç?',code:'sayaç = 0\n5 kez tekrarla:\n    sayaç = sayaç + 1',a:['5','beş'],tip:'Her turda 1 artar. 5 tur sonra 5 olur.'},
  {t:'type',q:'Sonunda toplam kaç?',code:'toplam = 0\n4 kez tekrarla:\n    toplam = toplam + 2',a:['8','sekiz'],tip:'Her turda 2 eklenir: 2, 4, 6, 8.'},
  {t:'mc',q:'Sonunda yıldız kaç?',code:'yıldız = 10\n3 kez tekrarla:\n    yıldız = yıldız - 1',opts:['7','13','10','3'],a:0,tip:'Her turda 1 azalır: 9, 8, 7.'},
  {t:'order',q:'Sayaç programını sırala.',lines:true,items:['sayaç = 0','3 kez tekrarla:','    sayaç = sayaç + 1'],tip:'Önce kutu 0 ile hazırlanır. Sonra döngü gelir, artırma satırı döngünün içindedir.'}
 ]}
]},
{id:'u5',title:'İlk Python kodum',desc:'Gerçek bir programlama dili yaz.',deco:'cheer',
 guide:[{h:'Python',p:'Python gerçek bir programlama dilidir. Dünyada milyonlarca kişi kullanır.'},
        {h:'print ile yazdır',p:'Ekrana yazı yazdırmak için print kullanılır. Yazılar tırnak içine yazılır.',code:'print("Merhaba!")'},
        {h:'Girinti önemli',p:'for ve if satırları iki noktayla (:) biter. İçlerindeki satırlar 4 boşluk içeriden başlar.',code:'for i in range(3):\n    print("Hey!")'}],
 lessons:[
 {id:'u5l1',title:'print ile yazdır',ex:[
  {t:'info',h:'Python\'a hoş geldin',p:'Şimdi gerçek bir programlama diliyle tanışıyoruz: <b>Python</b>. Ekrana yazı yazdırmak için <code>print</code> kullanılır. Yazdırılacak yazı tırnak içinde olur.',code:'print("Merhaba Hatay!")'},
  {t:'mc',q:'Ekranda ne görünür?',code:'print("Bilim")',opts:['Bilim','print','"Bilim"','Hiçbir şey'],a:0,tip:'Tırnaklar ekrana yazılmaz, yalnızca yazının nerede başlayıp bittiğini gösterir.'},
  {t:'line',q:'Hangi satırda hata var?',lines:['print("Merhaba")','print("Nasılsın?)','print("Görüşürüz")'],a:[1],tip:'Tırnak açılmış ama kapanmamış. Doğrusu: print("Nasılsın?")'},
  {t:'fill',q:'Ekrana Kıvılcım yazdır.',code:'print(___)',opts:['"Kıvılcım"','Kıvılcım','(Kıvılcım)'],a:0,tip:'Yazı her zaman tırnak içinde olmalı.'},
  {t:'order',q:'Ekrana Merhaba yazan kodu kur.',items:['print','(','"Merhaba"',')'],extra:['yaz'],mono:true,tip:'Önce print, sonra parantez içinde tırnaklı yazı. Python\'da "yaz" diye bir komut yok.'},
  {t:'info',h:'Tırnak yoksa hesap',p:'Tırnak yoksa Python yazıyı değil, işlemin sonucunu yazar.',code:'print(3 + 4)   # 7 yazar'},
  {t:'mc',q:'Ekranda ne görünür?',code:'print(3 + 4)',opts:['7','3 + 4','34'],a:0,tip:'Tırnak olmadığı için Python toplar: 3 + 4 = 7.'}
 ]},
 {id:'u5l2',title:'Python\'da değişken',ex:[
  {t:'info',h:'Python\'da kutular',p:'Değişkenler Python\'da da aynı biçimde yazılır. Değişkeni yazdırırken tırnak kullanmayız; tırnak koyarsak Python kutuya bakmaz, yazıyı olduğu gibi basar.',code:'can = 3\nprint(can)   # 3 yazar'},
  {t:'mc',q:'Ekranda ne görünür?',code:'isim = "Ali"\nprint(isim)',opts:['Ali','isim','"isim"'],a:0,tip:'Tırnak yok, Python isim kutusunun içine bakar: Ali.'},
  {t:'mc',q:'Peki bu kod ne yazar?',code:'isim = "Ali"\nprint("isim")',opts:['isim','Ali'],a:0,tip:'Tırnak içindeki yazı olduğu gibi basılır.'},
  {t:'info',h:'Yan yana yazdır',p:'<code>print</code> içine virgülle ayırarak birden çok şey yazabiliriz. Python hepsini yan yana basar.',code:'isim = "Ali"\nprint("Merhaba", isim)   # Merhaba Ali'},
  {t:'mc',q:'Ekranda ne görünür?',code:'isim = "Ela"\nprint("Selam", isim)',opts:['Selam Ela','Selam isim','Ela Selam'],a:0,tip:'Önce tırnaklı yazı, sonra kutunun içindeki değer: Selam Ela.'},
  {t:'type',q:'Ekranda hangi sayı görünür?',code:'x = 5\ny = 3\nprint(x + y)',a:['8'],tip:'5 + 3 = 8.'},
  {t:'fill',q:'Ekranda 15 yazsın.',code:'puan = 10\npuan = puan ___ 5\nprint(puan)',opts:['+','-','*'],a:0,tip:'10 + 5 = 15.'}
 ]},
 {id:'u5l3',title:'for döngüsü',ex:[
  {t:'info',h:'Python\'da döngü',p:'Python\'da döngü <code>for</code> ile yazılır. <code>range(3)</code> "3 kez" demektir. Döngünün içindeki satırlar 4 boşluk içeriden başlar.',code:'for i in range(3):\n    print("Hey!")'},
  {t:'type',q:'Kıvılcım kaç kez yazılır?',code:'for i in range(4):\n    print("Kıvılcım")',a:['4','dört'],tip:'range(4) döngüyü 4 kez döndürür.'},
  {t:'fill',q:'Zıpla 5 kez yazılsın.',code:'for i in range(___):\n    print("Zıpla")',opts:['5','4','6'],a:0,tip:'range içindeki sayı tur sayısını belirler.'},
  {t:'info',h:'i nedir?',p:'Döngüdeki <code>i</code> her turun numarasını tutar. Python saymaya <b>0</b>\'dan başlar: <code>range(3)</code> 0, 1 ve 2\'yi verir.',code:'for i in range(3):\n    print(i)\n# 0\n# 1\n# 2'},
  {t:'mc',q:'Ekranda hangi sayılar görünür?',code:'for i in range(3):\n    print(i)',opts:['0 1 2','1 2 3','3','0 1 2 3'],a:0,tip:'Sayma 0\'dan başlar: 0, 1, 2. Yine 3 tur eder.'},
  {t:'mc',q:'Ekranda en son hangi sayı görünür?',code:'for i in range(5):\n    print(i)',opts:['4','5','6','0'],a:0,tip:'0, 1, 2, 3, 4: en sonuncusu 4.'},
  {t:'line',q:'Hangi satırın girintisi eksik?',lines:['for i in range(3):','print("Merhaba")'],a:[1],tip:'Döngünün içindeki satır 4 boşluk içeriden başlamalı.'}
 ]},
 {id:'u5l4',title:'if ile karar',ex:[
  {t:'info',h:'Python\'da eğer',p:'Python\'da "eğer" <code>if</code>, "değilse" <code>else</code> ile yazılır. Bu satırlar iki noktayla <code>:</code> biter. Eşitliği sorarken yine <code>==</code> kullanırız.',code:'puan = 70\nif puan > 50:\n    print("Geçtin!")\nelse:\n    print("Tekrar dene")'},
  {t:'mc',q:'Ekranda ne görünür?',code:'puan = 30\nif puan > 50:\n    print("Geçtin!")\nelse:\n    print("Tekrar dene")',opts:['Tekrar dene','Geçtin!','İkisi de'],a:0,tip:'30, 50\'den büyük değil. Koşul yanlış, else kısmı çalışır.'},
  {t:'match',q:'Python kelimelerini eşleştir',pairs:[['if','eğer'],['else','değilse'],['for','tekrarla'],['print','yazdır']],monoL:true},
  {t:'line',q:'Hangi satırda hata var?',lines:['hava = "yağmurlu"','if hava == "yağmurlu"','    print("Şemsiye al")'],a:[1],tip:'if satırı iki noktayla (:) bitmeli.'},
  {t:'mc',q:'Hangisi doğru yazılmış?',mono:true,opts:['if puan == 10:','if puan = 10:','if puan == 10'],a:0,tip:'Karşılaştırmada == kullanılır ve satır : ile biter.'},
  {t:'order',q:'Programı sırala: sayı 0\'dan büyükse Büyük yazsın.',lines:true,items:['sayi = 5','if sayi > 0:','    print("Büyük")'],tip:'Önce kutu, sonra if satırı, en son içeriden başlayan print.'},
  {t:'type',q:'Ekranda ne görünür?',code:'a = 4\nif a == 4:\n    print("Evet")\nelse:\n    print("Hayır")',a:['evet'],tip:'a, 4\'e eşit. Koşul doğru, "Evet" yazılır.'}
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
 {u:0,t:'Komut',d:'Bilgisayara verilen tek bir emir. "İleri git" bir komuttur.',c:'İleri git'},
 {u:0,t:'Program',d:'Bilgisayarın anlayacağı şekilde yazılmış algoritma.'},
 {u:0,t:'Hata (bug)',d:'Programdaki yanlış. İngilizcede böcek anlamına gelen bug denir.'},
 {u:0,t:'Hata ayıklama',d:'Programdaki hatayı bulup düzeltmek.'},
 {u:1,t:'Döngü',d:'Aynı komutları tekrar tekrar çalıştırmak.',c:'4 kez tekrarla:\n    İleri git'},
 {u:1,t:'Tekrar sayısı',d:'Döngünün kaç kez döneceği.'},
 {u:1,t:'İç içe döngü',d:'Döngünün içine konan başka bir döngü. 2 tepsi, her tepside 3 börek: 2 × 3 = 6 börek.',c:'2 kez tekrarla:\n    3 kez tekrarla:\n        Börek ye'},
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

/* Yazılım ünitelerinin görselleri (FIG js/gorsel.js içinde tanımlı) */
Object.assign(FIG,{
 kosul2:`<svg viewBox="0 0 360 160"><polygon points="180,8 270,52 180,96 90,52" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2.5"/>${gt(180,48,'Yağmur',{s:12})}${gt(180,63,'yağıyor mu?',{s:12})}<path d="M100 74 L62 108" stroke="${GK.ink}" stroke-width="3"/><path d="M260 74 L298 108" stroke="${GK.ink}" stroke-width="3"/>${gt(42,92,'EVET',{s:11,c:GK.olive})}${gt(314,92,'DEĞİLSE',{s:11,c:GK.garnet})}<rect x="8" y="110" width="120" height="36" rx="10" fill="${GK.olive}"/>${gt(68,133,'Şemsiye al',{s:13,c:GK.cream})}<rect x="232" y="110" width="120" height="36" rx="10" fill="${GK.terra}"/>${gt(292,133,'Şapka tak',{s:13,c:GK.cream})}</svg>`,
 kutu:`<svg viewBox="0 0 360 150">${[['puan','5',GK.terra,10],['isim','Ela',GK.olive,130],['can','3',GK.ember,250]].map(([a,v,c,x])=>`<rect x="${x}" y="40" width="100" height="70" rx="8" fill="${GK.sand}" stroke="${GK.ink}" stroke-width="2.5"/><rect x="${x+20}" y="28" width="60" height="22" rx="6" fill="${c}"/>${gt(x+50,44,a,{s:13,c:GK.cream})}${gt(x+50,92,v,{s:28})}`).join('')}${gt(180,134,'Her kutunun bir adı ve içinde bir değer var',{s:12,c:'#6B604A'})}</svg>`,
});
