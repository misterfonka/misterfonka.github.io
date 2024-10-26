const fullTitle = "misterfonka";
let title = "m";
let growing = true;
let index = 1;

function updateTitle() {
    if (growing) {
        title = fullTitle.substring(0, index + 1);
        index++;
        if (index === fullTitle.length) {
            growing = false;
        }
    } else {
        title = fullTitle.substring(0, index - 1);
        index--;
        if (index === 1) {
            growing = true;
        }
    }
    document.title = title;
}

setInterval(updateTitle, 300);

document.addEventListener("DOMContentLoaded", () => {
    const badgeContainer = document.querySelector("#badge-container");
    const badges = badgeContainer.innerHTML;

    badgeContainer.innerHTML += badges;

    const scrollSpeed = 2;
    let scrollAmount = 0;
    let scrollInterval = null;

    function scrollBadges() {
        const containerWidth = badgeContainer.offsetWidth;
        const contentWidth = badgeContainer.scrollWidth;

        scrollAmount += scrollSpeed;
        if (scrollAmount >= contentWidth / 2) {
            scrollAmount = 0;
        }
        badgeContainer.style.transform = `translateX(-${scrollAmount}px)`;
    }

    function startScrolling() {
        if (!scrollInterval) {
            scrollInterval = setInterval(scrollBadges, 16);
        }
    }

    function stopScrolling() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    startScrolling();

    badgeContainer.addEventListener("mouseenter", stopScrolling);

    badgeContainer.addEventListener("mouseleave", startScrolling);
});

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const audioElement = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");

    let isMuted = false;
    let overlayVisible = true;

    document.body.addEventListener("click", (event) => {
        if (!muteButton.contains(event.target)) {
            overlay.classList.add("fade-out");
            fadeOutBlur(overlay);
            overlayVisible = false;

            setTimeout(() => {
                if (!isMuted && !overlayVisible) {
                    audioElement.play().catch((error) => {
                        console.error("Failed to play audio:", error);
                    });
                }
            }, 1000);
        }
    });

    muteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        if (isMuted) {
            audioElement.play();
            muteButton.classList.remove("fa-volume-xmark");
            muteButton.classList.add("fa-volume-high");
        } else {
            audioElement.pause();
            muteButton.classList.remove("fa-volume-high");
            muteButton.classList.add("fa-volume-xmark");
        }
        isMuted = !isMuted;
    });

    function fadeOutBlur(element) {
        let blurValue = 5;
        let fadeInterval = setInterval(() => {
            blurValue -= 0.1;
            element.style.backdropFilter = `blur(${blurValue}px)`;

            if (blurValue <= 0) {
                clearInterval(fadeInterval);
            }
        }, 50);
    }
});