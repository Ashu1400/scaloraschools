// A continuously travelling ASCII landscape. No raster artwork or external assets.
const canvas=document.querySelector('#horizon-art');
if(canvas){
  const ctx=canvas.getContext('2d'),hero=canvas.closest('.horizon-hero');
  const pause=hero.querySelector('.horizon-pause'),wave=hero.querySelector('.horizon-wave');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let w=0,h=0,time=0,last=0,paint=0,raf=0,visible=true,manual=false,mx=0,my=0,tx=0,ty=0,ripple=-10000;
  const paused=()=>manual||reduced.matches;
  function render(){
    if(!ctx||!w||!h)return;ctx.clearRect(0,0,w,h);
    const cols=w<650?100:180,rows=55;
    const step=w/cols;
    ctx.font=`${w<650?5.5:7.5}px "Courier New",monospace`;ctx.textAlign='center';
    const travel=time*.00018;
    // Far rows draw first; near rows expand into an open, winding pathway.
    for(let j=0;j<rows;j++){
      const depth=j/(rows-1),world=depth*7+travel;
      const spread=.27+depth*.85;
      for(let i=0;i<cols;i++){
        const u=i/(cols-1)*2-1;
        const bend=Math.sin(world*.72)*.16;
        const distance=Math.abs(u-bend);
        const path=Math.min(1,Math.max(0,(distance-.12)*5));
        const hills=(Math.sin(u*8+world*1.1)+Math.cos(u*4-world*.7)*.65)*path;
        let x=w*.5+u*w*.63*spread+mx*18*depth;
        const pulseAge=(time-ripple)/1000;
        const ring=Math.exp(-Math.pow((Math.hypot(u*2,depth-.55)-pulseAge*.8)*7,2))*Math.max(0,1-pulseAge/3);
        let y=h*.61+depth*h*.24-hills*(18+depth*42)-ring*27+my*10*depth;
        // Keep a central valley and fine, layered ridges at the edges.
        const ink=(.13+depth*.36)*(.24+path*.76);
        ctx.fillStyle=`rgba(${path>.7?'49,101,79':'101,131,84'},${ink})`;
        const char=path<.15?(i%3?'·':'+'):['.',':','+','*'][Math.min(3,Math.floor((hills+1.65)/3.3*4))];
        if(y<h-110)ctx.fillText(char,x,y);
      }
    }
  }
  function tick(now){raf=0;if(paused()||!visible||document.hidden){last=0;return;}const dt=last?Math.min(now-last,70):0;last=now;time+=dt;mx+=(tx-mx)*.04;my+=(ty-my)*.04;if(now-paint>40){render();paint=now;}raf=requestAnimationFrame(tick);}
  function sync(){pause.textContent=reduced.matches?'Motion off':manual?'Play motion':'Pause motion';pause.disabled=reduced.matches;wave.disabled=paused();pause.setAttribute('aria-pressed',String(paused()));if(!paused()&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(tick);}
  pause.addEventListener('click',()=>{manual=!manual;sync();});wave.addEventListener('click',()=>{if(!paused())ripple=time;});reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  new ResizeObserver(()=>{const r=canvas.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx?.setTransform(d,0,0,d,0,0);render();}).observe(canvas);
  new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();}).observe(canvas);
  hero.addEventListener('pointermove',e=>{if(paused())return;const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;});hero.addEventListener('pointerleave',()=>{tx=0;ty=0;});sync();
}
