import { getSectorsData, displaySectors } from "./sectordata.js";

document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.querySelector("#directory");
    

    const sectors = await getSectorsData();
    displaySectors(sectors);
});