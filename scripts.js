const apiUrl = "https://api.balldontlie.io/v1/games";
const apiKey = "c4a760b6-4bee-45df-960b-e68b789ac51f";

async function fetchGames() {
    const currentDate = new Date().toISOString().split('T')[0]; 
    const response = await fetch(`${apiUrl}?dates[]=${currentDate}`, {
        method: "GET",
        headers: {
            "Authorization": apiKey 
        }
    });

    if (response.ok) {
        const data = await response.json();
        const games = data.data;

       
        const gamesContainer = document.getElementById("games-container");
        gamesContainer.innerHTML = ""; 

     
        games.forEach(game => {
            const homeTeam = game.home_team.full_name;
            const visitorTeam = game.visitor_team.full_name;
            const time = game.time ? game.time.trim() : "TBD"; 
            const isCompleted = game.status === "Final";
            const homeScore = game.home_team_score;
            const visitorScore = game.visitor_team_score;

          
            const gameBox = document.createElement("div");
            gameBox.className = "game-box";

            gameBox.innerHTML = `
                <h3>${homeTeam} vs ${visitorTeam}</h3>
                <p>Time: ${time}</p>
                ${isCompleted 
                    ? `<p>Final Score: ${homeTeam} ${homeScore} - ${visitorTeam} ${visitorScore}</p>` 
                    : `<p>Game is not completed.</p>`
                }
            `;

            gamesContainer.appendChild(gameBox);
        });
    } else {
        console.error(`API Error: Status ${response.status}, ${response.statusText}`);
    }
}

fetchGames();