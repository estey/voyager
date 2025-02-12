searchBtn = document.getElementById("search-btn");

// Function to fetch travel recommendations
async function fetchTravelRecommendations() {
    try {
        const response = await fetch('voyager_api.json'); // Update the path if necessary
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data); // Log the fetched data to the console

        // Optionally, you can display the recommendations on the page
        return(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function search () {
    searchInput = document.getElementById("search-input").value.toLowerCase();
    console.log(searchInput);
    data = fetchTravelRecommendations();
    if (searchInput == "beach") {
        console.log("searchInput");
        //displayRecommendations(data.beaches);
    }
    if (searchInput == "temple") {
        console.log(data.temples);
        //displayRecommendations(data.temples);
    }
    if (searchInput == "country") {
        console.log(data.countries);
        //displayRecommendations(data.countries);
    }
}

// Function to display recommendations on the page
function displayRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendations'); // Ensure you have this element in your HTML
    recommendations.forEach(rec => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.classList.add('recommendation-card');

        recommendationDiv.innerHTML = `
            <img src="${rec.imageUrl}" alt="${rec.name}" class="recommendation-image">
            <h2 class="recommendation-title>${rec.name}</h2>
            <p class="recommendation-description">${rec.description}</p>
        `;
        recommendationsContainer.appendChild(recommendationDiv);
    });
}

// Call the function to fetch recommendations

searchBtn.addEventListener("click", search);