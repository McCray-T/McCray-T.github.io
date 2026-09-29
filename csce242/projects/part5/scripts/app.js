const nav = document.getElementById("main-nav");
const navToggle = document.getElementById("nav-toggle");

navToggle.onclick = () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
};
