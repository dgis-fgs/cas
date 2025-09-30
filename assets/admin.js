const ADMIN_PIN = '652713';
let questions = [];

// Инициализация админ-панели
document.addEventListener('DOMContentLoaded', function() {
    loadQuestions();
    
    // Добавляем обработчик Enter для поля PIN
    document.getElementById('pin-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPin();
        }
    });
});

function checkPin() {
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');
    
    if (pinInput.value === ADMIN_PIN) {
        // Правильный PIN - показываем админ-панель
        document.getElementById('pin-section').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        loadAdminContent();
    } else {
        // Неправильный PIN - показываем ошибку
        pinError.style.display = 'block';
        pinInput.value = '';
        pinInput.focus();
    }
}

function loadAdminContent() {
    loadSettings();
    loadQuestionsEditor();
}

function loadSettings() {
    const savedUrl = localStorage.getItem('sheets_url');
    if (savedUrl) {
        document.getElementById('sheets-url').value = savedUrl;
    }
}

function saveSheetsUrl() {
    const url = document.getElementById('sheets-url').value;
    if (url) {
        localStorage.setItem('sheets_url', url);
        alert('✅ URL Google Таблицы сохранен!');
    } else {
        alert('⚠️ Пожалуйста, введите URL Google Таблицы');
    }
}

function loadQuestions() {
    const savedQuestions = localStorage.getItem('assessment_questions');
    if (savedQuestions) {
        questions = JSON.parse(savedQuestions);
    } else {
        // Загружаем вопросы по умолчанию
        questions = [
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
            // ... добавьте остальные вопросы
        ];
    }
}

function loadQuestionsEditor() {
    const editor = document.getElementById('questions-editor');
    let html = '<div class="question-list">';
    
    questions.forEach((question, index) => {
        html += `
            <div class="question-item">
                <div class="competence-badge">${question.competence}</div>
                <div class="question-scenario">${question.scenario}</div>
                <div class="question-text-admin">${question.question}</div>
                <div style="margin-top: 10px;">
                    <button onclick="editQuestion(${index})" style="background: #3498db; color: white; padding: 5px 10px; font-size: 12px;">✏️ Редактировать</button>
                    <button onclick="deleteQuestion(${index})" style="background: #e74c3c; color: white; padding: 5px 10px; font-size: 12px; margin-left: 5px;">🗑️ Удалить</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    html += `<button onclick="addNewQuestion()" style="background: #27ae60; color: white; margin-top: 15px;">➕ Добавить новый вопрос</button>`;
    
    editor.innerHTML = html;
}

function editQuestion(index) {
    const question = questions[index];
    const newScenario = prompt('Редактировать сценарий:', question.scenario);
    const newQuestion = prompt('Редактировать вопрос:', question.question);
    const newCompetence = prompt('Редактировать компетенцию:', question.competence);
    
    if (newScenario !== null && newQuestion !== null && newCompetence !== null) {
        questions[index].scenario = newScenario;
        questions[index].question = newQuestion;
        questions[index].competence = newCompetence;
        
        saveQuestions();
        loadQuestionsEditor();
        alert('✅ Вопрос обновлен!');
    }
}

function deleteQuestion(index) {
    if (confirm('Вы уверены, что хотите удалить этот вопрос?')) {
        questions.splice(index, 1);
        saveQuestions();
        loadQuestionsEditor();
        alert('✅ Вопрос удален!');
    }
}

function addNewQuestion() {
    const competence = prompt('Введите название компетенции:');
    const scenario = prompt('Введите сценарий вопроса:');
    const question = prompt('Введите текст вопроса:');
    
    if (competence && scenario && question) {
        const newQuestion = {
            id: questions.length + 1,
            competence: competence,
            scenario: scenario,
            question: question
        };
        
        questions.push(newQuestion);
        saveQuestions();
        loadQuestionsEditor();
        alert('✅ Новый вопрос добавлен!');
    }
}

function saveQuestions() {
    localStorage.setItem('assessment_questions', JSON.stringify(questions));
}

function viewResults() {
    const resultsViewer = document.getElementById('results-viewer');
    const results = localStorage.getItem('assessment_results');
    
    if (results) {
        const parsedResults = JSON.parse(results);
        let html = '<h4>Последние результаты тестирования:</h4>';
        html += `<p><strong>Время прохождения:</strong> ${new Date(parsedResults.timestamp).toLocaleString('ru-RU')}</p>`;
        html += `<p><strong>Общий балл:</strong> ${parsedResults.summary.overallAverage.toFixed(2)}</p>`;
        html += '<h5>Детали по компетенциям:</h5>';
        
        for (const [competence, data] of Object.entries(parsedResults.summary)) {
            if (competence !== 'overallAverage') {
                html += `<p><strong>${competence}:</strong> ${data.average.toFixed(2)}/4</p>`;
            }
        }
        
        resultsViewer.innerHTML = html;
    } else {
        resultsViewer.innerHTML = '<p>Результаты тестирования не найдены.</p>';
    }
}

function exportResults() {
    const results = localStorage.getItem('assessment_results');
    if (results) {
        const blob = new Blob([results], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `assessment-results-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('✅ Результаты экспортированы в файл!');
    } else {
        alert('⚠️ Нет данных для экспорта');
    }
}

// AKfycbwzb1v2knYe840iixmjY3pB-HDClBlbHRqPHh527gm_IC74Y_S31m32F2eSiBx0sMeP
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwzb1v2knYe840iixmjY3pB-HDClBlbHRqPHh527gm_IC74Y_S31m32F2eSiBx0sMeP/exec';

// Загрузка вопросов с сервера
async function loadQuestionsFromServer() {
    try {
        const response = await fetch(`${BACKEND_URL}/get-questions`);
        const data = await response.json();
        
        if (data.success && data.questions) {
            questions = data.questions;
            return true;
        }
    } catch (error) {
        console.error('Error loading questions from server:', error);
    }
    return false;
}

// Сохранение вопросов на сервер
async function saveQuestionsToServer(questionsData) {
    try {
        const response = await fetch(`${BACKEND_URL}/save-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questions: questionsData,
                pin: ADMIN_PIN
            })
        });
        
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error saving questions to server:', error);
        return false;
    }
}

// Получение результатов с сервера
async function getResultsFromServer() {
    try {
        const response = await fetch(`${BACKEND_URL}/get-results?pin=${ADMIN_PIN}`);
        const data = await response.json();
        
        if (data.success) {
            return data;
        }
    } catch (error) {
        console.error('Error getting results from server:', error);
    }
    return null;
}

// Сохранение настроек на сервер
async function saveSettingsToServer(settings) {
    try {
        const response = await fetch(`${BACKEND_URL}/save-settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...settings,
                pin: ADMIN_PIN
            })
        });
        
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error saving settings to server:', error);
        return false;
    }
}

// Обновите функцию saveQuestions
async function saveQuestions() {
    const serverSaved = await saveQuestionsToServer(questions);
    
    if (serverSaved) {
        console.log('Questions saved to server successfully');
        localStorage.setItem('assessment_questions', JSON.stringify(questions));
        alert('✅ Вопросы сохранены на сервере!');
    } else {
        // Fallback: сохраняем только локально
        localStorage.setItem('assessment_questions', JSON.stringify(questions));
        alert('✅ Вопросы сохранены локально (ошибка связи с сервером)');
    }
}

// Обновите функцию saveSheetsUrl
async function saveSheetsUrl() {
    const url = document.getElementById('sheets-url').value;
    if (url) {
        const serverSaved = await saveSettingsToServer({ sheets_url: url });
        
        if (serverSaved) {
            localStorage.setItem('sheets_url', url);
            alert('✅ Настройки сохранены на сервере!');
        } else {
            localStorage.setItem('sheets_url', url);
            alert('✅ Настройки сохранены локально (ошибка связи с сервером)');
        }
    } else {
        alert('⚠️ Пожалуйста, введите URL Google Таблицы');
    }
}

// Обновите функцию viewResults
async function viewResults() {
    const resultsViewer = document.getElementById('results-viewer');
    resultsViewer.innerHTML = '<p>🔄 Загрузка результатов с сервера...</p>';
    
    const serverResults = await getResultsFromServer();
    
    if (serverResults && serverResults.results) {
        let html = '<h4>Результаты тестирования с сервера:</h4>';
        html += `<p><strong>Всего записей:</strong> ${serverResults.results.length}</p>`;
        
        if (serverResults.results.length > 0) {
            html += '<div style="max-height: 400px; overflow-y: auto; margin-top: 15px;">';
            html += '<table style="width: 100%; border-collapse: collapse;">';
            
            // Заголовки таблицы
            html += '<tr style="background: #3498db; color: white;">';
            serverResults.headers.slice(0, 5).forEach(header => {
                html += `<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">${header}</th>`;
            });
            html += '</tr>';
            
            // Данные
            serverResults.results.slice(0, 10).forEach(result => {
                html += '<tr style="border-bottom: 1px solid #ddd;">';
                serverResults.headers.slice(0, 5).forEach(header => {
                    const value = result[header] || '';
                    const displayValue = typeof value === 'string' && value.length > 50 ? 
                        value.substring(0, 50) + '...' : value;
                    html += `<td style="padding: 8px; border: 1px solid #ddd;">${displayValue}</td>`;
                });
                html += '</tr>';
            });
            
            html += '</table>';
            html += '</div>';
            
            if (serverResults.results.length > 10) {
                html += `<p style="margin-top: 10px; color: #666;">Показано 10 из ${serverResults.results.length} записей</p>`;
            }
        } else {
            html += '<p>Результаты тестирования не найдены.</p>';
        }
        
        resultsViewer.innerHTML = html;
    } else {
        resultsViewer.innerHTML = '<p>❌ Не удалось загрузить результаты с сервера</p>';
    }
}

// Обновите функцию loadSettings в admin.js
async function loadSettings() {
    try {
        const response = await fetch(`${BACKEND_URL}/get-settings`);
        const data = await response.json();
        
        if (data.success && data.settings) {
            document.getElementById('sheets-url').value = data.settings.sheets_url || '';
        }
    } catch (error) {
        console.error('Error loading settings from server:', error);
    }
    
    // Загружаем вопросы
    const questionsLoaded = await loadQuestionsFromServer();
    if (!questionsLoaded) {
        const savedQuestions = localStorage.getItem('assessment_questions');
        if (savedQuestions) {
            questions = JSON.parse(savedQuestions);
        }
    }
}