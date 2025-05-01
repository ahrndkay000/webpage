document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const recipe = data.find(recipe => recipe.id === recipeId);
            if (recipe) {

                // Update visible page content
                document.getElementById("recipe-title").innerText = recipe.title;
                document.getElementById("recipe-image").src = `images/${recipe.image}`;
                document.getElementById("recipe-name").innerText = recipe.name;
                document.getElementById("recipe-ingredients").innerText = recipe.ingredients;
                document.getElementById("recipe-time").innerText = recipe.time;
                document.getElementById("recipe-energy").innerText = recipe.energy;
                document.getElementById("recipe-cost").innerText = recipe.cost;
                document.getElementById("recipe-type").innerText = recipe.type;
                document.getElementById("recipe-nutrients").innerText = recipe.nutrients;
                document.getElementById("recipe-source").innerText = recipe.source;

                // Create JSON-LD metadata
                const jsonLd = {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "name": recipe.title,
                    "recipeIngredient": recipe.ingredients,
                    "recipeCategory": recipe.type,
                    "nutrition": recipe.nutrients,
                    "@type": "HowTo",
                    "estimatedCost": recipe.cost,
                    "totalTime": recipe.time,
                    "@type": "CreativeWork",
                    "archivedAt": recipe.source,
                    "accessMode": recipe.energy,
                    "@type": "Thing",
                    "image": `images/${recipe.image}`,
                };

                // Insert JSON-LD into the <head> of the document
                const script = document.createElement("script");
                script.type = "application/ld+json";
                script.textContent = JSON.stringify(jsonLd);
                document.head.appendChild(script);
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
});
