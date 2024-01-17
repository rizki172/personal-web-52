let isOpen = false;

function openHamburger() {
    let hamburgerNavContainer = document.getElementById("hamburger-nav-container");

    if (!isOpen) {
        hamburgerNavContainer.style.display = "flex";
        isOpen = true;
    } else {
        hamburgerNavContainer.style.display = "none";
        isOpen = false;
    }

    let desktopNavItems = document.querySelectorAll(".nav-link.nav-collapse");
    desktopNavItems.forEach(item => {
        item.style.display = isOpen ? "none" : "flex";
    });
}

function handleResize() {
    let windowWidth = window.innerWidth;

    if (windowWidth >= 576) {
        let hamburgerNavContainer = document.getElementById("hamburger-nav-container");
        hamburgerNavContainer.style.display = "none";

        let desktopNavItems = document.querySelectorAll(".nav-link.nav-collapse");
        desktopNavItems.forEach(item => {
            item.style.display = "flex";
        });

        isOpen = false;
    }
}

window.addEventListener('resize', handleResize);

window.addEventListener('load', handleResize);
