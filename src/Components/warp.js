import * as THREE from "three";

export function Warp() {
  //Declare three.js variables
  let camera,
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
  renderer.setSize(window.innerWidth, 0.70 * window.innerHeight);

  function addSphere() {
    // create sphere 500 times
    for (let i = 1; i < 500; i += 1) {
      let geometry = new THREE.SphereGeometry(0.6, 32, 32);
      let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      let sphere = new THREE.Mesh(geometry, material);

      // position the spheres in random locations
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(1000));

      sphere.position.set(x, y, z);

      //add the sphere to the scene and push to array
      scene.add(sphere);
      stars.push(sphere);
    }
  }

  function animateStars() {
    // loop through each star
    for (let i = 0; i < stars.length; i++) {
      let star = stars[i];

      // move stars quickly towards the camera
      star.position.z += 0.8;

      // reposition the star once it has moved enough
      if (star.position.z > 300) star.position.z -= 600;
    }
  }

  function render() {
    requestAnimationFrame(render);

    //render the scene
    renderer.render(scene, camera);
    animateStars();
  }

  // Lighting
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(1, 1, 50);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  // Responsive Window Resizing
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 0.70 * window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize, false);

  addSphere();
  render();
}
