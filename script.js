const ingredientSearch = document.getElementById('ingredient-submit');
const ingredientSearchBar = document.getElementById('ingredients');
const listedIngredients = document.querySelector('.selected-ingredients');

const selectedIngredientsArr = [];

console.log(selectedIngredientsArr);

//Add user ingredients input to empty array
ingredientSearch.addEventListener('click', function(e){
    e.preventDefault();
    let ingredientValue = ingredientSearchBar.value;
    console.log(typeof(ingredientValue));

    selectedIngredientsArr.push(ingredientValue);
    console.log(selectedIngredientsArr);

    
    listedIngredients.insertAdjacentHTML('beforeend', `<i> ${ingredientValue} </i>`)
});

fetch('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3');