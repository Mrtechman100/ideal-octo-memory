
// Load the saved recipes from local storage
document.addEventListener('DOMContentLoaded', function() {
    loadRecipes();
    document.getElementById('search-bar').addEventListener('input', filterRecipes);
});

// Form submission event listener
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const imageFile = document.getElementById('image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            const recipe = { title, ingredients, instructions, imageData };
            saveRecipe(recipe);
            addRecipeCard(recipe);
        };
        reader.readAsDataURL(imageFile);
    } else {
        const recipe = { title, ingredients, instructions };
        saveRecipe(recipe);
        addRecipeCard(recipe);
    }

    document.getElementById('recipe-form').reset();
});

// Save a recipe to local storage
function saveRecipe(recipe) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Load recipes from local storage
function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.forEach(recipe => addRecipeCard(recipe));
}

// Add a recipe card to the page
function addRecipeCard(recipe) {
    const { title, ingredients, instructions, image } = recipe;

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = title;
    recipeCard.appendChild(recipeTitle);

    if (image) {
        const recipeImage = document.createElement('img');
        recipeImage.src = image;
        recipeImage.alt = title;
        recipeImage.classList.add('recipe-image');
        recipeCard.appendChild(recipeImage);
    }

    const recipeIngredients = document.createElement('div');
    recipeIngredients.innerHTML = '<strong>Ingredients:</strong>';
    const ingredientsList = document.createElement('ul');
    ingredients.split('\n').forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });
    recipeIngredients.appendChild(ingredientsList);
    recipeCard.appendChild(recipeIngredients);

    const recipeInstructions = document.createElement('div');
    recipeInstructions.innerHTML = '<strong>Instructions:</strong>';
    const instructionsList = document.createElement('ol');
    instructions.split('\n').forEach(instruction => {
        const listItem = document.createElement('li');
        listItem.textContent = instruction;
        instructionsList.appendChild(listItem);
    });
    recipeInstructions.appendChild(instructionsList);
    recipeCard.appendChild(recipeInstructions);

    const deleteButton = document.createElement('button');  
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        recipeCard.remove();
        deleteRecipe(recipe);
    });

    recipeCard.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        document.getElementById('title').value = title;
        document.getElementById('ingredients').value = ingredients;
        document.getElementById('instructions').value = instructions;
        recipeCard.remove();
        deleteRecipe(recipe);
    });
    recipeCard.appendChild(editButton);

    document.getElementById('recipe-cards').appendChild(recipeCard);
}

// Delete a recipe from local storage
function deleteRecipe(recipeToDelete) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const updatedRecipes = recipes.filter(recipe => recipe.title !== recipeToDelete.title);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
}

// Filter recipes based on search input
function filterRecipes() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}