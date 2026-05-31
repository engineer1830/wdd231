import { loadTopStocks, getTickerDetails } from "./sectorperf.js";

await loadTopStocks();

export async function getWeightedSectorPerformance() {
    const response = await fetch("data/topstocksdata.json");
    const sectorData = await response.json();

    const sectorPerformance = {};

    for (const sectorName in sectorData) {
        const companies = sectorData[sectorName];

        let totalWeightedChange = 0;
        let totalMarketCap = 0;

        for (const tickerSymbol in companies) {
            const company = companies[tickerSymbol];

            try {
                const details = await getTickerDetails(tickerSymbol);

                if (!details || !details.marketCap || !details.regularMarketChangePercent) {
                    console.warn(`Missing data for ${tickerSymbol}`);
                    continue;
                }

                const marketCap = details.marketCap;
                const changePercent = details.regularMarketChangePercent;

                totalWeightedChange += marketCap * changePercent;
                totalMarketCap += marketCap;

            } catch (err) {
                console.error(`Error fetching data for ${tickerSymbol}:`, err);
            }
        }

        const weightedPerformance =
            totalMarketCap > 0 ? totalWeightedChange / totalMarketCap : 0;

        sectorPerformance[sectorName] = weightedPerformance;
    }

    return sectorPerformance;
}

