const CAR_COLORS = ["#3ec9b0", "#a8d94a", "#5b5aa6", "#e8836a", "#241854", "#b478c9", "#4a90d9"];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Builds one car and drops it into a lane at a given spot
function createCar(lane, color, leftPercent, topOffset) {
    const car = document.createElement("div");
    car.className = "car";
    car.style.left = `${leftPercent}%`;
    car.style.top = `${topOffset}px`;
    car.style.setProperty("--car-color", color);
    car.innerHTML = `
        <div class="car-window"></div>
        <div class="wheel wheel-left"></div>
        <div class="wheel wheel-right"></div>
    `;
    lane.appendChild(car);
}

function fillLane(lane) {
    const carCount = randomInt(2, 4);
    for (let i = 0; i < carCount; i++) {
        const color = CAR_COLORS[randomInt(0, CAR_COLORS.length - 1)];
        createCar(lane, color, randomInt(2, 85), randomInt(15, 55));
    }
}

fillLane(document.getElementById("lane-top"));
fillLane(document.getElementById("lane-bottom"));
