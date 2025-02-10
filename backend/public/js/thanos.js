// /public/thanos.js

document.addEventListener("DOMContentLoaded", function () {
    const thanosWindows = document.querySelectorAll(".thanos-window");
    const thanosImages = document.querySelectorAll(".thanos-image");
    const sound = document.getElementById("boing-sound");

    // Function to move the Thanos window randomly
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

    // Apply boing effect to each Thanos image
    thanosImages.forEach(thanos => {
        thanos.addEventListener("click", () => {
            sound.currentTime = 0;
            sound.play();

            // Apply animation
            thanos.style.animation = "boing 0.6s ease-out";

            // Remove animation after it finishes
            setTimeout(() => {
                thanos.style.animation = "";
            }, 600);
        });
    });
});
