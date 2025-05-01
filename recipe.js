document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const recipe = data.find(r => r['RECIPE NAME'] === recipeName);
            if (recipe) {

                // Update visible page content
                document.getElementById("recipe-title").innerText = recipe["RECIPE NAME"];
                document.getElementById("recipe-image").src = recipe["IMAGE"];
                document.getElementById("recipe-image").alt = recipe["RECIPE NAME"];
                document.getElementById("recipe-name").innerText = recipe["RECIPE NAME"];
                document.getElementById("recipe-ingredients").innerText = recipe["INGREDIENTS"];
                document.getElementById("recipe-time").innerText = recipe["COOKING TIME (MINUTES)"];
                document.getElementById("recipe-energy").innerText = recipe["ENERGY/DIFFICULTY (1-5)"];
                document.getElementById("recipe-cost").innerText = recipe["COST ESTIMATE ($-$$$)"];
                document.getElementById("recipe-type").innerText = recipe["MEAL TYPE"];
                document.getElementById("recipe-nutrients").innerText = recipe["PRIMARY NUTRIENTS"];
                document.getElementById("recipe-source").innerHTML = `<a href="${recipe["SOURCE"]}" target="_blank">${recipe["SOURCE"]}</a>`;

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
                    "image": images/${recipe.image},
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


