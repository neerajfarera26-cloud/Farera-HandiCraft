# Premium Dashboard with Three.js Setup

## Overview
A premium animated user dashboard with ultra-advanced Three.js 3D animations. Users can access it by clicking the profile icon (~) only after signing up/logging in.

## Files Created/Modified

### New Files:
1. **dashboard.html** - Premium dashboard UI with user profile, stats, and order history
2. **dashboard.js** - Three.js 3D animations and authentication checks

### Modified Files:
1. **script.js** - Added profile icon click handler
2. **login.js** - Enhanced login/signup to save user data and redirect to dashboard

## Features

### 1. Premium Dashboard Design
- Glass-morphism UI with backdrop blur effects
- Gradient text effects (orange to pink)
- Smooth animations and hover effects
- Fully responsive design

### 2. Three.js 3D Animations
- **Particle System**: 150 floating particles with color gradients
- **Rotating Cubes**: 5 wireframe cubes with floating animations
- **Dual Torus**: Two rotating torus geometries with different speeds
- **Dynamic Lighting**: Multiple point lights following motion
- **Background Effects**: Ultra premium animated background

### 3. User Authentication Flow
```
User (Not Logged In)
    ↓
Click Profile Icon (~)
    ↓
Redirects to login.html
    ↓
Login/Signup
    ↓
localStorage saved with user data
    ↓
Redirects to dashboard.html
    ↓
Dashboard displays user info
    ↓
User can logout (clears localStorage)
```

### 4. Profile Card Features
- Avatar with rotating animation
- User name and email display
- Member since year
- Total purchases
- Loyalty points

### 5. Statistics Dashboard
- Total Orders (with icon)
- Total Spent (currency)
- Average Rating
- Rewards Count

### 6. Recent Orders Section
- Order name
- Order date
- Status badge (Delivered/In Transit)
- Interactive hover effects

## How It Works

### Clicking Profile Icon:
```javascript
// Checks localStorage for user authentication
if (isLoggedIn && userEmail) {
    // Logged in user → Dashboard
    window.location.href = 'dashboard.html'
} else {
    // Not logged in → Login page
    window.location.href = 'login.html'
}
```

### Login/Signup:
```javascript
// Saves to localStorage
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('userEmail', email);
localStorage.setItem('userName', username);
localStorage.setItem('userId', userId);
```

### Dashboard:
```javascript
// Checks authentication before rendering
if (!userEmail || !userName) {
    // Redirect to login
    window.location.href = 'login.html'
}
// Display dashboard with Three.js animations
```

## Three.js Components

### Particle System
- 150 particles with random positioning
- Orange to pink color gradient
- Rotating and drifting animation
- Vertex colors for realistic effect

### Geometric Objects
- **Cubes**: 5 wireframe boxes with independent rotation
- **Torus**: Primary (20, 3 geometry) with orange/pink emission
- **Torus2**: Secondary (25, 2 geometry) with pink/orange emission

### Lighting
- **Ambient Light**: Base illumination (0.4 intensity)
- **Point Light 1**: Orange light (1.5 intensity) at (20, 20, 20)
- **Point Light 2**: Pink light (1.5 intensity) at (-20, -20, 20)

### Animation Details
- Particles rotate: 0.0001 (x), 0.0003 (y) per frame
- Cubes float with sine/cosine curves
- Torus rotates: 0.002 (x), 0.001 (y)
- Torus2 rotates: -0.001 (x), 0.002 (z)
- Point lights follow circular paths

## Testing

1. **Test Login**:
   - Go to login.html
   - Enter any email and password
   - You'll be redirected to dashboard.html
   - Profile data will display

2. **Test Profile Click**:
   - Go to index.html
   - Click the profile icon (~) in navbar
   - If logged in: Dashboard loads
   - If not logged in: Login page loads

3. **Test Logout**:
   - On dashboard, click "Logout" button
   - localStorage clears
   - Returns to index.html

4. **Three.js Effects**:
   - Watch particles rotate in background
   - Cubes float up and down
   - Torus geometries spin continuously
   - Lighting creates dynamic shadows

## Responsive Design

- **Desktop**: Full 2-column layout with stats grid
- **Tablet (1024px)**: Single column layout
- **Mobile (768px)**: Stacked components, single stat column
- **Small Mobile (480px)**: Minimal padding, optimized fonts

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Three.js: Supported on all modern browsers

## Performance
- WebGL rendering with antialias
- Efficient particle system using BufferGeometry
- Requestanimationframe for smooth 60fps
- Optimized resize handling

## Customization Options

### Change Colors:
Edit dashboard.html `<style>` section or dashboard.js geometry creation

### Modify Animations:
Dashboard.js animation loop controls all 3D movements

### Add More Data:
Modify dashboard.html stats cards and order items

### Theme Colors:
- Primary: #ff7b00 (orange)
- Secondary: #ff00c8 (pink)
- Background: #0a0a0a (dark)
