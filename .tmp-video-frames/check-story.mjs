import fs from 'node:fs';import vm from 'node:vm';
for(const width of [375,1440])for(const reduced of [false,true]){
 let resize,frame,draws=0,invalid=0,paused=false;
 const el=()=>({textContent:'',events:{},setAttribute(k,v){this[k]=v},addEventListener(k,f){this.events[k]=f}});
 const chapters=Array.from({length:5},el),title=el(),copy=el(),phase=el(),next=el();
 const ctx={clearRect(){},setTransform(){},fillText(c,x,y){draws++;if(!Number.isFinite(x+y))invalid++}};
 const host={classList:{contains:()=>paused}};
 const canvas={...el(),getContext:()=>ctx,closest:()=>host,getBoundingClientRect:()=>({width,height:width<700?1120:850,left:0,top:0})};
 const elements={'#scalora-ascii':canvas,'.story-title':title,'.story-copy':copy,'.ascii-phase':phase,'.ascii-transform':next};
 vm.runInNewContext(fs.readFileSync('src/ascii-learning.js','utf8'),{document:{querySelector:s=>elements[s],querySelectorAll:()=>chapters,hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),devicePixelRatio:1,ResizeObserver:class{constructor(c){resize=c}observe(){}},IntersectionObserver:class{observe(){}},MutationObserver:class{observe(){}},requestAnimationFrame:f=>{frame=f;return 1}});
 resize();
 for(let i=1;i<5;i++){chapters[i].events.click();if(chapters[i]['aria-pressed']!=='true')throw Error('Chapter selection failed');}
 if(!title.textContent.includes('future of your own'))throw Error('Narration mismatch');
 if(!reduced){for(let t=0;t<11000;t+=60)frame(t);if(!phase.textContent.includes('SCHOOL'))throw Error('Autoplay failed');paused=true;let n=draws;frame(12000);if(n!==draws)throw Error('Pause failed');}
 else if(frame)throw Error('Reduced motion scheduled animation');
 if(invalid||!draws)throw Error('Invalid drawing');
 console.log(`${width}px / reduced motion ${reduced}: chapter controls, captions, rendering and playback passed`);
}
