/* #BilimKıvılcımı · Yönetici istatistik paneli
   Site sunucusuz çalıştığı için veriler öğrencilerin ilerleme kodlarından ve öğretmenlerin
   sınıf dosyalarından toplanır. Her şey yalnızca bu cihazda saklanır. */
'use strict';

const ADMKEY='bk-yonetici-v1',ADM_DEFAULT_PIN='10947';
let ADM={pinH:null,users:{}};try{ADM=Object.assign(ADM,JSON.parse(localStorage.getItem(ADMKEY))||{})}catch(e){}
const admSave=()=>{try{localStorage.setItem(ADMKEY,JSON.stringify(ADM))}catch(e){toast('Veriler kaydedilemedi. Tarayıcı depolaması dolu olabilir.')}};
const pinHash=p=>{let h=2166136261;for(const ch of 'bk|'+p){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h.toString(36)};
let admOpen=false;try{admOpen=sessionStorage.getItem('bk-yon-acik')==='1'}catch(e){}
let admQuery='';

/* ================= CANLI VERİ (Supabase) ================= */
let SBS=null;try{SBS=JSON.parse(sessionStorage.getItem('bk-yon-sb'))}catch(e){}
const LIVE={rows:null,at:0,err:'',loading:false};
const sbsSave=()=>{try{SBS?sessionStorage.setItem('bk-yon-sb',JSON.stringify(SBS)):sessionStorage.removeItem('bk-yon-sb')}catch(e){}};
async function sbLogin(email,password){
  const r=await sbFetch('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(/invalid/i.test(j.error_description||j.msg||j.error_code||'')?'E-posta ya da şifre yanlış.':'Giriş yapılamadı: '+(j.error_description||j.msg||r.status));
  SBS={at:j.access_token,rt:j.refresh_token,exp:Date.now()+(j.expires_in||3600)*1000-60000,email:(j.user&&j.user.email)||email};
  if(!(await sbRole())){SBS=null;sbsSave();throw new Error('Bu hesap yönetici listesinde değil.')}
  sbsSave();
}
/* Rol ve yetkiler. supabase/ekip.sql henüz çalıştırılmadıysa eski düzen geçerli: listedeki herkes her şeyi görür. */
const PERMS=[['istatistik','İstatistikler','Genel sayılar ve grafikler'],['ogrenciler','Öğrenci listesi','Öğrenci tablosu ve CSV indirme'],['veri','Veri ekleme','Kodla ve dosyayla veri ekleme']];
async function sbRole(){
  const r=await sbFetch('/rest/v1/rpc/bk_me',{method:'POST',body:'{}'},SBS.at);
  if(r.ok){const m=await r.json();if(!m)return false;SBS.role=m.role;SBS.perms=m.perms||[];return true}
  const a=await sbFetch('/rest/v1/rpc/bk_is_admin',{method:'POST',body:'{}'},SBS.at);
  if(a.ok&&(await a.json())===true){SBS.role='legacy';SBS.perms=PERMS.map(p=>p[0]);return true}
  return false;
}
const isOwner=()=>!!(SBS&&SBS.role==='owner');
const can=p=>!SBS||SBS.role==='owner'||(SBS.perms||[]).includes(p);
async function sbSignup(email,password){
  const iv=await sbFetch('/rest/v1/rpc/bk_invited',{method:'POST',body:JSON.stringify({p_email:email})});
  if(iv.ok&&(await iv.json())!==true)throw new Error('Bu e-posta ekibe eklenmemiş. Ana yöneticiden seni eklemesini iste.');
  const r=await sbFetch('/auth/v1/signup',{method:'POST',body:JSON.stringify({email,password})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(/registered|exists/i.test(j.msg||j.error_description||j.error_code||'')?'Bu e-postayla zaten hesap var. Giriş yap.':/password/i.test(j.msg||j.error_code||'')?'Şifre en az 6 karakter olmalı.':'Hesap oluşturulamadı: '+(j.msg||j.error_description||r.status));
  if(j.access_token){await sbLogin(email,password);return 'in'}
  return 'confirm';
}
/* Ekip (yalnızca ana yönetici) */
const TEAM={rows:null,err:'',loading:false};
async function teamLoad(){if(!isOwner()||TEAM.loading)return;TEAM.loading=true;TEAM.err='';
  try{const jwt=await sbToken();const r=await sbFetch('/rest/v1/rpc/bk_team',{method:'POST',body:'{}'},jwt);if(!r.ok)throw new Error('Ekip listesi alınamadı ('+r.status+').');TEAM.rows=await r.json()}
  catch(e){TEAM.err=e.message}TEAM.loading=false;if(page==='yonetici')renderAdmin()}
async function teamCall(fn,body){const jwt=await sbToken();const r=await sbFetch('/rest/v1/rpc/'+fn,{method:'POST',body:JSON.stringify(body)},jwt);
  if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(/gecersiz e-posta/.test(j.message||'')?'E-posta geçersiz.':/ana yonetici degistirilemez/.test(j.message||'')?'Ana yöneticinin yetkileri değiştirilemez.':'İşlem yapılamadı: '+(j.message||r.status))}
  await teamLoad()}
async function sbToken(){
  if(!SBS)return null;if(Date.now()<SBS.exp)return SBS.at;
  const r=await sbFetch('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:SBS.rt})});
  if(!r.ok){SBS=null;sbsSave();return null}
  const j=await r.json();SBS=Object.assign(SBS,{at:j.access_token,rt:j.refresh_token,exp:Date.now()+(j.expires_in||3600)*1000-60000});sbsSave();return SBS.at;
}
async function admLoadLive(){
  if(!SBS||LIVE.loading)return;LIVE.loading=true;LIVE.err='';
  try{const jwt=await sbToken();if(!jwt)throw new Error('Oturum süresi doldu. Yeniden giriş yapın.');
    if(!(await sbRole())){SBS=null;sbsSave();throw new Error('Yönetici erişimin kaldırıldı.')}sbsSave();
    if(isOwner()&&!TEAM.rows)teamLoad();
    if(!can('istatistik')&&!can('ogrenciler')){LIVE.rows={};LIVE.at=Date.now();throw new Error('')}
    const out={};for(let off=0;off<100000;off+=1000){
      const r=await sbFetch(`/rest/v1/bk_progress?select=uid,data,updated_at&order=updated_at.desc&limit=1000&offset=${off}`,{},jwt);
      if(!r.ok)throw new Error('Veriler alınamadı ('+r.status+').');
      const rows=await r.json();rows.forEach(x=>{const o=reNorm(Object.assign({},x.data,{v:2,i:x.uid}));if(o)out[codeKey(o)]=o});
      if(rows.length<1000)break}
    LIVE.rows=out;LIVE.at=Date.now();
  }catch(e){LIVE.err=e.message===''?'':(e.message||'Bağlantı kurulamadı.');if(!SBS){admOpen=false;try{sessionStorage.removeItem('bk-yon-acik')}catch(_){}}}
  LIVE.loading=false;if(page==='yonetici')renderAdmin();
}
setInterval(()=>{if(page==='yonetici'&&admOpen&&SBS&&document.visibilityState==='visible')admLoadLive()},60000);

/* Kaydedilmiş ya da dosyadan gelen bir kaydı yeniden doğrula */
function reNorm(o){
  if(!o||typeof o!=='object'||typeof o.x!=='number')return null;
  if(o.v===2)return normCode({v:2,i:o.i,n:o.n,x:o.x,l:o.L||o.l,c:o.C||o.c,e:o.E||(o.e&&typeof o.e==='object'?o.e:{}),w:o.w,k:o.k,b:o.b,s:o.s,h:o.h,a:o.a,j:o.j,t:o.t});
  return normCode({n:o.n,x:o.x,l:o.l,e:o.e,k:o.k,b:o.b,s:o.s,d:o.d,t:o.t});
}
function admAdd(list){let ok=0,newer=0;
  list.forEach(o=>{const r=reNorm(o);if(!r)return;const k=codeKey(r),old=ADM.users[k];
    if(!old){ADM.users[k]=r;ok++}else if(String(old.t)<=String(r.t)){ADM.users[k]=r;newer++}});
  admSave();return{ok,newer}}
function admParseText(txt){
  const out=[];let bad=0;
  try{const j=JSON.parse(txt);
    const arr=j&&j.tur==='bk-sinif'?j.ogrenciler:j&&j.tur==='bk-yonetici'?j.kullanicilar:Array.isArray(j)?j:null;
    if(arr){arr.forEach(o=>out.push(o));return{out,bad}}}catch(e){}
  (txt.match(/BK[12]\.[A-Za-z0-9_-]+/g)||[]).forEach(c=>{const o=decodeCode(c);if(o)out.push(o);else bad++});
  return{out,bad};
}

/* ================= HESAPLAMA ================= */
function admUsers(){const all=Object.assign({},ADM.users);
  if(LIVE.rows)Object.entries(LIVE.rows).forEach(([k,o])=>{const old=all[k];if(!old||String(old.t)<=String(o.t))all[k]=o});return Object.values(all)}
function admStats(){
  const us=admUsers(),tn=dayNum(dkey());
  const last=u=>u.a?dayNum(u.a):null,since=u=>{const l=last(u);return l==null?null:tn-l};
  const act=n=>us.filter(u=>{const s=since(u);return s!=null&&s<n}).length;
  const v2=us.filter(u=>u.v===2);
  const newJ=v2.filter(u=>u.j&&tn-dayNum(u.j)<30).length;
  const lessonsTot=us.reduce((a,u)=>a+u.l+(u.v===2?u.C.filter(id=>!u.L.includes(id)).length:0),0);
  /* Son 14 gün: o gün en az bir şey yapan öğrenci sayısı */
  const daily=[];for(let i=13;i>=0;i--){const day=tn-i;let n=0;
    v2.forEach(u=>{if(!u.t)return;const base=dayNum(u.t);if(u.h.some(off=>base-off===day))n++});
    const d=new Date();d.setDate(d.getDate()-i);daily.push({day,n,lbl:d.getDate()+'.'+(d.getMonth()+1)})}
  /* Kategoriler */
  /* Alan: BK2 kodlarında ders listesinden, eski BK1 kodlarında (yalnızca kodlama vardı) ders sayısından */
  const fieldUse=f=>{const ids=new Set(ALL_LESSONS.filter(l=>l.field===f.id).map(l=>l.id));let users=0,done=0;
    us.forEach(u=>{const n=u.v===2?u.L.concat(u.C).filter(id=>ids.has(id)).length:(f.id==='yazilim'?u.l:0);if(n){users++;done+=n}});return{users,done}};
  const cats=[
    ...FIELDS.map(f=>Object.assign({name:f.title,icon:f.icon,unit:'ders'},fieldUse(f))),
    {name:'Laboratuvar',icon:'flask',users:us.filter(u=>u.e>0).length,done:us.reduce((a,u)=>a+u.e,0),unit:'deney görevi'},
    {name:'Çizim atölyesi',icon:'pen',users:v2.filter(u=>u.w>0).length,done:v2.reduce((a,u)=>a+u.w,0),unit:'çizim',only2:true}
  ];
  /* Ders bazında tamamlama */
  const lessonRows=[];
  FIELDS.forEach(f=>fieldUnits(f.id).forEach(({u,ui})=>u.lessons.forEach(l=>lessonRows.push({grp:f.title+' · '+unitNo(ui)+'. Ünite · '+u.title,title:l.title,n:v2.filter(x=>x.L.includes(l.id)||x.C.includes(l.id)).length}))));
  const expRows=EXPS.map(x=>({title:x.title,n:v2.filter(u=>(u.E[x.id]||0)>0).length}));
  return{us,v2,tot:us.length,a7:act(7),a30:act(30),newJ,lessonsTot,avgXP:us.length?Math.round(us.reduce((a,u)=>a+u.x,0)/us.length):0,daily,cats,lessonRows,expRows,since,old:us.length-v2.length};
}

/* ================= ÇİZİM PARÇALARI ================= */
const fmt=n=>Number(n).toLocaleString('tr-TR');
function hbars(rows,max,opt={}){
  max=Math.max(1,max);
  return `<div class="hb">${rows.map(r=>`<div class="hbr" data-tip="${esc(r.tip||r.title+': '+fmt(r.n))}"><span class="hbl">${r.icon?ic(r.icon,18):''}${esc(r.title)}</span>
    <span class="hbt"><i style="width:${r.n/max*100}%"></i></span><b class="hbv">${fmt(r.n)}${opt.suffix?`<small>${esc(opt.suffix(r))}</small>`:''}</b></div>`).join('')}</div>`;
}
function vbars(rows){
  const max=Math.max(1,...rows.map(r=>r.n));
  return `<div class="vb" role="img" aria-label="Son 14 günde günlük aktif öğrenci sayısı">${rows.map((r,i)=>`<div class="vbc" data-tip="${r.lbl}: ${r.n} aktif öğrenci"><span class="vbv">${r.n&&(i===rows.length-1||r.n===max)?r.n:''}</span><i style="height:${r.n/max*100}%"></i><span class="vbl">${i%2===rows.length%2?'':r.lbl}</span></div>`).join('')}</div>`;
}

/* ================= SAYFA ================= */
function renderAdmin(){
  const el=$('#pgAdmin');
  if(!admOpen){
    el.innerHTML=`<div class="card admgate">${anka('think',100,'gozluk')}<h1 class="ph1" style="margin:0">Yönetici paneli</h1><p class="muted">Siteden gelen canlı istatistikleri görmek için yönetici hesabınızla giriş yapın.</p>
      <label for="admMail" style="font-weight:800">E-posta</label><input id="admMail" type="email" autocomplete="username" value="${esc(SBS&&SBS.email||'')}">
      <label for="admPass" style="font-weight:800">Şifre</label><input id="admPass" type="password" autocomplete="current-password">
      <label for="admPass2" style="font-weight:800" class="admsu" hidden>Şifre (tekrar)</label><input id="admPass2" type="password" autocomplete="new-password" class="admsu" hidden>
      <button class="b3" type="button" id="admLogin">Giriş yap</button><p class="tres bad" id="admErr" role="alert">${esc(LIVE.err||'')}</p>
      <button type="button" class="linkbtn" id="admSuT">Ekibe eklendin mi? İlk kez giriyorsan hesap oluştur</button>
      <details class="more" style="width:100%"><summary>İnternet yok mu? Kodlarla çalış</summary><p class="muted" style="font-size:.9rem;margin:8px 0">Öğrenci kodları ve sınıf dosyalarıyla, internetsiz çalışır.</p>
        <label for="admPin" style="font-weight:800">Panel şifresi</label><div style="display:flex;gap:8px;margin-top:6px"><input id="admPin" type="password" inputmode="numeric" autocomplete="off" maxlength="32"><button class="b3 ghost sm" type="button" id="admGo">Aç</button></div></details></div>`;
    let su=false;const lbl=()=>su?'Hesap oluştur':'Giriş yap';
    $('#admSuT').onclick=()=>{su=!su;$$('.admsu').forEach(x=>x.hidden=!su);$('#admLogin').textContent=lbl();$('#admSuT').textContent=su?'Zaten hesabın var mı? Giriş yap':'Ekibe eklendin mi? İlk kez giriyorsan hesap oluştur';$('#admPass').autocomplete=su?'new-password':'current-password';$('#admErr').className=su?'tres info':'tres bad';$('#admErr').textContent=su?'Ana yöneticinin seni eklediği e-postayı yaz ve kendine bir şifre belirle.':''};
    const login=async()=>{const e=$('#admMail').value.trim(),pw=$('#admPass').value;if(!e||!pw){$('#admErr').textContent='E-posta ve şifreyi yazın.';return}
      if(su&&pw!==$('#admPass2').value){$('#admErr').textContent='İki şifre aynı değil.';return}
      if(su&&pw.length<6){$('#admErr').textContent='Şifre en az 6 karakter olmalı.';return}
      const b=$('#admLogin');b.disabled=true;b.textContent=su?'Hesap oluşturuluyor…':'Giriş yapılıyor…';
      try{if(su&&(await sbSignup(e,pw))==='confirm'){$('#admErr').className='tres good';$('#admErr').textContent='Hesabın oluşturuldu. E-postana gelen onay bağlantısına tıkla, sonra buradan giriş yap.';su=false;$$('.admsu').forEach(x=>x.hidden=true);b.disabled=false;b.textContent=lbl();return}
        if(!su)await sbLogin(e,pw);LIVE.err='';admOpen=true;try{sessionStorage.setItem('bk-yon-acik','1')}catch(_){}renderAdmin();admLoadLive()}
      catch(err){$('#admErr').className='tres bad';$('#admErr').textContent=err.message||'Bağlantı kurulamadı. İnternetinizi kontrol edin.';b.disabled=false;b.textContent=lbl();sfx.bad()}};
    $('#admLogin').onclick=login;$('#admPass').addEventListener('keydown',e=>{if(e.key==='Enter')login()});
    const go=()=>{const v=$('#admPin').value.trim();const ok=ADM.pinH?pinHash(v)===ADM.pinH:v===ADM_DEFAULT_PIN;
      if(ok){admOpen=true;try{sessionStorage.setItem('bk-yon-acik','1')}catch(e){}renderAdmin()}else{$('#admErr').textContent='Panel şifresi yanlış.';sfx.bad()}};
    $('#admGo').onclick=go;$('#admPin').addEventListener('keydown',e=>{if(e.key==='Enter')go()});setTimeout(()=>{const p=$(SBS?'#admPass':'#admMail');if(p)p.focus()},50);return;
  }
  if(SBS&&!LIVE.rows&&!LIVE.loading&&!LIVE.err)admLoadLive();
  const st=admStats(),empty=!st.tot;
  const tile=(v,l,icn,note)=>`<div class="card atile"><span>${ic(icn,22)}</span><b>${v}</b><small>${l}</small>${note?`<em>${note}</em>`:''}</div>`;
  const catMax=Math.max(1,...st.cats.map(c=>c.users));
  const groups=[...new Set(st.lessonRows.map(r=>r.grp))];
  const lmax=Math.max(1,...st.lessonRows.map(r=>r.n));
  const rows=st.us.filter(u=>!admQuery||(u.n||'').toLocaleLowerCase('tr').includes(admQuery)).sort((a,b)=>(st.since(a)??1e9)-(st.since(b)??1e9)||b.x-a.x);
  const hm=t=>{const d=new Date(t);return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
  const src=SBS?(LIVE.err?`<span class="srcbad">${ic('info',14)} ${esc(LIVE.err)}</span>`:LIVE.loading&&!LIVE.rows?'Canlı veriler yükleniyor…':`<span class="srcok">● Canlı</span> ${fmt(Object.keys(LIVE.rows||{}).length)} öğrenci siteden · ${hm(LIVE.at)} itibarıyla, her dakika yenilenir`):'Çevrimdışı mod: yalnızca bu cihaza eklenen kodlar';
  el.innerHTML=`<div class="admhead"><div><p class="eyebrow">${SBS?(isOwner()?'ANA YÖNETİCİ':SBS.role==='legacy'?'YÖNETİCİ':'EKİP ÜYESİ')+' · '+esc(SBS.email):'YÖNETİCİ · ÇEVRİMDIŞI'}</p><h1 class="ph1" style="margin:4px 0">İstatistik paneli</h1><p class="sub" style="margin:0">${src}</p>${empty&&!LIVE.loading?'<p class="muted" style="margin-top:4px;font-size:.92rem">Henüz veri yok. Öğrenciler ders bitirdikçe sayılar burada görünür.</p>':''}</div>
    <div class="abtns" style="margin:0">${SBS?`<button class="b3 ghost sm" type="button" id="admRef" ${LIVE.loading?'disabled':''}>${ic('reset',16)} ${LIVE.loading?'Yenileniyor…':'Yenile'}</button>`:''}<button class="b3 ghost sm" type="button" id="admLock">${ic('lock',16)} Çıkış</button></div></div>
  ${!can('istatistik')&&!can('ogrenciler')&&!can('veri')?`<div class="card apanel"><h3>Henüz bir yetkin yok</h3><p class="muted">Ana yönetici sana panelde bir bölüm açınca burada görünecek.</p></div>`:''}
  ${can('istatistik')?`<div class="atiles">
    ${tile(fmt(st.tot),'Toplam kayıtlı kullanıcı','user')}
    ${tile(fmt(st.a7),'Aktif kullanıcı (son 7 gün)','bolt',st.tot?'%'+Math.round(st.a7/st.tot*100):'')}
    ${tile(fmt(st.a30),'Aktif kullanıcı (son 30 gün)','calendar',st.tot?'%'+Math.round(st.a30/st.tot*100):'')}
    ${tile(fmt(st.newJ),'Yeni kayıt (son 30 gün)','star')}
    ${tile(fmt(st.lessonsTot),'Tamamlanan ders','book')}
    ${tile(fmt(st.avgXP),'Ortalama DP','chart')}
  </div>
  ${st.old?`<p class="muted anote">${ic('info',16)} ${st.old} öğrenci eski tip kodla (BK1) eklendi. Bu kodlarda son etkinlik, alan dersleri ve ders ayrıntısı yok; bu öğrenciler yalnızca toplamlara katılır.</p>`:''}
  <div class="agrid">
    <div class="card apanel"><h3>Günlük aktif öğrenci <small>son 14 gün</small></h3>${empty?'<p class="muted">Veri yok.</p>':vbars(st.daily)}</div>
    <div class="card apanel"><h3>Kategori bazlı kullanım <small>kullanan öğrenci · tamamlanan</small></h3>
      ${hbars(st.cats.map(c=>({title:c.name,icon:c.icon,n:c.users,done:c.done,unit:c.unit,tip:`${c.name}: ${fmt(c.users)} öğrenci, ${fmt(c.done)} ${c.unit}`})),catMax,{suffix:r=>' · '+fmt(r.done)+' '+r.unit})}</div>
  </div>
  <div class="agrid">
    <div class="card apanel"><h3>Ders tamamlama sayıları <small>dersi bitiren öğrenci</small></h3>
      ${groups.map(g=>`<p class="agrp">${esc(g)}</p>${hbars(st.lessonRows.filter(r=>r.grp===g),lmax)}`).join('')}</div>
    <div class="card apanel"><h3>Deney bazında <small>en az bir görev bitiren öğrenci</small></h3>${hbars(st.expRows,Math.max(1,...st.expRows.map(r=>r.n)))}</div>
  </div>`:''}
  ${can('ogrenciler')?`<div class="card apanel"><div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><h3>Öğrenciler <small>${fmt(rows.length)} kişi</small></h3>
    <input id="admQ" type="search" placeholder="Ada göre ara" value="${esc(admQuery)}" style="max-width:240px"></div>
    <div class="tscroll" style="max-height:420px;margin-top:10px"><table class="dtable"><thead><tr><th>Ad</th><th>DP</th><th>Ders</th><th>Deney görevi</th><th>Son etkinlik</th><th>Durum</th></tr></thead><tbody>
    ${rows.slice(0,300).map(u=>{const s=st.since(u);return `<tr><td><b>${esc(u.n||('Öğrenci '+(u.i||'').slice(0,5)))}</b></td><td>${fmt(u.x)}</td><td>${u.l+(u.v===2?u.C.filter(id=>!u.L.includes(id)).length:0)}</td><td>${u.e}</td><td>${u.a?u.a.split('-').reverse().join('.'):'–'}</td><td>${s==null?'Bilinmiyor':s<7?'<span class="pill-ok">Aktif</span>':s<30?'Son 30 gün':'Pasif'}</td></tr>`}).join('')||'<tr><td colspan="6" class="muted">Öğrenci yok.</td></tr>'}
    </tbody></table></div></div>`:''}
  ${teamHtml()}
  <div class="agrid">
    ${can('veri')?`<div class="card apanel"><h3>Kodla veri ekle <small>internetsiz sınıflar için</small></h3>
      <p class="muted" style="font-size:.92rem">İnternete hiç bağlanmayan sınıfların öğrenci kodlarını (BK1 ya da BK2) yapıştırın ya da öğretmenlerin <b>sınıf dosyalarını</b> seçin.</p>
      <textarea class="codes" id="admIn" rows="3" placeholder="BK2.eyJ2Ijoy..."></textarea>
      <div class="abtns"><button class="b3 sm" type="button" id="admAddBtn">Kodları ekle</button>
        <label class="b3 ghost sm" style="cursor:pointer">${ic('notebook',16)} Dosya seç<input id="admFile" type="file" accept=".json,.txt,.csv" multiple hidden></label>
        <button class="b3 ghost sm" type="button" id="admSelf">Bu cihazdaki öğrenci</button>
        <button class="b3 ghost sm" type="button" id="admSnf">Öğretmen tablosundakiler</button></div>
      <p class="muted" id="admMsg" role="status" style="font-size:.9rem;margin-top:8px"></p></div>`:''}
    ${can('ogrenciler')||can('veri')?`<div class="card apanel"><h3>Yönetim</h3>
      <div class="abtns">${can('ogrenciler')?`<button class="b3 ghost sm" type="button" id="admCsv">${ic('save',16)} CSV indir</button>`:''}${can('veri')?`<button class="b3 ghost sm" type="button" id="admBak">${ic('save',16)} Yedek indir</button><button class="b3 ghost sm" type="button" id="admClr">${ic('trash',16)} Verileri sil</button>`:''}</div>
      <label for="admNew" style="display:block;font-weight:800;margin:14px 0 6px">Şifreyi değiştir</label>
      <div style="display:flex;gap:8px"><input id="admNew" type="password" autocomplete="new-password" placeholder="Yeni şifre (en az 4 karakter)" maxlength="32"><button class="b3 sm" type="button" id="admPinBtn">Kaydet</button></div>
      <p class="muted" style="font-size:.86rem;margin-top:12px">${ic('info',14)} Canlı veriler Supabase'ten gelir ve adsızdır. Buradan eklenen kodlar ve dosyalar ise yalnızca bu cihazda saklanır; canlı verilerle birleştirilir, aynı öğrenci iki kez sayılmaz. Panel şifresi yalnızca çevrimdışı mod içindir.</p></div>`:''}
  </div>`;
  const $a=s=>$(s)||document.createElement('input');
  const msg=t=>{const m=$('#admMsg');if(m)m.textContent=t};
  const after=(r,bad)=>{renderAdmin();msg(`${r.ok} yeni öğrenci eklendi${r.newer?`, ${r.newer} öğrenci güncellendi`:''}${bad?`, ${bad} kod okunamadı`:''}.`)};
  $a('#admLock').onclick=()=>{admOpen=false;SBS=null;sbsSave();LIVE.rows=null;LIVE.err='';try{sessionStorage.removeItem('bk-yon-acik')}catch(e){}renderAdmin()};
  teamBind();
  const rf=$a('#admRef');if(rf)rf.onclick=()=>admLoadLive();
  $a('#admQ').oninput=e=>{admQuery=e.target.value.trim().toLocaleLowerCase('tr');const p=e.target.selectionStart;renderAdmin();const q=$a('#admQ');q.focus();try{q.setSelectionRange(p,p)}catch(_){}};
  $a('#admAddBtn').onclick=()=>{const {out,bad}=admParseText($a('#admIn').value);after(admAdd(out),bad)};
  $a('#admFile').onchange=async e=>{let all=[],bad=0;for(const f of e.target.files){try{const r=admParseText(await f.text());all=all.concat(r.out);bad+=r.bad}catch(_){bad++}}after(admAdd(all),bad)};
  $a('#admSelf').onclick=()=>{const o=decodeCode(progressCode());after(admAdd(o?[o]:[]),0)};
  $a('#admSnf').onclick=()=>{after(admAdd(Object.values(SNF)),0)};
  $a('#admCsv').onclick=()=>{const head='Ad ya da kimlik;DP;Ders;Deney görevi;Çizim;En uzun seri;Son etkinlik;Katılma;Kod tarihi';
    downloadFile('bilimkivilcimi-istatistik-'+dkey()+'.csv','﻿'+[head].concat(st.us.map(u=>[u.n||u.i,u.x,u.l+u.c,u.e,u.w,u.b,u.a,u.j,u.t].map(v=>String(v??'').replace(/;/g,',')).join(';'))).join('\n'),'text/csv')};
  $a('#admBak').onclick=()=>downloadFile('bilimkivilcimi-yonetici-yedek-'+dkey()+'.json',JSON.stringify({tur:'bk-yonetici',tarih:dkey(),kullanicilar:Object.values(ADM.users)}),'application/json');
  $a('#admClr').onclick=e=>{const b=e.currentTarget;if(!b.dataset.arm){b.dataset.arm=1;b.textContent='Emin misiniz? Tekrar basın';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.innerHTML=ic('trash',16)+' Verileri sil'}},4000);return}
    ADM.users={};admSave();renderAdmin();msg('Bütün öğrenci verileri silindi.')};
  $a('#admPinBtn').onclick=()=>{const v=$a('#admNew').value.trim();if(v.length<4){toast('Şifre en az 4 karakter olmalı.');return}ADM.pinH=pinHash(v);admSave();$a('#admNew').value='';toast(ic('lock',18)+' Yönetici şifresi değişti')};
}

/* Ekip yönetimi kartı (yalnızca ana yönetici görür) */
function teamHtml(){if(!isOwner())return'';
  const rows=TEAM.rows||[];
  const box=(email,p,on,dis)=>`<label class="tperm"><input type="checkbox" data-te="${esc(email)}" data-tp="${p[0]}" ${on?'checked':''} ${dis?'disabled':''}> <span>${p[1]}</span></label>`;
  return `<div class="card apanel" id="admTeam"><h3>Ekip <small>kim hangi bölümü görür</small></h3>
    <p class="muted" style="font-size:.9rem;margin:0 0 10px">Eklediğin kişi bu sayfada <b>"İlk kez giriyorsan hesap oluştur"</b> ile kendi şifresini belirler. Yetkiyi değiştirdiğin ya da kişiyi çıkardığın an geçerli olur; açık olan paneli en geç bir dakika içinde kapanır.</p>
    ${TEAM.err?`<p class="srcbad">${ic('info',14)} ${esc(TEAM.err)}</p>`:''}
    ${!TEAM.rows&&!TEAM.err?'<p class="muted">Ekip yükleniyor…</p>':''}
    <div class="tlist">${rows.map(r=>{const own=r.role==='owner';return `<div class="trow"><div class="tmail"><b>${esc(r.email)}</b><small>${own?'Ana yönetici · her şeyi görür':r.added_by?'Ekleyen: '+esc(r.added_by):'Önceden eklenmiş'}</small></div>
      <div class="tperms">${PERMS.map(p=>box(r.email,p,own||(r.perms||[]).includes(p[0]),own)).join('')}</div>
      ${own?'':`<button type="button" class="b3 ghost sm" data-trm="${esc(r.email)}" style="--oc:var(--garnet)">${ic('trash',16)} Çıkar</button>`}</div>`}).join('')}</div>
    <div class="tadd"><label for="tMail" style="font-weight:800">Ekibe kişi ekle</label>
      <input id="tMail" type="email" placeholder="ornek@eposta.com" autocomplete="off">
      <div class="tperms">${PERMS.map(p=>`<label class="tperm" title="${p[2]}"><input type="checkbox" class="tnew" value="${p[0]}" ${p[0]==='istatistik'?'checked':''}> <span>${p[1]}</span></label>`).join('')}</div>
      <button class="b3 sm" type="button" id="tAdd">${ic('user',16)} Ekle</button><p class="muted" id="tMsg" role="status" style="font-size:.9rem;margin:0"></p></div></div>`}
function teamBind(){const t=$('#admTeam');if(!t)return;
  const m=x=>{const e=$('#tMsg');if(e)e.textContent=x};
  t.onchange=async e=>{const c=e.target.closest('[data-te]');if(!c)return;const email=c.dataset.te;
    const perms=[...t.querySelectorAll(`[data-te="${CSS.escape(email)}"]`)].filter(x=>x.checked).map(x=>x.dataset.tp);
    c.disabled=true;try{await teamCall('bk_team_save',{p_email:email,p_perms:perms});toast(ic('check',18)+' Yetkiler güncellendi')}catch(err){toast(esc(err.message));c.checked=!c.checked;c.disabled=false}};
  t.onclick=async e=>{
    const r=e.target.closest('[data-trm]');
    if(r){if(!r.dataset.arm){r.dataset.arm=1;r.textContent='Emin misin? Tekrar bas';setTimeout(()=>{if(r.isConnected){delete r.dataset.arm;r.innerHTML=ic('trash',16)+' Çıkar'}},4000);return}
      try{await teamCall('bk_team_remove',{p_email:r.dataset.trm});toast(ic('check',18)+' Ekipten çıkarıldı')}catch(err){toast(esc(err.message))}return}
    if(e.target.closest('#tAdd')){const email=$('#tMail').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){m('Geçerli bir e-posta yaz.');return}
      const perms=[...t.querySelectorAll('.tnew')].filter(x=>x.checked).map(x=>x.value);
      try{await teamCall('bk_team_save',{p_email:email,p_perms:perms});toast(ic('check',18)+' '+esc(email)+' ekibe eklendi')}catch(err){m(err.message)}}};
}

/* Grafik ipucu (fare ve dokunma) */
(function(){let tip=null;
  const show=(t,x,y)=>{if(!tip){tip=document.createElement('div');tip.className='atip';tip.setAttribute('role','tooltip');document.body.appendChild(tip)}
    tip.textContent=t;tip.style.display='block';const w=tip.offsetWidth;tip.style.left=Math.min(innerWidth-w-8,Math.max(8,x-w/2))+'px';tip.style.top=Math.max(8,y-44)+'px'};
  document.addEventListener('pointerover',e=>{const d=e.target.closest&&e.target.closest('[data-tip]');if(d)show(d.dataset.tip,e.clientX,e.clientY);else if(tip)tip.style.display='none'});
  document.addEventListener('pointermove',e=>{if(tip&&tip.style.display==='block'&&e.target.closest&&e.target.closest('[data-tip]'))show(tip.textContent,e.clientX,e.clientY)});
  addEventListener('scroll',()=>{if(tip)tip.style.display='none'},{passive:true});
})();
