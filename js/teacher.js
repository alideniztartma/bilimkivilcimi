/* #BilimKıvılcımı · Öğretmen sayfası (ders planları, etkinlik kâğıtları, sınıf takibi) ve proje hakkında */
'use strict';

const PLANS=[
 {t:'Sarkaçla zamanı ölçelim',lab:'sarkac',meta:'6–8. sınıf · 40 dakika · Fen',sum:'Deneyde her seferinde tek bir şeyi değiştirip sonucu gözlemleme.',goal:'Öğrenci deneyde her seferinde yalnızca bir şeyi değiştirir ve sonucu tabloya yazar.',
  flow:[['5 dk','Merak sorusu: Salıncakta ağır çocuk mu daha hızlı gidip gelir, hafif çocuk mu? Tahminler tahtaya yazılır.'],['20 dk','Sarkaç deneyi yapılır. Dört farklı ip uzunluğu ve farklı kütleler denenir. "Ölçümü kaydet" ile sonuçlar deney defterine eklenir.'],['10 dk','Deney defterindeki grafik birlikte incelenir: Süreyi ne değiştirdi, ne değiştirmedi?'],['5 dk','Sitedeki görev yapılır: 2 saniyelik sarkaç.']],
  sheet:{th:['İpin uzunluğu','Topun kütlesi','Ölçtüğüm süre (saniye)'],rows:[['0,25 metre','2 kg',''],['0,50 metre','2 kg',''],['1,00 metre','2 kg',''],['2,00 metre','2 kg',''],['1,00 metre','5 kg','']],q:['İp uzadıkça süre nasıl değişti?','Topun kütlesi artınca süre değişti mi? Sence neden?','Aynı sarkacı Ay\'a götürsek ne olurdu? Sitede deneyip yaz.']}},
 {t:'Kaldıraçla denge kuralım',lab:'kaldirac',meta:'5–8. sınıf · 40 dakika · Fen',sum:'Yükün ağırlığı ve durduğu yer dengeyi nasıl etkiler?',goal:'Öğrenci yükün kütlesi ile ortaya olan uzaklığı arasındaki ilişkiyi açıklar.',
  flow:[['5 dk','Merak sorusu: Tahterevallide küçük kardeş ağabeyini nasıl havaya kaldırır?'],['20 dk','Kaldıraç deneyi yapılır. Tablodaki yükler için denge noktası bulunur. Arkadaki sütunların boyu karşılaştırılır.'],['10 dk','Kural birlikte bulunur: kütle × uzaklık iki tarafta eşit olmalı.'],['5 dk','Sitedeki görev yapılır: 2 kg ile 8 kg\'ı dengele.']],
  sheet:{th:['Sol yük','Sol uzaklık','Sağ yük','Sağ uzaklık (sen bul)'],rows:[['4 kg','3','6 kg',''],['2 kg','5','10 kg',''],['3 kg','4','4 kg',''],['8 kg','1','2 kg','']],q:['Her satırda iki taraf için kütle × uzaklık işlemini yap. Ne fark ettin?','Çevrende kaldıraç gibi çalışan üç araç yaz.']}},
 {t:'Basit bir elektrik devresi kuralım',lab:'devre',meta:'4–6. sınıf · 40 dakika · Fen',sum:'Devrenin parçaları, seri ve paralel bağlama.',goal:'Öğrenci basit bir devrenin parçalarını tanır. Seri ve paralel bağlamayı karşılaştırır.',
  flow:[['5 dk','Merak sorusu: Evde bir lamba bozulunca öbür lambalar neden sönmüyor?'],['20 dk','Devre deneyi yapılır. Pil ve lamba sayısı değiştirilir, bir lamba sökülür. Lambaların parlaklığı tabloya yazılır.'],['10 dk','Seri ve paralel bağlamanın farkı sınıfça konuşulur.'],['5 dk','Sitedeki görev yapılır: İki lamba da tam parlak yansın.']],
  sheet:{th:['Pil sayısı','Lamba sayısı','Bağlama','Lambalar nasıl yandı?'],rows:[['1','1','Seri',''],['1','2','Seri',''],['1','2','Paralel',''],['2','2','Seri',''],['1','2 (biri sökük)','Seri','']],q:['Anahtar açıkken lamba neden yanmaz?','Seri devrede lamba sayısı artınca parlaklık nasıl değişti?','Evimizdeki lambalar sence seri mi, paralel mi bağlı? Neden?']}},
 {t:'Kesirleri karşılaştıralım',lab:'kesir',meta:'3–6. sınıf · 40 dakika · Matematik',sum:'Denk kesirler ve kesirlerin büyüklüğünü karşılaştırma.',goal:'Öğrenci denk kesirleri modelle gösterir ve iki kesri karşılaştırır.',
  flow:[['5 dk','Merak sorusu: Bir pizzanın 4/8\'ini mi yemek daha çok, 1/2\'sini mi?'],['20 dk','Kesir deneyinde çubuk ve pasta görünümleri kullanılır. Tablodaki kesirlerin denkleri bulunur.'],['10 dk','Kural birlikte bulunur: Pay ve payda aynı sayıyla çarpılırsa kesir değişmez.'],['5 dk','Sitedeki görev yapılır: 2/3 = ?/12.']],
  sheet:{th:['Kesir','Denk kesir (sen bul)','Hangi sayıyla çarptın?'],rows:[['1/2','?/8',''],['2/3','?/12',''],['3/4','?/8',''],['1/3','?/9','']],q:['1/2 ile 2/3\'ü karşılaştır. Hangisi büyük? Nasıl anladın?','Günlük hayatta kesir kullandığın iki durum yaz.']}},
 {t:'Mancınıkla hedefi vuralım',lab:'atis',meta:'6–8. sınıf · 40 dakika · Fen',sum:'Atış açısı ve hızın menzile etkisi.',goal:'Öğrenci açının ve hızın atışın menzilini nasıl değiştirdiğini gözlemler, en uygun açıyı bulur.',
  flow:[['5 dk','Merak sorusu: Basketbolda topu dümdüz mü atmalıyız, yukarı doğru mu? Antakya surlarının nasıl kuşatıldığı kısaca anlatılır.'],['20 dk','Aynı hızla 15°, 30°, 45°, 60° ve 75° açılarla atış yapılır, her atış kaydedilir. Deney defterindeki grafik incelenir.'],['10 dk','Sınıfça konuşulur: Hangi açı en uzağa attı? Hangi iki açı aynı yere düştü?'],['5 dk','Sitedeki görev yapılır: Surun arkasındaki hedefi vur.']],
  sheet:{th:['Atış açısı','Atış hızı','Menzil (metre)'],rows:[['15°','15 m/s',''],['30°','15 m/s',''],['45°','15 m/s',''],['60°','15 m/s',''],['75°','15 m/s','']],q:['Hangi açı taşı en uzağa gönderdi?','30° ve 60° açıların menzillerini karşılaştır. Ne fark ettin?','Sur varken neden yüksek açı daha işe yarar?']}},
 {t:'Yüzer mi, batar mı?',lab:'yogunluk',meta:'5–7. sınıf · 40 dakika · Fen',sum:'Yoğunluk ve cisimlerin sıvılardaki davranışı.',goal:'Öğrenci bir cismin yüzüp batmasını cismin ve sıvının yoğunluğuyla açıklar.',
  flow:[['5 dk','Merak sorusu: Koca demir gemi yüzüyor da küçücük bir çivi neden batıyor?'],['10 dk','Tahmin turu: Öğrenciler her cisim için "yüzer" ya da "batar" tahminini kâğıda yazar.'],['15 dk','Cisimler önce tatlı suya, sonra tuzlu suya ve zeytinyağına bırakılır. Sonuçlar kaydedilir.'],['10 dk','Kural birlikte bulunur: Sıvıdan daha yoğun olan batar. Yumurtanın tuzlu suda yüzmesi konuşulur.']],
  sheet:{th:['Cisim','Tahminim','Tatlı suda','Tuzlu suda','Zeytinyağında'],rows:[['Mantar','','','',''],['Elma','','','',''],['Buz','','','',''],['Yumurta','','','',''],['Taş','','','','']],q:['Tahminlerinden kaçı doğru çıktı?','Buz suda yüzer. Zeytinyağında ne oldu? Neden?','Gemiler demirden yapıldığı halde nasıl yüzer?']}},
 {t:'Ay\'ın evrelerini keşfedelim',lab:'ay',meta:'5. sınıf · 40 dakika · Fen',sum:'Ay\'ın Dünya etrafındaki hareketi ve evreleri.',goal:'Öğrenci Ay\'ın evrelerini sıralar ve evrelerin neden oluştuğunu açıklar.',
  flow:[['5 dk','Merak sorusu: Ay bazen hilal, bazen yuvarlak görünüyor. Ay gerçekten şekil mi değiştiriyor?'],['10 dk','Sınıfta bir el feneri (Güneş) ve top (Ay) ile kısa bir gösteri yapılır.'],['15 dk','Ay deneyinde Ay sürüklenerek 8 evre bulunur. Her evrenin günü kaydedilir.'],['10 dk','Öğrenciler bir hafta boyunca gökyüzündeki Ay\'ı çizip etkinlik kâğıdına ekler.']],
  sheet:{th:['Evre','Kaçıncı gün?','Çizimim'],rows:[['Yeni Ay','',''],['Hilal','',''],['İlk dördün','',''],['Dolunay','',''],['Son dördün','','']],q:['Yeni Ay\'dan dolunaya kaç gün geçiyor?','Evreler neden oluşur? Kendi cümlelerinle yaz.','Bu akşam gökyüzüne bak. Ay hangi evrede?']}},
 {t:'Işığı aynalarla yönlendirelim',lab:'isik',meta:'7. sınıf · 40 dakika · Fen',sum:'Işığın yansıması ve yansıma kanunu.',goal:'Öğrenci ışığın düz bir çizgide yayıldığını ve aynada gelme açısıyla yansıdığını gösterir.',
  flow:[['5 dk','Merak sorusu: Denizaltıdakiler suyun üstünü nasıl görür?'],['20 dk','Işık deneyinin 3 bölümü ikişerli gruplarla çözülür. Her bölümde ışığın yolu kâğıda çizilir.'],['10 dk','Yansıma kanunu konuşulur: gelme açısı = yansıma açısı.'],['5 dk','Ödev: Karton ve iki küçük aynayla bir periskop yapılır.']],
  sheet:{th:['Bölüm','Kaç ayna çevirdim?','Kaç yansıma oldu?'],rows:[['1. bölüm','',''],['2. bölüm','',''],['3. bölüm','','']],q:['Işık bir aynaya 40° ile gelirse kaç derece ile yansır?','Günlük hayatta yansımayı kullandığımız üç araç yaz.']}},
 {t:'Robota yol tarif edelim',meta:'3–6. sınıf · 40 dakika · Bilişim',sum:'Bir işi adımlara bölme ve tekrar eden adımları kısaltma.',goal:'Öğrenci bir problemi adımlara böler. Tekrar eden adımları Tekrarla bloğuyla kısaltır.',
  flow:[['10 dk','Bilgisayarsız ısınma: Bir öğrenci robot olur. Sınıf ona yalnızca üç komutla yol tarif eder: ileri git, sola dön, sağa dön.'],['20 dk','Kodlama yolunun "Robotu yönet" ve "Döngüler" üniteleri yapılır. Öğrenciler ikişerli çalışır: biri blokları dizer, öbürü kontrol eder.'],['10 dk','Paylaşım: Günün bulmacasını kim en az blokla çözdü? Tekrarla bloğu ne işe yaradı?']],
  sheet:{th:['Görev','Kaç blok kullandım?','Tekrarla bloğunu kullandım mı?'],rows:[['İlk robot dersi','',''],['Köşeyi dön','',''],['Günün bulmacası','',''],['Kare çizimi (atölye)','','']],q:['Merdiven gibi tekrar eden bir yolu nasıl kısaltırsın?','Her gün tekrar ederek yaptığın bir işi komutlarla yaz.']}}
];
let plan=0;
function renderTeacher(){
  $('#pgTeach').innerHTML=`<p class="eyebrow">Öğretmenler için</p><h1 class="ph1">Hazır ders planları ve etkinlik kâğıtları</h1>
  <p class="sub">Soldan bir ders seçin. Dersin akışı ve yazdırabileceğiniz etkinlik kâğıdı sağda görünür. Her plan sitedeki bir deneyle birlikte çalışır.</p>
  <div class="teach"><div class="plans" id="plans"></div>
    <div style="display:grid;gap:14px"><div class="card" id="planDetail"></div>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${framed?'':`<button class="b3 sm" type="button" id="printBtn">${ic('printer',18)} Etkinlik kâğıdını yazdır</button>`}<span class="muted" style="font-size:.9rem">Kâğıt A4 boyutundadır ve siyah beyaz basılabilir.</span></div>
      <div class="paper" id="paper"></div></div></div>
  <div class="card" style="margin-top:22px"><p class="eyebrow">Sınıf takibi</p><h2 style="margin:8px 0 6px">Öğrencilerinizin ilerlemesi</h2>
    <p class="muted" style="max-width:70ch">Her öğrenci <b>Profil › Öğretmenine göster</b> bölümündeki kodu size gönderir. Kodları aşağıya yapıştırın, her satıra bir kod. Tablo yalnızca bu cihazda saklanır. <b>Sınıf dosyasını indir</b> ile tabloyu proje yöneticisine gönderebilirsiniz; yönetici paneli bu dosyayı okur.</p>
    <label for="clsIn" style="display:block;font-weight:800;margin:14px 0 6px">Öğrenci kodları</label>
    <textarea class="codes" id="clsIn" rows="4" placeholder="BK1.eyJuIjoiRWxhIiwieCI6..."></textarea>
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:10px"><button class="b3 sm" type="button" id="clsAdd">Kodları ekle</button><button class="b3 ghost sm" type="button" id="clsCsv">Tabloyu kopyala</button><button class="b3 ghost sm" type="button" id="clsFile">${ic('save',16)} Sınıf dosyasını indir</button><button class="b3 ghost sm" type="button" id="clsClr">Tabloyu temizle</button><span class="muted" id="clsMsg" role="status" style="font-size:.9rem"></span></div>
    <div class="sumtiles" id="clsSum"></div><div class="tscroll" style="margin-top:14px;max-height:none"><table class="dtable" id="clsTbl"></table></div></div>
  <div class="card" style="margin-top:22px;display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:start">
    <div class="medal" style="width:64px;height:64px">${ic('offline',30)}</div>
    <div><h3 style="font-size:1.35rem">İnternet olmadan kullanma</h3><p class="muted">Site tek bir klasörden oluşur. İnterneti olmayan bir sınıfta da çalışır.</p>
    <ol style="margin:10px 0 0;padding-left:20px;display:grid;gap:6px"><li>GitHub sayfasındaki yeşil <b>Code › Download ZIP</b> düğmesiyle bütün klasörü indirin ve USB belleğe kopyalayın.</li><li>Sınıftaki bilgisayarda klasörü açıp <b>index.html</b> dosyasına çift tıklayın.</li><li>Kodlama yolu, atölye, 8 deney ve rozetler internet olmadan çalışır. Yalnızca yazı tipleri internet varken daha güzel görünür.</li></ol></div></div>`;
  const pl=$('#plans');pl.addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(b){plan=+b.dataset.plan;planRender()}});
  planRender();
  const pb=$('#printBtn');if(pb)pb.onclick=()=>{document.body.classList.add('print-paper');try{window.print()}catch(e){}setTimeout(()=>document.body.classList.remove('print-paper'),500)};
  clsWire();clsRender();
}
function planRender(){
  $('#plans').innerHTML=PLANS.map((p,i)=>`<button class="card plan" type="button" data-plan="${i}" aria-pressed="${i===plan}"><span class="meta">${p.meta}</span><h3>${p.t}</h3><p>${p.sum}</p></button>`).join('');
  const p=PLANS[plan],x=p.lab&&EXPS.find(e=>e.id===p.lab);
  $('#planDetail').innerHTML=`<p class="eyebrow">Ders planı</p><h3 style="margin:8px 0 6px;font-size:1.4rem">${p.t}</h3><p class="muted"><b style="color:var(--ink)">Dersin hedefi:</b> ${p.goal}</p>
   <ul class="flowlist">${p.flow.map(f=>`<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ul>
   ${x?`<a class="b3 sm ghost" style="margin-top:14px" href="#lab-${x.id}">${ic(x.icon,16)} ${x.title} deneyini aç</a>`:`<a class="b3 sm ghost" style="margin-top:14px" href="#ogren">${ic('home',16)} Kodlama yolunu aç</a>`}`;
  const s=p.sheet;
  $('#paper').innerHTML=`<div class="ph2"><span>#BilimKıvılcımı · Antioch Rising #10947</span><span>ETKİNLİK KÂĞIDI</span></div><h3>${p.t}</h3>
   <div class="who"><span>Adı Soyadı:</span><span>Sınıfı:</span><span>Tarih:</span></div>
   <table><thead><tr>${s.th.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${s.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
   <ol>${s.q.map(q=>`<li>${q}<i></i><i></i></li>`).join('')}</ol>`;
}

/* Sınıf takibi */
const SNFKEY='bk-sinif-v1';let SNF={};try{SNF=JSON.parse(localStorage.getItem(SNFKEY))||{}}catch(e){}
const clsSave=()=>{try{localStorage.setItem(SNFKEY,JSON.stringify(SNF))}catch(e){}};
/* İlerleme kodu: BK1 (eski, yalnızca sayılar) ve BK2 (anonim kimlik, ders listeleri, etkinlik günleri) */
function decodeCode(c){try{c=c.trim();const m=/^BK([12])\./.exec(c);if(!m)return null;let s=c.slice(4).replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';
  const o=JSON.parse(decodeURIComponent(escape(atob(s))));return o&&typeof o.x==='number'?normCode(o):null}catch(e){return null}}
function normCode(o){
  if(o.v===2){const e=o.e||{};return{v:2,i:String(o.i||''),n:String(o.n||''),x:+o.x||0,L:Array.isArray(o.l)?o.l:[],C:Array.isArray(o.c)?o.c:[],E:e,
    l:Array.isArray(o.l)?o.l.length:0,c:Array.isArray(o.c)?o.c.length:0,e:Object.values(e).reduce((a,b)=>a+(+b||0),0),w:+o.w||0,k:Array.isArray(o.k)?o.k:[],
    b:+o.b||0,s:+o.s||0,d:Array.isArray(o.h)?o.h.length:0,h:Array.isArray(o.h)?o.h:[],a:String(o.a||''),j:String(o.j||''),t:String(o.t||'')}}
  return{v:1,i:'',n:String(o.n||''),x:+o.x||0,L:null,C:null,E:null,l:+o.l||0,c:0,e:+o.e||0,w:0,k:Array.isArray(o.k)?o.k:[],b:+o.b||0,s:+o.s||0,d:+o.d||0,h:null,a:'',j:'',t:String(o.t||'')}
}
const codeKey=o=>o.i?'id:'+o.i:'ad:'+(o.n||'adsız').toLocaleLowerCase('tr');
function clsRender(){
  const rows=Object.values(SNF).sort((a,b)=>b.x-a.x),n=rows.length;
  const tot=rows.reduce((s,r)=>s+r.l,0),avg=n?Math.round(rows.reduce((s,r)=>s+r.x,0)/n):0,act=rows.filter(r=>r.l>0||r.e>0).length,ex=rows.reduce((s,r)=>s+(r.e||0),0);
  const tile=(v,l)=>`<div><b>${v}</b><span>${l}</span></div>`;
  $('#clsSum').innerHTML=tile(n,'Öğrenci')+tile(act,'Aktif öğrenci')+tile(tot,'Bitirilen ders')+tile(ex,'Deney görevi')+tile(avg,'Ortalama XP');
  $('#clsTbl').innerHTML=n?`<thead><tr>${['Ad','XP','Ders','Alan dersi','Deney','Kupa','En uzun seri','Aktif gün','Kod tarihi'].map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><td><b>${esc(r.n||'(adsız)')}</b></td><td>${r.x}</td><td>${r.l} / ${ALL_LESSONS.length}</td><td>${r.c||0} / ${TRACK_LESSONS.length}</td><td>${r.e||0} / ${labTotal()}</td><td>${(r.k||[]).length} / ${U.length}</td><td>${r.b}</td><td>${r.d}</td><td>${String(r.t).split('-').reverse().join('.')}</td></tr>`).join('')}</tbody>`:'<tbody><tr><td class="muted">Henüz kod eklenmedi.</td></tr></tbody>';
}
function clsWire(){
  $('#clsAdd').onclick=()=>{let ok=0,bad=0;$('#clsIn').value.split(/\s+/).filter(Boolean).forEach(c=>{const o=decodeCode(c);if(o){const k=codeKey(o);const old=SNF[k];if(!old||String(old.t)<=String(o.t))SNF[k]=o;ok++}else bad++});
    clsSave();clsRender();$('#clsIn').value='';$('#clsMsg').textContent=ok+' kod eklendi'+(bad?', '+bad+' kod okunamadı':'')+'.'};
  $('#clsClr').onclick=e=>{const b=e.currentTarget;if(b.dataset.arm){SNF={};clsSave();clsRender();delete b.dataset.arm;b.textContent='Tabloyu temizle';$('#clsMsg').textContent='Tablo temizlendi.';return}
    b.dataset.arm='1';b.textContent='Emin misiniz? Tekrar basın';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.textContent='Tabloyu temizle'}},4000)};
  $('#clsFile').onclick=()=>{const n=Object.keys(SNF).length;if(!n){$('#clsMsg').textContent='Önce öğrenci kodlarını ekleyin.';return}
    downloadFile('bilimkivilcimi-sinif-'+dkey()+'.json',JSON.stringify({tur:'bk-sinif',tarih:dkey(),ogrenciler:Object.values(SNF)}),'application/json');
    $('#clsMsg').textContent=n+' öğrencilik sınıf dosyası indirildi. Bu dosyayı yöneticiye gönderebilirsiniz.'};
  $('#clsCsv').onclick=async()=>{const rows=Object.values(SNF);const csv=['Ad;XP;Ders;Deney görevi;Kupa;En uzun seri;Aktif gün;Tarih'].concat(rows.map(r=>[r.n,r.x,r.l,r.e||0,(r.k||[]).length,r.b,r.d,r.t].join(';'))).join('\n');
    try{await navigator.clipboard.writeText(csv);$('#clsMsg').textContent='Tablo kopyalandı. Excel ya da E-Tablolar\'a yapıştırabilirsiniz.'}catch(e){$('#clsMsg').textContent='Kopyalanamadı. Tabloyu seçip elle kopyalayın.'}};
}

/* Proje hakkında */
function renderAbout(){
  $('#pgAbout').innerHTML=`<p class="eyebrow">Büyükler için</p><h1 class="ph1">Proje hakkında</h1>
  <p class="sub">#BilimKıvılcımı, Hatay'daki ilkokul ve ortaokul öğrencileri için hazırlanan ücretsiz bir bilim ve kodlama sitesidir.</p>
  <div class="card meet" style="margin-top:18px">${anka('wave',140)}<div><p class="eyebrow">Maskotumuzla tanışın</p><h2 style="margin:6px 0">Merhaba, ben Anka!</h2>
    <p>Antioch Rising'in yavru anka kuşuyum. Anka kuşu küllerinden yeniden doğar. Hatay da depremden sonra yeniden ayağa kalkıyor. Ben de çocuklara her hatadan sonra yeniden denemeyi öğretiyorum.</p>
    <p class="muted" style="margin-top:8px">Göğsümdeki mozaikler Antakya'nın ünlü mozaiklerinden geliyor. Mağazadan bana zeytin dalı, bilge gözlüğü, mühendis bareti ve taç alabilirsiniz.</p></div></div>
  <div class="sec-h">Bu siteyi neden yaptık?</div>
  <div class="why"><div><h3>Okullarda eksik çok</h3><p>Depremden sonra Hatay'da eğitim aksadı. Birçok okulda laboratuvar ve deney malzemesi yok.</p></div>
    <div><h3>Kurslar pahalı</h3><p>Her aile çocuğunu robotik ya da kodlama kursuna gönderemiyor.</p></div>
    <div><h3>Biz de Hataylıyız</h3><p>Bu eksiği kapatmak ve çocuklara bilimi sevdirmek istiyoruz.</p></div></div>
  <div class="sec-h">Sitede neler var?</div>
  <div class="sumtiles" style="margin-top:0">
    <div><b>${ALL_LESSONS.length}</b><span>Kodlama dersi, ${U.length} ünite</span></div><div><b>${EXPS.length}</b><span>3 boyutlu deney</span></div><div><b>${labTotal()}</b><span>Deney görevi</span></div>
    <div><b>${CHAL.length+1}</b><span>Çizim görevi</span></div><div><b>${DAILY.length}</b><span>Günlük robot bulmacası</span></div><div><b>${PLANS.length}</b><span>Öğretmen ders planı</span></div></div>
  <div class="sec-h">Engineering Inspiration</div>
  <div class="card"><ul class="crit">
    <li><span>${fi('bolt',22)}</span><div><b>Mühendisliği sevdirir</b><small>Öğrenciler oyun oynayarak, tahmin edip deney yaparak öğrenir.</small></div></li>
    <li><span>${ic('school',22)}</span><div><b>Hatay'ın okullarına ulaşır</b><small>Siteyi okullara öğretmenlerle birlikte götürüyoruz. Hazır ders planları ve etkinlik kâğıtları var.</small></div></li>
    <li><span>${ic('chart',22)}</span><div><b>Ölçülebilir</b><small>Öğretmenler sınıf takibiyle öğrencilerin ilerlemesini görür. Kaç okula, öğretmene ve öğrenciye ulaştığımızı sayıyoruz.</small></div></li>
    <li><span>${ic('calendar',22)}</span><div><b>Bütün yıl açık</b><small>Yalnızca yarışma sezonunda değil, her gün kullanılabilir. Günlük görevler ve bulmacalar her gün yenilenir.</small></div></li>
    <li><span>${ic('offline',22)}</span><div><b>Herkese açık</b><small>Ücretsiz, Türkçe, açık kaynak ve internetsiz çalışır. Hesap açmak ya da kişisel bilgi vermek gerekmez.</small></div></li></ul>
    <div class="sumtiles"><div><b>${Object.keys(S.done).length}</b><span>Bu cihazda bitirilen ders</span></div><div><b>${labDoneCount()}</b><span>Bu cihazda bitirilen deney görevi</span></div><div><b>${S.xp}</b><span>Bu cihazdaki XP</span></div></div></div>
  <div class="card meet" style="margin-top:22px"><img src="img/logo.png" alt="Antioch Rising logosu" width="96" height="96" style="width:96px;height:96px;object-fit:contain"><div><p class="eyebrow">Biz kimiz?</p><h2 style="margin:6px 0">Bu site bir Antioch Rising projesidir.</h2>
    <p>Antioch Rising, Hatay'dan FIRST Robotics Competition'a katılan 10947 numaralı robot takımıdır. Robot yaparken öğrendiklerimizi Hatay'ın çocuklarıyla paylaşmak için #BilimKıvılcımı'nı kurduk.</p>
    <p class="muted" style="margin-top:8px">Kaynak kodu GitHub'da açık: <a href="https://github.com/alideniztartma/bilimkivilcimi" target="_blank" rel="noopener">github.com/alideniztartma/bilimkivilcimi</a></p></div></div>`;
}

function downloadFile(name,text,type){try{const u=URL.createObjectURL(new Blob([text],{type:type||'text/plain'}));const a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}catch(e){toast('Dosya indirilemedi.')}}
