const ingredientSearchBar = document.getElementById('ingredients');
const ingredientList = document.querySelector('.ingredient-list');
const listedIngredients = document.querySelector('.selected-ingredients');
const removeIngredient = document.getElementById('remove-ingredient');
const randomRecipe = document.querySelector('.random-recipe-generator');
const recipeList = document.querySelector('.recipe-list');
const recipeListRender = document.querySelector('.recipe-list');
const tutorialSource = document.querySelector('.tutorial__source');
const selectedIngredientsArr = [];
let ingredientDivs;
let ingredientRemoveBtn;
let ingredientValue;
let recipeNumber;
let recipeListArray;
let numValue = 0;


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

//Show ingredients on the app upon clicking on the 'add' button:
document.addEventListener('click', function (e) {
  if (!e.target.matches('#ingredient-submit')) return;
  renderIngredient(ingredientValue);
});

//Show ingredients on the app upon pressing enter:
document.addEventListener('keyup', (e) => {
  const name = e.key;
  if(name === 'Enter') renderIngredient(ingredientValue);
}, false);


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

function renderIngredient(ingredientValue){
  if(ingredientSearchBar.value === '') return;

  ingredientValue = ingredientSearchBar.value;
  selectedIngredientsArr.push(ingredientValue);
  ingredientSearchBar.value = '';

  listedIngredients.insertAdjacentHTML(
    'beforeend',
    `<div class="ingredients-wrapper">
    <span class="added-ingredient" id="ingredient${numValue}">${ingredientValue}</span>
    <input
                type="image"
                src="img/close-circle-outline.svg"
                width="20px"
                height="20px"
                class = "remove-ingredient"
            /> 
    </div>`
  );

  numValue++;
}

//Removes the desired ingredient from the ingredients list(still figuring this one out):

/*What needs to happen for an element to be removed when clicking on the x button?
1. User needs to press an x button *done*
2. App must identify which x button was pressed from the total list of x buttons
3. App looks if the ingredient that corresponds to the x button is in the array that helps with the data request
4. If app founds the ingredient, it removes it from the array 
5. App removes the visual element that showed the ingredient in the app
6. Array and element list get updated with the remaining data */


  document.addEventListener('click', function(e){
    if(!e.target.matches('.remove-ingredient')) return;

    // console.log(ingredientRemoveBtn);
    // console.log(ingredientDivs);
    ingredientDivs = document.querySelectorAll('.ingredients-wrapper');
    ingredientRemoveBtn = document.querySelectorAll('.remove-ingredient');
    
    ingredientRemoveBtn.forEach((button, i) => {
        button.addEventListener('click', ()=>{
          console.log(`Button number ${i + 1} pressed`);
          button[i].remove();
        })
    });
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
