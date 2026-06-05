console.log("DASH VERSION >>> 20240605-001");


// console.log("dash.js loaded");

// import { loadTopStocks } from "./sectorperf.js";
// import { getWeightedSectorPerformance } from "./dashboard.js";
// import { initSectorChart } from "./chart.js";

// console.log("Reached before DOMContentLoaded");
// console.log("About to register DOMContentLoaded");


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
//     console.log(performance);

//     const sortedSectors = Object.keys(performance).sort();

//     for (const sector of sortedSectors) {
//         updateSectorTile(sector, performance[sector]);
//     }
// }
// // This is the beginning of a commented out block that was not running before


// // document.addEventListener("DOMContentLoaded", async () => {
// //     await loadTopStocks();
// //     initDashboard();
// //     initSectorChart();

// //     const dialogBox = document.getElementById("dialogBox");
// //     const dialogBoxText = document.getElementById("dialogBoxText");
// //     const openModalBtn = document.getElementById("openModalBtn");
// //     const closeButton = document.getElementById("closeButton");

// //     const modalText = `
// //         This dashboard is representative only. It is built using only free APIs and as such,
// //         not all financial fundamentals are available. These calculations are based on the
// //         cumulative performance of the top 15 stocks in each sector and comparison to the
// //         broader market segments will have variations.
// //     `;

// //     dialogBoxText.textContent = modalText;

// //     openModalBtn.addEventListener("click", () => {
// //         dialogBox.showModal();
// //     });

// //     closeButton.addEventListener("click", () => {
// //         dialogBox.close();
// //     });
// // });

// // New stuff below and this DOMContentLoaded was commmented out above


// // This is the end of the commented out block

// document.addEventListener("DOMContentLoaded", async () => {
//     console.log("DOMContentLoaded registered");
//     console.log("Dashboard DOM loaded.");

//     try {
//         console.log("Loading top stocks...");
//         await loadTopStocks();
//         console.log("Top stocks loaded.");
//     } catch (err) {
//         console.error("loadTopStocks failed:", err);
//     }

//     try {
//         console.log("Initializing dashboard...");
//         await initDashboard();
//         console.log("Dashboard initialized.");
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

//     console.log("Modal setup starting...");

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

//     console.log("Modal setup complete.");
// });

// This is all new below here . . .



console.log("dash.js loaded");

import { loadTopStocks } from "./sectorperf.js";
import { getWeightedSectorPerformance } from "./dashboard.js";
import { initSectorChart } from "./chart.js";

console.log("Reached before DOMContentLoaded");
console.log("About to register DOMContentLoaded");

function createSectorTile(sectorName, value) {
    const tile = document.createElement("div");
    tile.classList.add("sector-tile");

    const trendClass =
        value > 0 ? "up" : value < 0 ? "down" : "flat";
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
console.log("AFTER initDashboard CLOSING BRACE");

// document.addEventListener("DOMContentLoaded", async () => {
//     console.log("DOMContentLoaded registered");
//     console.log("Dashboard DOM loaded.");

//     try {
//         console.log("Loading top stocks...");
//         await loadTopStocks();
//         console.log("Top stocks loaded.");
//     } catch (err) {
//         console.error("loadTopStocks failed:", err);
//     }

//     try {
//         console.log("Initializing dashboard...");
//         await initDashboard();
//         console.log("Dashboard initialized.");
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

//     console.log("Modal setup starting...");

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

//     console.log("Modal setup complete.");
// });

async function startDashboard() {
    console.log("DOMContentLoaded registered (or document already loaded)");
    console.log("Dashboard DOM loaded.");

    try {
        console.log("Loading top stocks...");
        await loadTopStocks();
        console.log("Top stocks loaded.");
    } catch (err) {
        console.error("loadTopStocks failed:", err);
    }

    try {
        console.log("Initializing dashboard...");
        await initDashboard();
        console.log("Dashboard initialized.");
    } catch (err) {
        console.error("initDashboard failed:", err);
    }

    try {
        console.log("Initializing sector chart...");
        initSectorChart();
        console.log("Sector chart initialized.");
    } catch (err) {
        console.error("initSectorChart failed:", err);
    }

    console.log("Modal setup starting...");

    const dialogBox = document.getElementById("dialogBox");
    const dialogBoxText = document.getElementById("dialogBoxText");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeButton = document.getElementById("closeButton");

    const modalText = `
        This dashboard is representative only. It is built using only free APIs and as such,
        not all financial fundamentals are available. These calculations are based on the
        cumulative performance of the top 15 stocks in each sector and comparison to the
        broader market segments will have variations.
    `;

    dialogBoxText.textContent = modalText;

    openModalBtn.addEventListener("click", () => dialogBox.showModal());
    closeButton.addEventListener("click", () => dialogBox.close());

    console.log("Modal setup complete.");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startDashboard);
} else {
    // DOMContentLoaded already fired; run immediately
    startDashboard();
}


console.log("END OF FILE >>> THIS SHOULD BE LAST LINE");


/*  
   ⭐ IMPORTANT ⭐  
   The DOMContentLoaded block MUST be inside the module, 
   so it goes RIGHT HERE — after all functions, before the file ends.
*/

// document.addEventListener("DOMContentLoaded", async () => {
//     console.log("DOMContentLoaded registered");
//     console.log("Dashboard DOM loaded.");

//     try {
//         console.log("Loading top stocks...");
//         await loadTopStocks();
//         console.log("Top stocks loaded.");
//     } catch (err) {
//         console.error("loadTopStocks failed:", err);
//     }

//     try {
//         console.log("Initializing dashboard...");
//         await initDashboard();
//         console.log("Dashboard initialized.");
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

//     console.log("Modal setup starting...");

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

//     console.log("Modal setup complete.");
// });


