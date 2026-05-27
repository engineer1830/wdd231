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
    return data.finance.result[0].quotes.map(q => q.symbol);
}

async function getTickerDetails(ticker) {
    const res = await fetch(`https://hamiltondesigns.vercel.app/api/yahoo_quote?ticker=${ticker}`);
    const data = await res.json();

    const profile = data.quoteSummary.result?.[0];

    return {
        symbol: ticker,
        sector: profile?.assetProfile?.sector,
        marketCap: profile?.price?.marketCap?.raw || 0,
        name: profile?.price?.shortName || ticker
    };
}

async function getTop5Stocks(sectorName) {
    const yahooSector = sectorMap[sectorName];

    const tickers = await getMegaCapTickers();

    const allDetails = await Promise.all(
        tickers.map(t => getTickerDetails(t))
    );

    const filtered = allDetails.filter(info => info.sector === yahooSector);

    filtered.sort((a, b) => b.marketCap - a.marketCap);

    return filtered.slice(0, 5);
}

