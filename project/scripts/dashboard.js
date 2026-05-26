const apiKey = "YOUR_FMP_API_KEY"; 

const sectorETFs = {
    "Communication Services": "XLC",
    "Consumer Discretionary": "XLY",
    "Consumer Staples": "XLP",
    "Energy": "XLE",
    "Financials": "XLF",
    "Healthcare": "XLV",
    "Industrials": "XLI",
    "Information Technology": "XLK",
    "Materials": "XLB",
    "Real Estate": "XLRE",
    "Utilities": "XLU"
};

async function getSectorPerformance() {
    const url = `https://financialmodelingprep.com/api/v3/sector-performance?apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const performance = {};

        data.forEach(item => {
            performance[item.sector] = {
                daily: parseFloat(item.changesPercentage),
                fiveDay: item["5d"],
                oneMonth: item["1m"],
                ytd: item["ytd"],
                oneYear: item["1y"]
            };
        });

        return performance;

    } catch (err) {
        console.error("Error fetching sector performance:", err);
        return null;
    }
}

function getTrendClass(change) {
    if (change > 0) return "up";
    if (change < 0) return "down";
    return "flat";
}

function createSectorTile(sectorName, perfData) {
    const daily = perfData.daily;
    const trendClass = getTrendClass(daily);

    const tile = document.createElement("div");
    tile.classList.add("sector-tile", trendClass);

    tile.innerHTML = `
        <div class="sector-tile-header">
            <h3>${sectorName}</h3>
            <span class="sector-change">${daily.toFixed(2)}%</span>
        </div>
    `;

    return tile;
}

// Line to drop in the tile.innerHTML when sparklines are active
/* <canvas class="sparkline" id="spark-${sectorName.replace(/\s+/g, "- ")}" ></canvas > */

function renderSectorDashboard(performanceData) {
    const container = document.querySelector("#sectorDashboard");
    container.innerHTML = "";

    Object.entries(performanceData).forEach(([sectorName, perf]) => {
        const tile = createSectorTile(sectorName, perf);
        container.appendChild(tile);
    });
}

// async function getSparklineData(etfSymbol) {
//     const url = `https://financialmodelingprep.com/api/v3/historical-chart/5min/${etfSymbol}?apikey=${apiKey}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         // Return closing prices only
//         return data.slice(0, 40).reverse().map(item => item.close);

//     } catch (err) {
//         console.error("Error fetching sparkline data:", err);
//         return [];
//     }
// }

// function drawSparkline(canvasId, data) {
//     const canvas = document.getElementById(canvasId);
//     if (!canvas || data.length === 0) return;

//     const ctx = canvas.getContext("2d");
//     const width = canvas.width = canvas.offsetWidth;
//     const height = canvas.height = canvas.offsetHeight;

//     const max = Math.max(...data);
//     const min = Math.min(...data);

//     ctx.strokeStyle = "#1A5B6B";
//     ctx.lineWidth = 2;
//     ctx.beginPath();

//     data.forEach((value, i) => {
//         const x = (i / (data.length - 1)) * width;
//         const y = height - ((value - min) / (max - min)) * height;

//         if (i === 0) ctx.moveTo(x, y);
//         else ctx.lineTo(x, y);
//     });

//     ctx.stroke();
// }

document.addEventListener("DOMContentLoaded", async () => {
    const perf = await getSectorPerformance();
    if (!perf) return;

    renderSectorDashboard(perf);

    // for (const [sectorName] of Object.entries(perf)) {
    //     const etf = sectorETFs[sectorName];
    //     const sparkData = await getSparklineData(etf);

    //     drawSparkline(
    //         `spark-${sectorName.replace(/\s+/g, "-")}`,
    //         sparkData
    //     );
    // }
});

