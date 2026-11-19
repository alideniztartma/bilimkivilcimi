/* #BilimKıvılcımı · Ses motoru
   Bütün efektler Web Audio ile anında sentezlenir, dosya indirilmez.
   Zincir: ses kaynakları → (kuru + hafif yankı) → yumuşak sıkıştırıcı → hoparlör.
   Tasarım ilkeleri:
   - Her ses yumuşak açılır ve kapanır (tık sesi yok), kulağı yormaz.
   - Notalar aynı tonda (Do majör pentatonik): ardışık sesler birbiriyle uyumlu.
   - Doğru cevaplar seriye göre bir basamak yükselir (Duolingo'daki gibi).
   - Sık çalınan sesler (dokunma, tik) her seferinde biraz farklıdır; mekanik duyulmaz.
   - Anka gerçek bir kuş gibi cıvıldar.
   Genel adlar korunur: tone(seq,type,vol), sfx.*, AC (yuva radyosu da AC'yi kullanır). */
'use strict';

let AC=null;
const SE={out:null,dry:null,wet:null,noise:null,last:{},okN:0,okT:-1e9};

/* Ses kapalıysa hiçbir şey kurulmaz. Telefonlarda ilk dokunuşta bağlam uyandırılır. */
function seReady(){
  if(typeof S!=='undefined'&&S&&S.sound===false)return false;
  try{
    if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});
    if(AC.state==='suspended')AC.resume();
    if(!SE.out){
      const comp=AC.createDynamicsCompressor();
      comp.threshold.value=-16;comp.knee.value=12;comp.ratio.value=3.5;comp.attack.value=.003;comp.release.value=.18;
      const master=AC.createGain();master.gain.value=.9;
      /* Odaya hafif bir sıcaklık: yüksek tizleri yumuşatan raf filtresi */
      const shelf=AC.createBiquadFilter();shelf.type='highshelf';shelf.frequency.value=7000;shelf.gain.value=-4;
      master.connect(shelf);shelf.connect(comp);comp.connect(AC.destination);
      SE.dry=master;
      /* Yapay yankı: üstel sönen, iki kanalda farklı gürültü (geniş ama küçük bir oda) */
      const len=Math.floor(AC.sampleRate*1.1),ir=AC.createBuffer(2,len,AC.sampleRate);
      for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++){const x=i/len;d[i]=(Math.random()*2-1)*Math.pow(1-x,3.2)*(i<AC.sampleRate*.008?i/(AC.sampleRate*.008):1)}}
      const conv=AC.createConvolver();conv.buffer=ir;
      const pre=AC.createBiquadFilter();pre.type='lowpass';pre.frequency.value=4200;
      SE.wet=AC.createGain();SE.wet.gain.value=1;SE.wet.connect(pre);pre.connect(conv);
      const wetOut=AC.createGain();wetOut.gain.value=.22;conv.connect(wetOut);wetOut.connect(master);
      SE.out=master;
    }
    return true;
  }catch(e){return false}
}
['pointerdown','touchstart','keydown'].forEach(ev=>addEventListener(ev,()=>{if(AC&&AC.state==='suspended')AC.resume()},{passive:true,capture:true}));

/* Aynı sesi çok sık çalma (ör. art arda dokunma). ms içinde tekrar gelirse yok sayılır. */
function seGate(k,ms){const n=performance.now();if(SE.last[k]&&n-SE.last[k]<ms)return false;SE.last[k]=n;return true}
const seVary=(x,p)=>x*(1+(Math.random()*2-1)*p);

/* Çıkış: kuru ses + isteğe bağlı yankı payı + stereo konum */
function seBus(rev,pan){
  const g=AC.createGain();let node=g;
  if(pan&&AC.createStereoPanner){const p=AC.createStereoPanner();p.pan.value=Math.max(-1,Math.min(1,pan));g.connect(p);node=p}
  node.connect(SE.dry);
  if(rev){const s=AC.createGain();s.gain.value=rev;node.connect(s);s.connect(SE.wet)}
  return g;
}

/* Tek nota: osilatör + ADSR zarfı + isteğe bağlı perde kayması, titreşim, filtre */
function seNote(o){
  const t=o.t??AC.currentTime,a=o.a??.004,d=o.d??.2,vol=o.v??.2;
  const osc=AC.createOscillator(),g=AC.createGain();
  osc.type=o.type||'sine';osc.frequency.setValueAtTime(o.f,t);
  if(o.detune)osc.detune.value=o.detune;
  if(o.to)osc.frequency.exponentialRampToValueAtTime(o.to,t+(o.glide??d));
  if(o.vib){const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=o.vib[0];lg.gain.value=o.vib[1];l.connect(lg);lg.connect(osc.frequency);l.start(t);l.stop(t+a+d+.05)}
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+a);
  g.gain.exponentialRampToValueAtTime(Math.max(vol*(o.s??.0001),.0001),t+a+d);
  g.gain.linearRampToValueAtTime(0,t+a+d+.03);
  let src=g;
  if(o.lp){const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=o.lp;f.Q.value=o.q??.7;g.connect(f);src=f}
  osc.connect(g);src.connect(o.bus||seBus(o.rev,o.pan));
  osc.start(t);osc.stop(t+a+d+.06);
}
/* Çan: uyumsuz kısmi titreşimlerle gerçek metal çan tınısı */
function seBell(f,t,vol,d,bus){[[1,1],[2.01,.45],[3.0,.22],[4.2,.12],[5.43,.08]].forEach(([r,m],i)=>seNote({f:f*r,t,v:vol*m,d:d/(1+i*.6),a:.002,bus}))}
/* Gürültü patlaması: filtreli beyaz gürültü (hışırtı, sıçrama, darbe) */
function seNoise(o){
  if(!SE.noise){const b=AC.createBuffer(1,AC.sampleRate,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;SE.noise=b}
  const t=o.t??AC.currentTime,dur=o.d??.2;
  const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();
  s.buffer=SE.noise;s.loop=true;f.type=o.ft||'bandpass';f.Q.value=o.q??1;
  f.frequency.setValueAtTime(o.f,t);if(o.to)f.frequency.exponentialRampToValueAtTime(o.to,t+dur);
  const a=o.a??.004;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(o.v??.2,t+a);
  if(o.swell){g.gain.linearRampToValueAtTime((o.v??.2),t+dur*o.swell)}
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  s.connect(f);f.connect(g);g.connect(o.bus||seBus(o.rev,o.pan));
  s.start(t,Math.random()*.5);s.stop(t+dur+.05);
}

/* Do majör pentatonik: her şey aynı tonda kalır */
const PENTA=[0,2,4,7,9];
const seMidi=m=>440*Math.pow(2,(m-69)/12);
const seScale=i=>seMidi(72+12*Math.floor(i/5)+PENTA[((i%5)+5)%5]);

/* Eski genel çağrı: tone([[frekans,süre],...],dalga,ses). Artık zarflı ve yankılı çalar. */
function tone(seq,type='sine',vol=.12){if(!seReady())return;
  let t=AC.currentTime+.005;const bus=seBus(.12);
  seq.forEach(([f,d])=>{seNote({f,t,d,type,v:Math.min(vol*1.4,.3),a:.005,lp:type==='square'||type==='sawtooth'?3200:0,bus});t+=d*.8});
}

const sfx={
  /* Doğru: iki notalı parlak çan. Seri sürdükçe ton bir basamak yükselir (en fazla 6 basamak). */
  ok(){if(!seReady())return;const n=performance.now();SE.okN=n-SE.okT<20000?Math.min(SE.okN+1,6):0;SE.okT=n;
    const t=AC.currentTime+.005,bus=seBus(.25),k=SE.okN;
    seBell(seScale(2+k),t,.16,.35,bus);seBell(seScale(5+k),t+.085,.18,.55,bus);
    seNote({f:seScale(5+k)*2,t:t+.085,v:.03,d:.4,type:'triangle',bus})},
  /* Yanlış: kırıcı olmayan, yumuşak "bonk": inen iki boğuk nota */
  bad(){if(!seReady())return;SE.okN=0;SE.okT=-1e9;const t=AC.currentTime+.005,bus=seBus(.1);
    seNote({f:seMidi(55),to:seMidi(54),t,v:.22,d:.16,type:'triangle',lp:900,bus});
    seNote({f:seMidi(50),to:seMidi(48),t:t+.13,v:.24,d:.32,type:'triangle',lp:700,vib:[7,6],bus});
    seNote({f:seMidi(38),t:t+.13,v:.12,d:.25,bus})},
  /* Dokunma: tahta tuş gibi kısa, her seferinde hafif farklı */
  tap(){if(!seGate('tap',45)||!seReady())return;const t=AC.currentTime,bus=seBus(.04);
    seNote({f:seVary(1350,.05),to:seVary(900,.05),t,v:.07,d:.035,a:.001,type:'triangle',bus});
    seNoise({f:seVary(3800,.1),q:2.5,t,v:.035,d:.025,a:.001,bus})},
  /* Kazanma: majör arpej + akor yatağı + ışıltı yağmuru */
  win(){if(!seReady())return;const t=AC.currentTime+.01;
    const arp=[60,64,67,72,76,79,84];
    arp.forEach((m,i)=>{const bus=seBus(.3,(i-3)*.12);seNote({f:seMidi(m),t:t+i*.07,v:.13,d:.45,type:'triangle',bus});seNote({f:seMidi(m),t:t+i*.07,v:.05,d:.3,detune:7,type:'sawtooth',lp:2400,bus})});
    const pad=seBus(.45);[60,64,67,72].forEach(m=>{seNote({f:seMidi(m),t:t+.42,a:.05,v:.06,d:1.2,type:'triangle',bus:pad});seNote({f:seMidi(m),t:t+.42,a:.08,v:.025,d:1.1,detune:-8,type:'sawtooth',lp:1800,bus:pad})});
    seNote({f:seMidi(36),t:t+.42,a:.01,v:.16,d:.7,bus:pad});
    for(let i=0;i<9;i++)seBell(seMidi(96+PENTA[i%5]),t+.5+i*.055+Math.random()*.02,.035,.25,seBus(.5,Math.random()*1.6-.8))},
  /* Mozaik taşı: iki notalı çan + küçük şıngırtı */
  coin(){if(!seGate('coin',60)||!seReady())return;const t=AC.currentTime+.005,bus=seBus(.3);
    seBell(seMidi(88),t,.09,.18,bus);seBell(seMidi(95),t+.07,.11,.45,bus);
    seNoise({f:9000,q:3,t:t+.07,v:.02,d:.08,bus})},
  /* Tik: saat çarkı gibi kuru, ince */
  tick(){if(!seGate('tick',30)||!seReady())return;const t=AC.currentTime,bus=seBus(.05);
    seNoise({f:seVary(5200,.08),q:6,t,v:.08,d:.018,a:.0008,bus});
    seNote({f:seVary(2100,.04),t,v:.04,d:.02,a:.0008,type:'triangle',bus})},
  /* Anka cıvıltısı: perdesi kayan, titreşimli 2-3 kısa kuş sesi */
  chirp(){if(!seGate('chirp',120)||!seReady())return;let t=AC.currentTime+.005;const n=2+(Math.random()*2|0),bus=seBus(.2,.15);
    for(let i=0;i<n;i++){const base=seVary(2300+i*180,.08),d=seVary(.075,.2);
      seNote({f:base*.7,to:base*1.35,glide:d*.6,t,v:.15,d,a:.006,vib:[seVary(38,.15),120],bus});
      t+=d+seVary(.035,.3)}},
  /* Rüzgâr: süzgeci tize doğru süpüren hışırtı */
  whoosh(){if(!seGate('whoosh',80)||!seReady())return;const t=AC.currentTime;
    seNoise({f:350,to:3200,q:1.6,t,v:.34,d:.32,a:.06,swell:.45,rev:.15,pan:-.2});
    seNoise({f:600,to:5000,q:2.5,t:t+.03,v:.11,d:.28,a:.06,pan:.25})},
  /* Su: ağır sıçrama + yükselen kabarcıklar */
  splash(){if(!seGate('splash',90)||!seReady())return;const t=AC.currentTime,bus=seBus(.25);
    seNoise({f:2600,to:380,ft:'lowpass',q:.8,t,v:.24,d:.38,a:.003,bus});
    seNote({f:160,to:70,t,v:.18,d:.14,bus});
    for(let i=0;i<5;i++){const f=seVary(500+i*170,.25);seNote({f,to:f*1.9,glide:.05,t:t+.08+i*.045+Math.random()*.03,v:.05,d:.055,a:.002,bus:seBus(.3,Math.random()*1.2-.6)})}},
  /* Darbe: tok, ağır; perdesi hızla düşen alt ses + tahta tıkırtısı */
  thud(){if(!seGate('thud',50)||!seReady())return;const t=AC.currentTime,bus=seBus(.18);
    seNote({f:seVary(150,.06),to:42,glide:.16,t,v:.29,d:.24,a:.002,bus});
    seNoise({f:900,to:200,ft:'lowpass',q:1,t,v:.2,d:.12,a:.001,bus});
    seNoise({f:seVary(2400,.1),q:4,t,v:.05,d:.03,a:.001,bus})}
};
