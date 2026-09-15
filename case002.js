document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('answer-form');
    const input = document.getElementById('answer-input');
    const responseBox = document.getElementById('response-box');
    const responseText = document.getElementById('response-text');
    const glitchScreen = document.getElementById('glitch-screen');
    const finalScreen = document.getElementById('final-screen');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const answer = input.value.trim().toLowerCase();
        if (!answer) return;

        // 1. ЕСЛИ ОТВЕТ "НЕТ"
        if (answer === 'нет' || answer === 'net') {
            showResponse('НЕ ОБМАНЫВАЙ.');
            triggerVibrate([40, 30, 40]);
        } 
        // 2. ЕСЛИ ОТВЕТ "ДА" (ПОБЕДА)
        else if (answer === 'да' || answer === 'da') {
            responseBox.classList.add('hidden');
            triggerSuccess();
        } 
        // 3. ПАСХАЛКА 1: "Возможно / Не помню"
        else if (['возможно', 'не помню', 'хз', 'секрет'].includes(answer)) {
            showResponse('ОБНАРУЖЕНО СОПРЕТИВЛЕНИЕ. ОТВЕТЬ ЧЁТКО.');
            triggerVibrate([50]);
        }
        // 4. ПАСХАЛКА 2: "Ты / Сам сосал"
        else if (['сам', 'ты', 'а ты', 'сам сосал'].includes(answer)) {
            showResponse('ОШИБКА // ОБЪЕКТ ПЫТАЕТСЯ АТАКОВАТЬ ТЕРМИНАЛ.');
            triggerGlitch();
        }
        // 5. ЛЮБОЙ ДРУГОЙ ТЕКСТ -> СИНИЙ ГЛИТЧ НА 2 СЕКУНДЫ
        else {
            triggerGlitch();
        }

        input.value = '';
    });

    function showResponse(msg) {
        responseText.textContent = msg;
        responseBox.classList.remove('hidden');
    }

    function triggerGlitch() {
        responseBox.classList.add('hidden');
        triggerVibrate([100, 50, 100]);

        glitchScreen.classList.add('active');

        setTimeout(() => {
            glitchScreen.classList.remove('active');
        }, 2000); // Глитч ровно на 2 секунды
    }

    function triggerSuccess() {
        // Записываем прохождение Дела №002
        localStorage.setItem('case2', 'passed');

        triggerVibrate([60, 40, 120]);

        // Показываем темно-синий экран с вердиктом "УСЛЫШАЛ."
        finalScreen.classList.remove('hidden');
    }

    function triggerVibrate(pattern) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }
});