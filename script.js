document.addEventListener("DOMContentLoaded", function () {
    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("collection");
            data.forEach(recipe => {                
                const div = document.createElement("div");
                div.classList.add("recipe-card");

                div.innerHTML = `
                    <h2>${recipe["RECIPE NAME"]}</h2>
                    <img src="${recipe["IMAGE"]}" alt="${recipe["RECIPE NAME"]}" width="200">
                    <p><strong>Meal Type:</strong> ${recipe["MEAL TYPE"]}</p>
                    <p><strong>Primary Nutrients:</strong> ${recipe['PRIMARY NUTRIENTS']}</p>
                    <p><strong>Cost Estimate:</strong> ${recipe['COST ESTIMATE ($-$$$)']}</p>
                    <p><a href="recipe-template.html?name=${encodeURIComponent(recipe["RECIPE NAME"])}">View Recipe</a></p>
                `;
                container.appendChild(div);
                
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
