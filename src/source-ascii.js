import frames from './data/education-ascii.json';
const output=document.querySelector('#source-ascii-frame');
if(output){
 const gallery=output.closest('.source-ascii-gallery');
 const art=gallery.querySelector('#source-ascii-art'),label=gallery.querySelector('#source-ascii-label');
 const pause=gallery.querySelector('#source-ascii-pause'),choices=gallery.querySelector('.source-ascii-choices');
 const buttons=[...choices.querySelectorAll('button')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const descriptions=['People collaborating on development projects','Books and a magnifying glass representing research','People coordinating resources and teams','A lightbulb growing from tree roots representing innovation'];
 let index=0,source=frames[0].text,target=source,progress=1,elapsed=0,last=0,lastPaint=0,raf=0,manual=false,visible=true;
 const paused=()=>manual||reduced.matches;
 function finish(){output.textContent=target;progress=1;}
 function select(n){
   if(n===index)return;
   source=output.textContent;index=n;target=frames[n].text;progress=paused()?1:0;elapsed=0;
   label.textContent=frames[n].label;art.setAttribute('aria-label',`ASCII artwork: ${descriptions[n]}`);
   buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===n)));
   if(paused())finish();sync();
 }
 function render(){
   if(progress>=1){finish();return;}
   let text='';for(let i=0;i<target.length;i++)text+=target[i]==='\n'?'\n':((i*37%997)/997<progress?target[i]:source[i]);
   output.textContent=text;
 }
 function tick(now){
   raf=0;if(paused()||!visible||document.hidden){last=0;return;}
   const dt=last?Math.min(now-last,100):0;last=now;elapsed+=dt;
   if(progress<1){progress=Math.min(1,progress+dt/850);if(now-lastPaint>60){render();lastPaint=now;}}
   else if(elapsed>=5000)select((index+1)%frames.length);
   if(!raf)raf=requestAnimationFrame(tick);
 }
 function sync(){
   pause.textContent=reduced.matches?'Reduced motion':manual?'Play animation':'Pause animation';pause.disabled=reduced.matches;pause.setAttribute('aria-pressed',String(paused()));
   if(paused())finish();else if(visible&&!document.hidden&&!raf)raf=requestAnimationFrame(tick);
 }
 buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i)));
 pause.addEventListener('click',()=>{manual=!manual;sync();});reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
 new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();}).observe(gallery);
 pause.hidden=false;choices.hidden=false;sync();
}
