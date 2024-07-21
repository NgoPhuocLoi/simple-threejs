import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "dat.gui";

const sceneA = new THREE.Scene();
const sceneB = new THREE.Scene();
const sceneC = new THREE.Scene();
sceneA.background = new THREE.Color(0x00ff00);
sceneB.background = new THREE.TextureLoader().load(
  "https://sbcode.net/img/grid.png",
);
sceneC.background = new THREE.CubeTextureLoader()
  .setPath("https://sbcode.net/img/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
// scene.backgroundBlurriness = 0.5;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(geometry, material);
sceneA.add(cube);

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
let activeScene = sceneA;
const renderScene = {
  sceneA: () => {
    activeScene = sceneA;
  },
  sceneB: () => {
    activeScene = sceneB;
  },
  sceneC: () => {
    activeScene = sceneC;
  },
};

gui.add(renderScene, "sceneA").name("Scene A");
gui.add(renderScene, "sceneB").name("Scene B");
gui.add(renderScene, "sceneC").name("Scene C");

gui.open();

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(activeScene, camera);

  stats.update();
}

animate();
