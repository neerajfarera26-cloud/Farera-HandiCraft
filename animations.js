// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ====================================
// ADVANCED SCROLL ANIMATIONS - GSAP
// ====================================

// Initialize timeline for staggered animations
const animationConfig = {
    duration: 0.8,
    ease: "power3.inOut"
};

// ====================================
// 1. HOME SECTION ANIMATIONS
// ====================================

// Welcome text fade in from left
gsap.to(".animate-fade-in-left", {
    scrollTrigger: {
        trigger: ".Home_Page",
        start: "top 80%",
        end: "top 20%",
        scrub: 0.5,
        markers: false
    },
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power2.out"
}, "-=0.5");

gsap.set(".animate-fade-in-left", {
    x: -100,
    opacity: 0
});

// Welcome title animation
gsap.fromTo(".animate-title", 
    {
        opacity: 0,
        scale: 0.8,
        rotationY: -90,
        transformOrigin: "center center"
    },
    {
        scrollTrigger: {
            trigger: ".Home_Page",
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
            markers: false
        },
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "back.out(1.7)"
    }
);

// Circle image scale and rotate animation
gsap.set(".animate-scale-rotate", {
    scale: 0.8,
    opacity: 0,
    y: 50
});

gsap.to(".animate-scale-rotate", {
    scrollTrigger: {
        trigger: ".Home_Page",
        start: "top 80%",
        end: "center center",
        scrub: 1,
        markers: false
    },
    scale: 1,
    opacity: 1,
    y: 0,
    rotation: 360,
    duration: 1.5,
    ease: "elastic.out(1, 0.75)"
});

// Parallax effect on circle
gsap.to(".circle_image", {
    scrollTrigger: {
        trigger: ".Home_Page",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        markers: false
    },
    filter: "invert(25%)",
    rotation: 15,
    y: 100
});

// Text stagger animation
gsap.to(".animate-text-stagger", {
    scrollTrigger: {
        trigger: ".text_area",
        start: "top 75%",
        end: "top 50%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out"
});

gsap.set(".animate-text-stagger", {
    opacity: 0.3,
    y: 30
});

// ====================================
// 2. EXPLORE SECTION ANIMATIONS
// ====================================

// Flip in animation for explore title
gsap.fromTo("#typ_eff",
    {
        opacity: 0,
        rotationX: 90,
        transformOrigin: "center center"
    },
    {
        scrollTrigger: {
            trigger: ".explore",
            start: "top 80%",
            end: "top 40%",
            scrub: 0.5,
            markers: false
        },
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "back.out(2)"
    }
);

// Product images hover effect with scroll animation
gsap.to(".product-img", {
    scrollTrigger: {
        trigger: ".images_slide",
        start: "top 70%",
        end: "top 30%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255, 123, 0, 0.8))",
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.1
});

gsap.set(".product-img", {
    opacity: 0.6
});

// Slide up animation for images
gsap.set(".animate-slide-up", {
    y: 50,
    opacity: 0
});

gsap.to(".animate-slide-up", {
    scrollTrigger: {
        trigger: ".images_slide",
        start: "top 80%",
        end: "top 50%",
        scrub: 0.5,
        markers: false
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
});

// Bounce in animation for button
gsap.set(".animate-bounce-in", {
    scale: 0,
    opacity: 0,
    y: 30
});

gsap.to(".animate-bounce-in", {
    scrollTrigger: {
        trigger: ".button_box",
        start: "top 85%",
        end: "top 60%",
        scrub: 0.5,
        markers: false
    },
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.5)"
});

// Button glow animation on hover
const exploreBtn = document.querySelector(".explore_more");
if (exploreBtn) {
    exploreBtn.addEventListener("mouseenter", () => {
        gsap.to(exploreBtn, {
            boxShadow: "0 0 30px rgba(255, 123, 0, 0.8)",
            duration: 0.3,
            ease: "power2.out"
        });
    });

    exploreBtn.addEventListener("mouseleave", () => {
        gsap.to(exploreBtn, {
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
        });
    });
}

// ====================================
// 3. ABOUT SECTION ANIMATIONS
// ====================================

// About wrapper animation with glass effect
gsap.set(".animate-about-wrapper", {
    opacity: 0,
    y: 80,
    filter: "blur(10px)"
});

gsap.to(".animate-about-wrapper", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 85%",
        end: "top 40%",
        scrub: 0.7,
        markers: false
    },
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power3.out"
});

// Reverse wrapper for owner section
gsap.set(".animate-about-wrapper-reverse", {
    opacity: 0,
    y: 80,
    filter: "blur(10px)"
});

gsap.to(".animate-about-wrapper-reverse", {
    scrollTrigger: {
        trigger: ".about-section:nth-of-type(3)",
        start: "top 85%",
        end: "top 40%",
        scrub: 0.7,
        markers: false
    },
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power3.out"
});

// Image zoom animation
gsap.set(".animate-image-zoom", {
    scale: 0.7,
    opacity: 0,
    rotationZ: -5
});

gsap.to(".animate-image-zoom", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "center 50%",
        scrub: 0.5,
        markers: false
    },
    scale: 1,
    opacity: 1,
    rotationZ: 0,
    duration: 1.2,
    ease: "back.out(1.7)"
});

// Image zoom right for owner section
gsap.set(".animate-image-zoom-right", {
    scale: 0.7,
    opacity: 0,
    rotationZ: 5,
    x: 50
});

gsap.to(".animate-image-zoom-right", {
    scrollTrigger: {
        trigger: ".about-section:nth-of-type(3)",
        start: "top 80%",
        end: "center 50%",
        scrub: 0.5,
        markers: false
    },
    scale: 1,
    opacity: 1,
    rotationZ: 0,
    x: 0,
    duration: 1.2,
    ease: "back.out(1.7)"
});

// Text reveal animation
gsap.set(".animate-text-reveal", {
    opacity: 0,
    x: -50,
    clipPath: "inset(0 100% 0 0)"
});

gsap.to(".animate-text-reveal", {
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
        end: "top 40%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    duration: 1,
    ease: "power3.out"
});

// Text reveal alt (opposite direction)
gsap.set(".animate-text-reveal-alt", {
    opacity: 0,
    x: 50,
    clipPath: "inset(0 0 0 100%)"
});

gsap.to(".animate-text-reveal-alt", {
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
        end: "top 40%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0 0 0)",
    duration: 1,
    ease: "power3.out"
});

// Title animation - move up with letter spacing
gsap.set(".animate-title-up", {
    opacity: 0,
    y: 40,
    letterSpacing: "-10px"
});

gsap.to(".animate-title-up", {
    scrollTrigger: {
        trigger: ".section-title",
        start: "top 85%",
        end: "top 55%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    y: 0,
    letterSpacing: "2px",
    duration: 1,
    ease: "power2.out"
});

// ====================================
// 4. CONTACT SECTION ANIMATIONS
// ====================================

gsap.set(".animate-contact-section", {
    opacity: 0,
    y: 50
});

gsap.to(".animate-contact-section", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        end: "top 50%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
});

// Contact container stagger
gsap.set(".animate-contact-container > div", {
    opacity: 0,
    y: 30
});

gsap.to(".animate-contact-container > div", {
    scrollTrigger: {
        trigger: ".contact-container",
        start: "top 80%",
        end: "top 50%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2
});

// Map container fade and scale
gsap.set(".map-container", {
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)"
});

gsap.to(".map-container", {
    scrollTrigger: {
        trigger: ".map-container",
        start: "top 85%",
        end: "top 50%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "back.out(1.5)"
});

// ====================================
// 5. FOOTER ANIMATIONS
// ====================================

gsap.set(".footer-top > div", {
    opacity: 0,
    y: 40,
    filter: "blur(5px)"
});

gsap.to(".footer-top > div", {
    scrollTrigger: {
        trigger: ".premium-footer",
        start: "top 90%",
        end: "top 60%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1
});

gsap.set(".footer-bottom", {
    opacity: 0,
    y: 20
});

gsap.to(".footer-bottom", {
    scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top 95%",
        end: "top 80%",
        scrub: 0.5,
        markers: false
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
});

// Social icons hover animation
document.querySelectorAll(".social-icons a").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
            y: -8,
            rotation: 15,
            filter: "drop-shadow(0 0 15px rgba(255, 123, 0, 0.8))",
            duration: 0.3,
            ease: "back.out(2)"
        });
    });

    icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
            y: 0,
            rotation: 0,
            filter: "drop-shadow(0 0 0px rgba(255, 123, 0, 0))",
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// ====================================
// 6. ADVANCED EFFECTS
// ====================================

// Smooth scrollbar animation
window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollHeight) * 100;
    gsap.to(":root", {
        "--scroll-progress": scrollProgress + "%",
        duration: 0.1,
        ease: "none"
    });
});

// Mouse parallax effect on hover
const aboutImages = document.querySelectorAll(".about-image img");
aboutImages.forEach(img => {
    img.addEventListener("mousemove", (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(img, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power1.out"
        });
    });

    img.addEventListener("mouseleave", () => {
        gsap.to(img, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// Contact form input focus animation
const formInputs = document.querySelectorAll(".contact-form input, .contact-form textarea");
formInputs.forEach(input => {
    input.addEventListener("focus", () => {
        gsap.to(input, {
            borderColor: "#ff7b00",
            boxShadow: "0 0 15px rgba(255, 123, 0, 0.4)",
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    input.addEventListener("blur", () => {
        gsap.to(input, {
            borderColor: "#444",
            boxShadow: "0 0 0px rgba(255, 123, 0, 0)",
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

console.log("GSAP Advanced Scroll Animations Loaded Successfully");
