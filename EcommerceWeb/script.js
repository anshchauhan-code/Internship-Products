  const products = [
    { id:1,  name:'Wireless Mouse',       price:599,  emoji:'🖱️' },
    { id:2,  name:'USB Keyboard',         price:849,  emoji:'⌨️' },
    { id:3,  name:'Webcam HD',            price:1299, emoji:'📷' },
    { id:4,  name:'LED Desk Lamp',        price:399,  emoji:'💡' },
    { id:5,  name:'Laptop Stand',         price:699,  emoji:'💻' },
    { id:6,  name:'Headphones',           price:1599, emoji:'🎧' },
    { id:7,  name:'USB-C Hub',            price:1199, emoji:'🔌' },
    { id:8,  name:'Portable SSD 1TB',     price:3499, emoji:'💾' },
    { id:9,  name:'Bluetooth Speaker',    price:1899, emoji:'🔊' },
    { id:10, name:'Fast Charger 65W',     price:799,  emoji:'⚡' },
  ];

  let cart = [];

  // Render product cards
  const grid = document.getElementById('productGrid');
  products.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <div class="emoji">${p.emoji}</div>
        <h3>${p.name}</h3>
        <div class="price">₹${p.price}</div>
        <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });

  function addToCart(id) {
    const p = products.find(x => x.id === id);
    cart.push({ ...p, uid: Date.now() + Math.random() });
    document.getElementById('cartCount').textContent = cart.length;
    // If cart is open, refresh it
    if (document.getElementById('cartPanel').style.display === 'block') renderCart();
  }

  function renderCart() {
    const container = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (cart.length === 0) {
      container.innerHTML = '<p style="color:#999; font-size:14px;">Your cart is empty.</p>';
      document.getElementById('cartTotal').textContent = '';
      checkoutBtn.disabled = true;
      return;
    }
    checkoutBtn.disabled = false;
    container.innerHTML = cart.map(p => `
      <div class="cart-item">
        <span>${p.emoji} ${p.name}</span>
        <span>₹${p.price}</span>
        <button class="remove-btn" onclick="removeItem('${p.uid}')">✕</button>
      </div>`).join('');
    const total = cart.reduce((s, p) => s + p.price, 0);
    document.getElementById('cartTotal').textContent = `Total: ₹${total}`;
  }

  function removeItem(uid) {
    cart = cart.filter(p => p.uid != uid);
    document.getElementById('cartCount').textContent = cart.length;
    renderCart();
  }

  function toggleCart() {
    const panel = document.getElementById('cartPanel');
    const isOpen = panel.style.display === 'block';
    panel.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) renderCart();
  }

  function checkout() {
    if (cart.length === 0) return;
    const total = cart.reduce((s, p) => s + p.price, 0);
    document.getElementById('orderItems').innerHTML =
      cart.map(p => `<div>${p.emoji} ${p.name} — ₹${p.price}</div>`).join('');
    document.getElementById('orderTotal').textContent = `Total Paid: ₹${total}`;
    document.getElementById('cartPanel').style.display = 'none';
    document.getElementById('orderOverlay').classList.add('open');
  }

  function dismissOrder() {
    cart = [];
    document.getElementById('cartCount').textContent = 0;
    document.getElementById('orderOverlay').classList.remove('open');
  }