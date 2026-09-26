import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('src/ascii-learning.js','utf8');
for (const width of [320,580]) {
 let callback,resize,draws=0,invalid=0,paused=false;
 const ctx={clearRect(){},setTransform(){},fillText(c,x,y){draws++; if(!Number.isFinite(x)||!Number.isFinite(y)) invalid++;}};
 const host={classList:{contains(){return paused;}}};
 const canvas={getContext:()=>ctx,closest:()=>host,getBoundingClientRect:()=>({width,height:width/1.08,left:0,top:0}),addEventListener(){}};
 const sandbox={document:{querySelector:()=>canvas,hidden:false,addEventListener(){}},matchMedia:()=>({matches:false,addEventListener(){}}),devicePixelRatio:2,ResizeObserver:class{constructor(c){resize=c}observe(){}},IntersectionObserver:class{observe(){}},MutationObserver:class{observe(){}},requestAnimationFrame:c=>{callback=c;return 1}};
 vm.runInNewContext(source,sandbox);resize();
 for(let t=0;t<23000;t+=50) callback(t);
 if(invalid||draws<1000) throw Error('Invalid frame output');
 paused=true; const before=draws;callback(24000);if(draws!==before)throw Error('Pause failed');
 console.log(`${width}px: full morph cycle produced valid coordinates; pause stopped rendering.`);
}
