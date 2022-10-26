//use ctrl c to stop the program running and gain control of the console
//ThreeJS is a Y-up platform
//use f12 on website to debug
//use "npm init -y" to create package.json
//use "npm i parcel" to create node-modules
//use "npm install three" to install threejs library
//to run type "parcel ./src/index.html"

import * as THREE from "three"
import { Mesh, MeshBasicMaterial, PerspectiveCamera, ShaderMaterial, SphereGeometry } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'



//#region setup
var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1,1000);
camera.position.set(-10,30,30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
scene.add(camera);



//#endregion

const uniforms = {

    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2(width, height).multiplyScalar(window.devicePixelRatio) }

}
const sphereGeo = new SphereGeometry(5, 20, 20);
const sphereMaterial = new THREE.ShaderMaterial( {

	uniforms,

	vertexShader: document.getElementById( 'vertexShader1' ).textContent,

	fragmentShader: document.getElementById( 'fragmentShader1' ).textContent

} );
const sphere = new Mesh(sphereGeo, sphereMaterial);
sphereMaterial.wireframe = true;
scene.add(sphere);

const torusGeo = new THREE.TorusGeometry(10, 5, 40, 40);
const torusMat = new ShaderMaterial({uniforms, vertexShader: document.getElementById('vertexShader2').textContent, fragmentShader: document.getElementById('fragmentShader2').textContent});
const torus = new Mesh(torusGeo, torusMat);
scene.add(torus);

const clock = new THREE.Clock();
function animate(time){

    uniforms.time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);