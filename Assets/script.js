let questions = ['Commonly used data types DO NOT include:', 'The condition in an if/else statement is enclosed within ______.', 'Arrays in JavaScript can be used to store _______.', 'String values must be enclosed within ______ when being assigned to variables.', 'A very useful tool used during development and debugging for printing content to the debugger is:'];

let answers = [
    ['strings', 'booleans', 'alerts', 'numbers'],
    ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    ['JavaScript', 'terminal bash', 'for loops', 'console.log']
];

let correctAns = ['alerts', 'curly brackets', 'all of the above', 'quotes', 'console.log'];

let score;
let secondsLeft;
let count;
let timer;
let gamesPlayed;

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
let initials = document.getElementById('initials');
let highScoreEl = document.getElementById('high-scores');
let replayEl = document.getElementById('replay');
let clearEl = document.getElementById('clear');
let rightWrong = document.getElementById('right-wrong');

beginButton.addEventListener('click', beginGame);

function beginGame() {
    landingPage.setAttribute('class', 'vanish');
    quizPage.setAttribute('class', '');
    timerEl.setAttribute('class', 'timer-style');
    scoreBlock.setAttribute('class', 'score-style');
    score = 0;
    secondsLeft = 30;
    count = 0;
    curScoreEl.textContent = score;
    ansIterate();
    timer = setInterval(tickTock, 1000);
};

function tickTock() {
    secondsLeft--;
    secondsEl.textContent = secondsLeft;

    if (secondsLeft < 10) {
        timerEl.style.backgroundColor = 'red';
        timerEl.style.color = 'black';
    }
    else {
        timerEl.style.backgroundColor = '';
        timerEl.style.color = '';
    };

    if (secondsLeft <= 0) {
    secondsLeft = 0;
    secondsEl.textContent = secondsLeft;
    clearInterval(timer);
    };
    if (secondsLeft === 0) {
        quizPage.setAttribute('class', 'vanish');
        donePage.setAttribute('class', '');
        finalScoreEl.textContent = 'Your final score is: ' + score;
        timerEl.setAttribute('class', 'vanish');
        scoreBlock.setAttribute('class', 'vanish');
    };
};

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
        rightWrong.setAttribute('class', 'right-wrong');
        rightWrong.textContent = 'Correct!';
        setTimeout(function() {
            rightWrong.setAttribute('class', 'vanish');
        }, 600);
    }
    else {
        secondsLeft -= 10;
        rightWrong.setAttribute('class', 'right-wrong');
        rightWrong.textContent = 'Wrong!';
        setTimeout(function() {
            rightWrong.setAttribute('class', 'vanish');
        }, 600);
    };
    count++;

    if (count > questions.length - 1) {
        quizPage.setAttribute('class', 'vanish');
        donePage.setAttribute('class', '');
        finalScoreEl.textContent = 'Your final score is: ' + score;
        secondsLeft = 0;
        timerEl.setAttribute('class', 'vanish');
        clearInterval(timer);
        scoreBlock.setAttribute('class', 'vanish');
    }
    else {
        ansIterate();
    };
};

submitEl.addEventListener('click', function() {
    saveScores();
    trackScores();
})

function saveScores() {
    if (!initials.value) {
        window.alert("You must enter your initials");
        return;
    };

    let highScore = {
        initials: initials.value.trim(),
        score: score
    };
    
    if (JSON.parse(localStorage.getItem('data')) == null) {
        localStorage.setItem('data', '[]');
    }
    
    let scoreData = JSON.parse(localStorage.getItem('data'));
    scoreData.push(highScore);
    localStorage.setItem('data', JSON.stringify(scoreData));

    donePage.setAttribute('class', 'vanish');
    scoresPage.setAttribute('class', '');
};

function trackScores() {
    gamesPlayed = JSON.parse(localStorage.getItem('gameCount'));
    
    if (JSON.parse(localStorage.getItem('gameCount')) == null) {
        gamesPlayed = 0;
    }
    else {
        gamesPlayed = JSON.parse(localStorage.getItem('gameCount'));
    };

    while (highScoreEl.firstChild) {
        highScoreEl.removeChild(highScoreEl.lastChild);
    };

    for (i = 0; i < gamesPlayed+1; i++) {
        let prevScore = JSON.parse(localStorage.getItem('data'));
        let tag = document.createElement('p');
        tag.textContent = i+1 + '. ' + prevScore[i].initials + " " + prevScore[i].score;
        highScoreEl.appendChild(tag);
    };
    gamesPlayed++;
    localStorage.setItem('gameCount', JSON.stringify(gamesPlayed));
};

replayEl.addEventListener('click', replay);
clearEl.addEventListener('click', clear);

function replay() {
    scoresPage.setAttribute('class', 'vanish');
    beginGame();
};

function clear() {
    localStorage.removeItem('gameCount');
    localStorage.removeItem('data');
    while (highScoreEl.firstChild) {
        highScoreEl.removeChild(highScoreEl.lastChild);
    }
}