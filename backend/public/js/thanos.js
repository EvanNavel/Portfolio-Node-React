// /public/thanos.js

document.addEventListener("DOMContentLoaded", function () {
    const thanosWindows = document.querySelectorAll(".thanos-window");
    const thanosImages = document.querySelectorAll(".thanos-image");
    const sound = document.getElementById("boing-sound");

    // Function to move the Thanos window randomly within the viewport
    function moveThanosWindow(windowElement) {
        const maxX = window.innerWidth - windowElement.clientWidth; // Ensure the window stays inside the width
        const maxY = window.innerHeight - windowElement.clientHeight; // Ensure the window stays inside the height

        // Random position within the constraints of the viewport
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Move the window by applying the translate transform
        windowElement.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    // Move all windows every 3 seconds
    setInterval(() => {
        thanosWindows.forEach(window => moveThanosWindow(window));
    }, 3000);

    // Apply boing effect to each Thanos image
    thanosImages.forEach(thanos => {
        thanos.addEventListener("click", () => {
            // Play sound
            sound.currentTime = 0; // Reset sound if clicked again
            sound.play();

            // Apply animation
            thanos.style.animation = "boing 0.6s ease-out";

            // Remove animation after it finishes (so it can be clicked again)
            setTimeout(() => {
                thanos.style.animation = "";
            }, 600);
        });
    });
});
