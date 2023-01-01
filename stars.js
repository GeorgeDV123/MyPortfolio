import * as THREE from 'three'
import { Sphere } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//Declare three.js variables
var camera,
  scene,
  renderer,
  stars = [];

  //camera
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
 
  camera.position.setZ(50);
 

  //scene
  scene = new THREE.Scene();

  //renderer
  renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg2'),
});
  //set the size of the renderer
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);


function addSphere() {
  // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
  for (var i = 1; i < 1000; i += 1) {
    // Make a sphere (exactly the same as before).
    var geometry = new THREE.SphereGeometry(0.3, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var sphere = new THREE.Mesh(geometry, material);

    // This time we give the sphere random x and y positions between -500 and 500
    const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(600));

  sphere.position.set(x, y, z);

    //add the sphere to the scene
    scene.add(sphere);

    //finally push it to the stars array
    stars.push(sphere);
  }
}

function animateStars() {
  // loop through each star
  for (var i = 0; i < stars.length; i++) {
    let star = stars[i];

    // and move it forward dependent on the mouseY position.
    star.position.y += 0.1;

    // if the particle is too close move it to the back
    if (star.position.y > 300) star.position.y -= 600;
  }
}

function render() {
  //get the frame
  
  requestAnimationFrame(render);

  //render the scene
  renderer.render(scene, camera);
  animateStars();
  //animateSVG();
  sun.rotation.x += 0.001;
  sun.rotation.y += 0.002;

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.001;
  moon.rotation.z += 0.001;



}


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, -10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const sunTexture = new THREE.TextureLoader().load('/imgs/sun.jpg');  
const sunMap = new THREE.TextureLoader().load('/imgs/normalMap.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(18, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    //normalMap: sunMap,
  }),
);

scene.add(sun)

sun.position.x = 0
sun.position.y = 0
sun.position.z = -30

//////////////////








function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize, false );





addSphere();
render();


//const controls = new OrbitControls(camera, renderer.domElement);

