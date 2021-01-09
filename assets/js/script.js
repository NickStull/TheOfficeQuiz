var mainDiv = document.getElementById("mainDiv");
    mainDiv.setAttribute("style", "width: 60%; height: 100%; margin: auto; padding: 10px; border: 3px solid black");
var headerEl = document.getElementById("header");
var randQuestion = Math.floor(Math.random() * 4);
var score = 0
var timeLeft = 0
var scoreList = [];
var num = [];

function onSiteLoaded() {
    mainDiv.innerHTML = "";
    if (localStorage.getItem("highScores") != null) {
        scoreList = JSON.parse(localStorage.getItem("highScores"));
    }
    loadQuizIntro();
}

function loadQuizIntro(){
    var qLink = document.createElement("a");
        headerEl.appendChild(qLink);
        qLink.textContent = "Quiz";
        qLink.setAttribute("href", ".");
        qLink.setAttribute("id", "qLink");

    var hsLink = document.createElement("a");
        headerEl.appendChild(hsLink);
        hsLink.textContent = "High Scores";
        hsLink.setAttribute("href", "#");
        hsLink.setAttribute("id", "hsLink");

    var h1El = document.createElement("h1");
        mainDiv.appendChild(h1El);
        h1El.textContent = "The Office TV Show Quiz";
        h1El.setAttribute("style", "text-align: center");

    var pEl = document.createElement("p");
        mainDiv.appendChild(pEl);
        pEl.textContent = "This is the hardest The Office quiz on the internet. You will have 60 seconds to answer as many questions as possible. Each question answered correct is 1 point. Each wrong answer is penalized with a 5 second penalty. GOOD LUCK!";
        pEl.setAttribute("style", "text-align: center");
        pEl.setAttribute("id", "pEl");

    var buttonEl = document.createElement("button");
        mainDiv.appendChild(buttonEl);
        buttonEl.textContent = "Start Quiz!";
        buttonEl.setAttribute("style", "display: block; margin: auto;");
        buttonEl.setAttribute("id", "startQuiz")
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
    quizDiv.setAttribute("style", "width: 90%; height: 100%; margin: auto; margin-bottom: 15px; padding-bottom: 20px");
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
    scoreEl.setAttribute("style", "display: block; text-align: center; padding: 30px")

    setTimer();
}

function setTimer() {
    var quizDiv = document.getElementById("quizDiv");
    var buttonA = document.getElementById("optionA");
    var buttonB = document.getElementById("optionB");
    var buttonC = document.getElementById("optionC");
    var buttonD = document.getElementById("optionD");
    var scoreEl = document.getElementById("quizScore");
    var timer = document.createElement("span");
    timer.setAttribute("style", "display: block; text-align: center;");
    timer.setAttribute("id", "timer")
    quizDiv.appendChild(timer)
    timeLeft = 60;
    timer.textContent = "TIME LEFT: " + timeLeft
    scoreEl.textContent = "Score: " + score
    setQuestion();

    var timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--
            timer.textContent = "TIME LEFT: " + timeLeft
            scoreEl.textContent = "Score: " + score
            buttonA.addEventListener("click", answerCheck)
            buttonB.addEventListener("click", answerCheck)
            buttonC.addEventListener("click", answerCheck)
            buttonD.addEventListener("click", answerCheck)
        }
        else {
            clearInterval(timerInterval);
            timeLeft = 0;
            timer.textContent = "TIME LEFT: " + timeLeft;
            submitScore();
        }
    }, 1000);
}

function setQuestion() {
    while (num.includes(randQuestion)){
        randQuestion = Math.floor(Math.random() * questions.length);
    }
    num.push(randQuestion);
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
    var scoreEl = document.getElementById("quizScore");
    var timer = document.getElementById("timer")
    if (e.target.textContent === questions[randQuestion].answer) {
        score++;
        scoreEl.textContent = "Score: " + score;
    }
    else {
        timeLeft -= 5
        if (timeLeft > 0) {
            timer.textContent = "TIME LEFT: " + timeLeft;
        }
        else {
            timer.textContent = "TIME LEFT: 0";
        };
    };
    setQuestion();
}

function submitScore() {
    var quizDiv = document.getElementById("quizDiv");
    quizDiv.innerHTML = ""

    var scoreEl = document.createElement("h2");
    quizDiv.appendChild(scoreEl);
    scoreEl.setAttribute("style", "text-align: Center");
    scoreEl.textContent = "Score: " + score;

    var formEl = document.createElement("input");
    quizDiv.appendChild(formEl);
    formEl.setAttribute("type", "text");
    formEl.setAttribute("placeholder", "Enter Your Name Here!");
    formEl.setAttribute("style", "display: block; margin: auto; padding: 10px");

    var submitEl = document.createElement("input");
    quizDiv.appendChild(submitEl);
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("value", "Submit High Score!");
    submitEl.setAttribute("style", "display: block; margin: auto; margin-top: 10px");

    submitEl.addEventListener("click", function(e) {
        e.preventDefault();
        var userName = formEl.value.trim()
        if (userName === "") {
            alert("Please enter your name or initials");
            return;
        }
        else {
            var currentScore = {
            name: userName,
            score: score
            };
            scoreList.push(currentScore); 
            scoreList.sort(function(a, b){
                return b.score - a.score
            });
            localStorage.setItem("highScores", JSON.stringify(scoreList));
            loadHighScores();
        }
    });
}

function loadHighScores() {
    var quizDiv = document.getElementById("quizDiv");
    quizDiv.innerHTML = ""
    var titleH1 = document.createElement("h1");
    quizDiv.appendChild(titleH1);
    titleH1.setAttribute("style", "text-align: center")
    titleH1.textContent = "High Scores"
    var scoreDiv = document.createElement("div");
    quizDiv.appendChild(scoreDiv);
    
    for (i=0; i < 5; i++) {
        var scoreH2 = document.createElement("h2");
        scoreDiv.appendChild(scoreH2);
        scoreH2.setAttribute("style", "text-align: center")
        scoreH2.innerHTML =  "Name:  " + scoreList[i].name + "   " + " -----> " + "Score:  " + "   " + scoreList[i].score + "<hr>"; 
    }

};

function highScoreLink(){
    mainDiv.innerHTML = "";
    var h1El = document.createElement("h1");
        mainDiv.appendChild(h1El);
        h1El.textContent = "The Office TV Show Quiz";
        h1El.setAttribute("style", "text-align: center");
    var quizDiv = document.createElement("div");
        mainDiv.appendChild(quizDiv);
        quizDiv.setAttribute("style", "width: 90%; height: 100%; margin: auto; margin-bottom: 15px; padding-bottom: 20px");
        quizDiv.setAttribute("id", "quizDiv");
    var titleH1 = document.createElement("h1");
        quizDiv.appendChild(titleH1);
        titleH1.setAttribute("style", "text-align: center")
        titleH1.textContent = "High Scores"
    var scoreDiv = document.createElement("div");
        quizDiv.appendChild(scoreDiv);
        
    for (i=0; i < 5; i++) {
        var scoreH2 = document.createElement("h2");
            scoreDiv.appendChild(scoreH2);
            scoreH2.setAttribute("style", "text-align: center")
            scoreH2.innerHTML =  "Name:  " + scoreList[i].name + "   " + " -----> " + "Score:  " + "   " + scoreList[i].score + "<hr>"; 
        }

}

window.onload = onSiteLoaded();
startQuiz.addEventListener("click", countdown);
hsLink.addEventListener("click", highScoreLink);