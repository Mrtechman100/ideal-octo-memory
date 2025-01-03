
// Load the saved recipes from local storage
document.addEventListener('DOMContentLoaded', function() {
    let allRecipes = [];
    let editIndex = null;

    loadRecipes();
    document.getElementById('search-bar').addEventListener('input', filterRecipes);
    document.getElementById('add-recipe-button').addEventListener('click', function() {
        const addRecipeDiv = document.getElementById('add-recipe');
        addRecipeDiv.classList.toggle('show');
    });

    document.getElementById('cancel-button').addEventListener('click', function() {
        resetForm();
    });

    // Form submission event listener
    document.getElementById('recipe-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const ingredients = document.getElementById('ingredients').value;
        const instructions = document.getElementById('instructions').value;
        const tag = document.getElementById('tags').value;
        const imageFile = document.getElementById('image').files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;
                const recipe = { title, ingredients, instructions, imageData, tag };
                saveRecipe(recipe);
                addRecipeCard(recipe);
                if  (editIndex !== null){
                    updatedRecipe(recipe, editIndex);
                } else {
                    saveRecipe(recipe);
                    allRecipes.push(recipe);
                    addRecipeCard(recipe);
                }
                resetForm();
            }

            reader.readAsDataURL(imageFile);
        } else {
            const recipe = { title, ingredients, instructions, tag };
            saveRecipe(recipe);
            addRecipeCard(recipe);
        }
        resetForm();

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
        const { title, ingredients, instructions, image, tag } = recipe;

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = title;
        recipeCard.appendChild(recipeTitle);

        const recipeTags = document.createElement('div');
        recipeTags.classList.add('recipe-tag');
        recipeTags.innerHTML = `${tag}`;
        recipeCard.appendChild(recipeTags);

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
            document.getElementById('tags').value = tag;
            document.getElementById('add-recipe').style.display = 'block';
            editIndex = allRecipes.indexOf(recipe);
            recipeCard.remove();
            deleteRecipe(recipe);
        });
        recipeCard.appendChild(editButton);

        document.getElementById('recipe-cards').appendChild(recipeCard);
    }

    // Updates the recipe in the "allRecipes" array and localStorage
    // then adds the updated recipe card
    function updatedRecipe(updatedRecipe, index){
        allRecipes[index] = updatedRecipe;
        localStorage.setItem('recipes', JSON.stringify(allRecipes));
        addRecipeCard(updatedRecipe);
        editIndex = null;
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
            const tag = card.querySelector('.recipe-tag').textContent.toLowerCase();
            if (title.includes(query)|| tag.includes(query) ){
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Clears the form and hides it after submission
    function resetForm() {
        document.getElementById('recipe-form').reset();
        document.getElementById('add-recipe').classList.remove('show');
        editIndex = null;
    }

});