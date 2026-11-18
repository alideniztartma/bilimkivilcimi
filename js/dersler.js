/* #BilimKıvılcımı · Ders listesini kurar. egitim.js ve temel ünite dosyalarından (temel-*.js) SONRA yüklenir.
   Üniteler U dizisine eklendikleri sırayla kalır (kupa ve ilerleme kayıtları ünite sırasına bağlı olduğu için),
   ama yolda gösterilme sırası "ord" alanına göre belirlenir. ord verilmeyen ünitenin ord'u kendi sırasıdır.
   Örnek: Mekanik'e en başa gelecek yeni bir temel ünite U.push({..., field:'mekanik', ord:5.1}) ile eklenir. */
'use strict';
const UORD=U.map((u,ui)=>({u,ui})).sort((a,b)=>((a.u.ord??a.ui)-(b.u.ord??b.ui))||(a.ui-b.ui));
const ALL_LESSONS=UORD.flatMap(({u})=>u.lessons.map(l=>Object.assign(l,{field:u.field})));
const EXBYID={};
U.forEach((u,ui)=>u.lessons.forEach(l=>l.ex.forEach((e,i)=>{e.id=l.id+'-'+i;e.ui=ui;EXBYID[e.id]=e})));
const UNIT_BADGE=U.map(u=>u.badge);
const fieldOf=id=>FIELDS.find(f=>f.id===id)||FIELDS[0];
const fieldUnits=fid=>UORD.filter(x=>x.u.field===fid);
const unitNo=ui=>fieldUnits(U[ui].field).findIndex(x=>x.ui===ui)+1;
const unitOrd=ui=>U[ui].ord??ui;
/* Temel ünite dosyalarından gelen sözlük terimleri (u.gloss: [[terim, açıklama, örnek?], ...]) */
U.forEach((u,ui)=>(u.gloss||[]).forEach(([t,d,c])=>GLOSS.push(c?{u:ui,t,d,c}:{u:ui,t,d})));
