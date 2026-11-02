/* ============================================
   KAYA HOME & LIVING - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize global elements
    updateCartBadge();

    // Initialize page-specific logic based on elements present
    if (document.getElementById('shopGrid')) {
        renderProducts();
    }
    if (document.getElementById('cartContainer')) {
        renderCart();
    }
    if (document.querySelector('.detail-images .main-image')) {
        initProductLightbox();
    }
});

/* ============================================
   1. GLOBAL FUNCTIONS (Used on all pages)
   ============================================ */

// Mobile Navigation Toggle
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('active');
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }
}

// Update Cart Badge Count
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.badge-cart');
    badges.forEach(badge => badge.textContent = total);
}

// Generic Add to Cart (for Home page quick-add buttons)
function addToCart(product, price, image = '') {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.product === product);
    
    if (existing) {
        existing.quantity += 1;
        if (!existing.image && image) existing.image = image;
    } else {
        cart.push({ product, price, quantity: 1, image });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`✓ ${product} added to cart (R${price})`);
}


/* ============================================
   2. HOME PAGE LOGIC (index.html)
   ============================================ */

// Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    if (emailInput) {
        const email = emailInput.value;
        if (email && email.includes('@')) {
            showToast(`✓ Subscribed with ${email}!`);
            emailInput.value = ''; 
        } else {
            showToast('⚠ Please enter a valid email address.');
        }
    }
}

// Home Page Category Filter (Temporary filter logic)
function filterCategory(category) {
    const cards = document.querySelectorAll('.product-card');
    let count = 0;
    cards.forEach(card => {
        if (card.dataset.category === category) {
            card.style.display = 'block';
            count++;
        } else {
            card.style.display = 'none';
        }
    });
    showToast(`Showing ${count} ${category} products`);
    
    // Reset back to all after 4 seconds
    setTimeout(() => {
        cards.forEach(card => card.style.display = 'block');
    }, 4000);
}


/* ============================================
   3. SHOP PAGE LOGIC (shop.html)
   ============================================ */

// Product Database for Dynamic Rendering
const products = [
    { id: 1, name: "Handwoven rug", category: "Textiles", price: 1250, image: "Images/rug.jpg.avif" },
    { id: 2, name: "Terracotta lamp", category: "Lighting", price: 890, image: "Images/Terracotta lamp.jpg" },
    { id: 3, name: "Palm basket", category: "Decor", price: 540, image: "Images/palm basket.jpg" },
    { id: 4, name: "Clay mug set", category: "Tableware", price: 990, image: "Images/clay mug set.jpg" },
    { id: 5, name: "Planter pot", category: "Decor", price: 410, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=200&fit=crop" },
    { id: 6, name: "Throw cushion", category: "Textiles", price: 670, image: "Images/Throw cushion.jpg" },
    { id: 7, name: "Ceramic vase", category: "Decor", price: 780, image: "Images/Ceramic vase.jpg" },
    { id: 8, name: "Wooden serving board", category: "Tableware", price: 520, image: "Images/Wooden serving board.jpg" },
    { id: 9, name: "Cotton throw", category: "Textiles", price: 940, image: "Images/Cotton throw.jpg" },
    { id: 10, name: "Bamboo pendant", category: "Lighting", price: 1100, image: "Images/Bamboo pendant.jpg" },
];

let currentCategory = 'all';

function renderProducts() {
    const grid = document.getElementById('shopGrid');
    if (!grid) return; 

    const searchInput = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';
    
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchInput);
        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="img"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
            <h4>${product.name}</h4>
            <div class="price">R${product.price}</div>
            <span class="stock-badge"><i class="fas fa-check-circle"></i> In stock</span>
            <button class="btn-quick" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Quick add</button>
        </div>
    `).join('');
    
    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = `Showing ${filteredProducts.length} products`;
}

function filterProducts(category, el) {
    currentCategory = category;
    document.querySelectorAll('.filter-group .pill').forEach(p => p.classList.remove('active'));
    if (el) el.classList.add('active');
    renderProducts();
}


/* ============================================
   4. PRODUCT DETAIL PAGE LOGIC (product.html)
   ============================================ */

function initProductLightbox() {
    const mainImage = document.querySelector('.detail-images .main-image');
    if (mainImage) {
        mainImage.style.cursor = 'zoom-in';
        mainImage.addEventListener('click', () => {
            const img = mainImage.querySelector('img');
            if (img) {
                openModal(img.src);
            } else {
                openModal('Images/rug.jpg.avif'); // Fallback
            }
        });
    }
}

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10); 
        modalImg.src = imageSrc;
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}


/* ============================================
   5. CART PAGE LOGIC (cart.html)
   ============================================ */

function renderCart() {
    const container = document.getElementById('cartContainer');
    if (!container) return; 

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-layout">
                <div class="cart-items">
                    <div class="empty-cart">
                        <i class="fas fa-shopping-bag"></i>
                        <h3>Your cart is empty</h3>
                        <p>Browse our shop and add some beautiful pieces.</p>
                        <a href="shop.html" class="hero-btn" style="display:inline-block; margin-top:1rem; background:#c1663d; color:white; padding:0.6rem 2rem; border-radius:60px; text-decoration:none;">Start shopping</a>
                    </div>
                </div>
                <div class="cart-summary">
                    <h3>Order summary</h3>
                    <div class="summary-row"><span>Subtotal</span><span>R0</span></div>
                    <div class="summary-row"><span>Shipping</span><span>R0</span></div>
                    <div class="summary-row total"><span>Total</span><span class="highlight">R0</span></div>
                </div>
            </div>
        `;
        const checkoutSection = document.getElementById('checkoutSection');
        if (checkoutSection) checkoutSection.style.display = 'none';
        updateCartBadge();
        return;
    }

    let subtotal = 0;
    let itemsHtml = '';
    
    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        subtotal += total;
        const imageSrc = item.image || 'Images/rug.jpg.avif';
        
        itemsHtml += `
            <div class="cart-item">
                <div class="item-img"><img src="${imageSrc}" alt="${item.product}"></div>
                <div class="item-details">
                    <h4>${item.product}</h4>
                    <div class="item-meta">R${item.price} each</div>
                </div>
                <div class="item-price">R${total}</div>
                <div class="item-qty">
                    <button onclick="updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
                </div>
                <div class="item-remove" onclick="removeItem(${index})"><i class="fas fa-trash-alt"></i></div>
            </div>
        `;
    });

    const shipping = subtotal > 1000 ? 0 : 80;
    const total = subtotal + shipping;

    container.innerHTML = `
        <div class="cart-layout">
            <div class="cart-items">
                <div class="cart-header"><span>Product</span><span>Quantity</span><span>Total</span></div>
                ${itemsHtml}
                <div style="margin-top:1rem; font-size:0.9rem; color:#5a4d44; display:flex; gap:1.5rem; flex-wrap:wrap;">
                    <span><i class="fas fa-gift" style="color:#c1663d;"></i> ${subtotal > 1000 ? '✓ Free shipping applied!' : 'Free shipping over R1,000'}</span>
                    <span><i class="fas fa-truck" style="color:#c1663d;"></i> Delivery in 3–5 days</span>
                </div>
            </div>
            <div class="cart-summary">
                <h3>Order summary</h3>
                <div class="summary-row"><span>Subtotal</span><span>R${subtotal}</span></div>
                <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : 'R'+shipping}</span></div>
                <div class="summary-row" style="color:#1f5a2a;"><span>Discount</span><span>-R0</span></div>
                <div class="summary-row total"><span>Total</span><span class="highlight">R${total}</span></div>
                <div class="promo-code">
                    <input type="text" id="promoInput" placeholder="Promo code" value="WELCOME10">
                    <button onclick="applyPromo()">Apply</button>
                </div>
                <a href="#checkout" class="checkout-btn" onclick="scrollToCheckout()"><i class="fas fa-lock"></i> Proceed to checkout</a>
                <div class="payment-icons">
                    <i class="fas fa-credit-card"></i>
                    <i class="fas fa-mobile-alt"></i>
                    <i class="fas fa-university"></i>
                    <span style="font-size:0.7rem; color:#a08472;">PayFast · Yoco · Snapscan</span>
                </div>
            </div>
        </div>
    `;

    updateOrderSummary(cart);
    const checkoutSection = document.getElementById('checkoutSection');
    if (checkoutSection) checkoutSection.style.display = 'block';
    updateCartBadge();
}

function updateQty(index, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = Math.max(1, cart[index].quantity + delta);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    showToast('Cart updated');
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart[index].product;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    showToast(`✓ Removed ${product} from cart`);
}

function updateOrderSummary(cart) {
    let subtotal = 0;
    let itemsHtml = '';
    cart.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;
        itemsHtml += `<div class="order-item"><span>${item.product} ×${item.quantity}</span><span>R${total}</span></div>`;
    });
    const shipping = subtotal > 1000 ? 0 : 80;
    
    const orderItemsEl = document.getElementById('orderItems');
    const shippingEl = document.getElementById('shippingCost');
    const totalEl = document.getElementById('orderTotal');

    if (orderItemsEl) orderItemsEl.innerHTML = itemsHtml;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : 'R'+shipping;
    if (totalEl) totalEl.textContent = 'R' + (subtotal + shipping);
}

function applyPromo() {
    const input = document.getElementById('promoInput');
    if (input && input.value.trim().toUpperCase() === 'WELCOME10') {
        showToast('✓ Promo code applied! 10% off your next order.');
    } else {
        showToast('⚠ Invalid promo code. Try WELCOME10');
    }
}

function scrollToCheckout() {
    const section = document.getElementById('checkoutSection');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function placeOrder() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    
    if (!firstName || !lastName || !email) {
        showToast('⚠ Please fill in all required fields.');
        return;
    }
    showToast(`✓ Order placed successfully! Thank you, ${firstName}!`);
    localStorage.setItem('cart', JSON.stringify([]));
    setTimeout(() => {
        renderCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
}0
/* ============================================
   6. FORM LOGIC: ENQUIRY & CONTACT (enquiry.html & contact.html)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ENQUIRY FORM LOGIC ---
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default page reload for AJAX
            
            // Basic Validation
            const name = document.getElementById('enqName').value.trim();
            const email = document.getElementById('enqEmail').value.trim();
            const type = document.getElementById('enqType').value;
            
            if (name.length < 2 || !email.includes('@') || !type) {
                showToast('⚠ Please fill in all required fields correctly.');
                return;
            }

            // Simulate AJAX Submission
            const submitBtn = enquiryForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                // Hide form and show dynamic response
                enquiryForm.style.display = 'none';
                const resultBox = document.getElementById('enquiryResult');
                const resultMsg = document.getElementById('resultMessage');
                
                let responseText = '';
                if (type === 'product') {
                    responseText = "Thank you for your product enquiry! Our current lead time for out-of-stock items is 2 weeks. A catalogue with pricing has been sent to your email.";
                } else if (type === 'volunteer') {
                    responseText = "Thank you for your interest in volunteering! We host volunteer orientation sessions on the first Saturday of every month. We will email you the details shortly.";
                } else if (type === 'sponsor') {
                    responseText = "Thank you for your sponsorship enquiry. We will email you our partnership deck and current community projects shortly.";
                }
                
                resultMsg.textContent = responseText;
                resultBox.style.display = 'block';
                
                showToast('✓ Enquiry processed successfully!');
                this.reset();
            }, 1500); // Simulate network delay
        });
    }

    // --- 2. CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default page reload for AJAX
            
            const name = document.getElementById('conName').value.trim();
            const email = document.getElementById('conEmail').value.trim();
            const message = document.getElementById('conMessage').value.trim();
            
            if (!name || !email || !message) {
                showToast('⚠ Please fill in all required fields.');
                return;
            }

            // Simulate AJAX Submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                showToast(`✓ Message sent successfully! Thank you, ${name}.`);
                contactForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-envelope"></i> Send Message';
            }, 1500); // Simulate network delay
        });
    }
});