document.addEventListener('DOMContentLoaded', () => {
    const rightHalf = document.getElementById('right-half');
    const leftHalf = document.getElementById('left-half');
    const ripPercent = document.getElementById('rip-percent');
    const finalOverlay = document.getElementById('final-overlay');

    let isDragging = false;
    let startX = 0;
    let currentDragX = 0;
    const maxDistance = 140; // Расстояние полгода разрыва
    let isRipped = false;

    // Начало тяги (мышь / тачскрин)
    const onStart = (e) => {
        if (isRipped) return;
        isDragging = true;
        startX = e.touches ? e.touches[0].clientX : e.clientX;
    };

    // Процесс перетягивания
    const onMove = (e) => {
        if (!isDragging || isRipped) return;

        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        let deltaX = currentX - startX;

        // Двигаем только вправо
        if (deltaX < 0) deltaX = 0;
        if (deltaX > maxDistance) deltaX = maxDistance;

        currentDragX = deltaX;

        // Трансформируем половинки фото
        rightHalf.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
        leftHalf.style.transform = `translateX(${-deltaX * 0.3}px) rotate(${-deltaX * 0.03}deg)`;

        // Считаем процент разрыва
        const pct = Math.round((deltaX / maxDistance) * 100);
        ripPercent.textContent = `${pct}%`;

        // Вибрация по мере разрыва
        if (navigator.vibrate && pct % 15 === 0 && pct > 0) {
            navigator.vibrate(20 + pct);
        }

        // Если растянула на 100%
        if (pct >= 100) {
            isRipped = true;
            isDragging = false;
            triggerRupture();
        }
    };

    // Если отпустила раньше 100% — возвращаем назад
    const onEnd = () => {
        if (!isDragging || isRipped) return;
        isDragging = false;

        rightHalf.style.transition = 'transform 0.3s ease';
        leftHalf.style.transition = 'transform 0.3s ease';

        rightHalf.style.transform = 'translateX(0px) rotate(0deg)';
        leftHalf.style.transform = 'translateX(0px) rotate(0deg)';
        ripPercent.textContent = '0%';

        setTimeout(() => {
            rightHalf.style.transition = 'transform 0.05s ease-out';
            leftHalf.style.transition = 'transform 0.05s ease-out';
        }, 300);
    };

    // Слушатели событий
    rightHalf.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    rightHalf.addEventListener('touchstart', onStart);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);

    function triggerRupture() {
        // Записываем прохождение Дела №005
        localStorage.setItem('case5', 'passed');

        if (navigator.vibrate) {
            navigator.vibrate([150, 50, 250, 50, 400]);
        }

        // Анимация разлёта половин
        rightHalf.style.transition = 'transform 0.4s ease-in';
        leftHalf.style.transition = 'transform 0.4s ease-in';

        rightHalf.style.transform = 'translateX(300px) rotate(25deg)';
        leftHalf.style.transform = 'translateX(-300px) rotate(-25deg)';

        setTimeout(() => {
            finalOverlay.classList.remove('hidden');
        }, 400);
    }
});