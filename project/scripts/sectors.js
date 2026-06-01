document.getElementById("timestamp").value = new Date().toISOString();

import { getSectorsData, displaySectors, displayMacroGroups } from "./sectordata.js";

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
