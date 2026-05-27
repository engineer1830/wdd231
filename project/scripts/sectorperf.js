const apiKey = "VwldoLUq23b1iHTZJIGNOIUpx0m2CCv7";

const sectorMap = {
    "Communication Services": "Communication Services",
    "Consumer Discretionary": "Consumer Cyclical",
    "Consumer Staples": "Consumer Defensive",
    "Energy": "Energy",
    "Financials": "Financial Services",
    "Healthcare": "Healthcare",
    "Industrials": "Industrials",
    "Information Technology": "Technology",
    "Materials": "Basic Materials",
    "Real Estate": "Real Estate",
    "Utilities": "Utilities"
};

async function getTop5Stocks(sectorName) {
    const mapped = sectorMap[sectorName];

    const apiUrl = `https://financialmodelingprep.com/api/v4/stock-screener?sector=${mapped}&marketCapMoreThan=100000000000&limit=5&apikey=${apiKey}`;

    const proxyUrl = `https://hamiltondesigns.vercel.app/api/fmp?url=` +
        encodeURIComponent(apiUrl);

    const response = await fetch(proxyUrl);
    const data = await response.json();

    return data;
}

document.getElementById("fetchBtn").addEventListener("click", async () => {
    const sector = document.getElementById("sectorSelect").value;
    const resultsDiv = document.getElementById("results");

    if (!sector) {
        resultsDiv.innerHTML = "<p>Please select a sector.</p>";
        return;
    }

    const stocks = await getTop5Stocks(sector);

    if (!stocks.length) {
        resultsDiv.innerHTML = "<p>No stocks found over $100B market cap.</p>";
        return;
    }

    resultsDiv.innerHTML = `
    <h3>Top 5 Stocks in ${sector}</h3>
    <div class="stock-grid">
        ${stocks.map(s => `
            <div class="stock-card">
                <div class="stock-header">
                    <img src="https://financialmodelingprep.com/image-stock/${s.symbol}.png" alt="${s.symbol} logo">
                    <h4>${s.companyName} (${s.symbol})</h4>
                </div>
                <p class="sector-label">${sector}</p>
                <p><strong>Market Cap:</strong> ${(s.marketCap / 1e9).toFixed(1)}B</p>
            </div>
        `).join("")}
    </div>
`;

});


// async function getTop5Stocks(sectorName) {
//     const mapped = sectorMap[sectorName];
//     const proxy = "https://api.allorigins.win/raw?url=";

//     const url = proxy + encodeURIComponent(
//         `https://financialmodelingprep.com/api/v3/stock-screener?sector=${mapped}&marketCapMoreThan=100000000000&limit=5&apikey=${apiKey}`
//     );

//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }