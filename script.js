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
        correctAnswer: 1,
        answers: ["script", "link", "a", "all of the above", "none of the above"]
    },
    {
        question: "Which is not a primitive data type?",
        correctAnswer: 4,
        answers: ["boolean", "number", "String", "bologne", "all of these are primitive data types"]
    },
    {
        question: "What do you put directly after a the function name to hold stuff?",
        correctAnswer: 2,
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

var secondsLeft = 30;
var timerInterval;



 
start.addEventListener("click", function() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        clock.textContent = (secondsLeft + " seconds left");
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            end();
        }
    }, 1000);
    // TODO: The front main page disappears 
    // TODO: The question and input div boxes appear 
    testing();
});

answerBox.addEventListener("click", function(e) {
    console.log(e.currentTarget.dataset.correct);
    // if (e.currentTarget.dataset.correct) {
        //  They got it correct
    // } else {
        // They did not get it correct
        // Deduct time
        // Add red background to the div with wrong answer
    // }
});

function testing() {
    //  Adds the current question with answers to the page
    for (var i = 0; i < questionSet.length; i++) {
        render(i);
    }
}


function render(index) {
    //  Sets the question
    question.textContent = questionSet[index].question;

    //  Sets the answer options, background color, if selected
    for (let i = 0; i < 4; i++) {
        buttons[i] = questionSet[i].answers[i];
        buttons[i].style.backgroundColor = "beige";
        buttons[i].dataset.state = "hidden";
        //Sets data value of the answer
        if (i === questionSet[index].correctAnswer) {
            buttons[i].dataset.correct = true;
        } else {
            buttons[i].dataset.correct = false;
        }
    }
}


function end() {
    clock.textContent = "PUT DOWN YOUR PENCILS";
    secondsLeft = 30;
    //  high score page appears
    //  button box disappears
    //  asks user for name
    //  record their score
    //  play again button
    //  breakdown of their score
  }