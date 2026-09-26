import * as THREE from 'three';import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync('src/playground-hero.js','utf8').replace("import * as THREE from 'three';",'');
for(const reduced of [false,true])for(const fallback of [false,true]){
 let resize,frame,renders=0;const element=()=>({events:{},setAttribute(k,v){this[k]=v},addEventListener(k,f){this.events[k]=f}});
 const pause=element(),buttons=[element(),element(),element()],caption=element();
 const hero={querySelector:s=>s==='.play-pause'?pause:caption,querySelectorAll:()=>buttons};
 const world={style:{},classList:{add(){},remove(){}},getBoundingClientRect:()=>({width:500,height:550})};
 const canvas={...element(),closest:s=>s==='.play-world'?world:hero};
 class Renderer{constructor(){if(fallback)throw Error('No WebGL');this.shadowMap={}}setPixelRatio(){}setClearColor(){}setSize(){}render(scene,camera){scene.updateMatrixWorld();if(!camera.projectionMatrix.elements.every(Number.isFinite))throw Error('Camera invalid');scene.traverse(o=>{if(!o.matrixWorld.elements.every(Number.isFinite))throw Error('Object transform invalid')});renders++;}}
 vm.runInNewContext(source,{THREE:{...THREE,WebGLRenderer:Renderer},document:{querySelector:()=>canvas,hidden:false,addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),devicePixelRatio:1,ResizeObserver:class{constructor(c){resize=c}observe(){}},IntersectionObserver:class{observe(){}},requestAnimationFrame:f=>{frame=f;return 1}});
 if(!fallback)resize();
 buttons[1].events.click();if(!caption.textContent.includes('Make it better')||buttons[1]['aria-pressed']!=='true')throw Error('Mode failed');
 if(!fallback&&!reduced){for(let t=0;t<1000;t+=40)frame(t);pause.events.click();const n=renders;frame(1100);if(n!==renders)throw Error('Pause failed');}
 if(!fallback&&reduced&&frame)throw Error('Reduced motion scheduled animation');
 console.log(`Reduced motion=${reduced}, WebGL fallback=${fallback}: mode controls, geometry transforms, playback passed`);
}
