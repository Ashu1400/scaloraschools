const canvas=document.querySelector('#reference-ascii-background');
if(canvas){
 const hero=canvas.closest('.reference-hero'),ctx=canvas.getContext('2d'),button=hero.querySelector('.reference-pause');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let w=0,h=0,time=0,last=0,paint=0,raf=0,visible=true,manual=false,mx=0,my=0,tx=0,ty=0;
 const paused=()=>manual||reduced.matches;
 function draw(){
  if(!ctx||!w||!h)return;ctx.clearRect(0,0,w,h);
  const mobile=w<650,columns=mobile?110:225,rows=48;
  ctx.font=`${mobile?5.5:8}px "Courier New",monospace`;ctx.textAlign='center';
  const t=time*.00016;
  // A folded field of characters, travelling from a distant ridge to the foreground.
  for(let row=0;row<rows;row++){
   const depth=row/(rows-1),z=depth*4.5;
   for(let col=0;col<columns;col++){
    const u=col/(columns-1),x=(u-.5)*2;
    const ridge=Math.exp(-Math.pow((x-.05-Math.sin(t*.5)*.07)/.40,2));
    const roll=Math.sin(x*6+z*.8+t)*.35+Math.cos(x*10-z*.5-t*.7)*.15;
    const px=w*(.5+x*(.55+depth*.09))+mx*depth*12;
    const py=h*.89+depth*h*.20-ridge*h*.18+roll*(22+depth*33)+my*depth*9;
    if(py>h+8||px<0||px>w)continue;
    const shade=Math.min(.48,.15+depth*.22+Math.max(0,roll)*.14);
    ctx.fillStyle=`rgba(67,112,87,${shade})`;
    const pattern=(col+row*3)%13;
    ctx.fillText(pattern===0?'+':pattern<3?':':pattern===7?'=':'.',px,py);
   }
  }
  // Airy contour ribbons frame the composition, leaving its centre clear.
  for(const side of [-1,1]){
   for(let band=0;band<10;band++)for(let i=0;i<115;i++){
    const u=i/114,angle=u*Math.PI*1.3+t*.12;
    const x=w*(side<0?.10:.91)+Math.sin(angle+band*.055)*w*.13*side+mx*7;
    const y=h*(.34+u*.52)+Math.cos(angle*2+t)*h*.032+band*3;
    if(x<w*.27||x>w*.77){ctx.fillStyle=`rgba(91,132,108,${.045+band*.005})`;ctx.fillText(i%17===0?'+':'.',x,y);}
   }
  }
  hero.classList.add('has-ascii-background');
 }
 function tick(now){raf=0;if(paused()||!visible||document.hidden){last=0;return;}const dt=last?Math.min(80,now-last):0;last=now;time+=dt;mx+=(tx-mx)*.04;my+=(ty-my)*.04;if(now-paint>55){draw();paint=now;}raf=requestAnimationFrame(tick);}
 function sync(){button.textContent=reduced.matches?'Motion off':manual?'Play motion':'Pause motion';button.disabled=reduced.matches;button.setAttribute('aria-pressed',String(paused()));if(!paused()&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(tick);}
 if(ctx){
  new ResizeObserver(()=>{const r=hero.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);draw();sync();}).observe(hero);
  new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();}).observe(hero);
  button.addEventListener('click',()=>{manual=!manual;sync();});reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  hero.addEventListener('pointermove',e=>{if(paused())return;const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;});hero.addEventListener('pointerleave',()=>{tx=0;ty=0;});sync();
 }else button.hidden=true;
}
