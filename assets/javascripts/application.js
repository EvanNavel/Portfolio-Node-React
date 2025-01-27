document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".item");
    const activeBox = document.createElement("div");
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    // Add the active box to the navbar
    activeBox.classList.add("active-box");
    document.querySelector(".navbar").appendChild(activeBox);

    // Function to adjust the active box
    function adjustActiveBox(elem) {
        activeBox.style.width = `${elem.clientWidth}px`;
        activeBox.style.height = `${elem.clientHeight}px`;
        activeBox.style.left = `${elem.offsetLeft}px`;
    }

    // Normalize paths to handle relative URLs
    function normalizePath(path) {
        const anchor = document.createElement("a");
        anchor.href = path;
        return anchor.pathname;
    }

    // Set active item based on URL
    function setActiveBasedOnURL() {
        const currentPath = normalizePath(window.location.pathname);
        let foundActive = false;

        items.forEach((item) => {
            const link = normalizePath(item.querySelector("a").getAttribute("href"));
            if (currentPath === link) {
                item.classList.add("active-item");
                adjustActiveBox(item);
                foundActive = true;
            } else {
                item.classList.remove("active-item");
            }
        });

        if (!foundActive && items.length > 0) {
            items[0].classList.add("active-item");
            adjustActiveBox(items[0]);
        }
    }

    // Handle hover
    items.forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
            adjustActiveBox(elem);
        });

        elem.addEventListener("mouseleave", () => {
            const activeItem = document.querySelector(".active-item");
            if (activeItem) {
                adjustActiveBox(activeItem);
            }
        });
    });

    // Handle clicks
    items.forEach((elem) => {
        elem.addEventListener("click", () => {
            items.forEach((item) => item.classList.remove("active-item"));
            elem.classList.add("active-item");
            adjustActiveBox(elem);
        });
    });

    // Recalculate position on resize
    window.addEventListener("resize", () => {
        const activeItem = document.querySelector(".active-item");
        if (activeItem) adjustActiveBox(activeItem);
    });

    // Initialize
    setActiveBasedOnURL();

    // Hamburger menu functionality
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");

        // Toggle the hamburger icon
        if (menuToggle.innerHTML.trim() === "☰") {
            menuToggle.innerHTML = "✖";
        } else {
            menuToggle.innerHTML = "☰";
        }
    });
});
