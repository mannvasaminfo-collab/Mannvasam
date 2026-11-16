import "./extras13.css";
const bar = document.createElement("div");
bar.className = "progress";
document.body.appendChild(bar);
const head = document.querySelector("header");
const update = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  if (head) head.classList.toggle("scrolled", scrollY > 30);
};
addEventListener("scroll", update, { passive: true });
update();
