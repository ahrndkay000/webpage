document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const recipe = data.find(r => r['RECIPE NAME'] === recipeName);
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
                "@context": "https://schema.org",
                    "@type": "Recipe",
                    "name": recipe["RECIPE NAME"],
                    "recipeIngredient": recipe["INGREDIENTS"].split("    "), // assumes ingredients are space-separated
                    "recipeCategory": recipe["MEAL TYPE"],
                    "totalTime": `${recipe["COOKING TIME (MINUTES)"]} minutes`,
                    "image": recipe["IMAGE"],
                    "url": window.location.href,
                    "mainEntityOfPage": window.location.href,
                    "nutrition": {
                        "@type": "NutritionInformation",
                        "name": recipe["PRIMARY NUTRIENTS"]
                    },
                    "estimatedCost": {
                        "@type": "MonetaryAmount",
                        "currency": "USD",
                        "value": recipe["COST ESTIMATE ($-$$$)"]
                    }
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


