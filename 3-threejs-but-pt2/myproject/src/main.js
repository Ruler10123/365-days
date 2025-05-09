import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(10, 2, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

let frame = 0;
let tubularSegments = 16;
let increasing = true;

let p = 2
let pInc = true;

let q = 2
let qInc = true;


function animate() {
  requestAnimationFrame(animate);
  frame++;

  if (frame % 3 === 0) {
    if (increasing) {
      tubularSegments++;
      if (tubularSegments > 100) increasing = false;
    } else {
      tubularSegments--;
      if (tubularSegments < 1) increasing = true;
    }
  
    if (frame % 10 === 0) {
      if (pInc) {
        p++;
        if (p > 15) pInc = false;
      } else {
        p--;
        if (p < 2) pInc = true;
      }
    }

    if (frame % 7 === 0) {
      if (qInc) {
        q++;
        if (q > 20) qInc = false;
      } else {
        q--;
        if (q < 2) qInc = true;
      }
    }

    // dispose of old geometry to free memory
    torus.geometry.dispose();
  
    // create and assign new geometry with updated radialSegments
    torus.geometry = new THREE.TorusKnotGeometry(10, 1.5, tubularSegments, 16, p, q);
  }

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();