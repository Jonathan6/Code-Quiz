// Acceptance Criteria
// GIVEN I am taking a code quiz
// WHEN I click the start button THEN a timer starts and I am presented with a question
// WHEN I answer a question THEN I am presented with another question
// WHEN I answer a question incorrectly THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0 THEN the game is over
// WHEN the game is over THEN I can save my initials and my score
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
        question: "What do you put directly after a the function name to hold stuff?",
        correctAnswerIndex: 1,
        answers: ["brackets[]", "parenthesis()", "curly braces{}", "all of the above","none of the above"]
    }
];

var buttons = [ document.getElementById("answer1"),
                document.getElementById("answer2"),
                document.getElementById("answer3"),
                document.getElementById("answer4")
            ];

var clock = document.getElementById("timer");
var start = document.getElementById("start");
var question = document.getElementById("question");
var answerBox = document.getElementById("answerBox");
var welcomeScreen = document.getElementById("welcomeScreen");
var end = document.getElementById("endScreen");

var questionIndex = 0;
var secondsLeft = 30;
var timerInterval;



 
start.addEventListener("click", function() {
    timerInterval = setInterval(function() {
        // secondsLeft--;
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

answerBox.addEventListener("click", function(e) {
    //  TODO: deduct time if wrong, add points if right
    if (e.target.dataset.correct === "true") {
        //  They got it correct
        //  Render the next question
        //  I have an idea but it might get messy


        // console.log(e.target);
        // startPoint();
    } else {
        // They did not get it correct
        // Deduct time
        // Add red background to the div with wrong answer

        console.log(e.target);
        secondsLeft = secondsLeft - 3;
        e.target.style.backgroundColor = "red";
        e.target.dataset.state = "shown";
        currentText = e.target.textContent;
        e.target.textContent = currentText + " is incorrect";
    }
});

function startPoint() {
    //  Renders the first question onto the page
    if (questionSet[questionIndex] != undefined) {
        render(questionIndex);
    } else {
        // end();
    }
}


function render(index) {
    //  Sets the question
    question.textContent = questionSet[index].question;
    var answerIndex = questionSet[index].correctAnswerIndex;

    //  Sets the answer options, background color, if selected
    for (let i = 0; i < 4; i++) {
        buttons[i].textContent = questionSet[index].answers[i];
        // buttons[i].setAttribute("backgroundColor", "beige");
        buttons[i].style.backgroundColor = "beige";
        buttons[i].dataset.state = "hidden";
        //Sets data value of the answer
        if (i === answerIndex) {
            buttons[i].dataset.correct = true;
        } else {
            buttons[i].dataset.correct = false;
        }
        console.log(buttons[i]);
    }
}


function endPoint() {
    clock.textContent = "PUT DOWN YOUR PENCILS";
    secondsLeft = 30;
    questionIndex = 0;
    //  TODO: high score page appears
    //  TODO: button box disappears
    //  TODO: asks user for name
    //  TODO: record their score
    //  TODO: play again button
    //  TODO: breakdown of their score
  }