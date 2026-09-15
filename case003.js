document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('decrypt-slider');
    const percentText = document.getElementById('percent-text');
    const photo = document.getElementById('target-photo');
    const censorBar = document.getElementById('censor-bar');
    const autoBtn = document.getElementById('auto-decrypt-btn');
    const finalOverlay = document.getElementById('final-overlay');

    let isCompleted = false;

    // Реакция на ползунок
    slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        updateDecryptProgress(val);
    });

    // Кнопка авто-взлома для быстрого снятия
    autoBtn.addEventListener('click', () => {
        let currentVal = parseInt(slider.value);
        const interval = setInterval(() => {
            currentVal += 2;
            if (currentVal >= 100) {
                currentVal = 100;
                clearInterval(interval);
            }
            slider.value = currentVal;
            updateDecryptProgress(currentVal);
        }, 30);
    });

    function updateDecryptProgress(val) {
        percentText.textContent = `${val}%`;

        // 1. Постепенно уменьшаем размытие (от 25px до 0px)
        const blurVal = 25 * (1 - val / 100);
        // 2. Возвращаем цвет (от 90% чб до 0%)
        const grayVal = 90 * (1 - val / 100);
        
        photo.style.filter = `blur(${blurVal}px) grayscale(${grayVal}%)`;

        // 3. Прозрачность и увеличение цензурного блока
        censorBar.style.opacity = (1 - val / 100);
        censorBar.style.transform = `scale(${1 - val / 200})`;

        // Легкая вибрация при движении ползунка
        if (navigator.vibrate && val % 10 === 0) {
            navigator.vibrate(15);
        }

        // 4. Финал при 100%
        if (val >= 100 && !isCompleted) {
            isCompleted = true;
            triggerSuccess();
        }
    }

    function triggerSuccess() {
        // Сохраняем прохождение 3-й карточки
        localStorage.setItem('case3', 'passed');

        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }

        // Показываем модальное окно завершения
        setTimeout(() => {
            finalOverlay.classList.remove('hidden');
        }, 400);
    }
});