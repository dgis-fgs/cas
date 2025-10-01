// База вопросов по умолчанию
let questions = [
    {
        id: 1,
        competence: "Нацеленность на результат",
        scenario: "Важному клиенту нужно предоставить итоговый отчёт завтра к 9:00. В 18:00 вы обнаруживаете критическую ошибку в данных, которую невозможно исправить автоматически. Команда уже устала и готовится уходить.",
        question: "Опишите ваши действия в этой ситуации:"
    },
    {
        id: 2,
        competence: "Ориентация на качество",
        scenario: "Вы замечаете, что коллега постоянно использует устаревший шаблон для документов, из-за чего команда тратит дополнительное время на правки. Коллега работает в компании 15 лет и сопротивляется нововведениям.",
        question: "Как вы поступите в этой ситуации?"
    }
    // ... добавьте остальные 12 вопросов
];

// Матрица компетенций для анализа
const competenceMatrix = {
    "Нацеленность на результат": {
        4: ["мобилизую команду", "распределю зоны проверки", "организую работу", "добьёмся цели любой ценой", "возьму на себя руководство"],
        3: ["останусь работать допоздна", "лично проверю все данные", "возьму ответственность на себя", "найду способ исправить"],
        2: ["попробую исправить сам", "попрошу помощи у коллег", "сообщу руководителю"],
        1: ["перенесу срок сдачи", "уведомлю клиента о проблеме", "предложу альтернативный вариант"]
    },
    "Ориентация на качество": {
        4: ["создам улучшенную версию шаблона", "проведу мастер-класс для всех", "внедрю новые стандарты", "продемонстрирую преимущества"],
        3: ["предложу коллеге новый шаблон", "сравню эффективность методов", "объясню выгоды изменений"],
        2: ["вежливо посоветую", "обращу внимание на проблему", "предложу свою помощь"],
        1: ["не буду вмешиваться", "это его личный выбор", "сообщу руководству"]
    }
    // ... добавьте остальные матрицы
};

let currentQuestion = 0;
const answers = {};
let sheetsUrl = '';

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    showQuestion(currentQuestion);
    
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitAssessment);
});

function showQuestion(index) {
    const container = document.getElementById('questions-container');
    const question = questions[index];
    
    container.innerHTML = `
        <div class="question-card">
            <div class="scenario">${question.scenario}</div>
            <div class="question-text">${question.question}</div>
            <textarea 
                id="answer-${question.id}" 
                placeholder="Опишите подробно ваши действия и мысли в этой ситуации..."
                oninput="validateAnswer(${question.id})"
            >${answers[question.id]?.answer || ''}</textarea>
        </div>
    `;

    updateProgress();
    updateButtons();
}

function validateAnswer(questionId) {
    const answer = document.getElementById(`answer-${questionId}`).value;
    const nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = !answer.trim();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;
}

function updateButtons() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    
    if (currentQuestion === questions.length - 1) {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'block';
    } else {
        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('submit-btn').style.display = 'none';
    }
}

function nextQuestion() {
    const currentQ = questions[currentQuestion];
    const answer = document.getElementById(`answer-${currentQ.id}`).value;
    
    if (!answer.trim()) {
        alert('Пожалуйста, напишите ответ перед переходом к следующему вопросу');
        return;
    }

    saveAnswer(currentQ.id, answer);
    currentQuestion++;
    showQuestion(currentQuestion);
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function saveAnswer(questionId, answer) {
    const question = questions.find(q => q.id === questionId);
    answers[questionId] = {
        competence: question.competence,
        answer: answer,
        score: analyzeAnswer(question.competence, answer)
    };
}

function analyzeAnswer(competence, answer) {
    const matrix = competenceMatrix[competence];
    if (!matrix) return 2;

    let totalScore = 0;
    let keywordCount = 0;
    const text = answer.toLowerCase();
    
    for (const [score, keywords] of Object.entries(matrix)) {
        for (const keyword of keywords) {
            if (text.includes(keyword)) {
                totalScore += parseInt(score);
                keywordCount++;
                break;
            }
        }
    }
    
    const wordCount = text.split(/\s+/).length;
    const lengthBonus = Math.min(wordCount / 50, 1) * 0.5;
    
    const finalScore = keywordCount > 0 ? 
        (totalScore / keywordCount) + lengthBonus : 
        1 + lengthBonus;
    
    return Math.min(Math.round(finalScore * 2) / 2, 4);
}

async function submitAssessment(event) {
    event.preventDefault();
    
    const currentQ = questions[currentQuestion];
    const answer = document.getElementById(`answer-${currentQ.id}`).value;
    
    if (!answer.trim()) {
        alert('Пожалуйста, ответьте на текущий вопрос перед завершением оценки');
        return;
    }

    saveAnswer(currentQ.id, answer);
    
    await saveResults();
    
    document.getElementById('assessment-form').style.display = 'none';
    document.getElementById('completion-message').style.display = 'block';
}

async function saveResults() {
    const results = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        answers: answers,
        summary: calculateSummary()
    };

    localStorage.setItem('assessment_results', JSON.stringify(results));
    
    if (sheetsUrl) {
        await sendToGoogleSheets(results);
    }
}

function calculateSummary() {
    const summary = {};
    let totalScore = 0;
    let answeredCount = 0;

    for (const [questionId, data] of Object.entries(answers)) {
        if (!summary[data.competence]) {
            summary[data.competence] = { total: 0, count: 0 };
        }
        summary[data.competence].total += data.score;
        summary[data.competence].count++;
        totalScore += data.score;
        answeredCount++;
    }

    for (const competence in summary) {
        summary[competence].average = summary[competence].total / summary[competence].count;
    }

    summary.overallAverage = totalScore / answeredCount;
    
    return summary;
}

async function sendToGoogleSheets(results) {
    try {
        const rowData = [
            new Date().toLocaleString('ru-RU'),
            results.summary.overallAverage.toFixed(2)
        ];

        for (const question of questions) {
            const answer = answers[question.id];
            rowData.push(answer ? answer.score : '');
        }

        for (const question of questions) {
            const answer = answers[question.id];
            rowData.push(answer ? answer.answer : '');
        }

        console.log('Данные для отправки в Google Таблицы:', rowData);
        console.log('URL таблицы:', sheetsUrl);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
    } catch (error) {
        console.error('Ошибка при отправке в Google Таблицы:', error);
    }
}

function loadSettings() {
    const savedUrl = localStorage.getItem('sheets_url');
    if (savedUrl) {
        sheetsUrl = savedUrl;
    }
    
    const savedQuestions = localStorage.getItem('assessment_questions');
    if (savedQuestions) {
        questions = JSON.parse(savedQuestions);
    }
}

// https://script.google.com/macros/s/AKfycbwzb1v2knYe840iixmjY3pB-HDClBlbHRqPHh527gm_IC74Y_S31m32F2eSiBx0sMeP/exec
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwzb1v2knYe840iixmjY3pB-HDClBlbHRqPHh527gm_IC74Y_S31m32F2eSiBx0sMeP/exec';

// Загрузка вопросов с сервера
async function loadQuestionsFromServer() {
    try {
        const response = await fetch(`${BACKEND_URL}?path=questions&action=get`);
        const data = await response.json();
        
        if (data.success && data.questions) {
            questions = data.questions;
            console.log('Questions loaded from server:', questions.length);
            return true;
        }
    } catch (error) {
        console.error('Error loading questions from server:', error);
    }
    return false;
}

// Сохранение результатов на сервер
async function saveResultsToServer(results) {
    try {
        // Используем простой POST запрос
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...results,
                path: 'results',
                action: 'save'
            })
        });
        
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error saving results to server:', error);
        return false;
    }
}