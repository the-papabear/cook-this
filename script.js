const ingredientSearchBar = document.getElementById('ingredients');
const ingredientList = document.querySelector('.ingredient-list');
const listedIngredients = document.querySelector('.selected-ingredients');
const randomRecipe = document.querySelector('.random-recipe-generator');
const recipeListRender = document.querySelector('.recipe-list');
const recipeList = document.querySelector('.recipe-list');
const tutorialSource = document.querySelector('.tutorial__source');
const selectedIngredientsArr = [];
let ingredientValue;
let recipeNumber;
let recipeListArray;



//Fetch Data from the API:
function getDataRandom() {
  fetch(
    `https://api.edamam.com/search?q=${selectedIngredientsArr}&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450&to=100`
  )
    .then(response => response.json())
    .then(data => renderRecipe(data));
}

function getData() {
  fetch(
    `https://api.edamam.com/search?q=${selectedIngredientsArr}&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450&to=12`
  )
    .then(response => response.json())
    .then(data => renderRecipeList(data));
}

//Show ingredients on the website on button click:
document.addEventListener('click', function (e) {
  if (!e.target.matches('#ingredient-submit')) return;
  ingredientValue = ingredientSearchBar.value;
  selectedIngredientsArr.push(ingredientValue);

  listedIngredients.insertAdjacentHTML(
    'beforeend',
    `<div class="selected-ingredients-wrapper">
    <span class="added-ingredient">${ingredientValue}</span>
    <input
                type="image"
                src="img/close-circle-outline.svg"
                width="20px"
                height="20px"
                id="remove-ingredient"
            /> 
    </div>`
  );
});

//Gives a random recipe:
document.addEventListener('click', function (e) {
  if (!e.target.matches('#recipe-random')) return;

  randomRecipe.classList.remove('hidden');
  recipeList.classList.add('hidden');
  recipeListArray = [];
  recipeListRender.innerHTML = '';
  getDataRandom();
});

//Gives a list of the first 10 recipes:
document.addEventListener('click', function (e) {
  if (!e.target.matches('#recipe-list')) return;

  recipeList.classList.remove('hidden');
  randomRecipe.classList.add('hidden');
  getData();
});

function renderRecipe(data) {
  let recipes = data.hits[getRandom(0, 100)].recipe;
  let ingredients = [...recipes.ingredientLines];
  document.querySelector('.recipe__title').textContent = recipes.label;
  document.getElementById('recipe-photo').src = recipes.image;
  document.querySelector('.tutorial__source').href = recipes.url;
  tutorialSource.classList.remove('hidden');

  ingredients.forEach((_, i) => {
    ingredientList.insertAdjacentHTML(
      'beforeend',
      `<li class="ingredient">${ingredients[i]}</li>`
    );
  });
}

function renderRecipeList(data) {
  recipeListArray = [...data.hits];
  recipeListArray.forEach((_, i) =>
    recipeListRender.insertAdjacentHTML(
      'afterbegin',
      `<div class="card">
      <img src="${recipeListArray[i].recipe.image}">
      <div class="container">
        <h4>${recipeListArray[i].recipe.label}</h4>
        <a href="${recipeListArray[i].recipe.url}" target="_blank"><h5>Learn how to cook this</h5></a>
      </div>
    </div>`
    )
  );
}

const getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}