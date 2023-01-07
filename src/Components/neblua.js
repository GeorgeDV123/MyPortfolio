import * as THREE from "three";
import * as POSTPROCESSING from "postprocessing";

let scene,
  camera,
  renderer,
  cloudGeo,
  cloudMaterial,
  cloudParticles = [],
  composer;

function init() {
  //init camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;

  //init lights
  let ambient = new THREE.AmbientLight("#403f3f", 0.1);
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight("#F56EB3");
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  let pinkLight = new THREE.PointLight("#ab1ccb", 50, 450, 3);
  pinkLight.position.set(200, 300, 100);
  scene.add(pinkLight);
  let cyanLight = new THREE.PointLight("#4b96b1", 50, 400, 0.5);
  cyanLight.position.set(-100, 200, 300);
  scene.add(cyanLight);
  let purpleLight = new THREE.PointLight("#460C68", 50, 550, 1.5);
  purpleLight.position.set(300, 300, 200);
  scene.add(purpleLight);

  //init renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.fog = new THREE.FogExp2("#460C68", 0.0001);
  renderer.setClearColor(scene.fog.color);

  // cloud particles
  let loader = new THREE.TextureLoader();
  loader.load("/imgs/smoke.png", function (texture) {
    cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
    });

    // loop for 50 clouds + position
    for (let p = 0; p < 50; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 500
      );

      // animate clouds with camera
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * 3.142;
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });

  // star background
  loader.load("/imgs/stars.jpg", function (texture) {
    const textureEffect = new POSTPROCESSING.TextureEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      texture: texture,
    });
    textureEffect.blendMode.opacity.value = 0.75;

    // Bloom / post-processing
    const bloomEffect = new POSTPROCESSING.BloomEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      kernelSize: POSTPROCESSING.KernelSize.SMALL,
      useLuminanceFilter: false,
      luminanceThreshold: 2,
      luminanceSmoothing: 3.5,
    });
    bloomEffect.blendMode.opacity.value = 3;

    let effectPass = new POSTPROCESSING.EffectPass(
      camera,
      bloomEffect,
      textureEffect
    );
    effectPass.renderToScreen = true;

    composer = new POSTPROCESSING.EffectComposer(renderer);
    composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    composer.addPass(effectPass);

    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("resize", onWindowResize, false);
    render();
  });
}

// Responsive Window Resizing
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let mouseX = 0;
let mouseY = 0;
function onMouseMove(event) {
  let deltaX = event.clientX - mouseX;
  let deltaY = event.clientY - mouseY;
  camera.position.x += deltaX * 0.02;
  camera.position.y -= deltaY * 0.02;
  mouseX = event.clientX;
  mouseY = event.clientY;
}

// Render clouds
function render() {
  cloudParticles.forEach((p) => {
    p.rotation.z -= 0.003;
  });
  composer.render(0.3);
  requestAnimationFrame(render);
}

init();
