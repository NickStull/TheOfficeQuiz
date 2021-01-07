var mainDiv = document.getElementById("mainDiv");
mainDiv.setAttribute("style", "width: 60%; height: 100%; margin: auto; padding: 10px; border: 3px solid black");
var randQuestion = Math.floor(Math.random() * 4);
var score = 0
var timeLeft = 0

function onSiteLoaded() {
    loadQuizIntro();
}

function loadQuizIntro(){
    var h1El = document.createElement("h1");
    mainDiv.appendChild(h1El);
    h1El.textContent = "The Office TV Show Quiz";
    h1El.setAttribute("style", "text-align: center");

    var pEl = document.createElement("p");
    mainDiv.appendChild(pEl);
    pEl.textContent = "This is the hardest The Office quiz on the internet. You will have 60 seconds to answer as many questions as possible. Each question answered correct is 1 point. Each wrong answer is penalized with a 10 second penalty. GOOD LUCK!";
    pEl.setAttribute("style", "text-align: center");
    pEl.setAttribute("id", "pEl");

    var buttonEl = document.createElement("button");
    mainDiv.appendChild(buttonEl);
    buttonEl.textContent = "Start Quiz!";
    buttonEl.setAttribute("style", "display: block; margin: auto;");
    buttonEl.setAttribute("id", "startQuiz")

    var startQuiz = document.getElementById("startQuiz");
}

function countdown() {
    var pEl = document.getElementById("pEl");
    mainDiv.removeChild(pEl);

    var h2El = document.createElement("h2");
    mainDiv.appendChild(h2El);
    h2El.textContent = "3";
    h2El.setAttribute("style", "text-align: center")

    var startQuiz = document.getElementById("startQuiz");
    mainDiv.removeChild(startQuiz);

    var countdownSeconds = 3;
    var countdownInterval = setInterval(function() {
        countdownSeconds--;
        h2El.textContent = countdownSeconds;

        if(countdownSeconds === 0) {
            clearInterval(countdownInterval);
            mainDiv.removeChild(h2El);
            testQuiz();
        }
    }, 1000);
}

function testQuiz() {
    var quizDiv = document.createElement("div");
    mainDiv.appendChild(quizDiv);
    quizDiv.setAttribute("style", "background-color: teal; width: 90%; height: 300px; margin: auto; margin-bottom: 15px");
    quizDiv.setAttribute("id", "quizDiv");
    
    var quizQuestion = document.createElement("h2");
    quizDiv.appendChild(quizQuestion);
    quizQuestion.setAttribute("style", "text-align: center");
    quizQuestion.setAttribute("id", "quizQuestion");

    var buttonA = document.createElement("button");
    quizDiv.appendChild(buttonA);
    buttonA.setAttribute("style", "display: block; margin: auto;");
    buttonA.setAttribute("id", "optionA");

    var buttonB = document.createElement("button");
    quizDiv.appendChild(buttonB);
    buttonB.setAttribute("style", "display: block; margin: auto;");
    buttonB.setAttribute("id", "optionB");

    var buttonC = document.createElement("button");
    quizDiv.appendChild(buttonC);
    buttonC.setAttribute("style", "display: block; margin: auto;");
    buttonC.setAttribute("id", "optionC");

    var buttonD = document.createElement("button");
    quizDiv.appendChild(buttonD);
    buttonD.setAttribute("style", "display: block; margin: auto;");
    buttonD.setAttribute("id", "optionD");

    var scoreEl = document.createElement("span");
    quizDiv.appendChild(scoreEl);
    scoreEl.setAttribute("id", "quizScore");

    setTimer();
}

function setTimer() {
    var buttonA = document.getElementById("optionA");
    var buttonB = document.getElementById("optionB");
    var buttonC = document.getElementById("optionC");
    var buttonD = document.getElementById("optionD");
    var scoreEl = document.getElementById("quizScore");
    var timer = document.createElement("span");
    mainDiv.appendChild(timer)
    timeLeft = 60;
    timer.textContent = timeLeft
    scoreEl.textContent = score
    setQuestion();

    var timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--
            timer.textContent = timeLeft
            scoreEl.textContent = score
            buttonA.addEventListener("click", answerCheck)
            buttonB.addEventListener("click", answerCheck)
            buttonC.addEventListener("click", answerCheck)
            buttonD.addEventListener("click", answerCheck)
        }
        else {
            clearInterval(timerInterval);
            timeLeft = 0;
            timer.textContent = timeLeft;
            submitScore();
        }
    }, 1000);
}

function setQuestion(rand) {
    randQuestion = Math.floor(Math.random() * 4)
    var quizQuestion = document.getElementById("quizQuestion");
    var buttonA = document.getElementById("optionA");
    var buttonB = document.getElementById("optionB");
    var buttonC = document.getElementById("optionC");
    var buttonD = document.getElementById("optionD");
    quizQuestion.textContent = questions[randQuestion].question;
    buttonA.textContent = questions[randQuestion].choices[0];
    buttonB.textContent = questions[randQuestion].choices[1];
    buttonC.textContent = questions[randQuestion].choices[2];
    buttonD.textContent = questions[randQuestion].choices[3];
}

function answerCheck(e) {
    if (e.target.textContent === questions[randQuestion].answer) {
        console.log("CORRECT!");
        score++
    }
    else {
        console.log("FALSE!");
        timeLeft -= 5
    }
    setQuestion();
}

window.onload = onSiteLoaded();
startQuiz.addEventListener("click", countdown);

function submitScore() {
    console.log(score);
    var quizDiv = document.getElementById("quizDiv");
    while(quizDiv.firstChild) {
        quizDiv.removeChild(quizDiv.lastChild)
    }
    var scoreEl = document.createElement("h2");
    quizDiv.appendChild(scoreEl);
    scoreEl.textContent = score;

    var formEl = document.createElement("input");
    quizDiv.appendChild(formEl);
    formEl.setAttribute("type", "text");
    formEl.setAttribute("placeholder", "Enter Your Name Here!")

    var submitEl = document.createElement("input");
    quizDiv.appendChild(submitEl);
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("value", "Submit High Score!")
}

