/* MANNVASAM — PROFESSIONAL PRODUCT REVEAL */

(() => {
  if (window.__mvProHero) return;
  window.__mvProHero = true;

  function install() {
    const hero = document.querySelector('main section:first-of-type');
    if (!hero) return false;

    let stage = hero.querySelector('.mv-hero-product');

    if (!stage) {
      stage = document.createElement('div');
      stage.className = 'mv-hero-product';
      stage.innerHTML = `
        <div class="mv-hero-product-aura"></div>
        <div class="mv-hero-product-shadow"></div>
        <div class="mv-hero-product-orbit"></div>
        <img
          class="mv-hero-product-image"
          src="/images/mannvasam-shivan-samba-hero.png"
          alt="MANNVASAM Shivan Samba Traditional Rice, 1 kg"
          fetchpriority="high"
        >
        <div class="mv-hero-product-caption">
          <span>ROOTED IN TRADITION</span>
          <strong>SHIVAN SAMBA</strong>
          <span>TRADITIONAL RICE · 1 KG</span>
        </div>
      `;
      hero.appendChild(stage);
    }

    hero.classList.add('mv-cinema-hero');

    // Animate the product in and out as the hero enters/leaves view.
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stage.classList.add('mv-product-arrived');
        } else {
          stage.classList.remove('mv-product-arrived');
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -5% 0px'
    });

    observer.observe(hero);

    // 3D mouse movement.
    if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
      hero.addEventListener('pointermove', event => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;

        stage.style.setProperty('--mv-tilt-x', `${-y * 7}deg`);
        stage.style.setProperty('--mv-tilt-y', `${x * 10}deg`);
      });

      hero.addEventListener('pointerleave', () => {
        stage.style.setProperty('--mv-tilt-x', '0deg');
        stage.style.setProperty('--mv-tilt-y', '0deg');
      });
    }

    console.log('MANNVASAM professional product reveal ready.');
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
