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
        const response = await fetch(`${BACKEND_URL}?path=questions&action=get`);
        const data = await response.json();
        
        console.log('Questions response:', data);
        
        if (data.success && data.questions) {
            questions = data.questions;
            return true;
        }
    } catch (error) {
        console.error('Error loading questions from server:', error);
    }
    return false;
}

// Получение результатов с сервера
async function getResultsFromServer() {
    try {
        const response = await fetch(`${BACKEND_URL}?path=results&action=get&pin=${ADMIN_PIN}`);
        const data = await response.json();
        
        console.log('Results response:', data);
        
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
        const url = `${BACKEND_URL}?path=settings&action=save&pin=${ADMIN_PIN}&sheets_url=${encodeURIComponent(settings.sheets_url || '')}`;
        const response = await fetch(url);
        
        const data = await response.json();
        console.log('Settings save response:', data);
        return data.success;
    } catch (error) {
        console.error('Error saving settings to server:', error);
        return false;
    }
}

// Функции для выгрузки результатов
function setupExportControls() {
    // Обработчик изменения периода
    document.getElementById('date-range').addEventListener('change', function() {
        const customDates = document.getElementById('custom-dates');
        customDates.style.display = this.value === 'custom' ? 'block' : 'none';
    });
    
    // Устанавливаем даты по умолчанию
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    document.getElementById('date-from').value = weekAgo;
    document.getElementById('date-to').value = today;
}

// Выгрузка результатов
async function exportResults() {
    const format = document.getElementById('export-format').value;
    const dateRange = document.getElementById('date-range').value;
    const statusDiv = document.getElementById('export-status');
    
    statusDiv.innerHTML = '<div class="export-progress">🔄 Загрузка данных...</div>';
    
    try {
        // Получаем данные с сервера
        const resultsData = await getResultsFromServer();
        
        if (!resultsData || !resultsData.success) {
            statusDiv.innerHTML = '<div style="color: #e74c3c;">❌ Ошибка загрузки данных</div>';
            return;
        }
        
        const results = resultsData.results || [];
        
        // Фильтруем по дате
        const filteredResults = filterResultsByDate(results, dateRange);
        
        if (filteredResults.length === 0) {
            statusDiv.innerHTML = '<div style="color: #f39c12;">⚠️ Нет данных для выбранного периода</div>';
            return;
        }
        
        statusDiv.innerHTML = `<div class="export-progress">✅ Загружено записей: ${filteredResults.length}</div>`;
        
        // Создаем выгрузку в выбранном формате
        switch (format) {
            case 'excel':
                await exportToExcel(filteredResults, resultsData.headers);
                break;
            case 'csv':
                exportToCSV(filteredResults, resultsData.headers);
                break;
            case 'json':
                exportToJSON(filteredResults);
                break;
        }
        
    } catch (error) {
        console.error('Export error:', error);
        statusDiv.innerHTML = `<div style="color: #e74c3c;">❌ Ошибка выгрузки: ${error.message}</div>`;
    }
}

// Фильтрация результатов по дате
function filterResultsByDate(results, dateRange) {
    const now = new Date();
    
    switch (dateRange) {
        case 'today':
            const today = now.toISOString().split('T')[0];
            return results.filter(result => {
                const resultDate = new Date(result.Timestamp).toISOString().split('T')[0];
                return resultDate === today;
            });
            
        case 'week':
            const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
            return results.filter(result => new Date(result.Timestamp) >= weekAgo);
            
        case 'month':
            const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
            return results.filter(result => new Date(result.Timestamp) >= monthAgo);
            
        case 'custom':
            const dateFrom = new Date(document.getElementById('date-from').value);
            const dateTo = new Date(document.getElementById('date-to').value);
            dateTo.setHours(23, 59, 59, 999); // Конец дня
            
            return results.filter(result => {
                const resultDate = new Date(result.Timestamp);
                return resultDate >= dateFrom && resultDate <= dateTo;
            });
            
        default:
            return results;
    }
}

// Выгрузка в Excel
async function exportToExcel(results, headers) {
    try {
        statusDiv.innerHTML = '<div class="export-progress">📊 Формирование Excel файла...</div>';
        
        // Используем библиотеку SheetJS (xlsx)
        const XLSX = await loadXLSXLibrary();
        
        // Создаем рабочую книгу
        const wb = XLSX.utils.book_new();
        
        // Подготавливаем данные
        const excelData = [headers];
        results.forEach(result => {
            const row = headers.map(header => result[header] || '');
            excelData.push(row);
        });
        
        // Создаем лист
        const ws = XLSX.utils.aoa_to_sheet(excelData);
        
        // Добавляем лист в книгу
        XLSX.utils.book_append_sheet(wb, ws, 'Результаты');
        
        // Создаем отчет по компетенциям
        await createCompetenceReport(wb, results);
        
        // Генерируем и скачиваем файл
        const fileName = `assessment_results_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
        document.getElementById('export-status').innerHTML = 
            `<div class="export-progress">✅ Excel файл создан: ${fileName}</div>`;
        
    } catch (error) {
        console.error('Excel export error:', error);
        // Фолбэк на CSV если Excel не работает
        exportToCSV(results, headers);
    }
}

// Загрузка библиотеки SheetJS
function loadXLSXLibrary() {
    return new Promise((resolve, reject) => {
        if (window.XLSX) {
            resolve(window.XLSX);
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
        script.onload = () => resolve(window.XLSX);
        script.onerror = () => reject(new Error('Failed to load XLSX library'));
        document.head.appendChild(script);
    });
}

// Создание отчета по компетенциям
async function createCompetenceReport(wb, results) {
    try {
        // Анализируем данные по компетенциям
        const competenceStats = analyzeCompetenceStats(results);
        
        // Создаем лист с статистикой
        const statsData = [
            ['Отчет по компетенциям'],
            ['Сгенерирован:', new Date().toLocaleString('ru-RU')],
            ['Всего оценок:', results.length],
            [''],
            ['Компетенция', 'Средний балл', 'Мин.', 'Макс.', 'Кол-во оценок']
        ];
        
        Object.entries(competenceStats).forEach(([competence, stats]) => {
            statsData.push([
                competence,
                stats.average.toFixed(2),
                stats.min,
                stats.max,
                stats.count
            ]);
        });
        
        const ws = XLSX.utils.aoa_to_sheet(statsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Статистика');
        
    } catch (error) {
        console.error('Error creating competence report:', error);
    }
}

// Анализ статистики по компетенциям
function analyzeCompetenceStats(results) {
    const stats = {};
    
    results.forEach(result => {
        // Анализируем баллы компетенций (предполагаем, что они в колонках Comp1 Score, Comp2 Score, etc.)
        Object.keys(result).forEach(key => {
            if (key.includes('Comp') && key.includes('Score') && result[key] !== '') {
                const compNumber = key.match(/Comp(\d+)/)[1];
                const compName = `Компетенция ${compNumber}`;
                const score = parseFloat(result[key]);
                
                if (!isNaN(score)) {
                    if (!stats[compName]) {
                        stats[compName] = {
                            total: 0,
                            count: 0,
                            min: 5,
                            max: 0
                        };
                    }
                    
                    stats[compName].total += score;
                    stats[compName].count++;
                    stats[compName].min = Math.min(stats[compName].min, score);
                    stats[compName].max = Math.max(stats[compName].max, score);
                }
            }
        });
    });
    
    // Вычисляем средние значения
    Object.keys(stats).forEach(comp => {
        stats[comp].average = stats[comp].total / stats[comp].count;
    });
    
    return stats;
}

// Выгрузка в CSV
function exportToCSV(results, headers) {
    try {
        // Создаем CSV содержимое
        let csvContent = headers.join(',') + '\n';
        
        results.forEach(result => {
            const row = headers.map(header => {
                let value = result[header] || '';
                // Экранируем запятые и кавычки
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                return value;
            });
            csvContent += row.join(',') + '\n';
        });
        
        // Создаем и скачиваем файл
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const fileName = `assessment_results_${new Date().toISOString().split('T')[0]}.csv`;
        downloadBlob(blob, fileName);
        
        document.getElementById('export-status').innerHTML = 
            `<div class="export-progress">✅ CSV файл создан: ${fileName}</div>`;
        
    } catch (error) {
        console.error('CSV export error:', error);
    }
}

// Выгрузка в JSON
function exportToJSON(results) {
    try {
        const jsonContent = JSON.stringify(results, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        const fileName = `assessment_results_${new Date().toISOString().split('T')[0]}.json`;
        downloadBlob(blob, fileName);
        
        document.getElementById('export-status').innerHTML = 
            `<div class="export-progress">✅ JSON файл создан: ${fileName}</div>`;
        
    } catch (error) {
        console.error('JSON export error:', error);
    }
}

// Вспомогательная функция для скачивания
function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Генерация расширенного отчета
async function generateReport() {
    const statusDiv = document.getElementById('export-status');
    statusDiv.innerHTML = '<div class="export-progress">📈 Формирование отчета...</div>';
    
    try {
        const resultsData = await getResultsFromServer();
        
        if (!resultsData || !resultsData.success) {
            statusDiv.innerHTML = '<div style="color: #e74c3c;">❌ Ошибка загрузки данных</div>';
            return;
        }
        
        const results = resultsData.results || [];
        
        if (results.length === 0) {
            statusDiv.innerHTML = '<div style="color: #f39c12;">⚠️ Нет данных для отчета</div>';
            return;
        }
        
        // Создаем HTML отчет
        const reportHTML = createHTMLReport(results, resultsData.headers);
        statusDiv.innerHTML = reportHTML;
        
    } catch (error) {
        console.error('Report generation error:', error);
        statusDiv.innerHTML = `<div style="color: #e74c3c;">❌ Ошибка формирования отчета: ${error.message}</div>`;
    }
}

// Создание HTML отчета
function createHTMLReport(results, headers) {
    const totalAssessments = results.length;
    const today = new Date().toISOString().split('T')[0];
    const todayCount = results.filter(r => r.Timestamp.includes(today)).length;
    
    // Анализ данных
    const competenceStats = analyzeCompetenceStats(results);
    const dateStats = analyzeDateStats(results);
    
    let html = `
        <div class="report-section">
            <h4>📊 Статистический отчет</h4>
            
            <div class="export-stats">
                <div class="stat-card">
                    <div class="stat-value">${totalAssessments}</div>
                    <div class="stat-label">Всего оценок</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${todayCount}</div>
                    <div class="stat-label">Оценок сегодня</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${Object.keys(competenceStats).length}</div>
                    <div class="stat-label">Компетенций</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${dateStats.period}</div>
                    <div class="stat-label">Период данных</div>
                </div>
            </div>
            
            <h5 style="margin-top: 20px;">Рейтинг компетенций</h5>
            <table class="report-table">
                <thead>
                    <tr>
                        <th>Компетенция</th>
                        <th>Средний балл</th>
                        <th>Мин.</th>
                        <th>Макс.</th>
                        <th>Оценок</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Сортируем по среднему баллу
    const sortedStats = Object.entries(competenceStats)
        .sort(([,a], [,b]) => b.average - a.average);
    
    sortedStats.forEach(([competence, stats]) => {
        html += `
            <tr>
                <td>${competence}</td>
                <td>${stats.average.toFixed(2)}</td>
                <td>${stats.min}</td>
                <td>${stats.max}</td>
                <td>${stats.count}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
            
            <div class="download-links">
                <a href="#" onclick="exportResults()" class="download-link">📥 Выгрузить в Excel</a>
                <a href="#" onclick="exportToCSV(${JSON.stringify(results)}, ${JSON.stringify(headers)})" class="download-link">📥 Выгрузить в CSV</a>
                <a href="#" onclick="printReport()" class="download-link">🖨️ Печать отчета</a>
            </div>
        </div>
    `;
    
    return html;
}

// Анализ статистики по датам
function analyzeDateStats(results) {
    if (results.length === 0) {
        return { period: 'Нет данных' };
    }
    
    const dates = results.map(r => new Date(r.Timestamp)).sort((a, b) => a - b);
    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];
    
    const diffTime = Math.abs(lastDate - firstDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
        period: `${diffDays} дней`,
        firstDate: firstDate.toLocaleDateString('ru-RU'),
        lastDate: lastDate.toLocaleDateString('ru-RU')
    };
}

// Печать отчета
function printReport() {
    const reportSection = document.querySelector('.report-section');
    if (reportSection) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Отчет по оценке компетенций</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                        th { background: #f0f0f0; }
                        .header { text-align: center; margin-bottom: 30px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Отчет по оценке компетенций</h1>
                        <p>Сгенерирован: ${new Date().toLocaleString('ru-RU')}</p>
                    </div>
                    ${reportSection.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Обновите функцию loadAdminContent
async function loadAdminContent() {
    loadSettings();
    loadQuestionsEditor();
    setupExportControls(); // Добавьте эту строку
}