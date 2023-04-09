//timer
var timerElement = document.querySelector(".timer");
var timer;
var timerCount = 3;

//buttons
var startButton = document.querySelector(".startButton");
var viewScores = document.querySelector(".viewScores");
var backButton = document.querySelector(".backButton");

//screen selectors
var startScreen = document.querySelector(".startScreen");
var questionScreen = document.querySelector(".questionScreen");
var scoreScreen = document.querySelector(".scoreScreen");
var scoreBoardScreen = document.querySelector(".scoreBoardScreen");



//functions

//This function will start the timer
function viewScoreBoard (event) {
    if (timer < 120) {
        
    }
    else {
        startScreen.setAttribute("class", "hide");
        scoreBoardScreen.setAttribute("class", "showCenter");
    };
}

//takes user back to main screen
function goBack() {
    scoreBoardScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "showCenter");
}

function startTimer() {

    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        };
      }
      // Tests if time has run out
      if (timerCount == 0) {
        // Clears interval
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
}

//This function will start the game
function startQuiz() {
    //Hides start screen and shows questions
    startScreen.setAttribute("class", "hide");
    questionScreen.setAttribute("class","showIndented");
    //Starts timer
    startTimer();
}

function endQuiz() {
    questionScreen.setAttribute("class","hide");
    scoreScreen.setAttribute("class","showCenter");
}

//Event Listeners

startButton.addEventListener("click", startQuiz);
viewScores.addEventListener("click", viewScoreBoard);
backButton.addEventListener("click", goBack);