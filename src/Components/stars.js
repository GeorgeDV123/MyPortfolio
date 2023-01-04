import * as THREE from "three";

export function Stars() {
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

  camera.position.setZ(50);

  //init scene
  scene = new THREE.Scene();

  //init renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg2"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight );

  function addSphere() {
    // create sphere 1000 times
    for (var i = 1; i < 1000; i += 1) {
      var geometry = new THREE.SphereGeometry(0.3, 32, 32);
      var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      var sphere = new THREE.Mesh(geometry, material);

      // position the spheres in random locations 
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(600));

      sphere.position.set(x, y, z);

      //add the sphere to the scene
      scene.add(sphere);

      //push each sphere to the stars array
      stars.push(sphere);
    }
  }

  function animateStars() {
    // loop through each star
    for (var i = 0; i < stars.length; i++) {
      let star = stars[i];

      // make starts slowly move down the screen
      star.position.y += 0.1;

      // reposition the star once it has moved enough
      if (star.position.y > 300) star.position.y -= 600;
    }
  }

  function render() {
    requestAnimationFrame(render);

    //render the scene
    renderer.render(scene, camera);
    animateStars();
  }

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(1, 1, -10);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize, false);

  addSphere();
  render();
}
