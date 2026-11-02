# Kaya Home & Living - E-Commerce Website

![Kaya Home & Living](https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=300&fit=crop)

## 📖 Project Overview
Kaya Home & Living is a fully functional, responsive e-commerce front-end prototype built for a South African homeware and decor store. The website aims to bring locally made, artisan-crafted goods to a wider online audience, reflecting the brand's warm, earthy, and premium aesthetic.

**Live Site:** [https://startling-kleicha-c743c7.netlify.app/](https://startling-kleicha-c743c7.netlify.app/)

## 🎯 Key Objectives Addressed
- **Launch a functional online store:** Implemented a complete cart and checkout flow using `localStorage`.
- **Showcase product stories:** Added dedicated artisan story sections and detailed product pages.
- **Build an email list:** Integrated a newsletter subscription feature across multiple pages.
- **Provide store information:** Created a "Visit Us" page with an interactive Google Map and trading hours.
- **SEO Optimization:** Created `robots.txt` and `sitemap.xml` for search engine indexing.

## ✨ Features
- **Dynamic Product Catalogue:** Products are rendered dynamically using JavaScript, allowing for real-time search and category filtering without page reloads.
- **Interactive Cart & Checkout:** A fully functional shopping cart with quantity adjustments, local storage persistence, and a simulated checkout process.
- **Image Lightbox:** An interactive modal on the product detail page allows users to view product images in a larger format.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing, complete with a mobile hamburger navigation menu.
- **Interactive Map:** Embedded Google Maps on the "Visit Us" page for easy location finding.
- **Toast Notifications:** User-friendly feedback for actions like adding to cart or subscribing to the newsletter.

## 🛠️ Technologies Used
- **HTML5:** Semantic structure and accessible markup.
- **CSS3:** Custom properties (variables), Flexbox, CSS Grid, and media queries for responsive design.
- **JavaScript (ES6+):** DOM manipulation, array methods (`filter`, `map`), event handling, and `localStorage` for cart persistence.
- **Font Awesome:** Icons used throughout the UI.
- **Google Fonts:** 'Playfair Display' for headings and 'Inter' for body text.
- **Netlify:** Hosting and deployment.
- **Added Enquiry:** Created `enquiry.html`. Implemented client-side HTML5 validation and custom JavaScript validation.
- **AJAX Form Submission:** Both forms now use JavaScript to intercept submissions, prevent page reloads, and simulate an asynchronous backend response (for enquiry, it dynamically shows cost/availability; for contact, it compiles and simulates sending an email).

## 📂 File Structure
```text
/kaya-home-and-living
│
├── index.html          # Home page
├── shop.html           # Product catalogue with search/filter
├── product.html        # Single product detail with lightbox
├── cart.html           # Shopping cart and checkout
├── about.html          # Brand story and team
├── visit.html          # Store location and interactive map
├── journal.html        # Blog/Journal page
├── track.html          # Order tracking page
│
├── style.css           # Main stylesheet
├── script.js           # Main JavaScript file
│
├── Images/             # Product images folder
│
├── robots.txt          # SEO crawler instructions
├── sitemap.xml         # SEO site structure map
└── README.md           # Project documentation