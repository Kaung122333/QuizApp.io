const question = document.querySelector('#question');
const answerButton = document.querySelector('#answer-button');
const nextButton = document.querySelector('#next-btn');
const goodText = document.querySelector(".good");


const questions = [
    {
        question: "Which one of the Following has Five Children?",
        answers: [
            {text: "Neymar", correct: false},
            {text: "Ronaldo", correct: true},
            {text: "Messic", correct: false},
            {text: "Mbappe", correct: false},
        ]
    },
    {
        question: "Which One of the Following Is The Best Football Player In The World?",
        answers: [
            {text: "Neymar", correct: false},
            {text: "Ronaldo", correct: true},
            {text: "Messic", correct: false},
            {text: "Mbappe", correct: false},
        ]
    },
    {
        question: "Which one of the following is NOT a football player?",
        answers: [
            {text: "Jerry Rice", correct: false},
            {text: "Novak Djokovic", correct: true},
            {text: "Thomas Müller", correct: false},
            {text: "Faiq Bolkiah ", correct: false},
        ]
    },
    {question: "Which one of the following Has Weakest Physical Strength?",
        answers: [
            {text: "Neymar", correct: true},
            {text: "Ronaldo", correct: false},
            {text: "Messic", correct: false},
            {text: "Mbappe", correct: false},
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    
}

function showQuestion() {
    //clear the previous question
    resetState();
    // show question
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;
    //show answer buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer );
    });


}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
    
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorret = selectedBtn.dataset.correct === "true";
    if (isCorret) {
        selectedBtn.classList.add("correct");
        score++;

    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length ) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
const quiz = document.querySelector('.quiz');

function showScore() {
    resetState();
    question.innerHTML = `You got ${score} scores out of ${questions.length} questions`;

    const goodText = document.createElement("h1"); // Create an "h1" element
    goodText.innerText = score === questions.length
        ? "Congrats! You got all the questions! You are Such a geek and have a lot of knowledge about football!"
        : "Don't Worry! It's okay to be wrong. You can try again; just don't give up~";
    goodText.classList.add("good");
    
    // Set an id for the created "h1" element
    goodText.id = "score-text"; // You can choose any id you like

    quiz.appendChild(goodText);
    nextButton.innerHTML = "Play Again";
    nextButton.addEventListener("click", () => {
        startQuiz();
        // Hide the "h1" element by its id when starting the quiz again
        const scoreText = document.getElementById("score-text");
        if (scoreText) {
            scoreText.style.display = "none";
        }
    });
    nextButton.style.display = "block";
}




startQuiz();