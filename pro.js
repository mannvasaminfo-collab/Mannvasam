const PRODUCTS = [
  // Add more rice here. Fields: name, img (file in public/images), note, tag, price (optional)
  { name: "Shiva Samba Rice", img: "/images/mannvasam-shivan-samba-hero.png", note: "Traditional rice, from our soil to your soul.", tag: "Featured" },
];

const logo = "/images/mannvasam-logo-transparent.png";

const card = (p, i) => `
  <article class="card reveal" style="transition-delay:${i * 90}ms">
    <div class="card-art">${p.tag ? `<span class="badge">${p.tag}</span>` : ""}<img src="${p.img}" alt="${p.name}" /></div>
    <h3>${p.name}</h3>
    <p>${p.note}</p>
    <div class="row">${p.price ? `<span class="price">₹${p.price}</span>` : "<span></span>"}<a class="btn dark" href="#story">${p.price ? "Add to cart" : "Enquire"}</a></div>
  </article>`;

document.getElementById("app").innerHTML = `
<header class="nav" id="nav">
  <a class="brand" href="#top"><img src="${logo}" alt="" /><span>MANNVASAM</span></a>
  <nav><a href="#featured-product">Our rice</a><a href="#farming">Natural farming</a><a href="#story">Our story</a></nav>
  <a class="btn" href="#featured-product">Shop rice</a>
</header>

<main>
  <section class="hero" id="top">
    <div class="wrap hero-grid">
      <div class="reveal in">
        <h1>From our soil to <i>your soul.</i></h1>
        <p>Traditional rice, millets, spices and natural foods, sourced with care from the people who grow them.</p>
        <div class="hero-cta"><a class="btn" href="#featured-product">Explore our rice</a><a class="btn ghost" href="#farming">Our natural farming</a></div>
      </div>
      <div class="stage" id="stage" aria-label="MANNVASAM traditional rice packet">
        <div class="orbit o2"></div><div class="orbit o1"></div><div class="glow"></div><div class="shadow"></div>
        <div class="packet" id="packet"><img src="${PRODUCTS[0].img}" alt="MANNVASAM ${PRODUCTS[0].name} packet" /></div>
        <span class="caption">A TASTE OF OUR ROOTS</span>
      </div>
    </div>
    <div class="scroll-note">SCROLL TO DISCOVER ↓</div>
    <svg class="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C260 80 520 0 800 38 S1240 70 1440 24 V70 H0Z" fill="#f6efdc"/></svg>
  </section>

  <section class="section" id="featured-product">
    <div class="wrap">
      <h2 class="reveal">Our traditional rice</h2>
      <p class="lead reveal">Rice that carries the taste of the soil it grew in.</p>
      <div class="rice-grid">${PRODUCTS.map(card).join("")}</div>
    </div>
  </section>

  <section class="section farm" id="farming">
    <div class="wrap">
      <div class="farm-head">
        <h2 class="reveal">Natural farming, honestly sourced</h2>
        <p class="lead reveal">Good food begins long before it reaches your kitchen. It begins with the soil, the farmer, traditional knowledge and the care taken at every stage of the journey.</p>
      </div>
      <div class="source reveal"><span>👨‍🌾</span><div><h3>Farm &amp; Source</h3><p>We understand where the produce begins and the people behind it.</p></div></div>
      <div class="trust">
        <article class="tcard reveal">
          <h3>Organic pathway</h3>
          <p>Selected products may come through recognised organic certification pathways supported by applicable documentation, standards and traceability processes.</p>
          <ul><li>Recognised organic standards</li></ul>
        </article>
        <article class="tcard dark reveal" style="transition-delay:100ms">
          <h3>MANNVASAM Natural Farming Produce</h3>
          <p>Some traditional farmers follow responsible natural cultivation practices but may not have access to formal certification. For selected products, we build confidence through sourcing review and direct relationships.</p>
          <ul><li>Farmer and source understanding</li><li>Farm visits where applicable</li></ul>
        </article>
      </div>
    </div>
  </section>

  <section class="section soul" id="story">
    <div class="wrap reveal">
      <h2>From our soil<br>to <i>your soul.</i></h2>
      <p>Good food begins long before it reaches your kitchen. It begins with the soil, the farmer, traditional knowledge and the care taken at every stage of the journey.</p>
      <a class="btn" href="#featured-product">Shop our rice</a>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="wrap">
    <a class="brand" href="#top"><img src="${logo}" alt="MANNVASAM" /><span>MANNVASAM<small>FROM OUR SOIL TO YOUR SOUL</small></span></a>
    <span>Traditional rice, millets, spices and natural foods.</span>
  </div>
</footer>`;

/* nav turns solid on scroll */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("solid", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* packet follows the mouse slightly */
const stage = document.getElementById("stage");
const packet = document.getElementById("packet");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  stage.addEventListener("mousemove", (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    packet.style.setProperty("--mx", `${x * 26}px`);
    packet.style.setProperty("--my", `${y * 18}px`);
  });
  stage.addEventListener("mouseleave", () => { packet.style.setProperty("--mx", "0px"); packet.style.setProperty("--my", "0px"); });
}

/* reveal on scroll */
const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
import("./extras.js");
import("./extras2.js");
import("./extras3.js");
import("./extras4.js");
import("./extras5.js");
import("./extras6.js");
import("./extras7.js");
import("./extras8.js");
import("./extras9.js");
import("./extras10.js");
import("./extras11.js");
import("./extras12.js");
