"use strict";

// ------------------------------- INITIALISE VARIABLES ---------------------------------------
//
// GENERAL VARIABLE SETUPS
let optionClick = document.querySelector(".clickable");
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
      console.log("totalScore: " + totalScore); // Testing purposes. Remove once code finished.
      if (questionNumber < questions.length - 1) {
        questionNumber++;
        injectQuestions(questionNumber);
        questionScore = 100;
        buttons.forEach((button) => {
          // Reset button colours when question changes
          button.style.backgroundColor = "#a667e5";
        });
      } else {
        gameOver();
      }
    } else {
      checkAnswerClicked(this);
      console.log("Question Score: " + questionScore); // Testing purposes. Remove once code finished.
      this.style.backgroundColor = "red";
    }
  }
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

  // Fetch and display the image for the current question
  fetchAndDisplayImageForNASAId(questions[n].nasaId, n);
  console.log("question no. = " + questionNumber); // Testing purposes. Remove once code finished.
  updateDotColors(n);
}
injectQuestions(questionNumber);
//
//
//
// WRONG ANSWER PENALTY FUNCTION
//
function checkAnswerClicked(button1) {
  if (button1.style.backgroundColor != "red") {
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