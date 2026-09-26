// Seven education scenes, rasterized locally and displayed entirely as ASCII text.
const output=document.querySelector('#ascii-aircraft');
if(output){
 const hero=output.closest('.ascii-hero'),pause=hero.querySelector('#ascii-pause'),label=hero.querySelector('#ascii-scene-name');
 const loader=document.querySelector('#loader-ascii'),loaderLabel=document.querySelector('#loader-scene-name'),preloader=document.querySelector('#global-preloader');
 let loaderActive=Boolean(loader&&preloader&&!preloader.classList.contains('fade-out'));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const W=110,H=65,raster=document.createElement('canvas');raster.width=W;raster.height=H;
 const ctx=raster.getContext('2d',{willReadFrequently:true});
 if(ctx){
  // Coordinates use a 100-by-100 drawing area for consistent scale across scenes.
  const point=(x,y)=>[x*W/100,y*H/100];
  function polygon(points,fill=100){ctx.beginPath();points.forEach(([x,y],i)=>{const p=point(x,y);i?ctx.lineTo(...p):ctx.moveTo(...p)});ctx.closePath();ctx.fillStyle=`rgb(${fill},${fill},${fill})`;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();}
  function line(points,width=1){ctx.beginPath();points.forEach(([x,y],i)=>{const p=point(x,y);i?ctx.lineTo(...p):ctx.moveTo(...p)});ctx.strokeStyle='#fff';ctx.lineWidth=width;ctx.stroke();}
  function box(x,y,w,h,fill=80){polygon([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],fill);}
  function ellipse(x,y,rx,ry,fill=0){ctx.beginPath();ctx.ellipse(x*W/100,y*H/100,rx*W/100,ry*H/100,0,0,Math.PI*2);ctx.fillStyle=`rgb(${fill},${fill},${fill})`;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.2;ctx.stroke();}
  const scenes=[
   {name:'Education',draw(){polygon([[15,27],[49,36],[49,81],[15,71]],95);polygon([[49,36],[85,25],[85,70],[49,81]],170);line([[11,30],[11,77],[49,88],[90,76],[90,28]]);for(let y=40;y<69;y+=7){line([[21,y],[42,y+5]],.8);line([[56,y+2],[78,y-5]],.8);}}},
   {name:'Ideas & innovation',draw(){ellipse(50,39,20,24,65);polygon([[37,55],[63,55],[59,72],[41,72]],90);box(42,72,16,8,140);line([[45,85],[55,85]],1.4);line([[45,68],[44,44],[50,49],[56,44],[55,68]],1);for(let i=0;i<9;i++){const a=Math.PI+i*Math.PI/8;line([[50+Math.cos(a)*28,39+Math.sin(a)*33],[50+Math.cos(a)*35,39+Math.sin(a)*41]],1.3);}}},
   {name:'Learning',draw(){polygon([[12,37],[50,17],[89,37],[50,58]],145);polygon([[27,46],[50,58],[73,46],[73,65],[50,77],[27,65]],85);line([[82,41],[82,72]],1.5);ellipse(82,76,3,5,210);line([[29,66],[50,80],[72,67]],1);}},
   {name:'Schools',draw(){box(19,40,63,42,65);polygon([[13,40],[50,15],[88,40]],145);box(44,60,13,22,0);for(let x=25;x<=69;x+=15){box(x,48,7,8,180);if(x<40||x>58)box(x,65,7,8,180);}ellipse(50,30,5,6,0);line([[50,27],[50,31],[53,31]]);line([[50,15],[50,5],[65,10],[50,14]],1);line([[13,86],[88,86]],1.5);}},
   {name:'STEM & innovation',draw(){for(const angle of [0,Math.PI/3,-Math.PI/3]){const pts=[];for(let t=0;t<=Math.PI*2+.05;t+=.06){const x=Math.cos(t)*34,y=Math.sin(t)*12;pts.push([50+x*Math.cos(angle)-y*Math.sin(angle),50+x*Math.sin(angle)+y*Math.cos(angle)]);}line(pts,1);}ellipse(50,50,6,8,190);ellipse(83,48,3,4,220);ellipse(34,20,3,4,220);ellipse(32,78,3,4,220);}},
   {name:'Scalora',draw(){polygon([[31,16],[78,16],[69,30],[35,30],[29,41],[65,41],[80,55],[65,84],[19,84],[28,70],[61,70],[67,58],[32,58],[17,43]],145);line([[34,20],[72,20],[66,26]],.8);line([[26,76],[60,76],[73,55],[62,46]],1);}},
   {name:'Innovation ecosystem',draw(){const nodes=[[50,48],[26,22],[75,20],[86,58],[66,82],[28,81],[13,49]];for(let i=1;i<nodes.length;i++){line([nodes[0],nodes[i]],.8);line([nodes[i],nodes[i===6?1:i+1]],.7);}nodes.forEach(([x,y],i)=>ellipse(x,y,i?5:9,i?7:12,i?110:200));}}
  ];
  const maps=scenes.map(scene=>{ctx.clearRect(0,0,W,H);scene.draw();const rgba=ctx.getImageData(0,0,W,H).data;return Float32Array.from({length:W*H},(_,i)=>rgba[i*4]*rgba[i*4+3]/65025);});
  let clock=0,last=0,paint=0,raf=0,visible=true,manual=false;
  const paused=()=>manual||reduced.matches;
  function draw(){
   const chapter=Math.floor(clock/3000)%scenes.length,part=clock%3000;
   const blend=part<1700?0:(part-1700)/1300,next=(chapter+1)%scenes.length;
   label.textContent=scenes[blend>.5?next:chapter].name;
   if(loaderActive&&loaderLabel)loaderLabel.textContent=label.textContent;
   const ramp=' .:+=*#%@',rows=[];
   for(let y=0;y<H;y++){let row='';for(let x=0;x<W;x++){
     const i=y*W+x;
     // Stable per-character thresholds dissolve the previous form into the next.
     const threshold=((x*37+y*61)%101)/100;
     const amount=blend>threshold?maps[next][i]:maps[chapter][i];
     row+=amount>.025?ramp[Math.max(1,Math.min(8,Math.ceil(amount*8)))]: ' ';
   }rows.push(row);}output.textContent=rows.join('\n');
   if(loaderActive)loader.textContent=output.textContent;
  }
  function frame(now){raf=0;if(paused()||(!visible&&!loaderActive)||document.hidden){last=0;return;}const dt=last?Math.min(now-last,70):0;last=now;clock+=dt;if(now-paint>75){draw();paint=now;}raf=requestAnimationFrame(frame);}
  function sync(){pause.textContent=reduced.matches?'Motion off':manual?'Play animation':'Pause animation';pause.disabled=reduced.matches;pause.setAttribute('aria-pressed',String(paused()));if(paused()){clock=Math.round(clock/3000)*3000;draw();}else if((visible||loaderActive)&&!document.hidden&&!raf)raf=requestAnimationFrame(frame);}
  pause.addEventListener('click',()=>{manual=!manual;sync();});reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();}).observe(output);
  if(preloader&&loader)new MutationObserver(()=>{loaderActive=!preloader.classList.contains('fade-out')&&preloader.style.display!=='none';sync();}).observe(preloader,{attributes:true,attributeFilter:['class','style']});
  draw();sync();
 }else{pause.hidden=true;}
}
