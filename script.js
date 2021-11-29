//  Question bank
var questionSet = [
    {
        question: "What tag do we use to attach a Javascript file to the HTML?",
        correctAnswerIndex: 0,
        answers: ["script", "link", "a", "all of the above", "none of the above"]
    },
    {
        question: "Which is not a primitive data type?",
        correctAnswerIndex: 3,
        answers: ["boolean", "number", "String", "bologne", "all of these are primitive data types"]
    },
    {
        question: "What do you put directly after the function name to hold stuff?",
        correctAnswerIndex: 1,
        answers: ["brackets[]", "parenthesis()", "curly braces{}", "all of the above", "none of the above"]
    },
    {
        question: "What are variables used for in JavaScript?",
        correctAnswerIndex: 3,
        answers: ["Creating random variations everytime you run the script", "Connecting the script file with the HTML", "Causing PTSD flashbacks on when the teacher called on you", "Storing numbers, booleans, and Strings"]
    },
    {
        question: "How does the date object in JavaScript store the date?",
        correctAnswerIndex: 0,
        answers: ["Total milliseconds since Jan 1st, 1970", "Total minutes since Jan 2nd, 2000", "Calls a function from the International Date Time Association API", "Every computer has a tiny time wizard inside meticulously counting each millisecond since the start of time"]
    },
    {
        question: "Which of these could be a representation of a number?",
        correctAnswerIndex: 0,
        answers: ["NAN", "NULL", "Fifty", "bologna", "fifty"]
    },
    {
        question: "Which of these is not in JavaScript?",
        correctAnswerIndex: 1,
        answers: ["Block Scope", "Tele Scope", "Global Scope", "Function Scope"]
    },
    {
        question: "0.1 + 0.2 =",
        correctAnswerIndex: 3,
        answers: ["0.3", "0", "0.0", "0.30000000000000004"]
    },
    {
        question: "What is the purpose of the function keyword?",
        correctAnswerIndex: 0,
        answers: ["Store multiple lines of code in a single package for easy access", "Returns the purpose of the object to the console", "Creates a mathematical expression based on the inputs given", "None of the above"]
    },
    {
        question: "What do you call a sausage consisting of finely ground pork sausage with small parts of pork fat, originally from a small city in Italy?",
        correctAnswerIndex: 1,
        answers: ["String", "bologna", "array", "the window", "null"]
    }
];

//  Sorted Array by score of all previous highscores
var highscores = [];

//  Buttons
var buttons = document.getElementsByClassName("btn-light");

// Event Listener Variables
var start = document.getElementById("start");
var answerBox = document.getElementById("answerBox"); 
var userInput = document.getElementById("userInput");
var submit = document.getElementById("submit");
var again = document.getElementById("playAgain");

var clock = document.getElementById("clock");
var question = document.getElementById("question");
var leaderboard = document.getElementById("leaderboard");
var score = document.getElementById("score");

//  Sections. Phases of the quiz
var welcomeScreen = document.getElementById("welcomeScreen");
var testScreen = document.getElementById("testScreen");
var endScreen = document.getElementById("endScreen");

//  Settings
var timeGiven = 60; //  Time given. Used in the code elsewhere
var penalty = 3;    //  How many seconds will be deduted when geting a wrong answer
var correctColor = "beige";
var incorrectColor = "red";

//  Internal variables
var questionIndex = 0;
var secondsLeft = timeGiven;
var timerInterval;


//  Event:      Click start button
//  Function:   Hides start page, question and answer box appear
start.addEventListener("click", function() {
    timerInterval = setInterval(function() {
        secondsLeft = secondsLeft - 0.1;
        clock.textContent = (secondsLeft.toFixed(1) + " seconds left");
        if(secondsLeft <= 0) {
            endPoint();
        }
    }, 100);
    welcomeScreen.style.display = "none";
    testScreen.style.display = "initial";
    loadLeaderboardScores();
    startPoint();
});

//  Event:      Click an answer box
//  Function:   Correct box progresses to next question, incorrect deducts time and turns box red
answerBox.addEventListener("click", function(e) {
    //  TODO: add points if right
    if (e.target.dataset.correct === "true") {
        //  They got it correct
        questionIndex++;
        startPoint();
    } else if (e.target.dataset.state === "hidden") {
        // They did not get it correct
        secondsLeft = secondsLeft - penalty;
        e.target.style.backgroundColor = incorrectColor;
        e.target.dataset.state = "shown";
        currentText = e.target.textContent;
        e.target.textContent = currentText + " is incorrect";
    }
});

//  Event:      Click submit score button
//  Function:   Submit takes user input and adds score to local storage
submit.addEventListener("click", function(e) {
    if (userInput.value.trim() != "") {
        addScore([userInput.value.trim(), secondsLeft.toFixed(1)]);
        save();
        renderLeaderboard();
        submit.style.display = "none";
    }
});

//  Event:      Click try again button
//  Function:   Try again resets the page for another quiz
again.addEventListener("click", function(e) {
    resetSettings();
    submit.style.display = "initial";
    endScreen.style.display = "none";
    welcomeScreen.style.display = "initial";
});

// The intersection for between questions and to change to the end screen once out of questions
function startPoint() {
    //  Renders the first question onto the page
    console.log(questionSet[questionIndex]);
    if (questionIndex < questionSet.length) {
        renderQuestion(questionIndex);
    } else {
        endPoint();
    }
}

// Handles rendering when a new question is pulled up from question text, button text, and button datasets
function renderQuestion(questionIndex) {
    //  Sets the question
    question.textContent = questionSet[questionIndex].question;
    var answerIndex = questionSet[questionIndex].correctAnswerIndex;

    //  Sets the answer options, background color, if selected
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = questionSet[questionIndex].answers[i];
        buttons[i].style.backgroundColor = correctColor;
        buttons[i].dataset.state = "hidden";
        //Sets data value of the answer
        if (i === answerIndex) {
            buttons[i].dataset.correct = true;
        } else {
            buttons[i].dataset.correct = false;
        }
    }
}

// Hides the testing screen and loads the end screen. Calls all functions necessary for the transition.
function endPoint() {
    clearInterval(timerInterval);
    clock.textContent = "PUT DOWN YOUR MICE";
    score.textContent = secondsLeft.toFixed(1) + " seconds!";
    loadLeaderboardScores();
    renderLeaderboard();
    //  TODO: breakdown of their score
    testScreen.style.display = "none";
    endScreen.style.display = "initial";
}

// Resets all the settings for a retest
function resetSettings() {
    secondsLeft = timeGiven;
    questionIndex = 0;
    clock.textContent = "Quiz has not started yet";
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = questionSet[questionIndex].answers[i];
        buttons[i].style.backgroundColor = correctColor;
        buttons[i].dataset.state = "hidden";
        buttons[i].dataset.correct = false;
    }
}

// Pulls data from local storage if there is any
function loadLeaderboardScores() {
    if (localStorage.getItem("save") != null) {
        highscores = JSON.parse(localStorage.getItem("save"));
    }
}

//  Adding new score to highscores array. Sorted by time remaining (score)
function addScore(score) {
    if (highscores.length <= 0) {
        highscores.push(score);
    } else if (score[1] >= highscores[0][1]) {
        highscores.unshift(score);
    } else {
        var temp = score;
        var temp2;
        for (var i = 1; i < highscores.length; i++) {
            if (temp[1] >= highscores[i][1]) {
                temp2 = highscores[i];
                highscores[i] = temp;
                temp = temp2;
            }
        }
        highscores.push(temp);
    }
}

// Save the current highscores array into local storage
function save() {
    localStorage.setItem("save", JSON.stringify(highscores));
}

// Renders the leaderboard with the highscores array
function renderLeaderboard() {
    leaderboard.innerHTML = "";
    var leaderListLeft = document.createElement("ol");
    var leaderListRight = document.createElement("ol");

    for (var i = 0; i < highscores.length; i++) {
        var itemName = document.createElement("li");
        itemName.textContent = highscores[i][0];

        var itemScore = document.createElement("li");
        itemScore.textContent = highscores[i][1];
        console.log(highscores[i][1]);

        leaderListLeft.appendChild(itemName);
        leaderListRight.appendChild(itemScore);
    }

    leaderboard.appendChild(leaderListLeft);
    leaderboard.appendChild(leaderListRight);
}
