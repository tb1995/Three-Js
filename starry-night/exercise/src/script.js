import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { PointsMaterial } from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
// const particleTexture = textureLoader.load('/textures/particles/11.png')

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let uTime = 0;

const parameters = {};
parameters.count = 1000;
parameters.size = 0.02;
parameters.radius = 3;

/**
 * Material
 */
let pointsMaterial = new THREE.ShaderMaterial({
  // color: 0xffffff,
  vertexColors: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  transparent: false,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: uTime },
    uSize: { value: parameters.size * renderer.getPixelRatio() },
  },
});

/**
 * Points
 */

let points = null;
let pointsGeometry = null;

const generateGalaxy = () => {
  pointsGeometry = new THREE.BufferGeometry();

  /**
   * Reset
   */
  if (points !== null) {
    backgroundGeometry.dispose();
    scene.remove(points);
  }

  let positions = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count * 1);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * parameters.radius;

    positions[i3] = radius;
    positions[i3 + 1] = (Math.random() - 0.5) * 3;
    positions[i3 + 2] = Math.random() + 1.5;
    scales[i] = Math.random();
  }

  pointsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  pointsGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

  points = new THREE.Points(pointsGeometry, pointsMaterial);

  scene.add(points);
};

const backgroundGeometry = new THREE.PlaneGeometry(30, 30, 32, 32);

// const material = new THREE.ShaderMaterial({
//     depthWrite: false,
//     vertexShader: vertexShader,
//     fragmentShader: fragmentShader,
//     blending: THREE.AdditiveBlending,
//     transparent: true,
//     uniforms: {
//         uTime: {value: uTime}
//     }
// })

const material = new THREE.MeshBasicMaterial({
  color: 0x295e91,
});

const createShaders = () => {
  const mesh = new THREE.Mesh(backgroundGeometry, material);
  // scene.add(mesh);
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  300
);
camera.position.z = 1;
camera.position.y = 0;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //uTime
  pointsMaterial.uniforms.uTime.value = elapsedTime;
  console.log(elapsedTime);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

gui.add(parameters, "count", 1000, 1000000, 100).onFinishChange(generateGalaxy);
gui.add(parameters, "size", 0.01, 2.0, 0.01).onFinishChange(generateGalaxy);
gui.add(parameters, "radius", 0.1, 10.0, 0.1).onFinishChange(generateGalaxy);

createShaders();
generateGalaxy();
tick();
