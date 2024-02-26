const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
const sectionContainer = document.querySelector('.section-container');
const recipesContainer = document.querySelector('.recipes-container');
const recipeDetails = document.querySelector('.recipe-details');
const closeBtn = document.querySelector('.close-btn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');


// FETCH RECIPE API
const fetchRecipes = async (query) => {
    recipesContainer.innerHTML = `searching...`
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipesContainer.innerHTML = ``;
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement(`div`)
        recipeDiv.classList.add(`recipe`);
        recipeDiv.innerHTML = `
            <img src='${meal.strMealThumb}' alternate='food image'>
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> ${meal.strCategory}</p>
            `;
        const recipeButton = document.createElement(`button`);
        recipeButton.textContent = `view recipe`;
        recipeDiv.appendChild(recipeButton);
        recipeButton.addEventListener(`click`, () => {
            openRecipeDetails(meal)
        })
        recipesContainer.appendChild(recipeDiv)
    });
    } catch (error) {
        recipesContainer.innerHTML = `<h1>Recipe not found.</h1>`
    }

    


}
// functionality for recipe details display
const openRecipeDetails = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredient : </h3>
    <ul>${fetchIngredients(meal)}</ul>
    <div>
    <h3>Instruction : </h3>
    <p class= "mealInstructions">${meal.strInstructions}</P>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block"
}  
//   FETCH 
const fetchIngredients = (meal) => {
    let IngredientList = "";
    
    for (let i = 1; i <= 20; i++) {
        const ingredients = meal[`strIngredient${[i]}`];
        if(ingredients){
            const measure = meal[`strMeasure${[i]}`];
            IngredientList += `<li> ${measure} ${ingredients} </li>`
            console.log(meal);
        } else{
            break;
        }
    }
    return IngredientList
} 
// onclick event 
closeBtn.addEventListener(`click`, ()=>{
    recipeDetails.style.display = "none"
})
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const searchInput = searchBar.value.trim();
    if (!searchInput) {
        recipesContainer.innerHTML = `<h1>Type the meal in the search box.</h1>`
    }
    fetchRecipes(searchInput);
})