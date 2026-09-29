const destinations = {
    Mountains: {
        "Asheville, NC": "https://www.google.com/maps?q=Asheville,NC&output=embed",
        "Blue Ridge, GA": "https://www.google.com/maps?q=Blue+Ridge,GA&output=embed",
        "Gatlinburg, TN": "https://www.google.com/maps?q=Gatlinburg,TN&output=embed",
        "Highlands, NC": "https://www.google.com/maps?q=Highlands,NC&output=embed"
    },
    Beaches: {
        "Myrtle Beach, SC": "https://www.google.com/maps?q=Myrtle+Beach,SC&output=embed",
        "Hilton Head Island, SC": "https://www.google.com/maps?q=Hilton+Head+Island,SC&output=embed",
        "Tybee Island, GA": "https://www.google.com/maps?q=Tybee+Island,GA&output=embed",
        "Folly Beach, SC": "https://www.google.com/maps?q=Folly+Beach,SC&output=embed"
    }
};

const typeSelect = document.getElementById("destination-type");
const destinationList = document.getElementById("destination-list");
const mapWrap = document.getElementById("map-wrap");
const mapFrame = document.getElementById("map-frame");

typeSelect.onchange = () => {
    destinationList.innerHTML = "";
    mapWrap.classList.add("hidden");
    mapFrame.src = "";

    const type = typeSelect.value;
    if (!type) return;

    for (const name in destinations[type]) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = name;
        link.onclick = (e) => {
            e.preventDefault();
            mapFrame.src = destinations[type][name];
            mapWrap.classList.remove("hidden");
        };
        li.appendChild(link);
        destinationList.appendChild(li);
    }
};
