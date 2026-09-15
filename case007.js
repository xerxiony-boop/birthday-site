document.addEventListener('DOMContentLoaded', () => {

    // 1. АВТОПРОИГРЫВАНИЕ ВИДЕО ПРИ НАВЕДЕНИИ
    const videoCards = document.querySelectorAll('.media-card.video');
    
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        
        card.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
        });
        
        card.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // 2. LIGHTBOX (ПОЛНОЭКРАННЫЙ ПРОСМОТР)
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.querySelector('.lightbox-close');
    const allCards = document.querySelectorAll('.media-card');

    allCards.forEach(card => {
        card.addEventListener('click', () => {
            lightboxContent.innerHTML = ''; // Очистка
            
            if (card.classList.contains('photo')) {
                const img = card.querySelector('img');
                const newImg = document.createElement('img');
                newImg.src = img.src;
                lightboxContent.appendChild(newImg);
            } else if (card.classList.contains('video')) {
                const video = card.querySelector('video');
                const newVideo = document.createElement('video');
                newVideo.src = video.src;
                newVideo.controls = true;
                newVideo.autoplay = true;
                lightboxContent.appendChild(newVideo);
            }
            
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => { lightboxContent.innerHTML = ''; }, 400);
    }

    // 3. ИНТЕРАКТИВНЫЙ ФОН: ПАРЯЩИЕ РОЗОВЫЕ ЧАСТИЦЫ (CANVAS)
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            color: `rgba(255, ${Math.floor(Math.random() * 100 + 100)}, 178, ${Math.random() * 0.5 + 0.2})`,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff3385';
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 4. ЭФФЕКТ КЛИКА: ВЫЛЕТАЮЩИЕ ИСКРЫ В МЕСТЕ КЛИКА
    window.addEventListener('click', (e) => {
        // Не спамить при клике на модалку
        if (e.target.closest('.lightbox')) return;

        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('div');
            spark.className = 'click-spark';
            spark.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 6px;
                height: 6px;
                background: #ff99cc;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 8px #ff3385;
                transition: transform 0.6s ease-out, opacity 0.6s ease-out;
            `;
            document.body.appendChild(spark);

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 40 + 20;

            setTimeout(() => {
                spark.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
                spark.style.opacity = '0';
            }, 10);

            setTimeout(() => spark.remove(), 650);
        }
    });

    // 5. 3D-TILT ЭФФЕКТ (НАКЛОН КАРТОЧЕК ЗА МЫШЬЮ)
    allCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            card.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
});