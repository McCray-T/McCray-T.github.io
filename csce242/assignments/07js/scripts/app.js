//Toggles the CSS speech bubble when the Speech panel is clicked
const speechPanel = document.getElementById("panel-speech");
const speechBubble = document.getElementById("speech-bubble");

speechPanel.onclick = () => {
    speechBubble.classList.toggle("visible");
};
