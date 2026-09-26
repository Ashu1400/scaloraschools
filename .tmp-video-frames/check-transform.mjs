import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync('src/ascii-learning.js','utf8');
for(const width of [375,1440]){
 let callback,resize,draws=0,invalid=0,paused=false,click;
 const phase={textContent:''};
 const ctx={clearRect(){},setTransform(){},fillText(c,x,y){draws++;if(!Number.isFinite(x)||!Number.isFinite(y)||typeof c!=='string')invalid++;}};
 const host={classList:{contains(){return paused;}}};
 const canvas={getContext:()=>ctx,closest:()=>host,getBoundingClientRect:()=>({width,height:900,left:0,top:0}),addEventListener(){}};
 const button={addEventListener(event,fn){click=fn}};
 const sandbox={document:{querySelector:s=>s==='#scalora-ascii'?canvas:s==='.ascii-phase'?phase:button,hidden:false,addEventListener(){}},matchMedia:()=>({matches:false,addEventListener(){}}),devicePixelRatio:2,ResizeObserver:class{constructor(c){resize=c}observe(){}},IntersectionObserver:class{observe(){}},MutationObserver:class{observe(){}},requestAnimationFrame:c=>{callback=c;return 1}};
 vm.runInNewContext(source,sandbox);resize();click();
 if(!phase.textContent.includes('FLIGHT'))throw Error('Transform control failed');
 for(let t=0;t<14000;t+=60)callback(t);
 if(!phase.textContent.includes('IMPOSSIBLE'))throw Error('Automatic transition failed');
 if(invalid||draws<1000)throw Error('Invalid rendering');
 paused=true;const n=draws;callback(15000);if(draws!==n)throw Error('Pause failed');
 console.log(`${width}px: manual transform, automatic transition, finite drawing coordinates, pause: passed`);
}
