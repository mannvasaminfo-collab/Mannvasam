/* MANNVASAM — PRECISION PRODUCT HANDOFF */

(() => {
  if (window.__mvPrecisionHandoff) return;
  window.__mvPrecisionHandoff = true;

  function install() {
    const main = document.querySelector('main');
    const hero = main?.querySelector('section:first-of-type');
    const source = hero?.querySelector('.mv-hero-product-image');

    if (!main || !hero || !source) return false;

    const sections = [...main.querySelectorAll('section')].filter(s => s !== hero);

    const collection = sections.find(s =>
      s.querySelector('#productGrid, .product-grid, .products-grid')
    ) || sections.find(s =>
      /collection|shop|products/i.test(
        (s.id || '') + ' ' + s.textContent.slice(0, 350)
      )
    );

    if (!collection) {
      console.warn('MANNVASAM: product collection section not found.');
      return false;
    }

    const cards = [...collection.querySelectorAll(
      '.product-card, .product-item, [data-product], ' +
      '#productGrid > *, .product-grid > *, .products-grid > *'
    )];

    if (!cards.length) {
      console.warn('MANNVASAM: product cards not found.');
      return false;
    }

    // Prefer the matching Shivan Samba product if it exists.
    const matchingCard = cards.find(card =>
      /shivan\s*samba/i.test(card.textContent)
    );

    const card = matchingCard || cards.find(card =>
      /rice|samba/i.test(card.textContent)
    ) || cards[0];

    const target = card.querySelector('img');
    if (!target) {
      console.warn('MANNVASAM: destination product image not found.');
      return false;
    }

    document.querySelector('.mv-product-traveller')?.remove();

    const traveller = document.createElement('div');
    traveller.className = 'mv-product-traveller';
    traveller.innerHTML = '<img alt="" aria-hidden="true">';
    const movingImage = traveller.querySelector('img');
    movingImage.src = source.currentSrc || source.src;
    document.body.appendChild(traveller);

    // Use the real image boxes, preserving the packaging aspect ratio.
    function rect(el) {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + window.scrollX,
        y: r.top + window.scrollY,
        w: r.width,
        h: r.height
      };
    }

    let frame = 0;
    let active = false;

    function update() {
      frame = 0;

      const start = rect(source);
      const finish = rect(target);

      const startY = hero.getBoundingClientRect().top +
        window.scrollY + hero.offsetHeight * .38;

      const finishY = collection.getBoundingClientRect().top +
        window.scrollY + window.innerHeight * .38;

      const distance = Math.max(250, finishY - startY);
      const progress = Math.max(0, Math.min(1,
        (window.scrollY - startY) / distance
      ));

      if (progress <= 0 || progress >= 1) {
        traveller.style.opacity = '0';
        traveller.style.pointerEvents = 'none';
        active = false;
        return;
      }

      active = true;

      // Smooth cinematic easing with a gentle curved travel path.
      const ease = progress * progress * (3 - 2 * progress);
      const mix = (a, b) => a + (b - a) * ease;

      const width = mix(start.w, finish.w, ease);
      const height = mix(start.h, finish.h, ease);

      const startCenterX = start.x + start.w / 2;
      const finishCenterX = finish.x + finish.w / 2;
      const startCenterY = start.y + start.h / 2;
      const finishCenterY = finish.y + finish.h / 2;

      const arc = Math.sin(progress * Math.PI) *
        Math.min(75, window.innerHeight * .09);

      const centerX = mix(startCenterX, finishCenterX, ease);
      const centerY = mix(startCenterY, finishCenterY, ease) - arc;

      traveller.style.width = `${width}px`;
      traveller.style.height = `${height}px`;
      traveller.style.left = `${centerX - width / 2 - window.scrollX}px`;
      traveller.style.top = `${centerY - height / 2 - window.scrollY}px`;

      // A restrained rotation settles into the destination card.
      // Cinematic curved flight with a subtle 3D tilt.
      const flight = Math.sin(progress * Math.PI);
      const rotation = (1 - ease) * -7 + flight * 2.2;
      const scale = 1 + flight * .055 - ease * .035;
      const tilt = (1 - ease) * 2.5;

      traveller.style.transform =
        `perspective(900px) rotate(${rotation}deg) rotateY(${tilt}deg) scale(${scale})`;
      traveller.style.filter =
        `drop-shadow(0 ${10 + flight * 9}px ${18 + flight * 12}px rgba(20, 34, 18, ${.18 + flight * .08}))`;

      // Fade smoothly at the beginning and end of the journey.
      const fade = Math.min(1, progress * 9, (1 - progress) * 9);
      traveller.style.opacity = String(fade);
      traveller.style.pointerEvents = 'none';
    }

    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('load', requestUpdate);

    // Keep the destination image visible; the overlay is fitted on top.
    target.style.position = target.style.position || 'relative';

    requestUpdate();

    console.log(
      'MANNVASAM precision handoff ready. Destination:',
      matchingCard ? 'Shivan Samba' : 'first rice product'
    );

    return true;
  }

  if (!install()) {
    const watcher = new MutationObserver(() => {
      if (install()) watcher.disconnect();
    });

    watcher.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
