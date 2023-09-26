//
// NAME AND SCOREBOARD TOGGLE
//
//
let saveButtonClick = document.getElementById("submit-score");

saveButtonClick.addEventListener("click", function () {
  console.log("wassup");
  if (leaderBoardToggle.classList.contains("hidden")) {
    leaderBoardToggle.classList.remove("hidden");
    endgameToggle.classList.add("hidden");
  }
});
//
//
// ADD NAME AND SCORE TO STORAGE
let scoreBox = document.querySelector(".score-a");
let playerNameInput = document.querySelector(".yourname");
//
//
saveButtonClick.addEventListener("click", function (event) {
  event.preventDefault();

  // Create Player Object
  let player = {
    name: playerNameInput.value.trim(),
  };

  // Validate the fields
  if (player.name === "") {
    displayMessage("Error", "First name cannot be empty");
  }

  // Set new memory
  localStorage.setItem("user", JSON.stringify(player));

  // Get the most recent submission
  let lastPlayer = JSON.parse(localStorage.getItem("player"));

  scoreBox.textContent = `${player.name} ----- ${totalScore}`;
});
