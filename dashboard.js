// Check if user is logged in
function checkUserAuthentication() {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    
    if (!userEmail || !userName) {
        window.location.href = 'login.html';
        return false;
    }
    
    // Update dashboard with user info
    document.getElementById('userName').textContent = userName || 'Welcome User';
    document.getElementById('userEmail').textContent = userEmail || 'user@farera.com';
    document.getElementById('memberSince').textContent = new Date().getFullYear();
    
    return true;
}

// Three.js Setup
function initThreeJS() {
    const canvas = document.getElementById('canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a, 0.1);
    camera.position.z = 30;

    // Create particle system
    const particleCount = 150;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 100;
        
        // Orange to Pink gradient
        colors[i] = 1;
        colors[i + 1] = Math.random() * 0.6;
        colors[i + 2] = Math.random() * 0.8;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.8,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        fog: false
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Create floating cubes
    const cubes = [];
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
            emissive: new THREE.Color().setHSL(Math.random(), 0.8, 0.4),
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        );
        
        cube.userData = {
            rotationX: Math.random() * 0.01,
            rotationY: Math.random() * 0.01,
            rotationZ: Math.random() * 0.01,
            scale: 1
        };
        
        scene.add(cube);
        cubes.push(cube);
    }

    // Create rotating torus
    const torusGeometry = new THREE.TorusGeometry(20, 3, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0xff7b00,
        emissive: 0xff00c8,
        wireframe: false,
        transparent: true,
        opacity: 0.2
    });
    
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = 0.3;
    scene.add(torus);

    // Create second rotating torus
    const torus2Geometry = new THREE.TorusGeometry(25, 2, 16, 100);
    const torus2Material = new THREE.MeshPhongMaterial({
        color: 0xff00c8,
        emissive: 0xff7b00,
        wireframe: false,
        transparent: true,
        opacity: 0.15
    });
    
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2.rotation.y = 0.2;
    scene.add(torus2);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xff7b00, 1.5, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff00c8, 1.5, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate particles
        particleSystem.rotation.x += 0.0001;
        particleSystem.rotation.y += 0.0003;

        // Animate cubes
        cubes.forEach((cube, index) => {
            cube.rotation.x += cube.userData.rotationX;
            cube.rotation.y += cube.userData.rotationY;
            cube.rotation.z += cube.userData.rotationZ;
            
            // Floating effect
            cube.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.03;
        });

        // Rotate torus
        torus.rotation.x += 0.002;
        torus.rotation.y += 0.001;

        torus2.rotation.x -= 0.001;
        torus2.rotation.z += 0.002;

        // Update point lights
        pointLight1.position.x = Math.sin(Date.now() * 0.0005) * 40;
        pointLight2.position.z = Math.cos(Date.now() * 0.0005) * 40;

        renderer.render(scene, camera);
    }

    // Handle window resize
    function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    window.addEventListener('resize', onWindowResize);
    animate();
}

// Logout functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (checkUserAuthentication()) {
        initThreeJS();
        setupLogout();
    }
});
