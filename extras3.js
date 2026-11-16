import { WHATSAPP } from "./extras.js";
import "./extras2.js";
import "./extras3.css";

// Fill these in. Anything left empty is simply not shown on the site.
const CONTACT = { phone: "+91 75488 83966", email: "", address: "" };

const $ = (s) => document.querySelector(s);
const logo = "/images/mannvasam-logo-transparent.png";

/* ribbon under the hero */
const words = ["Traditional rice", "Millets", "Spices", "Natural foods", "From our soil to your soul"];
const track = [...words, ...words].map((w) => `<span>${w}</span>`).join("");
$("#featured-product").insertAdjacentHTML("beforebegin", `<div class="marquee" aria-hidden="true"><div class="mq">${track}${track}</div></div>`);

/* paddy field landscape at the base of the closing section */
$("#story").insertAdjacentHTML("afterbegin", `<svg class="field" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 120 C200 60 420 150 700 100 S1180 60 1440 110 V220 H0Z" fill="#22402b"/>
  <path d="M0 160 C240 110 500 190 780 150 S1220 120 1440 160 V220 H0Z" fill="#2d5237"/>
  <path d="M0 200 C300 170 560 220 860 195 S1250 175 1440 200 V220 H0Z" fill="#111c15"/></svg>`);

/* contact section */
const rows = [["☎", CONTACT.phone], ["✉", CONTACT.email], ["⌖", CONTACT.address]].filter((r) => r[1]);
$("#faq").insertAdjacentHTML("afterend", `
<section class="section contact" id="contact">
  <div class="wrap cgrid">
    <div>
      <h2>Talk to us</h2>
      <p class="lead">Ask about our rice, how it is sourced, or anything else. We would love to hear from you.</p>
      ${rows.length ? `<ul class="cdet">${rows.map((r) => `<li><span>${r[0]}</span>${r[1]}</li>`).join("")}</ul>` : ""}
    </div>
    <form class="panel cform" id="cform">
      <label>Your name<input name="name" required autocomplete="name" /></label>
      <label>Message<textarea name="msg" rows="4" required></textarea></label>
      <button class="btn dark" type="submit">Send message</button>
      <p class="cnote" id="cnote" aria-live="polite"></p>
    </form>
  </div>
</section>`);
$("#cform").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text = `Hi MANNVASAM, I am ${f.get("name")}. ${f.get("msg")}`;
  const note = (t) => ($("#cnote").textContent = t);
  if (WHATSAPP) { window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank"); note("Opening WhatsApp."); }
  else if (CONTACT.email) { location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Enquiry from the website")}&body=${encodeURIComponent(text)}`; }
  else navigator.clipboard.writeText(text).then(() => note("Message copied. Please send it to us."));
});
$(".nav nav").insertAdjacentHTML("beforeend", '<a href="#contact">Contact</a>');

/* full footer */
const links = [["Our rice", "#featured-product"], ["Cook guide", "#cook"], ["Recipes", "#recipes"], ["Natural farming", "#farming"], ["Questions", "#faq"], ["Contact", "#contact"]];
$(".foot .wrap").innerHTML = `
<div class="fgrid">
  <div><a class="brand" href="#top"><img src="${logo}" alt="MANNVASAM" /><span>MANNVASAM<small>FROM OUR SOIL TO YOUR SOUL</small></span></a>
    <p>Traditional rice, millets, spices and natural foods, sourced with care from the people who grow them.</p></div>
  <div><h4>Explore</h4><ul>${links.map((l) => `<li><a href="${l[1]}">${l[0]}</a></li>`).join("")}</ul></div>
  ${rows.length ? `<div><h4>Reach us</h4><ul>${rows.map((r) => `<li>${r[1]}</li>`).join("")}</ul></div>` : ""}
</div>
<div class="fbase">© ${new Date().getFullYear()} MANNVASAM. All rights reserved.</div>`;

/* mobile menu */
const nav = $(".nav");
nav.insertAdjacentHTML("beforeend", '<button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>');
document.body.insertAdjacentHTML("beforeend", '<div class="mmenu" id="mmenu"></div>');
$("#mmenu").innerHTML = [...document.querySelectorAll(".nav nav a")].map((a) => `<a href="${a.getAttribute("href")}">${a.textContent}</a>`).join("");
const toggle = (open) => {
  nav.classList.toggle("open", open);
  $("#mmenu").classList.toggle("open", open);
  $("#burger").setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
};
$("#burger").addEventListener("click", () => toggle(!nav.classList.contains("open")));
$("#mmenu").addEventListener("click", (e) => e.target.closest("a") && toggle(false));
