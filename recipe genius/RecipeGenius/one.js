// script.js

// Sample recipe data (replace with your actual data)
const recipes = []; // Remove the hardcoded recipes

const YOUR_APP_ID = '3ec2f19c';
const YOUR_APP_KEY = '261011fecd3285623d16115614580abf';

async function fetchRecipes(searchTerm) {
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
        const data = await response.json();
        return data.hits.map(hit => hit.recipe);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

async function searchRecipes() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const recipeContainer = document.getElementById('recipe-container');
    const navBar = document.getElementById('navBar'); // Add this line

    // Check if ingredients are entered
    const ingredientsEntered = searchTerm.trim() !== '';

    // Toggle the visibility of the navigation bar based on ingredients
    navBar.style.right = ingredientsEntered ? '-260px' : '0';
    
    recipeContainer.innerHTML = ''; // Clear previous results
    
    // Fetch recipes from Edamam API
    const recipesFromAPI = await fetchRecipes(searchTerm);

    // Display recipe cards with names and links and images
    recipesFromAPI.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        // Create an image element
        const image = document.createElement('img');
        image.src = recipe.image; // Assuming Edamam API provides an image URL
        image.alt = recipe.label;
        card.appendChild(image);

  

        // Create a link to the Edamam recipe page
        const link = document.createElement('a');
        link.textContent = recipe.label;
        link.href = recipe.url;
        link.target = "_blank"; // Open the link in a new tab

        // Append the link to the card
        card.appendChild(link);

        recipeContainer.appendChild(card);
    });
}

// Toggle navigation bar
const navBar = document.getElementById('navBar');
const navIcon = document.getElementById('navIcon');

navIcon.addEventListener('click', () => {
    if (navBar.style.right === '0px' || navBar.style.right === '') {
        navBar.style.right = '-260px';
    } else {
        navBar.style.right = '0px';
    }
});
