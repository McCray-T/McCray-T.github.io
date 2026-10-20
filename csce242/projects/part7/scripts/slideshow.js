//homepage slideshow: previews each page of the site, with arrows, dots, and auto-advance
const slides = document.querySelectorAll("#slides .slide");
const slideTitle = document.getElementById("slide-title");
const slideText = document.getElementById("slide-text");
const dotsBox = document.getElementById("slide-dots");
const dots = [];
let currentIndex = 0;
let timer = null;

//show the slide at the given index, wrapping around at either end
const showSlide = (index) => {
    slides[currentIndex].classList.add("hidden");
    dots[currentIndex].classList.remove("active");
    dots[currentIndex].removeAttribute("aria-current");

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.remove("hidden");
    dots[currentIndex].classList.add("active");
    dots[currentIndex].setAttribute("aria-current", "true");
    slideTitle.textContent = slides[currentIndex].dataset.title;
    slideText.textContent = slides[currentIndex].dataset.text;
};

const startTimer = () => {
    //skip auto-advance for visitors who have asked for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }
    clearInterval(timer);
    timer = setInterval(() => showSlide(currentIndex + 1), 5000);
};

const stopTimer = () => {
    clearInterval(timer);
};

//one dot per slide
slides.forEach((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.classList.add("slide-dot");
    dot.setAttribute("aria-label", "Show " + slide.dataset.title);
    dot.onclick = () => {
        showSlide(i);
        startTimer();
    };
    dotsBox.append(dot);
    dots.push(dot);
});

document.getElementById("slide-prev").onclick = () => {
    showSlide(currentIndex - 1);
    startTimer();
};

document.getElementById("slide-next").onclick = () => {
    showSlide(currentIndex + 1);
    startTimer();
};

//pause while the visitor is looking at or using the slideshow
const slideshow = document.getElementById("slideshow");
slideshow.onmouseenter = stopTimer;
slideshow.onmouseleave = startTimer;
slideshow.addEventListener("focusin", stopTimer);
slideshow.addEventListener("focusout", startTimer);

showSlide(0);
startTimer();
