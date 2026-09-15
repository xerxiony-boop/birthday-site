document.addEventListener('DOMContentLoaded', () => {
    initArchiveLogic();
    initLockedGlitchEffect();
    initResetButton();
});

/* Главная логика цепи разблокировки */
function initArchiveLogic() {
    const cases = document.querySelectorAll('.case');
    const progressCounter = document.getElementById('progress-counter');
    const archiveStatus = document.getElementById('archive-status');

    let passedCount = 0;

    // 1. Проверяем пройденные карточки
    cases.forEach((caseEl) => {
        const caseNum = caseEl.getAttribute('data-case');
        const caseTitle = caseEl.getAttribute('data-title');
        const caseLink = caseEl.getAttribute('data-link');

        const nameEl = caseEl.querySelector('.case-name');
        const statusEl = caseEl.querySelector('.status');
        const statusTextEl = caseEl.querySelector('.status-text');

        if (caseNum === '8') return;

        const isPassed = localStorage.getItem(`case${caseNum}`) === 'passed';

        if (isPassed) {
            passedCount++;
            caseEl.classList.add('passed', 'unlocked');
            caseEl.removeAttribute('data-locked');
            caseEl.href = caseLink;
            if (nameEl) nameEl.textContent = caseTitle;
            if (statusEl) statusEl.textContent = 'PASSED';
            if (statusTextEl) statusTextEl.textContent = 'ВЫПОЛНЕНО';
        } else {
            caseEl.setAttribute('data-locked', 'true');
        }
    });

    // 2. Открываем следующее дело по счету
    const nextCaseNum = passedCount + 1;

    cases.forEach((caseEl) => {
        const caseNum = parseInt(caseEl.getAttribute('data-case'));
        const caseTitle = caseEl.getAttribute('data-title');
        const caseLink = caseEl.getAttribute('data-link');

        const nameEl = caseEl.querySelector('.case-name');
        const statusEl = caseEl.querySelector('.status');

        if (caseNum === nextCaseNum && caseNum <= 7) {
            caseEl.classList.add('unlocked');
            caseEl.removeAttribute('data-locked');
            caseEl.href = caseLink;
            if (nameEl) nameEl.textContent = caseTitle;
            if (statusEl) statusEl.textContent = 'OPEN';
        }
    });

    // 3. Обновляем счётчик
    if (progressCounter) {
        progressCounter.textContent = `0${passedCount} / 07`;
    }

    // 4. Разблокировка 8-й карточки при 7/7
    if (passedCount >= 7) {
        const secretCase = document.getElementById('secret-case');
        if (secretCase) {
            secretCase.classList.add('unlocked');
            secretCase.removeAttribute('data-locked');
            secretCase.href = secretCase.getAttribute('data-link') || 'beauty.html';

            const secretName = secretCase.querySelector('.case-name');
            const secretStatus = secretCase.querySelector('.status');
            const secretDesc = secretCase.querySelector('.case-desc');
            const secretStatusText = secretCase.querySelector('.status-text');

            if (secretName) secretName.textContent = 'САМАЯ КРАСИВАЯ';
            if (secretStatus) secretStatus.textContent = 'UNLOCKED';
            if (secretDesc) secretDesc.innerHTML = 'Файл расшифрован.<br>Объект невероятной красоты доступен для просмотра. ✨';
            if (secretStatusText) secretStatusText.textContent = 'ACCESS GRANTED';
        }

        if (archiveStatus) {
            archiveStatus.textContent = 'UNLOCKED';
            archiveStatus.className = 'pulse-green';
        }
    }
}

/* Пугающий глитч-эффект при тапе на закрытые дела */
function initLockedGlitchEffect() {
    document.querySelectorAll('.case').forEach(caseEl => {
        caseEl.addEventListener('click', (e) => {
            if (caseEl.hasAttribute('data-locked')) {
                e.preventDefault();

                // Тревожная вибрация
                if (navigator.vibrate) {
                    navigator.vibrate([60, 40, 60]);
                }

                // Визуальный сбой экрана
                document.body.classList.add('glitch-active');
                setTimeout(() => {
                    document.body.classList.remove('glitch-active');
                }, 350);
            }
        });
    });
}

/* Сброс прогресса для теста */
function initResetButton() {
    const resetBtn = document.getElementById('reset-btn');
    if (!resetBtn) return;

    resetBtn.addEventListener('click', () => {
        if (confirm('Сбросить весь прогресс прохождения?')) {
            for (let i = 1; i <= 8; i++) {
                localStorage.removeItem(`case${i}`);
            }
            location.reload();
        }
    });
}