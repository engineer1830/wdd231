// import { loadTopStocks } from "./sectorperf.js";
// import { getWeightedSectorPerformance } from "./dashboard.js";
// import { initSectorChart } from "./chart.js";

// function createSectorTile(sectorName, value) {
//     const tile = document.createElement("div");
//     tile.classList.add("sector-tile");

//     const trendClass =
//         value > 0 ? "up" : value < 0 ? "down" : "flat";
//     tile.classList.add(trendClass);

//     const decimals = Math.abs(value) < 0.1 ? 5 : 2;
//     const formattedValue = value.toFixed(decimals);

//     tile.innerHTML = `
//         <div class="sector-tile-header">
//             <h3>${sectorName}</h3>
//             <span class="sector-change">${formattedValue}%</span>
//         </div>

//         <div class="sparkline" id="spark-${sectorName.replace(/\s+/g, "-")}"></div>
//     `;

//     return tile;
// }

// function updateSectorTile(sectorName, value) {
//     const container = document.querySelector("#sectorDashboard");

//     if (!container.dataset.initialized) {
//         container.innerHTML = "";
//         container.dataset.initialized = "true";
//     }

//     const tile = createSectorTile(sectorName, value);
//     container.appendChild(tile);
// }

// async function initDashboard() {
//     const performance = await getWeightedSectorPerformance();

//     const sortedSectors = Object.keys(performance).sort();

//     for (const sector of sortedSectors) {
//         updateSectorTile(sector, performance[sector]);
//     }
// }

// async function startDashboard() {
//     try {
//         await loadTopStocks();
//     } catch (err) {
//         console.error("loadTopStocks failed:", err);
//     }

//     try {
//         await initDashboard();
//     } catch (err) {
//         console.error("initDashboard failed:", err);
//     }

//     try {
//         console.log("Initializing sector chart...");
//         initSectorChart();
//         console.log("Sector chart initialized.");
//     } catch (err) {
//         console.error("initSectorChart failed:", err);
//     }

//     const dialogBox = document.getElementById("dialogBox");
//     const dialogBoxText = document.getElementById("dialogBoxText");
//     const openModalBtn = document.getElementById("openModalBtn");
//     const closeButton = document.getElementById("closeButton");

//     const modalText = `
//         This dashboard is representative only. It is built using only free APIs and as such,
//         not all financial fundamentals are available. These calculations are based on the
//         cumulative performance of the top 15 stocks in each sector and comparison to the
//         broader market segments will have variations.
//     `;

//     dialogBoxText.textContent = modalText;

//     openModalBtn.addEventListener("click", () => dialogBox.showModal());
//     closeButton.addEventListener("click", () => dialogBox.close());
// }

// if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", startDashboard);
// } else {
//     // DOMContentLoaded already fired; run immediately
//     startDashboard();
// }

// Everything above this works. . . . cleaned up is below

import { loadTopStocks } from "./sectorperf.js";
import { getWeightedSectorPerformance } from "./dashboard.js";
import { initSectorChart } from "./chart.js";

/* -----------------------------
   Sector Tile Creation
----------------------------- */
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

/* -----------------------------
   Dashboard Initialization
----------------------------- */
async function initDashboard() {
    const performance = await getWeightedSectorPerformance();
    const sortedSectors = Object.keys(performance).sort();

    const container = document.querySelector("#sectorDashboard");
    container.innerHTML = ""; // Clear before rendering

    for (const sector of sortedSectors) {
        updateSectorTile(sector, performance[sector]);
    }
}

/* -----------------------------
   Full Startup Sequence
----------------------------- */
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

/* -----------------------------
   DOM Ready Handling
----------------------------- */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startDashboard);
} else {
    startDashboard();
}

