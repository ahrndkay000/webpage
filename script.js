document.addEventListener("DOMContentLoaded", function () {
    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("collection");
            data.forEach(recipe => {
                let div = document.createElement("div");
                div.innerHTML = `
                    <div class="recipe-card">
                        <img src="${recipe.IMAGE}" alt="${recipe['RECIPE NAME']}" width="200">
                        <h2>${recipe['RECIPE NAME']}</h2>
                        <p><strong>Cooking Time:</strong> ${recipe['COOKING TIME (MINUTES)']} minutes</p>
                        <p><strong>Difficulty:</strong> ${recipe['ENERGY/DIFFICULTY (1-5)']} / 5</p>
                        <p><strong>Cost Estimate:</strong> ${recipe['COST ESTIMATE ($-$$$)']}</p>
                        <a href="${recipe.SOURCE}" target="_blank">View Full Recipe</a>
                    </div>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
