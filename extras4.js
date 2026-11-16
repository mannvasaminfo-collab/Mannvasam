import "./extras3.js";
import "./extras4.css";

const $ = (s) => document.querySelector(s);

/* ---------- Tamil / English ---------- */
const TA = {
  "Our rice": "எங்கள் அரிசி", "Cook guide": "சமையல் வழிகாட்டி", "Recipes": "சமையல் குறிப்புகள்",
  "Natural farming": "இயற்கை விவசாயம்", "FAQ": "கேள்விகள்", "Contact": "தொடர்புக்கு",
  "Shop rice": "அரிசி வாங்க", "Explore our rice": "எங்கள் அரிசியைப் பாருங்கள்",
  "Our natural farming": "எங்கள் இயற்கை விவசாயம்", "Our traditional rice": "எங்கள் பாரம்பரிய அரிசி",
  "Shop our rice": "எங்கள் அரிசியை வாங்குங்கள்", "Enquire": "விசாரிக்க", "A TASTE OF OUR ROOTS": "எங்கள் வேர்களின் சுவை",
  "How much rice should you cook?": "எவ்வளவு அரிசி சமைக்க வேண்டும்?",
  "Simple ways to enjoy your rice": "உங்கள் அரிசியை ரசிக்க எளிய வழிகள்",
  "Questions, answered": "கேள்விகளும் பதில்களும்", "Talk to us": "எங்களுடன் பேசுங்கள்", "Send message": "செய்தி அனுப்புங்கள்",
  "People eating": "சாப்பிடுபவர்கள்", "Appetite": "பசி அளவு", "Texture": "பதம்",
  "Light": "குறைவாக", "Regular": "சாதாரணமாக", "Hearty": "நிறைய",
  "Separate grains": "உதிரி உதிரியாக", "Fluffy": "பஞ்சு போல", "Soft": "குழைவாக",
  "cups of rice": "கப் அரிசி", "grams (about)": "கிராம் (சுமார்)", "cups of water": "கப் தண்ணீர்",
  "Share with a friend": "நண்பருக்குப் பகிருங்கள்",
};
const HTML_TA = [
  ["#top h1", "எங்கள் மண்ணிலிருந்து <i>உங்கள் ஆன்மாவுக்கு.</i>"],
  ["#story h2", "எங்கள் மண்ணிலிருந்து<br><i>உங்கள் ஆன்மாவுக்கு.</i>"],
];
const saved = new Map();
const keep = (el) => { if (!saved.has(el)) saved.set(el, el.innerHTML); };

function setLang(lang) {
  document.documentElement.lang = lang;
  $("#lang").textContent = lang === "ta" ? "English" : "தமிழ்";
  document.querySelectorAll("a, button, h1, h2, h3, h4, span, label, summary, p").forEach((el) => {
    if (el.children.length) return;
    const key = el.textContent.trim();
    if (TA[key]) { keep(el); el.textContent = lang === "ta" ? TA[key] : saved.get(el); }
    else if (saved.has(el)) el.innerHTML = lang === "ta" ? el.innerHTML : saved.get(el);
  });
  HTML_TA.forEach(([sel, ta]) => { const el = $(sel); if (el) { keep(el); el.innerHTML = lang === "ta" ? ta : saved.get(el); } });
  try { localStorage.setItem("mv-lang", lang); } catch (e) {}
}
$(".nav nav").insertAdjacentHTML("afterend", '<button class="lang" id="lang" type="button" aria-label="Change language">தமிழ்</button>');
$("#lang").addEventListener("click", () => setLang(document.documentElement.lang === "ta" ? "en" : "ta"));
try { if (localStorage.getItem("mv-lang") === "ta") setLang("ta"); } catch (e) {}

/* ---------- highlight the menu link of the section in view ---------- */
const links = [...document.querySelectorAll(".nav nav a")];
const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
}), { rootMargin: "-45% 0px -50% 0px" });
links.forEach((a) => { const s = $(a.getAttribute("href")); if (s) spy.observe(s); });

/* ---------- share with a friend ---------- */
$(".fbase").insertAdjacentHTML("beforebegin", '<button class="btn share" id="share" type="button">Share with a friend</button>');
$("#share").addEventListener("click", () => {
  const data = { title: "MANNVASAM", text: "From our soil to your soul. Traditional rice and natural foods.", url: location.origin };
  if (navigator.share) navigator.share(data).catch(() => {});
  else window.open(`https://wa.me/?text=${encodeURIComponent(data.text + " " + data.url)}`, "_blank");
});

/* ---------- faster image loading ---------- */
document.querySelectorAll("img").forEach((img) => {
  img.decoding = "async";
  if (!img.closest(".hero") && !img.closest(".nav")) img.loading = "lazy";
});
