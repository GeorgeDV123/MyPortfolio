let scene,
  camera,
  renderer,
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
  let ambient = new THREE.AmbientLight("#403f3f");
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight("#F56EB3");
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  let pinkLight = new THREE.PointLight("#ab1ccb", 50, 450, 3);
  pinkLight.position.set(200, 300, 100);
  scene.add(pinkLight);
  let cyanLight = new THREE.PointLight("#4b96b1", 50, 400, 2);
  cyanLight.position.set(100, 300, 100);
  scene.add(cyanLight);
  let purpleLight = new THREE.PointLight("#460C68", 50, 550, 1.5);
  purpleLight.position.set(300, 300, 200);
  scene.add(purpleLight);

  //init renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.fog = new THREE.FogExp2("black", 0.001);
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
    textureEffect.blendMode.opacity.value = 0.5;

    // Bloom / post-processing
    const bloomEffect = new POSTPROCESSING.BloomEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      kernelSize: POSTPROCESSING.KernelSize.SMALL,
      useLuminanceFilter: true,
      luminanceThreshold: 0.7,
      luminanceSmoothing: 0.65,
    });
    bloomEffect.blendMode.opacity.value = 2.5;

    let effectPass = new POSTPROCESSING.EffectPass(
      camera,
      bloomEffect,
      textureEffect
    );
    effectPass.renderToScreen = true;

    composer = new POSTPROCESSING.EffectComposer(renderer);
    composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    composer.addPass(effectPass);

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
// Render clouds
function render() {
  cloudParticles.forEach((p) => {
    p.rotation.z -= 0.002;
  });
  composer.render(0.3);
  requestAnimationFrame(render);
}

init();
