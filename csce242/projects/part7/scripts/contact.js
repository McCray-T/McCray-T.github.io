//contact form: checks the fields, sends the message through web3forms, and shows success or error feedback
const form = document.getElementById("contact-form");
const submitButton = document.getElementById("form-submit");
const result = document.getElementById("form-result");

const minSendingTime = 1000; //keep "Sending..." up at least this long so it doesn't flicker
const hideResultAfter = 3000; //how long the success or error message stays before hiding
let hideTimer = null;

//type is "pending", "success", or "error" and picks the message color
const showResult = (message, type) => {
    clearTimeout(hideTimer);
    result.textContent = message;
    result.className = "form-result form-result-" + type;
    result.hidden = false;
};

const hideResultLater = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
        result.hidden = true;
    }, hideResultAfter);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

form.onsubmit = async (e) => {
    e.preventDefault();

    //html validation still decides what's valid; this just adds our own message next to the form
    if (!form.checkValidity()) {
        showResult("Please fill in every field and use a valid email address.", "error");
        form.reportValidity();
        hideResultLater();
        return;
    }

    showResult("Sending your message...", "pending");
    submitButton.disabled = true;
    const startTime = Date.now();

    let sent = false;
    let errorMessage = "Sorry, your message couldn't be sent. Please try again.";

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: new FormData(form),
        });
        const json = await response.json();

        if (response.ok && json.success) {
            sent = true;
        } else if (json.message) {
            errorMessage = "Sorry, your message couldn't be sent: " + json.message;
        }
    } catch (error) {
        console.log(error);
    }

    //if the request was quick, wait out the rest of the minimum time
    await wait(Math.max(0, minSendingTime - (Date.now() - startTime)));

    if (sent) {
        showResult("Thanks! Your message was sent. We'll get back to you soon.", "success");
        form.reset();
    } else {
        showResult(errorMessage, "error");
    }

    submitButton.disabled = false;
    hideResultLater();
};
