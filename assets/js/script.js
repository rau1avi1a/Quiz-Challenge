//variables

//timer
var timerElement = document.querySelector(".timer");
var timer;
var timerCount = 120;

//buttons
var startButton = document.querySelector(".startButton");
var viewScores = document.querySelector(".viewScores");
var backButton = document.querySelector(".backButton");
var choiceButton = document.querySelector(".choiceButton");


//screen selectors
var startScreen = document.querySelector(".startScreen");
var questionScreen1 = document.querySelector(".questionScreen1");
var questionScreen2 = document.querySelector(".questionScreen2");

var scoreScreen = document.querySelector(".scoreScreen");
var scoreBoardScreen = document.querySelector(".scoreBoardScreen");
var viewHighscores = true;

//score
var scoreSubmit = document.querySelector("#scoreSubmit");
var highscores = document.querySelector("#highscores");
var nameInput = document.querySelector("#name");
let names = [];
var score = 0;

//quiz
var question = document.querySelector(".question");
var answerCorrect = document.querySelector("#answerCorrect");
var answerWrong = document.querySelector("#answerWrong");


//Functions

//This function will start the quiz
function startQuiz() {
    //Disables View Highscores button
    viewHighscores = false;
    //Hides start screen and shows questions
    startScreen.setAttribute("class", "hide");
    //Starts timer
    //starts questions
    questionScreen1.setAttribute("class","showIndented");
    quiz();
    startTimer();
}

//Starts countdown
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      // Tests if time has run out
      if (timerCount == 0) {
        // Clears interval
        clearInterval(timer);
        endQuiz();
        timerCount = 120;
      }
    }, 1000);
}

//quiz
function quiz (event) {
    if (choiceButton.contains(answerCorrect)) {
        score++;
    } 
    if (choiceButton.contains(answerWrong)) {
        timerCount-10;
        timerElement.textContent = timerCount;
    }


}

//This function ends the quiz
function endQuiz() {
    questionScreen1.setAttribute("class","hide");
    questionScreen2.setAttribute("class","hide");
    scoreScreen.setAttribute("class","showCenter");
}

//This function submits the quiz score
function submitQuiz(event) {
    event.preventDefault();

    var userInput = nameInput.value.trim();
    if (userInput === "") {
        return;
    }
    names.push(userInput);
    localStorage.setItem("names", JSON.stringify(names));
    scoreScreen.setAttribute("class","hide");
    addScore();
    nameInput.value="";
    scoreBoardScreen.setAttribute("class","showCenter");
}

//This function adds a score to the scoreboard
function addScore() {
    var li = document.createElement("li");
    li.textContent = nameInput.value.trim() + " - " + score;
    highscores.appendChild(li);
    //resets score
    score = 0;
}

//This function adds stored scores to the scoreboard
function renderScores() {
    nameInput.value = "";

    for (var i = 0; i < names.length; i++) {
        var nameList = names[i];
        var li = document.createElement("li");
        li.textContent = nameList + " - " + score;
        li.setAttribute("data-index", i);
        highscores.appendChild(li);
      }
}

//This function retrieves the scores from local storage
function init() {
    var scoreBoard = JSON.parse(localStorage.getItem("names"));
    if (scoreBoard !== null) {
      names = scoreBoard;
    }
    renderScores();
}

//Takes user back to main screen
function goBack() {
    timerElement.textContent = timerCount;
    scoreBoardScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "showCenter");
    viewHighscores = true;
}

//This function lets user view scoreboard
function viewScoreBoard (event) {
    event.preventDefault();
    if (viewHighscores == true) {
        startScreen.setAttribute("class", "hide");
        scoreBoardScreen.setAttribute("class", "showCenter");
    }
}


//Event Listeners

//Starts quiz
startButton.addEventListener("click", startQuiz);
//Views the scoreboard
viewScores.addEventListener("click", viewScoreBoard);
//Goes back to start screen
backButton.addEventListener("click", goBack);
//Submits initials to scoreboard
scoreSubmit.addEventListener("submit", submitQuiz);
//Selects answer
choiceButton.addEventListener("click", quiz);

init();
