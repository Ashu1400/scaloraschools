import * as THREE from 'three';

const canvas=document.querySelector('#play-scene');
if(canvas){
  const world=canvas.closest('.play-world'),hero=canvas.closest('.play-hero');
  const pause=hero.querySelector('.play-pause'),buttons=[...hero.querySelectorAll('[data-mode]')];
  const caption=hero.querySelector('#play-caption-text');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const captions=['Every big thing starts with a little “what if”.','Try it. Make it. Learn from it. Make it better.','Bring people together. Move an idea forward.'];
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});}catch{ /* CSS sculpture remains visible when WebGL is unavailable. */ }
  if(renderer){
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,1.2,10);camera.lookAt(0,0,0);
    scene.add(new THREE.HemisphereLight(0xfffbeb,0x8d927c,3));
    const key=new THREE.DirectionalLight(0xfff9ee,4.2);key.position.set(-3,7,6);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.normalBias=.04;key.shadow.radius=5;scene.add(key);
    const fill=new THREE.DirectionalLight(0xe5eaff,2.2);fill.position.set(4,2,-3);scene.add(fill);
    const material=(color,roughness=.3)=>new THREE.MeshStandardMaterial({color,roughness,metalness:.08});
    const lilac=material(0xb3a4e9),orange=material(0xf49343),blue=material(0x4462d3),lime=material(0xd5e58e),cream=material(0xe8d5ae),graphite=material(0x313c38),pink=material(0xeab5b0);
    const group=new THREE.Group();scene.add(group);
    const mesh=(geometry,mat,parent=group)=>{const m=new THREE.Mesh(geometry,mat);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
    const knot=mesh(new THREE.TorusKnotGeometry(1.14,.35,160,24,2,3),lilac);knot.position.set(.2,.25,0);knot.rotation.set(.3,.4,.1);
    const pencil=new THREE.Group();group.add(pencil);
    mesh(new THREE.CylinderGeometry(.15,.15,2.75,6),orange,pencil);
    const wood=mesh(new THREE.ConeGeometry(.15,.42,6),cream,pencil);wood.position.y=-1.58;wood.rotation.z=Math.PI;
    const tip=mesh(new THREE.ConeGeometry(.052,.17,6),graphite,pencil);tip.position.y=-1.84;tip.rotation.z=Math.PI;
    const band=mesh(new THREE.CylinderGeometry(.158,.158,.18,20),cream,pencil);band.position.y=1.26;
    const eraser=mesh(new THREE.CapsuleGeometry(.145,.13,6,12),pink,pencil);eraser.position.y=1.48;
    pencil.position.set(.65,.1,1.2);pencil.rotation.z=-.55;pencil.rotation.x=.15;
    const ball=mesh(new THREE.SphereGeometry(.48,40,32),blue);ball.position.set(-1.48,-.9,.6);
    const ballBand=mesh(new THREE.TorusGeometry(.481,.018,8,64),cream,ball);ballBand.rotation.x=.8;
    const blocks=new THREE.Group();group.add(blocks);
    for(let i=0;i<3;i++){const cube=mesh(new THREE.BoxGeometry(.48,.32*(i+1),.55),lime,blocks);cube.position.set(i*.46,.16*(i+1),0);}
    blocks.position.set(.7,-1.5,-.25);blocks.rotation.y=-.3;
    const ring=mesh(new THREE.TorusGeometry(.30,.085,16,48),orange);ring.position.set(-1.45,1.24,-.3);ring.rotation.set(.5,.7,0);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.10}));ground.rotation.x=-Math.PI/2;ground.position.y=-1.72;ground.receiveShadow=true;scene.add(ground);
    let mode=0,manual=false,visible=true,raf=0,last=0,time=0,px=0,py=0,tx=0,ty=0;
    const paused=()=>manual||reduced.matches;
    const targets=[[.2,.25,0],[.05,.40,-.5],[0,.55,0]];
    const desired=new THREE.Vector3();
    function pose(dt=0,instant=false){
      desired.set(...targets[mode]);
      knot.position.lerp(desired,instant?1:1-Math.exp(-dt*4));
      const spin=mode===1?.85:mode===2?-.35:.4;
      group.rotation.y=px*.25;group.rotation.x=py*.12;
      knot.rotation.x=.3+Math.sin(time*.28)*.15;knot.rotation.y=spin+time*.13;
      pencil.rotation.z=mode===1?-.95:mode===2?.2:-.55;
      pencil.position.y=.1+(paused()?0:Math.sin(time*.8)*.14);
      ball.position.y=-.9+(paused()?0:Math.sin(time*.9+1)*.12);
      ball.rotation.y=time*.3;ring.rotation.z=time*.35;ring.position.y=1.24+(paused()?0:Math.sin(time*.7)*.14);
      blocks.rotation.y=mode===1?.2:mode===2?-.8:-.3;
      renderer.render(scene,camera);
    }
    function frame(now){raf=0;if(paused()||!visible||document.hidden){last=0;return;}const dt=last?Math.min((now-last)/1000,.05):0;last=now;time+=dt;px+=(tx-px)*.04;py+=(ty-py)*.04;pose(dt);raf=requestAnimationFrame(frame);}
    function sync(){pause.setAttribute('aria-pressed',String(paused()));pause.textContent=reduced.matches?'Motion off':manual?'Play motion':'Pause motion';pause.disabled=reduced.matches;pause.setAttribute('aria-label',manual?'Play sculpture animation':'Pause sculpture animation');if(!paused()&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(frame);}
    buttons.forEach((b,i)=>b.addEventListener('click',()=>{mode=i;buttons.forEach((button,j)=>button.setAttribute('aria-pressed',String(i===j)));caption.textContent=captions[i];if(paused())pose(0,true);sync();}));
    pause.addEventListener('click',()=>{manual=!manual;sync();});reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
    new ResizeObserver(()=>{const r=world.getBoundingClientRect();if(!r.width||!r.height)return;camera.aspect=r.width/r.height;camera.position.z=r.width<400?11.5:10;camera.updateProjectionMatrix();renderer.setSize(r.width,r.height,false);pose(0,true);world.classList.add('has-webgl');}).observe(world);
    new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();}).observe(world);
    canvas.addEventListener('pointermove',e=>{if(paused())return;const r=canvas.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;});canvas.addEventListener('pointerleave',()=>{tx=0;ty=0;});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();manual=true;world.classList.remove('has-webgl');sync();});
    sync();
  }else{
    pause.hidden=true;
    buttons.forEach((b,i)=>b.addEventListener('click',()=>{buttons.forEach((button,j)=>button.setAttribute('aria-pressed',String(i===j)));caption.textContent=captions[i];world.style.filter=`hue-rotate(${i*18}deg)`;}));
  }
}
