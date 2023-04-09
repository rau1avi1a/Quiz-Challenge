//variables

//timer
var timerElement = document.querySelector(".timer");
var timer;
var timerCount = 120;

//buttons
var startButton = document.querySelector(".startButton");
var viewScores = document.querySelector(".viewScores");
var backButton = document.querySelector(".backButton");


//screen selectors
var startScreen = document.querySelector(".startScreen");
var questionScreen = document.querySelector(".questionScreen");
var scoreScreen = document.querySelector(".scoreScreen");
var scoreBoardScreen = document.querySelector(".scoreBoardScreen");

//score
var scoreInitials = document.querySelector("#scoreInitials");
var scoreSubmit = document.querySelector("#scoreSubmit");
var storedScores = document.querySelector("#highscores");
var scoreAmount
var correct;
var initials;
var score;

//quiz
var question = document.querySelector(".question");

var questionSet = [
    "Who are you?",
    "How are you?",
    "Why are you?"
];
var answerSet1 = [
    "1",
    "2",
    "3",
    "4",
]
var answerSet2 = [
    "5",
    "6",
    "7",
    "8"
]
var answerSet3 = [
    "9",
    "10",
    "11",
    "12"
]

//Functions

//This function will start the game
function startQuiz() {
    //Hides start screen and shows questions
    startScreen.setAttribute("class", "hide");
    questionScreen.setAttribute("class","showIndented");
    //Starts timer
    startTimer();
    quiz();
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
        timerCount = 120;
        questionScreen.setAttribute("class","hide");
        endQuiz();
      }
    }, 1000);
}

//quiz
function quiz () {
    for (var i = 0; i < questionSet.length; i++) {
        document.getElementById("question").innerHTML = questionSet[i];
        document.getElementById("answer1").innerHTML = answerSet1[i-2];
        document.getElementById("answer2").innerHTML = answerSet1[i-1];
        document.getElementById("answer3").innerHTML = answerSet1[i];
        document.getElementById("answer4").innerHTML = answerSet1[i+1];
    }

}

//This function ends the quiz
function endQuiz() {
    scoreScreen.setAttribute("class","showCenter");
}

//This function submits the quiz score
function submitQuiz(event) {
    event.preventDefault();
    scoreScreen.setAttribute("class","hide");
    scoreBoardScreen.setAttribute("class","showCenter");
}

//Takes user back to main screen
function goBack() {
    timerElement.textContent = timerCount;
    scoreBoardScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "showCenter");
}

//This function adds scores to the scoreboard
function renderScores() {
    highscores.innerHTML = "";
    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i];
  
      var li = document.createElement("li");
      li.textContent = todo;
      li.setAttribute("data-index", i);
  
      var button = document.createElement("button");
      button.textContent = "Complete ✔️";
  
      li.appendChild(button);
      todoList.appendChild(li);
    }
  
}

//This function lets user view scoreboard
function viewScoreBoard (event) {
    scoreBoardScreen.setAttribute("class", "showCenter");

}

//Event Listeners

startButton.addEventListener("click", startQuiz);
viewScores.addEventListener("click", viewScoreBoard);
backButton.addEventListener("click", goBack);
scoreSubmit.addEventListener("submit", submitQuiz);
