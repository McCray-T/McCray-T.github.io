//Toggles the small-screen menu open/closed and flips the arrow direction
const nav = document.getElementById("main-nav");
const menuToggle = document.getElementById("menu-toggle");
const menuArrow = document.getElementById("menu-arrow");

menuToggle.onclick = () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuArrow.innerHTML = isOpen ? "&#9650;" : "&#9660;";
}

//Shows the clicked exercise's panel and hides the other one
const menuLinks = document.querySelectorAll(".menu-link");
const exercise1 = document.getElementById("exercise-1");
const exercise2 = document.getElementById("exercise-2");

menuLinks.forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        menuLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        exercise1.classList.toggle("hidden", link.dataset.exercise !== "1");
        exercise2.classList.toggle("hidden", link.dataset.exercise === "1");
    }
});
