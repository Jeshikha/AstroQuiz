let saveButtonClick = document.getElementById("submit-score");

saveButtonClick.addEventListener("click", function () {
  console.log("wassup");
  if (leaderBoardToggle.classList.contains("hidden")) {
    leaderBoardToggle.classList.remove("hidden");
    endgameToggle.classList.add("hidden");
  }
});
