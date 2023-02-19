import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140)
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);;

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  './image/stars.jpg',
  './image/stars.jpg',
  './image/stars.jpg',
  './image/stars.jpg',
  './image/stars.jpg',
  './image/stars.jpg'
])

const textureLoader = new THREE.TextureLoader();

//the sun
const sunGeo = new THREE.SphereGeometry(20, 30, 30)
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load('./image/sun.jpg')
})
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)

//creating planets
function createPlanet(size, texture, position, ring){
  const geo = new THREE.SphereGeometry(size, 30, 30)
  const mat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(texture)
})
const mesh = new THREE.Mesh(geo, mat)
const obj = new THREE.Object3D();
obj.add(mesh)
if(ring){
  //if theres a ring
  const ringGeo = new THREE.RingGeometry(
    ring.innerRadius, 
    ring.outerRadius,  
    32)
  const ringMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(ring.texture),
  side: THREE.DoubleSide
})
const ringMesh = new THREE.Mesh(ringGeo, ringMat)
obj.add(ringMesh)
ringMesh.position.x = position;
ringMesh.rotation.x = -0.5 * Math.PI;
}
scene.add(obj)
mesh.position.x = position;
return {mesh, obj}
}



const mercury = createPlanet(3.2, './image/mercury.jpg', 28)
const venus = createPlanet(5.8, './image/venus.jpg', 44)
const earth = createPlanet(6, './image/earth.jpg', 62)
const mars = createPlanet(4, './image/mars.jpg', 78)
const jupiter = createPlanet(12, './image/jupiter.jpg', 100)
const saturn = createPlanet(10, './image/saturn.jpg', 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: './image/saturn ring.png'
});
const uranus = createPlanet(7, './image/uranus.jpg', 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: './image/uranus ring.png'
});
const neptune = createPlanet(7, './image/neptune.jpg', 200)
const pluto = createPlanet(2.8, './image/jupiter.jpg', 216)

const astroidBeltGeo = new THREE.RingGeometry(20, 20, 32);
const astroidBeltMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load('./image/asteroid-belt-png.png'),
  side: THREE.DoubleSide
})
const asteriodBelt = new THREE.Mesh(astroidBeltGeo, astroidBeltMat)
scene.add(asteriodBelt)
asteriodBelt.position.set(80, 80, 80)


//sun light
const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300)
scene.add(pointLight)

function animate(){
  sun.rotateY(0.004);
  //self rotation
  mercury.mesh.rotateY(0.004)
  saturn.mesh.rotateY(0.038)
  venus.mesh.rotateY(-0.002)
  earth.mesh.rotateY(0.02)
  mars.mesh.rotateY(0.018)
  jupiter.mesh.rotateY(0.04)
  uranus.mesh.rotateY(0.03)
  neptune.mesh.rotateY(0.032)
  pluto.mesh.rotateY(0.008)

//rotation around sun
  mercury.obj.rotateY(0.04)
  venus.obj.rotateY(0.015)
  earth.obj.rotateY(0.01)
  mars.obj.rotateY(0.008)
  jupiter.obj.rotateY(0.002)
  saturn.obj.rotateY(0.0009)
  uranus.obj.rotateY(0.0004)
  neptune.obj.rotateY(0.0001)
  pluto.obj.rotateY(0.00007)
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function (){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(this.window.innerWidth, window.innerHeight)
})

