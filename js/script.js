"use strict";

// INITIALISE VARIABLES
//
// GENERAL VARIABLE SETUPS
let startButtonPress = document.querySelector("#####");
let buttonChoice = document.getElementById("#####");
//
//
// QUESTION BUTTON SELECTOR VARIABLES
let quizQuestion = document.getElementById("#####");
let answerBtn1 = document.querySelector(".select-a");
let answerBtn2 = document.querySelector(".select-b");
let answerBtn3 = document.querySelector(".select-c");
let answerBtn4 = document.querySelector(".select-d");
//
//
// START BUTTON FUNCTION
//
//
// NASA API FETCH FUNCTION
f// Function to fetch and display images from NASA API based on the NASA ID
function fetchAndDisplayImageForNASAId(nasaId, index) {
  const apiUrl = `https://images-api.nasa.gov/asset/${nasaId}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.collection.items.length > 0) {
        const imgURL = data.collection.items[0].href;
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', imgURL);
        imgEl.setAttribute('alt', `NASA Image`);
        questionImageElement.innerHTML = ''; // Clear previous images
        questionImageElement.appendChild(imgEl);
      }
    })
    .catch(function (error) {
      console.error(`Error fetching image data for NASA ID ${nasaId} from NASA API:`, error);
    });
}

function getQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let titleElement = document.getElementById("question-title");
  titleElement.textContent = currentQuestion.title;

  const nasaId = currentQuestion.nasaId;

  fetchAndDisplayImageForNASAId(nasaId, currentQuestionIndex);

  // Clear previous answer choices
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, index) {
    let choiceButton = document.createElement("button");

    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);

    choiceButton.textContent = `${index + 1}. ${choice}`;
    choiceButton.classList.add("choice");

    choiceButton.addEventListener("click", questionClick);

    choicesElement.appendChild(choiceButton);
  });
}
//
//
// TOGGLE QUESTION FUNCTION
//
//
// INJECT QUESTION FUNCTION
//
//
// USER CLICK CHOICE FUNCTION
//
//
// DISPLAY INFO MODAL FUNCTION
//
//
// GAMEOVER FUNCTION
//
//
// DISPLAY SCORE FUNCTION
