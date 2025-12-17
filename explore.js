// Advanced Product Management with Dynamic Loading and 3D Effects

gsap.registerPlugin(ScrollTrigger);

// Product Data with External Image URLs (Royalty-free ethnic wear images)
const products = [
    // Kurtis Collection
    {
        id: 1,
        name: "Sanganeri Printed Kurti",
        category: "kurtis",
        price: "₹2,199",
        description: "Hand-blocked traditional Jaipur print",
        image: "https://images.unsplash.com/photo-1609689424936-20ba1cc60065?w=500&h=600&fit=crop",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Embroidered Floral Kurti",
        category: "kurtis",
        price: "₹2,899",
        description: "Intricate hand-embroidered details",
        image: "https://images.unsplash.com/photo-1585399570906-e93a14f37acf?w=500&h=600&fit=crop",
        badge: "Limited"
    },
    {
        id: 3,
        name: "Cotton Summer Kurti",
        category: "kurtis",
        price: "₹1,799",
        description: "Breathable cotton fabric with minimalist design",
        image: "https://images.unsplash.com/photo-1618231722121-b32d6a83fb49?w=500&h=600&fit=crop",
        badge: "New"
    },
    {
        id: 4,
        name: "Silk Blend Kurti",
        category: "kurtis",
        price: "₹3,499",
        description: "Premium silk-cotton blend with glossy finish",
        image: "https://images.unsplash.com/photo-1626308410429-5a65dcb3eedd?w=500&h=600&fit=crop",
        badge: "Premium"
    },

    // Suit Sets Collection
    {
        id: 5,
        name: "Classic Suit Set",
        category: "suits",
        price: "₹3,999",
        description: "Three-piece traditional suit with dupatta",
        image: "https://images.unsplash.com/photo-1631445550770-97b1b3b60f1e?w=500&h=600&fit=crop",
        badge: "Best Seller"
    },
    {
        id: 6,
        name: "Festive Suit Ensemble",
        category: "suits",
        price: "₹4,499",
        description: "Handcrafted with gold embellishments",
        image: "https://images.unsplash.com/photo-1583391733956-3750e3ce9655?w=500&h=600&fit=crop",
        badge: "Exclusive"
    },
    {
        id: 7,
        name: "Contemporary Suit Set",
        category: "suits",
        price: "₹3,299",
        description: "Modern cut with traditional aesthetics",
        image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=600&fit=crop",
        badge: "New"
    },
    {
        id: 8,
        name: "Bridal Suit Collection",
        category: "suits",
        price: "₹7,999",
        description: "Luxurious bridal ensemble with zari work",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=600&fit=crop",
        badge: "Premium"
    },

    // Dupattas Collection
    {
        id: 9,
        name: "Handprinted Cotton Dupatta",
        category: "dupattas",
        price: "₹1,299",
        description: "Natural vegetable dyed cotton dupatta",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop",
        badge: "Eco-friendly"
    },
    {
        id: 10,
        name: "Silk Printed Dupatta",
        category: "dupattas",
        price: "₹2,199",
        description: "Premium silk dupatta with traditional motifs",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop",
        badge: "Popular"
    },
    {
        id: 11,
        name: "Chiffon Embroidered Dupatta",
        category: "dupattas",
        price: "₹1,799",
        description: "Lightweight chiffon with mirror work",
        image: "https://images.unsplash.com/photo-1599579810694-b3da7dd22b83?w=500&h=600&fit=crop",
        badge: "Trending"
    },
    {
        id: 12,
        name: "Wool Printed Dupatta",
        category: "dupattas",
        price: "₹1,599",
        description: "Warm wool dupatta perfect for winters",
        image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=600&fit=crop",
        badge: "Winter"
    },

    // New Arrivals
    {
        id: 13,
        name: "Indigo Dyed Collection",
        category: "new",
        price: "₹2,599",
        description: "Sustainable indigo-dyed ethnic wear",
        image: "https://images.unsplash.com/photo-1618231722121-b32d6a83fb49?w=500&h=600&fit=crop",
        badge: "New Arrival"
    },
    {
        id: 14,
        name: "Heritage Block Print",
        category: "new",
        price: "₹3,199",
        description: "Ancient block printing technique revived",
        image: "https://images.unsplash.com/photo-1606011344508-c1e42b57a577?w=500&h=600&fit=crop",
        badge: "New Arrival"
    },
    {
        id: 15,
        name: "Designer Fusion Kurti",
        category: "new",
        price: "₹4,299",
        description: "Modern fusion of traditional and contemporary",
        image: "https://images.unsplash.com/photo-1617633813152-6b3938c9a0a2?w=500&h=600&fit=crop",
        badge: "New Arrival"
    },
    {
        id: 16,
        name: "Artisan Collaboration",
        category: "new",
        price: "₹3,899",
        description: "Limited edition collaboration with local artisans",
        image: "https://images.unsplash.com/photo-1589308053245-04a41c950ca1?w=500&h=600&fit=crop",
        badge: "New Arrival"
    }
];

// Product Grid Renderer
function renderProducts(filter = 'all') {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <div class="product-badge">${product.badge}</div>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div>
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.name}', '${product.price}')">
                        Add
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(productCard);

        // GSAP Scroll Animation
        gsap.from(productCard, {
            scrollTrigger: {
                trigger: productCard,
                start: "top 100%",
                end: "top 50%",
                scrub: 0.5,
                markers: false
            },
            opacity: 0,
            y: 60,
            scale: 0.85,
            rotation: -5,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.05
        });

        // Hover 3D Effects
        productCard.addEventListener('mouseenter', function() {
            gsap.to(this, {
                rotationY: 8,
                rotationX: 5,
                duration: 0.4,
                ease: "power2.out"
            });

            gsap.to(this.querySelector('img'), {
                filter: "brightness(1.2) blur(0px)",
                duration: 0.4
            });
        });

        productCard.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.4,
                ease: "power2.out"
            });

            gsap.to(this.querySelector('img'), {
                filter: "brightness(0.9) blur(0px)",
                duration: 0.4
            });
        });
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
}

// Filter Button Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        renderProducts(filter);
    });
});

// Add to Cart Functionality
function addToCart(productName, price) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #ff7b00, #ff00c8);
        color: white;
        border-radius: 50px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 40px rgba(255, 123, 0, 0.4);
        animation: slideIn 0.3s ease-out;
    `;
    
    toast.innerHTML = `✓ ${productName} added to cart!`;
    document.body.appendChild(toast);

    gsap.to(toast, {
        bottom: 100,
        opacity: 0,
        duration: 3,
        delay: 0.5,
        ease: "power2.out",
        onComplete: () => toast.remove()
    });
}

// Initial Load
renderProducts('all');

// Scroll Performance Optimization
let lastScrollTime = Date.now();
window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime > 50) {
        lastScrollTime = now;
    }
});

console.log('Explore page loaded with 16 diverse products');
