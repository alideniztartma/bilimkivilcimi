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

/* Kaydedilmiş ya da dosyadan gelen bir kaydı yeniden doğrula */
function reNorm(o){
  if(!o||typeof o!=='object'||typeof o.x!=='number')return null;
  if(o.v===2)return normCode({v:2,i:o.i,n:o.n,x:o.x,l:o.L||o.l,c:o.C||o.c,e:o.E||{},w:o.w,k:o.k,b:o.b,s:o.s,h:o.h,a:o.a,j:o.j,t:o.t});
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
function admStats(){
  const us=Object.values(ADM.users),tn=dayNum(dkey());
  const last=u=>u.a?dayNum(u.a):null,since=u=>{const l=last(u);return l==null?null:tn-l};
  const act=n=>us.filter(u=>{const s=since(u);return s!=null&&s<n}).length;
  const v2=us.filter(u=>u.v===2);
  const newJ=v2.filter(u=>u.j&&tn-dayNum(u.j)<30).length;
  const lessonsTot=us.reduce((a,u)=>a+u.l+u.c,0);
  /* Son 14 gün: o gün en az bir şey yapan öğrenci sayısı */
  const daily=[];for(let i=13;i>=0;i--){const day=tn-i;let n=0;
    v2.forEach(u=>{if(!u.t)return;const base=dayNum(u.t);if(u.h.some(off=>base-off===day))n++});
    const d=new Date();d.setDate(d.getDate()-i);daily.push({day,n,lbl:d.getDate()+'.'+(d.getMonth()+1)})}
  /* Kategoriler */
  const trackUse=t=>{const ids=new Set(t.lessons.map(l=>l.id));let users=0,done=0;v2.forEach(u=>{const n=u.C.filter(id=>ids.has(id)).length;if(n){users++;done+=n}});return{users,done}};
  const cats=[
    {name:'Kodlama yolu',icon:'robot',users:us.filter(u=>u.l>0).length,done:us.reduce((a,u)=>a+u.l,0),unit:'ders'},
    {name:'Laboratuvar',icon:'flask',users:us.filter(u=>u.e>0).length,done:us.reduce((a,u)=>a+u.e,0),unit:'deney görevi'},
    ...TRACKS.map(t=>Object.assign({name:t.title,icon:t.icon,unit:'ders',only2:true},trackUse(t))),
    {name:'Çizim atölyesi',icon:'pen',users:v2.filter(u=>u.w>0).length,done:v2.reduce((a,u)=>a+u.w,0),unit:'çizim',only2:true}
  ];
  /* Ders bazında tamamlama */
  const lessonRows=[];
  U.forEach((u,ui)=>u.lessons.forEach(l=>lessonRows.push({grp:(ui+1)+'. Ünite · '+u.title,title:l.title,n:v2.filter(x=>x.L.includes(l.id)).length})));
  TRACKS.forEach(t=>t.lessons.forEach(l=>lessonRows.push({grp:t.title,title:l.title,n:v2.filter(x=>x.C.includes(l.id)).length})));
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
    el.innerHTML=`<div class="card admgate">${anka('think',100,'gozluk')}<h1 class="ph1" style="margin:0">Yönetici paneli</h1><p class="muted">Kayıtlı öğrenci, aktif kullanıcı ve ders istatistiklerini görmek için yönetici şifresini girin.</p>
      <label for="admPin" style="font-weight:800">Şifre</label><input id="admPin" type="password" inputmode="numeric" autocomplete="off" maxlength="32">
      <button class="b3" type="button" id="admGo">Paneli aç</button><p class="tres bad" id="admErr" role="alert"></p></div>`;
    const go=()=>{const v=$('#admPin').value.trim();const ok=ADM.pinH?pinHash(v)===ADM.pinH:v===ADM_DEFAULT_PIN;
      if(ok){admOpen=true;try{sessionStorage.setItem('bk-yon-acik','1')}catch(e){}renderAdmin()}else{$('#admErr').textContent='Şifre yanlış.';sfx.bad()}};
    $('#admGo').onclick=go;$('#admPin').addEventListener('keydown',e=>{if(e.key==='Enter')go()});setTimeout(()=>{const p=$('#admPin');if(p)p.focus()},50);return;
  }
  const st=admStats(),empty=!st.tot;
  const tile=(v,l,icn,note)=>`<div class="card atile"><span>${ic(icn,22)}</span><b>${v}</b><small>${l}</small>${note?`<em>${note}</em>`:''}</div>`;
  const catMax=Math.max(1,...st.cats.map(c=>c.users));
  const groups=[...new Set(st.lessonRows.map(r=>r.grp))];
  const lmax=Math.max(1,...st.lessonRows.map(r=>r.n));
  const rows=st.us.filter(u=>!admQuery||(u.n||'').toLocaleLowerCase('tr').includes(admQuery)).sort((a,b)=>(st.since(a)??1e9)-(st.since(b)??1e9)||b.x-a.x);
  el.innerHTML=`<div class="admhead"><div><p class="eyebrow">YÖNETİCİ</p><h1 class="ph1" style="margin:4px 0">İstatistik paneli</h1><p class="sub" style="margin:0">${empty?'Henüz veri yok. Aşağıdan öğrenci kodu ya da öğretmenlerin sınıf dosyalarını ekleyin.':`${fmt(st.tot)} öğrencinin verisi · son güncelleme ${String(st.us.reduce((m,u)=>u.t>m?u.t:m,'')).split('-').reverse().join('.')}`}</p></div>
    <button class="b3 ghost sm" type="button" id="admLock">${ic('lock',16)} Kilitle</button></div>
  <div class="atiles">
    ${tile(fmt(st.tot),'Toplam kayıtlı kullanıcı','user')}
    ${tile(fmt(st.a7),'Aktif kullanıcı (son 7 gün)','bolt',st.tot?'%'+Math.round(st.a7/st.tot*100):'')}
    ${tile(fmt(st.a30),'Aktif kullanıcı (son 30 gün)','calendar',st.tot?'%'+Math.round(st.a30/st.tot*100):'')}
    ${tile(fmt(st.newJ),'Yeni kayıt (son 30 gün)','star')}
    ${tile(fmt(st.lessonsTot),'Tamamlanan ders','book')}
    ${tile(fmt(st.avgXP),'Ortalama XP','chart')}
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
  </div>
  <div class="card apanel"><div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><h3>Öğrenciler <small>${fmt(rows.length)} kişi</small></h3>
    <input id="admQ" type="search" placeholder="Ada göre ara" value="${esc(admQuery)}" style="max-width:240px"></div>
    <div class="tscroll" style="max-height:420px;margin-top:10px"><table class="dtable"><thead><tr><th>Ad</th><th>XP</th><th>Ders</th><th>Alan dersi</th><th>Deney görevi</th><th>Son etkinlik</th><th>Durum</th></tr></thead><tbody>
    ${rows.slice(0,300).map(u=>{const s=st.since(u);return `<tr><td><b>${esc(u.n||'(adsız)')}</b></td><td>${fmt(u.x)}</td><td>${u.l}</td><td>${u.v===2?u.c:'–'}</td><td>${u.e}</td><td>${u.a?u.a.split('-').reverse().join('.'):'–'}</td><td>${s==null?'Bilinmiyor':s<7?'<span class="pill-ok">Aktif</span>':s<30?'Son 30 gün':'Pasif'}</td></tr>`}).join('')||'<tr><td colspan="7" class="muted">Öğrenci yok.</td></tr>'}
    </tbody></table></div></div>
  <div class="agrid">
    <div class="card apanel"><h3>Veri ekle</h3>
      <p class="muted" style="font-size:.92rem">Öğrenci kodlarını (BK1 ya da BK2) yapıştırın ya da öğretmenlerin <b>sınıf dosyalarını</b> seçin. Aynı öğrenci tekrar eklenirse en yeni kodu kalır.</p>
      <textarea class="codes" id="admIn" rows="3" placeholder="BK2.eyJ2Ijoy..."></textarea>
      <div class="abtns"><button class="b3 sm" type="button" id="admAddBtn">Kodları ekle</button>
        <label class="b3 ghost sm" style="cursor:pointer">${ic('notebook',16)} Dosya seç<input id="admFile" type="file" accept=".json,.txt,.csv" multiple hidden></label>
        <button class="b3 ghost sm" type="button" id="admSelf">Bu cihazdaki öğrenci</button>
        <button class="b3 ghost sm" type="button" id="admSnf">Öğretmen tablosundakiler</button></div>
      <p class="muted" id="admMsg" role="status" style="font-size:.9rem;margin-top:8px"></p></div>
    <div class="card apanel"><h3>Yönetim</h3>
      <div class="abtns"><button class="b3 ghost sm" type="button" id="admCsv">${ic('save',16)} CSV indir</button><button class="b3 ghost sm" type="button" id="admBak">${ic('save',16)} Yedek indir</button><button class="b3 ghost sm" type="button" id="admClr">${ic('trash',16)} Verileri sil</button></div>
      <label for="admNew" style="display:block;font-weight:800;margin:14px 0 6px">Şifreyi değiştir</label>
      <div style="display:flex;gap:8px"><input id="admNew" type="password" autocomplete="new-password" placeholder="Yeni şifre (en az 4 karakter)" maxlength="32"><button class="b3 sm" type="button" id="admPinBtn">Kaydet</button></div>
      <p class="muted" style="font-size:.86rem;margin-top:12px">${ic('info',14)} Site sunucusuz çalışır. Bu paneldeki veriler yalnızca bu cihazda saklanır, hiçbir yere gönderilmez. Şifre meraklıları uzak tutar ama gerçek bir güvenlik sağlamaz.</p></div>
  </div>`;
  const msg=t=>{const m=$('#admMsg');if(m)m.textContent=t};
  const after=(r,bad)=>{renderAdmin();msg(`${r.ok} yeni öğrenci eklendi${r.newer?`, ${r.newer} öğrenci güncellendi`:''}${bad?`, ${bad} kod okunamadı`:''}.`)};
  $('#admLock').onclick=()=>{admOpen=false;try{sessionStorage.removeItem('bk-yon-acik')}catch(e){}renderAdmin()};
  $('#admQ').oninput=e=>{admQuery=e.target.value.trim().toLocaleLowerCase('tr');const p=e.target.selectionStart;renderAdmin();const q=$('#admQ');q.focus();try{q.setSelectionRange(p,p)}catch(_){}};
  $('#admAddBtn').onclick=()=>{const {out,bad}=admParseText($('#admIn').value);after(admAdd(out),bad)};
  $('#admFile').onchange=async e=>{let all=[],bad=0;for(const f of e.target.files){try{const r=admParseText(await f.text());all=all.concat(r.out);bad+=r.bad}catch(_){bad++}}after(admAdd(all),bad)};
  $('#admSelf').onclick=()=>{const o=decodeCode(progressCode());after(admAdd(o?[o]:[]),0)};
  $('#admSnf').onclick=()=>{after(admAdd(Object.values(SNF)),0)};
  $('#admCsv').onclick=()=>{const head='Ad;XP;Ders;Alan dersi;Deney görevi;Çizim;En uzun seri;Son etkinlik;Katılma;Kod tarihi';
    downloadFile('bilimkivilcimi-istatistik-'+dkey()+'.csv','﻿'+[head].concat(st.us.map(u=>[u.n,u.x,u.l,u.c,u.e,u.w,u.b,u.a,u.j,u.t].map(v=>String(v??'').replace(/;/g,',')).join(';'))).join('\n'),'text/csv')};
  $('#admBak').onclick=()=>downloadFile('bilimkivilcimi-yonetici-yedek-'+dkey()+'.json',JSON.stringify({tur:'bk-yonetici',tarih:dkey(),kullanicilar:Object.values(ADM.users)}),'application/json');
  $('#admClr').onclick=e=>{const b=e.currentTarget;if(!b.dataset.arm){b.dataset.arm=1;b.textContent='Emin misiniz? Tekrar basın';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.innerHTML=ic('trash',16)+' Verileri sil'}},4000);return}
    ADM.users={};admSave();renderAdmin();msg('Bütün öğrenci verileri silindi.')};
  $('#admPinBtn').onclick=()=>{const v=$('#admNew').value.trim();if(v.length<4){toast('Şifre en az 4 karakter olmalı.');return}ADM.pinH=pinHash(v);admSave();$('#admNew').value='';toast(ic('lock',18)+' Yönetici şifresi değişti')};
}

/* Grafik ipucu (fare ve dokunma) */
(function(){let tip=null;
  const show=(t,x,y)=>{if(!tip){tip=document.createElement('div');tip.className='atip';tip.setAttribute('role','tooltip');document.body.appendChild(tip)}
    tip.textContent=t;tip.style.display='block';const w=tip.offsetWidth;tip.style.left=Math.min(innerWidth-w-8,Math.max(8,x-w/2))+'px';tip.style.top=Math.max(8,y-44)+'px'};
  document.addEventListener('pointerover',e=>{const d=e.target.closest&&e.target.closest('[data-tip]');if(d)show(d.dataset.tip,e.clientX,e.clientY);else if(tip)tip.style.display='none'});
  document.addEventListener('pointermove',e=>{if(tip&&tip.style.display==='block'&&e.target.closest&&e.target.closest('[data-tip]'))show(tip.textContent,e.clientX,e.clientY)});
  addEventListener('scroll',()=>{if(tip)tip.style.display='none'},{passive:true});
})();
