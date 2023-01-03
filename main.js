import { aboutText } from "./src/Components/aboutText";
import { Stars } from "./src/Components/stars";
import { Warp } from "./src/Components/warp";

aboutText()
Stars()
Warp()

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);
