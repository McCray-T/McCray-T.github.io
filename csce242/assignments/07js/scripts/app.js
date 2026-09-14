//Toggles the CSS speech bubble when the Speech panel is clicked
const speechPanel = document.getElementById("panel-speech");
const speechBubble = document.getElementById("speech-bubble");

speechPanel.onclick = () => {
    speechBubble.classList.toggle("visible");
};

//Shows a confirmation message below the dropdown when a beverage is selected
const beverageSelect = document.getElementById("beverage-select");
const beverageMessage = document.getElementById("beverage-message");

beverageSelect.onchange = (e) => {
    beverageMessage.innerHTML = `${e.target.value}: Nice Choice!`;
};
