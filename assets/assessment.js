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
    },
	{
      id: 3,
      competence: "Работа в команде",
      scenario: "В вашем проекте есть сотрудник, который постоянно опаздывает с задачами, но обладает уникальной экспертизой. Команда начинает возмущаться из-за несправедливой нагрузки.",
      question: "Ваш план действий для решения этой ситуации?"
    },
    {
      id: 4,
      competence: " Готовность к изменениям",
      scenario: "Руководство внедряет новую CRM-систему. Большинство сотрудников саботируют переход, ссылаясь на неудобство и потерю времени.",
      question: "Как вы поступите в этой ситуации?"
    },
    {
      id: 5,
      competence: "Инициативность",
      scenario: "Вы заметили, что еженедельные планерки занимают 2 часа вместо запланированных 30 минут и не приносят результата. Руководитель доволен текущим форматом.",
      question: "Что бы вы изменили?"
    },
     {
      id: 6,
      competence: "Ориентация на развитие",
      scenario: "Вы прошли дорогостоящий курс по новому методу управления проектами. Руководство не планирует внедрять эту методику в компании в ближайший год.",
      question: "Как вы поступите в этой ситуации?"
    },
     {
      id: 7,
      competence: "Ответственность",
      scenario: "Вы по ошибке отправили клиенту коммерческое предложение со старой ценой (на 15% ниже текущей). Клиент уже подтвердил согласие и ждёт договор.",
      question: "Как вы поступите в этой ситуации?"
    },
     {
      id: 8,
      competence: "Лидерство",
      scenario: "Внезапно уволился ключевой специалист в разгар важного проекта. Команда в панике, сроки горят. Руководство предлагает сдвинуть дедлайны.",
      question: "Ваш план действий для решения этой ситуации?"
    },
     {
      id: 9,
      competence: "Постановка целей и задач",
      scenario: "Вам нужно поставить задачи новой команде по запуску сложного продукта. Сроки жёсткие, команда незнакома с продуктом.",
      question: "Ваш план действий в данной ситуации?"
    },
     {
      id: 10,
      competence: "Контроль выполнения задач",
      scenario: "Вы руководите распределённой командой из 5 человек. Двое сотрудников постоянно задерживают задачи, но всегда находят оправдания.",
      question: "Как вы поступите в этой ситуации?"
    },
     {
      id: 11,
      competence: "Мотивация подчиненных",
      scenario: "Два опытных сотрудника вашей команды демотивированы из-за отмены премий. Они начали формально выполнять обязанности.",
      question: "Как вы поступите в этой ситуации?"
    },
     {
      id: 12,
      competence: "Развитие подчиненных",
      scenario: "Молодой перспективный сотрудник просит повышения, но ему не хватает навыков стратегического мышления. На внешнюю позицию компания не готовы.",
      question: "Как вы поступите в этой ситуации?"
    },
     {
      id: 13,
      competence: "Умение договариваться",
      scenario: "Смежный отдел заблокировал ваш важный проект, ссылаясь на свою загрузку. Их руководитель не идет на контакт.",
      question: "Как вы поступите в этой ситуации?"
    },
     {
      id: 14,
      competence: "Принятие решений",
      scenario: "Нужно выбрать одну из двух стратегий развития продукта. Безопасная стратегия гарантирует 10% рост, инновационная может дать 50% рост или провал.",
      question: "Какую стратегию вы выберите и почему?"
    }
    // ... добавьте вопросы при необходимости
];

//Матрица компетенций
const competenceMatrix = {
    "Нацеленность на результат": {
        4: [
            "мобилизую команду", "распределю зоны", "организую работу", "добьёмся цели", 
            "возьму руководство", "скоординирую действия", "направлю команду", "возглавлю процесс",
            "мобилизация", "координация", "организация", "руководство", "лидерство", "контроль"
        ],
        3: [
            "останусь работать", "лично проверю", "возьму ответственность", "найду способ", 
            "доложу о ситуации", "предложу решение", "исправлю ошибку", "возьму на себя",
            "ответственность", "решение", "исправление", "личный", "самостоятельно"
        ],
        2: [
            "попробую исправить", "попрошу помощи", "сообщу руководителю", "постараюсь успеть", 
            "сделаю что смогу", "обращусь за поддержкой", "помощь", "поддержка", "сообщить",
            "попробовать", "постараться"
        ],
        1: [
            "перенесу срок", "уведомлю клиента", "предложу альтернативу", "передам задачу", 
            "извинюсь за задержку", "перенос", "альтернатива", "передать", "извиниться",
            "отложить", "отмена"
        ]
    },
    
    "Ориентация на качество": {
        4: [
            "создам улучшенную версию", "проведу мастер-класс", "внедрю новые стандарты", 
            "продемонстрирую преимущества", "организую обучение", "автоматизирую процесс", 
            "разработаю чек-лист", "стандартизация", "автоматизация", "оптимизация", 
            "улучшение", "разработка", "внедрение"
        ],
        3: [
            "предложу новый шаблон", "сравню эффективность", "объясню выгоды", 
            "покажу на примере", "подготовлю сравнение", "протестирую варианты",
            "сравнение", "тестирование", "анализ", "предложение", "объяснение"
        ],
        2: [
            "вежливо посоветую", "обращу внимание", "предложу помощь", 
            "расскажу о возможностях", "подскажу как улучшить", "совет", 
            "помощь", "внимание", "рекомендация", "подсказка"
        ],
        1: [
            "не буду вмешиваться", "личный выбор", "сообщу руководству", 
            "каждый работает как хочет", "не мое дело", "невмешательство",
            "безразличие", "равнодушие", "пассивность"
        ]
    },
    
    "Работа в команде": {
        4: [
            "организую командную сессию", "создам систему взаимопомощи", 
            "налажу процессы взаимодействия", "проведу фасилитацию", 
            "создам атмосферу сотрудничества", "разрешу конфликт конструктивно",
            "фасилитация", "медиация", "сотрудничество", "взаимопомощь", "командность"
        ],
        3: [
            "проведу личную встречу", "выясню причины проблем", "предложу план улучшений", 
            "распределю задачи справедливо", "учту особенности", "выслушаю мнения",
            "встреча", "обсуждение", "распределение", "учет", "выслушивание"
        ],
        2: [
            "поговорю с сотрудником", "посоветуюсь с командой", "предложу компромисс", 
            "постараюсь понять", "выскажу позицию", "компромисс", "диалог",
            "общение", "понимание"
        ],
        1: [
            "сообщу руководителю", "попрошу разобраться", "избегу конфликта", 
            "не буду вмешиваться", "пусть сами разбираются", "избегание",
            "перекладывание", "уход", "конфликт"
        ]
    },
    
    "Готовность к изменениям": {
        4: [
            "освою систему первым", "покажу преимущества", "создам группу поддержки", 
            "разработаю план внедрения", "мотивирую коллег", "стану амбассадором",
            "амбассадор", "внедрение", "мотивация", "поддержка", "лидерство"
        ],
        3: [
            "изучу систему", "соберу обратную связь", "предложу улучшения", 
            "помогу коллегам", "поддержу инициативу", "протестирую функции",
            "изучение", "тестирование", "поддержка", "помощь", "адаптация"
        ],
        2: [
            "попробую поработать", "посмотрю как у других", "выскажу опасения", 
            "постепенно освою", "послушаю мнения", "осторожность", "постепенно",
            "испытание", "наблюдение"
        ],
        1: [
            "буду работать по-старому", "подожду указаний", "не вижу смысла", 
            "считаю лишним", "мешает работе", "сопротивление", "консерватизм",
            "нежелание", "критика"
        ]
    },
    
    "Инициативность": {
        4: [
            "предложу альтернативный формат", "проведу хронометраж", 
            "подготовлю регламент", "организую тестовый период", 
            "внедрю новые правила", "возглавлю рабочую группу",
            "инициатива", "реформа", "изменение", "улучшение", "новаторство"
        ],
        3: [
            "выскажу предложения", "соберу мнения", "подготовлю анализ", 
            "предложу оптимизацию", "изучу практики", "предложение",
            "анализ", "оптимизация", "исследование"
        ],
        2: [
            "поделюсь наблюдениями", "вежливо выскажу", "посоветуюсь", 
            "предложу обсудить", "обращу внимание", "наблюдение",
            "совет", "обсуждение", "внимание"
        ],
        1: [
            "промолчу", "смирюсь с ситуацией", "не буду проявлять", 
            "подожду когда другие", "не хочу выделяться", "пассивность",
            "молчание", "ожидание", "бездействие"
        ]
    },
    
    "Ориентация на развитие": {
        4: [
            "внедрю методику", "организую ланч-сессии", "создаду рабочую группу", 
            "подготовлю бизнес-кейс", "стану внутренним экспертом", 
            "разработаю программу обучения", "эксперт", "методика",
            "обучение", "развитие", "внедрение"
        ],
        3: [
            "применю элементы", "поделюсь знаниями", "предложу рассмотреть", 
            "продемонстрирую преимущества", "изучу адаптацию", "применение",
            "демонстрация", "адаптация", "использование"
        ],
        2: [
            "изучу возможность", "расскажу коллегам", "посмотрю где использовать", 
            "сохраню материалы", "буду использовать", "изучение",
            "рассказ", "сохранение", "ознакомление"
        ],
        1: [
            "отложу до лучших времен", "забуду о курсе", "не буду предпринимать", 
            "посчитаю бесполезным", "не вижу ценности", "забвение",
            "безразличие", "откладывание", "негатив"
        ]
    },
    
    "Ответственность": {
        4: [
            "свяжусь с клиентом", "предложу специальные условия", 
            "выполню в сверхурочное", "возьму последствия", 
            "личный коучинг", "ответственность", "исправление",
            "компенсация", "гарантия", "обеспечение"
        ],
        3: [
            "сообщу руководителю", "предложу варианты", "возьму исправление", 
            "признаю ошибку", "проанализирую причины", "признание",
            "анализ", "исправление", "сообщение"
        ],
        2: [
            "попробую договориться", "предложу компромисс", "постараюсь исправить", 
            "объясню обстоятельства", "извинюсь", "компромисс",
            "объяснение", "извинение", "договоренность"
        ],
        1: [
            "переведу вину", "попытаюсь скрыть", "передам проблему", 
            "избегу ответственности", "скажу не моя вина", "перекладывание",
            "сокрытие", "избегание", "отрицание"
        ]
    },
    
    "Лидерство": {
        4: [
            "соберу команду", "предложу план", "возьму ключевые задачи", 
            "организую мозговой штурм", "мобилизую ресурсы", 
            "возглавлю управление", "вдохновлю команду", "лидерство",
            "мобилизация", "вдохновение", "руководство"
        ],
        3: [
            "предложу решение", "координирую работу", "поддержу моральный дух", 
            "распределю обязанности", "организую стендапы", "координация",
            "поддержка", "распределение", "организация"
        ],
        2: [
            "помогу с поиском", "поддержу коллег", "предложу помощь", 
            "посоветую как действовать", "выскажу идеи", "помощь",
            "поддержка", "совет", "предложение"
        ],
        1: [
            "передам проблему", "предложу сдвинуть сроки", "не буду вмешиваться", 
            "подожду указаний", "пусть руководитель решает", "передача",
            "ожидание", "невмешательство", "пассивность"
        ]
    },
    
    "Постановка целей и задач": {
        4: [
            "разобью на этапы", "создам дорожную карту", "проведу воркшоп", 
            "учту сильные стороны", "установлю приоритеты", 
            "согласую ожидания", "планирование", "стратегия",
            "карта", "приоритеты", "согласование"
        ],
        3: [
            "поставлю четкие задачи", "объясню контекст", "согласую сроки", 
            "распределю роли", "определю критерии", "четкость",
            "согласование", "распределение", "критерии"
        ],
        2: [
            "даю указания", "объясню что сделать", "ставлю сроки", 
            "контролирую выполнение", "отвечу на вопросы", "указания",
            "контроль", "объяснение", "сроки"
        ],
        1: [
            "даю свободу", "не вмешиваюсь", "ставлю общие цели", 
            "полагаюсь на инициативу", "пусть сами разбираются", "свобода",
            "невмешательство", "надежда", "пассивность"
        ]
    },
    
    "Контроль выполнения задач": {
        4: [
            "внедрю стендапы", "создам систему трекинга", "установлю статусы", 
            "проведу коучинги", "автоматизирую отчетность", 
            "настрою уведомления", "автоматизация", "трекинг",
            "коучинг", "мониторинг", "отслеживание"
        ],
        3: [
            "установлю проверки", "проведу встречи", "введу напоминания", 
            "организую контроль", "запрошу отчеты", "проверка",
            "встречи", "напоминания", "отчеты"
        ],
        2: [
            "проверю выполнение", "спрошу о прогрессе", "напомню о сроках", 
            "попрошу отчет", "уточню статус", "проверка",
            "напоминание", "уточнение", "опрос"
        ],
        1: [
            "доверю без контроля", "подожду результат", "не буду отслеживать", 
            "переложу контроль", "пусть отчитываются", "доверие",
            "ожидание", "перекладывание", "бездействие"
        ]
    },
    
    "Мотивация подчиненных": {
        4: [
            "предложу проекты", "разработаю геймификацию", "предоставлю автономию", 
            "организую наставничество", "создам условия", 
            "внедрю признание достижений", "мотивация", "стимулирование",
            "автономия", "признание", "развитие"
        ],
        3: [
            "проведу встречи", "предложу обучение", "расширю ответственность", 
            "внедрю график", "отмечу достижения", "обучение",
            "ответственность", "признание", "встречи"
        ],
        2: [
            "поговорю о перспективах", "предложу участие", "похвалю за работу", 
            "выслушаю пожелания", "предложу бонусы", "похвала",
            "участие", "пожелания", "бонусы"
        ],
        1: [
            "предложу стимулирование", "пригрозу санкциями", "не буду предпринимать", 
            "передам вопрос", "скажу лучше работать", "угрозы",
            "бездействие", "перекладывание", "требование"
        ]
    },
    
    "Развитие подчиненных": {
        4: [
            "составлю план развития", "включу в группу", "поручу проект", 
            "организую стажировку", "стану ментором", "создам трек",
            "менторство", "развитие", "стажировка", "план", "трек"
        ],
        3: [
            "направлю на курс", "поручу задачи", "организую обучение", 
            "предоставлю ресурсы", "стану наставником", "курс",
            "задачи", "ресурсы", "наставничество"
        ],
        2: [
            "рекомендую литературу", "поделюсь опытом", "даю задания", 
            "обсужу рост", "посоветую направления", "рекомендация",
            "опыт", "обсуждение", "совет"
        ],
        1: [
            "предложу подождать", "посоветую опыт", "не вижу потенциала", 
            "передам кадрам", "скажу стараться", "ожидание",
            "негатив", "перекладывание", "требование"
        ]
    },
    
    "Умение договариваться": {
        4: [
            "организую рабочую группу", "предложу обмен ресурсами", 
            "найду компромисс", "проведу переговоры", 
            "создаю win-win", "использую слушание", "переговоры",
            "компромисс", "взаимовыгодность", "сотрудничество"
        ],
        3: [
            "предложу версию", "найду общие цели", "предложу сотрудничество", 
            "объясню выгоды", "предложу период", "сотрудничество",
            "выгоды", "цели", "период"
        ],
        2: [
            "попробую договориться", "предложу встречу", "постараюсь понять", 
            "ищу точки", "предложу варианты", "договоренность",
            "встреча", "понимание", "варианты"
        ],
        1: [
            "обращусь к руководству", "настою на своем", "откажусь от сотрудничества", 
            "приму условия", "скажу несправедливо", "настаивание",
            "отказ", "принятие", "протест"
        ]
    },
    
    "Принятие решений": {
        4: [
            "проведу исследование", "организую внедрение", "создам группу", 
            "проведу SWOT-анализ", "приму взвешенное решение", 
            "проанализирую сценарии", "анализ", "исследование",
            "взвешенность", "сценарии", "оценка"
        ],
        3: [
            "проанализирую риски", "посоветуюсь с экспертами", "сравню результаты", 
            "учту мнение", "взвешу за и против", "риски",
            "совет", "сравнение", "взвешивание"
        ],
        2: [
            "положусь на интуицию", "выберу безопасный вариант", "поспрашиваю мнение", 
            "подожду информации", "выберу проверенный путь", "интуиция",
            "безопасность", "ожидание", "проверенность"
        ],
        1: [
            "передам решение", "избегу принятия", "выберу случайно", 
            "отложу выбор", "пусть другие решают", "избегание",
            "случайность", "откладывание", "перекладывание"
        ]
    }
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

//Функция анализа
function analyzeAnswer(competence, answer) {
    const matrix = competenceMatrix[competence];
    if (!matrix) return 2; // Средний балл по умолчанию

    let totalScore = 0;
    let keywordCount = 0;
    const text = answer.toLowerCase();
    
    // Анализируем по уровням от высшего к низшему
    for (let score = 4; score >= 1; score--) {
        const keywords = matrix[score];
        let levelScore = 0;
        let levelCount = 0;
        
        for (const keyword of keywords) {
            // Проверяем как словосочетания, так и отдельные слова
            const words = keyword.split(' ');
            
            if (words.length > 1) {
                // Для словосочетаний - точное совпадение
                if (text.includes(keyword)) {
                    levelScore += score;
                    levelCount++;
                    console.log(`Found phrase: "${keyword}" - ${score} points`);
                }
            } else {
                // Для отдельных слов - проверяем вхождение
                if (text.includes(keyword)) {
                    levelScore += score * 0.5; // Отдельные слова дают половину баллов
                    levelCount++;
                    console.log(`Found word: "${keyword}" - ${score * 0.5} points`);
                }
            }
        }
        
        if (levelCount > 0) {
            totalScore += levelScore;
            keywordCount += levelCount;
        }
    }
    
    // Бонус за глубину ответа
    const wordCount = text.split(/\s+/).length;
    const lengthBonus = Math.min(wordCount / 50, 1) * 0.5;
    
    // Итоговый балл
    let finalScore;
    if (keywordCount > 0) {
        finalScore = (totalScore / keywordCount) + lengthBonus;
    } else {
        finalScore = 1 + lengthBonus; // Минимальный балл + бонус за длину
    }
    
    // Ограничиваем и округляем
    finalScore = Math.min(finalScore, 4);
    finalScore = Math.round(finalScore * 2) / 2; // Округление до 0.5
    
    console.log(`Analysis result: ${finalScore} (keywords: ${keywordCount}, length bonus: ${lengthBonus.toFixed(2)})`);
    
    return finalScore;
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

// AKfycbwzb1v2knYe840iixmjY3pB-HDClBlbHRqPHh527gm_IC74Y_S31m32F2eSiBx0sMeP
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