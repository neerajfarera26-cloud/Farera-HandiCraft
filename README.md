# Farera Handicraft - Ultra Modern E-Commerce Platform

A premium, fully animated e-commerce website for handcrafted ethnic wear featuring advanced 3D effects, GSAP animations, and Firebase authentication.

## 🎯 Features

### Home Page (`index.html`)
✓ **Ultra-Responsive Design** - Mobile-first, optimized for all devices
✓ **Advanced GSAP Scroll Animations** - 3D transforms, parallax effects
✓ **Sticky Navigation** - Hamburger menu on mobile (<768px)
✓ **Hero Section** - Animated welcome with circular gradient
✓ **Explore Section** - Marquee image carousel
✓ **About Sections** - Founder and owner profiles with glass effects
✓ **Contact Section** - Form with map integration
✓ **Premium Footer** - Newsletter subscription, social links
✓ **CSS Animations** - Fade, slide, scale, rotate effects

### Explore Page (`Explore Page/explore.html`)
✓ **3D Background** - Three.js animated particles and meshes
✓ **Product Grid** - Responsive grid with 16 diverse products
✓ **Dynamic Filtering** - All/Kurtis/Suits/Dupattas/New Arrivals
✓ **Hover Effects** - 3D card rotation, image zoom, glow
✓ **Product Badges** - New, Limited, Premium, Best Seller
✓ **Add to Cart** - Toast notifications
✓ **Scroll Animations** - Staggered product reveal
✓ **External Images** - High-quality Unsplash photos

### Login & Signup Page (`login.html`)
✓ **Advanced GSAP Animations** - Form transitions, particle bursts
✓ **3D Background** - Animated torus, octahedron, icosahedron
✓ **Firebase Integration** - Email/Password authentication
✓ **OAuth Login** - Google and Facebook sign-in
✓ **Form Validation** - Real-time input validation
✓ **Password Toggle** - Show/hide with rotation animation
✓ **Success Messages** - Animated overlays with icons
✓ **Error Handling** - Shake animation, toast notifications
✓ **Glassmorphism UI** - Modern backdrop blur effects
✓ **Responsive Design** - Desktop and mobile layouts

## 🏗️ Project Structure

```
HTML Projects/
├── index.html                  # Main home page
├── login.html                 # Login & signup page
├── style.css                  # Main stylesheet (ultra-responsive)
├── script.js                  # Main JavaScript
├── animations.js              # GSAP scroll animations
├── login.js                   # Login page logic + Firebase
├── FIREBASE_SETUP.md          # Firebase configuration guide
├── README.md                  # This file
├── Image/                     # Local product images
│   ├── Kurti.jpeg
│   ├── Kurti2 (1-4).jpeg
│   ├── Kurti3 (1-2).jpeg
│   ├── Neeraj_farera.jpg
│   └── Imageeeeeeee.jpg
├── Explore Page/
│   ├── explore.html          # Product showcase page
│   ├── css.css               # Explore page styles
│   ├── explore.js            # Product logic + GSAP
│   └── three-bg.js           # 3D background
└── Explore Page/imagessss/   # Product images folder
```

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#ff7b00`
- **Primary Pink**: `#ff00c8`
- **Cyan Accent**: `#00d4ff`
- **Dark Background**: `#0a0a0a`
- **Light Text**: `#ffffff`
- **Muted Text**: `#a0a0a0`

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: Poppins (text)
- **Monospace**: Arial, Helvetica (fallback)

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Extra Small**: Below 480px

## 🚀 Getting Started

### 1. Basic Setup
```bash
# Clone or download the project
cd "HTML Projects"

# Open in browser
open index.html
```

### 2. Firebase Setup (Optional)
See `FIREBASE_SETUP.md` for detailed instructions to:
- Create Firebase project
- Enable Google OAuth
- Enable Facebook OAuth
- Configure credentials in `login.js`

### 3. Local Testing
- Email login works in demo mode without Firebase
- Social buttons show demo message without Firebase
- All animations work fully in demo mode

## 📱 Responsive Features

### Navigation
- **Desktop**: Full horizontal menu with logo, options, buttons
- **Tablet (≤768px)**: Hamburger menu activated
- **Mobile**: Touch-friendly menu, compact layout

### Layout
- **Grid System**: Auto-fit columns with minimum widths
- **Flexible Spacing**: Rem-based sizing (scales with viewport)
- **Touch Targets**: 44px minimum for mobile buttons
- **Font Scaling**: clamp() for fluid typography

### Images
- **Local**: Optimized JPEG files
- **External**: Unsplash API (explore page)
- **Responsive**: srcset ready, object-fit cover

## 🎬 Animation Libraries

### GSAP 3.12.2
- ScrollTrigger plugin for scroll-triggered animations
- Draggable plugin (ready for future use)
- Timeline animations for sequential effects
- Stagger for element-by-element animations

### Three.js r128
- 3D particle systems
- Geometric shapes (Torus, Octahedron, Icosahedron)
- Point lights with emission glow
- Interactive camera tracking

### CSS Animations
- Keyframe animations (float, spin, fadeInUp)
- Transform properties (translate, rotate, scale)
- Transition easing functions

## 🔐 Authentication

### Email/Password
- Firebase Authentication
- Real-time validation
- Password confirmation
- Remember me option

### Google OAuth
- Single sign-on integration
- Automatic profile population
- Secure token handling

### Facebook OAuth
- Social login option
- User data sync
- Session management

## 📊 Performance Optimizations

✓ **Code Splitting** - Separate animation files
✓ **Lazy Loading** - Images load on demand
✓ **Minified CSS/JS** - Ready for production
✓ **GPU Acceleration** - transform and opacity only
✓ **Debounced Events** - Scroll and resize handlers
✓ **RequestAnimationFrame** - 60 FPS animations
✓ **CDN Resources** - Firebase, GSAP, Three.js from CDN

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 File Descriptions

### HTML Files
- **index.html** - Main landing page with all sections
- **login.html** - Authentication page with OAuth
- **explore.html** - Product showcase with filters

### CSS Files
- **style.css** - Responsive design, media queries, animations
- **css.css** (in Explore) - Explore page specific styles

### JavaScript Files
- **script.js** - Navigation, smooth scroll, form handling
- **animations.js** - GSAP scroll animations, advanced effects
- **login.js** - Firebase auth, GSAP forms, 3D background
- **explore.js** - Product management, filters, GSAP cards
- **three-bg.js** - Three.js 3D background initialization

## 🐛 Debugging

### Enable Console Logging
All scripts have `console.log()` statements:
- Open browser DevTools (F12)
- Check Console tab for initialization messages
- Check Network tab for Firebase errors

### Common Issues

**3D Background Not Showing**
- Check browser WebGL support
- Clear browser cache
- Check console for Three.js errors

**Animations Not Playing**
- Verify GSAP CDN is loaded
- Check browser console for JS errors
- Ensure animation classes are applied

**Firebase Auth Not Working**
- See FIREBASE_SETUP.md
- Verify credentials in login.js
- Check browser console for Firebase errors

**Responsive Issues**
- Check viewport meta tag is present
- Clear browser cache
- Test in mobile simulator or real device

## 🔄 Deployment

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init

# Deploy
firebase deploy
```

### Other Hosting
- Copy all files to web server
- Update Firebase authorized domains
- Test authentication workflows

## 📚 Learning Resources

- [GSAP Documentation](https://gsap.com/docs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Firebase Guide](https://firebase.google.com/docs)
- [CSS Grid & Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/)
- [Responsive Design](https://web.dev/responsive-web-design-basics/)

## 💡 Customization

### Change Colors
Edit color variables in `style.css`:
```css
--primary-orange: #ff7b00;
--primary-pink: #ff00c8;
```

### Add Products
Edit product array in `explore.js`:
```javascript
const products = [
    {
        id: 17,
        name: "New Product",
        category: "kurtis",
        price: "₹2,999",
        description: "Product description",
        image: "https://image-url.com/image.jpg",
        badge: "New"
    }
];
```

### Modify Animations
Edit GSAP timelines in `animations.js` and `login.js`:
```javascript
gsap.to(selector, {
    duration: 1,
    ease: "power2.out",
    // properties
});
```

## 📞 Support

For issues with:
- **Firebase**: See FIREBASE_SETUP.md
- **GSAP**: Check GSAP console logs
- **Three.js**: Check browser WebGL support
- **Responsive**: Test on real devices

## 📄 License

This project is for Farera Handicraft - All Rights Reserved

---

**Created with ❤️ for Farera Handicraft**
*Premium Handcrafted Ethnic Wear from Jaipur*
