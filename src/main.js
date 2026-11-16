import './checkout.js';
import './cod-orders.js';
import './product-details.js';
import './shop.js';
import './style.css'
import './experience.js'
import './product-experience.js'

document.querySelector('#app').innerHTML = `
<header class="header">
  <a class="brand" href="#">
    <img class="brand-logo" src="/images/mannvasam-logo-transparent.png" alt="MANNVASAM" />
    <span>MANNVASAM<small>FROM OUR SOIL TO YOUR SOUL</small></span>
  </a>
  <nav class="nav">
    <a href="#home">Home</a>
    <a href="#story">Collections</a>
    <a href="/recipes.html">Recipes</a>
    <a href="/story.html">Full story</a>
    <a href="#story">Our Story</a>
    <a href="#featured-product">Shop</a>
  </nav>
  <a class="cart" href="/product.html">ORDER NOW <span>↗</span></a>
  <button class="menu" aria-label="Open menu">☰</button>
</header>

<main>

<section class="hero mv-cinematic-hero" id="home">
  <div class="hero-image"></div>
  <div class="hero-overlay"></div>

  <div class="mv-cinematic-atmosphere">
    <div class="mv-cinema-sun"></div>
    <div class="mv-cinema-horizon"></div>
    <div class="mv-cinema-field mv-field-back"></div>
    <div class="mv-cinema-field mv-field-front"></div>
    <div class="mv-cinema-mist"></div>
  </div>

  <div class="mv-cinematic-brand">
    <img src="/images/mannvasam-logo-transparent.png"
         alt="MANNVASAM — From Our Soil to Your Soul">
  </div>

  <div class="hero-content mv-cinematic-copy">
    <p class="eyebrow">ROOTED IN TRADITION · GROWN WITH CARE</p>
    <h1>Good food<br>begins with<br><i>good roots.</i></h1>
    <p class="hero-desc">
      Rediscover the goodness of traditional foods.<br>
      Thoughtfully sourced from our soil to your soul.
    </p>
    <a class="gold-button" href="#story">
      EXPLORE OUR COLLECTION <span>↗</span>
    </a>
  </div>

  <div class="mv-cinematic-product">
    <div class="mv-product-glow"></div>
    <div class="mv-product-orbit"></div>
    <img src="/images/mannvasam-rice-product.png"
         alt="MANNVASAM traditional rice"
         class="mv-real-rice-product">
    <span class="mv-product-label">THE GOODNESS OF OUR ROOTS</span>
  </div>

  <div class="hero-bottom">
    <span>PURE · NATURAL · TRADITIONAL</span>
    <span>01 — 04</span>
  </div>

  <div class="vertical-note">A TASTE OF OUR HERITAGE</div>
  <div class="mv-scroll-indicator">
    <span>SCROLL TO DISCOVER</span>
    <span class="mv-scroll-line"></span>
  </div>
</section>


<div class="ticker">
  <span>FROM OUR SOIL TO YOUR SOUL</span> ✳
  <span>TRADITIONAL GOODNESS</span> ✳
  <span>ROOTED IN NATURE</span> ✳
  <span>FROM OUR SOIL TO YOUR SOUL</span>
</div>

<section class="intro section" id="story">
  <div class="intro-image reveal">
    <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1100&q=85" alt="Green agricultural fields">
    <span class="image-caption">NATURE IS OUR FIRST INGREDIENT</span>
  </div>
  <div class="intro-copy reveal">
    <p class="eyebrow">OUR PHILOSOPHY</p>
    <h2>Some things are<br>too good to <i>forget.</i></h2>
    <p>From heritage rice varieties to wholesome millets, we celebrate the foods that have nourished generations. Every choice brings us closer to our roots.</p>
    <a class="text-link" href="#story">DISCOVER MANNVASAM <span>↗</span></a>
    <div class="intro-number">01 <span>— OUR ROOTS</span></div>
  </div>
</section>






<section class="mv-product-experience" id="featured-product">
  <div class="mv-product-glow"></div>
  <div class="mv-product-grains" aria-hidden="true">
    <span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span>
  </div>

  <div class="mv-product-inner">
    <div class="mv-product-copy">
      <p class="mv-product-kicker">FROM OUR SOIL TO YOUR SOUL</p>
      <p class="mv-product-index">01 / THE MANNVASAM COLLECTION</p>
      <h2>Tradition<br>in every <i>grain.</i></h2>
      <p class="mv-product-description">
        Discover the familiar goodness of traditional rice,
        thoughtfully brought to your everyday kitchen.
      </p>
      <div class="mv-product-meta">
        <span>TRADITIONAL RICE</span>
        <span>ROOTED IN HERITAGE</span>
      </div>
      <a class="mv-product-button" href="#featured-product">
        EXPLORE THE COLLECTION <span>↗</span>
      </a>
    </div>

    <div class="mv-product-stage" aria-label="MANNVASAM traditional rice sample package">
      <div class="mv-product-orbit mv-orbit-one"></div>
      <div class="mv-product-orbit mv-orbit-two"></div>
      <div class="mv-product-shadow"></div>
      <div class="mv-product-packet mv-real-product-display">
        <img
          class="mv-product-photo"
          src="/images/mannvasam-shivan-samba-hero.png"
          alt="MANNVASAM Shiva Samba traditional rice packet"
        >
      </div>
      <span class="mv-product-caption">A TASTE OF OUR ROOTS</span>
    </div>
  </div>
  <div class="mv-product-scroll-note">SCROLL TO DISCOVER <span>↓</span></div>
</section>

<section id="products"></section>

<section class="home-values section">
  <div class="section-heading reveal">
    <div>
      <p class="eyebrow">ROOTED IN TRADITION • MADE FOR TODAY</p>
      <h2>Food that feels like <i>home.</i></h2>
    </div>
    <p>Discover thoughtfully sourced rice, millets, spices and natural foods inspired by the richness of Indian food traditions. At Mannvasam, we bring the goodness of familiar ingredients into your everyday kitchen with care, authenticity and convenience.</p>
  </div>
  <div class="values-grid">
    <article class="value-card reveal"><span>🌾</span><h3>Traditional foods</h3><p>Rooted in the rich food traditions of India.</p></article>
    <article class="value-card reveal"><span>🌱</span><h3>Thoughtfully sourced</h3><p>Ingredients selected with care and attention.</p></article>
    <article class="value-card reveal"><span>🤎</span><h3>Made for families</h3><p>Familiar foods for everyday family kitchens.</p></article>
    <article class="value-card reveal"><span>📦</span><h3>Delivered with care</h3><p>Packed with care and sent from our store to your doorstep.</p></article>
  </div>
</section>

<section class="trust-section section" id="trust">
  <div class="trust-heading reveal">
    <p class="eyebrow">TWO PATHWAYS TO TRUST</p>
    <h2>How products qualify<br>for <i>MANNVASAM.</i></h2>
    <p>Different products may follow different sourcing and verification pathways. We aim to communicate their status clearly.</p>
  </div>
  <div class="trust-grid">
    <article class="trust-card organic reveal">
      <span class="trust-icon">🌱</span>
      <p class="eyebrow">PATHWAY 01</p>
      <h3>Certified Organic</h3>
      <p>Selected products may come through recognised organic certification pathways supported by applicable documentation, standards and traceability processes.</p>
      <ul>
        <li>Recognised organic standards</li>
        <li>Documented production information</li>
        <li>Traceability through the relevant system</li>
        <li>Clear product certification status</li>
      </ul>
      <span class="trust-foot">CERTIFICATION WHERE APPLICABLE</span>
    </article>
    <article class="trust-card natural reveal">
      <span class="trust-icon">🌾</span>
      <p class="eyebrow">PATHWAY 02</p>
      <h3>MANNVASAM Natural Farming Produce</h3>
      <p>Some traditional farmers follow responsible natural cultivation practices but may not have access to formal certification. For selected products, we build confidence through sourcing review and direct relationships.</p>
      <ul>
        <li>Farmer and source understanding</li>
        <li>Farm visits where applicable</li>
        <li>Review of cultivation practices</li>
        <li>Available testing or documentation where required</li>
      </ul>
      <span class="trust-foot">TRANSPARENT SOURCING APPROACH</span>
    </article>
  </div>
</section>

<section class="journey-section section">
  <div class="journey-heading reveal">
    <p class="eyebrow">FARM TO HOME</p>
    <h2>A journey built on <i>care and transparency.</i></h2>
  </div>
  <div class="journey-line">
    <article class="journey-step reveal"><span class="step-number">01</span><span class="step-icon">👨‍🌾</span><h3>Farm & Source</h3><p>We understand where the produce begins and the people behind it.</p></article>
    <article class="journey-step reveal"><span class="step-number">02</span><span class="step-icon">🌱</span><h3>Review</h3><p>Cultivation practices and available sourcing information are reviewed.</p></article>
    <article class="journey-step reveal"><span class="step-number">03</span><span class="step-icon">🌾</span><h3>Procurement</h3><p>Products are selected with attention to quality, origin and care.</p></article>
    <article class="journey-step reveal"><span class="step-number">04</span><span class="step-icon">🏡</span><h3>Careful Handling</h3><p>Food is handled, cleaned or packed according to its requirements.</p></article>
    <article class="journey-step reveal"><span class="step-number">05</span><span class="step-icon">🍚</span><h3>Your Kitchen</h3><p>Honest food travels from its source to become part of your home.</p></article>
  </div>
</section>

<section class="responsible-section">
  <div class="responsible-image"></div>
  <div class="responsible-overlay"></div>
  <div class="responsible-content reveal">
    <p class="eyebrow">MANNVASAM RESPONSIBLE SOURCING</p>
    <h2>From our soil<br>to <i>your soul.</i></h2>
    <p>Good food begins long before it reaches your kitchen. It begins with the soil, the farmer, traditional knowledge and the care taken at every stage of the journey.</p>
    <a class="gold-button" href="#featured-product">KNOW YOUR FOOD <span>↗</span></a>
    <a class="gold-button" href="#mannvasam-world" data-mv-world-entry>
      EXPLORE OUR WORLD <span>✦</span>
    </a>
  </div>
</section>

</main>

<footer>
  <a class="brand footer-brand" href="#"><img class="brand-logo" src="/images/mannvasam-logo-transparent.png" alt="MANNVASAM" /><span>MANNVASAM<small>FROM OUR SOIL TO YOUR SOUL</small></span></a>
  <p>Rooted in tradition. Made for today.</p>
  <span>© 2026 MANNVASAM</span>
</footer>
`

const menu = document.querySelector('.menu')
menu.addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('nav-open')
})

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav').classList.remove('nav-open'))
})

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

// MANNVASAM CINEMATIC INTERACTION SYSTEM

// Scroll progress indicator
const progress = document.createElement('div')
progress.className = 'scroll-progress'
document.body.appendChild(progress)

let scrollTicking = false

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      progress.style.width = `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`

      const heroImage = document.querySelector('.hero-image')
      if (heroImage && window.innerWidth > 800) {
        heroImage.style.transform = `translateY(${window.scrollY * 0.16}px) scale(1.04)`
      }

      scrollTicking = false
    })
    scrollTicking = true
  }
}, { passive: true })

// Staggered reveal animation
const cinematicObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children]
      const index = siblings.indexOf(entry.target)
      entry.target.style.transitionDelay = `${Math.min(index * 100, 400)}ms`
      entry.target.classList.add('cinematic-visible')
      cinematicObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll(
  '.value-card, .trust-card, .journey-step, .product, .collection-card'
).forEach(el => {
  el.classList.add('cinematic-reveal')
  cinematicObserver.observe(el)
})

// Elegant pointer movement on product cards
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.product, .collection-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      card.style.setProperty('--pointer-x', `${x * 100}%`)
      card.style.setProperty('--pointer-y', `${y * 100}%`)
    })
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--pointer-x', '50%')
      card.style.setProperty('--pointer-y', '50%')
    })
  })
}

// Magnetic button movement
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.gold-button').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`
    })
    button.addEventListener('pointerleave', () => {
      button.style.transform = ''
    })
  })
}

// Floating golden particles in the hero
const hero = document.querySelector('.hero')

if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const particleLayer = document.createElement('div')
  particleLayer.className = 'grain-particles'
  hero.appendChild(particleLayer)

  for (let i = 0; i < 22; i++) {
    const particle = document.createElement('span')
    particle.className = 'grain-particle'
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${20 + Math.random() * 75}%`
    particle.style.animationDelay = `${Math.random() * 9}s`
    particle.style.animationDuration = `${7 + Math.random() * 9}s`
    particleLayer.appendChild(particle)
  }
}

// Active navigation indicator
const sections = document.querySelectorAll('main section[id]')
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav a').forEach(link => {
        link.classList.toggle(
          'nav-active',
          link.getAttribute('href') === `#${entry.target.id}`
        )
      })
    }
  })
}, { rootMargin: '-25% 0px -65% 0px' })

sections.forEach(section => navObserver.observe(section))

// Respect reduced-motion accessibility preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.cinematic-reveal').forEach(el => {
    el.classList.add('cinematic-visible')
  })
}

// MANNVASAM cinematic website experience
import('./cinematic.js');

// MANNVASAM advanced hero product
import('./hero-product.js');

// MANNVASAM cinematic product-to-collection handoff
import('./product-handoff.js');

/* MANNVASAM CINEMATIC SCROLL REVEALS V3 */
(() => {
  if (window.__mvScrollRevealV3) return;
  window.__mvScrollRevealV3 = true;

  const initMannvasamReveals = () => {
    const scenes = document.querySelectorAll('section:not(.hero)');

    if (!('IntersectionObserver' in window)) {
      scenes.forEach(scene => scene.classList.add('mv-scene-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mv-scene-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -55px 0px'
    });

    scenes.forEach(scene => {
      scene.classList.add('mv-scroll-scene');
      observer.observe(scene);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMannvasamReveals, { once: true });
  } else {
    initMannvasamReveals();
  }
})();

// removed: import('./farm-journey.js');
const worldEntryButton = document.querySelector('[data-mv-world-entry]');

worldEntryButton?.addEventListener('click', async (event) => {
  event.preventDefault();
  const { openWorld } = await import('./world/world.js');
  openWorld();
});
