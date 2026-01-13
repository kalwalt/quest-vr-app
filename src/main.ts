// DEBUG TRAP: Se c'è un errore, mostra un Alert nativo
//import { Capacitor } from '@capacitor/core';

// AGGIUNGI QUESTA RIGA SUBITO SOTTO:
// Questo "usa" la variabile (zittendo l'errore) e ci dice su che piattaforma siamo
//console.log('Capacitor sta girando su:', Capacitor.getPlatform());

window.onerror = function(message) {
    alert('ERRORE JS: ' + message);
};

// Test per vedere se il JS viene caricato
alert('App Caricata!'); // <--- Togli il commento se vuoi verificare che il JS parta

import './main.css'
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Setup Base
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020); // Grigio scuro

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 0, 1.6, 3 );

/*let container = document.createElement( 'div' );
document.body.appendChild( container );

let controls = new OrbitControls( camera, container );
controls.target.set( 0, 1.6, 0 );
controls.update();*/
document.body.innerHTML = "<h1>CIAO MONDO</h1>";
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // <--- FONDAMENTALE PER IL VR
renderer.xr.setReferenceSpaceType( 'local' );
document.body.appendChild(renderer.domElement);

const sessionInit = {
					requiredFeatures: [ 'hand-tracking' ]
				};

// 2. Aggiungi il bottone per entrare in VR
document.body.appendChild(VRButton.createButton(renderer, sessionInit));

// 3. Creiamo un oggetto (es. un cubo astratto)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc, wireframe: false });
const cube = new THREE.Mesh(geometry, material);
cube.position.z = -3; // 3 metri davanti a te
cube.position.y = 1.6; // Altezza occhi
scene.add(cube);

// 4. Luce
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

// 5. Loop di render (compatibile VR)
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});