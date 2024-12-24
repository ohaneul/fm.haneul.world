// Audio Player
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const muteBtn = document.getElementById('mute');
const volumeSlider = document.getElementById('volume');

playPauseBtn.addEventListener('click', togglePlay);
muteBtn.addEventListener('click', toggleMute);
volumeSlider.addEventListener('input', handleVolume);

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸';
    playPauseBtn.setAttribute('aria-label', 'Pause');
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶';
    playPauseBtn.setAttribute('aria-label', 'Play');
  }
}

function toggleMute() {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
}

function handleVolume() {
  audio.volume = volumeSlider.value;
  audio.muted = false;
  muteBtn.textContent = '🔊';
  muteBtn.setAttribute('aria-label', 'Mute');
}

// View Counter
const viewCounter = document.getElementById('view-counter');

function updateViewCount() {
  let views = localStorage.getItem('pageViews') || 0;
  views = parseInt(views) + 1;
  localStorage.setItem('pageViews', views);
  viewCounter.textContent = `${views} views`;
}

updateViewCount();

// Animated Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
  color: 0xff69b4,
  transparent: true,
  opacity: 0.6,
});

const voxels = [];
for (let i = 0; i < 50; i++) {
  const voxel = new THREE.Mesh(geometry, material);
  voxel.position.set(
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
    Math.random() * 20 - 10
  );
  voxel.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  scene.add(voxel);
  voxels.push(voxel);
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff69b4, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 15;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(voxels);

  voxels.forEach((voxel) => {
    if (intersects.find((intersect) => intersect.object === voxel)) {
      voxel.scale.set(1.2, 1.2, 1.2);
    } else {
      voxel.scale.set(1, 1, 1);
    }
  });
}

window.addEventListener('mousemove', onMouseMove);

function animate() {
  requestAnimationFrame(animate);

  voxels.forEach((voxel) => {
    voxel.rotation.x += 0.01;
    voxel.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

animate();

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize);

