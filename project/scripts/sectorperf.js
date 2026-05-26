const apiKey = "YOUR_REAL_KEY_HERE";

async function getTop5Stocks(sectorName) {
    const url = `https://financialmodelingprep.com/api/v3/stock-screener?sector=${encodeURIComponent(sectorName)}&marketCapMoreThan=100000000000&limit=5&apikey=${apiKey}`;

    const response = await fetch(url);
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
