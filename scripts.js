const apiUrl = "https://api.balldontlie.io/v1/games";
const apiKey = "c4a760b6-4bee-45df-960b-e68b789ac51f";

async function fetchGames() {
    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Authorization": apiKey
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
    }
}

fetchGames();