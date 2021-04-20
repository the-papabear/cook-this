const ingredientSearch = document.getElementById('ingredient-submit');
const ingredientSearchBar = document.getElementById('ingredients');
const listedIngredients = document.querySelector('.selected-ingredients');

const selectedIngredientsArr = [];

let clickAdd = ingredientSearch.addEventListener('click', function(e){
    e.preventDefault();
    console.log('Button clicked.');
    let ingredientValue = ingredientSearchBar.value;
    selectedIngredientsArr.push(ingredientValue);
    
    listedIngredients.insertAdjacentHTML('beforeend', `<i> ${ingredientValue} </i>`)
});

async function recipeAPI(url){
        await fetch(url).then((response) => response.json()).then((data) => renderRecipe(data));
}

function renderRecipe(data){
    let img = document.getElementById('recipe-photo').src = data.hits[0].recipe.image;
}

recipeAPI(`https://api.edamam.com/search?q=chicken&app_id=509fe698&app_key=fef25a374d1aad8e5497a7bc0aa92450`);