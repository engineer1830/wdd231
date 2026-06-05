import { loadTopStocks } from "./sectorperf.js";
import { getWeightedSectorPerformance } from "./dashboard.js";
import { initSectorChart } from "./chart.js";

function createSectorTile(sectorName, value) {
    const tile = document.createElement("div");
    tile.classList.add("sector-tile");

    const trendClass = value > 0 ? "up" : value < 0 ? "down" : "flat";
    tile.classList.add(trendClass);

    const decimals = Math.abs(value) < 0.1 ? 5 : 2;
    const formattedValue = value.toFixed(decimals);

    tile.innerHTML = `
        <div class="sector-tile-header">
            <h3>${sectorName}</h3>
            <span class="sector-change">${formattedValue}%</span>
        </div>
        <div class="sparkline" id="spark-${sectorName.replace(/\s+/g, "-")}"></div>
    `;

    return tile;
}

function updateSectorTile(sectorName, value) {
    const container = document.querySelector("#sectorDashboard");
    const tile = createSectorTile(sectorName, value);
    container.appendChild(tile);
}

async function initDashboard() {
    const performance = await getWeightedSectorPerformance();
    const sortedSectors = Object.keys(performance).sort();

    const container = document.querySelector("#sectorDashboard");
    container.innerHTML = ""; // Clear before rendering

    for (const sector of sortedSectors) {
        updateSectorTile(sector, performance[sector]);
    }
}

async function startDashboard() {
    await loadTopStocks();
    await initDashboard();
    initSectorChart();

    const dialogBox = document.getElementById("dialogBox");
    const dialogBoxText = document.getElementById("dialogBoxText");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeButton = document.getElementById("closeButton");

    dialogBoxText.textContent = `
        This dashboard is representative only. It is built using only free APIs and as such,
        not all financial fundamentals are available. These calculations are based on the
        cumulative performance of the top 15 stocks in each sector and comparison to the
        broader market segments will have variations.
    `;

    openModalBtn.addEventListener("click", () => dialogBox.showModal());
    closeButton.addEventListener("click", () => dialogBox.close());
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startDashboard);
} else {
    startDashboard();
}

