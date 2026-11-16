
(function () {
  let ready = false;

  const descriptions = {
    Rice: 'Discover the character of traditional rice, thoughtfully selected for everyday meals and recipes rooted in heritage.',
    Millets: 'Bring traditional grains into your everyday kitchen with this carefully presented millet selection.',
    Pulses: 'A pantry essential for familiar home cooking, traditional recipes and everyday meals.',
    Spices: 'A traditional kitchen essential to bring warmth, aroma and flavour to your cooking.',
    Honey: 'A naturally inspired pantry favourite for the moments when you want a touch of sweetness.'
  };

  function setup() {
    const shop = document.querySelector('#mv-shop');
    if (!shop) return false;

    if (!document.querySelector('#mv-product-detail')) {
      const overlay = document.createElement('div');
      overlay.id = 'mv-product-detail';
      overlay.className = 'mv-detail-overlay';
      overlay.innerHTML = `
        <div class="mv-detail-panel" role="dialog" aria-modal="true" aria-label="Product details">
          <button class="mv-detail-close" aria-label="Close product details">×</button>
          <div class="mv-detail-content"></div>
        </div>`;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', e => {
        if (e.target === overlay || e.target.closest('.mv-detail-close')) {
          overlay.classList.remove('open');
          document.body.classList.remove('mv-detail-open');
        }

        if (e.target.closest('.mv-detail-add')) {
          const card = document.querySelector(
            `.mv-shop-card[data-product="${overlay.dataset.product}"]`
          );
          if (!card) return;

          const detailSelect = overlay.querySelector('.mv-detail-pack');
          const cardSelect = card.querySelector('.mv-pack-select');
          cardSelect.value = detailSelect.value;
          cardSelect.dispatchEvent(new Event('change', { bubbles: true }));
          card.querySelector('[data-add]').click();

          overlay.classList.remove('open');
          document.body.classList.remove('mv-detail-open');
        }
      });
    }

    function addDetailButtons() {
      shop.querySelectorAll('.mv-shop-card').forEach(card => {
        if (card.querySelector('.mv-detail-trigger')) return;

        const button = document.createElement('button');
        button.className = 'mv-detail-trigger';
        button.type = 'button';
        button.textContent = 'VIEW PRODUCT DETAILS ↗';
        card.querySelector('.mv-shop-card-body').appendChild(button);
      });
    }

    if (!ready) {
      ready = true;

      shop.addEventListener('click', e => {
        const trigger = e.target.closest('.mv-detail-trigger');
        if (!trigger) return;

        const card = trigger.closest('.mv-shop-card');
        if (!card) return;

        const overlay = document.querySelector('#mv-product-detail');
        const name = card.querySelector('h3').textContent;
        const image = card.querySelector('img').src;
        const category = card.querySelector('.mv-shop-category').textContent;
        const tag = card.querySelector('.mv-shop-image span').textContent;
        const select = card.querySelector('.mv-pack-select');
        const price = card.querySelector('.mv-card-price').textContent;

        overlay.dataset.product = card.dataset.product;
        overlay.querySelector('.mv-detail-content').innerHTML = `
          <div class="mv-detail-image">
            <img src="${image}" alt="${name}">
            <span>${tag}</span>
          </div>
          <div class="mv-detail-info">
            <p class="eyebrow">${category} · MANNVASAM PANTRY</p>
            <h2>${name}</h2>
            <p class="mv-detail-description">${descriptions[category] || descriptions.Rice}</p>
            <p class="mv-detail-origin">FROM OUR SOIL TO YOUR SOUL</p>
            <label for="mv-detail-pack">Choose your pack</label>
            <select id="mv-detail-pack" class="mv-detail-pack">
              ${Array.from(select.options).map(o =>
                `<option value="${o.value}" ${o.selected ? 'selected' : ''}>${o.textContent}</option>`
              ).join('')}
            </select>
            <strong class="mv-detail-price">${price}</strong>
            <button class="mv-detail-add">ADD TO BAG +</button>
            <p class="mv-detail-note">Sample catalogue information. Final product details and prices will be confirmed before launch.</p>
          </div>`;

        overlay.querySelector('.mv-detail-pack').addEventListener('change', e => {
          const option = e.target.selectedOptions[0];
          const match = option.textContent.match(/₹[\d,]+/);
          overlay.querySelector('.mv-detail-price').textContent = match ? match[0] : '';
        });

        overlay.classList.add('open');
        document.body.classList.add('mv-detail-open');
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          document.querySelector('#mv-product-detail')?.classList.remove('open');
          document.body.classList.remove('mv-detail-open');
        }
      });
    }

    addDetailButtons();

    const grid = shop.querySelector('.mv-product-grid');
    if (grid && !grid.dataset.detailObserver) {
      grid.dataset.detailObserver = 'ready';
      new MutationObserver(addDetailButtons).observe(grid, {
        childList: true,
        subtree: true
      });
    }

    return true;
  }

  if (!setup()) {
    const observer = new MutationObserver(() => {
      if (setup()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
