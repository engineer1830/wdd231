// const apiKey = "yahoo not required";
  
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

async function getMegaCapTickers() {
    const res = await fetch("https://hamiltondesigns.vercel.app/api/yahoo_megacap");
    const data = await res.json();
    return data.finance?.result?.[0]?.quotes?.map(q => q.symbol) || [];
}

async function getTickerDetails(ticker) {
    // Excluding crypto
    if (ticker.endsWith("-USD")) {
        return {
            symbol: ticker,
            name: ticker,
            sector: "Crypto",
            industry: null,
            marketCap: 0,
            price: 0
        };
    }

    // Get sector + industry
    const sectorRes = await fetch(`https://hamiltondesigns.vercel.app/api/yahoo_sector?ticker=${ticker}`);
    const sectorData = await sectorRes.json();

    // Get price + marketCap
    const quoteRes = await fetch(`https://hamiltondesigns.vercel.app/api/yahoo_quote?ticker=${ticker}`);
    const quoteData = await quoteRes.json();

    // Fallback for missing sectors
    let sector = sectorData.sector || "Unknown";

    return {
        symbol: ticker,
        name: sectorData.name || ticker,
        sector: sector,
        industry: sectorData.industry || null,
        marketCap: quoteData.marketCap || 0,
        price: quoteData.regularMarketPrice || 0
    };
}

async function getTop5Stocks(sector) {
    const tickers = await getMegaCapTickers();
    const details = await Promise.all(tickers.map(t => getTickerDetails(t)));

    const yahooSector = sectorMap[sector];

    return details
        .filter(stock => stock.sector === yahooSector)
        .filter(stock => stock.sector !== "Unknown")   // remove missing sectors
        .filter(stock => stock.sector !== "Crypto")    // remove crypto
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
                    <p class="sector-label">${s.sector}</p>
                    <p><strong>Market Cap:</strong> ${(s.marketCap / 1e9).toFixed(1)}B</p>
                </div>
            `).join("")}
        </div>
    `;
});

