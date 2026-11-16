import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'gsap';

const css = `
/* MANNVASAM FIXED WORLD EXIT CONTROL */
/* MANNVASAM FIXED WORLD EXIT CONTROL */
#mv-world .mv-world-top {
  position:fixed !important;
  top:0 !important;
  left:0 !important;
  right:0 !important;
  width:100% !important;
  z-index:2147483647 !important;
  display:flex !important;
  align-items:center !important;
  justify-content:space-between !important;
  pointer-events:none !important;
}

#mv-world .mv-world-exit {
  position:fixed !important;
  top:24px !important;
  right:28px !important;
  left:auto !important;
  bottom:auto !important;
  display:inline-flex !important;
  align-items:center !important;
  justify-content:center !important;
  visibility:visible !important;
  opacity:1 !important;
  pointer-events:auto !important;
  z-index:2147483647 !important;
  background:#142b20 !important;
  color:#fff !important;
  border:1px solid #d2b77e !important;
  padding:13px 20px !important;
  border-radius:30px !important;
  font-weight:700 !important;
  cursor:pointer !important;
  box-shadow:0 5px 25px #0007 !important;
}

#mv-world-launch {
  position:fixed;right:25px;bottom:25px;z-index:9998;
  border:1px solid #c6a36b;background:#193d28;color:#f8edda;
  padding:16px 24px;border-radius:40px;font:600 11px Arial;
  letter-spacing:2px;cursor:pointer;box-shadow:0 10px 35px #0003;
  transition:.3s;
}
#mv-world-launch:hover {transform:translateY(-4px);background:#315b3c}
#mv-world {
  position:fixed;inset:0;z-index:99999;background:#15291f;
  display:none;overflow:hidden;color:#fff;font-family:Arial,sans-serif;
}
#mv-world canvas {display:block;width:100%;height:100%}
.mv-world-top {
  position:absolute;top:25px;left:30px;right:30px;
  display:flex;justify-content:space-between;align-items:center;
  pointer-events:none;
}
.mv-world-brand {font-family:Georgia,serif;letter-spacing:4px;font-size:22px}
.mv-world-brand small {display:block;font:9px Arial;letter-spacing:3px;color:#e0c28b;margin-top:6px}
.mv-world-top {
  position:absolute;
  top:0;
  left:0;
  right:0;
  z-index:100000;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:25px 30px;
  pointer-events:none;
}

.mv-world-exit {
  position:relative;
  z-index:100001;
  pointer-events:auto;
  border:1px solid #d2b77e;
  background:#142b20ee;
  color:white;
  padding:12px 18px;
  border-radius:30px;
  cursor:pointer;
  font-size:12px;
  font-weight:600;
  letter-spacing:1px;
  box-shadow:0 5px 25px #0005;
}
.mv-world-intro {
  position:absolute;left:7%;top:17%;max-width:370px;
  pointer-events:none;text-shadow:0 2px 20px #0009;
  transition:opacity .5s;z-index:2;
}
.mv-world-intro .eyebrow {font-size:10px;letter-spacing:4px;color:#e3c58b}
.mv-world-intro h1 {font:clamp(38px,6vw,76px)/1.02 Georgia,serif;margin:18px 0}
.mv-world-intro p {font-size:14px;line-height:1.8;color:#f1eadc;max-width:360px}
.mv-world-hint {
  position:absolute;bottom:25px;left:50%;transform:translateX(-50%);
  font-size:10px;letter-spacing:2px;color:#fffbd0;
  background:#142b20b8;padding:12px 18px;border-radius:30px;
  white-space:nowrap;pointer-events:none;
}
.mv-world-hotspot {
  position:absolute;z-index:3;transform:translate(-50%,-50%);
  border:1px solid #f0d59a;background:#193d28e8;color:#fff;
  border-radius:30px;padding:10px 15px;font-size:10px;
  letter-spacing:1px;cursor:pointer;white-space:nowrap;
  box-shadow:0 5px 25px #0004;transition:background .2s;
}
.mv-world-hotspot:hover {background:#9a713b}
.mv-world-panel {
  position:absolute;right:25px;bottom:75px;width:min(340px,calc(100% - 50px));
  background:#f5efe3;color:#243c2b;padding:25px;border-radius:15px;
  box-shadow:0 15px 50px #0005;display:none;
}
.mv-world-panel h2 {font:30px Georgia,serif;margin:8px 0}
.mv-world-panel p {font-size:13px;line-height:1.7;color:#657064}
.mv-world-panel button {
  background:#193d28;color:white;border:0;border-radius:30px;
  padding:13px 20px;cursor:pointer;margin-top:10px;
}
.mv-world-panel .mv-panel-close {
  float:right;background:transparent;color:#243c2b;padding:4px 8px;
}
@media(max-width:600px) {
  #mv-world-launch {right:12px;bottom:12px;padding:14px 17px}
  .mv-world-top {top:15px;left:15px;right:15px}
  .mv-world-brand {font-size:17px}
  .mv-world-intro {left:6%;top:16%;max-width:88%}
  .mv-world-intro h1 {font-size:clamp(32px,9vw,44px);margin:12px 0}
  .mv-world-intro p {font-size:12px;max-width:300px}
  .mv-world-hint {font-size:8px;bottom:15px}
}
@media(prefers-reduced-motion:reduce) {
  #mv-world-launch {transition:none}
}
`;

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

const launch = document.createElement('button');
launch.id = 'mv-world-launch';
launch.textContent = '✦ ENTER THE MANNVASAM WORLD';
launch.style.setProperty('display','none','important');
document.body.appendChild(launch);

const world = document.createElement('div');
world.id = 'mv-world';
world.innerHTML = `
  <div class="mv-world-top">
    <div class="mv-world-brand">MANNVASAM
      <small>FROM OUR SOIL TO YOUR SOUL</small>
    </div>
    <button class="mv-world-exit">✕ EXIT WORLD</button>
  </div>
  <div class="mv-world-intro">
    <div class="eyebrow">A JOURNEY THROUGH OUR ROOTS</div>
    <h1>Where every grain has a story.</h1>
    <p>Explore the land, discover our traditions and experience the journey from soil to soul.</p>
  </div>
  <div class="mv-world-hint">DRAG TO EXPLORE · SELECT A DESTINATION</div>
  <div class="mv-world-panel">
    <button class="mv-panel-close">✕</button>
    <div class="mv-panel-eyebrow"></div>
    <h2></h2><p></p>
    <button class="mv-panel-action">DISCOVER MANNVASAM PRODUCTS ↗</button>
  </div>
`;
document.body.appendChild(world);

let renderer, scene, camera, frame, initialized = false;
let hotspots = [];
let dragging = false;
let lastX = 0;
let angle = 0;
let target = new THREE.Vector3(0, 0, 0);
let radius = 19;
let pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const destinations = [
  {
    name:'THE FARM',
    subtitle:'OUR ROOTS',
    description:'Discover the paddy fields, the farmer’s care and the traditional knowledge behind every harvest.',
    position:[-9,0,-5]
  },
  {
    name:'RICE MILL',
    subtitle:'TRADITION IN EVERY GRAIN',
    description:'Explore the journey of traditional rice, from harvested paddy to carefully prepared grains.',
    position:[8,0,-5]
  },
  {
    name:'THE KITCHEN',
    subtitle:'FOOD THAT FEELS LIKE HOME',
    description:'Step into the warmth of traditional Tamil cooking and discover the foods that bring families together.',
    position:[-8,0,7]
  },
  {
    name:'THE MARKET',
    subtitle:'DISCOVER MANNVASAM',
    description:'Explore traditional rice, millets and natural foods from the MANNVASAM collection.',
    position:[8,0,7]
  }
];

function material(color, roughness=0.9) {
  return new THREE.MeshStandardMaterial({color,roughness});
}

function addBox(parent, x,y,z, sx,sy,sz, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(sx,sy,sz), material(color)
  );
  mesh.position.set(x,y,z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}


const palmInstances = [];
let palmAsset = null;

const houseInstances = [];
let houseAsset = null;

function placeHouse(record) {
  if (!houseAsset) return;

  record.group.clear();

  const model = houseAsset.clone(true);
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());

  if (!size.x || !size.y || !size.z) return;

  const factor = Math.min(
    (5.4 * record.scale) / size.x,
    (4.8 * record.scale) / size.z,
    (4.2 * record.scale) / size.y
  );

  model.scale.setScalar(factor);
  model.updateMatrixWorld(true);

  const fitted = new THREE.Box3().setFromObject(model);
  const center = fitted.getCenter(new THREE.Vector3());

  model.position.x -= center.x;
  model.position.y -= fitted.min.y;
  model.position.z -= center.z;

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  record.group.add(model);

  // MANNVASAM TRADITIONAL VERANDA V1
  model.updateMatrixWorld(true);

  const houseBounds = new THREE.Box3().setFromObject(model);
  const houseSize = houseBounds.getSize(new THREE.Vector3());

  const width = houseSize.x;
  const frontZ = houseBounds.max.z;
  const verandaDepth = 1.05 * record.scale;
  const verandaWidth = width * 0.82;

  const veranda = new THREE.Group();

  const stone = new THREE.MeshStandardMaterial({
    color: '#b6a184',
    roughness: .94
  });

  const wood = new THREE.MeshStandardMaterial({
    color: '#68452e',
    roughness: .82
  });

  const terracotta = new THREE.MeshStandardMaterial({
    color: '#a85f3d',
    roughness: .9
  });

  // Raised stone veranda floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(
      verandaWidth, .18 * record.scale, verandaDepth
    ),
    stone
  );

  floor.position.set(
    0, .09 * record.scale,
    frontZ + verandaDepth / 2 - .12 * record.scale
  );
  floor.receiveShadow = true;
  floor.castShadow = true;
  veranda.add(floor);

  // Four traditional wooden veranda pillars
  const pillarHeight = 2.15 * record.scale;
  const pillarPositions = [
    [-verandaWidth*.43, frontZ + verandaDepth*.82],
    [ verandaWidth*.43, frontZ + verandaDepth*.82],
    [-verandaWidth*.43, frontZ + verandaDepth*.12],
    [ verandaWidth*.43, frontZ + verandaDepth*.12]
  ];

  pillarPositions.forEach(([x,z]) => {
    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(
        .075*record.scale,
        .095*record.scale,
        pillarHeight,
        8
      ),
      wood
    );
    pillar.position.set(x, pillarHeight/2 + .17*record.scale, z);
    pillar.castShadow = true;
    veranda.add(pillar);
  });

  // Veranda roof beam
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(
      verandaWidth + .3*record.scale,
      .16*record.scale,
      .14*record.scale
    ),
    wood
  );

  beam.position.set(
    0, pillarHeight + .17*record.scale,
    frontZ + verandaDepth*.82
  );
  beam.castShadow = true;
  veranda.add(beam);

  // Front stone steps
  for(let i=0; i<2; i++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(
        verandaWidth*.48,
        .13*record.scale,
        .28*record.scale
      ),
      stone
    );

    step.position.set(
      0,
      (.065 - i*.035)*record.scale,
      frontZ + verandaDepth + .12*record.scale + i*.22*record.scale
    );
    step.castShadow = true;
    veranda.add(step);
  }

  // Traditional terracotta pots at the entrance
  [-1,1].forEach(side => {
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(
        .19*record.scale,
        .13*record.scale,
        .34*record.scale,
        12
      ),
      terracotta
    );

    pot.position.set(
      side * verandaWidth*.57,
      .17*record.scale,
      frontZ + verandaDepth*.8
    );
    pot.castShadow = true;
    veranda.add(pot);
  });

  record.group.add(veranda);

}

function loadHouseModel() {
  const loader = new GLTFLoader();

  loader.load(
    '/models/tamil-village-house.glb',
    (gltf) => {
      houseAsset = gltf.scene;
      houseInstances.forEach(placeHouse);
      console.log('MANNVASAM: realistic village house model loaded');
    },
    undefined,
    (error) => console.error('MANNVASAM house model loading failed:', error)
  );
}


function placePalm(record) {
  const { group, scale } = record;
  if (!palmAsset) return;

  group.clear();

  const palm = palmAsset.clone(true);
  let bounds = new THREE.Box3().setFromObject(palm);
  const size = bounds.getSize(new THREE.Vector3());

  if (size.y > 0) {
    palm.scale.setScalar((6.2 * scale) / size.y);
  }

  bounds = new THREE.Box3().setFromObject(palm);
  palm.position.y -= bounds.min.y;

  palm.traverse(object => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  group.add(palm);
}

function loadPalmModel() {
  const loader = new GLTFLoader();

  loader.load(
    '/models/palm-detailed.glb',
    gltf => {
      palmAsset = gltf.scene;
      palmInstances.forEach(placePalm);
      console.info('MANNVASAM: detailed palm model loaded');
    },
    undefined,
    error => console.error('MANNVASAM palm model failed to load:', error)
  );
}


function createTree(x,z,scale=1) {
  const group = new THREE.Group();
  group.position.set(x,0,z);
  scene.add(group);

  const record = { group, scale };
  palmInstances.push(record);

  if (palmAsset) placePalm(record);

  return group;
}


function createHouse(x, z, scale=1, color='#d8c6a1') {
  const group = new THREE.Group();

  // Temporary fallback while the detailed model loads.
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(3.8*scale, 2.2*scale, 3.4*scale),
    material(color)
  );
  walls.position.y = 1.1*scale;
  group.add(walls);

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2.6*scale, 1.7*scale, 4),
    material('#795038')
  );
  roof.position.y = 3*scale;
  roof.rotation.y = Math.PI/4;
  group.add(roof);

  group.position.set(x, 0, z);
  scene.add(group);

  const record = { group, scale };
  houseInstances.push(record);

  if (houseAsset) placeHouse(record);
}



function createFields() {
  // MANNVASAM: layered paddy fields
  const waterMaterial = new THREE.MeshStandardMaterial({
    color: '#79a99a',
    roughness: 0.27,
    metalness: 0.04,
    transparent: true,
    opacity: 0.76,
    depthWrite: false
  });

  const stemMaterial = new THREE.MeshStandardMaterial({
    color: '#718d43',
    roughness: 0.86
  });

  const leafMaterial = new THREE.MeshStandardMaterial({
    color: '#63883e',
    roughness: 0.88
  });

  const grainMaterial = new THREE.MeshStandardMaterial({
    color: '#b6a45e',
    roughness: 0.82
  });

  const mudMaterial = material('#91764c');

  const stemGeometry =
    new THREE.CylinderGeometry(.012, .022, .64, 5);

  const leafGeometry =
    new THREE.ConeGeometry(.045, .38, 4);

  const grainGeometry =
    new THREE.SphereGeometry(.055, 6, 5);

  const dummy = new THREE.Object3D();

  const stemRecords = [];
  const leafRecords = [];
  const grainRecords = [];

  const fieldX = [-16, -8, 8, 16];
  const fieldZ = [-13, -4, 5];

  fieldX.forEach(cx => {
    fieldZ.forEach(cz => {

      // Shallow water inside each paddy plot
      const water = new THREE.Mesh(
        new THREE.PlaneGeometry(6.25, 6.7),
        waterMaterial
      );

      water.rotation.x = -Math.PI / 2;
      water.position.set(cx, .205, cz);
      water.receiveShadow = true;
      scene.add(water);

      // Raised earthen field boundaries
      const edges = [
        [cx, .22, cz - 3.48, 6.8, .18, .16],
        [cx, .22, cz + 3.48, 6.8, .18, .16],
        [cx - 3.32, .22, cz, .16, .18, 7],
        [cx + 3.32, .22, cz, .16, .18, 7]
      ];

      edges.forEach(([x,y,z,sx,sy,sz]) => {
        const edge = new THREE.Mesh(
          new THREE.BoxGeometry(sx, sy, sz),
          mudMaterial
        );
        edge.position.set(x,y,z);
        edge.receiveShadow = true;
        scene.add(edge);
      });

      // Individual planted rice seedlings in rows
      for(let x = -2.75; x <= 2.75; x += .42) {
        for(let z = -3; z <= 3; z += .42) {

          const px = cx + x + (Math.random()-.5)*.07;
          const pz = cz + z + (Math.random()-.5)*.07;

          stemRecords.push({
            x: px, z: pz,
            height: .8 + Math.random()*.35,
            rotation: Math.random()*Math.PI
          });

          leafRecords.push({
            x: px, z: pz,
            side: 1,
            rotation: Math.random()*Math.PI*2
          });

          leafRecords.push({
            x: px, z: pz,
            side: -1,
            rotation: Math.random()*Math.PI*2
          });

          grainRecords.push({
            x: px, z: pz,
            rotation: Math.random()*Math.PI*2
          });
        }
      }
    });
  });

  // Instanced plants: fewer draw calls and better performance
  function makeInstances(geometry, mat, records, type) {
    const mesh = new THREE.InstancedMesh(
      geometry, mat, records.length
    );

    records.forEach((p, i) => {
      dummy.position.set(
        p.x,
        type === 'stem' ? .22 + p.height*.32 :
        type === 'leaf' ? .42 : .22 + .64,
        p.z
      );

      if(type === 'stem') {
        dummy.rotation.set(0, p.rotation, 0);
        dummy.scale.set(1, p.height, 1);
      } else if(type === 'leaf') {
        dummy.rotation.set(
          .15 * p.side,
          p.rotation,
          p.side * .85
        );
        dummy.scale.set(1, .85, 1);
      } else {
        dummy.rotation.set(.2, p.rotation, .35);
        dummy.scale.set(.8, 1, .8);
      }

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = true;
    scene.add(mesh);
  }

  makeInstances(
    stemGeometry, stemMaterial, stemRecords, 'stem'
  );

  makeInstances(
    leafGeometry, leafMaterial, leafRecords, 'leaf'
  );

  makeInstances(
    grainGeometry, grainMaterial, grainRecords, 'grain'
  );

  console.log(
    'MANNVASAM: paddy fields created with',
    stemRecords.length,
    'rice plants'
  );
}


function createMill(x,z) {
  const group = new THREE.Group();
  addBox(group,0,1.4,0,4.5,2.8,3.5,'#b49a6c');
  addBox(group,0,3,0,5.1,.25,4.1,'#65462f');
  const wheel = new THREE.Mesh(
    new THREE.TorusGeometry(1,.12,8,24),
    material('#a17b45')
  );
  wheel.position.set(2.35,1.3,.2);
  group.add(wheel);
  group.position.set(x,0,z);
  scene.add(group);
}

function addDestination(d) {
  const el=document.createElement('button');
  el.className='mv-world-hotspot';
  el.textContent='✦ '+d.name;
  world.appendChild(el);
  el.addEventListener('click',()=>showDestination(d));
  hotspots.push({el,position:new THREE.Vector3(...d.position)});
}

function showDestination(d) {
  const panel=world.querySelector('.mv-world-panel');
  panel.querySelector('.mv-panel-eyebrow').textContent=d.subtitle;
  panel.querySelector('h2').textContent=d.name;
  panel.querySelector('p').textContent=d.description;
  panel.style.display='block';
  gsap.fromTo(panel,{y:20,opacity:0},{y:0,opacity:1,duration:.45});
  gsap.to(target,{x:d.position[0],z:d.position[2],duration:1.3,ease:'power2.inOut'});
  if(d.name==='THE MARKET') {
    panel.querySelector('.mv-panel-action').textContent='VISIT THE SHOP ↗';
  } else {
    panel.querySelector('.mv-panel-action').textContent='DISCOVER MANNVASAM PRODUCTS ↗';
  }
}

function initializeWorld() {
  if(initialized) return;
  initialized=true;

  scene=new THREE.Scene();
  loadPalmModel();
  loadHouseModel();
  scene.background=new THREE.Color('#d5b69a');
  scene.fog=new THREE.FogExp2('#d9c4a8',.008);

  camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,250);
  camera.position.set(0,11,22);
  camera.lookAt(0,0,0);

  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));
  renderer.setSize(innerWidth,innerHeight);
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.12;
  world.insertBefore(renderer.domElement,world.firstChild);

  // MANNVASAM GOLDEN HOUR LIGHTING V2
  scene.add(new THREE.HemisphereLight('#f5dfc2','#51402d',0.9));

  const sun=new THREE.DirectionalLight('#ffd09a',3.0);
  sun.position.set(-18,15,12);
  sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.camera.left=-30;
  sun.shadow.camera.right=30;
  sun.shadow.camera.top=30;
  sun.shadow.camera.bottom=-30;
  sun.shadow.camera.near=1;
  sun.shadow.camera.far=90;
  sun.shadow.bias=-0.00015;
  sun.shadow.normalBias=0.035;
  scene.add(sun);

  // Subtle cool sky fill preserves detail in shaded areas
  const skyFill = new THREE.DirectionalLight('#c8d7d4',0.28);
  skyFill.position.set(16,12,-18);
  scene.add(skyFill);

  // Gentle warm bounce from the village ground
  const warmBounce = new THREE.DirectionalLight('#e8a96f',0.18);
  warmBounce.position.set(-8,6,-12);
  scene.add(warmBounce);

  const ground=new THREE.Mesh(
    new THREE.PlaneGeometry(180,180),
    material('#637c43')
  );
  ground.rotation.x=-Math.PI/2;
  ground.receiveShadow=true;
  scene.add(ground);

  // Paddy plots and water channels
  for(let x=-16;x<=16;x+=8) {
    for(let z=-13;z<=13;z+=9) {
      const plot=new THREE.Mesh(
        new THREE.BoxGeometry(6.5,.12,7),
        material('#527d3e')
      );
      plot.position.set(x,.12,z);
      scene.add(plot);
    }
  }

  const canal=new THREE.Mesh(
    new THREE.PlaneGeometry(2.1,65),
    new THREE.MeshPhysicalMaterial({
      color:'#80b9ad',
      roughness:.16,
      metalness:.02,
      clearcoat:0.85,
      clearcoatRoughness:0.12,
      transparent:true,
      opacity:0.88
    })
  );
  canal.rotation.x=-Math.PI/2;
  canal.position.set(0,.2,0);
  scene.add(canal);

  // Natural raised earthen banks along the irrigation canal
  const canalBankMaterial = material('#94794f');

  for (const bankX of [-1.18, 1.18]) {
    const bank = new THREE.Mesh(
      new THREE.BoxGeometry(.34,.28,65),
      canalBankMaterial
    );
    bank.position.set(bankX,.14,0);
    bank.castShadow = true;
    bank.receiveShadow = true;
    scene.add(bank);
  }


  createFields();

  // Village path
  const path=new THREE.Mesh(
    new THREE.PlaneGeometry(4,60),
    material('#c3a779')
  );
  path.rotation.x=-Math.PI/2;
  path.position.set(3.6,.23,0);
  scene.add(path);

  // Village homes and rice mill
  createHouse(-10,-10,1.1);
  createHouse(11,-10,.9);
  createHouse(-11,11,.9);
  createMill(10,1);

  // Coconut trees
  for(const [x,z,s] of [
    [-17,-13,1.5],[-17,2,1.3],[-15,15,1.1],
    [17,-15,1.4],[16,10,1.2],[12,16,1.1],
    [-7,-17,1], [7,-17,1.1]
  ]) createTree(x,z,s);

  // Warm sun
  const sunSphere=new THREE.Mesh(
    new THREE.SphereGeometry(1.6,24,24),
    new THREE.MeshBasicMaterial({color:'#ffe2a1'})
  );
  sunSphere.position.set(-20,17,-45);
  scene.add(sunSphere);

  // Atmospheric floating pollen
  const particleCount=450;
  const positions=new Float32Array(particleCount*3);
  for(let i=0;i<particleCount;i++) {
    positions[i*3]=(Math.random()-.5)*55;
    positions[i*3+1]=Math.random()*13;
    positions[i*3+2]=(Math.random()-.5)*55;
  }
  const particleGeometry=new THREE.BufferGeometry();
  particleGeometry.setAttribute('position',
    new THREE.BufferAttribute(positions,3));
  const particles=new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color:'#ffe5a6',size:.09,transparent:true,opacity:.65
    })
  );
  scene.add(particles);

  destinations.forEach(addDestination);

  world.querySelector('.mv-panel-close').onclick=()=>{
    world.querySelector('.mv-world-panel').style.display='none';
  };
  world.querySelector('.mv-panel-action').onclick=()=>{
    window.location.href='/product.html';
  };

  world.querySelector('.mv-world-exit').onclick=closeWorld;

  // Pointer drag camera control
  renderer.domElement.addEventListener('pointerdown',e=>{
    dragging=true;lastX=e.clientX;
    renderer.domElement.setPointerCapture(e.pointerId);
  });
  renderer.domElement.addEventListener('pointermove',e=>{
    if(!dragging)return;
    angle-=(e.clientX-lastX)*.004;
    lastX=e.clientX;
  });
  renderer.domElement.addEventListener('pointerup',()=>dragging=false);
  renderer.domElement.addEventListener('pointercancel',()=>dragging=false);

  // Keyboard exploration
  window.addEventListener('keydown',e=>{
    if(world.style.display!=='block')return;
    const step=.8;
    if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a')target.x-=step;
    if(e.key==='ArrowRight'||e.key.toLowerCase()==='d')target.x+=step;
    if(e.key==='ArrowUp'||e.key.toLowerCase()==='w')target.z-=step;
    if(e.key==='ArrowDown'||e.key.toLowerCase()==='s')target.z+=step;
  });

  window.addEventListener('resize',resizeWorld);
  animate();
}

function resizeWorld() {
  if(!renderer)return;
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
}

function animate() {
  frame=requestAnimationFrame(animate);
  if(!renderer)return;

  const distance=radius;
  const desired=new THREE.Vector3(
    target.x+Math.sin(angle)*distance,
    9,
    target.z+Math.cos(angle)*distance
  );
  camera.position.lerp(desired,.035);
  camera.lookAt(target.x,1,target.z);

  const t=performance.now()*.00012;
  const positions=scene.children.find(o=>o.isPoints);
  if(positions)positions.rotation.y=t;

  const usedLabels=[];
  const intro=world.querySelector('.mv-world-intro');
  const introRect=intro.getBoundingClientRect();
  const worldWidth=world.clientWidth;
  const worldHeight=world.clientHeight;

  hotspots.forEach(h=>{
    const p=h.position.clone();
    p.y=2.5;
    p.project(camera);

    const visible=p.z<1&&p.z>-1&&
      p.x> -1.05&&p.x<1.05&&p.y> -1.05&&p.y<1.05;

    h.el.style.display=visible?'block':'none';
    if(!visible)return;

    const width=h.el.offsetWidth||160;
    const height=h.el.offsetHeight||38;

    let left=Math.max(width/2+12,
      Math.min(worldWidth-width/2-12,(p.x*.5+.5)*worldWidth));
    let top=((-p.y*.5+.5)*worldHeight);

    // Keep destination labels clear of the introductory heading.
    const overlaps=(a,b)=>{
      return a.left < b.right+14 && a.right > b.left-14 &&
             a.top < b.bottom+12 && a.bottom > b.top-12;
    };

    let rect={
      left:left-width/2,right:left+width/2,
      top:top-height/2,bottom:top+height/2
    };

    const introBox={
      left:introRect.left,right:introRect.right,
      top:introRect.top,bottom:introRect.bottom
    };

    if(overlaps(rect,introBox)){
      top=introRect.bottom+height/2+24;
    }

    // Separate labels when the camera brings them close together.
    for(let attempt=0;attempt<8;attempt++){
      rect={
        left:left-width/2,right:left+width/2,
        top:top-height/2,bottom:top+height/2
      };
      if(!usedLabels.some(other=>overlaps(rect,other)))break;
      top+=height+12;
    }

    top=Math.min(worldHeight-height/2-85,top);
    h.el.style.left=left+'px';
    h.el.style.top=top+'px';

    usedLabels.push({
      left:left-width/2,right:left+width/2,
      top:top-height/2,bottom:top+height/2
    });
  });

  renderer.render(scene,camera);
}

export function openWorld() {
  world.style.display='block';
  document.body.style.overflow='hidden';
  initializeWorld();
  gsap.fromTo(world,{opacity:0},{opacity:1,duration:.8});
  gsap.to(camera.position,{
    x:0,y:8,z:19,duration:2,ease:'power3.out'
  });
}

function closeWorld() {
  gsap.to(world,{opacity:0,duration:.5,onComplete:()=>{
    world.style.display='none';
    document.body.style.overflow='';
    world.style.opacity='1';
  }});
}

launch.addEventListener('click',openWorld);
