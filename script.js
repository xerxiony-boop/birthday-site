document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initParallax();
    initPageTransition();
    initSparkleEffects();
});

function initStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;

    const count = window.innerWidth < 768 ? 30 : 60;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star-particle');

        const size = Math.random() * 2.5 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;

        container.appendChild(star);
    }
}

function initParallax() {
    const cardContent = document.querySelector('.card-content');
    const glow = document.querySelector('.ambient-glow');

    if (!cardContent) return;

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 18;

        cardContent.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`;
        if (glow) {
            glow.style.transform = `translate3d(${-50 + x * 0.3}%, ${-50 + y * 0.3}%, 0)`;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const x = (touch.clientX / window.innerWidth - 0.5) * 12;
            const y = (touch.clientY / window.innerHeight - 0.5) * 12;

            cardContent.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0)`;
        }
    }, { passive: true });
}

function initSparkleEffects() {
    const trigger = document.querySelector('.js-spark-trigger');

    function createSparks(x, y, amount = 12) {
        for (let i = 0; i < amount; i++) {
            const spark = document.createElement('div');
            spark.className = 'magic-spark';

            const size = Math.random() * 4 + 2;
            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;

            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 60 + 20;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            spark.style.setProperty('--dx', `${dx}px`);
            spark.style.setProperty('--dy', `${dy}px`);

            document.body.appendChild(spark);

            setTimeout(() => spark.remove(), 800);
        }
    }

    if (trigger) {
        trigger.addEventListener('click', () => {
            const rect = trigger.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createSparks(x, y, 16);
        });
    }

    let touchThrottle = false;
    window.addEventListener('touchmove', (e) => {
        if (!touchThrottle && e.touches.length > 0) {
            touchThrottle = true;
            const touch = e.touches[0];
            createSparks(touch.clientX, touch.clientY, 2);
            setTimeout(() => { touchThrottle = false; }, 80);
        }
    }, { passive: true });
}

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