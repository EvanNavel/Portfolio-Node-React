// /public/thanos.js

document.addEventListener("DOMContentLoaded", function () {
    const thanosWindows = document.querySelectorAll(".thanos-window");
    const thanosImages = document.querySelectorAll(".thanos-image");
    const sound = document.getElementById("boing-sound");
    const introSound = document.getElementById("intro-sound");
    let welcomeSoundPlayed = false; // Flag to track if welcome sound has been played

    // Function to move the Thanos window
    function moveThanosWindow(windowElement) {
        const maxX = window.innerWidth - windowElement.offsetWidth;
        const maxY = window.innerHeight - windowElement.offsetHeight - 100;
    
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY) + 100;
    
        // Use absolute positioning instead of transform
        windowElement.style.left = `${randomX}px`;
        windowElement.style.top = `${randomY}px`;
    }

    // Move all windows every 3 seconds
    setInterval(() => {
        thanosWindows.forEach(window => moveThanosWindow(window));
    }, 3000);

    // Play the welcome sound on the first click
    document.body.addEventListener("click", function () {
        if (!welcomeSoundPlayed) {
            introSound.play();
            welcomeSoundPlayed = true;
        }
    });

    // Apply boing effect to each Thanos image
    thanosImages.forEach(thanos => {
        thanos.addEventListener("click", () => {
            if (welcomeSoundPlayed) {
                sound.currentTime = 0;
                sound.play();

                // Apply animation
                thanos.style.animation = "boing 0.6s ease-out";

                setTimeout(() => {
                    thanos.style.animation = "";
                }, 600);
            }
        });
    });
});
