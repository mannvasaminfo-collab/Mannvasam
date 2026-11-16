import { useEffect, useRef, useState } from "react";
import "./App.css";

const BRAND = "Mannvasam"; // change to your brand name

const PRODUCTS = [
  { id: 1, name: "Beetroot Powder", price: 249, color: "#8c1d3f", note: "Earthy, sweet, deep red", tag: "Best seller" },
  { id: 2, name: "Moringa Powder", price: 199, color: "#4f8a3a", note: "Leafy green, stone-ground", tag: "" },
  { id: 3, name: "Curry Leaf Powder", price: 149, color: "#2f6b3c", note: "Aromatic, sun-dried", tag: "New" },
];

const STEPS = [
  { title: "Open the pouch", text: "Sun-dried and stone-ground, sealed fresh with nothing added." },
  { title: "Add a spoonful", text: "One teaspoon is enough for a glass. Start small and adjust." },
  { title: "Stir it in", text: "Mix with water, juice or buttermilk until the colour is even." },
  { title: "Enjoy the glass", text: "Drink it fresh, any time of day." },
];

const CATEGORIES = ["Root powders", "Leaf powders", "Spice blends", "Gift boxes"];

const EVENTS = [
  { kind: "Award", title: "Sustainable Farming Award", text: "Recognised for working directly with small farms." },
  { kind: "Expo", title: "Natural Foods Expo", text: "Come taste the range and meet the team." },
];

function Pouch({ name, color, small }) {
  return (
    <div className={`pouch ${small ? "small" : ""}`} style={{ "--c": color }}>
      <div className="seal" />
      <div className="label">
        <span className="brand">{BRAND}</span>
        <span className="dot" />
        <span className="pname">{name}</span>
      </div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Steps() {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));

  return (
    <section className="steps" id="how" ref={ref} aria-labelledby="how-title">
      <div className="steps-stick">
        <h2 id="how-title">From pouch to glass in 4 easy steps</h2>
        <div className="steps-stage">
          <ol className="step-list">
            {STEPS.map((s, i) => (
              <li key={s.title} className={i === active ? "on" : ""} aria-current={i === active}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="stage-visual" aria-hidden="true">
            <div className="stage-pouch" style={{ transform: `rotate(${-8 + p * 40}deg) translateY(${p * 30}px)` }}>
              <Pouch name="Moringa Powder" color="#4f8a3a" />
            </div>
            <div className="glass">
              <div className="liquid" style={{ height: `${10 + p * 75}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState([]);
  const [added, setAdded] = useState(null);
  useReveal();

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const add = (p) => {
    setCart((c) => [...c, p]);
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1600);
  };
  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <div className={`splash ${ready ? "gone" : ""}`} aria-hidden={ready}>
        <div className="splash-mark">
          <svg viewBox="0 0 64 64" width="64" height="64"><path d="M32 6c10 10 16 20 8 30-3 4-8 6-8 6s-5-2-8-6C16 26 22 16 32 6z" fill="#1f5a34" /><path d="M8 40c10-2 18 2 24 14C20 56 10 52 8 40zM56 40c-10-2-18 2-24 14 12 2 22-2 24-14z" fill="#f6b73c" /></svg>
          <span>{BRAND}</span>
        </div>
      </div>

      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <a className="logo" href="#top">{BRAND}</a>
        <nav aria-label="Primary">
          <a href="#featured-product">Products</a>
          <a href="#how">How it works</a>
          <a href="#events">Events</a>
          <a href="#visit">Visit</a>
        </nav>
        <span className="cart" aria-live="polite">Cart {cart.length} · ₹{total}</span>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>Earth-grown colour, naturally bold.</h1>
            <p>Plant powders made from sun-dried roots and leaves. Nothing added, nothing hidden.</p>
            <a className="btn" href="#featured-product">Shop now</a>
          </div>
          <div className="hero-pouches" aria-hidden="true">
            <div className="hp hp1"><Pouch name="Beetroot Powder" color="#8c1d3f" /></div>
            <div className="hp hp2"><Pouch name="Moringa Powder" color="#4f8a3a" small /></div>
            <div className="hp hp3"><Pouch name="Curry Leaf Powder" color="#2f6b3c" small /></div>
          </div>
        </section>

        <Steps />

        <section className="cats" aria-labelledby="cats-title">
          <h2 id="cats-title" className="reveal">Our top categories</h2>
          <div className="cat-row">
            {CATEGORIES.map((c, i) => (
              <a href="#featured-product" className="cat reveal" style={{ transitionDelay: `${i * 70}ms` }} key={c}>{c}</a>
            ))}
          </div>
        </section>

        <section className="products" id="featured-product" aria-labelledby="prod-title">
          <h2 id="prod-title" className="reveal">Featured products</h2>
          <div className="grid">
            {PRODUCTS.map((p, i) => (
              <article className="card reveal" style={{ transitionDelay: `${i * 90}ms` }} key={p.id}>
                {p.tag && <span className="tag">{p.tag}</span>}
                <div className="card-art"><Pouch name={p.name} color={p.color} small /></div>
                <h3>{p.name}</h3>
                <p className="note">{p.note}</p>
                <div className="row">
                  <span className="price">₹{p.price}</span>
                  <button className="btn small" onClick={() => add(p)}>{added === p.id ? "Added" : "Add to cart"}</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="events" id="events" aria-labelledby="ev-title">
          <div className="sun" aria-hidden="true" />
          <h2 id="ev-title">Where you can find us</h2>
          <div className="ev-grid">
            {EVENTS.map((e) => (
              <article className="ev reveal" key={e.title}>
                <span className="ev-kind">{e.kind}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="visit" id="visit" aria-labelledby="visit-title">
          <div className="visit-copy reveal">
            <h2 id="visit-title">Grown in sunshine, dried by it too</h2>
            <p>Our powders are dried in open sunlight on the farm, then packed within days. Visit the store to taste before you buy.</p>
            <ul>
              <li><strong>Open</strong> Mon to Sat, 9 am to 7 pm</li>
              <li><strong>Phone</strong> +91 00000 00000</li>
              <li><strong>Address</strong> Add your store address here</li>
            </ul>
          </div>
          <div className="map reveal" role="img" aria-label="Map placeholder showing store location">
            <span className="pin" />
            <a className="btn small" href="https://www.google.com/maps" target="_blank" rel="noreferrer">Get directions</a>
          </div>
        </section>
      </main>

      <footer>
        <p>{BRAND}. Plant powders, sun-dried.</p>
        <p>hello@example.com</p>
      </footer>
    </>
  );
}
