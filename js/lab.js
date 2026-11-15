/* #BilimKıvılcımı · Laboratuvar: 8 adet 3 boyutlu deney, görevler, ölçüm defteri ve grafikler */
'use strict';

/* ================= 3D YARDIMCILARI ================= */
const HX={floor:0x3e4d33,slab:0x26301f,cream:0xf4ead6,terra:0xa3461f,terraL:0xc4602f,ember:0xd9822b,olive:0x6b7f50,oliveD:0x2f3a28,rust:0x6f3420,stone:0xb8a27a,garnet:0x8e2b22,ink:0x2f2e24,sand:0xdcc190,steel:0xc9cfd4,tile:0x55633f,tile2:0x5e6d47};
const mat3=(c,o)=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.6,metalness:.05},o));
const sh3=m=>{m.castShadow=true;m.receiveShadow=true;return m};
const box3=(w,h,d,c,o)=>sh3(new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat3(c,o)));
const cyl3=(rt,rb,h,c,seg,o)=>sh3(new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg||28),mat3(c,o)));
const sph3=(r,c,o)=>sh3(new THREE.Mesh(new THREE.SphereGeometry(r,28,20),mat3(c,o)));
let GLOWT=null;
function glowTex(){if(GLOWT)return GLOWT;const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);
  g.addColorStop(0,'rgba(255,214,120,1)');g.addColorStop(.35,'rgba(240,160,75,.45)');g.addColorStop(1,'rgba(240,160,75,0)');x.fillStyle=g;x.fillRect(0,0,128,128);GLOWT=new THREE.CanvasTexture(c);return GLOWT}
function glow(size,opacity=.8){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex(),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity}));s.scale.setScalar(size);s.userData.keepMap=true;return s}
function label3(text,color,scale){const c=document.createElement('canvas'),F='800 50px Manrope,"Segoe UI",system-ui,sans-serif';let x=c.getContext('2d');x.font=F;
  const W=Math.max(200,Math.ceil(x.measureText(text).width)+44);c.width=W;c.height=96;x=c.getContext('2d');
  x.font=F;x.textAlign='center';x.textBaseline='middle';x.lineJoin='round';
  x.lineWidth=10;x.strokeStyle='rgba(20,26,17,.85)';x.strokeText(text,W/2,50);x.fillStyle=color||'#F4EAD6';x.fillText(text,W/2,50);
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));
  const k=scale||1;s.scale.set(.6*k*W/96,.6*k,1);s.renderOrder=5;return s}
function disposeObj(o){o.traverse(n=>{if(n.geometry)n.geometry.dispose();if(n.material){const ms=Array.isArray(n.material)?n.material:[n.material];ms.forEach(m=>{if(m.map&&!n.userData.keepMap)m.map.dispose();m.dispose()})}})}
function clearG(g){while(g.children.length){const o=g.children[0];g.remove(o);disposeObj(o)}}
function canvasTex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);return t}

function makeStage(canvas,o){
  const T=THREE;
  const r=new T.WebGLRenderer({canvas,antialias:true,alpha:true});
  r.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  r.shadowMap.enabled=o.shadows!==false;r.shadowMap.type=T.PCFSoftShadowMap;
  const scene=new T.Scene(),cam=new T.PerspectiveCamera(o.fov||38,1.5,.1,500);
  const hemi=new T.HemisphereLight(0xfff4e0,0x2a3320,o.amb==null?.95:o.amb);scene.add(hemi);
  let sun=null;
  if(o.sun!==false){sun=new T.DirectionalLight(0xffffff,.85);sun.position.set(o.target[0]+5,14,o.target[2]+8);sun.target.position.set(o.target[0],0,o.target[2]);
    sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);const sc=sun.shadow.camera,SZ=o.shadowSize||10;sc.left=-SZ;sc.right=SZ;sc.top=SZ;sc.bottom=-SZ;sc.far=90;sun.shadow.bias=-.0005;scene.add(sun);scene.add(sun.target)}
  if(o.floor){const f=new T.Mesh(new T.CylinderGeometry(o.floor,o.floor*1.03,.3,64),mat3(HX.floor,{roughness:.9}));f.position.set(o.target[0],-.15,o.target[2]);f.receiveShadow=true;scene.add(f)}
  const home={az:o.az,el:o.el,dist:o.dist,target:o.target.slice()};
  const st={r,scene,cam,sun,hemi,az:o.az,el:o.el,dist:o.dist,target:new T.Vector3(...o.target),grab:null,w:0,h:0};
  const rc=new T.Raycaster(),v2=new T.Vector2();
  st.ray=e=>{const b=canvas.getBoundingClientRect();v2.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);rc.setFromCamera(v2,cam);return rc};
  st.render=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;
    if(w!==st.w||h!==st.h){st.w=w;st.h=h;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
    const d=st.dist*Math.max(1,1.4/cam.aspect),ce=Math.cos(st.el);
    cam.position.set(st.target.x+d*ce*Math.sin(st.az),st.target.y+d*Math.sin(st.el),st.target.z+d*ce*Math.cos(st.az));cam.lookAt(st.target);r.render(scene,cam)};
  st.reset=()=>{st.az=home.az;st.el=home.el;st.dist=home.dist;st.target.set(...home.target)};
  st.zoom=f=>{st.dist=clamp(st.dist*f,home.dist*.45,home.dist*1.7)};
  let drag=null;const lim=o.azLim||1.2;
  const down=e=>{try{canvas.setPointerCapture(e.pointerId)}catch(_){ }if(st.grab&&st.grab(e,'down'))drag='obj';else drag={x:e.clientX,y:e.clientY}};
  const move=e=>{if(!drag){if(st.hover)st.hover(e);return}if(drag==='obj'){st.grab(e,'move');return}
    st.az=clamp(st.az-(e.clientX-drag.x)*.008,home.az-lim,home.az+lim);st.el=clamp(st.el+(e.clientY-drag.y)*.006,o.elMin||.04,o.elMax||1.45);drag={x:e.clientX,y:e.clientY}};
  const up=e=>{if(drag==='obj')st.grab(e,'up');drag=null};
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
  st.dispose=()=>{canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);
    disposeObj(scene);r.dispose();try{r.forceContextLoss()}catch(_){ }};
  return st;
}
function segBind(el,opts,get,set){const draw=()=>{el.innerHTML=opts.map(o=>`<button type="button" data-v="${o[0]}" aria-pressed="${String(get())===String(o[0])}">${o[1]}</button>`).join('')};
  el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;set(b.dataset.v);draw();sfx.tap()});draw();return draw}

/* ================= DENEY 1: SARKAÇ ================= */
function mkSarkac(c){
  const P={L:.6,m:2,g:9.81,gn:'dunya',th:.6,om:0,drag:false,last:null,Tm:null,t:0,trail:false},PY=2.6;
  const GS={dunya:[9.81,'Dünya'],ay:[1.62,'Ay'],mars:[3.71,'Mars'],jupiter:[24.79,'Jüpiter']};
  c.ctl.innerHTML=`<div class="ctl"><label for="pL">İpin uzunluğu <output id="pLo"></output></label><input type="range" id="pL" min="0.1" max="2" step="0.01" value="0.6"></div>
    <div class="ctl"><label for="pM">Topun kütlesi <output id="pMo"></output></label><input type="range" id="pM" min="1" max="5" step="1" value="2"></div>
    <div class="ctl"><span class="lab">Deney nerede yapılıyor?</span><div class="seg" id="pG"></div></div>
    <div class="ctl"><span class="lab">Topun izi</span><div class="seg" id="pTr"></div></div>`;
  const Tf=()=>2*Math.PI*Math.sqrt(P.L/P.g);
  const ui=()=>{P.L=+$('#pL').value;P.m=+$('#pM').value;$('#pLo').textContent=trn(P.L)+' m';$('#pMo').textContent=P.m+' kg';P.last=null;P.Tm=null;trailN=0};
  $('#pL').oninput=ui;$('#pM').oninput=ui;
  segBind($('#pG'),Object.keys(GS).map(k=>[k,GS[k][1]]),()=>P.gn,v=>{P.gn=v;P.g=GS[v][0];ui()});
  segBind($('#pTr'),[['0','Kapalı'],['1','Açık']],()=>P.trail?'1':'0',v=>{P.trail=v==='1';trailN=0});
  const st=c.st,T=THREE;
  const base=box3(1.6,.12,.9,HX.stone);base.position.set(0,.06,-.9);st.scene.add(base);
  const post=cyl3(.07,.09,2.75,HX.stone);post.position.set(0,1.42,-.9);st.scene.add(post);
  const arm=box3(.12,.12,1.05,HX.stone);arm.position.set(0,PY+.08,-.42);st.scene.add(arm);
  const pin=sph3(.07,HX.ember);pin.position.set(0,PY,0);st.scene.add(pin);
  const pArm=new T.Group();pArm.position.set(0,PY,0);st.scene.add(pArm);
  const str=cyl3(.012,.012,1,HX.cream,8);pArm.add(str);
  const bob=sph3(1,HX.terra,{roughness:.3,metalness:.25});pArm.add(bob);
  for(let a=-3;a<=3;a++){const tk=box3(.04,.02,.16,HX.cream);const ang=a*.4;tk.position.set(Math.sin(ang)*2.2,.01,0);tk.rotation.y=-ang;st.scene.add(tk)}
  const TN=160,tpos=new Float32Array(TN*3);let trailN=0,trailI=0;
  const tg=new T.BufferGeometry();tg.setAttribute('position',new T.BufferAttribute(tpos,3));
  const trailPts=new T.Points(tg,new T.PointsMaterial({color:HX.ember,size:.06}));st.scene.add(trailPts);
  const plane=new T.Plane(new T.Vector3(0,0,1),0),hit=new T.Vector3();
  const R=()=>.1+P.m*.03;
  st.grab=(e,ph)=>{if(ph==='up'){P.drag=false;return true}
    if(!st.ray(e).ray.intersectPlane(plane,hit))return false;
    if(ph==='down'){const bx=Math.sin(P.th)*P.L,by=PY-Math.cos(P.th)*P.L;if(Math.hypot(hit.x-bx,hit.y-by)>R()+.45)return false;P.drag=true}
    P.th=clamp(Math.atan2(hit.x,Math.max(.05,PY-hit.y)),-1.35,1.35);P.om=0;P.last=null;return true};
  ui();
  return{state:P,T:Tf,
    frame(dt){
      if(!P.drag){const n=8,h=dt/n;for(let i=0;i<n;i++){const prev=P.th;P.om+=(-(P.g/P.L)*Math.sin(P.th)-.03*P.om)*h;P.th+=P.om*h;P.t+=h;
        if(prev<0&&P.th>=0){if(P.last!==null)P.Tm=P.t-P.last;P.last=P.t}}}
      pArm.rotation.z=P.th;str.scale.y=P.L;str.position.y=-P.L/2;bob.position.y=-P.L;bob.scale.setScalar(R());
      if(P.trail){const bx=Math.sin(P.th)*P.L,by=PY-Math.cos(P.th)*P.L;tpos[trailI*3]=bx;tpos[trailI*3+1]=by;tpos[trailI*3+2]=0;trailI=(trailI+1)%TN;trailN=Math.min(TN,trailN+1);tg.attributes.position.needsUpdate=true}
      tg.setDrawRange(0,P.trail?trailN:0);
    },
    read:()=>[['Formüle göre süre',trn(Tf())+' sn'],['Ölçülen süre',P.Tm?trn(P.Tm)+' sn':Math.abs(P.th)<.02&&Math.abs(P.om)<.02?'topu çekip bırak':'ölçülüyor…'],['Açı',Math.round(Math.abs(P.th)*180/Math.PI)+'°'],['Yer çekimi',trn(P.g)+' m/s²']],
    rec:()=>({c:{'İp':trn(P.L)+' m','Kütle':P.m+' kg','Yer':GS[P.gn][1],'Süre':trn(P.Tm||Tf())+' sn'},x:P.L,y:P.Tm||Tf()})
  };
}

/* ================= DENEY 2: KALDIRAÇ ================= */
function mkKaldirac(c){
  const K={mL:4,dL:3,mR:3,dR:2,phi:0};
  c.ctl.innerHTML=`<h4 style="margin:0 0 8px;color:var(--terra)">Sol yük</h4>
    <div class="ctl"><label for="kmL">Kütlesi <output id="kmLo"></output></label><input type="range" id="kmL" min="1" max="10" step="1" value="4"></div>
    <div class="ctl"><label for="kdL">Ortaya uzaklığı <output id="kdLo"></output></label><input type="range" id="kdL" min="1" max="5" step="1" value="3"></div>
    <h4 style="margin:14px 0 8px;color:var(--olive)">Sağ yük</h4>
    <div class="ctl"><label for="kmR">Kütlesi <output id="kmRo"></output></label><input type="range" id="kmR" min="1" max="10" step="1" value="3"></div>
    <div class="ctl"><label for="kdR">Ortaya uzaklığı <output id="kdRo"></output></label><input type="range" id="kdR" min="1" max="5" step="1" value="2"></div>`;
  const ui=()=>{K.mL=+$('#kmL').value;K.dL=+$('#kdL').value;K.mR=+$('#kmR').value;K.dR=+$('#kdR').value;
    $('#kmLo').textContent=K.mL+' kg';$('#kmRo').textContent=K.mR+' kg';$('#kdLo').textContent=K.dL+'. çizgi';$('#kdRo').textContent=K.dR+'. çizgi';sig=''};
  ['kmL','kdL','kmR','kdR'].forEach(i=>$('#'+i).oninput=ui);
  const st=c.st,T=THREE,FH=1.35;
  const tri=new T.Shape();tri.moveTo(-.8,0);tri.lineTo(.8,0);tri.lineTo(0,FH);tri.closePath();
  const ful=new T.Mesh(new T.ExtrudeGeometry(tri,{depth:1.1,bevelEnabled:false}),mat3(HX.ember));ful.position.z=-.55;ful.castShadow=true;st.scene.add(ful);
  const beam=new T.Group();beam.position.y=FH;st.scene.add(beam);
  const plank=box3(11.2,.16,1,HX.cream);plank.position.y=.08;beam.add(plank);
  for(let i=1;i<=5;i++)[-1,1].forEach(s=>{const tk=box3(.05,.17,1.02,HX.ink);tk.position.set(s*i,.08,0);beam.add(tk);const l=label3(String(i),'#DCC190',.55);l.position.set(s*i,-.3,.62);beam.add(l)});
  const wL=box3(1,1,1,HX.terra,{roughness:.4}),wR=box3(1,1,1,HX.olive,{roughness:.4});beam.add(wL);beam.add(wR);
  /* kütle × uzaklık sütunları */
  const CZ=-3.4,colL=box3(.9,1,.9,HX.terra,{roughness:.5}),colR=box3(.9,1,.9,HX.olive,{roughness:.5});colL.position.set(-1.2,0,CZ);colR.position.set(1.2,0,CZ);st.scene.add(colL);st.scene.add(colR);
  const cap=label3('kütle × uzaklık','#DCC190',.8);st.scene.add(cap);
  let lL,lR,tL,tR,sig='';
  const relabel=()=>{[lL,lR,tL,tR].forEach(l=>{if(l){l.parent.remove(l);disposeObj(l)}});
    lL=label3(K.mL+' kg','#F1B48F',.75);lR=label3(K.mR+' kg','#C9D6A8',.75);beam.add(lL);beam.add(lR);
    tL=label3(String(K.mL*K.dL),'#F1B48F',1);tR=label3(String(K.mR*K.dR),'#C9D6A8',1);st.scene.add(tL);st.scene.add(tR)};
  ui();
  return{state:K,
    frame(dt){
      if(sig!==K.mL+'|'+K.mR+'|'+K.dL+'|'+K.dR){sig=K.mL+'|'+K.mR+'|'+K.dL+'|'+K.dR;relabel()}
      const sL=.5+K.mL*.085,sR=.5+K.mR*.085,e=reduce?1:Math.min(1,dt*10);
      wL.scale.setScalar(sL);wR.scale.setScalar(sR);
      wL.position.x+=(-K.dL-wL.position.x)*e;wR.position.x+=(K.dR-wR.position.x)*e;wL.position.y=.16+sL/2;wR.position.y=.16+sR/2;
      lL.position.set(wL.position.x,.16+sL+.4,0);lR.position.set(wR.position.x,.16+sR+.4,0);
      const hl=K.mL*K.dL*.09,hr=K.mR*K.dR*.09;colL.scale.y+=(hl-colL.scale.y)*e;colR.scale.y+=(hr-colR.scale.y)*e;colL.position.y=colL.scale.y/2;colR.position.y=colR.scale.y/2;
      tL.position.set(-1.2,colL.scale.y+.5,CZ);tR.position.set(1.2,colR.scale.y+.5,CZ);cap.position.set(0,Math.max(colL.scale.y,colR.scale.y)+1.25,CZ);
      const tq=K.mR*K.dR-K.mL*K.dL,target=tq===0?0:Math.sign(tq)*Math.min(.22,.06+Math.abs(tq)*.008);
      K.phi+=(target-K.phi)*(reduce?1:Math.min(1,dt*4));beam.rotation.z=-K.phi},
    read:()=>{const a=K.mL*K.dL,b=K.mR*K.dR;return[['Sol: kütle × uzaklık',K.mL+' × '+K.dL+' = '+a],['Sağ: kütle × uzaklık',K.mR+' × '+K.dR+' = '+b],['Durum',a===b?'Dengede':a>b?'Sol ağır basıyor':'Sağ ağır basıyor']]},
    rec:()=>{const a=K.mL*K.dL,b=K.mR*K.dR;return{c:{'Sol':K.mL+' kg × '+K.dL,'Sağ':K.mR+' kg × '+K.dR,'Sonuç':a===b?'Denge':a>b?'Sol ağır':'Sağ ağır'}}}
  };
}

/* ================= DENEY 3: ELEKTRİK DEVRESİ ================= */
function mkDevre(c){
  const CS={n:1,b:1,par:false,on:true,rm:false};
  c.ctl.innerHTML=`<div class="ctl"><span class="lab">Anahtar <small class="muted">(sahnedeki anahtara da dokunabilirsin)</small></span><div class="seg" id="cSw"></div></div>
    <div class="ctl"><span class="lab">Pil sayısı</span><div class="seg" id="cN"></div></div>
    <div class="ctl"><span class="lab">Lamba sayısı</span><div class="seg" id="cB"></div></div>
    <div class="ctl"><span class="lab">Bağlama şekli</span><div class="seg" id="cM"></div></div>
    <div class="ctl"><span class="lab">İlk lamba</span><div class="seg" id="cR"></div></div>`;
  const st=c.st,T=THREE;let G=new T.Group(),paths=[],halos=[],speed=0,lever=null,swParts=[];
  const board=box3(8.8,.3,5.6,HX.floor,{roughness:.9});board.position.y=-.15;st.scene.add(board);
  const edge=box3(9.1,.2,5.9,HX.slab);edge.position.y=-.3;st.scene.add(edge);st.scene.add(G);
  const cv3=p=>new T.Vector3((p[0]-260)/55,.07,(p[1]-160)/55);
  const calc=()=>{const {n,b,par,on,rm}=CS,V=1.5*n,R=10,act=par?b-(rm?1:0):(rm?0:b);
    const I=!on||act<=0?0:(par?act*V/R:V/(b*R)),ratio=!on||act<=0?0:(par?n*n:(n/b)*(n/b));return{V,I,ratio,act}};
  const bright=r=>r<=0?'Yanmıyor':r<.2?'Çok sönük':r<.8?'Sönük':r<1.5?'Tam parlak':r<5?'Çok parlak':'Aşırı parlak';
  function build(){
    const {n,b,par,on,rm}=CS,{I,ratio}=calc();
    clearG(G);paths=[];halos=[];speed=Math.min(6,I/.15*1.3);swParts=[];
    const wire=(pts,flow=true)=>{const v=pts.map(cv3);
      for(let i=0;i<v.length-1;i++){const a=v[i],q=v[i+1],len=a.distanceTo(q),w=box3(Math.abs(q.x-a.x)>.01?len+.1:.1,.1,Math.abs(q.z-a.z)>.01?len+.1:.1,HX.cream);w.position.copy(a).lerp(q,.5);G.add(w)}
      if(I>0&&flow){let L=0;const seg=[];for(let i=0;i<v.length-1;i++){const l=v[i].distanceTo(v[i+1]);seg.push([v[i],v[i+1],L,l]);L+=l}
        const cnt=Math.max(1,Math.round(L/.5)),dots=[];
        for(let i=0;i<cnt;i++){const d=new T.Mesh(new T.SphereGeometry(.075,10,8),new T.MeshBasicMaterial({color:0xf0a04b}));d.position.y=.16;G.add(d);dots.push(d)}
        paths.push({seg,L,dots,off:0})}};
    wire([[60,128],[60,60],[150,60]]);if(on)wire([[150,60],[200,60]]);
    let bulbs;
    if(!par){wire([[200,60],[460,60],[460,260],[60,260],[60,192]]);bulbs=({1:[260],2:[180,340],3:[140,260,380]})[b].map(x=>[x,260])}
    else{const xs=({1:[460],2:[330,460],3:[270,365,460]})[b];wire([[200,60],[460,60]]);xs.forEach((x,i)=>wire([[x,60],[x,260]],!(rm&&i===0)));wire([[460,260],[60,260],[60,192]]);bulbs=xs.map(x=>[x,160])}
    const cellL=(1.16-(n-1)*.06)/n;
    for(let i=0;i<n;i++){const cc=cyl3(.24,.24,cellL,HX.ember,24,{metalness:.3,roughness:.35});cc.rotation.x=Math.PI/2;cc.position.set(cv3([60,0]).x,.26,-.58+cellL/2+i*(cellL+.06));G.add(cc);
      const cp=cyl3(.09,.09,.06,HX.stone,16);cp.rotation.x=Math.PI/2;cp.position.set(cc.position.x,.26,cc.position.z-cellL/2-.02);G.add(cp)}
    const bl=label3(n+' pil','#F0A04B',.9);bl.position.set(cv3([60,0]).x+1.1,.7,0);G.add(bl);
    const p1=cv3([150,60]),p2=cv3([200,60]);
    [p1,p2].forEach(p=>{const s=cyl3(.13,.15,.24,HX.stone,16);s.position.set(p.x,.12,p.z);G.add(s);swParts.push(s)});
    lever=new T.Group();lever.position.set(p1.x,.26,p1.z);const lv=box3(p2.x-p1.x+.1,.09,.18,HX.ember);lv.position.x=(p2.x-p1.x)/2;lever.add(lv);lever.rotation.z=on?0:.65;G.add(lever);swParts.push(lv);
    const hitbox=new T.Mesh(new T.BoxGeometry(1.4,1,1),new T.MeshBasicMaterial({visible:false}));hitbox.position.set((p1.x+p2.x)/2,.4,p1.z);G.add(hitbox);swParts.push(hitbox);
    const sl=label3(on?'anahtar kapalı':'anahtar açık','#DCC190',.75);sl.position.set((p1.x+p2.x)/2,1.1,p1.z-.2);G.add(sl);
    const k=Math.min(1.7,Math.sqrt(ratio)*.85);
    bulbs.forEach((p,i)=>{const v=cv3(p);const gone=rm&&i===0;
      const bs=cyl3(.2,.26,.2,HX.stone,20);bs.position.set(v.x,.1,v.z);G.add(bs);
      if(gone){const t=label3('söküldü','#E8776A',.75);t.position.set(v.x,.8,v.z);G.add(t);return}
      const lit=k>0;
      const gl=new T.Mesh(new T.SphereGeometry(.32,24,18),new T.MeshStandardMaterial({color:lit?0xffe08a:0x7a7466,emissive:0xd9822b,emissiveIntensity:k*.55,roughness:.2,transparent:true,opacity:.92}));gl.position.set(v.x,.52,v.z);G.add(gl);
      if(lit){const h=glow(.7+k*.8,Math.min(.85,.12+k*.3));h.position.copy(gl.position);G.add(h);halos.push(h);const pl=new T.PointLight(0xd9822b,k*.5,3);pl.position.set(v.x,.9,v.z);G.add(pl)}});
  }
  segBind($('#cSw'),[['1','Kapalı (akım geçer)'],['0','Açık']],()=>CS.on?1:0,v=>{CS.on=v==='1';build()});
  const swDraw=()=>segBind($('#cSw'),[['1','Kapalı (akım geçer)'],['0','Açık']],()=>CS.on?1:0,v=>{CS.on=v==='1';build()});
  segBind($('#cN'),[[1,'1'],[2,'2'],[3,'3']],()=>CS.n,v=>{CS.n=+v;build()});
  segBind($('#cB'),[[1,'1'],[2,'2'],[3,'3']],()=>CS.b,v=>{CS.b=+v;build()});
  segBind($('#cM'),[['s','Seri'],['p','Paralel']],()=>CS.par?'p':'s',v=>{CS.par=v==='p';build()});
  segBind($('#cR'),[['0','Takılı'],['1','Sökülmüş']],()=>CS.rm?'1':'0',v=>{CS.rm=v==='1';build()});
  st.grab=(e,ph)=>{if(ph!=='down')return false;const h=st.ray(e).intersectObjects(swParts,true);if(!h.length)return false;
    CS.on=!CS.on;sfx.tap();build();$('#cSw').innerHTML='';swDraw();return true};
  build();
  return{state:CS,
    frame(dt,t){paths.forEach(p=>{p.off=(p.off+speed*dt)%p.L;const sp=p.L/p.dots.length;
      p.dots.forEach((d,i)=>{const s=(p.off+i*sp)%p.L;for(const g of p.seg){if(s<=g[2]+g[3]){const f=(s-g[2])/g[3];d.position.x=g[0].x+(g[1].x-g[0].x)*f;d.position.z=g[0].z+(g[1].z-g[0].z)*f;break}}})});
      if(!reduce)halos.forEach((h,i)=>{h.material.rotation=t/900+i})},
    read:()=>{const {V,I,ratio}=calc();return[['Pillerin gerilimi',trn(V,1)+' V'],['Devreden geçen akım',trn(I)+' A'],['Lambalar',bright(ratio)]]},
    rec:()=>{const {I,ratio}=calc();return{c:{'Pil':CS.n,'Lamba':CS.b+(CS.rm?' (1 söküldü)':''),'Bağlama':CS.par?'Paralel':'Seri','Anahtar':CS.on?'Kapalı':'Açık','Akım':trn(I)+' A','Lambalar':bright(ratio)}}},
    bright:()=>calc().ratio
  };
}

/* ================= DENEY 4: KESİRLER ================= */
function mkKesir(c){
  const F={a:2,b:3,c:1,d:2,view:'bar'};
  c.ctl.innerHTML=`<div class="frac">
    <div class="fr"><h3 style="color:var(--terra)">Turuncu</h3><div class="fnum"><span id="fa"></span><i></i><span id="fb"></span></div>
      <div class="step"><button type="button" data-f="a-" aria-label="Turuncu payı azalt">−</button><span>Pay</span><button type="button" data-f="a+" aria-label="Turuncu payı artır">+</button></div>
      <div class="step"><button type="button" data-f="b-" aria-label="Turuncu paydayı azalt">−</button><span>Payda</span><button type="button" data-f="b+" aria-label="Turuncu paydayı artır">+</button></div></div>
    <div class="cmp" id="fcmp" aria-live="polite"></div>
    <div class="fr"><h3 style="color:var(--olive)">Yeşil</h3><div class="fnum"><span id="fc"></span><i></i><span id="fd"></span></div>
      <div class="step"><button type="button" data-f="c-" aria-label="Yeşil payı azalt">−</button><span>Pay</span><button type="button" data-f="c+" aria-label="Yeşil payı artır">+</button></div>
      <div class="step"><button type="button" data-f="d-" aria-label="Yeşil paydayı azalt">−</button><span>Payda</span><button type="button" data-f="d+" aria-label="Yeşil paydayı artır">+</button></div></div></div>
    <div class="ctl" style="margin-top:14px"><span class="lab">Görünüm</span><div class="seg" id="fV"></div></div>`;
  const st=c.st,T=THREE;const G=new T.Group();st.scene.add(G);let pieces=[];
  function build(){
    ['a','b','c','d'].forEach(k=>$('#f'+k).textContent=F[k]);
    const l=F.a*F.d,r=F.c*F.b;$('#fcmp').textContent=l===r?'=':l>r?'>':'<';
    clearG(G);pieces=[];
    if(F.view==='bar'){
      const row=(n,d,z,col,txt,tc)=>{const w=7/d;
        for(let i=0;i<d;i++){const on=i<n,m=box3(w-.07,1,1.3,on?col:HX.tile2,{roughness:.45});m.position.set(-3.5+w*(i+.5),.08,z);m.userData.h=on?.75:.16;m.scale.y=.16;G.add(m);pieces.push(m)}
        const lb=label3(txt,tc,1);lb.position.set(-4.6,.6,z);G.add(lb)};
      row(F.a,F.b,-.95,HX.terra,F.a+'/'+F.b,'#F1B48F');row(F.c,F.d,.95,HX.olive,F.c+'/'+F.d,'#C9D6A8');
    }else{
      const pie=(n,d,x,col,txt,tc)=>{const gap=d>1?.05:0,step=Math.PI*2/d;
        for(let i=0;i<d;i++){const on=i<n,m=sh3(new T.Mesh(new T.CylinderGeometry(1.9,1.9,1,40,1,false,i*step+gap/2,step-gap),mat3(on?col:HX.tile2,{roughness:.45})));
          m.position.set(x,.08,0);m.userData.h=on?.7:.16;m.scale.y=.16;G.add(m);pieces.push(m)}
        const lb=label3(txt,tc,1);lb.position.set(x,1.4,-2.3);G.add(lb)};
      pie(F.a,F.b,-2.3,HX.terra,F.a+'/'+F.b,'#F1B48F');pie(F.c,F.d,2.3,HX.olive,F.c+'/'+F.d,'#C9D6A8');
    }
  }
  c.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;
    const k=b.dataset.f[0],s=b.dataset.f[1]==='+'?1:-1;F[k]=clamp(F[k]+s,k==='a'||k==='c'?0:1,12);F.a=Math.min(F.a,F.b);F.c=Math.min(F.c,F.d);sfx.tap();build()});
  segBind($('#fV'),[['bar','Çubuk'],['pie','Pasta']],()=>F.view,v=>{F.view=v;build()});
  build();
  const v=(p,q)=>trn(p/q,2);
  return{state:F,
    frame(dt){pieces.forEach(m=>{m.scale.y+=(m.userData.h-m.scale.y)*(reduce?1:Math.min(1,dt*9));m.position.y=m.scale.y/2})},
    read:()=>[['Turuncu',F.a+'/'+F.b+' ≈ '+v(F.a,F.b)],['Yeşil',F.c+'/'+F.d+' ≈ '+v(F.c,F.d)],['Karşılaştırma',F.a*F.d===F.c*F.b?'Eşit':F.a*F.d>F.c*F.b?'Turuncu büyük':'Yeşil büyük']],
    rec:()=>({c:{'Turuncu':F.a+'/'+F.b,'Yeşil':F.c+'/'+F.d,'Sonuç':F.a*F.d===F.c*F.b?'Eşit':F.a*F.d>F.c*F.b?'Turuncu büyük':'Yeşil büyük'}})
  };
}

/* ================= DENEY 5: MANCINIK (eğik atış) ================= */
function mkAtis(c){
  const A={ang:45,v:15,td:30,wall:false,fly:false,t:0,p0:null,v0:null,maxH:0,last:null,G:9.81};
  const WX=18,WH=9;
  c.ctl.innerHTML=`<div class="ctl"><label for="aA">Atış açısı <output id="aAo"></output></label><input type="range" id="aA" min="10" max="80" step="1" value="45"></div>
    <div class="ctl"><label for="aV">Atış hızı <output id="aVo"></output></label><input type="range" id="aV" min="5" max="25" step="0.5" value="15"></div>
    <div class="ctl"><label for="aT">Hedefin uzaklığı <output id="aTo"></output></label><input type="range" id="aT" min="10" max="55" step="1" value="30"></div>
    <div class="ctl"><span class="lab">Sur duvarı (18. metrede)</span><div class="seg" id="aW"></div></div>
    <button class="b3 ember firebtn" type="button" id="aFire">${ic('send',20)} Fırlat!</button>`;
  const st=c.st,T=THREE;
  const ground=box3(110,.4,44,HX.floor,{roughness:.95});ground.position.set(40,-.2,0);st.scene.add(ground);
  for(let m=0;m<=70;m+=5){const ln=box3(m%10?.06:.14,.03,16,HX.sand);ln.position.set(m,.02,0);st.scene.add(ln);if(m%10===0){const lb=label3(m+' m','#DCC190',2.2);lb.position.set(m,.9,4.5);st.scene.add(lb)}}
  /* mancınık */
  const cat=new T.Group();st.scene.add(cat);
  const base=box3(2.4,.5,1.8,HX.rust);base.position.set(-.4,.55,0);cat.add(base);
  [[-1.3,.8],[.5,.8],[-1.3,-.8],[.5,-.8]].forEach(([x,z])=>{const w=cyl3(.42,.42,.18,HX.ink,20);w.rotation.x=Math.PI/2;w.position.set(x,.42,z);cat.add(w)});
  [-.5,.5].forEach(z=>{const up=box3(.18,1.2,.18,HX.rust);up.position.set(0,1.2,z*1.2);cat.add(up)});
  const piv=new T.Group();piv.position.set(0,1.8,0);cat.add(piv);
  const arm=cyl3(.28,.34,2.8,HX.stone,20);arm.rotation.z=-Math.PI/2;arm.position.x=1.4;piv.add(arm);
  const cup=cyl3(.5,.35,.3,HX.rust,20);cup.rotation.z=-Math.PI/2;cup.position.x=2.85;piv.add(cup);
  /* hedef */
  const tgt=new T.Group();st.scene.add(tgt);
  [[1.5,HX.cream],[1.05,HX.terra],[.55,HX.ember]].forEach(([r,col],i)=>{const d=new T.Mesh(new T.CylinderGeometry(r,r,.06+i*.02,40),mat3(col,{roughness:.7}));d.position.y=.03+i*.01;d.receiveShadow=true;tgt.add(d)});
  const pole=cyl3(.05,.05,3,HX.ink,8);pole.position.set(0,1.5,-1.8);tgt.add(pole);const flag=box3(1,.6,.04,HX.terra);flag.position.set(.5,2.7,-1.8);tgt.add(flag);
  const tglow=glow(5,0);tglow.position.y=.6;tgt.add(tglow);
  /* sur */
  const wall=new T.Group();const wb=box3(1.2,WH,7,HX.stone,{roughness:.9});wb.position.y=WH/2;wall.add(wb);
  for(let i=-3;i<=3;i+=2){const m=box3(1.3,.8,.9,HX.stone);m.position.set(0,WH+.4,i);wall.add(m)}
  wall.position.x=WX;st.scene.add(wall);
  const ball=sph3(.45,HX.terra,{roughness:.4});st.scene.add(ball);
  const TN=400;const mkTrail=(col,op)=>{const p=new Float32Array(TN*3),g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(p,3));g.setDrawRange(0,0);const o=new T.Points(g,new T.PointsMaterial({color:col,size:.22,transparent:true,opacity:op}));st.scene.add(o);return{p,g,n:0}};
  const tr=mkTrail(HX.ember,1),ghost=mkTrail(HX.cream,.35);
  const mark=cyl3(.6,.6,.05,HX.ink,24);mark.visible=false;st.scene.add(mark);let markL=null;
  const tip=()=>{const a=A.ang*Math.PI/180;return[Math.cos(a)*2.85,1.8+Math.sin(a)*2.85]};
  const ui=()=>{A.ang=+$('#aA').value;A.v=+$('#aV').value;A.td=+$('#aT').value;$('#aAo').textContent=A.ang+'°';$('#aVo').textContent=trn(A.v,1)+' m/s';$('#aTo').textContent=A.td+' m';
    piv.rotation.z=A.ang*Math.PI/180;tgt.position.x=A.td;wall.visible=A.wall;if(!A.fly){const [x,y]=tip();ball.position.set(x,y,0)}};
  ['aA','aV','aT'].forEach(i=>$('#'+i).oninput=ui);
  const wDraw=segBind($('#aW'),[['0','Yok'],['1','Var']],()=>A.wall?'1':'0',v=>{A.wall=v==='1';ui()});
  function fire(){if(A.fly)return;const a=A.ang*Math.PI/180,[x,y]=tip();A.p0=[x,y];A.v0=[A.v*Math.cos(a),A.v*Math.sin(a)];A.t=0;A.maxH=y;A.fly=true;
    ghost.p.set(tr.p);ghost.n=tr.n;ghost.g.setDrawRange(0,ghost.n);ghost.g.attributes.position.needsUpdate=true;tr.n=0;mark.visible=false;if(markL){st.scene.remove(markL);disposeObj(markL);markL=null}
    tglow.material.opacity=0;sfx.whoosh()}
  $('#aFire').onclick=fire;
  function land(x,y,why){A.fly=false;const hit=!why&&Math.abs(x-A.td)<=1.5;
    A.last={ang:A.ang,v:A.v,x,h:A.maxH,t:A.t,hit,wall:why==='wall',td:A.td,wallOn:A.wall};
    if(!why){mark.position.set(x,.03,0);mark.visible=true;markL=label3(trn(x,1)+' m','#F0A04B',2.4);markL.position.set(x,2.2,0);st.scene.add(markL)}
    if(hit){sfx.win();tglow.material.opacity=.9;c.say&&c.say('cheer','Tam isabet! Hedefi vurdun.')}else{sfx.thud();c.say&&c.say('think',why==='wall'?'Taş sura çarptı. Daha yüksekten atmayı dene.':x<A.td?'Biraz kısa kaldı. Hızı ya da açıyı değiştir.':'Hedefi aştın. Biraz yavaş at.')}}
  ui();
  return{state:A,
    onTask(i){if(i===0){A.td=30;A.wall=false}if(i===2){A.td=34;A.wall=true}$('#aT').value=A.td;wDraw();ui()},
    frame(dt){
      if(!A.fly)return;A.t+=dt;const x=A.p0[0]+A.v0[0]*A.t,y=A.p0[1]+A.v0[1]*A.t-A.G*A.t*A.t/2;A.maxH=Math.max(A.maxH,y);
      ball.position.set(x,Math.max(.45,y),0);
      if(tr.n<TN){tr.p[tr.n*3]=x;tr.p[tr.n*3+1]=Math.max(.45,y);tr.p[tr.n*3+2]=0;tr.n++;tr.g.setDrawRange(0,tr.n);tr.g.attributes.position.needsUpdate=true}
      if(A.wall&&x+.45>=WX-.6&&x-.45<=WX+.6&&y-.45<WH){land(x,y,'wall');return}
      if(y<=.45&&A.t>.05){ball.position.y=.45;land(x,.45);return}
      if(x>95){land(x,y,'out')}},
    read:()=>{const L=A.last;return[['Açı',A.ang+'°'],['Hız',trn(A.v,1)+' m/s'],['Son atışın menzili',L&&!L.wall?trn(L.x,1)+' m':'—'],['En yüksek nokta',L?trn(L.h,1)+' m':'—'],['Uçuş süresi',L?trn(L.t,1)+' sn':'—'],['Sonuç',!L?'—':L.hit?'Hedefi vurdun!':L.wall?'Sura çarptı':'Iskaladın']]},
    rec:()=>{const L=A.last;if(!L||L.wall)return null;return{c:{'Açı':L.ang+'°','Hız':trn(L.v,1)+' m/s','Menzil':trn(L.x,1)+' m','Yükseklik':trn(L.h,1)+' m'},x:L.ang,y:L.x}},
    curve:x=>A.v*A.v*Math.sin(2*x*Math.PI/180)/A.G
  };
}

/* ================= DENEY 6: YÜZER Mİ, BATAR MI? ================= */
const OBJS=[
 {k:'mantar',n:'Mantar',r:.24,col:0xc9a173,css:'#C9A173'},
 {k:'tahta',n:'Tahta',r:.6,col:0x9a6a3a,css:'#9A6A3A'},
 {k:'elma',n:'Elma',r:.8,col:0xb03a2e,css:'#B03A2E'},
 {k:'buz',n:'Buz',r:.92,col:0xdff3ff,css:'#DFF3FF'},
 {k:'oyuncak',n:'Plastik',r:.95,col:0xd9822b,css:'#D9822B'},
 {k:'yumurta',n:'Yumurta',r:1.03,col:0xf2e3c6,css:'#F2E3C6'},
 {k:'tas',n:'Taş',r:2.6,col:0x8a8478,css:'#8A8478'},
 {k:'demir',n:'Demir',r:7.9,col:0x6d737a,css:'#6D737A'}
];
const LIQ={tatli:{n:'Tatlı su',r:1.0,col:0x4f9bb8},tuzlu:{n:'Çok tuzlu su',r:1.2,col:0x7fb9c4},zeytin:{n:'Zeytinyağı',r:.91,col:0xc9a227}};
function mkYogunluk(c){
  const Y={sel:'yumurta',liq:'tatli',items:[],slot:0,last:null};
  const SLOTS=[-2.8,-.95,.95,2.8],FLOOR=.3,SURF=4.1;
  const foundTxt=o=>S.lab.found[o.k]?trn(o.r)+' g/cm³':'? g/cm³';
  const pickHTML=()=>OBJS.map(o=>`<button type="button" data-o="${o.k}" aria-pressed="${Y.sel===o.k}"><i style="background:${o.css}"></i>${o.n}<small>${S.lab.found[o.k]?trn(o.r):'?'}</small></button>`).join('');
  c.ctl.innerHTML=`<div class="ctl"><span class="lab">Cisim seç <small class="muted">(yoğunluğu bırakınca öğrenirsin)</small></span><div class="opick" id="yO">${pickHTML()}</div></div>
    <div class="ctl"><span class="lab">Tanktaki sıvı</span><div class="seg" id="yL"></div></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="b3 ember" type="button" id="yDrop">${ic('drop',18)} Sıvıya bırak</button><button class="b3 ghost sm" type="button" id="yClr">${ic('trash',16)} Tankı boşalt</button></div>`;
  const st=c.st,T=THREE;
  const table=box3(10,.3,5,HX.rust,{roughness:.8});table.position.y=.0;st.scene.add(table);
  const glass=new T.Mesh(new T.BoxGeometry(8,5,3.6),new T.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.12,roughness:.1,depthWrite:false}));glass.position.y=.15+2.5;st.scene.add(glass);
  const edges=new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(8,5,3.6)),new T.LineBasicMaterial({color:0xf4ead6,transparent:true,opacity:.6}));edges.position.copy(glass.position);st.scene.add(edges);
  const liqM=new T.MeshStandardMaterial({color:LIQ.tatli.col,transparent:true,opacity:.5,roughness:.15,depthWrite:false});
  const liq=new T.Mesh(new T.BoxGeometry(7.8,SURF-FLOOR,3.4),liqM);liq.position.y=FLOOR+(SURF-FLOOR)/2;liq.renderOrder=2;st.scene.add(liq);
  const surf=new T.Mesh(new T.PlaneGeometry(7.8,3.4),new T.MeshStandardMaterial({color:LIQ.tatli.col,transparent:true,opacity:.35,roughness:.05,side:T.DoubleSide,depthWrite:false}));surf.rotation.x=-Math.PI/2;surf.position.y=SURF;st.scene.add(surf);
  const rings=[];
  function mkObj(o){let m;
    if(o.k==='mantar'){m=cyl3(.42,.42,.6,o.col,20);m.userData.hh=.3}
    else if(o.k==='tahta'||o.k==='demir'){const s=o.k==='tahta'?.9:.7;m=box3(s,s,s,o.col,o.k==='demir'?{metalness:.7,roughness:.35}:{roughness:.8});m.userData.hh=s/2}
    else if(o.k==='buz'){m=box3(.8,.8,.8,o.col,{transparent:true,opacity:.8,roughness:.1});m.userData.hh=.4}
    else if(o.k==='tas'){m=sh3(new T.Mesh(new T.DodecahedronGeometry(.45),mat3(o.col,{roughness:.95})));m.userData.hh=.42}
    else if(o.k==='yumurta'){m=sph3(.42,o.col,{roughness:.5});m.scale.set(.85,1.15,.85);m.userData.hh=.48}
    else if(o.k==='elma'){m=new T.Group();const b=sph3(.45,o.col,{roughness:.5});m.add(b);const s=cyl3(.03,.03,.25,0x5c3a1a,6);s.position.y=.5;m.add(s);const lf=box3(.22,.02,.1,0x4b5a3a);lf.position.set(.1,.55,0);m.add(lf);m.userData.hh=.45}
    else{m=sph3(.45,o.col,{roughness:.35});const st2=new T.Mesh(new T.TorusGeometry(.45,.05,8,24),mat3(0x2f3a28));st2.rotation.x=Math.PI/2;m.add(st2);m.userData.hh=.45}
    return m}
  function drop(){const o=OBJS.find(x=>x.k===Y.sel);const i=Y.slot%4;Y.slot++;
    const old=Y.items.find(it=>it.i===i);if(old){st.scene.remove(old.m);disposeObj(old.m);Y.items=Y.items.filter(it=>it!==old)}
    const m=mkObj(o);m.position.set(SLOTS[i],6.6,0);st.scene.add(m);const it={i,o,m,y:6.6,vy:0,inL:false,t:0};Y.items.push(it);Y.last=it;sfx.tap()}
  function setLiq(k){Y.liq=k;liqM.color.setHex(LIQ[k].col);surf.material.color.setHex(LIQ[k].col)}
  c.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-o]');if(!b)return;Y.sel=b.dataset.o;$$('#yO button').forEach(x=>x.setAttribute('aria-pressed',x===b));sfx.tap()});
  segBind($('#yL'),Object.keys(LIQ).map(k=>[k,LIQ[k].n]),()=>Y.liq,v=>setLiq(v));
  $('#yDrop').onclick=drop;
  $('#yClr').onclick=()=>{Y.items.forEach(it=>{st.scene.remove(it.m);disposeObj(it.m)});Y.items=[];Y.last=null};
  Y.sel='tahta';drop();Y.sel='tas';drop();Y.sel='yumurta';$$('#yO button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.o==='yumurta'));
  const status=it=>{const rl=LIQ[Y.liq].r;return it.o.r<rl?`Yüzüyor, %${Math.round(it.o.r/rl*100)}'i sıvının içinde`:'Batıyor'};
  return{state:Y,
    frame(dt,t){const rl=LIQ[Y.liq].r,g=9.8;
      Y.items.forEach(it=>{const hh=it.m.userData.hh,s=clamp((SURF-(it.y-hh))/(2*hh),0,1);
        let net=rl*s/it.o.r-1;if(s>=.999)net=Math.sign(net)*Math.max(Math.abs(net),.3);
        const a=g*net-(s>0?2.6:.15)*it.vy;it.vy+=a*dt;it.y+=it.vy*dt;
        if(it.y-hh<FLOOR){it.y=FLOOR+hh;if(it.vy<0)it.vy=0}
        if(!it.inL&&s>0){it.inL=true;sfx.splash();const rg=new T.Mesh(new T.RingGeometry(.4,.55,32),new T.MeshBasicMaterial({color:0xf4ead6,transparent:true,opacity:.8,side:T.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.set(SLOTS[it.i],SURF+.02,0);st.scene.add(rg);rings.push({m:rg,t:0})}
        if(it.inL){it.t+=dt;if(it.t>1.5&&!S.lab.found[it.o.k]){S.lab.found[it.o.k]=1;save();$('#yO').innerHTML=pickHTML()}}
        it.m.position.y=it.y;if(s>0&&s<1&&!reduce)it.m.rotation.z=Math.sin(t/600+it.i)*.06});
      for(let i=rings.length-1;i>=0;i--){const r=rings[i];r.t+=dt;r.m.scale.setScalar(1+r.t*3);r.m.material.opacity=Math.max(0,.8-r.t);if(r.t>.9){st.scene.remove(r.m);disposeObj(r.m);rings.splice(i,1)}}},
    read:()=>{const o=OBJS.find(x=>x.k===Y.sel),L=LIQ[Y.liq];return[['Seçili cisim',o.n],['Cismin yoğunluğu',foundTxt(o)],['Sıvının yoğunluğu',trn(L.r)+' g/cm³'],['Son bırakılan',Y.last?Y.last.o.n+': '+status(Y.last):'—']]},
    rec:()=>{const it=Y.last;if(!it)return null;return{c:{'Cisim':it.o.n,'Yoğunluk':trn(it.o.r)+' g/cm³','Sıvı':LIQ[Y.liq].n,'Sonuç':it.o.r<LIQ[Y.liq].r?'Yüzer':'Batar'}}}
  };
}

/* ================= DENEY 7: AY'IN EVRELERİ ================= */
const MONTH=29.53;
function phaseName(d){d=((d%MONTH)+MONTH)%MONTH;return d<1||d>28.5?'Yeni Ay':d<6.4?'Hilal (büyüyen)':d<8.4?'İlk dördün':d<13.8?'Şişkin Ay (büyüyen)':d<15.8?'Dolunay':d<21.1?'Şişkin Ay (küçülen)':d<23.1?'Son dördün':'Hilal (küçülen)'}
const litFrac=d=>(1-Math.cos(2*Math.PI*d/MONTH))/2;
function drawPhase(cv,d){const x=cv.getContext('2d'),W=cv.width,r=W*.42,cx=W/2,cy=W/2,th=2*Math.PI*(((d%MONTH)+MONTH)%MONTH)/MONTH;
  x.clearRect(0,0,W,W);x.fillStyle='#2b2a26';x.beginPath();x.arc(cx,cy,r,0,7);x.fill();
  const lit='#EFE6CF',waxing=th<Math.PI,cos=Math.cos(th);
  x.fillStyle=lit;x.beginPath();x.arc(cx,cy,r,-Math.PI/2,Math.PI/2,!waxing);x.closePath();x.fill();
  x.fillStyle=cos>0?'#2b2a26':lit;x.beginPath();x.ellipse(cx,cy,Math.abs(cos)*r,r,0,0,7);x.fill();
  x.globalAlpha=.18;x.fillStyle='#000';[[.3,-.2,.12],[-.25,.3,.09],[.1,.35,.07],[-.35,-.3,.08]].forEach(([a,b,s])=>{x.beginPath();x.arc(cx+a*r,cy+b*r,s*r,0,7);x.fill()});x.globalAlpha=1;
  x.strokeStyle='rgba(244,234,214,.35)';x.lineWidth=2;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke()}
function mkAy(c){
  const M={d:3,play:false,spd:2,drag:false};
  c.ctl.innerHTML=`<div class="ctl"><label for="mD">Yeni Ay'dan sonra geçen gün <output id="mDo"></output></label><input type="range" id="mD" min="0" max="29.5" step="0.1" value="3"></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px"><button class="b3 sm" type="button" id="mP">${ic('play',16)} Oynat</button></div>
    <div class="ctl"><span class="lab">Hız</span><div class="seg" id="mS"></div></div>
    <p class="muted" style="font-size:.88rem">Sahnede Ay'ı tutup Dünya'nın etrafında sürükleyebilirsin.</p>`;
  const st=c.st,T=THREE;
  st.scene.add(new T.AmbientLight(0xffffff,.06));
  const sunL=new T.DirectionalLight(0xfff2d6,1.7);sunL.position.set(30,0,0);sunL.target.position.set(0,0,0);st.scene.add(sunL);st.scene.add(sunL.target);
  const sun=new T.Mesh(new T.SphereGeometry(2.4,32,24),new T.MeshBasicMaterial({color:0xffc35a}));sun.position.set(17,0,0);st.scene.add(sun);
  const sg=glow(12,.9);sg.position.copy(sun.position);st.scene.add(sg);
  for(let i=-2;i<=2;i++){const ray=new T.Mesh(new T.BoxGeometry(5,.05,.05),new T.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:.35}));ray.position.set(11.5,0,i*2.4);st.scene.add(ray);
    const tip=new T.Mesh(new T.ConeGeometry(.18,.5,8),new T.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:.5}));tip.rotation.z=Math.PI/2;tip.position.set(8.8,0,i*2.4);st.scene.add(tip)}
  const sunLb=label3('Güneş','#F0A04B',2.2);sunLb.position.set(17,3.6,0);st.scene.add(sunLb);
  const earthTex=canvasTex(512,256,(x,w,h)=>{x.fillStyle='#2F6FA8';x.fillRect(0,0,w,h);let s=7;const R=()=>(s=(s*9301+49297)%233280)/233280;
    for(let i=0;i<26;i++){x.fillStyle=R()<.5?'#6B7F50':'#A9925F';x.beginPath();x.ellipse(R()*w,h*.15+R()*h*.7,20+R()*60,12+R()*36,R()*3,0,7);x.fill()}
    x.fillStyle='#F4F4F0';x.fillRect(0,0,w,14);x.fillRect(0,h-14,w,14);x.globalAlpha=.35;for(let i=0;i<30;i++){x.beginPath();x.ellipse(R()*w,R()*h,20+R()*40,4+R()*6,0,0,7);x.fill()}});
  const earth=new T.Mesh(new T.SphereGeometry(1.8,48,32),new T.MeshStandardMaterial({map:earthTex,roughness:.8}));st.scene.add(earth);
  const eLb=label3('Dünya','#C9D6A8',2);eLb.position.set(0,3,0);st.scene.add(eLb);
  const moonTex=canvasTex(256,128,(x,w,h)=>{x.fillStyle='#B8B2A6';x.fillRect(0,0,w,h);let s=3;const R=()=>(s=(s*9301+49297)%233280)/233280;
    for(let i=0;i<40;i++){x.fillStyle=`rgba(70,66,58,${.15+R()*.3})`;x.beginPath();x.arc(R()*w,R()*h,2+R()*12,0,7);x.fill()}});
  const moon=new T.Mesh(new T.SphereGeometry(.8,32,24),new T.MeshStandardMaterial({map:moonTex,roughness:.95}));st.scene.add(moon);
  const mLb=label3('Ay','#F4EAD6',1.8);st.scene.add(mLb);
  const og=new T.BufferGeometry().setFromPoints(Array.from({length:129},(_,i)=>{const a=i/128*Math.PI*2;return new T.Vector3(Math.cos(a)*7,0,-Math.sin(a)*7)}));
  const orbit=new T.Line(og,new T.LineDashedMaterial({color:0xdcc190,dashSize:.4,gapSize:.3,transparent:true,opacity:.6}));orbit.computeLineDistances();st.scene.add(orbit);
  const inset=document.createElement('div');inset.className='inset';inset.innerHTML='<canvas width="220" height="220"></canvas><span>Dünya\'dan görünüş</span>';c.stageEl.appendChild(inset);const icv=$('canvas',inset);
  const ui=()=>{$('#mDo').textContent=trn(M.d,1)};
  $('#mD').oninput=()=>{M.d=+$('#mD').value;ui()};
  const pBtn=$('#mP');const pDraw=()=>{pBtn.innerHTML=M.play?ic('pause',16)+' Durdur':ic('play',16)+' Oynat'};
  pBtn.onclick=()=>{M.play=!M.play;pDraw()};
  segBind($('#mS'),[['1','Yavaş'],['2','Normal'],['5','Hızlı']],()=>String(M.spd),v=>M.spd=+v);
  const plane=new T.Plane(new T.Vector3(0,1,0),0),hp=new T.Vector3();
  st.grab=(e,ph)=>{if(ph==='up'){M.drag=false;return true}
    if(ph==='down'){if(!st.ray(e).intersectObject(moon).length)return false;M.drag=true;M.play=false;pDraw()}
    if(st.ray(e).ray.intersectPlane(plane,hp)){let a=Math.atan2(-hp.z,hp.x);if(a<0)a+=Math.PI*2;M.d=a/(Math.PI*2)*MONTH;$('#mD').value=M.d;ui()}return true};
  let lastD=-1;ui();
  return{state:M,
    frame(dt){if(M.play){M.d=(M.d+dt*M.spd)%MONTH;$('#mD').value=M.d;ui()}
      earth.rotation.y+=dt*.8;const a=2*Math.PI*M.d/MONTH;moon.position.set(Math.cos(a)*7,0,-Math.sin(a)*7);moon.rotation.y=a+Math.PI;mLb.position.set(moon.position.x,1.7,moon.position.z);
      if(Math.abs(lastD-M.d)>.02){lastD=M.d;drawPhase(icv,M.d)}},
    read:()=>[['Gün',trn(M.d,1)],['Evre',phaseName(M.d)],['Aydınlık görünen kısım','%'+Math.round(litFrac(M.d)*100)]],
    rec:()=>({c:{'Gün':trn(M.d,1),'Evre':phaseName(M.d),'Aydınlık':'%'+Math.round(litFrac(M.d)*100)},x:M.d,y:litFrac(M.d)*100}),
    curve:x=>litFrac(x)*100
  };
}

/* ================= DENEY 8: IŞIK VE AYNALAR ================= */
const ISIK_LV=[
 {name:'1. bölüm',em:[0,3,1],tg:[3,0],mir:[[3,3,'\\',1]],walls:[[1,1],[5,5],[5,1],[1,5]]},
 {name:'2. bölüm',em:[0,1,1],tg:[6,5],mir:[[4,1,'/',1],[4,5,'/',1],[1,5,'/',1]],walls:[[2,3],[5,3],[2,0],[6,2]]},
 {name:'3. bölüm',em:[0,6,0],tg:[6,0],mir:[[0,2,'\\',1],[3,2,'\\',1],[3,0,'\\',1],[3,5,'/',1]],walls:[[1,4],[5,3],[5,5],[1,0]]}
];
function mkIsik(c){
  const I={lv:0,mirrors:[],hit:false,bounces:0,solved:{}};
  c.ctl.innerHTML=`<div class="ctl"><span class="lab">Bölüm</span><div class="seg" id="iL"></div></div>
    <p class="muted" style="font-size:.9rem">Turuncu tabanlı aynalara dokun: ayna döner. Lazeri kristale ulaştır.</p>
    <div style="margin-top:10px"><button class="b3 ghost sm" type="button" id="iR">${ic('reset',16)} Bölümü baştan başlat</button></div>`;
  const st=c.st,T=THREE,CS=1.2,N=7;
  const cell=(cx,cy)=>new T.Vector3((cx-3)*CS,0,(cy-3)*CS);
  const base=box3(N*CS+.6,.3,N*CS+.6,HX.slab);base.position.y=-.2;st.scene.add(base);
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const t=box3(CS-.08,.12,CS-.08,(x+y)%2?HX.tile:HX.tile2,{roughness:.85});t.position.copy(cell(x,y));t.position.y=-.02;st.scene.add(t)}
  const G=new T.Group();st.scene.add(G);const RG=new T.Group();st.scene.add(RG);
  let crystal=null,cLight=null,mirMeshes=[];
  const DV=[[0,-1],[1,0],[0,1],[-1,0]];
  const REF={'/':[1,0,3,2],'\\':[3,2,1,0]};
  function build(){clearG(G);mirMeshes=[];const L=ISIK_LV[I.lv];I.mirrors=L.mir.map(m=>({x:m[0],y:m[1],o:m[2],rot:m[3]}));
    L.walls.forEach(([x,y])=>{const w=box3(CS-.1,1,CS-.1,HX.stone,{roughness:.9});w.position.copy(cell(x,y));w.position.y=.5;G.add(w)});
    const [ex,ey,ed]=L.em;const em=new T.Group();em.position.copy(cell(ex,ey));
    const body=box3(.8,.6,.8,HX.ink);body.position.y=.35;em.add(body);const lens=cyl3(.16,.16,.3,HX.terra,16);lens.rotation.z=Math.PI/2;lens.position.set(.5,.4,0);em.add(lens);
    em.rotation.y=-(ed-1)*Math.PI/2;G.add(em);
    crystal=sh3(new T.Mesh(new T.OctahedronGeometry(.42),new T.MeshStandardMaterial({color:0x6b7f50,emissive:0xd9822b,emissiveIntensity:0,roughness:.2,metalness:.2})));crystal.position.copy(cell(L.tg[0],L.tg[1]));crystal.position.y=.6;G.add(crystal);
    const ped=cyl3(.35,.45,.25,HX.stone,16);ped.position.copy(cell(L.tg[0],L.tg[1]));ped.position.y=.12;G.add(ped);
    cLight=new T.PointLight(0xd9822b,0,4);cLight.position.copy(crystal.position);G.add(cLight);
    I.mirrors.forEach((m,i)=>{const g=new T.Group();g.position.copy(cell(m.x,m.y));
      const b=cyl3(.42,.48,.14,m.rot?HX.ember:HX.stone,20);b.position.y=.07;g.add(b);
      const plate=box3(1.25,.9,.08,0xdfe6ea,{metalness:.85,roughness:.15});plate.position.y=.6;const pv=new T.Group();pv.add(plate);pv.rotation.y=m.o==='/'?Math.PI/4:-Math.PI/4;g.add(pv);
      g.userData={i,pv};G.add(g);mirMeshes.push(g)});
    trace()}
  function trace(){clearG(RG);const L=ISIK_LV[I.lv];let [x,y,d]=L.em;const pts=[cell(x,y)];let hit=false,b=0;
    for(let k=0;k<80;k++){const nx=x+DV[d][0],ny=y+DV[d][1];
      if(nx<0||ny<0||nx>=N||ny>=N){const p=cell(x,y);p.x+=DV[d][0]*CS*.5;p.z+=DV[d][1]*CS*.5;pts.push(p);break}
      if(L.walls.some(w=>w[0]===nx&&w[1]===ny)){const p=cell(nx,ny);p.x-=DV[d][0]*CS*.5;p.z-=DV[d][1]*CS*.5;pts.push(p);break}
      x=nx;y=ny;
      if(x===L.tg[0]&&y===L.tg[1]){pts.push(cell(x,y));hit=true;break}
      const m=I.mirrors.find(q=>q.x===x&&q.y===y);if(m){pts.push(cell(x,y));d=REF[m.o][d];b++}}
    for(let i=0;i<pts.length-1;i++){const a=pts[i],q=pts[i+1],len=a.distanceTo(q);if(len<.01)continue;
      const seg=new T.Mesh(new T.BoxGeometry(Math.abs(q.x-a.x)>.01?len:.09,.09,Math.abs(q.z-a.z)>.01?len:.09),new T.MeshBasicMaterial({color:0xff5a2e}));seg.position.copy(a).lerp(q,.5);seg.position.y=.62;RG.add(seg);
      const gs=glow(.9,.7);gs.position.copy(q);gs.position.y=.62;RG.add(gs)}
    const was=I.hit;I.hit=hit;I.bounces=b;crystal.material.emissiveIntensity=hit?1.3:0;cLight.intensity=hit?2.2:0;
    if(hit&&!was){I.solved[I.lv]=1;sfx.win();c.say&&c.say('cheer','Işık kristale ulaştı! Harika.')}}
  const lvDraw=segBind($('#iL'),ISIK_LV.map((l,i)=>[i,l.name]),()=>I.lv,v=>{I.lv=+v;build()});
  $('#iR').onclick=()=>build();
  let spinning=[];
  st.grab=(e,ph)=>{if(ph!=='down')return false;const hits=st.ray(e).intersectObjects(mirMeshes,true);if(!hits.length)return false;
    let o=hits[0].object;while(o&&!o.userData.pv)o=o.parent;if(!o)return false;const m=I.mirrors[o.userData.i];
    if(!m.rot){sfx.bad();c.say&&c.say('think','Gri tabanlı aynalar sabit, onları çeviremezsin.');return true}
    m.o=m.o==='/'?'\\':'/';spinning.push({pv:o.userData.pv,to:m.o==='/'?Math.PI/4:-Math.PI/4});sfx.tap();trace();return true};
  st.hover=e=>{const h=st.ray(e).intersectObjects(mirMeshes,true);c.stageEl.querySelector('canvas').style.cursor=h.length?'pointer':''};
  build();
  return{state:I,
    onTask(i){if(i<2&&I.lv!==i){I.lv=i;lvDraw();build()}},
    frame(dt,t){if(crystal)crystal.rotation.y+=dt*(I.hit?3:.6);
      for(let i=spinning.length-1;i>=0;i--){const s=spinning[i];s.pv.rotation.y+=(s.to-s.pv.rotation.y)*Math.min(1,dt*12);if(Math.abs(s.to-s.pv.rotation.y)<.01){s.pv.rotation.y=s.to;spinning.splice(i,1)}}},
    read:()=>[['Bölüm',ISIK_LV[I.lv].name],['Yansıma sayısı',String(I.bounces)],['Durum',I.hit?'Işık kristale ulaştı':'Kristale ulaşmadı']],
    rec:()=>({c:{'Bölüm':ISIK_LV[I.lv].name,'Yansıma':I.bounces,'Sonuç':I.hit?'Ulaştı':'Ulaşmadı'}})
  };
}

/* ================= DENEY KATALOĞU ================= */
const EXPS=[
 {id:'sarkac',title:'Sarkaç',icon:'pendulum',col:'#A3461F',grade:'6–8. sınıf · Fen',desc:'İpin boyu ve yer çekimi salınımı nasıl değiştirir?',hint:'Topu tutup yana çek ve bırak. Boş yerden sürüklersen sahne döner.',
  cam:{target:[0,1.45,-.2],dist:5.2,az:.5,el:.14,floor:2.5,azLim:1.1},slow:true,grabby:true,mk:mkSarkac,
  chart:{xl:'İpin uzunluğu (m)',yl:'Süre (sn)',x0:0,x1:2,y0:0,y1:7,curveName:'formül'},curveFn:(x,inst)=>2*Math.PI*Math.sqrt(x/inst.state.g),
  formula:'T = 2π × √(L ÷ g)',explain:'<b>T</b>, topun bir kez gidip gelme süresidir. <b>L</b> ipin uzunluğu, <b>g</b> yer çekimidir. İp uzarsa top daha yavaş gidip gelir. Yer çekimi büyürse daha hızlı gidip gelir. Formülde kütle yok, yani topun ağırlığı süreyi değiştirmez.',
  real:'Eski duvar saatlerindeki sarkaç, her salınımda saati bir adım ilerletir.',fact:'Galileo, kilisedeki bir avizenin salınımını nabzıyla ölçerek sarkacın sırrını keşfetti.',
  tasks:[
   {kind:'predict',text:'Tahmin et: Kütle süreyi değiştirir mi?',q:'Topun kütlesini 1 kg\'dan 5 kg\'a çıkarırsan bir gidip gelme süresi ne olur?',opts:['Uzar','Kısalır','Değişmez'],a:2,why:'Süre yalnızca ipin boyuna ve yer çekimine bağlıdır. Kütleyi değiştirip kendin gör!'},
   {kind:'do',text:'Dünya\'da bir gidip gelmesi tam 2 saniye süren bir sarkaç kur.',check:x=>x.state.gn!=='dunya'?{ok:false,msg:'Önce yer olarak Dünya\'yı seç.'}:Math.abs(x.T()-2)<=.05?{ok:true,msg:'Harika! Yaklaşık 1 metrelik ip, 2 saniyelik bir saat yapar.'}:{ok:false,msg:`Şu an süre ${trn(x.T())} sn. ${x.T()<2?'İpi uzat.':'İpi kısalt.'}`}},
   {kind:'do',text:'Ay\'a git! Ay\'da bir gidip gelmesi 3 saniye süren bir sarkaç kur.',check:x=>x.state.gn!=='ay'?{ok:false,msg:'Yer olarak Ay\'ı seç.'}:Math.abs(x.T()-3)<=.05?{ok:true,msg:'Süper! Ay\'da yer çekimi az olduğu için kısa bir ip bile yavaş sallanır.'}:{ok:false,msg:`Şu an süre ${trn(x.T())} sn. ${x.T()<3?'İpi uzat.':'İpi kısalt.'}`}}
  ]},
 {id:'kaldirac',title:'Kaldıraç',icon:'lever',col:'#4B5A3A',grade:'8. sınıf · Basit makineler',desc:'Hafif bir yük ağır bir yükü nasıl kaldırır?',hint:'Yüklerin kütlesini ve yerini sağdaki ayarlardan değiştir.',
  cam:{target:[0,1.6,-1.2],dist:13.5,az:.3,el:.36,floor:7},mk:mkKaldirac,
  formula:'kütle × uzaklık = kütle × uzaklık',explain:'Her yük için kütleyi ortaya olan uzaklıkla çarp. İki sonuç <b>eşitse</b> tahta dengede durur. Arkadaki sütunlar bu çarpımı gösterir: sütunlar eşit boydaysa denge vardır.',
  real:'Tahterevalli, makas, kerpeten ve el arabası birer kaldıraçtır.',fact:'Arşimet: "Bana bir dayanak noktası verin, Dünya\'yı yerinden oynatayım" demiştir.',
  tasks:[
   {kind:'do',text:'Bir yük 2 kg, öbürü 8 kg olsun. Tahtayı dümdüz durdur.',check:x=>{const K=x.state,ms=[K.mL,K.mR].sort((p,q)=>p-q);if(ms[0]!==2||ms[1]!==8)return{ok:false,msg:'Yüklerden biri 2 kg, öbürü 8 kg olmalı.'};return K.mL*K.dL===K.mR*K.dR?{ok:true,msg:'Dengede! 2 kg\'lık yük 4 kat uzakta durunca 8 kg\'ı dengeledi.'}:{ok:false,msg:'Henüz düz değil. Hafif yükü ortadan uzaklaştır, ağırı yaklaştır.'}}},
   {kind:'predict',text:'Tahmin et: Tahterevallide ne olur?',q:'Tahterevallide ağır çocuk ortaya yaklaşırsa hafif çocuk onu kaldırabilir mi?',opts:['Evet, daha kolay kaldırır','Hayır, daha zor kaldırır','Hiçbir şey değişmez'],a:0,why:'Ağır çocuğun kütle × uzaklık değeri küçülür. Hafif çocuk artık onu daha kolay dengeler.'},
   {kind:'do',text:'Bir yük 3 kg, öbürü 5 kg olsun. Tahtayı dengele.',check:x=>{const K=x.state,ms=[K.mL,K.mR].sort((p,q)=>p-q);if(ms[0]!==3||ms[1]!==5)return{ok:false,msg:'Yüklerden biri 3 kg, öbürü 5 kg olmalı.'};return K.mL*K.dL===K.mR*K.dR?{ok:true,msg:'Mükemmel! 3 × 5 = 5 × 3. Uzaklıkları yer değiştirince denge kuruldu.'}:{ok:false,msg:'Çarpımları eşitle: 3 × ? = 5 × ?'}}}
  ]},
 {id:'devre',title:'Elektrik devresi',icon:'bulb',col:'#D9822B',grade:'4–7. sınıf · Elektrik',desc:'Seri ve paralel bağlamayı dene, lambaları yak.',hint:'Sarı toplar elektrik akımını gösterir. Anahtara dokunarak devreyi aç ya da kapat.',
  cam:{target:[0,0,.35],dist:10.5,az:0,el:.98},mk:mkDevre,
  formula:'Akım = Gerilim ÷ Direnç',explain:'<b>Seri bağlamada</b> lambalar tek bir yol üzerinde arka arkaya durur, pilin gücünü paylaşır ve sönük yanar. <b>Paralel bağlamada</b> her lambanın pile giden kendi yolu vardır, hepsi tam parlak yanar.',
  real:'Evimizdeki lambalar paralel bağlıdır. Bu yüzden bir lamba bozulunca diğerleri yanmaya devam eder.',fact:'Eski yılbaşı ışıklarında tek ampul bozulunca bütün dizi sönerdi, çünkü seri bağlıydılar.',
  tasks:[
   {kind:'do',text:'1 pil ve 2 lamba kullan. İki lamba da tam parlak yansın.',check:x=>{const C=x.state;if(!C.on)return{ok:false,msg:'Anahtar açık, akım geçmiyor.'};if(C.rm)return{ok:false,msg:'Önce sökülen lambayı geri tak.'};if(C.n!==1||C.b!==2)return{ok:false,msg:'Tam 1 pil ve 2 lamba kullanmalısın.'};return C.par?{ok:true,msg:'İşte bu! Paralel bağlamada her lamba pile kendi yolundan bağlanır.'}:{ok:false,msg:'Lambalar sönük. Bağlama şeklini değiştir.'}}},
   {kind:'predict',text:'Tahmin et: Bir lamba sökülürse?',q:'Seri bağlı iki lambadan biri sökülürse diğer lamba ne olur?',opts:['Söner','Daha parlak yanar','Aynı kalır'],a:0,why:'Seri devrede akımın tek bir yolu vardır. Yol kopunca bütün lambalar söner. "İlk lamba: Sökülmüş" seçip dene!'},
   {kind:'do',text:'3 lambayı seri bağla ve üçünü de tam parlak yak.',check:x=>{const C=x.state;if(!C.on)return{ok:false,msg:'Anahtar açık.'};if(C.rm)return{ok:false,msg:'Sökülen lambayı geri tak.'};if(C.b!==3||C.par)return{ok:false,msg:'3 lambayı seri bağlamalısın.'};return C.n===3?{ok:true,msg:'Harika! Her lambaya bir pil düşünce hepsi tam parlak yandı.'}:{ok:false,msg:'Lambalar sönük. Pil sayısını değiştir.'}}}
  ]},
 {id:'kesir',title:'Kesirler',icon:'pie',col:'#8E2B22',grade:'3–6. sınıf · Matematik',desc:'Kesirleri çubuk ve pasta olarak karşılaştır.',hint:'Yükselen parçalar kesrin payını gösterir. Görünümü pastaya çevirebilirsin.',
  cam:{target:[-.3,.2,0],dist:11.5,az:.28,el:.66,floor:5.8},mk:mkKesir,
  formula:'a/b = (a × k)/(b × k)',explain:'<b>Payda</b> bütünün kaç eşit parçaya bölündüğünü, <b>pay</b> kaç parça aldığımızı gösterir. Payı ve paydayı aynı sayıyla çarparsan kesrin büyüklüğü değişmez.',
  real:'Pizzayı 8 dilime bölüp 4 dilim yemek, yarısını yemekle aynıdır: 4/8 = 1/2.',fact:'Eski Mısırlılar kesirleri neredeyse hep payı 1 olan kesirlerle yazardı.',
  tasks:[
   {kind:'do',text:'Turuncu kesri 2/3 yap. Yeşilin paydası 12 olsun ve turuncuya eşitlensin.',check:x=>{const F=x.state;return F.a===2&&F.b===3&&F.d===12&&F.c===8?{ok:true,msg:'Doğru! 2/3 = 8/12. Pay da payda da 4 ile çarpıldı.'}:{ok:false,msg:F.a!==2||F.b!==3?'Önce turuncuyu 2/3 yap.':F.d!==12?'Yeşilin paydası 12 olmalı.':'Yükselen kısımlar aynı uzunlukta olmalı.'}}},
   {kind:'do',text:'Turuncu kesri 3/4 yap. Yeşilin paydası 8 olsun ve turuncuya eşitlensin.',check:x=>{const F=x.state;return F.a===3&&F.b===4&&F.d===8&&F.c===6?{ok:true,msg:'Süper! 3/4 = 6/8.'}:{ok:false,msg:F.a!==3||F.b!==4?'Önce turuncuyu 3/4 yap.':F.d!==8?'Yeşilin paydası 8 olmalı.':'Pasta görünümünde karşılaştırıp dene.'}}},
   {kind:'do',text:'Yeşil kesri 1/2\'den büyük ama 3/4\'ten küçük yap.',check:x=>{const F=x.state,v=F.c/F.d;return v>.5&&v<.75?{ok:true,msg:`Evet! ${F.c}/${F.d}, 1/2 ile 3/4 arasında.`}:{ok:false,msg:v<=.5?'Bu kesir 1/2\'den büyük değil.':'Bu kesir 3/4\'ten küçük değil.'}}}
  ]},
 {id:'atis',title:'Mancınık',icon:'catapult',col:'#6F3420',grade:'6–8. sınıf · Kuvvet ve hareket',isNew:true,desc:'Açıyı ve hızı ayarla, taşı hedefe fırlat.',hint:'Açıyı ve hızı ayarlayıp Fırlat\'a bas. Soluk iz bir önceki atışını gösterir.',
  cam:{target:[16,6.5,0],dist:46,az:-.7,el:.22,azLim:1.1,shadowSize:36},slow:true,mk:mkAtis,
  chart:{xl:'Atış açısı (°)',yl:'Menzil (m)',x0:0,x1:90,y0:0,y1:70,curveName:'formül (şu anki hızla)'},curveFn:(x,inst)=>inst.curve(x),
  formula:'Menzil = hız² × sin(2 × açı) ÷ g',explain:'Taşın ne kadar uzağa gideceği <b>hıza</b> ve <b>açıya</b> bağlıdır. Hız iki katına çıkınca menzil dört katına çıkar. Hava direnci yoksa en uzak atış <b>45 derecede</b> olur. 30° ile 60° aynı yere düşer!',
  real:'Basketbolda topu potaya atarken, futbolda frikik çekerken hep eğik atış yaparız.',fact:'Eski çağlarda Antakya surlarını kuşatan ordular, büyük taşları mancınıklarla fırlatırdı.',
  tasks:[
   {kind:'do',text:'30 metre uzaktaki hedefi vur.',check:x=>{const L=x.state.last;if(!L)return{ok:false,msg:'Önce Fırlat\'a bas.'};if(L.td!==30)return{ok:false,msg:'Hedef 30 metrede olmalı.'};return L.hit?{ok:true,msg:'Tam isabet! Açı ve hızı birlikte ayarladın.'}:{ok:false,msg:'Son atış hedefi vurmadı. Ayarları değiştirip tekrar fırlat.'}}},
   {kind:'predict',text:'Tahmin et: Hangi açı en uzağa atar?',q:'Aynı hızla fırlatırsan hangi açı taşı en uzağa gönderir?',opts:['30°','45°','60°'],a:1,why:'Hava direnci yoksa 45° en uzağa atar. 30° ile 60° aynı uzaklığa düşer. Ölçüm kaydedip grafikte gör!'},
   {kind:'do',text:'Surun arkasındaki 34 metredeki hedefi vur.',check:x=>{const L=x.state.last;if(!L)return{ok:false,msg:'Önce Fırlat\'a bas.'};if(!L.wallOn||L.td!==34)return{ok:false,msg:'Sur açık ve hedef 34 metrede olmalı.'};return L.hit?{ok:true,msg:'Muhteşem! Yüksek bir açıyla taşı surun üstünden aşırdın.'}:{ok:false,msg:L.wall?'Taş sura çarptı. Açıyı büyüt.':'Hedefi vuramadın. Hızı ayarla.'}}}
  ]},
 {id:'yogunluk',title:'Yüzer mi, batar mı?',icon:'drop',col:'#4B5A3A',grade:'6. sınıf · Yoğunluk',isNew:true,desc:'Cisimleri suya, tuzlu suya ve zeytinyağına bırak.',hint:'Bir cisim seç, sıvıya bırak. Sıvıyı değiştirince cisimler hemen tepki verir.',
  cam:{target:[0,2.4,0],dist:12.5,az:.35,el:.28,floor:6.5},mk:mkYogunluk,
  formula:'Yoğunluk = Kütle ÷ Hacim',explain:'Bir cismin yoğunluğu sıvınınkinden <b>azsa</b> yüzer, <b>fazlaysa</b> batar. Yüzen cismin ne kadarının sıvıya gömüleceği de yoğunlukların oranına bağlıdır.',
  real:'Gemiler demirden yapılır ama içleri hava doludur. Bu yüzden ortalama yoğunlukları sudan azdır ve yüzerler.',fact:'Lut Gölü (Ölü Deniz) o kadar tuzludur ki insanlar suda hiç çabalamadan yüzer.',
  tasks:[
   {kind:'predict',text:'Tahmin et: Yumurta tuzlu suda?',q:'Yumurta tatlı suda batar. Çok tuzlu suya bırakırsan ne olur?',opts:['Yine batar','Yüzer','Erir'],a:1,why:'Tuzlu suyun yoğunluğu yumurtanınkinden fazladır, bu yüzden yumurta yüzer. Dene ve gör!'},
   {kind:'do',text:'Tatlı suda üç farklı cismi aynı anda yüzdür.',check:x=>{const Y=x.state;if(Y.liq!=='tatli')return{ok:false,msg:'Sıvı olarak tatlı suyu seç.'};const k=new Set(Y.items.filter(it=>it.o.r<1).map(it=>it.o.k));return k.size>=3?{ok:true,msg:'Harika! Hepsinin yoğunluğu sudan az.'}:{ok:false,msg:`Şu an ${k.size} farklı cisim yüzüyor. Hafif cisimler dene.`}}},
   {kind:'do',text:'Zeytinyağında batan ama tatlı suda yüzen bir cisim bul ve zeytinyağına bırak.',check:x=>{const Y=x.state;if(Y.liq!=='zeytin')return{ok:false,msg:'Sıvı olarak zeytinyağını seç.'};return Y.items.some(it=>it.o.r>.91&&it.o.r<1)?{ok:true,msg:'Buldun! Yoğunluğu zeytinyağından fazla ama sudan az.'}:{ok:false,msg:'Yoğunluğu 0,91 ile 1 arasında olan bir cisim ara.'}}}
  ]},
 {id:'ay',title:'Ay\'ın evreleri',icon:'moon',col:'#2F3A28',grade:'5. sınıf · Güneş, Dünya ve Ay',isNew:true,desc:'Ay neden bazen hilal, bazen dolunay görünür?',hint:'Ay\'ı sürükle ya da Oynat\'a bas. Sağ alttaki pencere Ay\'ın Dünya\'dan görünüşüdür.',
  cam:{target:[4.5,0,.5],dist:27,az:.18,el:.82,elMin:.15,shadows:false,sun:false,amb:.12},mk:mkAy,
  chart:{xl:'Ayın günü',yl:'Aydınlık (%)',x0:0,x1:30,y0:0,y1:100,curveName:'gerçek değer'},curveFn:(x,inst)=>inst.curve(x),
  formula:'1 ay ≈ 29,5 gün',explain:'Ay kendisi ışık saçmaz, Güneş\'ten gelen ışığı yansıtır. Ay\'ın her zaman yarısı aydınlıktır. Ay Dünya\'nın etrafında dönerken bu aydınlık yarının <b>ne kadarını gördüğümüz</b> değişir. Evreler buna denir.',
  real:'Takvimlerdeki dolunay ve yeni ay günleri, Ay\'ın Dünya etrafındaki konumuna göre hesaplanır.',fact:'Ay hep aynı yüzünü bize gösterir. Arka yüzünü ilk kez 1959\'da bir uzay aracı fotoğrafladı.',
  tasks:[
   {kind:'do',text:'Ay\'ı dolunay konumuna getir.',check:x=>Math.abs(x.state.d-14.77)<=1?{ok:true,msg:'Dolunay! Ay, Dünya\'nın Güneş\'e göre arka tarafında. Aydınlık yüzün tamamını görüyoruz.'}:{ok:false,msg:'Şu an '+phaseName(x.state.d).toLocaleLowerCase('tr')+'. Ay\'ı Güneş\'in tam karşısına götür.'}},
   {kind:'do',text:'İlk dördünü bul: Ay\'ın sağ yarısı aydınlık olsun.',check:x=>Math.abs(x.state.d-7.38)<=1?{ok:true,msg:'İlk dördün! Ay, yörüngesinin dörtte birini tamamladı.'}:{ok:false,msg:'Şu an '+phaseName(x.state.d).toLocaleLowerCase('tr')+'. Yeni Ay\'dan sonraki yaklaşık 7. güne bak.'}},
   {kind:'predict',text:'Tahmin et: Evreler neden oluşur?',q:'Ay\'ın evreleri neden oluşur?',opts:['Ay\'ın aydınlık yüzünü Dünya\'dan farklı açılardan gördüğümüz için','Dünya\'nın gölgesi Ay\'ın üstüne düştüğü için','Ay\'ın kendi ışığı azalıp çoğaldığı için'],a:0,why:'Dünya\'nın gölgesi Ay\'a yalnızca Ay tutulmasında düşer. Evreler, Ay\'ın Güneş ve Dünya\'ya göre konumundan oluşur.'}
  ]},
 {id:'isik',title:'Işık ve aynalar',icon:'mirror',col:'#A3461F',grade:'7. sınıf · Işığın yansıması',isNew:true,desc:'Aynaları çevir, lazeri kristale ulaştır.',hint:'Turuncu tabanlı aynalara dokun. Her dokunuşta ayna döner.',
  cam:{target:[0,0,.4],dist:13,az:0,el:1.0,elMin:.35,floor:6.4},mk:mkIsik,
  formula:'Gelme açısı = Yansıma açısı',explain:'Işık düz bir çizgide ilerler. Bir aynaya çarptığında, geldiği açıyla aynı açıda yansır. Bu oyunda aynalar 45° eğik durduğu için ışık her aynada 90° döner.',
  real:'Denizaltılardaki periskoplar ve arabaların dikiz aynaları ışığın yansımasıyla çalışır.',fact:'Astronotların Ay\'a bıraktığı aynalara Dünya\'dan lazer gönderilerek Ay\'ın uzaklığı santimetre hassasiyetinde ölçülür.',
  tasks:[
   {kind:'do',text:'1. bölümde lazeri kristale ulaştır.',check:x=>x.state.solved[0]?{ok:true,msg:'Bir aynayla ışığı 90° döndürdün!'}:{ok:false,msg:'1. bölümde aynaya dokunarak çevir.'}},
   {kind:'do',text:'2. bölümde lazeri kristale ulaştır.',check:x=>x.state.solved[1]?{ok:true,msg:'İki yansımayla hedefe ulaştın. Harika!'}:{ok:false,msg:'2. bölümü seç. Hangi aynaların ışığın yolunda olduğuna bak.'}},
   {kind:'predict',text:'Tahmin et: Yansıma kanunu',q:'Işık bir aynaya 30 derecelik açıyla gelirse kaç derecelik açıyla yansır?',opts:['30°','60°','90°'],a:0,why:'Yansıma kanunu: gelme açısı yansıma açısına eşittir.'}
  ]}
];
function labTotal(){return EXPS.reduce((s,x)=>s+x.tasks.length,0)}
function labExpDone(id){const x=EXPS.find(e=>e.id===id);return x?x.tasks.filter((t,i)=>S.lab.tasks[id+'-'+i]).length:0}
function labDoneCount(){return EXPS.reduce((s,x)=>s+labExpDone(x.id),0)}
function labNoteCount(){return Object.values(S.lab.notes||{}).reduce((s,a)=>s+a.length,0)}

/* ================= GRAFİK ================= */
function drawChart(cv,pts,cfg,curve){
  const d=Math.min(window.devicePixelRatio||1,2),w=cv.clientWidth||300,h=cv.clientHeight||210;cv.width=w*d;cv.height=h*d;const x=cv.getContext('2d');x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,w,h);
  const cs=getComputedStyle(document.documentElement),ink=cs.getPropertyValue('--ink').trim(),mut=cs.getPropertyValue('--muted').trim(),line=cs.getPropertyValue('--line').trim(),terra=cs.getPropertyValue('--terra').trim(),ember=cs.getPropertyValue('--ember').trim();
  const L=46,R=12,Tp=12,B=38,X=v=>L+(v-cfg.x0)/(cfg.x1-cfg.x0)*(w-L-R),Y=v=>h-B-(v-cfg.y0)/(cfg.y1-cfg.y0)*(h-Tp-B);
  x.font='600 11px Manrope,system-ui,sans-serif';x.fillStyle=mut;x.strokeStyle=line;x.lineWidth=1;
  for(let i=0;i<=5;i++){const vx=cfg.x0+(cfg.x1-cfg.x0)*i/5,vy=cfg.y0+(cfg.y1-cfg.y0)*i/5;
    x.beginPath();x.moveTo(L,Y(vy));x.lineTo(w-R,Y(vy));x.stroke();x.textAlign='right';x.textBaseline='middle';x.fillText(String(+vy.toFixed(1)).replace('.',','),L-6,Y(vy));
    x.textAlign='center';x.textBaseline='top';x.fillText(String(+vx.toFixed(1)).replace('.',','),X(vx),h-B+6)}
  x.strokeStyle=ink;x.lineWidth=1.5;x.beginPath();x.moveTo(L,Tp);x.lineTo(L,h-B);x.lineTo(w-R,h-B);x.stroke();
  x.fillStyle=ink;x.font='700 11px Manrope,system-ui,sans-serif';x.textAlign='center';x.textBaseline='bottom';x.fillText(cfg.xl,L+(w-L-R)/2,h-2);
  x.save();x.translate(12,Tp+(h-Tp-B)/2);x.rotate(-Math.PI/2);x.textBaseline='middle';x.fillText(cfg.yl,0,0);x.restore();
  if(curve){x.strokeStyle=ember;x.lineWidth=2.5;x.beginPath();for(let i=0;i<=80;i++){const vx=cfg.x0+(cfg.x1-cfg.x0)*i/80,vy=curve(vx);if(!isFinite(vy))continue;const py=Y(clamp(vy,cfg.y0,cfg.y1));i?x.lineTo(X(vx),py):x.moveTo(X(vx),py)}x.stroke()}
  pts.forEach(p=>{if(p.x==null||p.y==null)return;const px=X(p.x),py=Y(clamp(p.y,cfg.y0,cfg.y1));x.save();x.translate(px,py);x.rotate(Math.PI/4);x.fillStyle=terra;x.fillRect(-5,-5,10,10);x.strokeStyle='#FBF6EA';x.lineWidth=1.5;x.strokeRect(-5,-5,10,10);x.restore()});
  if(!pts.length){x.fillStyle=mut;x.font='600 12px Manrope,system-ui,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('Ölçüm kaydettikçe noktalar burada görünür.',L+(w-L-R)/2,Tp+(h-Tp-B)/2)}
}
function noteTable(rows){if(!rows.length)return '<p class="muted" style="font-size:.9rem">Henüz ölçüm yok. Deneyi çalıştır, sonra "Ölçümü kaydet"e bas.</p>';
  const cols=Object.keys(rows[0].c);return `<div class="tscroll"><table class="dtable"><thead><tr><th>#</th>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td>${cols.map(c=>`<td>${esc(r.c[c]??'')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}

/* ================= LABORATUVAR SAYFASI ================= */
function renderLab(){
  const done=labDoneCount(),tot=labTotal();
  $('#pgLab').innerHTML=`<div class="frame"><div class="hero-q ol"><div><span class="lbl">LABORATUVAR</span><h2>Deney yap, ölç, keşfet!</h2><p>8 tane 3 boyutlu deney. Her deneyde önce tahmin et, sonra dene, ölçümünü kaydet.</p>
    <div class="bar" style="margin-top:14px;max-width:340px;background:rgba(244,234,214,.25)"><i style="width:${done/tot*100}%"></i><span style="color:#FBF6EA">${done} / ${tot} görev</span></div></div>${anka('think',96)}</div></div>
  <div class="sec-h">Deneyler <small>Bir deneye dokun</small></div>
  <div class="xgrid">${EXPS.map(x=>{const n=labExpDone(x.id);return `<a class="card xcard" href="#lab-${x.id}"><div class="xi" style="background:${x.col}">${ic(x.icon,28)}</div><div><span class="tag">${x.grade}</span>${x.isNew&&!S.lab.seen[x.id]?' <span class="xnew">YENİ</span>':''}<h3>${x.title}</h3><p>${x.desc}</p>
    <div class="xmeta"><span class="dots" aria-label="${n} / ${x.tasks.length} görev">${x.tasks.map((t,i)=>`<i class="${S.lab.tasks[x.id+'-'+i]?'on':''}"></i>`).join('')}</span><span class="muted" style="font-size:.85rem">${n} / ${x.tasks.length} görev</span></div></div></a>`}).join('')}</div>
  <div class="sec-h">Bilim insanı gibi çalış</div>
  <div class="hub">
    <a class="card hubc" href="#defter"><div class="hi" style="background:var(--olive)">${ic('notebook',26)}</div><span class="tag">${labNoteCount()} ölçüm</span><h3>Deney defterim</h3><p>Kaydettiğin bütün ölçümler, tablolar ve grafikler.</p></a>
    <div class="card hubc" style="cursor:default"><div class="hi" style="background:var(--ember);color:#2F2E24">${ic('info',26)}</div><h3>Deney adımları</h3><p><b>1.</b> Tahmin et. <b>2.</b> Dene ve gözle. <b>3.</b> Ölç ve kaydet. <b>4.</b> Sonucu tahminle karşılaştır.</p></div>
  </div>`;
}

let LX=null;
function unmountExp(){if(!LX)return;cancelAnimationFrame(LX.raf);clearInterval(LX.ri);try{LX.inst&&LX.inst.dispose&&LX.inst.dispose()}catch(e){}try{LX.st&&LX.st.dispose()}catch(e){}LX=null}
function renderExp(id){
  unmountExp();
  const x=EXPS.find(e=>e.id===id);if(!x){location.hash='#lab';return}
  if(!S.lab.seen[id]){S.lab.seen[id]=1;save()}
  const first=x.tasks.findIndex((t,i)=>!S.lab.tasks[id+'-'+i]);
  $('#pgExp').innerHTML=`<a class="back" href="#lab">${ic('rotL',18)} Laboratuvar</a>
  <div class="xhead"><div><span class="tag">${x.grade}</span><h1 style="margin-top:8px">${x.title}</h1><p class="sub" style="margin:4px 0 0">${x.desc}</p></div></div>
  <div class="xbody">
    <div class="xcol">
      <div class="stage3 xstage" id="st3"><canvas class="s3" id="cv3" aria-label="${esc(x.title)} 3 boyutlu deney sahnesi"></canvas>
        <div class="stb"><button type="button" data-sb="reset">${ic('reset',15)}Kamera</button><button type="button" data-sb="in" aria-label="Yakınlaş">+</button><button type="button" data-sb="out" aria-label="Uzaklaş">−</button>${x.slow?`<button type="button" data-sb="slow" aria-pressed="false">${ic('slow',15)}Yavaş çekim</button>`:''}</div>
        <span class="s3tag">3D</span><p class="s3hint">${esc(x.hint)}</p></div>
      <div class="card xrec"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px"><h3 style="font-size:1.25rem">Ölçümlerim</h3><div style="display:flex;gap:8px"><button class="b3 sm" type="button" id="xSave">${ic('save',16)} Ölçümü kaydet</button><button class="b3 ghost sm" type="button" id="xClear" aria-label="Ölçümleri sil">${ic('trash',16)}</button></div></div>
        <div id="xTable"></div>${x.chart?`<canvas class="chart" id="xChart" style="margin-top:12px" aria-label="Ölçüm grafiği"></canvas><p class="muted" style="font-size:.82rem;margin-top:4px">Kare noktalar senin ölçümlerin, turuncu çizgi ${esc(x.chart.curveName)}.</p>`:''}</div>
      <details class="card more xinfo"><summary>Bu nasıl çalışıyor?</summary><span class="formula">${esc(x.formula)}</span><p class="explain">${x.explain}</p>
        <div class="fact"><span>${ic('home',20)}</span><p><b>Gerçek hayatta:</b> ${esc(x.real)}</p></div><div class="fact"><span>${ic('star',20)}</span><p><b>Biliyor muydun?</b> ${esc(x.fact)}</p></div></details>
    </div>
    <div class="xcol xside">
      <div class="card xank"><div class="anktip" id="xAnka">${anka('think',64)}<p>${esc(pickL(ANKA.lab))}</p></div></div>
      <div class="card xtask"><h3 style="font-size:1.25rem;margin-bottom:10px;display:flex;justify-content:space-between">Görevler <small class="muted num" style="font-size:.85rem" id="xCnt"></small></h3><div class="tasks" id="xTasks"></div></div>
      <div class="card xctl"><h3 style="font-size:1.25rem;margin-bottom:12px">Ayarlar</h3><div id="xCtl"></div></div>
      <div class="card xrd"><h3 style="font-size:1.25rem;margin-bottom:10px">Ölçüm göstergeleri</h3><dl class="read" id="xRead"></dl></div>
    </div>
  </div>`;
  LX={x,task:first<0?0:first,slow:false,raf:0,res:{}};
  const say=(mood,txt)=>{$('#xAnka').innerHTML=`${anka(mood,64)}<p>${esc(txt)}</p>`};
  if(!window.THREE){$('#st3').insertAdjacentHTML('beforeend','<div class="s3err"><p>3 boyutlu sahne açılamadı. <b>js/three.min.js</b> dosyası eksik olabilir.</p></div>');return}
  try{
    const cv=$('#cv3');if(x.grabby)cv.style.touchAction='none';
    LX.st=makeStage(cv,x.cam);
    LX.inst=x.mk({st:LX.st,ctl:$('#xCtl'),stageEl:$('#st3'),say});
  }catch(err){console.error(err);$('#st3').insertAdjacentHTML('beforeend','<div class="s3err"><p>Bu cihazda 3 boyutlu sahne açılamadı. Başka bir tarayıcı dene.</p></div>');return}
  LX.say=say;
  renderTasks();renderNotes();
  $('#st3').addEventListener('click',e=>{const b=e.target.closest('[data-sb]');if(!b)return;const a=b.dataset.sb;
    if(a==='reset')LX.st.reset();if(a==='in')LX.st.zoom(.85);if(a==='out')LX.st.zoom(1.18);
    if(a==='slow'){LX.slow=!LX.slow;b.setAttribute('aria-pressed',LX.slow)}});
  $('#xSave').onclick=()=>{const r=LX.inst.rec&&LX.inst.rec();if(!r){toast('Önce deneyi çalıştır, sonra kaydet.');return}
    const a=S.lab.notes[x.id]=(S.lab.notes[x.id]||[]);a.push(r);if(a.length>40)a.shift();sfx.coin();renderNotes();
    const nb=BADGES.filter(b=>!S.badges[b.id]&&b.t());nb.forEach(b=>S.badges[b.id]=dkey());save();
    toast(nb.length?ic('notebook',20)+' Yeni rozet: '+nb[0].name:ic('save',20)+' Ölçüm deney defterine kaydedildi')};
  $('#xClear').onclick=e=>{const b=e.currentTarget;if(!b.dataset.arm){b.dataset.arm=1;b.textContent='Sil?';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.innerHTML=ic('trash',16)}},3000);return}
    delete S.lab.notes[x.id];save();renderNotes();b.innerHTML=ic('trash',16);delete b.dataset.arm};
  if(LX.inst.onTask)LX.inst.onTask(LX.task);
  let last=performance.now();
  const loop=t=>{if(!LX)return;const dt=Math.min(.033,(t-last)/1000)*(LX.slow?.25:1);last=t;try{LX.inst.frame(dt,t);LX.st.render()}catch(e){console.error(e)}LX.raf=requestAnimationFrame(loop)};
  LX.raf=requestAnimationFrame(loop);
  const rd=()=>{if(!LX||!LX.inst.read)return;$('#xRead').innerHTML=LX.inst.read().map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')};rd();LX.ri=setInterval(rd,250);
  addEventListener('resize',onLabResize);
}
function onLabResize(){if(LX&&LX.x.chart)renderNotes()}
function renderTasks(){
  const x=LX.x;$('#xCnt').textContent=labExpDone(x.id)+' / '+x.tasks.length;
  $('#xTasks').innerHTML=x.tasks.map((t,i)=>{const done=!!S.lab.tasks[x.id+'-'+i],on=i===LX.task;
    let body='';
    if(on){const r=LX.res[i];
      if(t.kind==='predict')body=`<p style="font-weight:700">${esc(t.q)}</p><div class="popts">${t.opts.map((o,k)=>`<button class="popt ${r&&r.pick===k?(k===t.a?'ok':'no'):done&&k===t.a?'ok':''}" type="button" data-pk="${k}">${esc(o)}</button>`).join('')}</div>`;
      else body=`<button class="b3 sm" type="button" data-chk="${i}">${ic('check',16)} Kontrol et</button>`;
      body+=`<p class="tres ${r?(r.ok?'good':'bad'):''}">${r?esc(r.msg):done&&t.kind==='predict'?esc(t.why):''}</p>`}
    return `<div class="tk ${done?'done':''} ${on?'on':''}"><button class="tkh" type="button" data-task="${i}"><span class="n"><span>${done?ic('check',14):i+1}</span></span><span><small>${t.kind==='predict'?'TAHMİN ET':'DENEY'}</small>${esc(t.text)}</span></button>${body?`<div class="tkb">${body}</div>`:''}</div>`}).join('');
}
function completeLabTask(i){const x=LX.x,k=x.id+'-'+i;if(S.lab.tasks[k])return;S.lab.tasks[k]=dkey();S.day.lab=(S.day.lab||0)+1;smallReward(10,5,x.title+' görevi');sfx.win();confetti()}
document.addEventListener('click',e=>{
  if(!LX||!e.target.closest('#xTasks'))return;
  const th=e.target.closest('[data-task]');if(th){const i=+th.dataset.task;if(i!==LX.task){LX.task=i;if(LX.inst.onTask)LX.inst.onTask(i);sfx.tap();renderTasks()}return}
  const pk=e.target.closest('[data-pk]');if(pk){const t=LX.x.tasks[LX.task],k=+pk.dataset.pk,ok=k===t.a;
    LX.res[LX.task]={pick:k,ok,msg:ok?t.why:'Tam değil. Deneyi yapıp gözlemle, sonra yeniden seç.'};
    if(ok){completeLabTask(LX.task);LX.say('cheer',pickL(ANKA.ok))}else{sfx.bad();LX.say('think','Hmm, bir daha düşünelim. Deneyle kontrol edebilirsin!')}
    renderTasks();return}
  const ck=e.target.closest('[data-chk]');if(ck){const i=+ck.dataset.chk,t=LX.x.tasks[i],r=t.check(LX.inst);LX.res[i]=r;
    if(r.ok){completeLabTask(i);LX.say('cheer',pickL(ANKA.ok));const me=LX,nx=LX.x.tasks.findIndex((q,j)=>!S.lab.tasks[LX.x.id+'-'+j]);
      renderTasks();if(nx>=0)setTimeout(()=>{if(LX===me&&LX.task===i){LX.task=nx;if(LX.inst.onTask)LX.inst.onTask(nx);renderTasks()}},2600);else setTimeout(()=>{if(LX===me)LX.say('cheer','Bu deneyin bütün görevlerini bitirdin! Başka bir deneye ne dersin?')},2600)}
    else{sfx.bad();LX.say('think',r.msg);renderTasks()}}
});
function renderNotes(){if(!LX)return;const x=LX.x,rows=S.lab.notes[x.id]||[];$('#xTable').innerHTML=noteTable(rows);
  if(x.chart)drawChart($('#xChart'),rows,x.chart,v=>x.curveFn(v,LX.inst))}

/* ================= DENEY DEFTERİ ================= */
function renderNotebook(){
  const has=EXPS.filter(x=>(S.lab.notes[x.id]||[]).length);
  $('#pgNote').innerHTML=`<a class="back" href="#lab">${ic('rotL',18)} Laboratuvar</a><h1 class="ph1">Deney defterim</h1><p class="sub">Laboratuvarda kaydettiğin bütün ölçümler burada. ${has.length?`Toplam ${labNoteCount()} ölçüm.`:''}</p>
  ${has.length?`${framed?'':`<p style="margin-bottom:14px"><button class="b3 sm ghost" type="button" id="nPrint">${ic('printer',16)} Defteri yazdır</button></p>`}
   <div id="notebookPrint" style="display:grid;gap:14px">${has.map(x=>`<div class="card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px"><h3 style="font-size:1.3rem;display:flex;gap:10px;align-items:center"><span style="color:${x.col}">${ic(x.icon,22)}</span>${x.title}</h3><a class="b3 sm ghost" href="#lab-${x.id}">Deneye git</a></div>
     ${noteTable(S.lab.notes[x.id])}${x.chart?`<canvas class="chart" data-nc="${x.id}" style="margin-top:12px"></canvas>`:''}</div>`).join('')}</div>`
  :`<div class="card" style="display:grid;justify-items:center;gap:12px;text-align:center;padding:30px">${anka('think',110)}<h3>Defterin henüz boş</h3><p class="muted">Bir deneyde "Ölçümü kaydet"e bastığında sonuçların burada tablo ve grafik olarak birikir.</p><a class="b3" href="#lab">Laboratuvara git</a></div>`}`;
  $$('[data-nc]').forEach(cv=>{const x=EXPS.find(e=>e.id===cv.dataset.nc);const curve=x.id==='sarkac'?(v=>2*Math.PI*Math.sqrt(v/9.81)):x.id==='ay'?(v=>litFrac(v)*100):null;drawChart(cv,S.lab.notes[x.id],x.chart,curve)});
  const p=$('#nPrint');if(p)p.onclick=()=>{try{window.print()}catch(e){}};
}
