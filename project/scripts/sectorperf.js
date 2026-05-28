let topStocksBySector = {};

async function loadTopStocks() {
    const res = await fetch("data/topstocks.json");
    topStocksBySector = await res.json();
}
loadTopStocks();

function getTickersForSector(sector) {
    return topStocksBySector[sector] || [];
}

async function getTickerDetails(ticker) {
    try {
        const quoteRes = await fetch(
            `https://hamiltondesigns.vercel.app/api/stock_quote?ticker=${ticker}`
        );
        const q = await quoteRes.json();

        const price = q.regularMarketPrice ?? 0;
        const shares = q.sharesOutstanding ?? 0;

        const computedCap = price && shares ? price * shares : 0;

        return {
            symbol: ticker,
            name: q.shortName || ticker,
            price,
            marketCap: q.marketCap ?? computedCap
        };
    } catch (err) {
        console.error("Quote fetch failed for", ticker, err);
        return { symbol: ticker, name: ticker, price: 0, marketCap: 0 };
    }
}

async function getTop5Stocks(sector) {
    const tickers = getTickersForSector(sector);
    const details = await Promise.all(tickers.map(getTickerDetails));
    return details.sort((a, b) => b.marketCap - a.marketCap).slice(0, 5);
}

document.getElementById("fetchBtn").addEventListener("click", async () => {
    const sector = document.getElementById("sectorSelect").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<p>Loading...</p>";

    const stocks = await getTop5Stocks(sector);
    if (!stocks.length) {
        resultsDiv.innerHTML = `<p>No results found for ${sector}</p>`;
        return;
    }

    resultsDiv.innerHTML = `
    <h3>Top 5 Stocks in ${sector}</h3>
    <div class="stock-grid">
      ${stocks
            .map(
                s => `
          <div class="stock-card">
            <div class="stock-header">
              <h4>${s.name} (${s.symbol})</h4>
            </div>
            <p class="sector-label">${sector}</p>
            <p><strong>Price:</strong> $${s.price.toFixed(2)}</p>
            <p><strong>Market Cap:</strong> ${(s.marketCap / 1e9).toFixed(1)}B</p>
          </div>
        `
            )
            .join("")}
    </div>
  `;
});

