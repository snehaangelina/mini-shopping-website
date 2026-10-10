const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 1999, emoji: "⌚" },
  { id: 3, name: "Backpack", price: 899, emoji: "🎒" },
  { id: 4, name: "Sneakers", price: 2499, emoji: "👟" },
  { id: 5, name: "Coffee Mug", price: 399, emoji: "☕" },
  { id: 6, name: "Sunglasses", price: 699, emoji: "🕶️" }
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const checkoutModal = document.getElementById("checkoutModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const message = document.getElementById("message");

function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <div class="card">
      <div class="emoji">${product.emoji}</div>
      <h3>${product.name}</h3>
      <p class="price">₹${product.price}</p>
      <button class="primary" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  updateCart();
  showMessage("Added to cart!");
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-row">
        <span>${item.emoji} ${item.name} × ${item.quantity}</span>
        <span>₹${item.price * item.quantity}
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </span>
      </div>
    `).join("");
  }

  cartTotal.textContent = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
}

function removeFromCart(id) {
  const item = cart.find(item => item.id === id);
  if (!item) return;
  if (item.quantity > 1) item.quantity--;
  else cart = cart.filter(item => item.id !== id);
  updateCart();
}

function showMessage(text) {
  message.textContent = text;
  message.style.display = "block";
  setTimeout(() => message.style.display = "none", 1800);
}

document.getElementById("cartBtn").onclick = () => {
  cartModal.classList.remove("hidden");
  updateCart();
};

document.getElementById("closeCart").onclick = () => cartModal.classList.add("hidden");

document.getElementById("checkoutBtn").onclick = () => {
  if (cart.length === 0) {
    showMessage("Please add a product first.");
    return;
  }
  cartModal.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
};

document.getElementById("closeCheckout").onclick = () =>
  checkoutModal.classList.add("hidden");

document.getElementById("checkoutForm").onsubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  checkoutModal.classList.add("hidden");
  cart = [];
  updateCart();
  event.target.reset();
  showMessage(`Thank you, ${name}! Order #${orderNumber} placed.`);
};

renderProducts();
updateCart();
