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
        correctAnswer: "script",
        answers: ["script", "link", "a", "all of the above", "none of the above"]
    },
    {
        question: "Which is not a primitive data type?",
        correctAnswer: "bologne",
        answers: ["boolean", "number", "String", "bologne", "all of these are primitive data types"]
    },
    {
        question: "What do you put directly after a the function name to hold stuff?",
        correctAnswer: "parenthesis",
        answers: ["brackets[]", "parenthesis()", "curly braces{}", "all of the above","none of the above"]
    }
];


var clock = document.getElementById("timer");
var start = document.getElementById("start");
var question = document.getElementById("question");
var ansOne = document.getElementById("answer1");
var ansTwo = document.getElementById("answer2");
var ansThree = document.getElementById("answer3");
var ansFour = document.getElementById("answer4");
var welcomeScreen = document.getElementById("welcomeScreen");
var end = docuemnt.getElementById("endScreen");

var secondsLeft = 30;
var timerInterval;


    // Click the start button 
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

function setQuestion() {
    // TODO: for loop for x many questions
    for (var i = 0; i < questionSet.length; i++) {
    //     Pull in question data and add it to question box
        question.textContent = questionSet[i].question;
    //     Pull in multiple choice options and add it
        
    //     User selects a choice
    //     if wrong
    //         deduct time for unique wrong answer
    //         have some visual that it was wrong
    //     else
    //         nothing I guess

    }
}


function end() {
  clock.textContent = "PUT DOWN YOUR PENCILS";
  
    // high score page appears
    // asks user for name
    // record their score with play again button
}



    

