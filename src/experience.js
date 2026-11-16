const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initMannvasamExperience() {
  // Cinematic opening screen
  const loader = document.createElement('div');
  loader.className = 'mv-loader';
  loader.innerHTML = `
    <div class="loader-brand">
      <img class="loader-logo" src="/images/mannvasam-logo-transparent.png" alt="MANNVASAM" />
      <span class="loader-name">MANNVASAM</span>
      <span class="loader-tagline">FROM OUR SOIL TO YOUR SOUL</span>
      <span class="loader-line"></span>
    </div>
  `;
  document.body.appendChild(loader);

  const finishLoading = () => {
    loader.classList.add('is-hidden');
    document.body.classList.add('page-ready');
    setTimeout(() => loader.remove(), 1000);
  };

  setTimeout(finishLoading, reducedMotion ? 100 : 900);

  // Sticky header changes on scroll
  const header = document.querySelector('.header');

  const updateHeader = () => {
    header?.classList.toggle('header-scrolled', window.scrollY > 35);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Continuous editorial ticker
  const ticker = document.querySelector('.ticker');

  if (ticker && !ticker.querySelector('.ticker-track')) {
    const original = ticker.innerHTML;
    ticker.innerHTML = `
      <div class="ticker-track">
        <div class="ticker-content">${original}</div>
        <div class="ticker-content" aria-hidden="true">${original}</div>
      </div>
    `;
  }

  // Cinematic image reveals
  const imageTargets = document.querySelectorAll(
    '.intro-image, .collection-card, .responsible-image'
  );

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('image-is-visible');
          imageObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    imageTargets.forEach(el => {
      el.classList.add('image-reveal');
      imageObserver.observe(el);
    });
  } else {
    imageTargets.forEach(el => el.classList.add('image-is-visible'));
  }

  // Interactive 3D-style card movement
  if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.product, .collection-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (
          !card.classList.contains('cinematic-visible') &&
          !card.classList.contains('visible')
        ) return;

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        card.style.setProperty('--tilt-x', `${(x - 0.5) * 5}deg`);
        card.style.setProperty('--tilt-y', `${(0.5 - y) * 5}deg`);
        card.classList.add('tilt-active');
      });

      card.addEventListener('pointerleave', () => {
        card.classList.remove('tilt-active');
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  // Smooth section entrance
  document.querySelectorAll('.section-heading, .journey-heading, .trust-heading')
    .forEach(el => el.classList.add('editorial-heading'));

  // Close mobile navigation after selecting a section
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav')?.classList.remove('nav-open');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMannvasamExperience, { once: true });
} else {
  initMannvasamExperience();
}
