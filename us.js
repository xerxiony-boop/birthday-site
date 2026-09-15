document.addEventListener('DOMContentLoaded', () => {
    initFloatingParticles();
    initScrollAnimations();
    initPhotoModal();
    initPageTransition();
    initTogetherTimer();
    initHeartBurst();
    init3DTilt();
});

/* 1. Фоновые светлячки */
function initFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const count = window.innerWidth < 768 ? 20 : 35;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');

        const size = Math.random() * 3 + 1.5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${100 + Math.random() * 20}%`;

        particle.style.animationDelay = `${Math.random() * 7}s`;
        particle.style.animationDuration = `${6 + Math.random() * 6}s`;

        container.appendChild(particle);
    }
}

/* 2. Живой счётчик дней */
function initTogetherTimer() {
    const timerEl = document.getElementById('together-timer');
    if (!timerEl) return;

    // Укажи точную дату и время начала ваших отношений (Год, Месяц(0-11), День, Часы, Минуты)
    const startDate = new Date(2026, 6, 28, 4, 11); // 28 июля 2024 года, 04:11

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) {
            timerEl.textContent = "Всё только начинается...";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        timerEl.textContent = `Вместе уже ${days} дн. ${hours} ч. ${minutes} мин. 🤍`;
    }

    updateTimer();
    setInterval(updateTimer, 30000);
}

/* 3. Салют из сердечек при нажатии на 4 маленьких фото */
function initHeartBurst() {
    const hearts = ['🤍', '💖', '✨', '🌸', '💕'];

    document.querySelectorAll('.heart-trigger').forEach(el => {
        el.addEventListener('click', (e) => {
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            for (let i = 0; i < 12; i++) {
                const heart = document.createElement('span');
                heart.className = 'flying-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

                heart.style.left = `${x}px`;
                heart.style.top = `${y}px`;

                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 90 + 30;
                const dx = Math.cos(angle) * dist;
                const dy = Math.sin(angle) * dist;
                const rot = (Math.random() - 0.5) * 60;

                heart.style.setProperty('--dx', `${dx}px`);
                heart.style.setProperty('--dy', `${dy}px`);
                heart.style.setProperty('--rot', `${rot}deg`);

                document.body.appendChild(heart);

                setTimeout(() => heart.remove(), 1000);
            }
        });
    });
}

/* 4. 3D-Tilt эффект при движении пальца / мыши */
function init3DTilt() {
    if (window.innerWidth > 1024) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const rotateX = (-y / rect.height) * 12;
                const rotateY = (x / rect.width) * 12;

                card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }
}

/* 5. Увеличение фото (Исправлено) + Виброотклик */
function initPhotoModal() {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    if (!modal || !modalImg) return;

    document.querySelectorAll('.clickable-photo').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();

            // Виброотклик на смартфоне
            if (navigator.vibrate) {
                navigator.vibrate(40);
            }

            // Берем чистый src напрямую из элемента или родительской тега img
            const targetImg = img.tagName === 'IMG' ? img : img.querySelector('img');
            if (targetImg) {
                modalImg.src = targetImg.getAttribute('src') || targetImg.src;
            }

            // Достаем подпись из родительской карточки или самого фото
            const caption = img.getAttribute('data-caption') || 
                            img.closest('.photo-card')?.getAttribute('data-caption') || '';

            if (modalCaption) {
                modalCaption.textContent = caption;
            }

            modal.classList.add('active');
        });
    });

    // Закрытие по клику в любом месте модалки
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

/* 6. Появление при скролле */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

/* 7. Плавный переход */
function initPageTransition() {
    const nextBtn = document.querySelector('.js-next-btn');
    if (!nextBtn) return;

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = nextBtn.getAttribute('href');

        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500);
    });
}