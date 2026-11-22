document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu toggle
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");

    if (navToggle && mainNav) {
        const closeNav = () => {
            navToggle.classList.remove("is-open");
            mainNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        };

        navToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = mainNav.classList.toggle("is-open");
            navToggle.classList.toggle("is-open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeNav);
        });

        document.addEventListener("click", (e) => {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
                closeNav();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeNav();
            }
        });
    }

    // Game iframe loader & fullscreen
    const gameFrame = document.getElementById("gameFrame");
    const startBtn = document.getElementById("startGame");
    const gameIframe = document.getElementById("gameIframe");
    const fullscreenBtn = document.getElementById("fullscreenGame");

    if (startBtn && gameFrame && gameIframe) {
        startBtn.addEventListener("click", () => {
            const src = gameIframe.getAttribute("data-src");
            if (src && !gameIframe.getAttribute("src")) {
                gameIframe.setAttribute("src", src);
            }
            gameFrame.classList.add("playing");

            if (fullscreenBtn) {
                fullscreenBtn.hidden = false;
            }
        });
    }

    if (fullscreenBtn && gameFrame) {
        fullscreenBtn.addEventListener("click", () => {
            if (gameFrame.requestFullscreen) {
                gameFrame.requestFullscreen();
            } else if (gameFrame.webkitRequestFullscreen) {
                gameFrame.webkitRequestFullscreen();
            } else if (gameFrame.msRequestFullscreen) {
                gameFrame.msRequestFullscreen();
            }
        });
    }
});