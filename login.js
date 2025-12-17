// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZnxK7J3Q9p8M2lR4vX5wK8yZ0aB1cD2e",
    authDomain: "farera-handicraft.firebaseapp.com",
    projectId: "farera-handicraft",
    storageBucket: "farera-handicraft.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase (Note: Use your own Firebase project credentials)
let auth;
try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    console.log('Firebase initialized');
} catch (error) {
    console.log('Firebase not available, using demo mode');
}

// Advanced 3D Background for Login Page
function initThreeBackground() {
    const canvas = document.getElementById('auth-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0a0a0a, 0);

    camera.position.z = 30;

    // Create Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 200;
        posArray[i + 1] = (Math.random() - 0.5) * 200;
        posArray[i + 2] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        color: 0xff7b00,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.7,
        emissive: 0xff7b00,
        emissiveIntensity: 0.5
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create Animated Torus Knot
    const torusGeometry = new THREE.TorusKnotGeometry(10, 4, 120, 20);
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0xff00c8,
        emissive: 0xff00c8,
        emissiveIntensity: 0.3,
        wireframe: false,
        transparent: true,
        opacity: 0.25,
        shininess: 120
    });

    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = -25;
    torus.position.z = -15;
    scene.add(torus);

    // Create Animated Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(14, 3);
    const octaMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.3,
        wireframe: false,
        transparent: true,
        opacity: 0.2,
        shininess: 120
    });

    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.x = 30;
    octahedron.position.z = -8;
    scene.add(octahedron);

    // Create Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(8, 4);
    const icoMaterial = new THREE.MeshPhongMaterial({
        color: 0x7b00ff,
        emissive: 0x7b00ff,
        emissiveIntensity: 0.2,
        wireframe: false,
        transparent: true,
        opacity: 0.15,
        shininess: 100
    });

    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.x = 0;
    icosahedron.position.y = 20;
    icosahedron.position.z = -10;
    scene.add(icosahedron);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff7b00, 2, 400);
    pointLight1.position.set(60, 60, 60);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00c8, 1.5, 400);
    pointLight2.position.set(-60, -60, 60);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x00d4ff, 1.2, 400);
    pointLight3.position.set(0, 0, 80);
    scene.add(pointLight3);

    // Mouse tracking
    let mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate particles
        particles.rotation.x += 0.00008;
        particles.rotation.y += 0.00015;

        // Update particles
        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += Math.sin(Date.now() * 0.00003 + i) * 0.08;
            positions[i + 1] += Math.cos(Date.now() * 0.00003 + i) * 0.08;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // Animate torus
        torus.rotation.x += 0.003;
        torus.rotation.y += 0.005;
        torus.position.y = Math.sin(Date.now() * 0.0008) * 12;

        // Animate octahedron
        octahedron.rotation.x += 0.002;
        octahedron.rotation.y += 0.004;
        octahedron.position.y = Math.cos(Date.now() * 0.0008) * 18;

        // Animate icosahedron
        icosahedron.rotation.x += 0.004;
        icosahedron.rotation.z += 0.006;
        icosahedron.position.y = 20 + Math.sin(Date.now() * 0.001) * 8;

        // Mouse interaction
        camera.position.x = mouse.x * 8;
        camera.position.y = mouse.y * 8;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// GSAP Timeline for Form Animations
let formTimeline;

function createFormTimeline() {
    formTimeline = gsap.timeline();

    formTimeline
        .from('.form-toggle', {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: 'back.out(1.7)'
        })
        .from('.form-group', {
            opacity: 0,
            y: 20,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out'
        }, 0.2)
        .from('.social-buttons', {
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            ease: 'back.out(1.5)'
        }, 0.6);
}

// Form Switching with Advanced GSAP
function switchForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    // Update active button with animation
    toggleBtns.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(formType)) {
            btn.classList.add('active');
            gsap.to(btn, {
                boxShadow: '0 0 30px rgba(255, 123, 0, 0.6)',
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            btn.classList.remove('active');
            gsap.to(btn, {
                boxShadow: 'none',
                duration: 0.3
            });
        }
    });

    if (formType === 'login') {
        // Signup to Login
        gsap.to(signupForm, {
            opacity: 0,
            x: 30,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                signupForm.classList.remove('active');
            }
        });

        gsap.to(loginForm, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            delay: 0.1,
            onStart: () => {
                loginForm.classList.add('active');
            }
        });

        // Animate form elements
        gsap.from('.auth-form.active .form-group', {
            opacity: 0,
            y: 15,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.2,
            ease: 'power2.out'
        });

    } else {
        // Login to Signup
        gsap.to(loginForm, {
            opacity: 0,
            x: -30,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                loginForm.classList.remove('active');
            }
        });

        gsap.to(signupForm, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            delay: 0.1,
            onStart: () => {
                signupForm.classList.add('active');
            }
        });

        // Animate form elements
        gsap.from('.auth-form.active .form-group', {
            opacity: 0,
            y: 15,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.2,
            ease: 'power2.out'
        });
    }
}

// Password Toggle with Rotation
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.target.closest('.password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '<i class="ri-eye-off-line"></i>';
    } else {
        input.type = 'password';
        icon.innerHTML = '<i class="ri-eye-line"></i>';
    }

    gsap.to(icon, {
        rotation: 360,
        duration: 0.5,
        ease: "back.out(1.5)"
    });
}

// Enhanced Input Animations
document.addEventListener('DOMContentLoaded', () => {
    createFormTimeline();

    const inputs = document.querySelectorAll('.form-group input, .form-group select');

    inputs.forEach((input, index) => {
        // Focus animation
        input.addEventListener('focus', function() {
            gsap.to(this, {
                boxShadow: '0 0 25px rgba(255, 123, 0, 0.5)',
                scale: 1.03,
                borderColor: '#ff7b00',
                duration: 0.3,
                ease: 'back.out(2)'
            });

            const label = this.parentElement.querySelector('label');
            if (label) {
                gsap.to(label, {
                    color: '#ff7b00',
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            // Particle burst effect
            createParticleBurst(this);
        });

        // Blur animation
        input.addEventListener('blur', function() {
            gsap.to(this, {
                boxShadow: 'none',
                scale: 1,
                borderColor: 'rgba(255, 123, 0, 0.2)',
                duration: 0.3
            });

            const label = this.parentElement.querySelector('label');
            if (label && !this.value) {
                gsap.to(label, {
                    color: '#fff',
                    y: 0,
                    duration: 0.3
                });
            }
        });

        // Input change animation
        input.addEventListener('input', function() {
            if (this.value) {
                const label = this.parentElement.querySelector('label');
                if (label) {
                    gsap.to(label, {
                        color: '#ff7b00',
                        y: -5,
                        duration: 0.2,
                        overwrite: 'auto'
                    });
                }
            }
        });
    });

    // Form Submission
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
});

// Particle Burst Effect
function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const particles = [];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #ff7b00;
            border-radius: 50%;
            pointer-events: none;
            left: ${rect.right}px;
            top: ${rect.top + rect.height / 2}px;
            z-index: 1000;
            box-shadow: 0 0 10px #ff7b00;
        `;
        document.body.appendChild(particle);

        const angle = (i / 8) * Math.PI * 2;
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        };

        gsap.to(particle, {
            left: `+=${velocity.x * 60}`,
            top: `+=${velocity.y * 60}`,
            opacity: 0,
            scale: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

// Enhanced Google Login
function socialLogin(platform) {
    const btn = event.target.closest('.social-btn');
    
    // Button animation
    gsap.to(btn, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'back.out(2)'
    });

    if (platform === 'google') {
        loginWithGoogle();
    } else if (platform === 'facebook') {
        loginWithFacebook();
    }
}

// Google OAuth Login
function loginWithGoogle() {
    if (!auth) {
        showSuccessMessage('Demo Mode', 'Google authentication configured. Replace with your Firebase credentials.');
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    
    gsap.to('.auth-submit-btn', {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    auth.signInWithPopup(provider)
        .then((result) => {
            showSuccessMessage('Login Successful!', `Welcome ${result.user.displayName}!`);
            gsap.delayedCall(2.5, () => {
                window.location.href = 'index.html';
            });
        })
        .catch((error) => {
            shakeForm(document.querySelector('.auth-form.active'));
            showError(`Google Login: ${error.message}`);
        });
}

// Facebook OAuth Login
function loginWithFacebook() {
    if (!auth) {
        showSuccessMessage('Demo Mode', 'Facebook authentication configured. Replace with your Firebase credentials.');
        return;
    }

    const provider = new firebase.auth.FacebookAuthProvider();
    
    gsap.to('.auth-submit-btn', {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    auth.signInWithPopup(provider)
        .then((result) => {
            showSuccessMessage('Login Successful!', `Welcome ${result.user.displayName}!`);
            gsap.delayedCall(2.5, () => {
                window.location.href = 'index.html';
            });
        })
        .catch((error) => {
            shakeForm(document.querySelector('.auth-form.active'));
            showError(`Facebook Login: ${error.message}`);
        });
}

// Handle Email Login
function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const btn = form.querySelector('.auth-submit-btn');
    
    // Button loading animation
    gsap.to(btn, {
        scale: 0.95,
        duration: 0.2
    });

    btn.innerHTML = '<span>Logging in...</span>';
    btn.disabled = true;

    if (auth) {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Save user data to localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', userCredential.user.email);
                localStorage.setItem('userName', userCredential.user.displayName || email.split('@')[0]);
                localStorage.setItem('userId', userCredential.user.uid);
                
                showSuccessMessage('Login Successful!', `Welcome back!`);
                gsap.delayedCall(2.5, () => {
                    window.location.href = 'dashboard.html';
                });
            })
            .catch((error) => {
                shakeForm(form);
                showError(error.message);
                btn.innerHTML = '<span>Login Now</span>';
                btn.disabled = false;
            });
    } else {
        // Demo mode - save user data
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', email.split('@')[0]);
            
            showSuccessMessage('Demo Login', 'Email: ' + email);
            gsap.delayedCall(2.5, () => {
                window.location.href = 'dashboard.html';
            });
        }, 1500);
    }
}

// Handle Email Signup
function handleSignup(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelectorAll('input[type="email"]')[0].value;
    const password = form.querySelector('#signupPassword').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    const btn = form.querySelector('.auth-submit-btn');

    if (password !== confirmPassword) {
        shakeForm(form);
        showError('Passwords do not match!');
        return;
    }

    gsap.to(btn, {
        scale: 0.95,
        duration: 0.2
    });

    btn.innerHTML = '<span>Creating Account...</span>';
    btn.disabled = true;

    if (auth) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Save user data to localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', userCredential.user.email);
                localStorage.setItem('userName', userCredential.user.displayName || email.split('@')[0]);
                localStorage.setItem('userId', userCredential.user.uid);
                
                showSuccessMessage('Account Created!', 'Welcome to Farera Handicraft');
                gsap.delayedCall(2.5, () => {
                    window.location.href = 'dashboard.html';
                });
            })
            .catch((error) => {
                shakeForm(form);
                showError(error.message);
                btn.innerHTML = '<span>Create Account</span>';
                btn.disabled = false;
            });
    } else {
        // Demo mode - save user data
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', email.split('@')[0]);
            
            showSuccessMessage('Demo Signup', 'Account created for: ' + email);
            gsap.delayedCall(2.5, () => {
                window.location.href = 'dashboard.html';
            });
        }, 1500);
    }
}

// Show Success Message with Animation
function showSuccessMessage(title, text) {
    const overlay = document.getElementById('successOverlay');
    const message = document.getElementById('successMessage');
    const titleEl = document.getElementById('successTitle');
    const textEl = document.getElementById('successText');

    titleEl.textContent = title;
    textEl.textContent = text;

    overlay.classList.add('show');
    message.classList.add('show');

    // Success animation timeline
    const successTl = gsap.timeline();
    successTl
        .from(message, {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(1.7)"
        })
        .to(document.querySelector('.success-icon'), {
            rotation: 720,
            scale: 1.2,
            duration: 0.6,
            ease: "back.out(2)"
        }, 0);
}

// Shake Form on Error
function shakeForm(form) {
    gsap.to(form, {
        x: -15,
        duration: 0.08,
        yoyo: true,
        repeat: 5,
        ease: "power2.out"
    });
}

// Show Error Toast
function showError(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 1rem 2rem;
        background: rgba(255, 0, 0, 0.2);
        border: 2px solid #ff0000;
        color: #ff6b6b;
        border-radius: 12px;
        font-weight: 600;
        z-index: 1000;
        backdrop-filter: blur(10px);
        max-width: 300px;
    `;
    
    toast.innerHTML = `<i class="ri-error-warning-line"></i> ${message}`;
    document.body.appendChild(toast);

    gsap.fromTo(toast,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'back.out(2)'
        }
    );

    gsap.to(toast, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        delay: 3.5,
        ease: "power2.in",
        onComplete: () => toast.remove()
    });
}

// Page Load Animations
window.addEventListener('load', () => {
    initThreeBackground();

    // Wrapper entrance
    gsap.from('.auth-wrapper', {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1,
        ease: "cubic-bezier(0.34, 1.56, 0.64, 1)"
    });

    // Back button entrance
    gsap.from('.back-btn', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3
    });

    // Left panel entrance
    gsap.from('.auth-left', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2
    });

    // Right panel entrance
    gsap.from('.auth-right', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2
    });

    // Feature items stagger
    gsap.from('.auth-feature', {
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.5
    });
});

console.log('Login page loaded with advanced GSAP animations and authentication');
