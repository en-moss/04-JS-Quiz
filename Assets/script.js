let questions = ['Commonly used data types DO NOT include:', 'The condition in an if/else statement is enclosed within ______.', 'Arrays in JavaScript can be used to store _______.', 'String values must be enclosed within ______ when being assigned to variables.', 'A very useful tool used during development and debugging for printing content to the debugger is:'];

let answers = [
    ['strings', 'booleans', 'alerts', 'numbers'],
    ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    ['JavaScript', 'terminal bash', 'for loops', 'console.log']
];

let correctAns = ['alerts', 'curly brackets', 'all of the above', 'quotes', 'console.log'];

let score = 0;
let secondsLeft = 20;
let count = 0;
let timer;

let landingPage = document.getElementById('landingPage');
let timerEl = document.getElementById('timer');
let secondsEl = document.getElementById('seconds');
let quizPage = document.getElementById('quizPage');
let donePage = document.getElementById('donePage');
let scoresPage = document.getElementById('scoresPage');
let beginButton = document.getElementById('begin');
let optionsEl = document.getElementById('options');
let quizQ = document.getElementById('quiz-q');
let scoreBlock = document.getElementById('score-keep');
let curScoreEl = document.getElementById('cur-score');
let finalScoreEl = document.getElementById('final-score');
let submitEl = document.getElementById('submit');

beginButton.addEventListener('click', beginGame);

function beginGame() {
    landingPage.setAttribute('class', 'vanish');
    quizPage.setAttribute('class', '');
    timerEl.setAttribute('class', 'timer-style');
    scoreBlock.setAttribute('class', 'score-style');
    curScoreEl.textContent = score;
    ansIterate();
    timer = setInterval(tickTock, 1000);
};

function tickTock() {
    secondsLeft--;
    secondsEl.textContent = secondsLeft;

    // if (secondsLeft < 10) {
    //     danger();
    // };

    if (secondsLeft <= 0) {
    secondsLeft = 0;
    clearInterval(timer);
    };
};

// function danger() {
//     setInterval(function() {
//         if (timerEl.style.color = rgb(103, 255, 0)) {
//             timerEl.style.backgroundColor = 'red';
//             timerEl.style.color = 'black';
//         }
//         else {
//             timerEl.style.backgroundColor = '';
//             timerEl.style.color = rgb(103, 255, 0);
//         };
//     }, 500);
// };

function scoreKeep() {
    score += 5 + 0.25 * secondsLeft;
    curScoreEl.textContent = score;
    return score;
}

function ansIterate () {
    for (var i = 0; i < answers[count].length; i++) {
        quizQ.innerHTML = questions[count];
        optionsEl.children[i].innerHTML = answers[count][i];
    };
};


optionsEl.addEventListener('click', compare);

function compare(e) {
    //compares whether the button pressed matches the correct answer
    if (e.target.innerHTML === correctAns[count]) {
        scoreKeep();
    }
    else {
        secondsLeft -= 10;
    };
    count++;

    if (count > 4 || secondsLeft <= 0) {
        quizPage.setAttribute('class', 'vanish');
        donePage.setAttribute('class', '');
        finalScoreEl.textContent = 'Your final score is: ' + score;
    }
    else {
        ansIterate();
    };
};

// submitEl.addEventListener('click', #)