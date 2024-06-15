// two.js

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.querySelector(".search-button");
    const recipeContainer = document.querySelector(".recipe-container");

    searchButton.addEventListener("click", function () {
        const ingredients = searchBar.value;

        if (!ingredients) {
            alert("Please enter ingredients.");
            return;
        }

        // Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your actual Edamam API credentials
        const appId = 'b97b6377';
        const appKey = '97dbad930d59f3b057ebb5f4622e6895';
        const quantity = 1; // You can adjust the quantity as needed

        const endpoint = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${quantity}%20${ingredients}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                // Display the nutritional information
                displayNutritionalInfo(data);

                // Create and append a recipe card
                const recipeCard = createRecipeCard(data, ingredients);
                recipeContainer.innerHTML = ''; // Clear previous results
                recipeContainer.appendChild(recipeCard);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error fetching data. Please try again.');
            });
    });

    

    function displayNutritionalInfo(data) {
        // Display nutritional information as needed
        // You can customize this part based on your design
        console.log('Nutritional Information:', data);
    }

    function createRecipeCard(data, ingredients) {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        const title = document.createElement("h3");
        title.textContent = `Nutritional content in ${ingredients}`;

        const nutrients = data.totalNutrients;
        const infoHTML = `
            <p><b>Calories:</b> ${nutrients.ENERC_KCAL ? nutrients.ENERC_KCAL.label + ' ' + nutrients.ENERC_KCAL.quantity + ' ' + nutrients.ENERC_KCAL.unit : 'N/A'}</p>
            <p><b>Protein:</b> ${nutrients.PROCNT ? nutrients.PROCNT.label + ' ' + nutrients.PROCNT.quantity + ' ' + nutrients.PROCNT.unit : 'N/A'}</p>
            <p><b>Fat:</b> ${nutrients.FAT ? nutrients.FAT.label + ' ' + nutrients.FAT.quantity + ' ' + nutrients.FAT.unit : 'N/A'}</p>
            <p><b>Carbohydrates:</b> ${nutrients.CHOCDF ? nutrients.CHOCDF.label + ' ' + nutrients.CHOCDF.quantity + ' ' + nutrients.CHOCDF.unit : 'N/A'}</p>
        `;

        card.innerHTML = `${title.outerHTML}${infoHTML}`;
        return card;
    }
});
