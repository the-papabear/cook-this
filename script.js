const ingredientSearchBar = document.getElementById("ingredients");
const listedIngredients = document.querySelector(".selected-ingredients");
const selectedIngredientsArr = [];
let ingredientValue;
let recipeNumber;

//Fetch Data from the API:
function getData(recipeNumber) {
  if (recipeNumber === 30) {
    fetch(
      `https://api.edamam.com/search?q=${selectedIngredientsArr}&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450&to=${recipeNumber}`
    )
      .then((response) => response.json())
      .then((data) => renderRecipe(data));
  } else {
    fetch(
      `https://api.edamam.com/search?q=${selectedIngredientsArr}&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450&to=${recipeNumber}`
    )
      .then((response) => response.json())
      .then((data) => renderRecipeList(data));
  }
}

//Show ingredients on the website on button click:
document.addEventListener("click", function (e) {
  if (!e.target.matches("#ingredient-submit")) return;

  ingredientValue = ingredientSearchBar.value;
  selectedIngredientsArr.push(ingredientValue);

  console.log(selectedIngredientsArr);

  listedIngredients.insertAdjacentHTML(
    "beforeend",
    `<i> ${ingredientValue} </i>`
  );
});

//Gives a random recipe:
document.addEventListener("click", function (e) {
  if (!e.target.matches("#recipe-random")) return;

  getData(30);
});

//Gives a list of 10 recipes with a hyperlink:
document.addEventListener("click", function (e) {
  if (!e.target.matches("#recipe-list")) return;

  getData(10);
});

function renderRecipe(data) {
  let ingredients = data.hits[getRandom()].recipe;
  let ingredientsTest = data;
  console.log(ingredientsTest);

  document.querySelector(".recipe__title").textContent = ingredients.label;

  document.querySelector(".recipe__ingredients").textContent =
    ingredients.ingredientLines;

  document.getElementById("recipe-photo").src = ingredients.image;

  document.querySelector(".tutorial__source").href = ingredients.url;
}

function renderRecipeList(data) {
  let recipeList = data.hits.forEach(function render(recipe) {
    document.querySelector(".tutorial__source").href = recipe.url;
  });
}

function getRandom() {
  return Math.floor(Math.random());
}
