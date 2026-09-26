import fs from 'node:fs';import vm from 'node:vm';
for(const reduced of [false,true]){
 let load,resize,frame,draws=0;
 const el=()=>({events:{},addEventListener(k,f){this.events[k]=f},setAttribute(k,v){this[k]=v}});
 const pause=el(),rebuild=el();const lab={classList:{add(){}},querySelector:s=>s==='.robot-pause'?pause:rebuild};
 const ctx={clearRect(){},setTransform(){},fillText(c,x,y){if(!Number.isFinite(x+y))throw Error('Invalid coordinates');draws++}};
 const canvas={...el(),closest:()=>lab,getContext:()=>ctx,getBoundingClientRect:()=>({width:500,height:480})};
 const sc={drawImage(){},getImageData:()=>({data:new Uint8ClampedArray(150*181*4).fill(30)})};
 vm.runInNewContext(fs.readFileSync('src/ascii-learning.js','utf8'),{document:{querySelector:()=>canvas,createElement:()=>({getContext:()=>sc}),hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),Image:class{set src(v){load=()=>this.onload()}},ResizeObserver:class{constructor(c){resize=c}observe(){}},IntersectionObserver:class{observe(){}},requestAnimationFrame:f=>{frame=f;return 1},devicePixelRatio:1});
 resize();load();if(draws===0)throw Error('Image rendering failed');
 if(reduced){if(frame||!rebuild.disabled)throw Error('Reduced motion failed')}
 else {rebuild.events.click();for(let t=0;t<2000;t+=50)frame(t);pause.events.click();let n=draws;frame(2200);if(n!==draws||!rebuild.disabled)throw Error('Pause failed');}
 console.log(`Source rendering, controls and reduced motion=${reduced}: passed`);
}
