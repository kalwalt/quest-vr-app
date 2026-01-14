// DEBUG TRAP: If there's an error, show a native Alert

window.onerror = function(message) {
    alert('JS ERROR: ' + message);
};

// Test to check if the JS is loaded
// alert('App Loaded!'); // <--- Uncomment this if you want to verify the JS is running

import './main.css'
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Setup Base
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020); // Dark gray

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 0, 1.6, 3 );

/*let container = document.createElement( 'div' );
document.body.appendChild( container );

let controls = new OrbitControls( camera, container );
controls.target.set( 0, 1.6, 0 );
controls.update();*/
// document.body.innerHTML = "<h1>CIAO MONDO</h1>";
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // <--- ESSENTIAL FOR VR
renderer.xr.setReferenceSpaceType( 'local' );
document.body.appendChild(renderer.domElement);

const sessionInit = {
          requiredFeatures: [ 'hand-tracking' ]
        };

// 2. Add the button to enter VR
document.body.appendChild(VRButton.createButton(renderer, sessionInit));

// 3. Create an object (e.g., an abstract cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc, wireframe: false });
const cube = new THREE.Mesh(geometry, material);
cube.position.z = -3; // 3 meters in front of you
cube.position.y = 1.6; // Eye height
scene.add(cube);

// 4. Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

// 5. Render loop (VR-compatible)
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js') // Note: Vite may require extra configuration for sw.js in the root
  .then(() => console.log('SW registrato'))
  .catch((err) => console.error('SW fallito', err));
}