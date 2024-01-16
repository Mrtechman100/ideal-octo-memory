//Get the add recipe button and form
const addRecipeButton = document.getElementById("add-recipe-button");
const addRecipeForm = document.getElementById("add-recipe-form");

//When add recipe button is clicked, display the form
addRecipeButton.addEventListener("click", () => {
    addRecipeForm.style.display = "block";
});

//When the form is submitted, send the data to the server   
addRecipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const recipeName = document.getElementById("recipe-name").value;
    const recipeImage = document.getElementById("recipe-image").value;
    const recipeIngredients = document.getElementById("recipe-ingredients").value;
    const recipeDirections = document.getElementById("recipe-directions").value;

    fetch('/add-recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recipeName: recipeName,
            recipeImage: recipeImage,
            recipeIngredients: recipeIngredients,
            recipeDirections: recipeDirections,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            location.reload();
        })
});