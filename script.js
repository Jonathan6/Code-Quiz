// Acceptance Criteria
// GIVEN I am taking a code quiz
// TODO: WHEN I click the start button THEN a timer starts and I am presented with a question
// TODO: WHEN I answer a question THEN I am presented with another question
// TODO: WHEN I answer a question incorrectly THEN time is subtracted from the clock
// TODO: WHEN all questions are answered or the timer reaches 0 THEN the game is over
// TODO: WHEN the game is over THEN I can save my initials and my score

// hidden lines 165, 109, 227



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
        answers: ["Total milliseconds since Jan 1st, 1970", "Total minutes since Jan 2nd, 2000", "Calls a function from the International Date Time Association API", "Asks ur mum"]
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

//  Array storing all previous highscores
var highscores = [];

//  Buttons
var buttons = [ document.getElementById("answer1"),
                document.getElementById("answer2"),
                document.getElementById("answer3"),
                document.getElementById("answer4")
];

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

welcomeScreen.style.display = "block";
testScreen.style.display = "block";
endScreen.style.display = "block";

//  Internal variables

var questionIndex = 0;
var secondsLeft = 30;
var timerInterval;

//  Settings
var penalty = 3; // How many seconds will be deduted when geting a wrong answer
var correctColor = "beige";
var incorrectColor = "red";

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
    // welcomeScreen.style.display = "none";
    // testScreen.style.display = "initial";
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
        e.target.style.backgroundColor = incorrectColor;
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
    // endScreen.style.display = "none";
    // testScreen.style.display = "initial";
});

function startPoint() {
    //  Renders the first question onto the page
    console.log(questionSet[questionIndex]);
    if (questionIndex < questionSet.length) {
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
    score.textContent = secondsLeft + " seconds!";
    resetSettings();
    loadLeaderboardScores();
    //  TODO: breakdown of their score
    // testScreen.style.display = "none";
    // endScreen.style.display = "initial";
}

function save() {
    var sortedHighscores = sortHighscores(0, highscores.length);

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
        buttons[i].style.backgroundColor = correctColor;
        buttons[i].dataset.state = "hidden";
        buttons[i].dataset.correct = false;
    }
}


//  Sorting the left being the highest
//  This will not work based on how I set up the array. Will need to find a different solution
function sortedHighscores(index1, index2) {
/*
    base case: we are given 1 or 2, 1 length arrays to work worth
    we shift them based on whichever is begger

    any other case:
    call this function 2 times splitting the given indexes in half
    we first swap the bigger number into the big slot
    move down to the next empty space and do the same until we are out of numbers
    return the array

    we give this function 2 sorted lists and it will return one single sorted list
*/
    if (index1 === index2 + 1) {
        // only given 1 index therefore we just return the result
    } else  {
        var left = sortedHighscores(leftside);
        var right = sortedHighscores(rigthside);

    }

    
}