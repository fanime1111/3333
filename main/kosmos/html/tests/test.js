// Test functionality
let userAnswers = {};
let correctAnswers = {}; // Заполните правильные ответы для каждого вопроса
let totalQuestions = 0;

// Инициализация теста
document.addEventListener('DOMContentLoaded', function() {
    initializeTest();
});

function initializeTest() {
    // Подсчет общего количества вопросов
    const questions = document.querySelectorAll('.question-block');
    totalQuestions = questions.length;
    
    // Добавление обработчиков событий для вариантов ответов
    const answerOptions = document.querySelectorAll('.answer-options li');
    answerOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectAnswer(this);
        });
    });
    
    // Инициализация объекта для хранения ответов пользователя
    for (let i = 1; i <= totalQuestions; i++) {
        userAnswers[i] = null;
    }
}

function selectAnswer(selectedOption) {
    const questionBlock = selectedOption.closest('.question-block');
    const questionNumber = questionBlock.getAttribute('data-question');
    const answer = selectedOption.getAttribute('data-answer');
    
    // Убираем выделение с других вариантов в этом вопросе
    const allOptions = questionBlock.querySelectorAll('.answer-options li');
    allOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Выделяем выбранный вариант
    selectedOption.classList.add('selected');
    
    // Сохраняем ответ пользователя
    userAnswers[questionNumber] = answer;
    
    // Проверяем, можно ли активировать кнопку отправки
    updateSubmitButton();
}

function updateSubmitButton() {
    const submitBtn = document.querySelector('.submit-btn');
    const answeredQuestions = Object.values(userAnswers).filter(answer => answer !== null).length;
    
    if (answeredQuestions === totalQuestions) {
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
    } else {
        submitBtn.style.opacity = '0.6';
        submitBtn.disabled = true;
    }
}

function submitTest() {
    // Проверяем, что все вопросы отвечены
    const answeredQuestions = Object.values(userAnswers).filter(answer => answer !== null).length;
    if (answeredQuestions < totalQuestions) {
        alert('Пожалуйста, ответьте на все вопросы перед завершением теста.');
        return;
    }
    
    // Подсчет результатов
    let correctCount = 0;
    for (let questionNum in correctAnswers) {
        if (userAnswers[questionNum] === correctAnswers[questionNum]) {
            correctCount++;
        }
    }
    
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    // Отображение результатов
    showResults(correctCount, totalQuestions, percentage);
}

function showResults(correct, total, percentage) {
    // Скрываем вопросы и показываем результаты
    document.getElementById('test-questions').style.display = 'none';
    document.getElementById('test-results').style.display = 'block';
    
    // Обновляем отображение результатов
    document.getElementById('score-display').textContent = `${correct}/${total}`;
    document.getElementById('score-percentage').textContent = `${percentage}%`;
    
    // Определяем сообщение на основе результата
    let message = '';
    if (percentage >= 90) {
        message = '🌟 Отлично! Вы показали превосходные знания!';
    } else if (percentage >= 75) {
        message = '👍 Хорошо! Вы хорошо усвоили материал!';
    } else if (percentage >= 60) {
        message = '📚 Удовлетворительно. Рекомендуем повторить материал.';
    } else {
        message = '📖 Необходимо лучше изучить материал и пройти тест заново.';
    }
    
    document.getElementById('result-message').textContent = message;
}

function restartTest() {
    // Сброс всех ответов
    userAnswers = {};
    for (let i = 1; i <= totalQuestions; i++) {
        userAnswers[i] = null;
    }
    
    // Убираем выделение со всех вариантов ответов
    const allOptions = document.querySelectorAll('.answer-options li');
    allOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Показываем вопросы и скрываем результаты
    document.getElementById('test-questions').style.display = 'block';
    document.getElementById('test-results').style.display = 'none';
    
    // Обновляем состояние кнопки отправки
    updateSubmitButton();
    
    // Прокручиваем к началу теста
    window.scrollTo(0, 0);
}

// Функция для настройки правильных ответов (вызывается в конкретном тесте)
function setCorrectAnswers(answers) {
    correctAnswers = answers;
}

