/* #BilimKıvılcımı · İkonlar (2px çizgi, kare uçlu: mozaik taşı hissi) ve küçük yardımcılar */
'use strict';

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,80):ms));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pick=a=>a[Math.random()*a.length|0];
const strip=h=>String(h).replace(/<[^>]+>/g,'');
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const trn=(n,d=2)=>Number(n).toFixed(d).replace('.',',');

const IS={
 home:'<path d="M3 11 12 4l9 7M5 10v10h5v-6h4v6h5V10"/>',
 camera:'<path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13.5" r="3.5"/>',
 share:'<path d="M12 3v12M7 8l5-5 5 5M5 13v8h14v-8"/>',
 download:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
 ball:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
 bag:'<path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9"/>',
 tools:'<path d="M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9M4 4l5 5M3 8l5-5"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',
 book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 0 2 2h13M9 8h6"/>',
 check:'<path d="m5 12 5 5 9-10"/>',
 lock:'<rect x="5" y="11" width="14" height="10"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 chest:'<rect x="3" y="10" width="18" height="10"/><path d="M3 14h18M4 10c0-3.5 2.5-6 8-6s8 2.5 8 6"/><rect x="10.5" y="12.5" width="3" height="4"/>',
 trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4.5a3 3 0 0 0 3.5 4M16 6h3.5a3 3 0 0 1-3.5 4M12 13v4M8 21h8M9.5 17h5v4h-5z"/>',
 snow:'<path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10M9 4l3 2 3-2M9 20l3-2 3 2"/>',
 vol:'<path d="M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 bolt:'<path d="M13 2 5 13h6l-1 9 8-11h-6z"/>',
 robot:'<rect x="5" y="8" width="14" height="11"/><path d="M12 8V4M9 13h.01M15 13h.01M9 16h6"/>',
 loop:'<path d="M17 3l3 3-3 3M4 11V9a3 3 0 0 1 3-3h13M7 21l-3-3 3-3M20 13v2a3 3 0 0 1-3 3H4"/>',
 code:'<path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14"/>',
 box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10"/>',
 split:'<path d="M12 21v-7M12 14 6 8M12 14l6-6M4 4h4v4M16 4h4v4"/>',
 bug:'<rect x="7" y="7" width="10" height="13" rx="5"/><path d="M12 7v13M7 12H3M21 12h-4M7 17l-3 2M17 17l3 2M8 7 6 4M16 7l2-3"/>',
 target2:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
 arrowU:'<path d="M12 19V5M6 11l6-6 6 6"/>',
 rotL:'<path d="M9 14 4 9l5-5M4 9h9a6 6 0 0 1 0 12h-2"/>',
 rotR:'<path d="m15 14 5-5-5-5M20 9h-9a6 6 0 0 0 0 12h2"/>',
 star:'<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5l-5.3 2.9 1.2-6-4.5-4.1 6-.7z"/>',
 pen:'<path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3"/>',
 penOff:'<path d="M4 20l4-1 11-11-3-3L5 16zM3 3l18 18"/>',
 play:'<path d="M7 4v16l13-8z"/>',
 pause:'<path d="M7 4v16M17 4v16"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
 puzzle:'<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/>',
 cert:'<rect x="3" y="4" width="18" height="12"/><path d="M7 8h10M7 11h6M14 16l-1 5 3-2 3 2-1-5"/>',
 copy:'<rect x="8" y="8" width="12" height="12"/><path d="M16 8V4H4v12h4"/>',
 printer:'<path d="M7 8V3h10v5M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>',
 timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
 pendulum:'<path d="M5 3h14M12 3l4.5 12"/><circle cx="17.3" cy="17.5" r="3"/>',
 lever:'<path d="M3 15 21 9"/><path d="M12 12.5 9 20h6z"/>',
 bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
 pie:'<circle cx="12" cy="12" r="9"/><path d="M12 3v9H3"/>',
 catapult:'<path d="M3 20h18M6 20l3-7h6l3 7M9 13l9-8"/><circle cx="19" cy="4" r="2"/>',
 drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/><path d="M9 15a3 3 0 0 0 3 3"/>',
 moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
 mirror:'<path d="M3 21 21 3"/><path d="M3 10h6l3 3M12 13l7 7"/>',
 notebook:'<rect x="5" y="3" width="14" height="18"/><path d="M9 3v18M12 8h4M12 12h4M12 16h3"/>',
 reset:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>',
 slow:'<path d="M4 12h3l3-6 4 12 3-6h3"/>',
 save:'<path d="M5 3h11l3 3v15H5zM8 3v5h7V3M8 21v-7h8v7"/>',
 chart:'<path d="M4 20V4M4 20h16M8 15l4-5 3 3 5-7"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.5"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="7"/>',
 chip:'<rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z"/>',
 offline:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1.2"/><path d="m3 3 18 18"/>',
 school:'<path d="m3 10 9-6 9 6M5 10v9h14v-9M10 19v-5h4v5"/>',
 heartO:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
 calendar:'<path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/>',
 send:'<path d="M3 11 21 3l-8 18-2-8z"/>',
 traffic:'<rect x="8" y="2" width="8" height="20"/><circle cx="12" cy="7" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="17" r="1.5"/>',
 snake:'<path d="M4 18c4 0 4-4 8-4s4 4 8 4M4 12c4 0 4-4 8-4s4 4 8 4"/><path d="M19 5l2 1-2 1"/>'
};
const IF={
 flame:'<path d="M12 1.5c1.4 3.8 6.5 6.6 6.5 12.3a6.5 6.5 0 0 1-13 0c0-2.8 1.3-4.6 2.8-6.1.2 1.9 1.1 3.2 2.4 3.7-.3-3.9.1-7 1.3-9.9z"/><path d="M12 12.5c.8 1.8 3 2.7 3 5a3 3 0 0 1-6 0c0-1.3.7-2 1.3-2.7.2.8.6 1.2 1.1 1.4-.1-1.4.1-2.6.6-3.7z" fill="#F4D58D"/>',
 gem:'<rect x="5" y="5" width="14" height="14" rx="1.5" transform="rotate(45 12 12)"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12z" fill="rgba(255,255,255,.28)"/>',
 heart:'<path d="M12 21s-8.5-5.3-8.5-11.4A4.9 4.9 0 0 1 12 6.7a4.9 4.9 0 0 1 8.5 2.9C20.5 15.7 12 21 12 21z"/>',
 star:'<path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6-4.9-4.5 6.6-.8z"/>',
 bolt:'<path d="M13.5 1.5 4.5 13.5h6.5l-1.5 9 9-12.5h-6.5z"/>',
 inf:'<path d="M7 8a4 4 0 1 0 0 8c3 0 7-8 10-8a4 4 0 1 1 0 8c-3 0-7-8-10-8z" fill="none" stroke="currentColor" stroke-width="2.6"/>'
};
const ic=(n,s=24)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">${IS[n]||''}</svg>`;
const fi=(n,s=24)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${IF[n]||''}</svg>`;
function band(n=26,seed=1){let h='',x=seed*9301;const C=['var(--sand)','var(--sand)','var(--ember)','var(--terra)','var(--sand)','var(--olive)'];
  for(let i=0;i<n;i++){x=(x*9301+49297)%233280;h+=`<i style="background:${C[x%C.length]}"></i>`}return `<div class="band" aria-hidden="true">${h}</div>`}
function botSVG(){return `<svg viewBox="0 0 40 40" width="100%" height="100%"><path d="M20 2 L26 9 H14 Z" fill="#D9822B"/><rect x="6" y="9" width="28" height="26" rx="4" fill="#A3461F"/><rect x="10" y="14" width="20" height="10" rx="2" fill="#FBF6EA"/><circle cx="16" cy="19" r="2.6" fill="#2F2E24"/><circle cx="24" cy="19" r="2.6" fill="#2F2E24"/><rect x="3" y="14" width="4" height="14" rx="1" fill="#2F3A28"/><rect x="33" y="14" width="4" height="14" rx="1" fill="#2F3A28"/></svg>`}

/* Kod renklendirme */
const KW=['print','for','in','range','if','else','Tekrarla','tekrarla','kez','Eğer','Değilse','Sürekli'];
const HLRE=new RegExp(`(#[^\\n]*)|("[^"\\n]*"?)|(?<![\\p{L}\\d_])(\\d+)(?![\\p{L}\\d_])|(?<![\\p{L}\\d_])(${KW.join('|')})(?![\\p{L}\\d_])`,'gu');
function hl(code){let out='',last=0;code.replace(HLRE,(m,c,s,n,k,i)=>{out+=esc(code.slice(last,i));
  out+=c?`<i class="cm">${esc(c)}</i>`:s?`<i class="st">${esc(s)}</i>`:n?`<i class="nu">${n}</i>`:`<i class="kw">${k}</i>`;last=i+m.length;return m});
  return out+esc(code.slice(last))}
