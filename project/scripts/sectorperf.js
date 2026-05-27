const apiKey = "yahoo not required";

// const sectorMap = {
//     "Technology": "Technology",
//     "Healthcare": "Healthcare",
//     "Financial Services": "Financial Services",
//     "Energy": "Energy",
//     "Consumer Cyclical": "Consumer Discretionary",
//     "Consumer Defensive": "Consumer Staples",
//     "Industrials": "Industrials",
//     "Basic Materials": "Materials",
//     "Real Estate": "Real Estate",
//     "Utilities": "Utilities",
//     "Communication Services": "Communication Services"
// };
  
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
    const yahooSector = sectorMap[sectorName];

    const body = {
        offset: 0,
        size: 5,
        sortField: "marketCap",
        sortType: "DESC",
        quoteType: "EQUITY",
        query: {
            operator: "AND",
            operands: [
                { operator: "eq", operands: ["sectorRaw", yahooSector] },
                { operator: "gt", operands: ["marketCap", 100000000000] }
            ]
        }
    };

    const response = await fetch("https://hamiltondesigns.vercel.app/api/yahoo_market", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log("Dropdown:", sectorName, "→ Yahoo:", yahooSector);


    if (!data.finance || !data.finance.result || !data.finance.result[0]) {
        console.log("Yahoo returned no results for:", yahooSector);
        return [];
    }

    return data.finance.result[0].quotes;
}


document.getElementById("fetchBtn").addEventListener("click", async () => {
    const sector = document.getElementById("sectorSelect").value;
    const resultsDiv = document.getElementById("results");

    if (!sector) {
        resultsDiv.innerHTML = "<p>Please select a sector.</p>";
        return;
    }

    const stocks = await getTop5Stocks(sector);

    resultsDiv.innerHTML = `
      <h3>Top 5 Stocks in ${sector}</h3>
      <div class="stock-grid">
        ${stocks.map(s => `
          <div class="stock-card">
            <div class="stock-header">
              <img src="https://logo.clearbit.com/${s.symbol}.com" alt="${s.symbol} logo">
              <h4>${s.shortName} (${s.symbol})</h4>
            </div>
            <p class="sector-label">${s.sector}</p>
            <p><strong>Market Cap:</strong> ${(s.marketCap / 1e9).toFixed(1)}B</p>
          </div>
        `).join("")}
      </div>
    `;
    

});

