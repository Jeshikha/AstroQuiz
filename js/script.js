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
function fetchAndDisplayImageForKeyword(keyword, index) {
  const queryURL = `https://images-api.nasa.gov/search?keywords=${keyword}&media_type=image`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.collection.items.length > 0) {
        const imgURL = data.collection.items[0].links[0].href;
        const imgEl = document.createElement("img");
        imgEl.setAttribute("src", imgURL);
        imgEl.setAttribute("alt", `${keyword} Image`);
        questionImageElement.innerHTML = ""; // Clear previous images
        questionImageElement.appendChild(imgEl);
      }
    })
    .catch(function (error) {
      console.error(`Error fetching data for ${keyword} from NASA API:`, error);
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
