# Dashboard Architecture & Technical Implementation

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     FARERA APPLICATION                      │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌──────▼───────┐          ┌────────▼──────┐
        │  index.html  │          │  login.html   │
        │  (Homepage)  │          │  (Auth Page)  │
        └──────┬───────┘          └────────┬──────┘
               │                           │
        Profile Icon (~)         Email/Password Submit
               │                           │
               └──────────┬────────────────┘
                          │
                    script.js Handler
                    Checks localStorage
                          │
         ┌────────────────┴────────────────┐
         │                                 │
    ┌────▼─────┐                    ┌─────▼─────┐
    │  Logged   │                    │   Not     │
    │   In?     │                    │  Logged   │
    └────┬─────┘                    └─────┬─────┘
         │                                │
    ┌────▼──────────────────────────────┐│
    │                                    ││
    │  login.js Authenticates User       ││
    │  ├─ Validate Credentials           ││
    │  ├─ Create User Account            ││
    │  ├─ Save to localStorage           ││
    │  └─ Set Session Flags              ││
    │                                    ││
    └────┬─────────────────────────────┐││
         │                             │││
    ┌────▼──────────────────────────┐ │││
    │  dashboard.html Loads          │ │││
    │                                │ │││
    │  1. Check Authentication       │ │││
    │     if (!userEmail) redirect   │ │││
    │                                │ │││
    │  2. Load User Data             │ │││
    │     from localStorage          │ │││
    │                                │ │││
    │  3. Initialize Three.js        │ │││
    │     ├─ Create Scene            │ │││
    │     ├─ Add Particles           │ │││
    │     ├─ Add Geometries          │ │││
    │     ├─ Setup Lighting          │ │││
    │     └─ Start Animation Loop    │ │││
    │                                │ │││
    │  4. Render Dashboard UI        │ │││
    │     ├─ Profile Card            │ │││
    │     ├─ Stats Cards             │ │││
    │     └─ Recent Orders           │ │││
    │                                │ │││
    └────┬─────────────────────────┘ │││
         │                           │││
    Premium Dashboard Displayed ◄────┘││
                                      ││
                          User Clicks Logout
                                      │
                                      ▼
                        localStorage.removeItem()
                                      │
                                      ▼
                         Redirect to index.html
```

---

## Component Architecture

### Frontend Structure

```
index.html (Homepage)
├── Navigation Bar
│   ├── Logo
│   ├── Menu Links
│   └── Profile Icon [CLICK HANDLER]
├── Hero Section
├── Explore Section
├── About Section
├── Contact Section
└── Footer

login.html (Authentication)
├── Three.js Background [login.js]
├── Left Panel (Features)
└── Right Panel (Forms)
    ├── Login Form
    └── Signup Form

dashboard.html (Premium Dashboard)
├── Canvas [Three.js Rendering]
├── Navigation
│   ├── Brand Name
│   └── Logout Button
├── Main Content (Grid Layout)
│   ├── Profile Card [Left Column]
│   │   ├── Avatar
│   │   ├── Name & Email
│   │   └── Profile Info
│   ├── Stats Section [Right Column]
│   │   ├── Stats Grid
│   │   │   ├── Orders Card
│   │   │   ├── Spending Card
│   │   │   ├── Rating Card
│   │   │   └── Rewards Card
│   │   └── Recent Orders [Full Width]
│   │       ├── Order Items
│   │       └── Status Badges
```

---

## Three.js Scene Graph

```
THREE.Scene()
│
├── THREE.Points (Particle System)
│   ├── 150 Particles
│   ├── BufferGeometry
│   │   ├── position attribute (3 floats × 150)
│   │   └── color attribute (3 floats × 150)
│   └── PointsMaterial
│       ├── size: 0.8
│       ├── vertexColors: true
│       ├── opacity: 0.6
│       └── transparent: true
│
├── THREE.Mesh[] (5 Cubes)
│   └── [BoxGeometry + MeshPhongMaterial]
│       ├── position: Random (x, y, z)
│       ├── rotation: Independent
│       └── userData: {rotationX, rotationY, rotationZ}
│
├── THREE.Mesh (Primary Torus)
│   ├── TorusGeometry(20, 3, 16, 100)
│   ├── MeshPhongMaterial
│   │   ├── color: 0xff7b00
│   │   ├── emissive: 0xff00c8
│   │   └── opacity: 0.2
│   └── Rotation: (0.3, 0, 0) initial
│
├── THREE.Mesh (Secondary Torus)
│   ├── TorusGeometry(25, 2, 16, 100)
│   ├── MeshPhongMaterial
│   │   ├── color: 0xff00c8
│   │   ├── emissive: 0xff7b00
│   │   └── opacity: 0.15
│   └── Rotation: (0, 0.2, 0) initial
│
├── THREE.AmbientLight
│   └── intensity: 0.4
│
├── THREE.PointLight #1 (Orange)
│   ├── color: 0xff7b00
│   ├── intensity: 1.5
│   └── position: (20, 20, 20)
│
├── THREE.PointLight #2 (Pink)
│   ├── color: 0xff00c8
│   ├── intensity: 1.5
│   └── position: (-20, -20, 20)
│
└── THREE.PerspectiveCamera
    ├── position.z: 30
    └── aspect: window.innerWidth / window.innerHeight
```

---

## Data Flow & State Management

### localStorage Keys
```
┌──────────────────────────────────────────┐
│        Browser localStorage               │
├──────────────────────────────────────────┤
│ isLoggedIn    : "true" | "false"         │
│ userEmail     : "user@example.com"       │
│ userName      : "username"               │
│ userId        : "firebase_uid"           │
└──────────────────────────────────────────┘
```

### Authentication State Machine

```
             START
              │
              ▼
      ┌─────────────┐
      │   NO TOKEN  │  (Not logged in)
      └─────────────┘
             │
             │ User clicks Profile Icon
             ▼
        script.js checks
        localStorage
             │
        ┌────┴────┐
        │          │
    ┌───▼──┐   ┌──▼───┐
    │Token?│   │Token?│
    └───┬──┘   └──┬───┘
        │Yes   │No
        │      │
   ┌────▼─┐ ┌──▼────┐
   │VALID │ │INVALID│
   └────┬─┘ └──┬────┘
        │      │
   ┌────▼──┐   │
   │LOGGED │   │ Redirect to
   │  IN   │   │ login.html
   │  DASH │   │
   │BOARD  │   │
   └───────┘   │
               │
          User fills form
               │
        ┌──────┴──────┐
        │             │
    ┌───▼──┐      ┌──▼───┐
    │LOGIN │      │SIGNUP│
    └───┬──┘      └──┬───┘
        │            │
   ┌────▼────────────▼──┐
   │ Validate & Auth    │
   │ Save to localStorage
   │ Set Flags          │
   └────┬───────────────┘
        │
   ┌────▼──────────┐
   │Redirect to    │
   │dashboard.html │
   └───────────────┘
```

---

## JavaScript File Dependencies

### index.html
```
index.html
├── style.css ◄──────── CSS Styling
├── script.js ◄──────── [PROFILE ICON HANDLER]
│   └── Checks: localStorage → dashboard.html or login.html
└── animations.js ◄──── Additional animations
```

### login.html
```
login.html
├── style (inline) ◄─── CSS Styling
├── GSAP ◄──────────── Animation library
├── Three.js ◄──────── 3D Background
├── Firebase ◄──────── Authentication (optional)
└── login.js ◄──────── [LOGIN/SIGNUP HANDLER + localStorage save]
    └── Sets: isLoggedIn, userEmail, userName, userId
```

### dashboard.html
```
dashboard.html
├── style (inline) ◄─── CSS Styling
├── Three.js ◄──────── 3D Scene Setup
└── dashboard.js ◄──── [AUTH CHECK + ANIMATION LOOP]
    ├── Reads: localStorage
    ├── Checks: userEmail, userName
    ├── Initializes: Three.js scene
    └── Renders: Dashboard UI + Animations
```

---

## Animation Loop Performance

### Frame-by-Frame Breakdown (60fps)

```
requestAnimationFrame()
    │
    ├─ Update Particle System
    │  ├─ rotation.x += 0.0001
    │  └─ rotation.y += 0.0003
    │
    ├─ Update Cubes (5 iterations)
    │  ├─ rotation.x += userData.rotationX
    │  ├─ rotation.y += userData.rotationY
    │  ├─ rotation.z += userData.rotationZ
    │  └─ position.y += Math.sin(...) * 0.03
    │
    ├─ Update Primary Torus
    │  ├─ rotation.x += 0.002
    │  └─ rotation.y += 0.001
    │
    ├─ Update Secondary Torus
    │  ├─ rotation.x -= 0.001
    │  └─ rotation.z += 0.002
    │
    ├─ Update Lights
    │  ├─ pointLight1.position.x = sin(...) * 40
    │  └─ pointLight2.position.z = cos(...) * 40
    │
    └─ renderer.render(scene, camera)
        └─ Outputs to Canvas
```

---

## Event Flow

### Profile Icon Click
```
User clicks .profile_account
    │
    ▼
script.js addEventListener('click')
    │
    ├─ Read localStorage('isLoggedIn')
    ├─ Read localStorage('userEmail')
    │
    ├─ if (isLoggedIn && userEmail)
    │  └─ window.location = 'dashboard.html'
    │
    └─ else
       └─ window.location = 'login.html'
```

### Login Form Submit
```
User submits email + password
    │
    ▼
login.js handleLogin(e)
    │
    ├─ e.preventDefault()
    ├─ Get email & password
    │
    ├─ If Firebase enabled:
    │  └─ auth.signInWithEmailAndPassword()
    │     ├─ Success:
    │     │  ├─ localStorage.setItem('isLoggedIn', 'true')
    │     │  ├─ localStorage.setItem('userEmail', email)
    │     │  ├─ localStorage.setItem('userName', displayName)
    │     │  ├─ localStorage.setItem('userId', uid)
    │     │  └─ Redirect to dashboard.html
    │     └─ Error:
    │        ├─ Shake form
    │        ├─ Show error toast
    │        └─ Stay on login
    │
    └─ Else (Demo mode):
       ├─ localStorage.setItem('isLoggedIn', 'true')
       ├─ localStorage.setItem('userEmail', email)
       ├─ localStorage.setItem('userName', email.split('@')[0])
       └─ Redirect to dashboard.html
```

### Dashboard Load
```
dashboard.html DOM Content Loaded
    │
    ▼
dashboard.js DOMContentLoaded
    │
    ├─ checkUserAuthentication()
    │  ├─ Get localStorage('userEmail')
    │  ├─ Get localStorage('userName')
    │  │
    │  ├─ if (!userEmail || !userName)
    │  │  └─ window.location = 'login.html'
    │  │
    │  └─ else
    │     ├─ document.getElementById('userName').textContent = userName
    │     ├─ document.getElementById('userEmail').textContent = userEmail
    │     └─ return true
    │
    ├─ initThreeJS()
    │  ├─ Create scene, camera, renderer
    │  ├─ Add particle system
    │  ├─ Add 5 cubes
    │  ├─ Add 2 torus geometries
    │  ├─ Add lighting
    │  └─ Start animate() loop
    │
    └─ setupLogout()
       └─ logoutBtn.addEventListener('click', () => {
          ├─ localStorage.removeItem('isLoggedIn')
          ├─ localStorage.removeItem('userEmail')
          ├─ localStorage.removeItem('userName')
          ├─ localStorage.removeItem('userId')
          └─ window.location = 'index.html'
       })
```

---

## Color Scheme

```
Primary Gradient:   #ff7b00 (Orange) → #ff00c8 (Pink)
Dark Background:    #0a0a0a
Text Color:         #ffffff / #eaeaea / #aaa
Accent:             #ff7b00 or #ff00c8
Transparent:        rgba(255, 255, 255, 0.08) - Glass effect
```

---

## Security Considerations

1. **localStorage Limitations**
   - Client-side storage only
   - Visible in browser DevTools
   - Vulnerable to XSS attacks
   - Use httpOnly cookies for production

2. **Authentication Flow**
   - Simple check for demo mode
   - Firebase provides real authentication
   - Consider JWT tokens for API

3. **Sensitive Data**
   - Don't store passwords
   - Store only email, username, userId
   - Validate on each page load

---

## Performance Metrics

### Three.js Optimization
- **Particle Count**: 150 (balanced visuals/performance)
- **Geometry Complexity**: Low poly (16-120 segments)
- **Lighting**: 3 lights (ambient + 2 point)
- **WebGL Antialias**: Enabled (slight performance cost)

### Expected Performance
- Desktop: 60fps stable
- Tablet: 50-60fps stable
- Mobile: 30-60fps (depends on device)

---

## Browser DevTools Debugging

### Check localStorage
```javascript
// In console:
localStorage.getItem('isLoggedIn')
localStorage.getItem('userEmail')
localStorage.getItem('userName')
localStorage.getItem('userId')
```

### Monitor Three.js
```javascript
// In console:
console.log('Scene objects:', scene.children.length)
console.log('Particle count:', particleCount)
```

### Check Network
- Verify CDN resources load (GSAP, Three.js)
- Check for CORS issues
- Monitor file sizes (dashboard.js ~8KB)

---

## Future Enhancements

1. **Backend Integration**
   - Connect to REST API for order data
   - Real database for user info
   - Order tracking system

2. **Advanced Features**
   - Profile editing
   - Order details view
   - Payment system
   - Notification center

3. **Performance**
   - Use Instancing for multiple geometries
   - LOD (Level of Detail) system
   - Canvas texture rendering
   - Mobile optimization

4. **Analytics**
   - Track user engagement
   - Monitor dashboard load times
   - Analyze Three.js performance
