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

// Функция загрузки вопросов через XHR
function loadQuestionsXHR() {
    return new Promise((resolve) => {
        console.log('Loading questions via XHR...');
        
        const xhr = new XMLHttpRequest();
        const url = `${BACKEND_URL}?path=questions&action=get&cache=${Date.now()}`;
        
        console.log('XHR URL:', url);
        
        xhr.open('GET', url, true);
        
        xhr.onreadystatechange = function() {
            console.log('XHR state:', xhr.readyState, 'status:', xhr.status);
            
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        console.log('XHR response data:', data);
                        
                        if (data.success && data.questions) {
                            questions = data.questions;
                            console.log('✅ Questions loaded via XHR:', questions.length);
                            resolve(true);
                        } else {
                            console.error('❌ Server returned error:', data.error);
                            resolve(false);
                        }
                    } catch (error) {
                        console.error('❌ XHR parse error:', error);
                        console.log('Raw response:', xhr.responseText);
                        resolve(false);
                    }
                } else {
                    console.error('❌ XHR HTTP error:', xhr.status, xhr.statusText);
                    resolve(false);
                }
            }
        };
        
        xhr.onerror = function() {
            console.error('❌ XHR network error');
            resolve(false);
        };
        
        xhr.ontimeout = function() {
            console.error('❌ XHR timeout');
            resolve(false);
        };
        
        xhr.timeout = 10000; // 10 секунд таймаут
        xhr.send();
    });
}

// Функция сохранения результатов через XHR
function saveResultsXHR(results) {
    return new Promise((resolve) => {
        console.log('Saving results via XHR...', results);
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', BACKEND_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        // Подготавливаем данные
        const formData = new URLSearchParams();
        formData.append('path', 'results');
        formData.append('action', 'save');
        formData.append('overallAverage', results.summary.overallAverage || 0);
        formData.append('userAgent', results.userAgent || 'Unknown');
        formData.append('answers', JSON.stringify(results.answers || {}));
        
        console.log('XHR POST data:', formData.toString());
        
        xhr.onreadystatechange = function() {
            console.log('XHR save state:', xhr.readyState, 'status:', xhr.status);
            
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        console.log('XHR save response:', data);
                        resolve(data.success === true);
                    } catch (error) {
                        console.error('❌ XHR save parse error:', error);
                        console.log('Raw save response:', xhr.responseText);
                        resolve(false);
                    }
                } else {
                    console.error('❌ XHR save HTTP error:', xhr.status, xhr.statusText);
                    resolve(false);
                }
            }
        };
        
        xhr.onerror = function() {
            console.error('❌ XHR save network error');
            resolve(false);
        };
        
        xhr.ontimeout = function() {
            console.error('❌ XHR save timeout');
            resolve(false);
        };
        
        xhr.timeout = 15000; // 15 секунд таймаут
        xhr.send(formData.toString());
    });
}

// Обновите функцию loadSettings
async function loadSettings() {
    console.log('=== STARTING LOAD SETTINGS ===');
    
    // Пробуем загрузить вопросы с сервера
    const serverLoaded = await loadQuestionsXHR();
    
    if (serverLoaded) {
        console.log('✅ Questions loaded from server');
        // Сохраняем в localStorage для будущего использования
        localStorage.setItem('assessment_questions', JSON.stringify(questions));
    } else {
        console.log('⚠️ Using local questions');
        // Используем локальные вопросы
        const savedQuestions = localStorage.getItem('assessment_questions');
        if (savedQuestions) {
            questions = JSON.parse(savedQuestions);
        }
    }
    
    console.log('Final questions count:', questions.length);
    console.log('=== LOAD SETTINGS COMPLETED ===');
}

// Обновите функцию submitAssessment
async function submitAssessment(event) {
    event.preventDefault();
    
    const currentQ = questions[currentQuestion];
    const answer = document.getElementById(`answer-${currentQ.id}`).value;
    
    if (!answer.trim()) {
        alert('Пожалуйста, ответьте на текущий вопрос перед завершением оценки');
        return;
    }

    saveAnswer(currentQ.id, answer);
    
    const results = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        answers: answers,
        summary: calculateSummary()
    };

    console.log('Submitting results:', results);
    
    // Сохраняем локально
    localStorage.setItem('assessment_results', JSON.stringify(results));
    
    // Пробуем сохранить на сервер
    const serverSaved = await saveResultsXHR(results);
    
    if (serverSaved) {
        console.log('✅ Results saved to server successfully');
        alert('✅ Результаты успешно сохранены!');
    } else {
        console.warn('⚠️ Failed to save results to server, using local storage only');
        alert('⚠️ Результаты сохранены локально (проблема с сервером)');
    }
    
    document.getElementById('assessment-form').style.display = 'none';
    document.getElementById('completion-message').style.display = 'block';
}

// === ТЕСТОВЫЕ ФУНКЦИИ ДЛЯ КОНСОЛИ ===

// Тест загрузки вопросов
window.testLoadQuestions = function() {
    console.log('🧪 Testing question loading...');
    loadQuestionsXHR().then(success => {
        console.log('Test result:', success ? '✅ SUCCESS' : '❌ FAILED');
        console.log('Loaded questions:', questions);
    });
};

// Тест сохранения результатов
window.testSaveResults = function() {
    console.log('🧪 Testing results saving...');
    
    const testResults = {
        timestamp: new Date().toISOString(),
        userAgent: 'Test Browser',
        answers: {
            1: { score: 4, answer: 'Тестовый ответ 1' },
            2: { score: 3, answer: 'Тестовый ответ 2' },
            3: { score: 5, answer: 'Тестовый ответ 3' }
        },
        summary: { overallAverage: 4.0 }
    };
    
    saveResultsXHR(testResults).then(success => {
        console.log('Save test result:', success ? '✅ SUCCESS' : '❌ FAILED');
    });
};

// Полный тест
window.runFullTest = function() {
    console.log('🚀 Running full test...');
    
    testLoadQuestions();
    setTimeout(() => {
        testSaveResults();
    }, 2000);
};

// Проверка URL
window.checkBackendURL = function() {
    console.log('🔗 Backend URL:', BACKEND_URL);
    console.log('🔄 Testing connection...');
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', BACKEND_URL + '?path=test', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log('Connection test - Status:', xhr.status);
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    console.log('✅ Backend is working:', data);
                } catch (e) {
                    console.log('📄 Backend response (text):', xhr.responseText);
                }
            }
        }
    };
    xhr.send();
};