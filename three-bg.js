// Advanced Three.js Background with Particles and Glow Effects

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-bg'), alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0a0a0a, 0.1);

camera.position.z = 50;

// Create Particle System
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 200;
    posArray[i + 1] = (Math.random() - 0.5) * 200;
    posArray[i + 2] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create Material with Gradient Colors
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0xff7b00,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
    emissive: 0xff7b00,
    emissiveIntensity: 0.3
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create Floating Spheres (3D Elements)
const spheres = [];
const sphereCount = 5;

for (let i = 0; i < sphereCount; i++) {
    const geometry = new THREE.IcosahedronGeometry(5 + i * 1.5, 6);
    
    const colors = [
        0xff7b00,  // Orange
        0xff00c8,  // Pink
        0x00d4ff,  // Cyan
        0x7b00ff,  // Purple
        0x00ff7b   // Green
    ];
    
    const material = new THREE.MeshPhongMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.2,
        wireframe: false,
        transparent: true,
        opacity: 0.3,
        shininess: 100
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = (Math.random() - 0.5) * 150;
    sphere.position.y = (Math.random() - 0.5) * 150;
    sphere.position.z = (Math.random() - 0.5) * 150;
    sphere.rotation.x = Math.random() * Math.PI;
    sphere.rotation.y = Math.random() * Math.PI;

    sphere.userData = {
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        rx: (Math.random() - 0.5) * 0.01,
        ry: (Math.random() - 0.5) * 0.01
    };

    spheres.push(sphere);
    scene.add(sphere);
}

// Create Lines Between Spheres
const lineGeometry = new THREE.BufferGeometry();
const linePositions = [];

for (let i = 0; i < spheres.length; i++) {
    for (let j = i + 1; j < spheres.length; j++) {
        linePositions.push(
            spheres[i].position.x, spheres[i].position.y, spheres[i].position.z,
            spheres[j].position.x, spheres[j].position.y, spheres[j].position.z
        );
    }
}

lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff7b00,
    transparent: true,
    opacity: 0.2,
    linewidth: 1
});

const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lines);

// Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff7b00, 1, 200);
pointLight1.position.set(50, 50, 50);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xff00c8, 0.8, 200);
pointLight2.position.set(-50, -50, 50);
scene.add(pointLight2);

const directionalLight = new THREE.DirectionalLight(0x00d4ff, 0.5);
directionalLight.position.set(100, 100, 100);
scene.add(directionalLight);

// Mouse tracking
let mouse = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    particlesMesh.rotation.x += 0.0001;
    particlesMesh.rotation.y += 0.0002;

    // Update particles position based on mouse
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.0001 + i) * 0.1;
        positions[i + 1] += Math.cos(Date.now() * 0.0001 + i) * 0.1;
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Update spheres
    spheres.forEach((sphere, index) => {
        sphere.position.x += sphere.userData.vx;
        sphere.position.y += sphere.userData.vy;
        sphere.position.z += sphere.userData.vz;

        sphere.rotation.x += sphere.userData.rx;
        sphere.rotation.y += sphere.userData.ry;

        // Bounce off boundaries
        if (Math.abs(sphere.position.x) > 100) sphere.userData.vx *= -1;
        if (Math.abs(sphere.position.y) > 100) sphere.userData.vy *= -1;
        if (Math.abs(sphere.position.z) > 100) sphere.userData.vz *= -1;

        // Mouse interaction
        sphere.position.x += mouse.x * 0.5;
        sphere.position.y += mouse.y * 0.5;
    });

    // Update lines
    const positions = lines.geometry.attributes.position.array;
    let idx = 0;
    for (let i = 0; i < spheres.length; i++) {
        for (let j = i + 1; j < spheres.length; j++) {
            positions[idx++] = spheres[i].position.x;
            positions[idx++] = spheres[i].position.y;
            positions[idx++] = spheres[i].position.z;
            positions[idx++] = spheres[j].position.x;
            positions[idx++] = spheres[j].position.y;
            positions[idx++] = spheres[j].position.z;
        }
    }
    lines.geometry.attributes.position.needsUpdate = true;

    // Camera tracking
    camera.position.x = mouse.x * 10;
    camera.position.y = mouse.y * 10;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log('Three.js Background initialized');
