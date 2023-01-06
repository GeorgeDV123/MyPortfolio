import * as THREE from "three";

export function Warp() {
  //Declare three.js variables
  var camera,
    scene,
    renderer,
    stars = [];

  //init camera
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.setZ(45);

  //init scene
  scene = new THREE.Scene();

  //init renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg3"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, 0.5 * window.innerHeight);

  function addSphere() {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for (var i = 1; i < 500; i += 1) {
      // Make a sphere (exactly the same as before).
      var geometry = new THREE.SphereGeometry(0.6, 32, 32);
      var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      var sphere = new THREE.Mesh(geometry, material);

      // This time we give the sphere random x and y positions between -500 and 500
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(1000));

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
      star.position.z += 2.2;

      // if the particle is too close move it to the back
      if (star.position.z > 300) star.position.z -= 600;
    }
  }

  function render() {
    //get the frame

    requestAnimationFrame(render);

    //render the scene
    renderer.render(scene, camera);
    animateStars();
  }

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(1, 1, 50);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 0.5 * window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize, false);

  addSphere();
  render();

}
