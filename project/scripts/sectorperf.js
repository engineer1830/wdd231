let topStocksBySector = {};

async function loadTopStocks() {
    const res = await fetch("/data/topstocks.json");
    topStocksBySector = await res.json();
}

loadTopStocks();

function getTickersForSector(sector) {
    return topStocksBySector[sector] || [];
}

async function getTickerDetails(ticker) {
    const quoteRes = await fetch(
        `https://hamiltondesigns.vercel.app/api/yahoo_quote?ticker=${ticker}`
    );
    const quoteData = await quoteRes.json();

    return {
        symbol: ticker,
        name: quoteData.name || ticker,
        marketCap: quoteData.marketCap || 0,
        price: quoteData.regularMarketPrice || 0
    };
}

async function getTop5Stocks(sector) {
    const tickers = getTickersForSector(sector);
    const details = await Promise.all(tickers.map(t => getTickerDetails(t)));

    return details
        .sort((a, b) => b.marketCap - a.marketCap)
        .slice(0, 5);
}

document.getElementById("fetchBtn").addEventListener("click", async () => {
    const sector = document.getElementById("sectorSelect").value;
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "<p>Loading...</p>";

    const stocks = await getTop5Stocks(sector);

    if (stocks.length === 0) {
        resultsDiv.innerHTML = `<p>No results found for ${sector}</p>`;
        return;
    }

    resultsDiv.innerHTML = `
        <h3>Top 5 Stocks in ${sector}</h3>
        <div class="stock-grid">
            ${stocks.map(s => `
                <div class="stock-card">
                    <div class="stock-header">
                        <img src="https://logo.clearbit.com/${s.symbol}.com" alt="${s.symbol} logo">
                        <h4>${s.name} (${s.symbol})</h4>
                    </div>
                    <p class="sector-label">${sector}</p>
                    <p><strong>Market Cap:</strong> ${(s.marketCap / 1e9).toFixed(1)}B</p>
                </div>
            `).join("")}
        </div>
    `;
});
