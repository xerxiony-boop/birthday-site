document.addEventListener('DOMContentLoaded', () => {
    let clicks = 0;
    const targetClicks = 100;

    const button = document.getElementById('click-button');
    const countDisplay = document.getElementById('count');
    const hintDisplay = document.getElementById('hint');
    const vignette = document.getElementById('vignette');
    const warningLayer = document.getElementById('warning-layer');
    const finalScreen = document.getElementById('final-screen');
    const casePage = document.getElementById('case-page');

    // Набор пугающих сообщений
    const warnings = [
        "Остановись...",
        "Зачем ты кликаешь?",
        "Не делай этого!",
        "Опасность!",
        "Система нестабильна!",
        "Она слышит тебя...",
        "ХВАТИТ!",
        "Она уже близко!",
        "ОСТАНОВИСЬ ПРЯМО СЕЙЧАС!",
        "Сбой архива!",
        "ОНА СМОТРИТ НА ТЕБЯ",
        "БЕГИ!",
        "ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ!",
        "НЕ НАЖИМАЙ!"
    ];

    button.addEventListener('click', () => {
        clicks++;
        countDisplay.textContent = clicks;

        // Вибрация с каждым кликом
        if (navigator.vibrate) {
            navigator.vibrate(20 + clicks); // Чем дальше, тем сильнее вибро
        }

        // 1. ДИНАМИЧЕСКОЕ СУЖЕНИЕ ОБЗОРА (ТЕМНОТА)
        // К 95 кликам видна будет только кнопка по центру
        const transparentRadius = Math.max(8, 70 - (clicks * 0.65));
        vignette.style.background = `radial-gradient(circle at center, transparent ${transparentRadius}%, rgba(0, 0, 0, ${0.85 + (clicks * 0.0015)}) 100%)`;

        // 2. ИЗМЕНЕНИЕ ЦВЕТА И НАКАЛА КНОПКИ
        if (clicks > 50) {
            const redIntense = Math.min(255, 140 + clicks);
            button.style.background = `radial-gradient(circle, rgb(${redIntense}, 20, 45) 0%, #200005 100%)`;
            button.style.borderColor = `rgb(${redIntense}, 50, 80)`;
            button.style.boxShadow = `0 0 ${15 + (clicks / 2)}px rgba(255, 0, 30, 0.8)`;
        }

        // 3. СМЕНА ПОДСКАЗОК ВНИЗУ
        updateHintText(clicks);

        // 4. ТРЯСКА ЭКРАНА ПРИ ВЫСОКОМ СЧЕТЧИКЕ
        if (clicks > 60) {
            const shake = (clicks - 60) * 0.15;
            casePage.style.transform = `translate(${(Math.random() - 0.5) * shake}px, ${(Math.random() - 0.5) * shake}px)`;
        }

        // 5. ПОЯВЛЕНИЕ СПАМ-НАДПИСЕЙ
        if (clicks >= 15 && clicks % getWarningFrequency(clicks) === 0) {
            spawnWarningText();
        }

        // 6. ФИНАЛ (100 КЛИКОВ)
        if (clicks >= targetClicks) {
            triggerFinalScreen();
        }
    });

    function getWarningFrequency(c) {
        if (c > 85) return 1; // Каждая кнопка — надпись
        if (c > 70) return 2;
        if (c > 40) return 3;
        return 5;
    }

    function updateHintText(c) {
        if (c === 10) hintDisplay.textContent = "Зафиксировано первичное нажатие...";
        else if (c === 25) hintDisplay.textContent = "Предупреждение: датчики фиксируют аномалию.";
        else if (c === 50) hintDisplay.textContent = "ПОЛОВИНА ПУТИ. Система просит прекратить.";
        else if (c === 75) hintDisplay.textContent = "КРИТИЧЕСКИЙ УРОВЕНЬ! Остановись!";
        else if (c === 90) hintDisplay.textContent = "ОНА УЖЕ ВНУТРИ ТЕРМИНАЛА!";
        else if (c === 98) hintDisplay.textContent = "3... 2... 1...";
    }

    function spawnWarningText() {
        const textEl = document.createElement('div');
        textEl.className = 'popup-warning';
        
        // Выбираем случайную надпись
        const randomText = warnings[Math.floor(Math.random() * warnings.length)];
        textEl.textContent = randomText;

        // Позиционируем в случайном месте экрана
        const x = Math.random() * 70 + 10; // От 10% до 80%
        const y = Math.random() * 80 + 5;  // От 5% до 85%
        const rot = (Math.random() - 0.5) * 30; // Угол поворота

        textEl.style.left = `${x}%`;
        textEl.style.top = `${y}%`;
        textEl.style.setProperty('--rot', `${rot}deg`);

        warningLayer.appendChild(textEl);

        // Удаляем через 1.2 секунды, чтобы не забивать память
        setTimeout(() => {
            textEl.remove();
        }, 1200);
    }

    function triggerFinalScreen() {
        // Записываем прохождение Дела №001 в браузер
        localStorage.setItem('case1', 'passed');

        // Мощная финишная вибрация
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 200, 50, 300]);
        }

        // Показываем финальный скример-экран
        finalScreen.classList.add('active');
    }
});