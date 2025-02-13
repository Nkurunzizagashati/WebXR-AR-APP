import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/Addons.js';

let hitTestSource = null;

let hitTestSourceRequested = false;

const scene = new THREE.Scene();

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const material = new THREE.MeshStandardMaterial({
// 	color: 0xffffff * Math.random(),
// });

// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0, 0, -2);

// scene.add(cube);

let reticle = new THREE.Mesh(
	new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
	new THREE.MeshStandardMaterial({ color: 0xffffff * Math.random() })
);

reticle.visible = false;
reticle.matrixAutoUpdate = false;

scene.add(reticle);

const light = new THREE.AmbientLight(0xffffff, 1.0);

scene.add(light);

const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	1000
);

camera.position.set(0, 2, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.xr.enabled = true;

document.body.appendChild(renderer.domElement);
document.body.appendChild(
	ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] })
);

renderer.setAnimationLoop(render);

function render() {
	// cube.rotation.y += 0.01;
	renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(window.devicePixelRatio);
});
