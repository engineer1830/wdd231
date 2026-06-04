let topStocksBySector = {};

export async function loadTopStocks() {
    const res = await fetch("data/topstocks.json?v=1.0");
    topStocksBySector = await res.json();
}

export function getTickersForSector(sector) {
    return topStocksBySector[sector] || [];
}

export async function getTickerDetails(ticker) {
    try {
        const quoteRes = await fetch(
            `https://hamiltondesigns.vercel.app/api/stock_details?ticker=${ticker}`
        );
        const q = await quoteRes.json();

        const price = q.regularMarketPrice ?? 0;
        const shares = q.sharesOutstanding ?? 0;

        const computedCap = price && shares ? price * shares : 0;

        return {
            symbol: ticker,
            name: q.shortName || ticker,
            price,
            marketCap: q.marketCap ?? computedCap,
            regularMarketChangePercent: q.regularMarketChangePercent ?? 0

        };
    } catch (err) {
        console.error("Quote fetch failed for", ticker, err);
        return { symbol: ticker, name: ticker, price: 0, marketCap: 0 };
    }
}

export async function getTop5Stocks(sector) {
    const tickers = getTickersForSector(sector);
    const details = await Promise.all(tickers.map(getTickerDetails));
    return details.sort((a, b) => b.marketCap - a.marketCap).slice(0, 5);
}
