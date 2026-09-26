import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

export function initAsciiArt(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let camera, scene, renderer, effect;
    let mesh;
    const start = Date.now();

    init();
    animate();

    function init() {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || 400; // default height if not full screen

        camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
        camera.position.y = 150;
        camera.position.z = 500;

        scene = new THREE.Scene();
        // background will be handled by css

        const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
        pointLight1.position.set(500, 500, 500);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
        pointLight2.position.set(-500, -500, -500);
        scene.add(pointLight2);

        // A cool complex shape (Torus Knot)
        mesh = new THREE.Mesh(
            new THREE.TorusKnotGeometry(120, 40, 100, 16),
            new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
        );
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);

        // Characters from dark to light
        effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true, alpha: true });
        effect.setSize(width, height);
        effect.domElement.style.color = '#175dd3'; // Scalora Blue
        effect.domElement.style.backgroundColor = 'transparent';
        effect.domElement.style.pointerEvents = 'none'; // so it doesn't block clicks

        container.appendChild(effect.domElement);

        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || 400;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        effect.setSize(width, height);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        const timer = Date.now() - start;

        mesh.rotation.x = timer * 0.0003;
        mesh.rotation.y = timer * 0.0004;
        mesh.rotation.z = timer * 0.0002;

        effect.render(scene, camera);
    }
}
