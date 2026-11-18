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
  {t:'info',fig:'tarif',h:'Algoritma: adım adım yapılan iş',p:'Ben Anka! Sabahları yumurta pişiririm. Önce tavayı ısıtırım, sonra yumurtayı kırarım, sonra beklerim. Bu adımları sırayla yapmaya <b>algoritma</b> denir. Bir yemek tarifi de bir algoritmadır.'},
  {t:'mc',q:'Hangisi bir algoritmadır?',opts:['Bir kek tarifi','Bir elma','Mavi renk','Bir kedi'],a:0,tip:'Tarif, adım adım yapılan bir iştir. Elma, renk ve kedi adım değildir.'},
  {t:'order',q:'Dişlerini fırçalamak için adımları sırala.',lines:true,items:['Diş fırçasını al','Üstüne diş macunu sür','Dişlerini fırçala','Ağzını çalkala'],plain:true,tip:'Önce fırçayı hazırlarız, sonra fırçalarız. Çalkalamak en sonda gelir.'},
  {t:'mc',q:'Anka önce ayakkabısını, sonra çorabını giyerse ne olur?',opts:['İş yanlış olur, çünkü sıra bozuldu','Hiçbir şey değişmez, sıra önemsiz','İş daha hızlı biter'],a:0,tip:'Adımların sırası önemlidir. Sıra bozulursa sonuç da bozulur.'},
  {t:'info',h:'Komut ve program',p:'Algoritmadaki her adıma <b>komut</b> denir. "Dişlerini fırçala" bir komuttur. Komutları bilgisayarın anlayacağı dille yazarsak buna <b>program</b> denir. Bilgisayar komutu aynen yapar, kendi kendine düşünmez.'},
  {t:'order',q:'Bir bitki yetiştirmek için adımları sırala.',lines:true,plain:true,items:['Saksıya toprak koy','Tohumu ek','Su ver','Filizlenmesini bekle'],tip:'Önce toprak, sonra tohum, sonra su. Bitki en son büyür.'},
  {t:'match',q:'Eşleri bul',pairs:[['Algoritma','Sırayla yapılan adımlar'],['Komut','Tek bir adım'],['Program','Bilgisayarın anlayacağı algoritma'],['Bilgisayar','Komutu aynen yapar']]}
 ]},
 {id:'u1l2',title:'Robota komut ver',ex:[
  {t:'info',h:'Robot üç komut biliyor',p:'Bu robot yalnızca üç şey yapabilir: <b>İleri git</b>, <b>Sola dön</b> ve <b>Sağa dön</b>. Robot hep baktığı yöne yürür. Dönmek, yerinde çeyrek tur çevirmektir. Sen de sağa dönünce sağa bakarsın!'},
  {t:'robot',q:'Robotu yıldıza götür. Yıldız tam önünde!',map:['.....','.....','R..*.','.....','.....'],dir:1,max:5},
  {t:'mc',q:'Robot yukarı bakıyor. "Sağa dön" komutunu alırsa hangi yöne bakar?',opts:['Sağa','Sola','Aşağı','Yukarı'],a:0,tip:'Yukarı bakan biri sağa dönünce sağ tarafına bakar.'},
  {t:'mc',q:'Robot sağa bakıyor. "Sola dön" komutunu alırsa hangi yöne bakar?',opts:['Yukarı','Aşağı','Sola','Sağa'],a:0,tip:'Sağa bakan biri sola dönünce yukarı bakar. Haritada yukarı, sayfanın üst tarafıdır.'},
  {t:'robot',q:'Robotu yıldıza götür. Bu sefer dönmen gerekecek!',map:['.R...','.....','.....','...*.','.....'],dir:1,max:8},
  {t:'robot',q:'İki yıldızı da topla. Önce hangisine gideceğini sen seç.',map:['R.*..','.....','..*..','.....','.....'],dir:1,max:6},
  {t:'mc',q:'Robotun önünde duvar var. "İleri git" komutunu verdik. Ne olur?',opts:['Robot duvara çarpar','Robot duvarın içinden geçer','Robot duvarı zıplar'],a:0,tip:'Robot sadece komutu yapar, duvarı kendisi görmez. Yolu sen düşünmelisin!'}
 ]},
 {id:'u1l3',title:'Hata avcısı',ex:[
  {t:'info',h:'Hata avına çıkıyoruz',p:'Programdaki yanlışa <b>hata</b> denir. İngilizcede buna <b>bug</b>, yani böcek derler. Ama bilgisayarın içinde gerçek böcek yok! Hata, yazdığımız komutlardadır. Hatayı bulup düzeltmeye <b>hata ayıklama</b> denir.'},
  {t:'line',q:'Sandviç yapma algoritmasında hangi adım yanlış yerde?',lines:['Ekmeği ikiye kes','Sandviçi ye','Arasına peynir koy','Ekmeği kapat'],a:[1],plain:true,tip:'Sandviçi en sonda yemeliyiz. Önce peyniri koyup ekmeği kapatmalıyız.'},
  {t:'mc',q:'Robot sağa bakıyor ve yıldız tam altında. Hangi program robotu yıldıza götürür?',mono:true,opts:['Sağa dön\nİleri git','Sola dön\nİleri git','İleri git\nİleri git'],a:0,tip:'Aşağı bakmak için sağa döneriz. Sonra yıldıza doğru ilerleriz.'},
  {t:'robot',q:'Duvarın etrafından dolaşarak yıldıza ulaş.',map:['.....','R.#..','..#*.','.....','.....'],dir:1,max:11},
  {t:'fill',q:'Robot sağa bakıyor. Yıldız tam yukarıda. İlk komut ne olmalı?',code:'1. ___\n2. İleri git',opts:['Sola dön','Sağa dön','İleri git'],a:0,tip:'Sağa bakan robot sola dönünce yukarı bakar. Sonra ileri gidebilir.'},
  {t:'line',q:'Okula hazırlanma algoritmasında hangi adım yanlış yerde?',lines:['Uyan','Okula git','Giyin','Çantanı al'],a:[1],plain:true,tip:'Okula gitmeyi en sona koymalıyız. Önce giyinip çantamızı almalıyız.'},
  {t:'mc',q:'Programın hata yaptı. İlk ne yapmalısın?',opts:['Komutları tek tek takip edip hatayı ararım','Bilgisayarı kapatıp kaçarım','Bütün programı silerim'],a:0,tip:'Hata avcıları komutları sırayla izler. Yanlış yeri bulunca sadece orayı düzeltirler.'},
  {t:'mc',q:'Hatayı bulup düzeltmeye ne denir?',opts:['Hata ayıklama','Kopyalama','Boyama'],a:0,tip:'Hata ayıklama: hatayı bulmak ve düzeltmek.'}
 ]}
]},
{id:'u2',title:'Döngüler',desc:'Aynı işi tekrar tekrar yaptır.',deco:'wow',
 guide:[{h:'Döngü nedir?',p:'Aynı adımları tekrar tekrar yapmaya döngü denir.',code:'4 kez tekrarla:\n    İleri git'},
        {h:'Kısa ve doğru',p:'Bu program, dört kez "İleri git" yazmakla aynıdır. Döngü programı kısaltır ve hata yapmayı azaltır.'},
        {h:'İçerdeki satırlar',p:'Döngünün içindeki komutlar biraz içeriden başlar. Böylece hangi komutların tekrar edileceği anlaşılır.'}],
 lessons:[
 {id:'u2l1',title:'Tekrar eden adımlar',ex:[
  {t:'info',fig:'dongu',h:'Döngülerle tanış',p:'Anka 3 kez zıplayacak. "Zıpla, Zıpla, Zıpla" yazabiliriz. Ama 100 kez zıplasa? Yazarken parmaklarımız yorulur! Bunun yerine <b>döngü</b> kullanırız. Döngü, aynı işi tekrar tekrar yaptırır.',code:'3 kez tekrarla:\n    Zıpla'},
  {t:'mc',q:'Hangisi "İleri git, İleri git, İleri git" programının kısa hâlidir?',mono:true,opts:['3 kez tekrarla:\n    İleri git','2 kez tekrarla:\n    İleri git','İleri git'],a:0,tip:'3 kez tekrarla demek, içindeki komutu 3 kez yapmaktır.'},
  {t:'fill',q:'Kurbağa 5 kez zıplamalı. Boşluğu doldur.',code:'___ kez tekrarla:\n    Zıpla',opts:['5','3','1'],a:0,tip:'Sayı, kaç kez tekrar edileceğini söyler. 5 kez zıplayacaksak 5 yazarız.'},
  {t:'info',h:'İçeriden başlayan satırlar',p:'Döngünün içindeki komutlar biraz <b>içeriden</b> başlar. Sadece onlar tekrar eder. İçeriden başlamayan satır, döngünün dışındadır ve bir kez çalışır.',code:'2 kez tekrarla:\n    Zıpla\nAlkışla'},
  {t:'type',q:'Bu programda "Zıpla" kaç kez yapılır? (Alkışla döngünün dışında.)',code:'2 kez tekrarla:\n    Zıpla\nAlkışla',a:['2','iki'],tip:'Sadece içeriden başlayan "Zıpla" tekrar eder: 2 kez. "Alkışla" bir kez yapılır.'},
  {t:'type',q:'Bu program kaç kez "Merhaba" der?',code:'4 kez tekrarla:\n    Merhaba de',a:['4','dört'],tip:'Döngü 4 kez döner. Her turda bir kez "Merhaba" der.'},
  {t:'mc',q:'Hangisi bir döngüye benzer?',opts:['Atlama ipinde 20 kez zıplamak','Doğum günü pastasını bir kez kesmek','Okula ilk gün gitmek'],a:0,tip:'Aynı hareketi tekrar tekrar yapıyorsan döngü var demektir. Pastayı bir kez kesersin.'},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['2 kez tekrarla: Alkışla','2 alkış'],['3 kez tekrarla: Zıpla','3 zıplama'],['1 kez tekrarla: Dön','1 dönüş'],['4 kez tekrarla: Adım at','4 adım']]}
 ]},
 {id:'u2l2',title:'Döngülü robot',ex:[
  {t:'info',h:'Robota döngü öğretelim',p:'Turuncu çerçeve bir döngüdür. Kaç kez tekrar edeceğini <b>−</b> ve <b>+</b> ile seç. Komutları çerçevenin içine koy. İçindeki her şey, seçtiğin sayı kadar tekrar eder.'},
  {t:'robot',q:'Robotu yıldıza götür. Tek komut yeter: İleri git. Kaç kez tekrar etmeli?',map:['.....','.....','R...*','.....','.....'],dir:1,max:1,loop:true},
  {t:'type',q:'Bu program kaç kez alkışlar? (Zıpla\'ya bakma, alkışı say!)',code:'3 kez tekrarla:\n    Alkışla\n    Zıpla',a:['3','üç'],tip:'Döngü 3 tur döner. Her turda bir kez alkışlar ve bir kez zıplar.'},
  {t:'robot',q:'Küçük merdiven! Aynı dört komut tekrar ediyor: ileri, sola dön, ileri, sağa dön.',map:['..*..','.....','R....','.....','.....'],dir:1,max:4,loop:true},
  {t:'robot',q:'Büyük merdiveni çık! Yine aynı dört komut, ama daha çok tekrar.',map:['...#*','..#..','.#...','#....','R....'],dir:1,max:4,loop:true},
  {t:'robot',q:'Üç yıldızı da topla. Karenin her kenarı aynı uzunlukta.',map:['R..*.','.....','.....','*..*.','.....'],dir:1,max:4,loop:true}
 ]},
 {id:'u2l3',title:'Döngüyle düşün',ex:[
  {t:'info',h:'Döngünün içinde döngü',p:'Döngünün içine başka bir döngü koyabiliriz. 2 tepsi var ve her tepside 3 börek olsun. Toplam kaç börek? 2 tepsi × 3 börek = 6 börek. Dış döngü tepsileri, iç döngü börekleri sayar.',code:'2 kez tekrarla:\n    3 kez tekrarla:\n        Börek ye'},
  {t:'mc',q:'Toplam kaç alkış olur?',code:'2 kez tekrarla:\n    3 kez tekrarla:\n        Alkışla',opts:['6','5','3','2'],a:0,tip:'Her dış turda 3 alkış var. 2 tur × 3 alkış = 6 alkış.'},
  {t:'mc',q:'Hangi program robota bir kare çizdirir?',mono:true,opts:['4 kez tekrarla:\n    İleri git\n    Sağa dön','2 kez tekrarla:\n    İleri git\n    Sağa dön','4 kez tekrarla:\n    İleri git'],a:0,tip:'Karenin 4 kenarı var. Her kenarda ileri gidip sağa döneriz.'},
  {t:'order',q:'Merdiven çıkan robotun programını sırala. (İleri, sola dön, ileri, sağa dön)',lines:true,items:['4 kez tekrarla:','    İleri git','    Sola dön','    İleri git','    Sağa dön'],tip:'Önce döngünün başlığı gelir. Komutlar onun altında, içeriden başlar.'},
  {t:'type',q:'Robot toplam kaç adım ileri gider?',code:'5 kez tekrarla:\n    İleri git\n    İleri git',a:['10','on'],tip:'Her turda 2 adım var. 5 tur × 2 adım = 10 adım.'},
  {t:'mc',q:'Robot 20 adım ileri gidecek. Döngüyle program kaç satır olur?',opts:['2 satır','20 satır','10 satır'],a:0,tip:'"20 kez tekrarla:" ve "İleri git" yazarız. Sadece 2 satır! Döngü işte bu yüzden süper.'},
  {t:'match',q:'Eşleri bul',pairs:[['Döngü','Tekrar etmek'],['Tekrar sayısı','Kaç kez'],['Döngünün içi','Tekrar eden komutlar'],['İç içe döngü','Döngünün içinde döngü']]}
 ]}
]},
{id:'u3',title:'Koşullar',desc:'Bilgisayara karar verdir.',deco:'cheer',
 guide:[{h:'Eğer... ise',p:'Koşul, bir şeyin doğru olup olmadığına bakar. Doğruysa içindeki komut çalışır.',code:'Eğer ışık kırmızıysa:\n    Dur'},
        {h:'Değilse',p:'Koşul yanlışsa ne yapılacağını "Değilse" söyler. İki yoldan biri mutlaka seçilir.',code:'Eğer yağmur yağıyorsa:\n    Şemsiye al\nDeğilse:\n    Şapka tak'},
        {h:'Karşılaştırma',p:'> büyüktür, < küçüktür, == eşittir, != eşit değildir demektir. Sonuç ya doğru ya yanlıştır.'}],
 lessons:[
 {id:'u3l1',title:'Eğer... ise',ex:[
  {t:'info',fig:'kosul',h:'Bilgisayar da karar verir',p:'Sen her sabah pencereye bakarsın. Yağmur yağıyorsa şemsiye alırsın. Buna <b>koşul</b> denir: doğru mu yanlış mı diye sorulan bir soru. <b>Eğer</b> ile başlar. Koşul doğruysa komut çalışır, yanlışsa çalışmaz.',code:'Eğer ışık kırmızıysa:\n    Dur'},
  {t:'mc',q:'Bugün hava güneşli. Ne olur?',code:'Eğer hava yağmurluysa:\n    Şemsiye al',opts:['Şemsiye almayız','Şemsiye alırız','Hava yağmurlu olur'],a:0,tip:'Hava yağmurlu değil, yani koşul yanlış. İçindeki komut çalışmaz.'},
  {t:'match',q:'Eşleri bul',pairs:[['Işık kırmızıysa','Dur'],['Acıktıysan','Yemek ye'],['Kapı çalarsa','Kapıyı aç'],['Hava soğuksa','Mont giy']]},
  {t:'mc',q:'Telefonun şarjı %90. Telefonu şarja takar mıyız?',code:'Eğer şarj azsa:\n    Şarja tak',opts:['Hayır','Evet'],a:0,tip:'%90 şarj az değildir. Koşul yanlış olduğu için şarja takmayız.'},
  {t:'info',h:'Koşulun içi içeriden başlar',p:'Döngülerde olduğu gibi, koşulun içindeki komutlar içeriden başlar. Sadece onlar koşula bağlıdır. İçeriden başlamayan komut, her zaman çalışır.',code:'Eğer acıktıysan:\n    Elma ye\nSu iç'},
  {t:'mc',q:'Hava soğuk değil. Hangi komut yine de çalışır?',code:'Eğer hava soğuksa:\n    Mont giy\nŞapka tak',opts:['Şapka tak','Mont giy','İkisi de','Hiçbiri'],a:0,tip:'"Şapka tak" içeriden başlamıyor, koşula bağlı değil. Her zaman çalışır.'},
  {t:'fill',q:'Boşluğu doldur.',code:'___ ışık yeşilse:\n    Karşıdan geç',opts:['Eğer','Tekrarla','Değilse'],a:0,tip:'Koşul "Eğer" kelimesiyle başlar. "Tekrarla" döngüler içindir.'}
 ]},
 {id:'u3l2',title:'Eğer... değilse',ex:[
  {t:'info',fig:'kosul2',h:'İki yol var',p:'<b>Değilse</b>, koşul yanlış olduğunda ne yapılacağını söyler. Yolun ikiye ayrıldığını düşün: koşul doğruysa bir yoldan, yanlışsa öbür yoldan gideriz. İki yoldan biri mutlaka seçilir.',code:'Eğer zar 6 ise:\n    Sevin\nDeğilse:\n    Tekrar at'},
  {t:'mc',q:'Güneşli bir gün. Anka ne alır?',code:'Eğer yağmur yağıyorsa:\n    Şemsiye al\nDeğilse:\n    Şapka tak',opts:['Şapka alır','Şemsiye alır','İkisini de alır'],a:0,tip:'Yağmur yağmıyor, koşul yanlış. O zaman "Değilse" kısmı çalışır: şapka.'},
  {t:'mc',q:'Sayı 7. Ekrana ne yazılır?',code:'Eğer sayı 10\'dan büyükse:\n    "Büyük" yaz\nDeğilse:\n    "Küçük" yaz',opts:['Küçük','Büyük','Hiçbir şey'],a:0,tip:'7, 10\'dan büyük değil. Koşul yanlış, "Değilse" kısmı çalışır.'},
  {t:'type',q:'Sayı 15 olursa ekrana ne yazılır? (Tek kelime yaz.)',code:'Eğer sayı 10\'dan büyükse:\n    "Büyük" yaz\nDeğilse:\n    "Küçük" yaz',a:['büyük'],tip:'15, 10\'dan büyük. Koşul doğru, bu yüzden "Büyük" yazılır.'},
  {t:'order',q:'Programı sırala: Hava soğuksa mont giy, değilse tişört giy.',lines:true,items:['Eğer hava soğuksa:','    Mont giy','Değilse:','    Tişört giy'],tip:'Önce koşul, altında doğruysa yapılacak iş. Sonra "Değilse" ve yanlışsa yapılacak iş.'},
  {t:'mc',q:'"Değilse" kısmı ne zaman çalışır?',opts:['Koşul yanlış olduğunda','Koşul doğru olduğunda','Her zaman'],a:0,tip:'"Değilse", koşul yanlış olunca devreye girer. Koşul doğruysa atlanır.'}
 ]},
 {id:'u3l3',title:'Karşılaştır',ex:[
  {t:'info',h:'Hangisi büyük?',p:'Bilgisayar iki sayıyı karşılaştırabilir. <code>&gt;</code> "büyüktür", <code>&lt;</code> "küçüktür" demektir. İşaretin açık tarafı büyük sayıya bakar. Sonuç ya <b>doğru</b> ya <b>yanlış</b> olur.',code:'8 > 3   # doğru\n2 > 6   # yanlış'},
  {t:'mc',q:'Bu doğru mu, yanlış mı?',code:'8 > 3',opts:['Doğru','Yanlış'],a:0,tip:'8, 3\'ten büyüktür. Doğru!'},
  {t:'mc',q:'Bu doğru mu, yanlış mı?',code:'2 > 6',opts:['Yanlış','Doğru'],a:0,tip:'2, 6\'dan büyük değil. Yanlış.'},
  {t:'info',h:'Eşit mi, değil mi?',p:'Bir eşittir (<code>=</code>) ileride kutuya bir şey koymak için lazım olacak. İki eşittir <code>==</code> ise soru sorar: "eşit mi?" Ünlem "değil" demektir: <code>!=</code> "eşit değil" olur. <code>&gt;=</code> ise "büyük veya eşit" demektir.',code:'4 == 4   # doğru\n4 != 4   # yanlış\n5 >= 5   # doğru'},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['>','büyüktür'],['<','küçüktür'],['==','eşittir'],['!=','eşit değildir']]},
  {t:'mc',q:'Bu doğru mu, yanlış mı?',code:'4 == 5',opts:['Yanlış','Doğru'],a:0,tip:'4 ile 5 eşit değil. "Eşit mi?" sorusunun cevabı yanlış.'},
  {t:'mc',q:'Bu doğru mu, yanlış mı?',code:'7 != 2',opts:['Doğru','Yanlış'],a:0,tip:'7 ile 2 eşit değil, yani "!=" doğru çıkar.'},
  {t:'mc',q:'Ela 9 yaşında. Ekrana ne yazılır?',code:'Eğer yaş >= 10:\n    "Büyük çocuk" yaz\nDeğilse:\n    "Küçük çocuk" yaz',opts:['Küçük çocuk','Büyük çocuk'],a:0,tip:'>= "büyük veya eşit" demektir. 9, 10\'dan küçüktür, 10\'a eşit de değil.'},
  {t:'fill',q:'Puan 50\'den büyükse kazanalım.',code:'Eğer puan ___ 50:\n    "Kazandın" yaz',opts:['>','<','=='],a:0,tip:'"Büyükse" için > kullanılır. İşaretin açık tarafı puana bakmalı.'}
 ]}
]},
{id:'u4',title:'Değişkenler',desc:'Bilgiyi kutularda sakla.',deco:'happy',
 guide:[{h:'Değişken bir kutudur',p:'Değişken, üzerinde adı yazan bir kutu gibidir. İçine bilgi koyarız.',code:'puan = 5'},
        {h:'= işareti',p:'Burada = işareti "kutuya koy" demektir. Matematikteki eşittir gibi değildir.',code:'puan = 5\npuan = puan + 2\n# artık puan 7'},
        {h:'Sayaç',p:'Her turda 1 artan değişkene sayaç denir. Döngülerle birlikte çok kullanılır.'}],
 lessons:[
 {id:'u4l1',title:'Bilgi kutusu',ex:[
  {t:'info',fig:'kutu',h:'Değişkenler kutu gibidir',p:'Okul çantandaki kutuların üstünde isim yazar: "kalem kutusu", "beslenme kutusu". <b>Değişken</b> de böyledir: adı olan bir kutudur. <code>puan = 5</code> yazınca "puan" adlı kutuya 5 koyarız.',code:'puan = 5'},
  {t:'mc',q:'puan kutusunda ne var?',code:'puan = 5',opts:['5','puan','0'],a:0,tip:'Kutunun adı puan, içindeki değer 5.'},
  {t:'info',h:'Sayı mı, yazı mı?',p:'Kutuya sayı koyabiliriz: <code>puan = 5</code>. Yazı koyacaksak yazıyı <b>tırnak</b> içine alırız: <code>isim = "Ela"</code>. Tırnak, "bu bir yazı" demektir.',code:'isim = "Ela"'},
  {t:'mc',q:'isim kutusunda ne var?',code:'isim = "Ela"',opts:['Ela','isim','Hiçbir şey'],a:0,tip:'Kutunun adı isim, içindeki yazı Ela.'},
  {t:'match',q:'Eşleri bul',mono:true,pairs:[['yaş = 10','yaş kutusunda 10'],['can = 3','can kutusunda 3'],['renk = "mavi"','renk kutusunda mavi']]},
  {t:'fill',q:'elma kutusuna 4 koy.',code:'elma ___ 4',opts:['=','+','?'],a:0,tip:'Kutuya bir şey koymak için = kullanırız.'}
 ]},
 {id:'u4l2',title:'Kutuyu değiştir',ex:[
  {t:'info',fig:'kutu2',h:'Yeni değer, eskisinin yerine',p:'Kutudaki değeri değiştirebiliriz. Yeni koyduğumuz değer eskisinin yerini alır. Kumbaranda 5 lira var, 2 lira daha attın: artık 7 lira. <code>puan = puan + 2</code> satırı şunu der: "puan kutusundaki sayıya 2 ekle ve kutuya geri koy."',code:'puan = 5\npuan = puan + 2\n# artık puan 7'},
  {t:'type',q:'Sonunda x kaç?',code:'x = 4\nx = 9',a:['9'],tip:'Yeni değer eskisinin yerine geçer. x kutusunda artık 9 var.'},
  {t:'type',q:'puan kaç oldu?',code:'puan = 5\npuan = puan + 3',a:['8'],tip:'Önce kutudaki 5\'e 3 ekleriz: 8. Sonra 8\'i kutuya koyarız.'},
  {t:'info',h:'İşaretler',p:'Bilgisayarda <code>+</code> topla, <code>-</code> çıkar, <code>*</code> çarp demektir. Yani <code>*</code> çarpı işaretidir.',code:'a = 2\na = a * 3   # 2 çarpı 3'},
  {t:'mc',q:'a kaç oldu?',code:'a = 2\na = a * 3',opts:['6','5','2','23'],a:0,tip:'* çarpı demektir. 2 × 3 = 6.'},
  {t:'line',q:'Elif\'in 3 elması var ve 1 elma daha alıyor. Hangi satır yanlış?',lines:['elma = 3','elma = elma - 1','Ekrana elma yaz'],a:[1],tip:'Elma aldıysa sayı artmalı, yani eklemeliyiz: elma = elma + 1'},
  {t:'type',q:'Anka\'nın 10 künefesi var, 4 tanesini yedi. Sonunda kaç künefe kaldı?',code:'künefe = 10\nkünefe = künefe - 4',a:['6','altı'],tip:'Yemek sayıyı azaltır. 10 − 4 = 6.'}
 ]},
 {id:'u4l3',title:'Sayaç',ex:[
  {t:'info',h:'Döngü + değişken',p:'Maçta skor tabelası golleri sayar. Döngü ile değişkeni birlikte kullanırsak biz de saydırabiliriz. Her turda 1 artan değişkene <b>sayaç</b> denir.',code:'sayaç = 0\n3 kez tekrarla:\n    sayaç = sayaç + 1\n# sayaç artık 3'},
  {t:'mc',q:'Sayaç neden 0 ile başlar?',opts:['Henüz hiçbir şey saymadık','0 şanslı sayıdır','Bilgisayar 0\'ı sever'],a:0,tip:'Saymaya başlamadan önce hiç yok, yani 0. Her turda 1 eklenir.'},
  {t:'type',q:'Sonunda sayaç kaç?',code:'sayaç = 0\n5 kez tekrarla:\n    sayaç = sayaç + 1',a:['5','beş'],tip:'Her turda sayaç 1 artar. 5 tur sonra sayaç 5 olur.'},
  {t:'type',q:'Sonunda toplam kaç?',code:'toplam = 0\n4 kez tekrarla:\n    toplam = toplam + 2',a:['8','sekiz'],tip:'Her turda 2 eklenir: 2, 4, 6, 8.'},
  {t:'mc',q:'Sonunda yıldız kaç?',code:'yıldız = 10\n3 kez tekrarla:\n    yıldız = yıldız - 1',opts:['7','13','10','3'],a:0,tip:'Her turda 1 azalır: 9, 8, 7.'},
  {t:'order',q:'Sayaç programını sırala.',lines:true,items:['sayaç = 0','3 kez tekrarla:','    sayaç = sayaç + 1'],tip:'Önce kutuyu 0 ile hazırlarız. Sonra döngü gelir, artırma satırı döngünün içindedir.'}
 ]}
]},
{id:'u5',title:'İlk Python kodum',desc:'Gerçek bir programlama dili yaz.',deco:'cheer',
 guide:[{h:'Python',p:'Python gerçek bir programlama dilidir. Dünyada milyonlarca kişi kullanır.'},
        {h:'print ile yazdır',p:'Ekrana yazı yazdırmak için print kullanılır. Yazılar tırnak içine yazılır.',code:'print("Merhaba!")'},
        {h:'Girinti önemli',p:'for ve if satırlarının sonuna iki nokta (:) konur. İçlerindeki satırlar 4 boşluk içeriden başlar.',code:'for i in range(3):\n    print("Hey!")'}],
 lessons:[
 {id:'u5l1',title:'print ile yazdır',ex:[
  {t:'info',fig:'py',h:'Python\'a hoş geldin!',p:'Artık bilgisayarla gerçek dilinde konuşuyoruz! Python\'da ekrana yazı yazdırmak için <code>print</code> kullanılır. "Print" İngilizcede "bas, yazdır" demektir. Yazı tırnak içinde olmalı.',code:'print("Merhaba Hatay!")'},
  {t:'mc',q:'Ekranda ne görünür?',code:'print("Bilim")',opts:['Bilim','print','"Bilim"','Hiçbir şey'],a:0,tip:'Tırnaklar ekrana yazılmaz. Sadece "buradaki yazıyı yazdır" der.'},
  {t:'line',q:'Hangi satırda hata var?',lines:['print("Merhaba")','print("Nasılsın?)','print("Görüşürüz")'],a:[1],tip:'Tırnak açılmış ama kapanmamış. Doğrusu: print("Nasılsın?")'},
  {t:'fill',q:'Ekrana Kıvılcım yazdır.',code:'print(___)',opts:['"Kıvılcım"','Kıvılcım','(Kıvılcım)'],a:0,tip:'Yazı her zaman tırnak içinde olmalı.'},
  {t:'order',q:'Ekrana Merhaba yazan kodu kur.',items:['print','(','"Merhaba"',')'],extra:['yaz'],mono:true,tip:'Önce print, sonra parantez içinde tırnaklı yazı. "yaz" Python\'da yok!'},
  {t:'info',h:'Tırnak yoksa hesap var',p:'Tırnağın içindeki yazı olduğu gibi çıkar. Tırnak yoksa Python bir sayı gibi düşünür ve hesap yapar. Python çok hızlı bir hesap makinesidir!',code:'print(3 + 4)   # 7 yazar'},
  {t:'mc',q:'Ekranda ne görünür?',code:'print(3 + 4)',opts:['7','3 + 4','34'],a:0,tip:'Tırnak yoksa Python işlemi yapar: 3 + 4 = 7.'}
 ]},
 {id:'u5l2',title:'Python\'da değişken',ex:[
  {t:'info',h:'Kutular Python\'da da var',p:'Python\'da değişken aynı şekilde yazılır. Değişkeni yazdırırken tırnak <b>kullanmayız</b>. Tırnak koyarsak Python kutuya bakmaz, yazıyı aynen yazar.',code:'can = 3\nprint(can)  # 3 yazar'},
  {t:'mc',q:'Ekranda ne görünür?',code:'isim = "Ali"\nprint(isim)',opts:['Ali','isim','"isim"'],a:0,tip:'Tırnak yok, bu yüzden Python isim kutusunun içine bakar: Ali.'},
  {t:'mc',q:'Peki bu kod ne yazar?',code:'isim = "Ali"\nprint("isim")',opts:['isim','Ali'],a:0,tip:'Tırnak içindeki her şey olduğu gibi yazılır. Kutuya bakılmaz.'},
  {t:'info',h:'Yazıyla değişkeni yan yana yazdır',p:'<code>print</code> içine birden fazla şey koyabiliriz. Aralarına virgül koyarız. Python hepsini yan yana yazar.',code:'isim = "Ali"\nprint("Merhaba", isim)   # Merhaba Ali'},
  {t:'mc',q:'Ekranda ne görünür?',code:'isim = "Ela"\nprint("Selam", isim)',opts:['Selam Ela','Selam isim','Ela Selam'],a:0,tip:'Önce tırnaklı yazı, sonra kutunun içindeki değer: Selam Ela.'},
  {t:'type',q:'Ekranda hangi sayı görünür?',code:'x = 5\ny = 3\nprint(x + y)',a:['8'],tip:'x kutusunda 5, y kutusunda 3 var. Toplamları 8.'},
  {t:'fill',q:'Ekranda 15 yazsın.',code:'puan = 10\npuan = puan ___ 5\nprint(puan)',opts:['+','-','*'],a:0,tip:'10 + 5 = 15. Çıkarırsak 5, çarparsak 50 olurdu.'}
 ]},
 {id:'u5l3',title:'for döngüsü',ex:[
  {t:'info',h:'Python\'da döngü',p:'Python\'da döngü <code>for</code> ile yazılır. <code>range(3)</code> "3 kez" demektir. Döngünün içindeki satırlar 4 boşluk içeriden başlar.',code:'for i in range(3):\n    print("Hey!")'},
  {t:'type',q:'Kıvılcım kaç kez yazılır?',code:'for i in range(4):\n    print("Kıvılcım")',a:['4','dört'],tip:'range(4) döngüyü 4 kez döndürür.'},
  {t:'fill',q:'Zıpla 5 kez yazılsın.',code:'for i in range(___):\n    print("Zıpla")',opts:['5','4','6'],a:0,tip:'range içindeki sayı, kaç kez döneceğini söyler.'},
  {t:'info',h:'i nedir?',p:'Döngüdeki <code>i</code> bir sayaçtır. Her turda sayıyı tutar. Ama dikkat: Python saymaya 1\'den değil, <b>0</b>\'dan başlar. <code>range(3)</code> sayıları 0, 1, 2 olur.',code:'for i in range(3):\n    print(i)\n# 0\n# 1\n# 2'},
  {t:'mc',q:'Ekranda hangi sayılar görünür?',code:'for i in range(3):\n    print(i)',opts:['0 1 2','1 2 3','3','0 1 2 3'],a:0,tip:'range(3) saymaya 0\'dan başlar: 0, 1, 2. Yine 3 tur olur.'},
  {t:'mc',q:'Ekranda en son hangi sayı görünür?',code:'for i in range(5):\n    print(i)',opts:['4','5','6','0'],a:0,tip:'0, 1, 2, 3, 4: toplam 5 sayı. En sonuncusu 4.'},
  {t:'line',q:'Hangi satırın girintisi eksik?',lines:['for i in range(3):','print("Merhaba")'],a:[1],tip:'Döngünün içindeki satır 4 boşluk içeriden başlamalı.'}
 ]},
 {id:'u5l4',title:'if ile karar',ex:[
  {t:'info',h:'Python\'da eğer',p:'Python\'da "eğer" <code>if</code>, "değilse" <code>else</code> ile yazılır. Bu satırların sonuna iki nokta <code>:</code> koyarız. Karşılaştırırken yine iki eşittir <code>==</code> kullanırız.',code:'puan = 70\nif puan > 50:\n    print("Geçtin!")\nelse:\n    print("Tekrar dene")'},
  {t:'mc',q:'Ekranda ne görünür?',code:'puan = 30\nif puan > 50:\n    print("Geçtin!")\nelse:\n    print("Tekrar dene")',opts:['Tekrar dene','Geçtin!','İkisi de'],a:0,tip:'30, 50\'den büyük değil. Koşul yanlış, "else" kısmı çalışır.'},
  {t:'match',q:'Python kelimelerini eşleştir',pairs:[['if','eğer'],['else','değilse'],['for','tekrarla'],['print','yazdır']],monoL:true},
  {t:'line',q:'Hangi satırda hata var?',lines:['hava = "yağmurlu"','if hava == "yağmurlu"','    print("Şemsiye al")'],a:[1],tip:'if satırının sonunda iki nokta (:) olmalı.'},
  {t:'mc',q:'Hangisi doğru yazılmıştır?',mono:true,opts:['if puan == 10:','if puan = 10:','if puan == 10'],a:0,tip:'Karşılaştırmada iki eşittir (==) kullanılır ve satırın sonuna : konur.'},
  {t:'order',q:'Programı sırala: sayı 0\'dan büyükse Büyük yazsın.',lines:true,items:['sayi = 5','if sayi > 0:','    print("Büyük")'],tip:'Önce kutu, sonra if satırı, en son içeriden başlayan print.'},
  {t:'type',q:'Ekranda ne görünür?',code:'a = 4\nif a == 4:\n    print("Evet")\nelse:\n    print("Hayır")',a:['evet'],tip:'a, 4\'e eşit. Koşul doğru, bu yüzden "Evet" yazılır.'}
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
 tarif:`<svg viewBox="0 0 360 150">${[['1','Tavayı ısıt',GK.terra,10],['2','Yumurtayı kır',GK.ember,130],['3','Pişmesini bekle',GK.olive,250]].map(([n,t,c,x],i)=>`<rect x="${x}" y="30" width="100" height="80" rx="12" fill="${c}"/><circle cx="${x+50}" cy="30" r="14" fill="${GK.cream}" stroke="${GK.ink}" stroke-width="2"/>${gt(x+50,35,n,{s:14})}${gt(x+50,78,t,{s:11,c:GK.cream})}${i<2?`<path class="gflow" d="M${x+103} 70 H${x+127}" stroke="${GK.ink}" stroke-width="4" stroke-dasharray="4 3"/>`:''}`).join('')}${gt(180,138,'Sırayla yapılan adımlar = algoritma',{s:12,c:GK.terra})}</svg>`,
 dongu:`<svg viewBox="0 0 360 150"><rect x="130" y="62" width="100" height="40" rx="12" fill="${GK.ember}"/>${gt(180,88,'Zıpla',{s:16,c:GK.cream})}<path class="gflow" d="M230 82 C310 82 310 24 180 24 C50 24 50 82 130 82" fill="none" stroke="${GK.ink}" stroke-width="4" stroke-dasharray="6 5"/><circle cx="180" cy="24" r="17" fill="${GK.terra}"/>${gt(180,30,'3x',{s:16,c:GK.cream})}${gt(180,132,'3 kez tekrarla: aynı komut yine yine yine',{s:12,c:GK.terra})}</svg>`,
 kosul:`<svg viewBox="0 0 360 160"><polygon points="180,8 270,52 180,96 90,52" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2.5"/>${gt(180,48,'Yağmur',{s:12})}${gt(180,63,'yağıyor mu?',{s:12})}<path d="M100 74 L62 108" stroke="${GK.ink}" stroke-width="3"/><path d="M260 74 L298 108" stroke="${GK.ink}" stroke-width="3" stroke-dasharray="5 4"/>${gt(42,92,'EVET',{s:11,c:GK.olive})}${gt(320,92,'HAYIR',{s:11,c:GK.garnet})}<rect x="8" y="110" width="120" height="36" rx="10" fill="${GK.olive}"/>${gt(68,133,'Şemsiye al',{s:13,c:GK.cream})}<rect x="232" y="110" width="120" height="36" rx="10" fill="${GK.line}"/>${gt(292,133,'Hiçbir şey yapma',{s:11})}</svg>`,
 kosul2:`<svg viewBox="0 0 360 160"><polygon points="180,8 270,52 180,96 90,52" fill="${GK.gold}" stroke="${GK.ink}" stroke-width="2.5"/>${gt(180,48,'Yağmur',{s:12})}${gt(180,63,'yağıyor mu?',{s:12})}<path d="M100 74 L62 108" stroke="${GK.ink}" stroke-width="3"/><path d="M260 74 L298 108" stroke="${GK.ink}" stroke-width="3"/>${gt(42,92,'EVET',{s:11,c:GK.olive})}${gt(314,92,'DEĞİLSE',{s:11,c:GK.garnet})}<rect x="8" y="110" width="120" height="36" rx="10" fill="${GK.olive}"/>${gt(68,133,'Şemsiye al',{s:13,c:GK.cream})}<rect x="232" y="110" width="120" height="36" rx="10" fill="${GK.terra}"/>${gt(292,133,'Şapka tak',{s:13,c:GK.cream})}</svg>`,
 kutu:`<svg viewBox="0 0 360 150">${[['puan','5',GK.terra,10],['isim','Ela',GK.olive,130],['can','3',GK.ember,250]].map(([a,v,c,x])=>`<rect x="${x}" y="40" width="100" height="70" rx="8" fill="${GK.sand}" stroke="${GK.ink}" stroke-width="2.5"/><rect x="${x+20}" y="28" width="60" height="22" rx="6" fill="${c}"/>${gt(x+50,44,a,{s:13,c:GK.cream})}${gt(x+50,92,v,{s:28})}`).join('')}${gt(180,134,'Her kutunun bir adı ve içinde bir değer var',{s:12,c:'#6B604A'})}</svg>`,
 kutu2:`<svg viewBox="0 0 360 150">${[['5',10],['7',250]].map(([v,x])=>`<rect x="${x}" y="40" width="100" height="70" rx="8" fill="${GK.sand}" stroke="${GK.ink}" stroke-width="2.5"/><rect x="${x+20}" y="28" width="60" height="22" rx="6" fill="${GK.terra}"/>${gt(x+50,44,'puan',{s:13,c:GK.cream})}${gt(x+50,92,v,{s:28})}`).join('')}<path class="gflow" d="M120 75 H240" stroke="${GK.ink}" stroke-width="4" stroke-dasharray="6 5"/>${gt(180,64,'+ 2',{s:18,c:GK.terra})}${gt(60,134,'Önce',{s:12})}${gt(290,134,'Sonra: eskisinin yerine',{s:11})}</svg>`,
 py:`<svg viewBox="0 0 360 150"><rect x="10" y="30" width="160" height="70" rx="10" fill="${GK.ink}"/>${gt(90,60,'print("Merhaba")',{s:13,c:GK.gold})}${gt(90,82,'Python kodu',{s:11,c:GK.cream,w:600})}<path class="gflow" d="M178 65 H206" stroke="${GK.ink}" stroke-width="4" stroke-dasharray="4 3"/><rect x="214" y="22" width="136" height="86" rx="8" fill="${GK.steel}" stroke="${GK.steelD}" stroke-width="2"/><rect x="222" y="30" width="120" height="70" rx="4" fill="${GK.cream}"/>${gt(282,72,'Merhaba',{s:16,c:GK.terra})}${gt(282,130,'Ekranda görünen',{s:11,w:700})}${gt(90,130,'Sen yazarsın',{s:11,w:700})}</svg>`
});
