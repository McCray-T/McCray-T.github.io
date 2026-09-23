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

//Missing Class Points Deduction: 25 classes per semester, attendance worth 7% of the grade
const daysMissedInput = document.getElementById("days-missed");
const deductionMessage = document.getElementById("deduction-message");

daysMissedInput.oninput = () => {
    const days = Number(daysMissedInput.value);
    const percentLost = (days * (7 / 25)).toFixed(1);
    let note;

    if (days === 0) {
        note = "Perfect attendance!";
    } else if (days <= 2) {
        note = "A small hit, easy to recover from.";
    } else if (days <= 7) {
        note = "This is not an online class, you are missing valuable learning opportunities.";
    } else if (days <= 14) {
        note = "That's a significant chunk of your attendance grade gone.";
    } else {
        note = "Your attendance grade is in serious danger.";
    }

    deductionMessage.innerHTML = `You will lose ${percentLost}% for skipping ${days} days. ${note}`;
};

//End of Semester Counter: last day of class is December 4th
const today = new Date();
const lastDay = new Date(today.getFullYear(), 11, 4);
const daysLeft = Math.ceil((lastDay - today) / (1000 * 60 * 60 * 24));
let counterNote;

if (daysLeft > 150) {
    counterNote = "Not time to start counting down yet.";
} else if (daysLeft > 99) {
    counterNote = "The semester is in full swing.";
} else if (daysLeft > 49) {
    counterNote = "Halfway there! Keep pushing.";
} else if (daysLeft > 19) {
    counterNote = "The finish line is in sight!";
} else {
    counterNote = "Almost there! Final stretch.";
}

document.getElementById("days-left").innerHTML = daysLeft;
document.getElementById("counter-message").innerHTML = counterNote;
