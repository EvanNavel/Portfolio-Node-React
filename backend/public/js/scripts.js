// public/js/scripts.js
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".item");
    const activeBox = document.querySelector(".active-box");
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    // Function to adjust the active box
    function adjustActiveBox(elem) {
        const link = elem.querySelector("a");
        if (!link) return;
        
        activeBox.style.width = `${link.offsetWidth}px`;
        activeBox.style.height = `${link.offsetHeight}px`;
        activeBox.style.left = `${link.offsetLeft}px`;
    }

    // Normalize paths to handle relative URLs
    function normalizePath(path) {
        return new URL(path, window.location.origin).pathname;
    }

    // Set active item based on URL
    function setActiveBasedOnURL() {
        const currentPath = normalizePath(window.location.pathname);
        let foundActive = false;

        items.forEach((item) => {
            const link = item.querySelector("a");
            if (!link) return;
            
            const linkPath = normalizePath(link.getAttribute("href"));
            
            if (currentPath === linkPath) {
                item.classList.add("active");
                adjustActiveBox(item);
                foundActive = true;
            } else {
                item.classList.remove("active");
            }
        });

        if (!foundActive && items.length > 0) {
            items[0].classList.add("active");
            adjustActiveBox(items[0]);
        }
    }

    // Handle hover
    items.forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
            if (!elem.classList.contains("active")) {
                adjustActiveBox(elem);
            }
        });

        elem.addEventListener("mouseleave", () => {
            const activeItem = document.querySelector(".item.active");
            if (activeItem) adjustActiveBox(activeItem);
        });
    });

    // Handle clicks
    items.forEach((elem) => {
        elem.addEventListener("click", () => {
            items.forEach((item) => item.classList.remove("active"));
            elem.classList.add("active");
            adjustActiveBox(elem);
        });
    });

    // Recalculate position on resize
    window.addEventListener("resize", () => {
        const activeItem = document.querySelector(".item.active");
        if (activeItem) adjustActiveBox(activeItem);
    });

    // Hamburger menu functionality
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");
        menuToggle.textContent = navList.classList.contains("active") ? "✖" : "☰";
    });

    // Initialize
    setActiveBasedOnURL();
});