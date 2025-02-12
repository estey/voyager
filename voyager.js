searchBtn = document.getElementById("search-btn");
clearBtn = document.getElementById("clear-btn");

// Function to fetch travel recommendations
async function fetchTravelRecommendations() {
    try {
        const response = await fetch('voyager_api.json'); // Update the path if necessary
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function search () {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const data = await fetchTravelRecommendations();

    if (searchInput === "beach") {
        console.log("searchInput");
        displayRecommendations(data.beaches);
    }
    if (searchInput === "temple") {
        console.log(data.temples);
        displayRecommendations(data.temples);
    }
    if (searchInput === "country") {
        console.log(data.countries);
        const cities = [];
        data.countries.forEach(function(country){
            country.cities.forEach(function(city) {
                cities.push(city)
            });
        });
        // Shuffle the array using Fisher-Yates (Knuth) shuffle algorithm
        for (let i = cities.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cities[i], cities[j]] = [cities[j], cities[i]]; // Swap elements
        }

        // Return the first 4 elements of the shuffled array
        displayRecommendations(cities.slice(0,4));
    }
}

// Function to display recommendations on the page
function displayRecommendations(recommendations) {
    clearRecommendations();
    const recommendationsContainer = document.getElementById('recommendations'); // Ensure you have this element in your HTML

    recommendations.forEach(rec => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.classList.add('recommendation-card');

        recommendationDiv.innerHTML = `
            <img src="${rec.imageUrl}" alt="${rec.name}" class="recommendation-image">
            <h2 class="recommendation-title">${rec.name}</h2>
            <p class="recommendation-description">${rec.description}</p>
        `;
        recommendationsContainer.appendChild(recommendationDiv);
    });
}

function clearRecommendations () {
    const recommendationsContainer = document.getElementById('recommendations'); // Ensure you have this element in your HTML
    recommendationsContainer.innerHTML = '';
}

searchBtn.addEventListener("click", search);
clearBtn.addEventListener("click", clearRecommendations);