const apiKey = ""

const sectors = [
    "Communication Services",
    "Consumer Discretionary",
    "Consumer Staples",
    "Energy",
    "Financials",
    "Healthcare",
    "Industrials",
    "Information Technology",
    "Materials",
    "Real Estate",
    "Utilities"
];

// async function getAllSectorTop5(apiKey) {
//     const results = {};

//     for (const sector of sectors) {
//         const stocks = await getTop5BySector(sector, apiKey);
//         results[sector] = stocks;
//     }

//     return results;
// }

async function getTop5Stocks(sectorName, apiKey) {
    const url = `https://financialmodelingprep.com/api/v3/stock-screener?sector=${encodeURIComponent(sectorName)}&marketCapMoreThan=100000000000&limit=5&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data; // array of stock objects
}


async function buildSectorJSON(apiKey) {
    const data = await getAllSectorTop5(apiKey);

    const json = {
        sectors: Object.entries(data).map(([name, stocks]) => ({
            sectorName: name,
            topStocks: stocks.map(s => s.symbol)
        }))
    };

    console.log(JSON.stringify(json, null, 2));
}

document.getElementById("fetchBtn").addEventListener("click", async () => {
    const sector = document.getElementById("sectorSelect").value;
    const resultsDiv = document.getElementById("results");

    if (!sector) {
        resultsDiv.innerHTML = "<p>Please select a sector.</p>";
        return;
    }

    const apiKey = "YOUR_KEY"; // add later

    const stocks = await getTop5Stocks(sector, apiKey);

    if (!stocks.length) {
        resultsDiv.innerHTML = "<p>No stocks found over $100B market cap.</p>";
        return;
    }

    resultsDiv.innerHTML = `
        <h3>Top 5 Stocks in ${sector}</h3>
        <ul>
            ${stocks.map(s => `<li>${s.symbol} — ${s.companyName} (${(s.marketCap / 1e9).toFixed(1)}B)</li>`).join("")}
        </ul>
    `;
});





// const mySector = document.querySelector('#sector');
// const myDescription = document.querySelector('#description');
// const myTemperature = document.querySelector('#temperature');
// const myGraphic = document.querySelector('#graphic');

// const apiKey = "af8538c31d31c6af92eff6fb18613787";
// const lat = 49.74996365013941;
// const long = 6.637557164446404;

// const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;

// async function apiFetch() {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             // console.log(data); // testing only
//             displayResults(data); // uncomment when ready
//         } else {
//             throw Error(await response.text());
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// apiFetch();

// function displayResults(data) {
//     myTown.innerHTML = data.name
//     myDescription.innerHTML = data.weather[0].description
//     myTemperature.innerHTML = `${data.main.temp}&deg; F`;
//     const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//     myGraphic.setAttribute('SRC', iconsrc)
//     myGraphic.setAttribute('alt', data.weather[0].description)
// }
