const $ = (s) => document.querySelector(s);

/* ---------- recipes ---------- */
const RECIPES = [
  { id: "curd", name: "Curd rice", time: "15 min", serves: "2",
    ing: ["1 cup cooked rice, cooled and lightly mashed", "1 cup fresh curd", "¼ cup milk", "Salt to taste", "1 tsp oil or ghee", "½ tsp mustard seeds", "1 tsp urad dal", "A few curry leaves", "1 green chilli, chopped", "½ tsp grated ginger"],
    steps: ["Mix the rice with the curd, milk and salt until creamy.", "Heat the oil and add the mustard seeds, urad dal, curry leaves, chilli and ginger.", "Pour the tempering over the rice, mix, and rest for 10 minutes before serving."] },
  { id: "lemon", name: "Lemon rice", time: "15 min", serves: "2",
    ing: ["1 cup cooked rice, cooled", "1 tbsp lemon juice", "¼ tsp turmeric", "Salt to taste", "1 tbsp oil", "½ tsp mustard seeds", "1 tbsp peanuts", "1 tsp chana dal", "A few curry leaves", "1 green chilli, slit"],
    steps: ["Heat the oil and add the mustard seeds, peanuts and chana dal until golden.", "Add the curry leaves, chilli and turmeric, then switch off the heat.", "Add the rice, salt and lemon juice, and mix gently so the grains stay whole."] },
  { id: "pongal", name: "Ven pongal", time: "30 min", serves: "2",
    ing: ["½ cup rice", "¼ cup split moong dal", "4 cups water", "Salt to taste", "1 tbsp ghee", "1 tsp pepper, lightly crushed", "1 tsp cumin seeds", "1 tsp chopped ginger", "A few curry leaves", "A few cashews"],
    steps: ["Lightly roast the moong dal, then wash it with the rice.", "Cook with the water and salt until very soft, then mash lightly.", "Fry the pepper, cumin, ginger, curry leaves and cashews in ghee, and stir it in."] },
];
const rc = (r) => `<article class="rcard reveal in">
  <div><h3>${r.name}</h3><div class="rmeta"><span>${r.time}</span><span>Serves ${r.serves}</span></div></div>
  <div><h4>You will need</h4><ul>${r.ing.map((i) => `<li>${i}</li>`).join("")}</ul><h4>Method</h4><ol>${r.steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>
</article>`;

$("#farming").insertAdjacentHTML("beforebegin", `
<section class="section recipes" id="recipes">
  <div class="wrap">
    <h2>Simple ways to enjoy your rice</h2>
    <p class="lead">Three easy dishes to start with.</p>
    <div class="tabs" id="tabs">${RECIPES.map((r, i) => `<button type="button" data-i="${i}" class="${i ? "" : "on"}">${r.name}</button>`).join("")}</div>
    <div id="rbox">${rc(RECIPES[0])}</div>
  </div>
</section>`);
$("#tabs").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#tabs button").forEach((x) => x.classList.toggle("on", x === b));
  $("#rbox").innerHTML = rc(RECIPES[+b.dataset.i]);
});
document.querySelector(".nav nav").insertAdjacentHTML("beforeend", '<a href="#recipes">Recipes</a>');

/* ---------- questions ---------- */
const FAQ = [
  ["How should I store rice?", "Keep it in a clean, dry, airtight container in a cool place, away from moisture and direct sunlight."],
  ["Do I need to soak traditional rice?", "Soaking for about 30 minutes can help it cook evenly and turn out softer. Check the pack, or ask us about your variety."],
  ["Is your rice organic?", "Selected products may come through recognised organic certification pathways supported by applicable documentation, standards and traceability processes. Some traditional farmers follow responsible natural cultivation practices but may not have access to formal certification, and for those products we build confidence through sourcing review and direct relationships. Ask us about any specific product."],
  ["How much rice should I cook?", "Use the cook guide above. Slide to the number of people and choose an appetite and texture."],
  ["How do I order?", "Tap Enquire on any rice to build your list, open it from the button at the bottom left, and send it to us."],
];
$("#story").insertAdjacentHTML("beforebegin", `
<section class="section faq" id="faq">
  <div class="wrap">
    <h2>Questions, answered</h2>
    ${FAQ.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("")}
  </div>
</section>`);
document.querySelector(".nav nav").insertAdjacentHTML("beforeend", '<a href="#faq">FAQ</a>');
