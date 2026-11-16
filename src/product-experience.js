(function () {
  let attached = false;
  let frame = 0;
  let observer = null;

  function attachProductAnimation() {
    if (attached) return true;

    const section = document.querySelector('.mv-product-experience');
    const packet = document.querySelector('.mv-product-packet');
    const photo = document.querySelector('.mv-product-photo');

    if (!section || !packet || !photo) return false;

    attached = true;
    if (observer) observer.disconnect();

    const reducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    packet.style.transformStyle = 'preserve-3d';
    packet.style.transformOrigin = '50% 50%';
    packet.style.willChange = 'transform';
    photo.style.backfaceVisibility = 'visible';

    function updateProduct() {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const raw = (vh * 0.85 - rect.top) / (vh * 0.85 + rect.height);
      const progress = Math.max(0, Math.min(1, raw));
      const depth = Math.sin(progress * Math.PI);
      const mobile = window.innerWidth <= 760;

      if (reducedMotion) {
        packet.style.transform = 'none';
        return;
      }

      const scale = 0.92 + depth * (mobile ? 0.22 : 0.42);
      const z = depth * (mobile ? 100 : 240);
      const y = (0.5 - progress) * 42;
      const rotateY = -24 + progress * 48;
      const rotateX = 9 - depth * 18;

      packet.style.transform =
        `perspective(1000px) translate3d(0, ${y}px, ${z}px) ` +
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    }

    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(updateProduct);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    requestUpdate();

    console.log('MANNVASAM 3D product animation attached successfully.');
    return true;
  }

  if (!attachProductAnimation()) {
    observer = new MutationObserver(() => {
      attachProductAnimation();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    console.log('MANNVASAM waiting for product section...');
  }
})();
