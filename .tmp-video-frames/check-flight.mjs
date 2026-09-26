import fs from 'node:fs';import vm from 'node:vm';
for(const reduced of [false,true]){
 let frame;const el=()=>({events:{},addEventListener(k,f){this.events[k]=f},setAttribute(k,v){this[k]=v}});
 const pause=el(),launch=el(),hero={querySelector:s=>s==='#ascii-pause'?pause:launch};
 const output={...el(),closest:()=>hero};
 const pixels=new Uint8ClampedArray(110*57*4);for(let i=0;i<pixels.length;i+=4){pixels[i]=150;pixels[i+3]=255;}
 const ctx={clearRect(){},beginPath(){},moveTo(x,y){if(!Number.isFinite(x+y))throw Error('Projection invalid')},lineTo(x,y){this.moveTo(x,y)},closePath(){},fill(){},stroke(){},getImageData:()=>({data:pixels})};
 vm.runInNewContext(fs.readFileSync('src/ascii-hero.js','utf8'),{document:{querySelector:()=>output,createElement:()=>({getContext:()=>ctx}),hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),IntersectionObserver:class{observe(){}},requestAnimationFrame:f=>{frame=f;return 1}});
 const lines=output.textContent.split('\n');if(lines.length!==57||lines.some(l=>l.length!==110))throw Error('Grid invalid');
 if(reduced){if(frame||!launch.disabled)throw Error('Reduced motion failed')}
 else{launch.events.click();for(let t=0;t<3000;t+=70)frame(t);pause.events.click();const before=output.textContent;frame(3200);if(before!==output.textContent||!launch.disabled)throw Error('Pause failed');}
 console.log(`ASCII dimensions, projection, launch and pause controls; reduced motion=${reduced}: passed`);
}
