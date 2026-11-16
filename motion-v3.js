/* MANNVASAM MOTION EXPERIENCE V3 */
(() => {
  if (window.__mannvasamMotionV3) return;
  window.__mannvasamMotionV3 = true;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const style = document.createElement("style");

  style.textContent = `
    .mv-v3-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      z-index: 10001;
      pointer-events: none;
      transform: scaleX(0);
      transform-origin: left;
      background: linear-gradient(90deg,#b88a45,#e8d09b,#fff1c9);
      box-shadow: 0 0 12px rgba(184,138,69,.45);
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: 9998;
      pointer-events: none;
      opacity: 0;
      background: radial-gradient(
        500px circle at var(--mv-v3-x,50%) var(--mv-v3-y,50%),
        rgba(220,190,125,.10),
        transparent 70%
      );
      transition: opacity .4s ease;
    }

    @media (hover:hover) {
      body.mv-v3-pointer::before { opacity: 1; }
    }

    .mv-v3-reveal {
      opacity: 0;
      transform: translate3d(0,35px,0);
      transition:
        opacity 1s cubic-bezier(.2,.7,.2,1),
        transform 1s cubic-bezier(.2,.7,.2,1);
    }

    .mv-v3-reveal.mv-v3-visible {
      opacity: 1;
      transform: translate3d(0,0,0);
    }

    .mv-v3-tilt {
      transform-style: preserve-3d;
      will-change: transform;
      transition: transform .45s cubic-bezier(.2,.7,.2,1);
    }

    .mv-v3-tilt.mv-v3-active {
      transition: transform .12s ease-out;
    }

    .mv-v3-tilt::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      background: radial-gradient(
        circle at var(--mv-v3-card-x,50%) var(--mv-v3-card-y,50%),
        rgba(255,255,255,.24),
        transparent 55%
      );
      transition: opacity .35s ease;
    }

    .mv-v3-tilt.mv-v3-active::after { opacity: 1; }

    .mv-v3-magnetic {
      transition: translate .25s ease;
      will-change: translate;
    }

    @media (prefers-reduced-motion: reduce) {
      .mv-v3-reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
      .mv-v3-tilt,
      .mv-v3-magnetic { transition: none; }
      body::before { display: none; }
    }
  `;

  document.head.appendChild(style);

  // Cinematic scroll progress
  const progress = document.createElement("div");
  progress.className = "mv-v3-progress";
  document.body.appendChild(progress);

  let ticking = false;

  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const amount = max > 0 ? scrollY / max : 0;
    progress.style.transform = `scaleX(${amount})`;

    const heroImage = document.querySelector(".hero-image");
    if (heroImage && !reduced) {
      heroImage.style.translate = `0 ${Math.min(scrollY * .10, 90)}px`;
    }

    ticking = false;
  }

  addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  updateScroll();

  // Scroll reveals
  const revealTargets = document.querySelectorAll(
    "main section:not(.hero), .product-card, .collection-card, " +
    ".category-card, .value-card, .trust-card, .feature-card"
  );

  if (!reduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("mv-v3-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -45px 0px" });

    revealTargets.forEach(el => {
      if (
        !el.classList.contains("reveal") &&
        !el.classList.contains("mv-cinematic-reveal") &&
        !el.classList.contains("cinematic-reveal")
      ) {
        el.classList.add("mv-v3-reveal");
        observer.observe(el);
      }
    });
  }

  // Interactive product depth
  if (!reduced && matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const cards = document.querySelectorAll(
      ".product-card, .product, .collection-card, .category-card, .mv-cinematic-product"
    );

    cards.forEach(card => {
      card.classList.add("mv-v3-tilt");

      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - .5) * 9;
        const rotateX = (.5 - y) * 7;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) ` +
          `rotateY(${rotateY}deg) translateY(-4px)`;

        card.style.setProperty("--mv-v3-card-x", `${x * 100}%`);
        card.style.setProperty("--mv-v3-card-y", `${y * 100}%`);
        card.classList.add("mv-v3-active");
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
        card.classList.remove("mv-v3-active");
      });
    });

    // Gentle magnetic buttons
    document.querySelectorAll(
      ".gold-button, .cart, button"
    ).forEach(button => {
      button.classList.add("mv-v3-magnetic");

      button.addEventListener("pointermove", event => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .08;
        const y = (event.clientY - rect.top - rect.height / 2) * .08;
        button.style.translate = `${x}px ${y}px`;
      });

      button.addEventListener("pointerleave", () => {
        button.style.translate = "";
      });
    });

    // Ambient cursor lighting
    document.body.classList.add("mv-v3-pointer");

    addEventListener("pointermove", event => {
      document.body.style.setProperty("--mv-v3-x", `${event.clientX}px`);
      document.body.style.setProperty("--mv-v3-y", `${event.clientY}px`);
    }, { passive: true });
  }

  console.info("MANNVASAM Motion Experience V3 loaded.");
})();
