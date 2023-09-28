// Retrieve totalScore from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const storedScore = localStorage.getItem("totalScore");

  if (storedScore !== null) {
    // Display the totalScore in the placeholder element
    const scorePlaceholder = document.querySelector(".this-score");
    if (scorePlaceholder) {
      scorePlaceholder.textContent = storedScore;
    } else {
      console.error("Element with class 'this-score' not found");
    }
  } else {
    console.log("Total Score not found in localStorage");
  }
});
// Add event listener for the "Save" button
const saveButton = document.getElementById("submit-score");
saveButton.addEventListener("click", function () {
  // Your existing logic...

  // Retrieve player name from the input field
  const playerName = document.getElementById("yourname").value;

  // Retrieve total score from localStorage
  const storedScore = localStorage.getItem("totalScore");

  // Check if the score is stored
  if (storedScore !== null) {
    // Display the total score in the console (you can use it to save to high scores)
    const playerScore = parseInt(storedScore);

    // Call the saveHighScore function
    saveHighScore(playerName, playerScore);

    // Redirect to the high scores board (score.html)
    window.location.href = "score.html";
  } else {
    console.error("Total Score not found in localStorage");
  }
});


// Define the saveHighScore function
function saveHighScore(playerName, playerScore) {
  // Retrieve existing high scores or initialize an empty array
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Add the new score to the array
  highScores.push({ name: playerName, score: playerScore });

  // Sort the high scores in descending order (highest score first)
  highScores.sort((a, b) => b.score - a.score);

  // Keep only the top N scores (e.g., top 10)
  const topScores = highScores.slice(0, 10);

  // Save the updated high scores back to localStorage
  localStorage.setItem("highScores", JSON.stringify(topScores));
}
