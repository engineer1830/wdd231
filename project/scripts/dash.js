import { getWeightedSectorPerformance } from "./dashboard.js";

function createSectorTile(sectorName, value) {
    const tile = document.createElement("div");
    tile.classList.add("sector-tile");

    const trendClass =
        value > 0 ? "up" : value < 0 ? "down" : "flat";
    tile.classList.add(trendClass);

    tile.innerHTML = `
        <div class="sector-tile-header">
            <h3>${sectorName}</h3>
            <span class="sector-change">${value.toFixed(2)}%</span>
        </div>

        <div class="sparkline" id="spark-${sectorName.replace(/\s+/g, "-")}"></div>
    `;

    return tile;
}

function updateSectorTile(sectorName, value) {
    const container = document.querySelector("#sectorDashboard");

    if (!container.dataset.initialized) {
        container.innerHTML = "";
        container.dataset.initialized = "true";
    }

    const tile = createSectorTile(sectorName, value);
    container.appendChild(tile);
}

async function initDashboard() {
    const performance = await getWeightedSectorPerformance();
    console.log(performance);

    const sortedSectors = Object.keys(performance).sort();

    for (const sector of sortedSectors) {
        updateSectorTile(sector, performance[sector]);
    }
}

initDashboard();

