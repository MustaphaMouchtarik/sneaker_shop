// Sneaker product data
const products = [
  { id: 1, name: "Nike Air Max 90 Infrared", price: 1200, img: "https://images.stockx.com/images/Nike-Air-Max-90-Infrared-2020-Product.jpg" },
  { id: 2, name: "Adidas Yeezy Boost 350 V2 Carbon", price: 2200, img: "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Carbon-Product.jpg" },
  { id: 3, name: "Jordan 1 Retro High OG", price: 1800, img: "https://m.media-amazon.com/images/I/71n-Dh2kDXL._UY900_.jpg" },
  { id: 4, name: "New Balance 550 White Green", price: 950, img: "https://images.stockx.com/images/New-Balance-550-White-Green-Product.jpg" },
  { id: 5, name: "Nike Dunk Low Panda", price: 1100, img: "https://images.stockx.com/images/Nike-Dunk-Low-Black-White-Product.jpg" },
  { id: 6, name: "Adidas Forum Low", price: 850, img: "https://i.ibb.co/S4J1j4tD/Untitled-1.jpg" }
];

let cart = [];

// Navigation logic
const navLinks = {
  home: document.getElementById('nav-home'),
  shop: document.getElementById('nav-shop'),
  cart: document.getElementById('nav-cart'),
  contact: document.getElementById('nav-contact')
};
const sections = {
  home: document.getElementById('home-section'),
  shop: document.getElementById('shop-section'),
  cart: document.getElementById('cart-section'),
  contact: document.getElementById('contact-section')
};

function showSection(section) {
  Object.values(sections).forEach(sec => sec.classList.remove('active'));
  Object.values(navLinks).forEach(link => link.classList.remove('active'));
  sections[section].classList.add('active');
  navLinks[section].classList.add('active');
}

navLinks.home.addEventListener('click', e => { e.preventDefault(); showSection('home'); });
navLinks.shop.addEventListener('click', e => { e.preventDefault(); showSection('shop'); });
navLinks.cart.addEventListener('click', e => { e.preventDefault(); showSection('cart'); renderCart(); });
navLinks.contact.addEventListener('click', e => { e.preventDefault(); showSection('contact'); });
document.getElementById('cart').addEventListener('click', e => {
  showSection('cart');
  renderCart();
});
document.getElementById('hero-shop-btn').addEventListener('click', e => {
  e.preventDefault();
  showSection('shop');
});

// Show home by default
showSection('home');

// Product rendering
const productList = document.getElementById("product-list");
function renderProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} MAD</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    div.querySelector('button').addEventListener('click', () => addToCart(product.id));
    productList.appendChild(div);
  });
}
renderProducts();

// Cart logic
const cartCount = document.getElementById("cart-count");
function addToCart(id) {
  cart.push(id);
  cartCount.textContent = cart.length;
}
function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');
  cartItemsDiv.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalDiv.textContent = '';
    return;
  }
  const counts = {};
  cart.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
  Object.keys(counts).forEach(id => {
    const product = products.find(p => p.id == id);
    const quantity = counts[id];
    total += product.price * quantity;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${product.img}" alt="${product.name}" />
        <span>${product.name} (x${quantity})</span>
        <span>${product.price * quantity} MAD</span>
      </div>
    `;
  });
  cartTotalDiv.textContent = `Total: ${total} MAD`;
}

// Contact form logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('contact-success').style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
      document.getElementById('contact-success').style.display = 'none';
    }, 3000);
  });
}
