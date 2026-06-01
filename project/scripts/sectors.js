document.getElementById("timestamp").value = new Date().toISOString();

import { getSectorsData, displaySectors, displayMacroGroups } from "./sectordata.js";

const messageArea = document.querySelector(".visit-message");

const now = Date.now();

const lastVisit = localStorage.getItem("lastVisit");

function daysBetween(oldDate, newDate) {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((newDate - oldDate) / msPerDay);
}

let message = "";

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const days = daysBetween(Number(lastVisit), now);
    if (days < 1) {
        message = "Back so soon! Awesome!";
    } else if (days === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${days} days ago.`;
    }
}

messageArea.textContent = message;

localStorage.setItem("lastVisit", now);

document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.querySelector("#directory");
    const { sectors, macroGroups } = await getSectorsData();

    const allBtn = document.querySelector("#allBtn");
    const macroBtn = document.querySelector("#macroBtn");
    const sectorBtn = document.querySelector("#sectorBtn");


    function render(type) {
        directory.innerHTML = "";

        if (type === "all") {
            displayMacroGroups(macroGroups);
            displaySectors(sectors);
        } else if (type === "macro") {
            displayMacroGroups(macroGroups);
        } else if (type === "sector") {
            displaySectors(sectors);
        }
    }

    function setActive(button) {
        [allBtn, macroBtn, sectorBtn].forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    }

    allBtn.addEventListener("click", () => {
        setActive(allBtn);
        render("all");
    });

    macroBtn.addEventListener("click", () => {
        setActive(macroBtn);
        render("macro");
    });

    sectorBtn.addEventListener("click", () => {
        setActive(sectorBtn);
        render("sector");
    });

    render("all");
});
