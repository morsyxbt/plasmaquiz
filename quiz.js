const questions = [
    {
        question: "Plasma operates on a blockchain layer best described as",
        options: [
            { text: "Settlement-focused Layer 2", correct: false },
            { text: "Stablecoin-optimized Layer 1", correct: true },
            { text: "ZK-based Layer 3", correct: false },
            { text: "Modular execution layer", correct: false }
        ]
    },
    {
        question: "What's Plasma's transaction fees for USD₮ transfers?",
        options: [
            { text: "Capped at 0.1%", correct: false },
            { text: "Paid in a native token", correct: false },
            { text: "Completely free", correct: true },
            { text: "Fixed at $0.01", correct: false }
        ]
    },
    {
        question: "Plasma has a TPS of",
        options: [
            { text: "Over 1,000", correct: true },
            { text: "Around 100", correct: false },
            { text: "Exactly 500", correct: false },
            { text: "Over 10,000", correct: false }
        ]
    },
    {
        question: "The average time to produce a new Plasma block is",
        options: [
            { text: "~0.9 seconds", correct: true },
            { text: "~2 seconds", correct: false },
            { text: "~5 seconds", correct: false },
            { text: "~0.1 seconds", correct: false }
        ]
    },
    {
        question: "Which of these is among Plasma’s institutional supporters?",
        options: [
            { text: "Binance Labs", correct: false },
            { text: "DRW", correct: true },
            { text: "Paradigm", correct: false },
            { text: "Alameda Research", correct: false }
        ]
    },
    {
        question: "Plasma’s payment network is supported in over ___ countries:",
        options: [
            { text: "50", correct: false },
            { text: "75", correct: false },
            { text: "100", correct: true },
            { text: "150", correct: false }
        ]
    },
    {
        question: "Total value of stablecoin deposits on Plasma’s network is reported to be",
        options: [
            { text: "$500 million", correct: false },
            { text: "$1 billion", correct: true },
            { text: "$5 billion", correct: false },
            { text: "$10 billion", correct: false }
        ]
    },
    {
        question: "Plasma is most focused on facilitating what category of digital assets?",
        options: [
            { text: "Stablecoins", correct: true },
            { text: "NFTs", correct: false },
            { text: "Game tokens", correct: false },
            { text: "Wrapped assets", correct: false }
        ]
    },
    {
        question: "The number of payment methods supported by Plasma surpasses",
        options: [
            { text: "100", correct: false },
            { text: "150", correct: false },
            { text: "200", correct: true },
            { text: "300", correct: false }
        ]
    },
    {
        question: "Developer tooling on Plasma is primarily built to support",
        options: [
            { text: "DeFi lending apps", correct: false },
            { text: "Stablecoin-focused applications", correct: true },
            { text: "NFT marketplaces", correct: false },
            { text: "Gaming protocols", correct: false }
        ]
    }
];

// Quiz logic implementation
let currentQuestion = 0;
let score = 0;
let timer = null;
let timeLeft = 15;

const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress-bar');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const timerDisplay = document.getElementById('timer-display');
const resultsModal = document.getElementById('results-modal');
const resultsContent = document.getElementById('results-content');
const finalScore = document.getElementById('final-score');
const totalScore = document.getElementById('total-score');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');

function shuffleQuestions(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function startQuiz() {
    shuffleQuestions(questions);
    currentQuestion = 0;
    score = 0;
    totalQuestionsSpan.textContent = questions.length;
    showQuestion();
}

function showQuestion() {
    resetState();
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    q.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-xl text-lg font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-150 option-btn flex items-center justify-between';
        btn.innerHTML = `<span>${option.text}</span><span class="icon-container"></span>`;
        btn.onclick = () => selectAnswer(btn, option.correct, idx);
        answerOptions.appendChild(btn);
    });
    currentQuestionSpan.textContent = currentQuestion + 1;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    startTimer();
    nextBtn.disabled = true;
    submitBtn.disabled = true;
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
    if (currentQuestion === questions.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        submitBtn.textContent = 'Submit';
    } else {
        submitBtn.textContent = 'See Results';
    }
}


function resetState() {
    while (answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild);
    }
    clearInterval(timer);
}

function selectAnswer(btn, isCorrect, selectedIdx) {
    Array.from(answerOptions.children).forEach((child, idx) => {
        child.disabled = true;
        child.classList.remove('bg-blue-50', 'border-blue-400', 'bg-green-200', 'bg-red-200', 'selected-answer', 'correct-answer', 'wrong-answer', 'opacity-60');
        // Remove any previous icon
        let icon = child.querySelector('.icon-container');
        if (icon) icon.innerHTML = '';
        child.classList.add('opacity-60');
    });
    if (isCorrect) {
        btn.classList.add('selected-answer');
        let icon = btn.querySelector('.icon-container');
        if (icon) icon.innerHTML = '<svg class="inline ml-2" width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#b6f2d7"/><path d="M8 12.5l3 3 5-5.5" stroke="#1C7C54" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        score++;
    } else {
        btn.classList.add('wrong-answer');
        let icon = btn.querySelector('.icon-container');
        if (icon) icon.innerHTML = '<svg class="inline ml-2" width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M8 8l8 8M16 8l-8 8" stroke="#e57373" stroke-width="2.2" stroke-linecap="round"/></svg>';
        // Highlight the correct answer
        Array.from(answerOptions.children).forEach((child, idx) => {
            if (questions[currentQuestion].options[idx].correct) {
                child.classList.add('correct-answer');
                let icon = child.querySelector('.icon-container');
                if (icon) icon.innerHTML = '<svg class="inline ml-2" width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1C7C54"/><path d="M8 12.5l3 3 5-5.5" stroke="#E8F5E9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            }
        });
    }
    nextBtn.disabled = false;
    submitBtn.disabled = false;
    clearInterval(timer);
    // No auto-advance. User must click Next or Submit to proceed.
}

function startTimer() {
    timerDisplay.classList.remove('timer-blink', 'timer-critical');
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        // Blinking and red logic
        timerDisplay.classList.remove('timer-blink');
        if (timeLeft <= 8) {
            timerDisplay.classList.add('timer-blink');
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerDisplay.classList.remove('timer-blink', 'timer-critical');
            selectAnswer(answerOptions.children[0], false); // auto-select first option
        }
    }, 1000);
}

nextBtn.onclick = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
};

submitBtn.onclick = () => {
    showResults();
};

function showResults() {
    finalScore.textContent = score;
    totalScore.textContent = questions.length;
    let message = '';
    const percent = (score / questions.length) * 100;
    if (percent === 100) message = 'Perfect Score! Plasma Pro!';
    else if (percent >= 80) message = 'Excellent!';
    else if (percent >= 60) message = 'Good Job!';
    else if (percent >= 40) message = 'Keep Practicing!';
    else message = 'Try Again!';
    scoreMessage.textContent = message;
    resultsModal.classList.remove('hidden');
    setTimeout(() => {
        resultsContent.classList.remove('scale-95', 'opacity-0');
        resultsContent.classList.add('scale-100', 'opacity-100');
    }, 50);
}

restartBtn.onclick = () => {
    resultsModal.classList.add('hidden');
    resultsContent.classList.remove('scale-100', 'opacity-100');
    resultsContent.classList.add('scale-95', 'opacity-0');
    startQuiz();
};

document.addEventListener('DOMContentLoaded', function() {
    var startModal = document.getElementById('start-modal');
    var quizContainer = document.getElementById('quiz-container');
    var startBtn = document.getElementById('start-quiz-btn');
    if (startModal && quizContainer && startBtn) {
        quizContainer.style.display = 'none';
        startModal.style.display = 'flex';
        startBtn.onclick = function() {
            startModal.style.display = 'none';
            quizContainer.style.display = '';
            startQuiz();
        };
    } else {
        // fallback: if modal not present, just start quiz
        startQuiz();
    }
});
