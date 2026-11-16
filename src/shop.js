
const products = [
  {id:'shiva-samba',name:'Shiva Samba Rice',category:'Rice',tag:'NATIVE RICE',image:'/images/mannvasam-shivan-samba-hero.png',packs:[['500 g',60],['1 kg',125]]},
  {id:'mapillai-samba',name:'Mapillai Samba Rice',category:'Rice',tag:'NATIVE RICE',image:'/images/mannvasam-shivan-samba-hero.png',packs:[['500 g',119],['1 kg',219],['2 kg',419]]},
  {id:'karuppu-kavuni',name:'Karuppu Kavuni Rice',category:'Rice',tag:'HERITAGE RICE',image:'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=900&q=85',packs:[['500 g',149],['1 kg',279],['2 kg',539]]},
  {id:'seeraga-samba',name:'Seeraga Samba Rice',category:'Rice',tag:'TRADITIONAL FAVOURITE',image:'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=900&q=85',packs:[['500 g',99],['1 kg',189],['2 kg',369]]},
  {id:'thooyamalli',name:'Thooyamalli Rice',category:'Rice',tag:'NATIVE RICE',image:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=85',packs:[['500 g',109],['1 kg',199],['2 kg',389]]},
  {id:'foxtail-millet',name:'Foxtail Millet',category:'Millets',tag:'EVERYDAY GOODNESS',image:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900&q=85',packs:[['500 g',99],['1 kg',189],['2 kg',369]]},
  {id:'little-millet',name:'Little Millet',category:'Millets',tag:'TRADITIONAL GRAIN',image:'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=900&q=85',packs:[['500 g',89],['1 kg',169],['2 kg',329]]},
  {id:'black-gram',name:'Whole Black Gram',category:'Pulses',tag:'PANTRY ESSENTIAL',image:'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=900&q=85',packs:[['500 g',79],['1 kg',149],['2 kg',289]]},
  {id:'turmeric',name:'Traditional Turmeric Powder',category:'Spices',tag:'KITCHEN ESSENTIAL',image:'https://images.unsplash.com/photo-1615485500704-8e990f9900f5?w=900&q=85',packs:[['100 g',59],['250 g',129],['500 g',239]]},
  {id:'forest-honey',name:'Forest Honey',category:'Honey',tag:"NATURE'S GOODNESS",image:'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=900&q=85',packs:[['250 g',179],['500 g',329],['1 kg',619]]},
];

let activeCategory = 'All';
let searchText = '';
let cart = [];
try { cart = JSON.parse(localStorage.getItem('mv-shop-cart') || '[]'); } catch {}

const money = n => '₹' + Number(n).toLocaleString('en-IN');

function saveCart() {
  localStorage.setItem('mv-shop-cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.mv-cart-count').forEach(el => el.textContent = count);
}

function mountShop() {
  if (document.querySelector('#mv-shop')) return true;
  const oldProducts = document.querySelector('#products');
  if (!oldProducts) return false;

  const section = document.createElement('section');
  section.id = 'mv-shop';
  section.className = 'mv-shop section';
  section.innerHTML = `
    <div class="mv-shop-heading">
      <p class="eyebrow">THE MANNVASAM PANTRY</p>
      <h2>Goodness for <i>every day.</i></h2>
      <p>Explore traditional foods, thoughtfully brought to your home.</p>
    </div>
    <div class="mv-shop-tools">
      <div class="mv-categories">
        ${['All','Rice','Millets','Pulses','Spices','Honey'].map(c => `<button class="mv-filter ${c === 'All' ? 'active' : ''}" data-category="${c}">${c}</button>`).join('')}
      </div>
      <input class="mv-search" type="search" placeholder="Search the pantry..." aria-label="Search products">
    </div>
    <p class="mv-results"></p>
    <div class="mv-product-grid"></div>
  `;
  oldProducts.insertAdjacentElement('afterend', section);

  const cartButton = document.createElement('button');
  cartButton.className = 'mv-cart-float';
  cartButton.innerHTML = 'YOUR BAG <span class="mv-cart-count">0</span>';
  cartButton.setAttribute('aria-label', 'Open shopping bag');
  document.body.appendChild(cartButton);

  const drawer = document.createElement('div');
  drawer.className = 'mv-cart-overlay';
  drawer.innerHTML = `
    <div class="mv-cart-panel">
      <div class="mv-cart-head">
        <div><p class="eyebrow">MANNVASAM</p><h2>Your shopping bag</h2></div>
        <button class="mv-cart-close" aria-label="Close cart">×</button>
      </div>
      <div class="mv-cart-items"></div>
      <div class="mv-cart-footer">
        <div class="mv-cart-total"><span>Subtotal</span><strong>₹0</strong></div>
        <p>Delivery charges are calculated at checkout.</p>
        <button class="mv-checkout-preview" disabled>CHECKOUT — COMING NEXT</button>
      </div>
    </div>`;
  document.body.appendChild(drawer);

  function renderProducts() {
    const filtered = products.filter(p =>
      (activeCategory === 'All' || p.category === activeCategory) &&
      (p.name + ' ' + p.category + ' ' + p.tag).toLowerCase().includes(searchText)
    );
    section.querySelector('.mv-results').textContent = `${filtered.length} products`;
    section.querySelector('.mv-product-grid').innerHTML = filtered.map(p => `
      <article class="mv-shop-card" data-product="${p.id}">
        <div class="mv-shop-image">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span>${p.tag}</span>
        </div>
        <div class="mv-shop-card-body">
          <p class="mv-shop-category">${p.category}</p>
          <h3>${p.name}</h3>
          <label class="mv-pack-label">Choose pack size</label>
          <select class="mv-pack-select" aria-label="Pack size for ${p.name}">
            ${p.packs.map((pack,i) => `<option value="${i}">${pack[0]} · ${money(pack[1])}</option>`).join('')}
          </select>
          <div class="mv-shop-buy">
            <strong class="mv-card-price">${money(p.packs[0][1])}</strong>
            <button class="mv-add-button" data-add="${p.id}">ADD TO BAG +</button>
          </div>
        </div>
      </article>`).join('');

    section.querySelectorAll('.mv-pack-select').forEach(select => {
      select.addEventListener('change', () => {
        const card = select.closest('.mv-shop-card');
        const p = products.find(x => x.id === card.dataset.product);
        card.querySelector('.mv-card-price').textContent = money(p.packs[Number(select.value)][1]);
      });
    });
  }

  function renderCart() {
    const items = drawer.querySelector('.mv-cart-items');
    const total = cart.reduce((sum,item) => sum + item.price * item.qty, 0);
    if (!cart.length) {
      items.innerHTML = '<div class="mv-empty-cart"><span>✳</span><h3>Your bag is waiting.</h3><p>Discover something good from our pantry.</p></div>';
    } else {
      items.innerHTML = cart.map((item,i) => `
        <div class="mv-cart-row">
          <div><h3>${item.name}</h3><p>${item.pack} · ${money(item.price)}</p>
            <div class="mv-quantity"><button data-qty="${i}" data-change="-1">−</button><span>${item.qty}</span><button data-qty="${i}" data-change="1">+</button></div>
          </div>
          <strong>${money(item.price * item.qty)}</strong>
          <button class="mv-remove" data-remove="${i}" aria-label="Remove ${item.name}">×</button>
        </div>`).join('');
    }
    drawer.querySelector('.mv-cart-total strong').textContent = money(total);
    updateCartCount();
  }

  function openCart() {
    renderCart();
    drawer.classList.add('open');
    document.body.classList.add('mv-cart-open');
  }
  function closeCart() {
    drawer.classList.remove('open');
    document.body.classList.remove('mv-cart-open');
  }

  section.addEventListener('click', e => {
    const filter = e.target.closest('[data-category]');
    if (filter) {
      activeCategory = filter.dataset.category;
      section.querySelectorAll('.mv-filter').forEach(b => b.classList.toggle('active', b === filter));
      renderProducts();
    }
    const add = e.target.closest('[data-add]');
    if (add) {
      const p = products.find(x => x.id === add.dataset.add);
      const card = add.closest('.mv-shop-card');
      const pack = p.packs[Number(card.querySelector('.mv-pack-select').value)];
      const existing = cart.find(x => x.id === p.id && x.pack === pack[0]);
      if (existing) existing.qty++;
      else cart.push({id:p.id,name:p.name,pack:pack[0],price:pack[1],qty:1});
      saveCart();
      add.textContent = 'ADDED ✓';
      setTimeout(() => add.textContent = 'ADD TO BAG +', 1000);
    }
  });

  section.querySelector('.mv-search').addEventListener('input', e => {
    searchText = e.target.value.trim().toLowerCase();
    renderProducts();
  });

  cartButton.addEventListener('click', openCart);
  drawer.querySelector('.mv-cart-close').addEventListener('click', closeCart);
  drawer.addEventListener('click', e => {
    if (e.target === drawer) closeCart();
    const qty = e.target.closest('[data-qty]');
    if (qty) {
      const i = Number(qty.dataset.qty);
      cart[i].qty += Number(qty.dataset.change);
      if (cart[i].qty <= 0) cart.splice(i,1);
      saveCart(); renderCart();
    }
    const remove = e.target.closest('[data-remove]');
    if (remove) {
      cart.splice(Number(remove.dataset.remove),1);
      saveCart(); renderCart();
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  renderProducts();
  renderCart();
  console.log('MANNVASAM shop and cart loaded.');
  return true;
}

if (!mountShop()) {
  const observer = new MutationObserver(() => {
    if (mountShop()) observer.disconnect();
  });
  observer.observe(document.documentElement, {childList:true,subtree:true});
}
