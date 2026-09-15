document.addEventListener('DOMContentLoaded', () => {

    const waxSeal = document.getElementById('waxSeal');
    const flapTop = document.getElementById('flapTop');
    const letter = document.getElementById('letter');
    const tapHint = document.getElementById('tapHint');
    const envelope = document.getElementById('envelope');

    let isOpen = false;

    waxSeal.addEventListener('click', () => {
        if (isOpen) return;
        isOpen = true;

        // 1. Осколки печати
        const rect = waxSeal.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 18; i++) {
            const shard = document.createElement('div');
            shard.className = 'seal-shard';
            shard.style.left = `${centerX}px`;
            shard.style.top = `${centerY}px`;
            document.body.appendChild(shard);

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 100 + 40;
            const rx = Math.cos(angle) * dist;
            const ry = Math.sin(angle) * dist + 60;

            requestAnimationFrame(() => {
                shard.style.transform = `translate(${rx}px, ${ry}px) scale(0)`;
                shard.style.opacity = '0';
            });

            setTimeout(() => shard.remove(), 750);
        }

        // Исчезновение подсказки и печати
        tapHint.style.opacity = '0';
        waxSeal.style.opacity = '0';
        waxSeal.style.pointerEvents = 'none';

        // 2. Откидывание 3D-клапана
        flapTop.classList.add('open');

        // 3. Лист выдвигается вверх из конверта
        setTimeout(() => {
            letter.style.transform = 'translateY(-120px)';
        }, 400);

        // 4. Конверт с плавной анимацией растворяется, уступая место полноразмерному письму
        setTimeout(() => {
            envelope.style.opacity = '0';
            envelope.style.transform = 'scale(0.9)';

            setTimeout(() => {
                envelope.style.display = 'none';
                tapHint.style.display = 'none';
                
                // Создаем и показываем распахнутое письмо
                const fullCard = document.createElement('div');
                fullCard.className = 'letter-card-full';
                fullCard.innerHTML = letter.innerHTML;
                document.querySelector('.envelope-wrapper').appendChild(fullCard);

                requestAnimationFrame(() => {
                    fullCard.classList.add('show');
                });
            }, 500);
        }, 1200);
    });

    // Фон с частицами
    const canvas = document.getElementById('sparkles');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 30 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2,
        v: Math.random() * 0.3 + 0.1
    }));

    function loop() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.y -= p.v;
            if (p.y < 0) p.y = h;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(loop);
    }
    loop();
});