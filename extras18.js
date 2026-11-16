import "./extras18.css";
const mark = () => document.querySelectorAll(".intro h2, .home-values h2, .trust-section h2, .journey-section h2, .responsible-section h2").forEach((h) => {
  if (getComputedStyle(h).textAlign === "center") h.classList.add("rule-c");
});
mark();
setTimeout(mark, 800);
