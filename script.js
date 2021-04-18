const ingredientSearch = document.getElementById('ingredient-submit');
const ingredientSearchBar = document.getElementById('ingredients');
const listedIngredients = document.querySelector('.selected-ingredients');

const selectedIngredientsArr = [];

console.log(selectedIngredientsArr);

//Add user ingredients input to empty array
ingredientSearch.addEventListener('click', function(e){
    e.preventDefault();
    let ingredientValue = ingredientSearchBar.value;
    selectedIngredientsArr.push(ingredientValue);
    console.log(selectedIngredientsArr);

    listedIngredients.insertAdjacentHTML('beforeend', `<i> ${selectedIngredientsArr[0]} </i>`)
});