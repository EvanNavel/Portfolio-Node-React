document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".item");
    const activeBox = document.querySelector(".active-box");
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    // Function to adjust the active box
    function adjustActiveBox(elem) {
        const link = elem.querySelector("a");
        if (!link || window.innerWidth <= 1096) return;

        const navbar = document.querySelector('.navbar');
        const navbarRect = navbar.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        activeBox.style.width = `${linkRect.width}px`;
        activeBox.style.left = `${linkRect.left - navbarRect.left}px`;
        activeBox.style.opacity = '1';
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
                if (window.innerWidth > 1096) {
                    link.style.backgroundColor = vars.$hover-color;
                }
                adjustActiveBox(item);
                foundActive = true;
            } else {
                item.classList.remove("active");
                link.style.backgroundColor = '';
            }
        });

        if (!foundActive && items.length > 0) {
            items[0].classList.add("active");
            if (window.innerWidth > 1096) {
                items[0].querySelector('a').style.backgroundColor = vars.$hover-color;
            }
            adjustActiveBox(items[0]);
        }
    }

    // Handle hover
    items.forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
            if (!elem.classList.contains("active") && window.innerWidth > 1096) {
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
            items.forEach((item) => {
                item.classList.remove("active");
                item.querySelector('a').style.backgroundColor = '';
            });
            elem.classList.add("active");
            
            if (window.innerWidth > 1096) {
                elem.querySelector('a').style.backgroundColor = vars.$hover-color;
            }
            
            adjustActiveBox(elem);

            // Close mobile menu if open
            if (window.innerWidth <= 1096) {
                navList.classList.remove("active");
                menuToggle.textContent = "☰";
            }
        });
    });

    // Recalculate position on resize
    window.addEventListener("resize", () => {
        const activeItem = document.querySelector(".item.active");
        if (activeItem) {
            adjustActiveBox(activeItem);
            // Update background colors on resize
            if (window.innerWidth > 1096) {
                activeItem.querySelector('a').style.backgroundColor = vars.$hover-color;
            } else {
                items.forEach(item => {
                    item.querySelector('a').style.backgroundColor = '';
                });
            }
            // Close mobile menu if resized to desktop
            if (window.innerWidth > 1096) {
                navList.classList.remove("active");
                menuToggle.textContent = "☰";
            }
        }
    });

    // Hamburger menu functionality
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");
        menuToggle.textContent = navList.classList.contains("active") ? "✖" : "☰";
    });

    // Initialize
    setActiveBasedOnURL();
    // Hide active box initially until positioned
    setTimeout(() => activeBox.style.opacity = '1', 10);
});