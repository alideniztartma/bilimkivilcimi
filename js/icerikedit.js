/* #BilimKıvılcımı · Ders düzenleyici (yönetici paneli)
   Ana yönetici ve "İçerik düzenleme" yetkisi olan ekip üyeleri ünite/ders adlarını ve alıştırmaları düzenler.
   Değişiklikler önce bu cihazda taslak olarak durur; "Yayınla" ile Supabase'e yeni bir sürüm olarak gider ve
   bütün uygulamalar bir sonraki açılışta onu kullanır (js/icerik.js). admin.js'ten SONRA yüklenir. */
'use strict';
const ICDKEY='bk-icerik-taslak';
const IC_TYPES={info:'Bilgi kartı',mc:'Çoktan seçmeli',fill:'Boşluk doldurma',type:'Yazarak cevap',order:'Sıralama',line:'Hatalı satırı bul',match:'Eşleştirme',robot:'Robot bulmacası'};
const IC_NEW={
  info:()=>({t:'info',h:'Yeni bilgi',p:'Buraya anlatacağın şeyi yaz.'}),
  mc:()=>({t:'mc',q:'Sorunu yaz',opts:['Doğru cevap','Yanlış cevap','Başka yanlış cevap'],a:0,tip:''}),
  fill:()=>({t:'fill',q:'Boşluğu doldur.',code:'yaz("___")',opts:['Merhaba','Hoşça kal'],a:0,tip:''}),
  type:()=>({t:'type',q:'Sorunu yaz',a:['cevap'],tip:''}),
  order:()=>({t:'order',q:'Adımları sırala.',items:['Birinci adım','İkinci adım','Üçüncü adım'],lines:true,plain:true,tip:''}),
  line:()=>({t:'line',q:'Hangi adım yanlış yerde?',lines:['Birinci adım','Yanlış yerdeki adım','Üçüncü adım'],a:[1],plain:true,tip:''}),
  match:()=>({t:'match',q:'Eşleri bul',pairs:[['Kelime','Anlamı'],['Kelime 2','Anlamı 2']]})
};
const canEditContent=()=>!!(SBS&&(SBS.role==='owner'||(SBS.perms||[]).includes('icerik')));
const icClone=o=>JSON.parse(JSON.stringify(o));
const icStrip=ex=>ex.map(e=>{const o=icClone(e);delete o.id;delete o.ui;delete o.field;return o});
let ICD=null,icSel={f:null,ui:null,li:0},icVers=null;
function icDraftLoad(){
  try{ICD=JSON.parse(localStorage.getItem(ICDKEY))}catch(e){ICD=null}
  if(!ICD||!ICD.data){const pub=(ICV&&ICV.data)||{};ICD={base:ICV?ICV.v:0,data:{units:icClone(pub.units||{}),lessons:icClone(pub.lessons||{})},dirty:false}}
}
const icDraftSave=()=>{try{localStorage.setItem(ICDKEY,JSON.stringify(ICD))}catch(e){toast('Taslak kaydedilemedi.')}};
let icSaveT;const icTouch=()=>{ICD.dirty=true;clearTimeout(icSaveT);icSaveT=setTimeout(()=>{icDraftSave();icStatus()},400)};
const icOrigU=ui=>U_ORIG[ui];
const icUnit=ui=>Object.assign({title:icOrigU(ui).title,desc:icOrigU(ui).desc},ICD.data.units[U[ui].id]||{});
function icLesson(ui,li){const id=U[ui].lessons[li].id,d=ICD.data.lessons[id];const o=icOrigU(ui).lessons[li];
  return{id,title:(d&&d.title)||o.title,ex:d&&Array.isArray(d.ex)?d.ex:icStrip(o.ex)}}
/* Dersi taslağa yaz; orijinalle aynıysa taslaktan çıkar */
function icSetLesson(ui,li,les){const o=icOrigU(ui).lessons[li];
  const same=les.title===o.title&&JSON.stringify(les.ex)===JSON.stringify(icStrip(o.ex));
  if(same)delete ICD.data.lessons[les.id];else ICD.data.lessons[les.id]={title:les.title,ex:les.ex};icTouch()}
function icSetUnit(ui,un){const o=icOrigU(ui);
  if(un.title===o.title&&un.desc===o.desc)delete ICD.data.units[U[ui].id];else ICD.data.units[U[ui].id]={title:un.title,desc:un.desc};icTouch()}
const icLChanged=(ui,li)=>!!ICD.data.lessons[U[ui].lessons[li].id];
const icUChanged=ui=>!!ICD.data.units[U[ui].id]||U[ui].lessons.some((l,li)=>icLChanged(ui,li));
const icBad=()=>Object.entries(ICD.data.lessons).reduce((n,[id,l])=>n+(l.ex||[]).filter(e=>!icEx(e)).length,0);
const icCount=()=>Object.keys(ICD.data.lessons).length+Object.keys(ICD.data.units).length;

function openContentEditor(){
  if(!canEditContent()){toast('Bu bölüm için "İçerik düzenleme" yetkisi gerekiyor.');return}
  icDraftLoad();
  if(icSel.ui==null){icSel.f=FIELDS[0].id;icSel.ui=fieldUnits(icSel.f)[0].ui;icSel.li=0}
  let el=$('#icEd');if(!el){el=document.createElement('div');el.id='icEd';el.setAttribute('role','dialog');el.setAttribute('aria-label','Ders düzenleyici');document.body.appendChild(el)}
  el.hidden=false;document.body.style.overflow='hidden';icRender();
}
function closeContentEditor(){const el=$('#icEd');if(el)el.hidden=true;document.body.style.overflow='';icDraftSave()}

function icRender(){
  const el=$('#icEd'),ui=icSel.ui,u=icUnit(ui),les=icLesson(ui,icSel.li);
  const opt=(v,t,s)=>`<option value="${esc(String(v))}" ${s?'selected':''}>${esc(t)}</option>`;
  const stale=ICV&&ICD.base!==ICV.v&&ICD.dirty;
  el.innerHTML=`<div class="iched"><button class="b3 ghost sm" type="button" id="icX" aria-label="Kapat">${ic('x',20)}</button><div><b>Ders düzenleyici</b><small id="icSt"></small></div></div>
  <div class="icbody">
    ${stale?`<p class="icwarn">${ic('info',16)} Sen düzenlerken başka biri yeni bir sürüm yayınladı. Yayınlarsan onun değişiklikleri seninkilerle değişir. Emin değilsen taslağı silip yeniden başla.</p>`:''}
    <div class="icsel">
      <label>Alan<select id="icF">${FIELDS.map(f=>opt(f.id,f.title,f.id===icSel.f)).join('')}</select></label>
      <label>Ünite<select id="icU">${fieldUnits(icSel.f).map(({ui:i})=>opt(i,unitNo(i)+'. '+icUnit(i).title+(icUChanged(i)?'  •':''),i===ui)).join('')}</select></label>
      <label>Ders<select id="icL">${U[ui].lessons.map((l,li)=>opt(li,(li+1)+'. '+icLesson(ui,li).title+(icLChanged(ui,li)?'  •':''),li===icSel.li)).join('')}</select></label>
    </div>
    <details class="card icunit"><summary>Ünite adı ve açıklaması ${ICD.data.units[U[ui].id]?'<em>değişti</em>':''}</summary>
      <label>Ünite adı<input id="icUT" maxlength="80" value="${esc(u.title)}"></label>
      <label>Kısa açıklama<textarea id="icUD" rows="2" maxlength="300">${esc(u.desc)}</textarea></label></details>
    <label class="iclt">Ders adı<input id="icLT" maxlength="80" value="${esc(les.title)}"></label>
    <div id="icExs">${les.ex.map((e,i)=>icCard(e,i,les.ex.length)).join('')}</div>
    <div class="card icadd"><b>Alıştırma ekle</b><div><select id="icNT">${Object.keys(IC_NEW).map(k=>opt(k,IC_TYPES[k])).join('')}</select><button class="b3 sm" type="button" id="icAdd">+ Ekle</button></div></div>
    <div class="card icpub"><h3>Yayınla</h3>
      <p class="muted">Değişiklikler şimdilik yalnızca bu cihazda, taslak olarak duruyor. Yayınlayınca bütün öğrenciler bir sonraki açılışta yeni hâlini görür. Her yayın saklanır; gerekirse eski bir sürüme dönebilirsin.</p>
      <label>Ne değişti? <small>(isteğe bağlı)</small><input id="icNote" maxlength="200" placeholder="Örn. Mekanik 1. ünite yazıları sadeleşti"></label>
      <div class="abtns"><button class="b3" type="button" id="icPub">Yayınla</button><button class="b3 ghost sm" type="button" id="icDrop">Taslağı sil</button></div>
      <p class="tres" id="icMsg" role="status"></p>
      <h3 style="margin-top:14px">Yayınlanan sürümler</h3><div id="icVers"><p class="muted">Yükleniyor…</p></div></div>
  </div>
  <div class="icfoot"><button class="b3 ghost sm" type="button" id="icRev" ${icLChanged(ui,icSel.li)?'':'disabled'}>${ic('reset',16)} Dersi orijinale döndür</button><button class="b3 olive sm" type="button" id="icPrev">${ic('play',16)} Önizle</button></div>`;
  icBind();icStatus();icLoadVers();
}
function icStatus(){const s=$('#icSt');if(!s)return;const n=icCount(),bad=icBad();
  s.textContent=(ICV?`Yayındaki sürüm: ${ICV.v}`:'Yayında orijinal içerik')+(ICD.dirty?' · Yayınlanmamış değişiklik var':n?' · Taslak yayındakiyle aynı':'')+(bad?` · ${bad} eksik alıştırma`:'')}

/* Bir alıştırma kartı */
function icCard(e,i,n){
  const f=(lbl,k,v,o={})=>`<label${o.cls?` class="${o.cls}"`:''}>${lbl}${o.hint?` <small>${o.hint}</small>`:''}${o.rows?`<textarea data-k="${k}" rows="${o.rows}" ${o.mono?'class="mono"':''} spellcheck="${o.mono?'false':'true'}">${esc(v??'')}</textarea>`:`<input data-k="${k}" value="${esc(v??'')}">`}</label>`;
  const L=a=>(a||[]).join('\n');
  const ans=()=>`<label>Doğru cevap<select data-k="a">${(e.opts||[]).map((o,j)=>`<option value="${j}" ${j===e.a?'selected':''}>${esc(o)}</option>`).join('')}</select></label>`;
  const figs=typeof FIG==='object'?Object.keys(FIG):[];
  let body='';
  switch(e.t){
    case 'info':body=f('Başlık','h',e.h)+f('Metin','p',e.p,{rows:4,hint:'kalın için &lt;b&gt;kelime&lt;/b&gt;'})+f('Kod','code',e.code,{rows:3,mono:true,hint:'isteğe bağlı'})
      +(figs.length?`<label>Görsel<select data-k="fig"><option value="">Görsel yok</option>${figs.map(k=>`<option ${k===e.fig?'selected':''}>${esc(k)}</option>`).join('')}</select></label>`:'');break;
    case 'mc':body=f('Soru','q',e.q)+f('Kod','code',e.code,{rows:2,mono:true,hint:'isteğe bağlı'})+f('Seçenekler','opts',L(e.opts),{rows:4,hint:'her satıra bir seçenek'})+ans()+f('Açıklama','tip',e.tip,{rows:2,hint:'cevaptan sonra görünür'});break;
    case 'fill':body=f('Soru','q',e.q)+f('Kod','code',e.code,{rows:3,mono:true,hint:'boşluk yerine ___ yaz'})+f('Seçenekler','opts',L(e.opts),{rows:3,hint:'her satıra bir seçenek'})+ans()+f('Açıklama','tip',e.tip,{rows:2});break;
    case 'type':body=f('Soru','q',e.q)+f('Kod','code',e.code,{rows:3,mono:true,hint:'isteğe bağlı'})+f('Kabul edilen cevaplar','a',L(e.a),{rows:2,hint:'her satıra bir cevap (ör. 3 ve üç)'})+f('Açıklama','tip',e.tip,{rows:2});break;
    case 'order':body=f('Soru','q',e.q)+f('Adımlar','items',L(e.items),{rows:5,hint:'DOĞRU sırayla, her satıra bir adım; uygulama karıştırır'})+f('Açıklama','tip',e.tip,{rows:2});break;
    case 'line':body=f('Soru','q',e.q)+f('Satırlar','lines',L(e.lines),{rows:5,hint:'ekranda göründüğü sırayla'})+f('Yanlış satırın numarası','a',(e.a||[]).map(x=>x+1).join(', '),{hint:'birden fazlaysa virgülle: 2, 4'})+f('Açıklama','tip',e.tip,{rows:2});break;
    case 'match':body=f('Soru','q',e.q)+f('Eşler','pairs',(e.pairs||[]).map(p=>p[0]+' | '+p[1]).join('\n'),{rows:4,hint:'her satıra: sol | sağ'});break;
    case 'robot':body=f('Soru','q',e.q)+`<p class="muted" style="font-size:.86rem;margin:0">Robot haritası buradan değiştirilemez.</p>`;break;
    default:body=`<p class="muted">Bu alıştırma türü düzenlenemez.</p>`;
  }
  const ok=!!icEx(e);
  return `<div class="card icex${ok?'':' bad'}" data-i="${i}"><div class="icexh"><span class="ictag">${i+1}. ${IC_TYPES[e.t]||e.t}</span>
    <span><button type="button" data-op="up" ${i?'':'disabled'} aria-label="Yukarı taşı">▲</button><button type="button" data-op="down" ${i<n-1?'':'disabled'} aria-label="Aşağı taşı">▼</button><button type="button" data-op="del" aria-label="Sil">${ic('trash',16)}</button></span></div>
    ${body}${ok?'':`<p class="icbadmsg">${ic('info',14)} Bu alıştırmada eksik var (en az 2 seçenek/adım, doğru cevap…). Böyle yayınlanamaz.</p>`}</div>`;
}
/* Formdaki değeri alıştırmaya yaz */
function icRead(e,k,v){
  const lines=v.split('\n').map(s=>s.trim()).filter(Boolean);
  if(k==='opts'){e.opts=lines;if(e.a>=lines.length)e.a=0}
  else if(k==='items')e.items=lines;
  else if(k==='lines')e.lines=v.split('\n').map(s=>s.replace(/\s+$/,'')).filter(s=>s.trim());
  else if(k==='pairs')e.pairs=lines.map(s=>{const j=s.indexOf('|');return j<0?[s,'']:[s.slice(0,j).trim(),s.slice(j+1).trim()]});
  else if(k==='a'&&(e.t==='mc'||e.t==='fill'))e.a=+v;
  else if(k==='a'&&e.t==='type')e.a=lines;
  else if(k==='a'&&e.t==='line')e.a=(v.match(/\d+/g)||[]).map(x=>+x-1);
  else if(k==='fig'){if(v)e.fig=v;else delete e.fig}
  else if(k==='code'){if(v.trim())e.code=v.replace(/\s+$/,'');else delete e.code}
  else if(k==='tip'){if(v.trim())e.tip=v.trim();else delete e.tip}
  else e[k]=v;
}
function icBind(){
  const ui=icSel.ui,li=icSel.li,les=icLesson(ui,li);les.ex=icClone(les.ex);
  const save=()=>icSetLesson(ui,li,les);
  $('#icX').onclick=closeContentEditor;
  $('#icF').onchange=e=>{icSel.f=e.target.value;icSel.ui=fieldUnits(icSel.f)[0].ui;icSel.li=0;icRender()};
  $('#icU').onchange=e=>{icSel.ui=+e.target.value;icSel.li=0;icRender()};
  $('#icL').onchange=e=>{icSel.li=+e.target.value;icRender()};
  const un=icUnit(ui);
  $('#icUT').oninput=e=>{un.title=e.target.value.trim()||icOrigU(ui).title;icSetUnit(ui,un)};
  $('#icUD').oninput=e=>{un.desc=e.target.value.trim();icSetUnit(ui,un)};
  $('#icLT').oninput=e=>{les.title=e.target.value.trim()||icOrigU(ui).lessons[li].title;save()};
  const box=$('#icExs');
  box.oninput=e=>{const k=e.target.dataset.k,c=e.target.closest('.icex');if(!k||!c)return;const ex=les.ex[+c.dataset.i];icRead(ex,k,e.target.value);save();
    const ok=!!icEx(ex);c.classList.toggle('bad',!ok);const m=$('.icbadmsg',c);if(ok&&m)m.remove();icStatus()};
  /* Seçenekler değişince "Doğru cevap" listesini ve hata uyarısını tazele */
  box.addEventListener('change',e=>{const k=e.target.dataset.k,c=e.target.closest('.icex');if(!c||!['opts','lines','items','pairs','a','code'].includes(k))return;
    const i=+c.dataset.i,t=document.createElement('div');t.innerHTML=icCard(les.ex[i],i,les.ex.length);c.replaceWith(t.firstElementChild)});
  box.onclick=e=>{const b=e.target.closest('[data-op]');if(!b)return;const i=+b.closest('.icex').dataset.i,op=b.dataset.op;
    if(op==='del'){if(!b.dataset.arm){b.dataset.arm=1;b.textContent='Sil?';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.innerHTML=ic('trash',16)}},3000);return}
      if(les.ex.length<=1){toast('Derste en az bir alıştırma kalmalı.');return}les.ex.splice(i,1)}
    else{const j=op==='up'?i-1:i+1;[les.ex[i],les.ex[j]]=[les.ex[j],les.ex[i]]}
    save();icRender()};
  $('#icAdd').onclick=()=>{les.ex.push(IC_NEW[$('#icNT').value]());save();icRender();const c=$$('#icExs .icex');c[c.length-1].scrollIntoView({behavior:'smooth',block:'center'})};
  $('#icRev').onclick=()=>{delete ICD.data.lessons[les.id];icTouch();icRender();toast('Ders orijinal hâline döndü.')};
  $('#icPrev').onclick=()=>{const ex=les.ex.map(icEx).filter(Boolean);if(!ex.length){toast('Önizlenecek alıştırma yok.');return}
    ex.forEach((x,i)=>x.id='__onizleme-'+i);$('#icEd').hidden=true;startMode('preview',{lesson:{id:'__onizleme',title:les.title,ex}});
    const lv=$('#lesson'),mo=new MutationObserver(()=>{if(lv.hidden){mo.disconnect();const el=$('#icEd');if(el){el.hidden=false;document.body.style.overflow='hidden'}}});mo.observe(lv,{attributes:true,attributeFilter:['hidden']})};
  $('#icDrop').onclick=e=>{const b=e.currentTarget;if(!b.dataset.arm){b.dataset.arm=1;b.textContent='Emin misin? Tekrar bas';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.textContent='Taslağı sil'}},4000);return}
    try{localStorage.removeItem(ICDKEY)}catch(_){}ICD=null;icDraftLoad();icRender();toast('Taslak silindi. Yayındaki içerik yüklendi.')};
  $('#icPub').onclick=icPublish;
}
async function icPost(fn,body){const jwt=await sbToken();if(!jwt)throw new Error('Oturum süresi doldu. Panelden yeniden giriş yap.');
  const r=await sbFetch('/rest/v1/rpc/'+fn,{method:'POST',body:JSON.stringify(body)},jwt);const j=await r.json().catch(()=>null);
  if(!r.ok){const m=(j&&j.message)||'';throw new Error(/yetkisi yok/.test(m)?'Bu işlem için "İçerik düzenleme" yetkin yok.':/bk_content|does not exist|PGRST202/.test(m+(j&&j.code))?'Sunucu henüz hazır değil: supabase/icerik.sql çalıştırılmalı.':/buyuk/.test(m)?'İçerik çok büyük.':'Yayınlanamadı: '+(m||r.status))}
  return j}
async function icPublish(){
  const msg=$('#icMsg'),b=$('#icPub');const bad=icBad();
  if(bad){msg.className='tres bad';msg.textContent=`${bad} alıştırmada eksik var. Kırmızı kartları düzelt ya da sil.`;return}
  if(!ICD.dirty&&ICV&&ICD.base===ICV.v){msg.className='tres info';msg.textContent='Yayındakinden farklı bir değişiklik yok.';return}
  b.disabled=true;b.textContent='Yayınlanıyor…';
  try{const v=await icPost('bk_content_publish',{p_data:ICD.data,p_note:$('#icNote').value.trim()||null});
    ICV={v,data:icClone(ICD.data),at:new Date().toISOString()};localStorage.setItem(ICKEY,JSON.stringify(ICV));
    ICD.base=v;ICD.dirty=false;icDraftSave();icVers=null;sfx.win&&sfx.win();
    msg.className='tres good';msg.innerHTML=`Yayınlandı: <b>${v}. sürüm</b>. Öğrenciler bir sonraki açılışta görecek. <button class="b3 sm" type="button" onclick="location.reload()">Bu cihazda şimdi uygula</button>`;
    $('#icNote').value='';icStatus();icLoadVers()}
  catch(e){msg.className='tres bad';msg.textContent=e.message}
  b.disabled=false;b.textContent='Yayınla';
}
async function icLoadVers(){const box=$('#icVers');if(!box)return;
  try{if(!icVers)icVers=await icPost('bk_content_list',{});}catch(e){box.innerHTML=`<p class="muted">${esc(e.message)}</p>`;return}
  const d=t=>{const x=new Date(t);return x.toLocaleDateString('tr-TR')+' '+String(x.getHours()).padStart(2,'0')+':'+String(x.getMinutes()).padStart(2,'0')};
  const cur=ICV?ICV.v:0;
  box.innerHTML=(icVers.length?icVers.map(r=>`<div class="icver${r.version===cur?' on':''}"><div><b>${r.version}. sürüm</b>${r.version===cur?' <span class="pill-ok">Yayında</span>':''}<small>${d(r.created_at)} · ${esc(r.created_by||'')}</small>${r.note?`<p>${esc(r.note)}</p>`:''}</div>
    ${r.version===cur?'':`<button class="b3 ghost sm" type="button" data-rv="${r.version}">Bu sürüme dön</button>`}</div>`).join(''):'<p class="muted">Henüz yayın yok. Şu an derslerin orijinal hâli kullanılıyor.</p>')
    +(icVers.length&&cur?`<div class="icver"><div><b>Orijinal içerik</b><small>Uygulamayla gelen ilk hâl</small></div><button class="b3 ghost sm" type="button" data-rv="0">Orijinale dön</button></div>`:'');
  box.onclick=async e=>{const b=e.target.closest('[data-rv]');if(!b)return;
    if(!b.dataset.arm){b.dataset.arm=1;b.textContent='Emin misin? Tekrar bas';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.textContent=b.dataset.rv==='0'?'Orijinale dön':'Bu sürüme dön'}},4000);return}
    const rv=+b.dataset.rv;b.disabled=true;b.textContent='Dönülüyor…';
    try{let data={units:{},lessons:{}};
      if(rv){const r=await sbFetch(`/rest/v1/bk_content?select=data&version=eq.${rv}`);if(!r.ok)throw new Error('Sürüm alınamadı.');data=(await r.json())[0].data}
      const v=await icPost('bk_content_publish',{p_data:data,p_note:rv?rv+'. sürüme dönüldü':'Orijinal içeriğe dönüldü'});
      ICV={v,data,at:new Date().toISOString()};localStorage.setItem(ICKEY,JSON.stringify(ICV));
      try{localStorage.removeItem(ICDKEY)}catch(_){}ICD=null;icDraftLoad();icVers=null;icRender();
      toast(`Geri dönüldü (yeni sürüm: ${v}). <button class="b3 sm" type="button" onclick="location.reload()">Uygula</button>`,6000)}
    catch(err){toast(esc(err.message));b.disabled=false;b.textContent='Tekrar dene'}};
}
