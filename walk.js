document.addEventListener('DOMContentLoaded', () => {
    initFloatingParticles();
    initScrollAnimations();
    initPhotoModal();
    initSparkleEffects();
    initPageTransition();
});

function initFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const count = window.innerWidth < 768 ? 25 : 45;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');

        const size = Math.random() * 3.5 + 1.5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${100 + Math.random() * 20}%`;

        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 7}s`;

        container.appendChild(particle);
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

function initPhotoModal() {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    if (!modal || !modalImg) return;

    document.querySelectorAll('.clickable-photo').forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            if (modalCaption) {
                modalCaption.textContent = img.getAttribute('data-caption') || '';
            }
            modal.classList.add('active');
        });
    });

    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

function initSparkleEffects() {
    const trigger = document.querySelector('.js-spark-trigger');

    function createSparks(x, y, amount = 14) {
        for (let i = 0; i < amount; i++) {
            const spark = document.createElement('div');
            spark.className = 'magic-spark';

            const size = Math.random() * 4 + 2;
            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;

            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 75 + 20;
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
            createSparks(x, y, 18);
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