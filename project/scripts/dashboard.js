console.log("dashboard.js loaded");

import { loadTopStocks, getTickerDetails } from "./sectorperf.js";

await loadTopStocks();

export async function getWeightedSectorPerformance() {
    const response = await fetch("data/topstocksdata.json?v=1.0");
    const tickerData = await response.json();

    const sectorPerformance = {};
    const sectorMarketCap = {};

    const validTickers = Object.keys(tickerData).filter(ticker => {
        return ticker.length > 1 && tickerData[ticker]?.sector;
    });

    for (const ticker of validTickers) {
        const meta = tickerData[ticker];

        const details = await getTickerDetails(ticker);

        if (
            !details ||
            !details.marketCap ||
            details.regularMarketChangePercent === null ||
            details.regularMarketChangePercent === undefined
        ) {
            console.warn(`Missing data for ${ticker}`);
            continue;
        }

        const sector = meta.sector;
        const marketCap = details.marketCap;
        const changePercent = details.regularMarketChangePercent;

        if (!sectorPerformance[sector]) {
            sectorPerformance[sector] = 0;
            sectorMarketCap[sector] = 0;
        }

        sectorPerformance[sector] += marketCap * changePercent;
        sectorMarketCap[sector] += marketCap;
    }

    for (const sector in sectorPerformance) {
        const totalCap = sectorMarketCap[sector];
        sectorPerformance[sector] =
            totalCap > 0 ? sectorPerformance[sector] / totalCap : 0;
    }

    return sectorPerformance;
}






