window.addEventListener("click", (e) => {
  if (e.target.closest("select, .mv-add-button, .mv-pack-select")) return;
  const h = e.target.closest(".mv-shop-image, .mv-shop-card h3"), c = h && h.closest(".mv-shop-card");
  if (c && c.dataset.soon !== "1") { e.preventDefault(); location.href = "/product.html"; }
}, true);
