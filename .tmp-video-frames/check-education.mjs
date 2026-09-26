import fs from 'node:fs';import vm from 'node:vm';
for(const reduced of [false,true]){
 let frame;const el=()=>({events:{},addEventListener(k,f){this.events[k]=f},setAttribute(k,v){this[k]=v}});
 const pause=el(),label=el(),hero={querySelector:s=>s==='#ascii-pause'?pause:label};const output={...el(),closest:()=>hero};
 const data=new Uint8ClampedArray(110*65*4).fill(180);
 const ctx={clearRect(){},beginPath(){},moveTo(){},lineTo(){},closePath(){},fill(){},stroke(){},ellipse(){},getImageData:()=>({data})};
 vm.runInNewContext(fs.readFileSync('src/ascii-hero.js','utf8'),{document:{querySelector:()=>output,createElement:()=>({getContext:()=>ctx}),hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),IntersectionObserver:class{observe(){}},requestAnimationFrame:f=>{frame=f;return 1}});
 const seen=new Set([label.textContent]);
 if(!reduced){for(let t=0;t<29000;t+=70){frame(t);seen.add(label.textContent);}if(seen.size!==5)throw Error('Missing scene');pause.events.click();let snapshot=output.textContent;frame(30000);if(snapshot!==output.textContent)throw Error('Pause failed');}else if(frame)throw Error('Reduced motion failed');
 if(output.textContent.split('\n').length!==65)throw Error('Invalid grid');
 console.log(`Reduced motion=${reduced}; scenes: ${[...seen].join(', ')}; grid and pause passed`);
}
const html=fs.readFileSync('index.html','utf8');if(/class="ascii-(principles|utility|eyebrow|audience|flight-label)"/.test(html))throw Error('Removed labels remain');
