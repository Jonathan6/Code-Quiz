// Acceptance Criteria
// GIVEN I am taking a code quiz
// TODO: WHEN I click the start button THEN a timer starts and I am presented with a question
// TODO: WHEN I answer a question THEN I am presented with another question
// TODO: WHEN I answer a question incorrectly THEN time is subtracted from the clock
// TODO: WHEN all questions are answered or the timer reaches 0 THEN the game is over
// TODO: WHEN the game is over THEN I can save my initials and my score
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
        correctAnswerIndex: 4,
        answers: ["Creating random variations everytime you run the script", "Connecting the script file with the HTML", "Causing PTSD flashbacks on when the teacher called on you", "Storing numbers, booleans, and Strings"]
    },
    {
        question: "How does the date object in JavaScript store the date?",
        correctAnswerIndex: ,
        answers: ["Total milliseconds since Jan 1st, 1970", "Total minutes since Jan 2nd, 2000", "Calls a function from the International Date Time Association API", "Asks ur mum"]
    },
    {
        question: "Which of these could be a representation of a number?",
        correctAnswerIndex: 1,
        answers: ["NAN", "NULL", "Fifty", "bologna", "fifty"]
    },
    {
        question: "Which of these is not in JavaScript?",
        correctAnswerIndex: 2,
        answers: ["Block Scope", "Tele Scope", "Global Scope", "Function Scope"]
    },
    {
        question: "0.1 + 0.2 =",
        correctAnswerIndex: 4,
        answers: ["0.3", "0", "0.0", "0.30000000000000004"]
    },
    {
        question: "",
        correctAnswerIndex: ,
        answers: ["", "", "", ""]
    },
    {
        question: "What do you call a sausage consisting of finely ground pork sausage with small parts of pork fat, originally from a small city in Italy?",
        correctAnswerIndex: 2,
        answers: ["String", "bologna", "array", "the window", "null"]
    }
];


var highscores = [];

var buttons = [ document.getElementById("answer1"),
                document.getElementById("answer2"),
                document.getElementById("answer3"),
                document.getElementById("answer4")
];

var clock = document.getElementById("clock");
var question = document.getElementById("question");
var leaderboard = document.getElementById("leaderboard");

var start = document.getElementById("start");
var answerBox = document.getElementById("answerBox"); 
var userInput = document.getElementById("userInput");
var submit = document.getElementById("submit");
var again = document.getElementById("playAgain");

var testScreen = document.getElementById("testScreen");
var welcomeScreen = document.getElementById("welcomeScreen");
var endScreen = document.getElementById("endScreen");

var questionIndex = 0;
var penalty = 3; // How many seconds will be deduted when geting a wrong answer
var secondsLeft = 30;
var timerInterval;

//  Event:      Click start button
//  Function:   Hides start page, question and answer box appear
start.addEventListener("click", function() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        clock.textContent = (secondsLeft + " seconds left");
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            endPoint();
        }
    }, 1000);
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
        //  Render the next question
        questionIndex++;
        startPoint();
    } else if (e.target.dataset.state === "hidden") {
        // They did not get it correct
        // Deduct time
        // Add red background to the div with wrong answer

        secondsLeft = secondsLeft - penalty;
        e.target.style.backgroundColor = "red";
        e.target.dataset.state = "shown";
        currentText = e.target.textContent;
        e.target.textContent = currentText + " is incorrect";
    }
});

//  Event:      Click submit score button
//  Function:   Submit takes user input and adds score to local storage
submit.addEventListener("click", function(e) {
    //  record their score
    //  add local storage highscore
    //  asks user for name

    // console.log(userInput.textContent.trim());
    if (userInput.value.trim() != "") {
        highscores.push(userInput.value);
        highscores.push(secondsLeft);
        save();
        renderLeaderboard();
    }
    //  TODO: sort the highscores
    // if (highscores.length === 0) {
    //     highscores.push(secondsLeft);
    // } else {
    //     for (var i = 0; i < highscores.length; i++) {
    //         if (highscores[i] < secondsLeft) {
                
    //         }
    //     }
    // }
});

//  Event:      Click try again button
//  Function:   Try again resets the page for another quiz
again.addEventListener("click", function(e) {
    console.log(e.target);

    //  TODO: play again button
    endScreen.style.display = "none";
    testScreen.style.display = "initial";
});

function startPoint() {
    //  Renders the first question onto the page
    console.log(questionSet[questionIndex]);
    if (questionSet[questionIndex] != undefined) {
        renderQuestion(questionIndex);
    } else {
        endPoint();
    }
}

function renderQuestion(questionIndex) {
    //  Sets the question
    question.textContent = questionSet[questionIndex].question;
    var answerIndex = questionSet[questionIndex].correctAnswerIndex;

    //  Sets the answer options, background color, if selected
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = questionSet[questionIndex].answers[i];
        buttons[i].style.backgroundColor = "beige";
        buttons[i].dataset.state = "hidden";
        //Sets data value of the answer
        if (i === answerIndex) {
            buttons[i].dataset.correct = true;
        } else {
            buttons[i].dataset.correct = false;
        }
    }
}

function renderLeaderboard() {
    leaderboard.innerHTML = "";
    var leaderListLeft = document.createElement("ol");
    var leaderListRight = document.createElement("ol");

    for (var i = 0; i < highscores.length; i = i + 2) {
        var itemName = document.createElement("li");
        itemName.textContent = highscores[i];

        var itemScore = document.createElement("li");
        itemScore.textContent = highscores[i + 1];

        leaderListLeft.appendChild(itemName);
        leaderListRight.appendChild(itemScore);
    }

    leaderboard.appendChild(leaderListLeft);
    leaderboard.appendChild(leaderListRight);
}

function endPoint() {
    clock.textContent = "PUT DOWN YOUR MICE";
    resetSettings();
    loadLeaderboardScores();
    //  TODO: breakdown of their score
    testScreen.style.display = "none";
    endScreen.style.display = "initial";
}

function save() {
    localStorage.clear();
    localStorage.setItem("save", JSON.stringify(highscores));
    // for (var i = 0; i < highscores.length; i = i + 2) {
    //     localStorage.setItem(highscores[i], highscores[i + 1]);
    // }
}

function loadLeaderboardScores() {
    if (localStorage.getItem("save") != null) {
        highscores = JSON.parse(localStorage.getItem("save"));
    }

    renderLeaderboard();
}

function resetSettings() {
    secondsLeft = 30;
    questionIndex = 0;
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = questionSet[questionIndex].answers[i];
        buttons[i].style.backgroundColor = "beige";
        buttons[i].dataset.state = "hidden";
        buttons[i].dataset.correct = false;
    }

}