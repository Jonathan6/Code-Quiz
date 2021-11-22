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
        answers: ["brackets[]", "parenthesis()", "curly braces{}", "all of the above","none of the above"]
    }
];


var highscores = [];

var buttons = [ document.getElementById("answer1"),
                document.getElementById("answer2"),
                document.getElementById("answer3"),
                document.getElementById("answer4")
];

var clock = document.getElementById("timer");
var start = document.getElementById("start");
var question = document.getElementById("question");
var answerBox = document.getElementById("answerBox");

var testScreen = document.getElementById("testScreen");
var welcomeScreen = document.getElementById("welcomeScreen");
var endScreen = document.getElementById("endScreen");

var leaderboard = document.getElementById("leaderboard");
var userInput = document.getElementById("userInput");
var submit = document.getElementById("submit");
var again = document.getElementById("playAgain");

var questionIndex = 0;
var secondsLeft = 30;
var timerInterval;

load();

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
    // TODO: The front main page disappears 
    // TODO: The question and input div boxes appear 
    startPoint();
});

//  Event:      Click an answer box
//  Function:   Correct box progresses to next question, incorrect deducts time and turns box red
answerBox.addEventListener("click", function(e) {
    //  TODO: add points if right
    if (e.target.dataset.correct === "true") {
        //  They got it correct
        //  Render the next question
        //  I have an idea but it might get messy
        questionIndex++;
        startPoint();
    } else if (e.target.dataset.state === "hidden") {
        // They did not get it correct
        // Deduct time
        // Add red background to the div with wrong answer

        secondsLeft = secondsLeft - 3;
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
    welcomeScreen.style.display = "none";
    testScreen.style.display = "initial";
    //  Renders the first question onto the page
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
    for (let i = 0; i < 4; i++) {
        buttons[i].textContent = questionSet[questionIndex].answers[i];
        // buttons[i].setAttribute("backgroundColor", "beige");
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
        console.log(highscores.length);

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
    clock.textContent = "PUT DOWN YOUR PENCILS";
    reset();
    load();
    //  TODO: load local storage previous highscores
    //  TODO: high score page appears
    //  TODO: button box disappears
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

function load() {
    if (localStorage.getItem("save") != null) {
        highscores = JSON.parse(localStorage.getItem("save"));
    }

    renderLeaderboard();
}

function reset() {
    secondsLeft = 30;
    questionIndex = 0;
    
    for (let i = 0; i < 4; i++) {
        buttons[i].textContent = questionSet[questionIndex].answers[i];
        // buttons[i].setAttribute("backgroundColor", "beige");
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