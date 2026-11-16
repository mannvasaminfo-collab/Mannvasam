/* MANNVASAM CINEMATIC EXPERIENCE */

(() => {
  if (window.__mvCinematicInstalled) return;
  window.__mvCinematicInstalled = true;

  const start = () => {
    const main = document.querySelector('main');
    if (!main) return false;

    // Cinematic animated landscape on the opening section
    const hero = main.querySelector('section:first-of-type');

    if (hero && !hero.querySelector('.mv-cinema-scenery')) {
      hero.classList.add('mv-cinema-hero');

      const scenery = document.createElement('div');
      scenery.className = 'mv-cinema-scenery';
      scenery.setAttribute('aria-hidden', 'true');
      scenery.innerHTML = `
        <div class="mv-cinema-sky"></div>
        <div class="mv-cinema-sun"></div>
        <div class="mv-cinema-cloud cloud-one"></div>
        <div class="mv-cinema-cloud cloud-two"></div>
        <div class="mv-cinema-cloud cloud-three"></div>
        <div class="mv-cinema-mountain mountain-back"></div>
        <div class="mv-cinema-mountain mountain-front"></div>
        <div class="mv-cinema-field field-back"></div>
        <div class="mv-cinema-field field-front"></div>
        <div class="mv-cinema-particles"></div>
      `;
      hero.prepend(scenery);
    }

    // Reveal sections as the visitor scrolls
    const revealItems = main.querySelectorAll(
      'section, .journey-step, .mv-product-experience, ' +
      '.mv-product-stage, .product-card, .product-item, article'
    );

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mv-cinematic-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });

    revealItems.forEach((item, index) => {
      if (item === hero) return;
      item.classList.add('mv-cinematic-reveal');
      item.style.setProperty('--mv-reveal-delay', `${(index % 4) * 90}ms`);
      observer.observe(item);
    });

    // Product images receive gentle floating movement
    main.querySelectorAll(
      '.mv-product-photo, .mv-product-packet, ' +
      '.mv-product-experience img, .product-card img, .product-item img'
    ).forEach((img, index) => {
      img.classList.add('mv-floating-product');
      img.style.setProperty('--mv-float-delay', `${index * -0.4}s`);
    });

    // Stagger the farm-to-home journey
    main.querySelectorAll('.journey-step').forEach((step, index) => {
      step.style.setProperty('--mv-step-delay', `${index * 140}ms`);
    });

    // Gentle pointer-based movement on the hero
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      hero?.addEventListener('pointermove', event => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        hero.style.setProperty('--mv-pointer-x', `${x * 12}px`);
        hero.style.setProperty('--mv-pointer-y', `${y * 8}px`);
      });
    }

    console.log('MANNVASAM cinematic experience loaded.');
    return true;
  };

  if (!start()) {
    const watcher = new MutationObserver(() => {
      if (start()) watcher.disconnect();
    });
    watcher.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
