// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navOptions = document.getElementById("navOptions");

if (hamburger && navOptions) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navOptions.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navOptions.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navOptions.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navigation")) {
            hamburger.classList.remove("active");
            navOptions.classList.remove("active");
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href !== "#") {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

// Typing effect for explore section
const text = "Explore Product";
let index = 0;
let hasTyped = false;
const speed = 100;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typ_eff").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, speed);
    }
}

// Intersection Observer for scroll trigger
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
            hasTyped = true;
            typeEffect();
        }
    });
});

const exploreSection = document.querySelector('#Explore');
if (exploreSection) {
    observer.observe(exploreSection);
}

// Contact form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const response = document.querySelector(".form-response");
        response.textContent = "Sending your message...";
        response.style.opacity = 1;

        setTimeout(() => {
            response.textContent = "✅ Your message has been sent successfully!";
            response.style.color = "#5e4efa";
            this.reset();
        }, 2000);
    });
}

// Newsletter form submission
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const response = document.querySelector(".newsletter-response");
        response.textContent = "Subscribing...";

        setTimeout(() => {
            response.textContent = "✅ Subscribed successfully!";
            response.style.color = "#5e4efa";
            this.reset();
        }, 2000);
    });
}

// Add active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.options a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === section.getAttribute('id')) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Mobile menu toggle (for future implementation)
window.addEventListener('resize', () => {
    // Auto-adjust on resize
    document.body.style.overflow = 'auto';
});

// Profile Account Click Handler
const profileAccount = document.querySelector('.profile_account');
if (profileAccount) {
    profileAccount.addEventListener('click', () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userEmail = localStorage.getItem('userEmail');

        if (isLoggedIn === 'true' && userEmail) {
            // User is logged in - navigate to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // User is not logged in - navigate to login
            window.location.href = 'login.html';
        }
    });
}
