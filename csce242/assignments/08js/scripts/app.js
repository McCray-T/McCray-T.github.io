//Toggles the small-screen menu open/closed and flips the arrow direction
const nav = document.getElementById("main-nav");
const menuToggle = document.getElementById("menu-toggle");
const menuArrow = document.getElementById("menu-arrow");

menuToggle.onclick = () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuArrow.innerHTML = isOpen ? "&#9650;" : "&#9660;";
}
