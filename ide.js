const gallery = document.getElementById('gallery');
if (gallery) {
    const handle = document.getElementById('handle');
    const slides = [...gallery.querySelectorAll('.slide')];

    function focusSlides() {
        const mid = gallery.scrollLeft + gallery.clientWidth / 2;
        slides.forEach(s => {
            const c = s.offsetLeft + s.offsetWidth / 2;
            const d = Math.min(Math.abs(mid - c) / (s.offsetWidth * 1.2), 1);
            s.style.setProperty('--s', (1.22 - 0.22 * d).toFixed(3));
            s.style.zIndex = Math.round((1 - d) * 10);
            s.classList.toggle('active', d < 0.35);
        });
    }

    gallery.addEventListener('scroll', () => {
        focusSlides();
        handle.classList.add('hide');
    }, { passive: true });

    window.addEventListener('resize', focusSlides);

    focusSlides();
    if (slides[1]) {
        gallery.scrollLeft = slides[1].offsetLeft - (gallery.clientWidth - slides[1].offsetWidth) / 2;
    }

    function step(direction) {
        if (!slides[0]) return;
        const slideWidth = slides[0].offsetWidth + 20;
        gallery.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
    }

    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => step(1));

    let down = false;
    let startX = 0;
    let startLeft = 0;

    gallery.addEventListener('mousedown', e => {
        down = true;
        startX = e.pageX;
        startLeft = gallery.scrollLeft;
        gallery.classList.add('dragging');
    });

    window.addEventListener('mouseup', () => {
        down = false;
        gallery.classList.remove('dragging');
    });

    window.addEventListener('mousemove', e => {
        if (down) {
            e.preventDefault();
            gallery.scrollLeft = startLeft - (e.pageX - startX);
        }
    });
}

const gameFrame = document.getElementById('gameFrame');
const gameIframe = document.getElementById('gameIframe');
const startGame = document.getElementById('startGame');
const fullscreenGame = document.getElementById('fullscreenGame');

if (startGame && gameIframe && gameFrame) {
    startGame.addEventListener('click', () => {
        gameIframe.src = gameIframe.dataset.src;
        gameFrame.classList.add('playing');
        fullscreenGame.hidden = false;
    });

    if (fullscreenGame) {
        fullscreenGame.addEventListener('click', () => {
            if (gameFrame.requestFullscreen) {
                gameFrame.requestFullscreen();
            }
        });
    }
}