import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // Bigger cube
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, -0.5, -1); // Move it lower & closer
scene.add(cube);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(1, 1, 1);
scene.add(light, directionalLight);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
}); // Transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// AR Button
document.body.appendChild(
	ARButton.createButton(renderer, {
		requiredFeatures: ['local-floor'],
	})
);

// Animation Loop
renderer.setAnimationLoop(() => {
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
});
