/* ═══════════════════════════════════════════════════════════════
   KISANBAZAAR AI v4.0 — Shared JavaScript
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ── APP STATE ──────────────────────────────────────────── */
const KB = { user: null, location: null };

/* ── UNSPLASH IMAGE URLS (Agriculture themed) ─────────── */
const IMG = {
  hero: [
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80',
    'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=900&q=80',
  ],
  schemes: [
    'https://images.unsplash.com/photo-1532375810709-75b1da6537b8?w=400&q=80',
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&q=80',
    'https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?w=400&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80',
    'https://images.unsplash.com/photo-1593280405106-e438ebe93f5e?w=400&q=80',
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
  ],
  learn: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80',
    'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=400&q=80',
    'https://images.unsplash.com/photo-1467541767373-a6d85f7fc91b?w=400&q=80',
    'https://images.unsplash.com/photo-1619881590738-a111b176fca6?w=400&q=80',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80',
  ],
  tech: [
    'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=400&q=80',
    'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80',
  ],
  products: [
    'https://images.unsplash.com/photo-1546103818-bb05a6a9c9ed?w=300&q=80',
    'https://images.unsplash.com/photo-1508747703725-719777637510?w=300&q=80',
    'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=300&q=80',
    'https://images.unsplash.com/photo-1603052875302-d376b7c0638a?w=300&q=80',
    'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=300&q=80',
    'https://images.unsplash.com/photo-1591299177061-2151e90cb44c?w=300&q=80',
    'https://images.unsplash.com/photo-1576072626811-f2ea0ade8e1b?w=300&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80',
  ],
};

/* ── LOCATION DATA ──────────────────────────────────────── */
const LOC_DATA = {
  'Andhra Pradesh': {
    'Guntur':    ['Brodipet','Guntur Urban','Narasaraopet','Prathipadu','Tenali'],
    'Krishna':   ['Eluru','Gannavaram','Machilipatnam','Vijayawada','Vuyyuru'],
    'Kurnool':   ['Adoni','Alur','Atmakur','Kurnool','Nandyal'],
    'Prakasam':  ['Addanki','Chirala','Kandukur','Markapur','Ongole'],
    'Srikakulam':['Amadalavalasa','Ichapuram','Palakonda','Rajam','Srikakulam'],
  },
  'Telangana': {
    'Rangareddy':['Bandlaguda','Chevella','Hayathnagar','Maheshwaram','Moinabad'],
    'Medak':     ['Andole','Jogipet','Narayankhed','Patancheru','Toopran'],
    'Nalgonda':  ['Bhongir','Devarakonda','Miryalaguda','Nalgonda','Suryapet'],
    'Warangal':  ['Hanamkonda','Kazipet','Mahabubabad','Warangal','Bhupalpally'],
    'Karimnagar':['Huzurabad','Jagtial','Karimnagar','Manthani','Sircilla'],
  },
  'Maharashtra': {
    'Pune':       ['Baramati','Bhor','Haveli','Shirur','Mulshi'],
    'Nashik':     ['Dindori','Igatpuri','Niphad','Sinnar','Yeola'],
    'Solapur':    ['Barshi','Mohol','Pandharpur','Sangole','Mangalvedhe'],
    'Latur':      ['Ausa','Chakur','Deoni','Renapur','Udgir'],
    'Nagpur':     ['Hingna','Kamptee','Katol','Narkhed','Ramtek'],
  },
  'Uttar Pradesh': {
    'Lucknow':   ['Bakshi Ka Talab','Malihabad','Mohanlalganj','Sarojini Nagar'],
    'Varanasi':  ['Arajiline','Harhua','Pindra','Sewapuri','Kashi Vidyapeeth'],
    'Agra':      ['Achhnera','Bah','Etmadpur','Fatehabad','Kheragarh'],
    'Kanpur':    ['Ghatampur','Kalyanpur','Narwal','Rsania'],
    'Allahabad': ['Bara','Chaka','Handia','Karchana','Meja'],
  },
  'Karnataka': {
    'Mysore':    ['Heggadadevankote','Hunsur','K R Nagar','Nanjangud','Periyapatna'],
    'Belagavi':  ['Athani','Bailhongal','Chikodi','Gokak','Hukkeri'],
    'Dharwad':   ['Hubli','Kalghatgi','Kundgol','Navalgund','Dharwad'],
    'Hassan':    ['Alur','Arkalgud','Belur','Channarayapatna','Hassan'],
  },
  'Rajasthan': {
    'Jaipur':    ['Amber','Bassi','Chaksu','Dudu','Kotputli'],
    'Jodhpur':   ['Bhopalgarh','Bilara','Luni','Mandore','Osian'],
    'Udaipur':   ['Girwa','Gogunda','Jhadol','Kherwara','Mavli'],
    'Kota':      ['Itawa','Ladpura','Pipalda','Ramganj Mandi','Sangod'],
  },
  'Gujarat': {
    'Ahmedabad': ['Bavla','Detroj-Rampura','Dhandhuka','Dholka','Sanand'],
    'Surat':     ['Bardoli','Kamrej','Mahuva','Mandvi','Olpad'],
    'Vadodara':  ['Dabhoi','Karjan','Padra','Savli','Waghodia'],
    'Rajkot':    ['Gondal','Jasdan','Jetpur','Kotda Sangani','Lodhika'],
  },
};

/* ── LOCATION WEATHER DATA ──────────────────────────────── */
const LOC_WEATHER = {
  'Andhra Pradesh': {temp:'33°C',icon:'wb_sunny',cond:'Hot & Humid',humid:'68%',rain:'25%',wind:'16 km/h',alert:'High humidity — monitor for fungal diseases in Paddy and Groundnut crops'},
  'Telangana':      {temp:'35°C',icon:'wb_sunny',cond:'Sunny & Hot',humid:'52%',rain:'15%',wind:'20 km/h',alert:'Heat wave advisory — increase irrigation frequency for all crops today'},
  'Maharashtra':    {temp:'28°C',icon:'cloud',   cond:'Partly Cloudy',humid:'72%',rain:'40%',wind:'14 km/h',alert:'Heavy rainfall expected tomorrow — avoid pesticide application in fields'},
  'Uttar Pradesh':  {temp:'34°C',icon:'wb_sunny',cond:'Clear & Hot',humid:'48%',rain:'10%',wind:'22 km/h',alert:'Heat wave conditions — increase drip irrigation duration by 30% today'},
  'Karnataka':      {temp:'26°C',icon:'cloud',   cond:'Mostly Cloudy',humid:'78%',rain:'55%',wind:'12 km/h',alert:'Scattered showers expected — ideal conditions for transplanting seedlings'},
  'Rajasthan':      {temp:'40°C',icon:'wb_sunny',cond:'Hot & Dry',humid:'24%',rain:'5%',wind:'30 km/h',alert:'Severe drought warning — switch to drip irrigation immediately'},
  'Gujarat':        {temp:'32°C',icon:'wb_sunny',cond:'Hazy Sunshine',humid:'62%',rain:'25%',wind:'16 km/h',alert:'Rising humidity — monitor Groundnut and Cotton for fungal disease outbreak'},
};

/* ── LOCATION PRICES ────────────────────────────────────── */
const LOC_PRICES = {
  'Andhra Pradesh': {mandi:'Guntur APMC Mandi',   advice:'Chilli prices surging — optimal time to sell stored stock this week',   rows:[{crop:'Paddy',today:2200,lw:2150,msp:2183,ch:+2.3},{crop:'Groundnut',today:5400,lw:5280,msp:5000,ch:+2.3},{crop:'Chilli',today:18000,lw:17500,msp:0,ch:+2.9},{crop:'Onion',today:960,lw:940,msp:800,ch:+2.1},{crop:'Tomato',today:1380,lw:1300,msp:1200,ch:+6.2}]},
  'Telangana':      {mandi:'Warangal APMC Mandi', advice:'Paddy prices are 4% above MSP — excellent selling window this week',   rows:[{crop:'Paddy',today:2280,lw:2200,msp:2183,ch:+3.6},{crop:'Maize',today:2050,lw:1990,msp:1870,ch:+3.0},{crop:'Soybean',today:4650,lw:4550,msp:4300,ch:+2.2},{crop:'Cotton',today:6900,lw:6780,msp:6620,ch:+1.8},{crop:'Onion',today:1020,lw:985,msp:800,ch:+3.6}]},
  'Maharashtra':    {mandi:'Pune APMC Mandi',     advice:'Tomato prices likely to rise 5–8% in next 3 days based on supply data',rows:[{crop:'Tomato',today:1420,lw:1310,msp:1200,ch:+8.4},{crop:'Onion',today:980,lw:995,msp:800,ch:-1.5},{crop:'Soybean',today:4600,lw:4510,msp:4300,ch:+2.0},{crop:'Cotton',today:6800,lw:6820,msp:6620,ch:-0.3},{crop:'Wheat',today:2150,lw:2110,msp:2015,ch:+1.9}]},
  'Uttar Pradesh':  {mandi:'Lucknow APMC Mandi',  advice:'Wheat prices remain firm above MSP — sell stored stock before new crop arrives',rows:[{crop:'Wheat',today:2250,lw:2180,msp:2015,ch:+3.2},{crop:'Sugarcane',today:3650,lw:3600,msp:3050,ch:+1.4},{crop:'Paddy',today:2200,lw:2150,msp:2183,ch:+2.3},{crop:'Maize',today:1980,lw:1940,msp:1870,ch:+2.1},{crop:'Mustard',today:5600,lw:5520,msp:5450,ch:+1.4}]},
  'Karnataka':      {mandi:'Mysore APMC Mandi',   advice:'Ragi prices stable at MSP — hold stock for 7 more days for better returns',rows:[{crop:'Ragi',today:3600,lw:3520,msp:3578,ch:+2.3},{crop:'Groundnut',today:5400,lw:5280,msp:5000,ch:+2.3},{crop:'Areca Nut',today:42000,lw:41500,msp:0,ch:+1.2},{crop:'Maize',today:2050,lw:2000,msp:1870,ch:+2.5},{crop:'Tomato',today:1320,lw:1280,msp:1200,ch:+3.1}]},
  'Rajasthan':      {mandi:'Jaipur APMC Mandi',   advice:'Mustard MSP procurement ongoing — sell directly to govt procurement centres',rows:[{crop:'Mustard',today:5450,lw:5400,msp:5450,ch:+0.9},{crop:'Wheat',today:2200,lw:2150,msp:2015,ch:+2.3},{crop:'Bajra',today:2350,lw:2300,msp:2350,ch:+2.2},{crop:'Groundnut',today:5100,lw:5000,msp:5000,ch:+2.0},{crop:'Cumin',today:22000,lw:21500,msp:0,ch:+2.3}]},
  'Gujarat':        {mandi:'Ahmedabad APMC Mandi',advice:'Groundnut prices rising steadily — market expected to peak in next 5 days',rows:[{crop:'Groundnut',today:5500,lw:5350,msp:5000,ch:+2.8},{crop:'Cotton',today:6900,lw:6800,msp:6620,ch:+1.5},{crop:'Wheat',today:2100,lw:2050,msp:2015,ch:+2.4},{crop:'Castor',today:5800,lw:5700,msp:0,ch:+1.8},{crop:'Cumin',today:22000,lw:21500,msp:0,ch:+2.3}]},
};

/* ── AI SUGGESTIONS PER STATE ───────────────────────────── */
const LOC_AI = {
  'Andhra Pradesh': {sug:'Best crop this week: Groundnut (TAG-24)', sub:'Sandy loam + hot conditions ideal for oil crop. Expected profit: Rs.20,000/acre'},
  'Telangana':      {sug:'Best crop this week: Soybean (JS-9752)',  sub:'Black soil + monsoon conditions perfect. Expected profit: Rs.16,000/acre'},
  'Maharashtra':    {sug:'Best crop this week: Groundnut',          sub:'Black cotton soil + Kharif season market. Expected profit: Rs.18,000/acre'},
  'Uttar Pradesh':  {sug:'Best crop this week: Wheat (HD-2967)',    sub:'Alluvial Gangetic soil ideal for high-yield wheat. Expected: 20 q/acre'},
  'Karnataka':      {sug:'Best crop this week: Ragi (GPU-28)',      sub:'Red soil + monsoon is perfect. Expected profit: Rs.10,000/acre'},
  'Rajasthan':      {sug:'Best crop this week: Bajra (HHB-67)',     sub:'Drought-tolerant crop for dry sandy soil. Very low water need.'},
  'Gujarat':        {sug:'Best crop this week: Groundnut (GG-20)',  sub:'Sandy loam soil ideal for groundnut. Expected profit: Rs.20,000/acre'},
};

/* ── NOTIFICATIONS ──────────────────────────────────────── */
const NOTIFS = [
  {id:1,type:'price',  icon:'trending_up', bg:'#E8F5E9',icCol:'#2E7D32', title:'Tomato up 8.4%',    text:'Current: Rs.1,420/q at Pune APMC. Good time to sell.',time:'2h ago'},
  {id:2,type:'weather',icon:'cloud',       bg:'#E3F2FD',icCol:'#1565C0', title:'Rain Alert Tomorrow',text:'Heavy rainfall expected in your district tomorrow.',  time:'3h ago'},
  {id:3,type:'scheme', icon:'account_balance',bg:'#FFF8E1',icCol:'#E65100',title:'PM-KISAN Instalment',text:'Next instalment of Rs.2,000 credited by 30 Apr.',   time:'1d ago'},
  {id:4,type:'alert',  icon:'warning',     bg:'#FFEBEE',icCol:'#C62828', title:'Pest Alert',         text:'Whitefly infestation reported in your district.',     time:'2d ago'},
];

/* ── FARMER ID GENERATOR ────────────────────────────────── */
function generateFarmerID(state, district, mandal, role, seq) {
  const s = (state    || 'XX').substring(0,2).toUpperCase();
  const d = (district || 'XX').substring(0,3).toUpperCase();
  const m = (mandal   || 'XX').substring(0,3).toUpperCase();
  const r = {farmer:'F',customer:'C',trader:'T'}[role] || 'F';
  const n = String(seq || 1).padStart(4,'0');
  return `${s}${d}${m}${r}${n}`;
}

/* ── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  KB.user     = JSON.parse(localStorage.getItem('kb_user')     || 'null');
  KB.location = JSON.parse(localStorage.getItem('kb_location') || 'null');

  buildHeader();
  buildFooter();
  buildBottomNav();
  buildLoginModal();
  buildToastContainer();
  buildLocPanel();
  setActiveNav();
  refreshLocationUI();

  const pg = document.body.dataset.page;
  if (pg && typeof window['initPage_' + pg] === 'function') window['initPage_' + pg]();
});

/* ── HEADER BUILD ───────────────────────────────────────── */
function buildHeader() {
  const ph = document.getElementById('kb-header-ph');
  if (!ph) return;

  const navLinks = [
    {href:'index.html',    icon:'home',                  label:'Home',      key:'home'},
    {href:'advisory.html', icon:'psychology',             label:'Advisory',  key:'advisory'},
    {href:'market.html',   icon:'storefront',             label:'Market',    key:'market'},
    {href:'scan.html',     icon:'document_scanner',       label:'Scan',      key:'scan'},
    {href:'govt.html',     icon:'account_balance',        label:'Govt',      key:'govt'},
    {href:'weather.html',  icon:'cloud',                  label:'Weather',   key:'weather'},
    {href:'tech.html',     icon:'precision_manufacturing',label:'Tech',      key:'tech'},
    {href:'learn.html',    icon:'school',                 label:'Learn',     key:'learn'},
  ];

  const navHtml   = navLinks.map(l => `<a href="${l.href}" class="kb-nav-link" data-key="${l.key}"><span class="material-icons">${l.icon}</span>${l.label}</a>`).join('');
  const drawerNav = navLinks.map(l => `<a href="${l.href}" class="kb-drawer-link" data-key="${l.key}"><span class="material-icons">${l.icon}</span>${l.label}</a>`).join('');

  const notifHtml = NOTIFS.map(n => `
    <div class="nd-item">
      <div class="nd-icon" style="background:${n.bg};"><span class="material-icons" style="color:${n.icCol};">${n.icon}</span></div>
      <div><div class="nd-title">${n.title}</div><div class="nd-text">${n.text}</div><div class="nd-time">${n.time}</div></div>
    </div>`).join('');

  const userLabel = KB.user?.name?.split(' ')[0] || 'Login';

  ph.outerHTML = `
  <header class="kb-header" id="kbHeader">
    <div class="kb-header-inner">
      <a href="index.html" class="kb-logo">
        <div class="kb-logo-icon"><span class="material-icons">eco</span></div>
        <div class="kb-logo-text"><div class="name">KisanBazaar AI</div><div class="tagline">Grow Smart. Sell Better.</div></div>
      </a>
      <nav class="kb-nav">${navHtml}</nav>
      <div class="kb-header-right">
        <button class="kb-loc-btn" onclick="openLocPanel()">
          <span class="material-icons">location_on</span>
          <span class="kb-loc-text" id="hLocText">Select Location</span>
        </button>
        <div style="position:relative;">
          <button class="kb-icon-btn" id="notifBtn" onclick="toggleNotifDd()">
            <span class="material-icons">notifications</span>
            <div class="kb-badge-dot"></div>
          </button>
          <div class="notif-dropdown" id="notifDd">
            <div class="nd-head"><div class="nd-head-title">Notifications</div><span class="badge bdg-green">4 New</span></div>
            ${notifHtml}
            <div class="nd-footer"><a href="#">View all notifications</a></div>
          </div>
        </div>
        <button class="kb-user-btn" onclick="handleUserClick()">
          <span class="material-icons">account_circle</span>
          <span id="hUserName">${userLabel}</span>
        </button>
        <button class="kb-hamburger" onclick="openDrawer()">
          <span class="material-icons">menu</span>
        </button>
      </div>
    </div>
  </header>

  <div class="kb-drawer-overlay" id="drawerOverlay" onclick="closeDrawer()"></div>
  <div class="kb-drawer" id="kbDrawer">
    <div class="kb-drawer-head">
      <div class="kb-logo-icon"><span class="material-icons">eco</span></div>
      <div class="kb-logo-text"><div class="name" style="color:#fff;">KisanBazaar AI</div><div class="tagline">Grow Smart. Sell Better.</div></div>
      <button class="kb-drawer-close" onclick="closeDrawer()"><span class="material-icons">close</span></button>
    </div>
    <div class="kb-drawer-user">
      <div class="kb-drawer-avatar"><span class="material-icons">account_circle</span></div>
      <div>
        <div class="kb-drawer-name" id="drawerUserName">${KB.user?.name || 'Guest User'}</div>
        <div class="kb-drawer-id" id="drawerLocText">${KB.location ? [KB.location.mandal,KB.location.district,KB.location.state].filter(Boolean).join(', ') : 'Select Location'}</div>
      </div>
    </div>
    <div class="kb-drawer-nav">${drawerNav}</div>
    <div class="kb-drawer-sep"></div>
    <div class="kb-drawer-nav">
      <a href="my-crops.html"    class="kb-drawer-link"><span class="material-icons">grass</span>My Crops</a>
      <a href="check-price.html" class="kb-drawer-link"><span class="material-icons">trending_up</span>Check Prices</a>
      <a href="buy-inputs.html"  class="kb-drawer-link"><span class="material-icons">science</span>Buy Inputs</a>
      <a href="profile.html"     class="kb-drawer-link"><span class="material-icons">person</span>My Profile</a>
      <div class="kb-drawer-link" style="cursor:pointer;" onclick="handleLogout()"><span class="material-icons" style="color:var(--danger);">logout</span><span style="color:var(--danger);">Sign Out</span></div>
    </div>
  </div>`;

  refreshLocationUI();
}

function setActiveNav() {
  const pg = document.body.dataset.page;
  if (!pg) return;
  document.querySelectorAll('[data-key]').forEach(l => l.classList.toggle('active', l.dataset.key === pg));
}

/* ── LOCATION SYSTEM ────────────────────────────────────── */
function buildLocPanel() {
  const div = document.createElement('div');
  div.className = 'loc-overlay';
  div.id = 'locOverlay';
  div.innerHTML = `
    <div class="loc-panel" id="locPanel">
      <div class="loc-handle"></div>
      <div class="loc-head">
        <div class="loc-title"><span class="material-icons">location_on</span>Select Your Location</div>
        <button class="modal-close" onclick="closeLocPanel()"><span class="material-icons">close</span></button>
      </div>
      <div class="loc-body">
        <div id="locCurWrap"></div>
        <div class="form-group"><label class="form-label">State <span class="form-req">*</span></label>
          <select class="form-select" id="lpState" onchange="lpStateChange()"><option value="">— Select State —</option></select>
        </div>
        <div class="form-group" id="lpDistGrp" style="display:none;"><label class="form-label">District</label>
          <select class="form-select" id="lpDist" onchange="lpDistChange()"><option value="">— Select District —</option></select>
        </div>
        <div class="form-group" id="lpMandalGrp" style="display:none;"><label class="form-label">Mandal / Block</label>
          <select class="form-select" id="lpMandal"><option value="">— Select Mandal —</option></select>
        </div>
        <button class="btn btn-primary btn-full btn-lg" onclick="applyLocation()">
          <span class="material-icons">check_circle</span>Apply Location
        </button>
      </div>
    </div>`;
  document.body.appendChild(div);
  div.addEventListener('click', e => { if (e.target === div) closeLocPanel(); });
  populateStates();
}

function populateStates() {
  const sel = document.getElementById('lpState'); if (!sel) return;
  const saved = KB.location;
  sel.innerHTML = '<option value="">— Select State —</option>' +
    Object.keys(LOC_DATA).map(s => `<option value="${s}"${saved?.state===s?' selected':''}>${s}</option>`).join('');
  if (saved?.state) {
    setTimeout(() => { lpStateChange(); setTimeout(() => { const d=document.getElementById('lpDist'); if(d&&saved.district){d.value=saved.district;lpDistChange();} setTimeout(()=>{const m=document.getElementById('lpMandal');if(m&&saved.mandal)m.value=saved.mandal;},80);},80);},50);
  }
  const cw = document.getElementById('locCurWrap');
  if (cw && saved) {
    const label = [saved.mandal,saved.district,saved.state].filter(Boolean).join(', ');
    cw.innerHTML = `<div style="margin-bottom:14px;"><div class="s-label" style="margin-bottom:6px;">Current Location</div><div class="loc-cur-tag"><span class="material-icons">location_on</span>${label}</div></div>`;
  }
}

function lpStateChange() {
  const s = document.getElementById('lpState').value;
  const dg = document.getElementById('lpDistGrp'); const mg = document.getElementById('lpMandalGrp');
  if (!s) { dg.style.display='none'; mg.style.display='none'; return; }
  const sel = document.getElementById('lpDist');
  sel.innerHTML = '<option value="">— Select District —</option>' + Object.keys(LOC_DATA[s]||{}).map(d=>`<option value="${d}">${d}</option>`).join('');
  dg.style.display='block'; mg.style.display='none';
  document.getElementById('lpMandal').innerHTML='<option value="">— Select Mandal —</option>';
}
function lpDistChange() {
  const s = document.getElementById('lpState').value; const d = document.getElementById('lpDist').value;
  const mg = document.getElementById('lpMandalGrp');
  if (!s||!d) { mg.style.display='none'; return; }
  const mandals = LOC_DATA[s]?.[d] || [];
  document.getElementById('lpMandal').innerHTML='<option value="">— Select Mandal —</option>'+mandals.map(m=>`<option value="${m}">${m}</option>`).join('');
  mg.style.display='block';
}
function applyLocation() {
  const state=document.getElementById('lpState').value; const district=document.getElementById('lpDist').value; const mandal=document.getElementById('lpMandal').value;
  if (!state) { toast('Please select a State','error'); return; }
  KB.location = {state,district,mandal};
  localStorage.setItem('kb_location', JSON.stringify(KB.location));
  refreshLocationUI();
  closeLocPanel();
  toast('Location set: '+[mandal,district,state].filter(Boolean).join(', '),'success');
  if (typeof window.onLocationChange === 'function') window.onLocationChange(KB.location);
}
function refreshLocationUI() {
  const loc = KB.location;
  const short = loc ? (loc.mandal||loc.district||loc.state||'Select') : 'Select Location';
  const full  = loc ? [loc.mandal,loc.district,loc.state].filter(Boolean).join(', ') : 'Select Location';
  setTxt('hLocText', short);
  setTxt('drawerLocText', full);
  setTxt('drawerUserName', KB.user?.name || 'Guest User');
}
function openLocPanel()  { document.getElementById('locOverlay')?.classList.add('open'); populateStates(); }
function closeLocPanel() { document.getElementById('locOverlay')?.classList.remove('open'); }

/* ── BOTTOM NAV ─────────────────────────────────────────── */
function buildBottomNav() {
  const ph = document.getElementById('kb-bottom-nav-ph');
  if (!ph) return;
  const pg = document.body.dataset.page;
  const tabs = [
    {href:'index.html',     icon:'home',          label:'Home', key:'home'},
    {href:'check-price.html',icon:'trending_up',  label:'Price',key:'price'},
    {href:'scan.html',      icon:'document_scanner',label:'Scan',key:'scan', fab:true},
    {href:'govt.html',      icon:'account_balance',label:'Govt',key:'govt'},
    {href:'profile.html',   icon:'account_circle',label:'Profile',key:'profile'},
  ];
  ph.outerHTML = `
  <nav class="kb-bottom-nav">
    ${tabs.map(t => t.fab
      ? `<a href="${t.href}" class="bn-scan ${pg===t.key?'active':''}"><div class="bn-scan-fab"><span class="material-icons">document_scanner</span></div><span class="bn-lbl">${t.label}</span></a>`
      : `<a href="${t.href}" class="bn-tab ${pg===t.key?'active':''}"><span class="material-icons">${t.icon}</span><span class="bn-lbl">${t.label}</span></a>`
    ).join('')}
  </nav>`;
}

/* ── FOOTER BUILD ───────────────────────────────────────── */
function buildFooter() {
  const ph = document.getElementById('kb-footer-ph');
  if (!ph) return;
  ph.outerHTML = `
  <footer class="kb-footer">
    <div class="kb-footer-inner">
      <div class="kb-footer-top">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div class="kb-logo-icon" style="width:34px;height:34px;"><span class="material-icons" style="font-size:19px;">eco</span></div>
            <div class="kb-logo-text"><div class="name">KisanBazaar AI</div><div class="tagline">Grow Smart. Sell Better.</div></div>
          </div>
          <p style="font-size:12px;color:rgba(255,255,255,.6);max-width:260px;line-height:1.65;">Official digital agriculture platform — National Agriculture Digital Mission, Ministry of Agriculture, Govt. of India.</p>
        </div>
        <div class="kb-footer-col">
          <div class="kb-footer-col-title">Platform</div>
          <a href="index.html">Home Dashboard</a><a href="advisory.html">AI Advisory</a><a href="market.html">Marketplace</a><a href="scan.html">Disease Scan</a>
        </div>
        <div class="kb-footer-col">
          <div class="kb-footer-col-title">Services</div>
          <a href="govt.html">Govt Schemes</a><a href="weather.html">Weather</a><a href="tech.html">New Technology</a><a href="learn.html">Learning Hub</a>
        </div>
        <div class="kb-footer-col">
          <div class="kb-footer-col-title">Helplines</div>
          <a href="tel:18001801551">Kisan: 1800-180-1551</a><a href="tel:14567">PM-KISAN: 14567</a><a href="tel:14447">Crop Insurance: 14447</a><a href="#">Soil Health: 1800-180-1551</a>
        </div>
      </div>
      <div class="kb-footer-bottom">
        <p>© 2025 KisanBazaar AI — Ministry of Agriculture & Farmers Welfare, Govt. of India</p>
        <div class="kb-flag-bar">
          <div style="width:4px;height:18px;background:linear-gradient(180deg,#FF9933 33%,#fff 33% 66%,#138808 66%);border-radius:1px;"></div>
          <span style="font-size:10.5px;opacity:.5;">Made in India · Digital India Initiative</span>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ── AUTH ───────────────────────────────────────────────── */
function buildLoginModal() {
  const d = document.createElement('div');
  d.className='login-modal-overlay'; d.id='loginModal';
  d.innerHTML=`
  <div class="login-modal-card">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
      <div class="kb-logo-icon" style="width:38px;height:38px;"><span class="material-icons" style="font-size:21px;">eco</span></div>
      <div><div style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:800;color:var(--primary);">Login Required</div><div style="font-size:11px;color:var(--text-muted);">Login to access this feature</div></div>
      <button class="modal-close" style="margin-left:auto;" onclick="closeLoginModal()"><span class="material-icons">close</span></button>
    </div>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:18px;line-height:1.6;">You need to log in to access this feature. Login is free and takes under 1 minute.</p>
    <button class="btn btn-primary btn-full btn-lg" onclick="location.href='login.html'"><span class="material-icons">login</span>Login / Register</button>
    <button class="btn btn-ghost btn-full" style="margin-top:9px;" onclick="closeLoginModal()">Skip for now</button>
  </div>`;
  document.body.appendChild(d);
}
function openLoginModal()  { document.getElementById('loginModal')?.classList.add('open'); }
function closeLoginModal() { document.getElementById('loginModal')?.classList.remove('open'); }
function requireLogin(cb)  { if (KB.user) { if(cb) cb(); } else openLoginModal(); }
function handleUserClick()  { KB.user ? location.href='profile.html' : location.href='login.html'; }
function handleLogout() {
  localStorage.removeItem('kb_user'); KB.user=null;
  toast('Signed out successfully','info');
  setTimeout(()=>location.href='login.html',700);
}

/* ── DRAWER ──────────────────────────────────────────────── */
function openDrawer()  { document.getElementById('kbDrawer')?.classList.add('open'); document.getElementById('drawerOverlay')?.classList.add('open'); }
function closeDrawer() { document.getElementById('kbDrawer')?.classList.remove('open'); document.getElementById('drawerOverlay')?.classList.remove('open'); }

/* ── NOTIFICATIONS ──────────────────────────────────────── */
function toggleNotifDd() { document.getElementById('notifDd')?.classList.toggle('open'); }
document.addEventListener('click', e => {
  if (!e.target.closest('#notifBtn')&&!e.target.closest('#notifDd')) document.getElementById('notifDd')?.classList.remove('open');
});

/* ── TOAST ───────────────────────────────────────────────── */
function buildToastContainer() { const d=document.createElement('div'); d.id='toastBox'; document.body.appendChild(d); }
function toast(msg, type='info') {
  const box=document.getElementById('toastBox'); if(!box) return;
  const m={success:{cls:'t-success',ic:'check_circle'},error:{cls:'t-error',ic:'error'},info:{cls:'t-info',ic:'info'},warn:{cls:'t-warn',ic:'warning'}};
  const t=m[type]||m.info;
  const el=document.createElement('div'); el.className='toast '+t.cls;
  el.innerHTML=`<span class="material-icons">${t.ic}</span>${msg}`;
  box.appendChild(el);
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(12px)';setTimeout(()=>el.remove(),320);},3800);
}

/* ── HERO CAROUSEL ──────────────────────────────────────── */
function initCarousel(containerId) {
  const wrap = document.getElementById(containerId); if(!wrap) return;
  const slides = wrap.querySelectorAll('.hero-slide');
  const dots   = wrap.querySelectorAll('.hero-dot');
  const inner  = wrap.querySelector('.hero-slides');
  let cur=0, timer;
  function goTo(n) {
    cur=n; inner.style.transform=`translateX(-${cur*100}%)`;
    dots.forEach((d,i)=>d.classList.toggle('active',i===cur));
  }
  function next() { goTo((cur+1)%slides.length); }
  function prev() { goTo((cur-1+slides.length)%slides.length); }
  timer = setInterval(next, 5000);
  wrap.querySelector('.hero-next')?.addEventListener('click',()=>{clearInterval(timer);next();timer=setInterval(next,5000);});
  wrap.querySelector('.hero-prev')?.addEventListener('click',()=>{clearInterval(timer);prev();timer=setInterval(next,5000);});
  dots.forEach((d,i)=>d.addEventListener('click',()=>{clearInterval(timer);goTo(i);timer=setInterval(next,5000);}));
  goTo(0);
}

/* ── PRICE CHART ────────────────────────────────────────── */
function drawPriceChart(canvas, tw, lw) {
  const W=canvas.offsetWidth||320, H=165;
  canvas.width=W; canvas.height=H;
  const ctx=canvas.getContext('2d');
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const all=[...tw,...lw]; const minV=Math.min(...all)*.97, maxV=Math.max(...all)*1.03;
  const pL=54,pR=12,pT=12,pB=26,cW=W-pL-pR,cH=H-pT-pB;
  const tx=i=>pL+(i/(days.length-1))*cW, ty=v=>pT+cH-((v-minV)/(maxV-minV))*cH;
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<=4;i++){const y=pT+(i/4)*cH;ctx.strokeStyle='#EBF1EC';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(pL,y);ctx.lineTo(W-pR,y);ctx.stroke();const v=Math.round(maxV-(i/4)*(maxV-minV));ctx.fillStyle='#8FA690';ctx.font='9px Inter';ctx.textAlign='right';ctx.fillText('Rs.'+v.toLocaleString('en-IN'),pL-4,y+3);}
  days.forEach((d,i)=>{ctx.fillStyle='#8FA690';ctx.font='9px Inter';ctx.textAlign='center';ctx.fillText(d,tx(i),H-8);});
  ctx.beginPath();ctx.setLineDash([4,3]);ctx.strokeStyle='#B0BEC5';ctx.lineWidth=1.5;lw.forEach((v,i)=>i===0?ctx.moveTo(tx(i),ty(v)):ctx.lineTo(tx(i),ty(v)));ctx.stroke();ctx.setLineDash([]);
  const grad=ctx.createLinearGradient(0,pT,0,pT+cH);grad.addColorStop(0,'rgba(46,125,50,0.16)');grad.addColorStop(1,'rgba(46,125,50,0.01)');
  ctx.beginPath();tw.forEach((v,i)=>i===0?ctx.moveTo(tx(i),ty(v)):ctx.lineTo(tx(i),ty(v)));ctx.lineTo(tx(tw.length-1),pT+cH);ctx.lineTo(tx(0),pT+cH);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
  ctx.beginPath();ctx.strokeStyle='#2E7D32';ctx.lineWidth=2.5;tw.forEach((v,i)=>i===0?ctx.moveTo(tx(i),ty(v)):ctx.lineTo(tx(i),ty(v)));ctx.stroke();
  tw.forEach((v,i)=>{ctx.beginPath();ctx.arc(tx(i),ty(v),4,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.strokeStyle='#2E7D32';ctx.lineWidth=2;ctx.stroke();});
}

/* ── MODAL HELPERS ──────────────────────────────────────── */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
function closeModalOnOverlay(e, id) { if(e.target===document.getElementById(id)) closeModal(id); }

/* ── UTILS ───────────────────────────────────────────────── */
function setTxt(id, v)  { const el=document.getElementById(id); if(el) el.textContent=v; }
function esc(s)         { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function fmt(n)         { return Number(n).toLocaleString('en-IN'); }
function getGreeting()  { const h=new Date().getHours(); return h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening'; }
function pimg(arr, i)   { return arr[i % arr.length]; }