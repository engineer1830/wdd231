import { loadTopStocks, getTop5Stocks } from "./sectorperf.js";

await loadTopStocks();

const btn = document.getElementById("fetchBtn");
if (btn) {
    btn.addEventListener("click", async () => {
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
                ${stocks.map(s => `
                    <div class="stock-card">
                        <div class="stock-header">
                            <h4>${s.name} (${s.symbol})</h4>
                        </div>
                        <p class="sector-label">${sector}</p>
                        <p><strong>Price:</strong> $${s.price.toFixed(2)}</p>
                        <p><strong>Market Cap:</strong> ${(s.marketCap / 1e9).toFixed(1)}B</p>
                    </div>
                `).join("")}
            </div>
        `;
    });
}
