document.addEventListener('DOMContentLoaded', () => {
    // Список загаданных слов
    const words = [
        "профурсет",
        "впиздуэтоголешу",
        "зайка",
        "гандон",
        "лабубушка",
        "лешк",
        "катен",
        "пидор"
    ];

    let currentIndex = 0;

    const wordSlots = document.getElementById('word-slots');
    const wordNum = document.getElementById('word-num');
    const form = document.getElementById('guess-form');
    const input = document.getElementById('word-input');
    const errorMsg = document.getElementById('error-msg');
    const finalOverlay = document.getElementById('final-overlay');
    const photo = document.getElementById('target-photo');

    // Инициализация первого слова
    renderWordSlots(words[currentIndex]);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userGuess = input.value.trim().toLowerCase();
        const currentTarget = words[currentIndex].toLowerCase();

        if (userGuess === currentTarget) {
            // Ввела правильно
            errorMsg.classList.add('hidden');
            input.value = '';

            if (navigator.vibrate) {
                navigator.vibrate([40, 30, 40]);
            }

            currentIndex++;

            if (currentIndex < words.length) {
                wordNum.textContent = currentIndex + 1;
                renderWordSlots(words[currentIndex]);
            } else {
                // Введены все 8 слов
                triggerSuccess();
            }
        } else {
            // Ошибка
            errorMsg.classList.remove('hidden');
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            input.value = '';
        }
    });

    function renderWordSlots(word) {
        wordSlots.innerHTML = '';
        const len = word.length;

        for (let i = 0; i < len; i++) {
            const box = document.createElement('div');
            box.className = 'letter-box';

            // Открыты только первая (i === 0) и последняя (i === len - 1) буквы
            if (i === 0 || i === len - 1) {
                box.textContent = word[i].toUpperCase();
                box.classList.add('revealed');
            } else {
                box.textContent = '?';
                box.classList.add('hidden-char');
            }

            wordSlots.appendChild(box);
        }
    }

    function triggerSuccess() {
        // Записываем прохождение Дела №004
        localStorage.setItem('case4', 'passed');

        // Снимаем сепия-фильтр с фото
        photo.style.filter = 'none';

        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }

        setTimeout(() => {
            finalOverlay.classList.remove('hidden');
        }, 500);
    }
});