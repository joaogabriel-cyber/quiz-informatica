import { quizData } from "./quiz.js"

let startScreen, gameScreen, resultScreen, rankingScreen, difficultyScreen;
let startQuizBtn, playAgainQuizBtn, viewRankingBtn, backToHomeQuizBtn, backToHomeFromDifficultyBtn;
let playerNameInput, questionText, optionsContainer;
let questionCountText, quizScoreText, nextQuestionBtn;
let finalScoreDisplay, resultMessage, rankingList, explanationArea;
let playerGreetingName;
let difficultyButtons;

let playerName = '';
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let selectedDifficulty = '';

const QUESTIONS_PER_LEVEL = 10; 
const RANKING_STORAGE_KEY = 'quizRankingInfo';
const LEVELS = ["Básico", "Intermediário", "Avançado"];
let currentLevelIndex = 0; // controla o nível atual

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function switchScreen(screenToShow) {
    const screens = [startScreen, difficultyScreen, gameScreen, resultScreen, rankingScreen];
    screens.forEach(screen => {
        if (screen) screen.style.display = 'none';
    });
    if (screenToShow) screenToShow.style.display = 'flex';
}

function selectDifficultyScreen() {
    playerName = playerNameInput.value.trim() || 'Anônimo'; 
    playerGreetingName.textContent = playerName; 
    switchScreen(difficultyScreen);
}

function startQuiz(event) {
    const button = event.target.closest('.difficulty-btn');
    if (!button) return; 
    
    selectedDifficulty = button.dataset.difficulty; 
    currentLevelIndex = LEVELS.indexOf(selectedDifficulty);

    startNextLevel();
}

function startNextLevel() {
    currentQuestionIndex = 0;
    score = 0;
    quizScoreText.textContent = `Pontos: ${score}`;
    
    const filteredQuestions = quizData.filter(q => q.nivel === selectedDifficulty);
    shuffledQuestions = shuffleArray(filteredQuestions).slice(0, QUESTIONS_PER_LEVEL);
    
    playerGreetingName.textContent = playerName;
    switchScreen(gameScreen);
    loadQuestion();
}

function loadQuestion() {
    explanationArea.style.display = 'none'; 
    nextQuestionBtn.style.display = 'none';
    
    if (currentQuestionIndex >= shuffledQuestions.length) {
        return endGame();
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    questionCountText.textContent = `Pergunta ${currentQuestionIndex + 1}/${shuffledQuestions.length} (${selectedDifficulty})`; 
    questionText.textContent = currentQuestion.pergunta;

    const shuffledOptions = shuffleArray([...currentQuestion.opcoes]);
    optionsContainer.innerHTML = '';
    
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.dataset.answer = option;
        button.addEventListener('click', checkAnswer);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(event) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('.option-btn');
    
    options.forEach(btn => {
        btn.classList.add('disabled');
        btn.removeEventListener('click', checkAnswer);
    });

    const selectedOption = event.target;
    const answer = selectedOption.dataset.answer;
    const correctAnswer = currentQuestion.respostaCorreta;
    
    let isCorrect = (answer === correctAnswer);

    if (isCorrect) {
        score++;
        selectedOption.classList.add('correct');
        quizScoreText.textContent = `Pontos: ${score}`;
    } else {
        selectedOption.classList.add('wrong');
        options.forEach(btn => {
            if (btn.dataset.answer === correctAnswer) {
                 btn.classList.add('correct');
            }
        });

        explanationArea.innerHTML = `<strong>Resposta Correta:</strong> ${correctAnswer}<br>${currentQuestion.explanation}`;
        explanationArea.style.display = 'block';
    }

    setTimeout(() => {
        explanationArea.style.display = 'none';
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function endGame() {
    saveRanking();
    
    finalScoreDisplay.textContent = score;
    const totalQuestions = shuffledQuestions.length;
    
    if (score === totalQuestions) {
        resultMessage.textContent = `🏆 Fantástico! 100% de acertos (${score}/${totalQuestions}) no nível ${selectedDifficulty}!`;
    } else if (score >= totalQuestions * 0.7) {
        resultMessage.textContent = `✅ Ótimo trabalho no nível ${selectedDifficulty}! Você acertou ${score} de ${totalQuestions}.`;
    } else if (score >= totalQuestions * 0.4) {
        resultMessage.textContent = `👍 Bom começo! Você acertou ${score} de ${totalQuestions}.`;
    } else {
        resultMessage.textContent = `🤔 Você pode melhorar! Revise os conceitos do nível ${selectedDifficulty} e tente novamente.`;
    }

    const nextLevelBtn = document.getElementById('next-level-btn');
    if (currentLevelIndex < LEVELS.length - 1) {
        nextLevelBtn.style.display = 'block';
    } else {
        nextLevelBtn.style.display = 'none';
    }

    switchScreen(resultScreen);
}

function goToNextLevel() {
    currentLevelIndex++;
    if (currentLevelIndex < LEVELS.length) {
        selectedDifficulty = LEVELS[currentLevelIndex];
        startNextLevel();
    }
}

function getRanking() {
    const rankingString = localStorage.getItem(RANKING_STORAGE_KEY);
    return rankingString ? JSON.parse(rankingString) : [];
}

function saveRanking() {
    const ranking = getRanking();
    
    ranking.push({
        name: playerName,
        score: score,
        timestamp: new Date().toISOString(), 
        date: new Date().toLocaleDateString('pt-BR'),
        difficulty: selectedDifficulty
    });
    
    ranking.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return new Date(a.timestamp) - new Date(b.timestamp);
    });
    
    const topRanking = ranking.slice(0, 10);
    
    localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(topRanking));
}

function showRanking() {
    const ranking = getRanking();
    rankingList.innerHTML = '';
    
    if (ranking.length === 0) {
        rankingList.innerHTML = '<li>Nenhum recorde ainda. Seja o primeiro!</li>';
    }
    
    ranking.forEach((entry, index) => {
        let medal;
        switch(index){
            case 0: medal='🥇'; break;
            case 1: medal='🥈'; break;
            case 2: medal='🥉'; break;
            default: medal='🔹';
        }
        const li = document.createElement('li');
        li.innerHTML = `${medal} ${entry.name} (${entry.difficulty}) <span>${entry.score} Acertos - ${entry.date}</span>`; 
        rankingList.appendChild(li);
    });
    
    switchScreen(rankingScreen);
}

function resetToHome() {
    switchScreen(startScreen);
    playerNameInput.value = '';
}

function initializeQuiz() {
    startScreen = document.getElementById('start-screen');
    difficultyScreen = document.getElementById('difficulty-screen');
    gameScreen = document.getElementById('game-screen');
    resultScreen = document.getElementById('result-screen');
    rankingScreen = document.getElementById('ranking-screen');
    
    startQuizBtn = document.getElementById('start-quiz-btn');
    playAgainQuizBtn = document.getElementById('play-again-quiz-btn');
    viewRankingBtn = document.getElementById('view-ranking-btn');
    backToHomeQuizBtn = document.getElementById('back-to-home-quiz-btn');
    backToHomeFromDifficultyBtn = document.getElementById('back-to-home-from-difficulty');
    
    playerNameInput = document.getElementById('quiz-player-name');
    playerGreetingName = document.getElementById('player-greeting-name');
    difficultyButtons = document.querySelectorAll('.difficulty-btn');
    
    questionText = document.getElementById('question-text');
    optionsContainer = document.getElementById('options-container');
    questionCountText = document.getElementById('question-count');
    quizScoreText = document.getElementById('quiz-score');
    nextQuestionBtn = document.getElementById('next-question-btn');
    finalScoreDisplay = document.getElementById('final-score');
    resultMessage = document.getElementById('result-message');
    rankingList = document.getElementById('quiz-ranking-list');
    explanationArea = document.getElementById('explanation-area');

    startQuizBtn.addEventListener('click', selectDifficultyScreen);
    
    difficultyButtons.forEach(button => {
        button.addEventListener('click', startQuiz);
    });
    
    backToHomeFromDifficultyBtn.addEventListener('click', resetToHome);
    playAgainQuizBtn.addEventListener('click', selectDifficultyScreen); 
    nextQuestionBtn.addEventListener('click', nextQuestion);
    viewRankingBtn.addEventListener('click', showRanking);
    backToHomeQuizBtn.addEventListener('click', resetToHome);

    document.getElementById('next-level-btn').addEventListener('click', goToNextLevel);
    
    switchScreen(startScreen);
}

document.addEventListener('DOMContentLoaded', initializeQuiz);
