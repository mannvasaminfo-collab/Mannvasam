import "./extras9.css";
import { WHATSAPP } from "./extras.js";
const PHONE = "917548883966";
const bar = document.createElement("div");
bar.className = "obar";
const msg = encodeURIComponent("Hi MANNVASAM, I would like to order rice.");
const wa = WHATSAPP ? `<a class="o-wa" href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank" rel="noopener">Order on WhatsApp</a>` : `<a class="o-wa" href="#featured-product">Shop now</a>`;
bar.innerHTML = wa + `<a class="o-call" href="tel:+${PHONE}">Call</a>`;
document.body.appendChild(bar);
