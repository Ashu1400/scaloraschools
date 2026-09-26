import fs from 'node:fs';import vm from 'node:vm';
for(const width of [375,1600])for(const reduced of [false,true]){
 let frame,resize,count=0;const button={events:{},addEventListener(k,f){this.events[k]=f},setAttribute(){}};
 const hero={querySelector:()=>button,classList:{add(){}},addEventListener(){},getBoundingClientRect:()=>({width,height:700,left:0,top:0})};
 const ctx={clearRect(){},setTransform(){},fillText(c,x,y){if(!Number.isFinite(x+y))throw Error('Invalid drawing');count++;}};
 const canvas={closest:()=>hero,getContext:()=>ctx};
 vm.runInNewContext(fs.readFileSync('src/reference-hero.js','utf8'),{document:{querySelector:()=>canvas,hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),ResizeObserver:class{constructor(f){resize=f}observe(){}},IntersectionObserver:class{observe(){}},requestAnimationFrame:f=>{frame=f;return 1},devicePixelRatio:1});
 resize();if(!count)throw Error('Blank background');if(reduced){if(frame)throw Error('Motion despite preference');}else{for(let t=0;t<500;t+=70)frame(t);button.events.click();const n=count;frame(700);if(n!==count)throw Error('Pause failed');}console.log(`${width}px / reduced=${reduced}: background and motion checks passed`);
}
