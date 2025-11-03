import { quizData } from "./quiz.js"

// =======================================================
// 1. VARIÁVEIS DE ESTADO E REFERÊNCIAS GLOBAIS
// =======================================================
const RANKING_STORAGE_KEY = 'quizRankingScores'; 

let filteredQuestions = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let playerName = "Jogador";
let isAnswered = false; // Impede múltiplos cliques por pergunta
let userErrors = []; // Array para armazenar as perguntas erradas

// Referências às telas e elementos de controle
const startScreen = document.getElementById('start-screen');
const difficultyScreen = document.getElementById('difficulty-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const rankingScreen = document.getElementById('ranking-screen');
const reviewScreen = document.getElementById('review-screen');

// Referências de Elementos do Jogo
const playerGreetingName = document.getElementById('player-greeting-name');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const explanationArea = document.getElementById('explanation-area');
const nextQuestionBtn = document.getElementById('next-question-btn');
const questionCount = document.getElementById('question-count');
const quizScoreDisplay = document.getElementById('quiz-score');
const viewMistakesBtn = document.getElementById('view-mistakes-btn'); 
// Variável global 'nextLevelBtn' que será usada
const nextLevelBtn = document.getElementById('next-level-btn'); 

// Referências da Tela de Revisão e Ranking
const reviewList = document.getElementById('review-list'); 
const quizRankingList = document.getElementById('quiz-ranking-list'); 
const resetRankingBtn = document.getElementById('reset-ranking-btn'); 
const backToResultsBtn = document.getElementById('back-to-results-btn');


// =======================================================
// 2. FUNÇÕES DE NAVEGAÇÃO ENTRE TELAS
// =======================================================

function showScreen(screenId) {
    // Esconde todas as telas
    const screens = [startScreen, difficultyScreen, gameScreen, resultScreen, rankingScreen, reviewScreen];
    screens.forEach(screen => {
        if (screen) screen.style.display = 'none';
    });

    // Mostra a tela desejada
    const screenElement = document.getElementById(screenId);
    if (screenElement) screenElement.style.display = 'flex';
}

function startQuizHandler() {
    const nameInput = document.getElementById('quiz-player-name').value;
    playerName = nameInput || "Jogador";
    playerGreetingName.textContent = playerName;
    showScreen('difficulty-screen');
}

function startLevel(difficulty) {
    // 1. Filtra as perguntas
    filteredQuestions = quizData.filter(q => q.nivel === difficulty);
    
    // 2. Reseta o estado do jogo e erros
    currentQuestionIndex = 0;
    currentScore = 0;
    userErrors = []; // Limpa o array de erros
    quizScoreDisplay.textContent = `Pontos: ${currentScore}`;

    // 3. Inicia o jogo
    showScreen('game-screen');
    loadQuestion();
}

// =======================================================
// 2. FUNÇÕES DE NAVEGAÇÃO ENTRE TELAS
// =======================================================

// ... (outras funções da Seção 2)

function finishQuiz() {
    // 1. Salva a pontuação no localStorage
    saveScore(); 
    
    // 2. Lógica para ir para a tela de resultados
    document.getElementById('final-score').textContent = currentScore;
    
    // 3. Mostra/Esconde o botão "Ver Meus Erros" baseado na contagem de erros
    if (viewMistakesBtn) {
        viewMistakesBtn.style.display = userErrors.length > 0 ? 'block' : 'none';
    }
    
    // 4. LÓGICA CORRIGIDA: O botão aparece sempre que o quiz termina,
    //    sem depender da pontuação (acertos >= 7).
    const currentLevel = filteredQuestions.length > 0 ? filteredQuestions[0].nivel : null;
    
    if (nextLevelBtn) {
        if (currentLevel === "Básico") {
            // Sempre avança do Básico para o Intermediário
            nextLevelBtn.style.display = 'block';
            nextLevelBtn.textContent = 'Avançar para INTERMEDIÁRIO';
        } else if (currentLevel === "Intermediário") {
            // Sempre avança do Intermediário para o Avançado
            nextLevelBtn.style.display = 'block';
            nextLevelBtn.textContent = 'Avançar para AVANÇADO';
        } 
        else {
            // Se for o nível Avançado (último), esconde o botão
            nextLevelBtn.style.display = 'none';
        }
    }

    showScreen('result-screen');
}

// ... (resto da Seção 2)

// =======================================================
// 3. LÓGICA DO JOGO (PERGUNTA E RESPOSTA)
// =======================================================

function loadQuestion() {
    if (currentQuestionIndex >= filteredQuestions.length) {
        finishQuiz();
        return;
    }

    isAnswered = false;
    const currentItem = filteredQuestions[currentQuestionIndex];
    
    optionsContainer.innerHTML = '';
    explanationArea.style.display = 'none';
    explanationArea.innerHTML = '';
    nextQuestionBtn.style.display = 'none';

    questionCount.textContent = `Pergunta ${currentQuestionIndex + 1}/${filteredQuestions.length}`;
    questionText.textContent = currentItem.pergunta;

    currentItem.opcoes.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, currentItem, button));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, currentItem, clickedButton) {
    if (isAnswered) return;
    isAnswered = true;

    Array.from(optionsContainer.children).forEach(btn => btn.classList.add('disabled'));

    if (selectedOption === currentItem.respostaCorreta) {
        clickedButton.classList.add('correct');
        currentScore++;
        quizScoreDisplay.textContent = `Pontos: ${currentScore}`;

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);

    } else {
        clickedButton.classList.add('wrong');

        userErrors.push({
            pergunta: currentItem.pergunta,
            respostaSelecionada: selectedOption,
            respostaCorreta: currentItem.respostaCorreta,
            explanation: currentItem.explanation
        });

        Array.from(optionsContainer.children).forEach(btn => {
            if (btn.textContent === currentItem.respostaCorreta) {
                btn.classList.add('correct');
            }
        });

        explanationArea.innerHTML = `<strong>Resposta Incorreta!</strong><br>${currentItem.explanation}`;
        explanationArea.style.display = 'block';
        nextQuestionBtn.style.display = 'block';
    }
}


// =======================================================
// 4. FUNÇÃO: REVISÃO DE ERROS (GABARITO)
// =======================================================

function showReviewScreen() {
    showScreen('review-screen');
    reviewList.innerHTML = ''; 

    if (userErrors.length === 0) {
        reviewList.innerHTML = '<li class="review-item"><p>🎉 Você não cometeu erros nesta fase!</p></li>';
        return;
    }

    userErrors.forEach((error, index) => {
        const item = document.createElement('li');
        item.classList.add('review-item');
        item.innerHTML = `
            <div class="review-header">
                <strong>Erro #${index + 1}:</strong> ${error.pergunta}
            </div>
            <div class="review-details">
                <p class="wrong-answer">Sua Resposta: <span>${error.respostaSelecionada}</span></p>
                <p class="correct-answer">Correta: <span>${error.respostaCorreta}</span></p>
                <p class="explanation-text">Detalhes: ${error.explanation}</p>
            </div>
        `;
        reviewList.appendChild(item);
    });
}


// =======================================================
// 5. LÓGICA DE RANKING (SALVAMENTO, EXIBIÇÃO E RESET)
// =======================================================

function getRanking() {
    const rankingString = localStorage.getItem(RANKING_STORAGE_KEY);
    return rankingString ? JSON.parse(rankingString) : [];
}

function saveScore() {
    const ranking = getRanking();

    const newScore = {
        name: playerName,
        score: currentScore,
        date: new Date().toLocaleString('pt-BR')
    };
    
    ranking.push(newScore);
    ranking.sort((a, b) => b.score - a.score); 

    const topRanking = ranking.slice(0, 10);

    localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(topRanking));
}

function displayRanking() {
    showScreen('ranking-screen');
    quizRankingList.innerHTML = '';
    const ranking = getRanking();

    if (ranking.length === 0) {
        quizRankingList.innerHTML = '<li class="ranking-item empty-ranking">Nenhuma pontuação registrada ainda. Jogue para começar!</li>';
        return;
    }

    ranking.forEach((entry, index) => {
        const item = document.createElement('li');
        const position = index + 1;
        
        item.innerHTML = `
            <span>#${position} - <strong>${entry.name}</strong></span>
            <span>${entry.score} Pontos</span>
        `;
        
        item.classList.add('ranking-item');
        if (position === 1) {
            item.classList.add('top-score');
        }
        quizRankingList.appendChild(item);
    });
}

function resetRanking() {
    const confirmReset = confirm("Tem certeza que deseja apagar todos os placares do ranking? Esta ação é irreversível!");
    
    if (confirmReset) {
        localStorage.removeItem(RANKING_STORAGE_KEY);
        displayRanking(); 
        alert("Ranking resetado com sucesso!");
    }
}


// =======================================================
// 6. EVENT LISTENERS
// =======================================================

// Botão Iniciar (Tela 1 -> Tela 2)
document.getElementById('start-quiz-btn').addEventListener('click', startQuizHandler);

// Botões de Nível (Tela 2 -> Tela 3)
document.querySelectorAll('.difficulty-btn').forEach(button => {
    button.addEventListener('click', (e) => startLevel(e.currentTarget.dataset.difficulty));
});

// Botão Voltar ao Início da tela de dificuldade
document.getElementById('back-to-home-from-difficulty').addEventListener('click', () => showScreen('start-screen'));

// Botão de Próxima Pergunta
nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

// Botão Tentar Novamente (Tela Resultados -> Tela Início)
document.getElementById('play-again-quiz-btn').addEventListener('click', () => showScreen('start-screen')); 

// Botão Ver Erros/Revisão (Tela Resultados -> Tela Revisão)
if (viewMistakesBtn) {
    viewMistakesBtn.addEventListener('click', showReviewScreen);
}

// Botão Voltar da Revisão (Tela Revisão -> Tela Resultados)
const backFromReviewBtn = document.getElementById('back-from-review-btn');
if (backFromReviewBtn) {
    backFromReviewBtn.addEventListener('click', () => showScreen('result-screen'));
}

// Botão Ver Ranking (Tela Resultados -> Tela Ranking)
document.getElementById('view-ranking-btn').addEventListener('click', displayRanking); 

// 🎯 CORREÇÃO AQUI: Usa a variável global nextLevelBtn (já declarada em 1)
if (nextLevelBtn) {
    nextLevelBtn.addEventListener('click', () => {
        const currentLevel = filteredQuestions.length > 0 ? filteredQuestions[0].nivel : null;
        let nextLevel = '';
        if (currentLevel === 'Básico') nextLevel = 'Intermediário';
        else if (currentLevel === 'Intermediário') nextLevel = 'Avançado';
        
        if (nextLevel) {
            startLevel(nextLevel);
        } else {
            alert('Parabéns! Você completou todos os níveis!');
            showScreen('start-screen');
        }
    });
}

// Botão Resetar Ranking
if (resetRankingBtn) {
    resetRankingBtn.addEventListener('click', resetRanking);
}

// Botão Voltar aos Resultados (Tela Ranking -> Tela Resultados)
if (backToResultsBtn) {
    backToResultsBtn.addEventListener('click', () => showScreen('result-screen'));
}

// Inicia a aplicação na tela inicial
showScreen('start-screen');