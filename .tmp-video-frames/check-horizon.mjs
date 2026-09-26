import fs from 'node:fs';import vm from 'node:vm';
for(const width of [375,1440])for(const reduced of [false,true]){
 let resize,frame,n=0;const el=()=>({events:{},addEventListener(k,f){this.events[k]=f},setAttribute(k,v){this[k]=v}});
 const pause=el(),wave=el();const hero={...el(),querySelector:s=>s==='.horizon-pause'?pause:wave};
 const ctx={clearRect(){},setTransform(){},fillText(c,x,y){if(typeof c!=='string'||!Number.isFinite(x+y))throw Error('Invalid draw');n++;}};
 const canvas={closest:()=>hero,getContext:()=>ctx,getBoundingClientRect:()=>({width,height:880})};
 vm.runInNewContext(fs.readFileSync('src/ascii-learning.js','utf8'),{document:{querySelector:()=>canvas,hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),ResizeObserver:class{constructor(c){resize=c}observe(){}},IntersectionObserver:class{observe(){}},requestAnimationFrame:f=>{frame=f;return 1},devicePixelRatio:1});
 resize();if(!n)throw Error('Static frame missing');
 if(reduced){if(frame||!wave.disabled)throw Error('Reduced motion failed');}
 else{wave.events.click();for(let t=0;t<2500;t+=50)frame(t);pause.events.click();const before=n;frame(2600);if(before!==n||!wave.disabled)throw Error('Pause failed');}
 console.log(`${width}px, reduced motion=${reduced}: rendering, ripple control, and pause checks passed`);
}
