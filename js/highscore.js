// Function to save a new high score
function saveHighScore(playerName, playerScore) {
    // Retrieve existing high scores from localStorage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add the new score to the high scores array
    highScores.push({ name: playerName, score: playerScore });

    // Sort the high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Save the updated high scores back to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to retrieve and return the top high scores
function getTopHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    return highScores.slice(0, 10);
}

// Function to display high scores on the scoreboard
function displayHighScores() {
    const highScoresList = document.getElementById("highScoresList");

    // Retrieve top scores
    const topScores = getTopHighScores();

    // Clear existing content
    highScoresList.innerHTML = "";

    // Display high scores on the scoreboard
    topScores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.name}: ${score.score}`;
        highScoresList.appendChild(listItem);
    });
}

// Call the displayHighScores function when the page loads
document.addEventListener("DOMContentLoaded", function () {
    displayHighScores();
});


