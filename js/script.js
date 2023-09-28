"use strict";

// ------------------------------- INITIALISE VARIABLES ---------------------------------------
//
// GENERAL VARIABLE SETUPS
//
//
// ADD EVENT LISTENERS
let optionClick = document.querySelector(".clickable");
let pointsAvailableBox = document.querySelector(".points-available");
let currentScoreBox = document.querySelector(".current-score");
//
//
// QUESTION BUTTON SELECTOR VARIABLES
let quizQuestion = document.getElementById("question-box");
let answerBtn1 = document.querySelector("#select-a");
let answerBtn2 = document.querySelector("#select-b");
let answerBtn3 = document.querySelector("#select-c");
let answerBtn4 = document.querySelector("#select-d");
let nextQuestion = document.getElementById("next-question");
let abortMission = document.getElementById("btn-abort");
let questionImageElement = document.getElementById("question-image"); // Added this line
let questionCaptionEl = document.querySelector(".p-caption"); // Added this line
//
//
// GAME OVER PAGE EVENT LISTENERS
let endgameToggle = document.querySelector(".endgame");
let leaderBoardToggle = document.querySelector(".leaderboard");
//
//
// GAME VARIABLE SETUP
let questionNumber = 0;
let totalScore = 0;
let firstLetter;
let questionScore = 100;
//
//
// ----------------------------- FUNCTION DECLARATIONS ----------------------------------------

//
//
// MAIN USER LOGIC
//
function answerSelect() {
  const buttons = document.querySelectorAll(".clickable");

  buttons.forEach((button) => {
    button.addEventListener("click", handleClick, false);
  });

  function handleClick() {
    // This.textContent uses the 'this' keyword to return the data in the array for that particular button press.
    let option = this.textContent;
    firstLetter = option.charAt(0);
    console.log(option); // Testing purposes. Remove once code finished.
    console.log(firstLetter); // Testing purposes. Remove once code finished.

    if (questions[questionNumber].answer === firstLetter) {
      totalScore += questionScore;

      // Local Storage retrieving data for funtioning app
      localStorage.setItem("totalScore", totalScore);
      // Show the correct modal for correct answers
      displayCorrectModal();
      console.log("totalScore: " + totalScore); // Testing purposes. Remove once code finished.
      if (questionNumber < questions.length - 1) {
        questionNumber++;
        injectQuestions(questionNumber);
        questionScore = 100;
        buttons.forEach((button) => {
          // Reset button colours when question changes
          button.style.backgroundColor = "#a667e5";
        });
        pointsAvailableBox.textContent = questionScore;
        currentScoreBox.textContent = totalScore;
        window.scrollTo(0, 10); //scroll to top of page when new question is populated
      } else {
        gameOver();
      }
    } else {
      checkAnswerClicked(this);
      console.log("Question Score: " + questionScore); // Testing purposes. Remove once code finished.
      this.style.backgroundColor = "#EA5656";
      pointsAvailableBox.textContent = questionScore;
    }
  }
}

// Adding this function to display the correct modal
function displayCorrectModal() {
  const correctModal = new bootstrap.Modal(document.getElementById('correctModal'));
  correctModal.show();
}

answerSelect();
//

//
//
// INJECT QUESTION FUNCTION
//
function injectQuestions(n) {
  quizQuestion.textContent = questions[n].title;
  answerBtn1.textContent = questions[n].choices[0];
  answerBtn2.textContent = questions[n].choices[1];
  answerBtn3.textContent = questions[n].choices[2];
  answerBtn4.textContent = questions[n].choices[3];

  console.log("question no. = " + questionNumber); // Testing purposes. Remove once code finished.

  // Fetch and display the image for the current question
  fetchAndDisplayImageForNASAId(questions[n].nasaId, n);

  // Fetch modal info
  fetchSolarStats(questions[n].solaireId);

  // Update progress dot
  updateDotColors(n);
}

injectQuestions(questionNumber);

//
//
//
// WRONG ANSWER PENALTY FUNCTION
//
function checkAnswerClicked(button1) {
  if (button1.style.backgroundColor != "#EA5656") {
    questionScore -= 25;
  }
  return;
}
//
//
// GAME OVER FUNCTION
//
function gameOver() {
  // Switch to game over page and remove code below.
  const buttons = document.querySelectorAll(".clickable");
  buttons.forEach((button) => {
    button.style.backgroundColor = "#aaa";
  });
  window.location.href = "end.html";
}
//
// NASA API FETCH FUNCTION
function fetchAndDisplayImageForNASAId(nasaId, index) {
  //const apiUrl = `https://images-api.nasa.gov/asset/${nasaId}`;
  const apiUrl = `https://images-api.nasa.gov/search?nasa_id=${nasaId}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.collection.items.length > 0) {
        console.log(data); //todo rm
        //const imgURL = data.collection.items[0].href;
        const imgURL = data.collection.items[0].links[0].href;
        const imgCap = data.collection.items[0].data[0].title;
        const imgEl = document.createElement("img");
        imgEl.setAttribute("src", imgURL);
        imgEl.setAttribute("alt", imgCap);
        questionImageElement.innerHTML = ""; // Clear previous images
        questionImageElement.appendChild(imgEl);
        questionCaptionEl.textContent = imgCap;
      }
    })
    .catch(function (error) {
      console.error(
        `Error fetching image data for NASA ID ${nasaId} from NASA API:`,
        error
      );
    });
}

// solar system api fetch function
function fetchSolarStats(solaireId) {
  let queryURL = `https://api.le-systeme-solaire.net/rest/bodies/${solaireId}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data); //todo rm
      if (data.englishName) {
        planetName = data.englishName;
      }

      if (data.moons) {
        planetMoons = data.moons.length;
      }

      if (data.sideralOrbit) {
        planetOrbit = Math.floor(data.sideralOrbit);
      }
      if (data.avgTemp !== null) {
        planetTemp = parseInt(data.avgTemp) - 273.15;
        planetTemp = Math.round((planetTemp + Number.EPSILON) * 100) / 100;
      }
      buildDYK();
    })
    .catch(function (error) {
      console.error(
        `Error fetching data for solar system statistics:`,
        error
      );
    });
}

// Function to update dot colors based on the current question number
function updateDotColors(currentQuestionNumber) {
  const dotElements = document.querySelectorAll(".dot-label");

  dotElements.forEach((dot, index) => {
    if (index < currentQuestionNumber) {
      // Question is answered, change dot color to green
      dot.classList.add("answered-dot");
    } else {
      // Question is not yet answered, change dot color to purple
      dot.classList.remove("answered-dot");
    }
  });
}
//
//
