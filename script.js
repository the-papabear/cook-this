const ingredientSearchBar = document.getElementById("ingredients");
const listedIngredients = document.querySelector(".selected-ingredients");
const selectedIngredientsArr = [];
let ingredientValue;

document.addEventListener("click", function (e) {
  if (!e.target.matches("#ingredient-submit")) return;

  ingredientValue = ingredientSearchBar.value;
  selectedIngredientsArr.push(ingredientValue);

  listedIngredients.insertAdjacentHTML(
    "beforeend",
    `<i> ${ingredientValue} </i>`
  );
});

document.addEventListener("click", function (e) {
  if (!e.target.matches("#recipe-search")) return;

  fetch(
    `https://api.edamam.com/search?q=${ingredientValue}&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450&to=30`
  )
    .then((response) => response.json())
    .then((data) => renderRecipe(data));
});

function renderRecipe(data) {
  let ingredients = (document.querySelector(
    ".recipe__ingredients"
  ).textContent = data.hits[getRandom(0, 30)].recipe.label);
  console.log(ingredients);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
