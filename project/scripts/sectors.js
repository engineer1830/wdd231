import { getSectorsData, displaySectors, displayMacroGroups } from "./sectordata.js";

document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.querySelector("#directory");
    

    const { sectors, macroGroups } = await getSectorsData();

    displayMacroGroups(macroGroups);
    displaySectors(sectors);
});