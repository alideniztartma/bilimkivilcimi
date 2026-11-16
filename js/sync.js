/* #BilimKıvılcımı · Otomatik istatistik (Supabase)
   Öğrencinin ilerlemesi adı olmadan, rastgele bir kimlik ve cihazda saklanan gizli bir anahtarla gönderilir.
   İnternet yoksa sessizce bekler; bağlantı gelince gönderir. Profil > Ayarlar > Anonim istatistik ile kapatılabilir. */
'use strict';

const SB_URL='https://lqgfzlznarebrtvvryqb.supabase.co';
const SB_KEY='sb_publishable_qhskVF0RtrRH4f_Zv3ZyHQ_tunx6yq7';
let syncT=null,syncBusy=false;
function sbFetch(path,opt={},jwt){
  const h=Object.assign({apikey:SB_KEY,'Content-Type':'application/json'},opt.headers||{});
  if(jwt)h.Authorization='Bearer '+jwt;
  return fetch(SB_URL+path,Object.assign({},opt,{headers:h}));
}
function strHash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h.toString(36)}
function scheduleSync(delay){if(!S.share||!S.onb)return;clearTimeout(syncT);syncT=setTimeout(doSync,delay||4000)}
async function doSync(retry){
  if(syncBusy||!S.share||!S.onb||(typeof navigator!=='undefined'&&navigator.onLine===false))return;
  const p=progressObj();p.n='';const h=strHash(JSON.stringify(p));
  if(S.syncH===h)return;
  syncBusy=true;
  try{
    const r=await sbFetch('/rest/v1/rpc/bk_sync',{method:'POST',body:JSON.stringify({p_uid:S.uid,p_token:S.tok,p_data:p})});
    if(r.ok){const ok=await r.json();
      if(ok===true){S.syncH=h;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
      else if(!retry){S.uid=newUid();S.syncH='';try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}syncBusy=false;return doSync(true)}}
  }catch(e){/* çevrimdışı ya da sunucu uykuda: sonra tekrar denenir */}
  syncBusy=false;
}
addEventListener('online',()=>scheduleSync(1500));
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')scheduleSync(2000)});
scheduleSync(3000);
