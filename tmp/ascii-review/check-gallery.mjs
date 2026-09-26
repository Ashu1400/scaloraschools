import fs from 'node:fs';import vm from 'node:vm';
const frames=JSON.parse(fs.readFileSync('src/data/education-ascii.json','utf8'));
for(const f of frames){const lines=f.text.split('\n');if(lines.length!==66||lines.some(l=>l.length!==144)||!/[#@A-Z]/.test(f.text))throw Error('Bad frame '+f.label);}
for(const reduced of [false,true]){
 let callback;const element=()=>({events:{},setAttribute(k,v){this[k]=v},addEventListener(k,f){this.events[k]=f}});
 const pause=element(),art=element(),label=element(),buttons=frames.map(element),choices={querySelectorAll:()=>buttons};
 const gallery={querySelector:s=>({'#source-ascii-art':art,'#source-ascii-label':label,'#source-ascii-pause':pause,'.source-ascii-choices':choices}[s])};
 const output={textContent:frames[0].text,closest:()=>gallery};
 vm.runInNewContext(fs.readFileSync('src/source-ascii.js','utf8').replace("import frames from './data/education-ascii.json';",''),{frames,document:{querySelector:()=>output,hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),IntersectionObserver:class{observe(){}},requestAnimationFrame:f=>{callback=f;return 1}});
 if(reduced){if(callback)throw Error('Motion unexpectedly scheduled');buttons[3].events.click();if(output.textContent!==frames[3].text)throw Error('Static selection failed');}
 else{const seen=new Set([frames[0].label]);for(let t=0;t<22000;t+=70){callback(t);if(label.textContent)seen.add(label.textContent);}if(seen.size!==4)throw Error('Cycle incomplete');pause.events.click();const before=output.textContent;callback(22500);if(output.textContent!==before)throw Error('Pause failed');buttons[2].events.click();if(output.textContent!==frames[2].text)throw Error('Paused selection failed');}
 console.log(`Four source frames, cycling/selection, reduced motion=${reduced}: passed`);
}
if(fs.readFileSync('index.html','utf8').includes('id="global-preloader"'))throw Error('Loader reintroduced');
