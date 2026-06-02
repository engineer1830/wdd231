// Old version before updating for Yahoo for price and Alpha for fundamentals

export async function getStockDetail(ticker) {
    try {
        const res = await fetch(
            `https://hamiltondesigns.vercel.app/api/alpha_details?ticker=${ticker}`
        );

        const data = await res.json();

        if (data.error) {
            console.warn(`Alpha details missing for ${ticker}:`, data.error);
            return { symbol: ticker };
        }

        return {
            symbol: ticker,
            name: data.name,
            description: data.description,
            sector: data.sector,
            industry: data.industry,
            marketCapAlpha: data.marketCap,
            peRatio: data.peRatio,
            eps: data.eps,
            dividendYield: data.dividendYield,
            profitMargin: data.profitMargin,
            returnOnEquity: data.returnOnEquity,
            returnOnAssets: data.returnOnAssets,
            revenueTTM: data.revenueTTM,
            fiftyTwoWeekHigh: data.fiftyTwoWeekHigh,
            fiftyTwoWeekLow: data.fiftyTwoWeekLow
        };

    } catch (err) {
        console.error("Alpha fetch failed for", ticker, err);
        return { symbol: ticker };
    }
}

export function renderStockDetails(details) {
    const container = document.getElementById("stockDetailsPanel");

    if (!details || !details.symbol) {
        container.innerHTML = `<p>No details available.</p>`;
        return;
    }

    container.innerHTML = `
        <h3>${details.name} (${details.symbol})</h3>
        <p><strong>Price:</strong> $${details.price?.toFixed(2) || "N/A"}</p>
        <p><strong>Sector:</strong> ${details.sector}</p>
        <p><strong>Industry:</strong> ${details.industry}</p>

        <h4>Fundamentals</h4>
        <p><strong>Market Cap (Alpha):</strong> ${(details.marketCapAlpha / 1e9).toFixed(1)}B</p>
        <p><strong>PE Ratio:</strong> ${details.peRatio}</p>
        <p><strong>EPS:</strong> ${details.eps}</p>
        <p><strong>Dividend Yield:</strong> ${details.dividendYield}</p>
        <p><strong>Profit Margin:</strong> ${details.profitMargin}</p>
        <p><strong>ROE:</strong> ${details.returnOnEquity}</p>
        <p><strong>ROA:</strong> ${details.returnOnAssets}</p>
        <p><strong>Revenue TTM:</strong> ${(details.revenueTTM / 1e9).toFixed(1)}B</p>

        <h4>52‑Week Range</h4>
        <p><strong>High:</strong> $${details.fiftyTwoWeekHigh}</p>
        <p><strong>Low:</strong> $${details.fiftyTwoWeekLow}</p>

        <h4>Description</h4>
        <p>${details.description || "No description available."}</p>
    `;
}


document.getElementById("detailsBtn").addEventListener("click", async () => {
    const ticker = document.getElementById("tickerInput").value.toUpperCase();
    const details = await getStockDetail(ticker);
    renderStockDetails(details);
});
