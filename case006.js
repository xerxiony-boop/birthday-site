document.addEventListener('DOMContentLoaded', () => {
    // Ответы (приводим к нижнему регистру для гибкой проверки)
    const answers = [
        ["фартик", "fartik"],
        ["мира", "mira"],
        ["26.04.84", "26.04.1984", "26/04/84", "26 04 84"]
    ];

    let currentStep = 1;

    const stepNum = document.getElementById('step-num');
    const errorMsg = document.getElementById('error-msg');
    const finalOverlay = document.getElementById('final-overlay');

    // Настройка обработки трех форм
    for (let i = 1; i <= 3; i++) {
        const form = document.getElementById(`form-${i}`);
        const input = document.getElementById(`ans-${i}`);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = input.value.trim().toLowerCase();

            // Проверяем с вариантами допустимых ответов
            if (answers[i - 1].includes(val)) {
                // Правильный ответ!
                errorMsg.classList.add('hidden');
                markQuestionPassed(i);

                if (navigator.vibrate) {
                    navigator.vibrate([40, 30, 40]);
                }

                if (i < 3) {
                    currentStep++;
                    stepNum.textContent = currentStep;
                    activateQuestion(currentStep);
                } else {
                    // Все 3 ответа получены
                    triggerSuccess();
                }
            } else {
                // Ошибка
                errorMsg.classList.remove('hidden');
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
            }
        });
    }

    function markQuestionPassed(qNum) {
        const block = document.getElementById(`q${qNum}-block`);
        const status = document.getElementById(`q${qNum}-status`);
        const input = document.getElementById(`ans-${qNum}`);
        const btn = block.querySelector('.send-btn');

        block.classList.remove('active');
        block.classList.add('passed');
        status.textContent = '✓ ВЕРНО';
        status.style.color = '#00ff66';

        input.disabled = true;
        btn.disabled = true;
    }

    function activateQuestion(qNum) {
        const block = document.getElementById(`q${qNum}-block`);
        const status = document.getElementById(`q${qNum}-status`);
        const input = document.getElementById(`ans-${qNum}`);
        const btn = block.querySelector('.send-btn');

        block.classList.remove('locked');
        block.classList.add('active');
        status.textContent = '● АКТИВЕН';

        input.disabled = false;
        btn.disabled = false;
        input.focus();
    }

    function triggerSuccess() {
        // Сохраняем прохождение 6-й карточки
        localStorage.setItem('case6', 'passed');

        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }

        setTimeout(() => {
            finalOverlay.classList.remove('hidden');
        }, 500);
    }
});