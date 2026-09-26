import fs from 'node:fs';import vm from 'node:vm';
for(const reduced of [false,true]){
 let frame,mutation,hidden=false;const el=()=>({events:{},addEventListener(k,f){this.events[k]=f},setAttribute(k,v){this[k]=v}});
 const pause=el(),label=el(),loader=el(),loaderLabel=el();const preloader={style:{},classList:{contains:()=>hidden}};
 const hero={querySelector:s=>s==='#ascii-pause'?pause:label},output={...el(),closest:()=>hero};
 const ctx={clearRect(){},beginPath(){},moveTo(){},lineTo(){},closePath(){},fill(){},stroke(){},ellipse(){},getImageData:()=>({data:new Uint8ClampedArray(110*65*4).fill(180)})};
 vm.runInNewContext(fs.readFileSync('src/ascii-hero.js','utf8'),{document:{querySelector:s=>({'#ascii-aircraft':output,'#loader-ascii':loader,'#loader-scene-name':loaderLabel,'#global-preloader':preloader}[s]),createElement:()=>({getContext:()=>ctx}),hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),IntersectionObserver:class{observe(){}},MutationObserver:class{constructor(f){mutation=f}observe(){}},requestAnimationFrame:f=>{frame=f;return 1}});
 const seen=new Set([label.textContent]);if(!reduced){for(let t=0;t<22000;t+=60){frame(t);seen.add(label.textContent);if(loader.textContent!==output.textContent)throw Error('Loader mismatch');}if(seen.size!==7)throw Error('Missing scene');hidden=true;mutation();const old=loader.textContent;frame(22500);if(loader.textContent!==old)throw Error('Hidden loader updated');pause.events.click();const before=output.textContent;frame(23000);if(output.textContent!==before)throw Error('Pause failed');}else if(frame)throw Error('Reduced motion scheduled frames');
 console.log(`reduced=${reduced}: ${seen.size} scene(s), loader sync, playback passed`);
}
