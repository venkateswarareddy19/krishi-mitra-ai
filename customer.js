/* ═══════════════════════════════════════════════════════════════
   KisanBazaar AI — Customer App JavaScript
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ── PRODUCT DATA ────────────────────────────────────────── */
const CUST_PRODUCTS = [
  {id:1,  name:'Fresh Tomatoes',      farm:'Suresh Patil Farm',  loc:'Nashik, MH',  price:22,  mrp:28,  qty:250, cat:'vegetable',organic:false,fresh:true,  freshHrs:4,  rating:4.5, reviews:128, bg:'#E8F5E9',ic:'local_florist',icCol:'#2E7D32'},
  {id:2,  name:'Red Onion (Grade A)', farm:'Vilas Shinde Farm',  loc:'Solapur, MH', price:18,  mrp:22,  qty:500, cat:'vegetable',organic:false,fresh:false, freshHrs:12, rating:4.3, reviews:89,  bg:'#FCE4EC',ic:'local_florist',icCol:'#880E4F'},
  {id:3,  name:'Alphonso Mango',      farm:'Anand Sawant Farm',  loc:'Ratnagiri,MH',price:180, mrp:220, qty:80,  cat:'fruit',   organic:true, fresh:true,  freshHrs:6,  rating:4.9, reviews:342, bg:'#FFF8E1',ic:'spa',         icCol:'#E65100'},
  {id:4,  name:'Pomegranate',         farm:'Sita Kale Farm',     loc:'Solapur, MH', price:95,  mrp:110, qty:300, cat:'fruit',   organic:true, fresh:false, freshHrs:18, rating:4.6, reviews:167, bg:'#FCE4EC',ic:'spa',         icCol:'#880E4F'},
  {id:5,  name:'Green Chilli (Fresh)',farm:'Kavita Jadhav Farm', loc:'Dhule, MH',   price:35,  mrp:45,  qty:100, cat:'vegetable',organic:false,fresh:true,  freshHrs:3,  rating:4.2, reviews:54,  bg:'#E8F5E9',ic:'local_florist',icCol:'#2E7D32'},
  {id:6,  name:'Soybean (Grade A)',   farm:'Priya Deshmukh Farm',loc:'Latur, MH',   price:48,  mrp:55,  qty:2000,cat:'grain',   organic:false,fresh:false, freshHrs:48, rating:4.4, reviews:78,  bg:'#E3F2FD',ic:'grain',       icCol:'#1565C0'},
  {id:7,  name:'Toor Dal',            farm:'Mohan Kulkarni Farm',loc:'Osmanabad,MH',price:92,  mrp:105, qty:400, cat:'pulse',   organic:false,fresh:false, freshHrs:72, rating:4.5, reviews:103, bg:'#E0F2F1',ic:'eco',         icCol:'#00695C'},
  {id:8,  name:'Organic Turmeric',    farm:'Rajesh More Farm',   loc:'Sangli, MH',  price:120, mrp:150, qty:150, cat:'spice',   organic:true, fresh:false, freshHrs:72, rating:4.8, reviews:231, bg:'#FFF3E0',ic:'star',        icCol:'#E65100'},
  {id:9,  name:'Sweet Corn',          farm:'Sneha Pawar Farm',   loc:'Pune, MH',    price:28,  mrp:35,  qty:200, cat:'vegetable',organic:false,fresh:true,  freshHrs:5,  rating:4.3, reviews:66,  bg:'#FFF9C4',ic:'local_florist',icCol:'#F9A825'},
  {id:10, name:'Banana (Robusta)',     farm:'Anil Bhosale Farm',  loc:'Jalgaon, MH', price:32,  mrp:38,  qty:600, cat:'fruit',   organic:false,fresh:true,  freshHrs:8,  rating:4.4, reviews:99,  bg:'#FFF8E1',ic:'spa',         icCol:'#F57F17'},
  {id:11, name:'Wheat MP Sharbati',   farm:'Dilip Wagh Farm',    loc:'Ahmednagar,MH',price:26, mrp:30,  qty:1500,cat:'grain',   organic:false,fresh:false, freshHrs:96, rating:4.6, reviews:187, bg:'#FFF8E1',ic:'grain',       icCol:'#795548'},
  {id:12, name:'Organic Groundnut',   farm:'Rekha Jagtap Farm',  loc:'Osmanabad,MH',price:82,  mrp:95,  qty:300, cat:'pulse',   organic:true, fresh:false, freshHrs:72, rating:4.7, reviews:143, bg:'#FBE9E7',ic:'eco',         icCol:'#BF360C'},
  {id:13, name:'Green Capsicum',      farm:'Nita Shinde Farm',   loc:'Pune, MH',    price:55,  mrp:65,  qty:120, cat:'vegetable',organic:true, fresh:true,  freshHrs:4,  rating:4.5, reviews:72,  bg:'#E8F5E9',ic:'local_florist',icCol:'#388E3C'},
  {id:14, name:'Chiku (Sapota)',       farm:'Kiran Patil Farm',   loc:'Thane, MH',   price:60,  mrp:72,  qty:180, cat:'fruit',   organic:true, fresh:true,  freshHrs:6,  rating:4.6, reviews:88,  bg:'#EFEBE9',ic:'spa',         icCol:'#5D4037'},
  {id:15, name:'Organic Coriander',   farm:'Asha More Farm',     loc:'Nashik, MH',  price:45,  mrp:55,  qty:80,  cat:'spice',   organic:true, fresh:true,  freshHrs:2,  rating:4.8, reviews:112, bg:'#E8F5E9',ic:'star',        icCol:'#2E7D32'},
  {id:16, name:'Urad Dal (Black)',     farm:'Santosh Wagh Farm',  loc:'Latur, MH',   price:88,  mrp:100, qty:350, cat:'pulse',   organic:false,fresh:false, freshHrs:96, rating:4.4, reviews:67,  bg:'#F3E5F5',ic:'eco',         icCol:'#6A1B9A'},
];

/* ── STATE ───────────────────────────────────────────────── */
const cart = [];
let currentCat = 'all';
let currentSort = 'latest';
let searchQuery = '';

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(CUST_PRODUCTS);
  updateCartBadge();

  // Ticker pause on hover
  const lt = document.querySelector('.lt-inner');
  if (lt) {
    lt.addEventListener('mouseenter', () => lt.style.animationPlayState = 'paused');
    lt.addEventListener('mouseleave', () => lt.style.animationPlayState = 'running');
  }
});

/* ── PRODUCT RENDERING ────────────────────────────────────── */
function renderProducts(list) {
  const el = document.getElementById('custProdGrid');
  const cnt = document.getElementById('prodCount');
  if (!el) return;

  if (cnt) cnt.textContent = list.length + ' products';

  if (!list.length) {
    el.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:48px 20px;">
        <span class="material-icons" style="font-size:52px;color:#C8DEC9;display:block;margin-bottom:12px;">search_off</span>
        <h4 style="font-family:'Poppins',sans-serif;font-size:15px;margin-bottom:6px;">No products found</h4>
        <p style="font-size:12px;color:var(--c-muted);">Try a different search or category</p>
      </div>`;
    return;
  }

  el.innerHTML = list.map(p => {
    const discount   = Math.round(((p.mrp - p.price) / p.mrp) * 100);
    const freshLabel = p.fresh ? `Harvested ${p.freshHrs}h ago` : `${p.freshHrs}h old`;
    const stars      = Math.round(p.rating);
    const starHtml   = Array.from({length:5}, (_,i) =>
      `<span class="material-icons" style="font-size:13px;color:${i < stars ? '#F9A825' : '#E0E0E0'};">star</span>`
    ).join('');

    return `
      <div class="cust-prod-card" onclick="openProduct(${p.id})">
        <div class="cp-img-wrap" style="background:${p.bg};">
          <span class="material-icons" style="color:${p.icCol};font-size:60px;">${p.ic}</span>
          <div class="cp-freshness"><span class="material-icons">schedule</span>${freshLabel}</div>
          ${p.organic ? '<div class="cp-organic-badge">ORGANIC</div>' : ''}
          ${discount > 0 ? `<div style="position:absolute;bottom:8px;left:8px;background:#C62828;color:#fff;font-size:9px;font-weight:800;padding:2px 7px;border-radius:20px;font-family:'Poppins',sans-serif;">${discount}% OFF</div>` : ''}
          <div class="cp-wish" onclick="event.stopPropagation();wishlistToggle(${p.id},this)">
            <span class="material-icons" id="wish_${p.id}">favorite_border</span>
          </div>
        </div>
        <div class="cp-body">
          <div class="cp-farm"><span class="material-icons">storefront</span>${p.farm}</div>
          <div class="cp-name">${p.name}</div>
          <div class="cp-rating">
            <div class="cp-stars">${starHtml}</div>
            <span class="cp-rating-num">${p.rating} (${p.reviews})</span>
          </div>
          <div class="cp-price-row">
            <div>
              <div class="cp-price">₹${p.price}<small>/kg</small></div>
              ${discount > 0 ? `<div class="cp-old-price">MRP ₹${p.mrp}/kg</div>` : ''}
            </div>
            <span style="font-size:10px;color:var(--c-muted);">${p.qty} kg avail.</span>
          </div>
          <div class="cp-stepper" onclick="event.stopPropagation()">
            <div class="cp-step-btn" onclick="changeProdQty(${p.id},-1)">−</div>
            <span class="cp-step-val" id="pqty_${p.id}">1</span>
            <span class="cp-step-unit">kg</span>
            <div class="cp-step-btn" onclick="changeProdQty(${p.id},1)">+</div>
          </div>
          <button class="cp-wa-btn" onclick="event.stopPropagation();addToCartAndWA(${p.id})">
            <span class="material-icons">chat</span>Order via WhatsApp
          </button>
        </div>
      </div>`;
  }).join('');
}

/* ── FILTER & SORT ───────────────────────────────────────── */
function filterCat(cat, el) {
  currentCat = cat;
  document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  const secTitle = document.getElementById('prodSectionTitle');
  if (secTitle) secTitle.textContent = cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1) + 's';
  applyFilters();
}

function sortCust(mode, el) {
  currentSort = mode;
  document.querySelectorAll('.cf-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  applyFilters();
}

function searchProds() {
  searchQuery = document.getElementById('custSearch').value.toLowerCase();
  applyFilters();
}

function applyFilters() {
  let list = [...CUST_PRODUCTS];

  // Category filter
  if (currentCat !== 'all') {
    if (currentCat === 'organic') list = list.filter(p => p.organic);
    else list = list.filter(p => p.cat === currentCat);
  }

  // Search filter
  if (searchQuery) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.farm.toLowerCase().includes(searchQuery) ||
      p.loc.toLowerCase().includes(searchQuery)
    );
  }

  // Sort
  switch (currentSort) {
    case 'price_low':  list.sort((a,b) => a.price - b.price); break;
    case 'price_high': list.sort((a,b) => b.price - a.price); break;
    case 'organic':    list = list.filter(p => p.organic); break;
    case 'fresh':      list = list.filter(p => p.fresh); list.sort((a,b) => a.freshHrs - b.freshHrs); break;
    default: break;
  }

  renderProducts(list);
}

/* ── QUANTITY CONTROL ─────────────────────────────────────── */
function changeProdQty(id, delta) {
  const el = document.getElementById('pqty_' + id);
  if (el) el.textContent = Math.max(1, parseInt(el.textContent) + delta);
}

/* ── PRODUCT DETAIL ──────────────────────────────────────── */
function openProduct(id) {
  const p = CUST_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  cToast(`Viewing: ${p.name} — ₹${p.price}/kg`);
}

/* ── WISHLIST ─────────────────────────────────────────────── */
function wishlistToggle(id, btn) {
  const ic = document.getElementById('wish_' + id);
  if (!ic) return;
  const isWished = ic.textContent === 'favorite';
  ic.textContent = isWished ? 'favorite_border' : 'favorite';
  ic.style.color = isWished ? '' : '#EF5350';
  cToast(isWished ? 'Removed from wishlist' : 'Added to wishlist ❤️');
}

/* ── CART ─────────────────────────────────────────────────── */
function addToCartAndWA(id) {
  const p    = CUST_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const qty  = parseInt(document.getElementById('pqty_' + id)?.textContent || '1');
  const total = p.price * qty;

  // Add to cart
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ ...p, cartQty: qty });
  updateCartBadge();
  cToast(`${p.name} (${qty} kg) added to cart!`);

  // WhatsApp order
  const msg = encodeURIComponent(
    `Hello ${p.farm},\n\nI want to order:\n• ${p.name} — ${qty} kg at ₹${p.price}/kg\n• Total: ₹${total}\n\nI found your listing on KisanBazaar AI. Please confirm availability and delivery.\n\nLocation: [Your Address]`
  );
  setTimeout(() => window.open(`https://wa.me/?text=${msg}`, '_blank'), 400);
}

function updateCartBadge() {
  const total = cart.reduce((s, c) => s + c.cartQty, 0);
  const badge = document.getElementById('cartCountBadge');
  if (badge) badge.textContent = total;
}

function openCart() { document.getElementById('cartOverlay').classList.add('open'); renderCart(); }
function closeCart() { document.getElementById('cartOverlay').classList.remove('open'); }
function closeCartOnOverlay(e) { if (e.target === document.getElementById('cartOverlay')) closeCart(); }

function renderCart() {
  const body   = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const count  = document.getElementById('cartItemCount');
  if (!body) return;

  setCartCount(cart.reduce((s,c) => s+c.cartQty, 0));
  if (count) count.textContent = cart.length;

  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <span class="material-icons">shopping_cart</span>
        <h4>Your cart is empty</h4>
        <p>Browse fresh farm produce and add items to your cart</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon" style="background:${item.bg};">
        <span class="material-icons" style="color:${item.icCol};">${item.ic}</span>
      </div>
      <div style="flex:1;">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-farm">${item.farm}</div>
        <div class="cart-item-price">₹${item.price}/kg × ${item.cartQty} kg = ₹${item.price * item.cartQty}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
        <button style="background:#FFEBEE;border:1px solid #FFCDD2;border-radius:7px;padding:4px 8px;font-size:11px;color:#C62828;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;display:flex;align-items:center;gap:3px;" onclick="removeCartItem(${item.id})">
          <span class="material-icons" style="font-size:14px;">delete</span>
        </button>
        <div style="display:flex;align-items:center;gap:5px;">
          <div class="cp-step-btn" style="width:24px;height:24px;" onclick="updateCartQty(${item.id},-1)">−</div>
          <span style="font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;min-width:24px;text-align:center;">${item.cartQty}</span>
          <div class="cp-step-btn" style="width:24px;height:24px;" onclick="updateCartQty(${item.id},1)">+</div>
        </div>
      </div>
    </div>
  `).join('');

  const cartTotal = cart.reduce((s,c) => s + c.price * c.cartQty, 0);
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = '₹' + cartTotal.toLocaleString('en-IN');
  if (footer) footer.style.display = 'block';
}

function setCartCount(n) {
  const c = document.getElementById('cartItemCount');
  if (c) c.textContent = n;
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.cartQty = Math.max(1, item.cartQty + delta);
  updateCartBadge();
  renderCart();
}

function removeCartItem(id) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx !== -1) cart.splice(idx, 1);
  updateCartBadge();
  renderCart();
  cToast('Item removed from cart');
}

function checkoutWA() {
  if (!cart.length) { cToast('Your cart is empty'); return; }
  const itemLines = cart.map(c => `• ${c.name} — ${c.cartQty} kg at ₹${c.price}/kg = ₹${c.price * c.cartQty}`).join('\n');
  const total = cart.reduce((s,c) => s + c.price * c.cartQty, 0);
  const msg = encodeURIComponent(
    `Hello, I want to order the following from KisanBazaar AI:\n\n${itemLines}\n\nTotal: ₹${total.toLocaleString('en-IN')}\n\nPlease confirm availability and delivery.`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
  cToast('Opening WhatsApp with your order details');
}

/* ── TOAST ────────────────────────────────────────────────── */
function cToast(msg) {
  const box = document.getElementById('custToast');
  if (!box) return;
  const el = document.createElement('div');
  el.className = 'c-toast';
  el.innerHTML = `<span class="material-icons">check_circle</span>${msg}`;
  box.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(20px)'; setTimeout(() => el.remove(), 300); }, 3200);
}

/* ── UTIL ─────────────────────────────────────────────────── */
function setCartCount(n) { const c=document.getElementById('cartItemCount'); if(c) c.textContent=n; }