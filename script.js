const ingredientSearchBar = document.getElementById("ingredients");
const listedIngredients = document.querySelector(".selected-ingredients");
const selectedIngredientsArr = [];

//Display ingredients input on the page:
//   document.addEventListener("click", function (e) {
//     e.preventDefault();
//     if (!e.target.matches("#ingredient-submit")) return;

//     console.log("Button clicked.");
//     let ingredientValue = ingredientSearchBar.value;
//     selectedIngredientsArr.push(ingredientValue);

//     listedIngredients.insertAdjacentHTML(
//       "beforeend",
//       `<i> ${ingredientValue} </i>`
//     );

//     async function recipeAPI(ingredients) {
//       await fetch(
//         `https://api.edamam.com/search?q=${ingredients}&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450 `
//       )
//         .then((response) => response.json())
//         .then((data) => renderRecipe(data));
//     }
//   });
// };

document.addEventListener("click", function (e) {
  if (!e.target.matches("#ingredient-submit")) return;

  let ingredientValue = ingredientSearchBar.value;
  selectedIngredientsArr.push(ingredientValue);

  listedIngredients.insertAdjacentHTML(
    "beforeend",
    `<i> ${ingredientValue} </i>`
  );

  fetch(
    `https://api.edamam.com/search?q=${ingredientValue}&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450 `
  )
    .then((response) => response.json())
    .then((data) => renderRecipe(data));
});

//Fetch data from url and render the data on the page
// async function recipeAPI(ingredients) {
//   await fetch(
//     `https://api.edamam.com/search?q=${ingredients}&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450 `
//   )
//     .then((response) => response.json())
//     .then((data) => renderRecipe(data));
// }

function renderRecipe(data) {
  let ingredients = (document.querySelector(
    ".recipe__ingredients"
  ).textContent = data.hits[0].recipe.ingredientLines);
  console.log(ingredients);
}
