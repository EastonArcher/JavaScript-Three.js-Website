import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()

//Perspective camera to mimic what humans would see
//First argument FOV, Aspect Ratio, View Frustrum (0.1 - 1000 means everything in the camera lense)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//render == draw 
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( { color : 0xFF6347 } );
//Combines geometry with material, actual thing being added to the scene
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//Shows the position of a point light
const lightHelper = new THREE.PointLightHelper(pointLight)
//Draws 2D grid along the scene
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addBall(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
  const ball = new THREE.Mesh( geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  ball.position.set(x, y, z);
  scene.add(ball)
}

Array(200).fill().forEach(addBall)

const backgroundTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = backgroundTexture;

//Avatar 

const avatarTexture = new THREE.TextureLoader().load('easton.jpg');

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: avatarTexture } )
);

scene.add(avatar);

//Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon)

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera)
}

animate()
