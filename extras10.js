import "./extras10.css";
document.addEventListener("click", (e) => {
  const b = e.target.closest(".mv-add-button");
  if (!b || b.dataset.busy) return;
  b.dataset.busy = "1";
  const label = b.textContent;
  b.textContent = "ADDED ✓";
  b.classList.add("done");
  setTimeout(() => {
    b.textContent = label;
    b.classList.remove("done");
    delete b.dataset.busy;
  }, 1400);
});
