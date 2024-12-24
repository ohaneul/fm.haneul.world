// Audio Player
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const muteBtn = document.getElementById('mute');
const volumeSlider = document.getElementById('volume');

playPauseBtn.addEventListener('click', togglePlay);
muteBtn.addEventListener('click', toggleMute);
volumeSlider.addEventListener('input', handleVolume);

// Automatically play audio on page load, muted
window.addEventListener('load', () => {
  audio.muted = true; // Mute the audio initially
  audio.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
});

// Unmute audio when the user interacts with the page
document.body.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false; // Unmute the audio on first click
    muteBtn.textContent = '🔊'; // Update mute button
  }
});

// Toggle play/pause
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

// Toggle mute/unmute
function toggleMute() {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
}

// Handle volume change
function handleVolume() {
  audio.volume = volumeSlider.value;
  audio.muted = false; // Unmute when volume is adjusted
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

const mouseDistanceThreshold = 2; // Distance threshold for interaction
const pushForce = 0.5; // Increased force applied to move the voxel
const damping = 0.05; // Damping factor for smooth return

// Store original positions for damping effect
const originalPositions = voxels.map(voxel => voxel.position.clone());

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(voxels);

  // Calculate mouse position in 3D space
  const mouse3D = new THREE.Vector3(mouse.x * 10, mouse.y * 10, 0);

  voxels.forEach((voxel, index) => {
    // Check distance from mouse
    const distance = voxel.position.distanceTo(camera.position.clone().add(mouse3D));

    if (intersects.find((intersect) => intersect.object === voxel) || distance < mouseDistanceThreshold) {
      // Calculate direction from voxel to mouse
      const direction = new THREE.Vector3().subVectors(voxel.position, camera.position.clone().add(mouse3D)).normalize();
      // Apply force to move voxel away from mouse
      voxel.position.add(direction.multiplyScalar(pushForce)); // Move voxel away
      voxel.scale.set(1.2, 1.2, 1.2);
    } else {
      // Damping effect to return to original position
      const originalPosition = originalPositions[index];
      voxel.position.lerp(originalPosition, damping); // Smoothly return to original position
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

