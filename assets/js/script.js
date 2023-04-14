//variables

//timer
var timerElement = document.querySelector(".timer");
var timer;
var timerCount = 120;

//buttons
var startButton = document.querySelector(".startButton");
var viewScores = document.querySelector(".viewScores");
var backButton = document.querySelector(".backButton");
var choiceButton = document.querySelectorAll(".choiceButton");
var correctAnswer = $('.answerCorrect');
var wrongAnswer = $('.answerWrong');


//screen selectors
var startScreen = document.querySelector(".startScreen");
var quizScreen = document.querySelector(".allQuestions");
var questionScreen1 = document.querySelector(".questionScreen1");
var questionScreen2 = document.querySelector(".questionScreen2");
var questionScreen3 = document.querySelector(".questionScreen3");
var questionScreen4 = document.querySelector(".questionScreen4");

var scoreScreen = document.querySelector(".scoreScreen");
var scoreBoardScreen = document.querySelector(".scoreBoardScreen");
var viewHighscores = true;

//score
var scoreSubmit = document.querySelector("#scoreSubmit");
var highscores = document.querySelector("#highscores");
var nameInput = document.querySelector("#name");
var scoreTrack = document.querySelector("#scoreTrack");
let names = [];
let scores = [];
var score = 0;

//quiz
var question = document.querySelector(".question");
var answerCorrect = document.querySelector("#answerCorrect");
var answerWrong = document.querySelector("#answerWrong");
var wrongDisplay = document.querySelector("#wrong");
var quizCount = 0;


//Functions

//This function will start the quiz
function startQuiz() {
    //Disables View Highscores button
    viewHighscores = false;
    //Hides start screen and shows questions
    startScreen.setAttribute("class", "hide");
    //Starts timer
    //starts questions
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
      if (timerCount <= 0) {
        // Clears interval
        quiz();
        clearInterval(timer);
        endQuiz();
        timerCount = 120;
      }
    }, 1000);
}

//This function ends the quiz
function endQuiz() {
    clearInterval(timer);
    if (timerCount < 0) {
        timerCount = 0;
        timerElement.textContent = timerCount;
    }
    quizCount = 0;
    quizScreen.setAttribute("class", "hide");
    scoreTrack.textContent = score;
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
    scores.push(score);
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("scores", JSON.stringify(scores));
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
        var scoreList = scores[i];
        var li = document.createElement("li");
        li.textContent = nameList + " - " + scoreList;
        li.setAttribute("data-index", i);
        highscores.appendChild(li);
      }
}

//This function retrieves the scores from local storage
function init() {
    var scoreBoardNames = JSON.parse(localStorage.getItem("names"));
    var scoreBoardScores = JSON.parse(localStorage.getItem("scores"));
    if (scoreBoardNames&&scoreBoardScores !== null) {
      names = scoreBoardNames;
      scores = scoreBoardScores;
    }
    renderScores();
}

//Takes user back to main screen
function goBack() {
    timerElement.textContent = timerCount;
    scoreBoardScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "showCenter");
    viewHighscores = true;
    timerCount = 120;
    timerElement.textContent = timerCount;
}

//This function lets user view scoreboard
function viewScoreBoard (event) {
    event.preventDefault();
    if (viewHighscores == true) {
        startScreen.setAttribute("class", "hide");
        scoreBoardScreen.setAttribute("class", "showCenter");
    }
}

//This is the quiz content
function quiz() {
    if (timerCount > 0) {
        quizScreen.setAttribute("class", "showIndented");
        if (quizCount == 0) {
            questionScreen1.setAttribute("class", "showIndented");
        }
        else if (quizCount == 1) {
            questionScreen1.setAttribute("class", "hide");
            questionScreen2.setAttribute("class", "showIndented");
        }
        else if (quizCount == 2) {
            questionScreen2.setAttribute("class", "hide");
            questionScreen3.setAttribute("class", "showIndented");
        }
        else if (quizCount == 3) {
            questionScreen3.setAttribute("class", "hide");
            questionScreen4.setAttribute("class", "showIndented");
        }
        else if (quizCount == 4) {
            questionScreen4.setAttribute("class", "hide");
            endQuiz();
        }
    } 
    else {
        quizScreen.setAttribute("class", "hide");
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

let test = [1,2,3,4,5,6,7,8,9,10];
//Selects answer and keeps score
for (let i = 0; i < choiceButton.length; i++) {
    choiceButton[i].addEventListener("click", function () {

        if (choiceButton[i].classList.contains("answerCorrect")) {
            score++;
            quizCount++;
        }
        if (choiceButton[i].classList.contains("answerWrong")) {
            quizCount++;
            timerCount = timerCount - 20;
        }
        console.log(test[i]);
});
    choiceButton[i].addEventListener("click", quiz);
}

init();