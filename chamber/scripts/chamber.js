const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navlinks.classList.toggle('show');
    navbutton.classList.toggle('show');
});

const apiKey = "3c455e002e5641bbdb26294b0ff0d311";
const city = "Chandler";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

async function loadWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract values
        const temp = Math.round(data.main.temp);
        const conditions = data.weather[0].description;
        const wind = Math.round(data.wind.speed);
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Insert into DOM
        document.querySelector("#temp").textContent = `${temp}°F`;
        document.querySelector("#conditions").textContent = conditions;
        document.querySelector("#wind").textContent = `${wind} mph`;
        document.querySelector("#weather-icon").src = iconUrl;

    } catch (error) {
        console.error("Weather fetch failed:", error);
    }
}

loadWeather();

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

async function loadForecast() {
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();

        // Filter for one forecast per day at 12:00:00
        const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        // Limit to 3 days
        const threeDay = daily.slice(0, 3);

        const container = document.querySelector("#forecast-cards");
        container.innerHTML = ""; // clear before inserting

        threeDay.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
            });

            const temp = Math.round(day.main.temp);
            const conditions = day.weather[0].description;
            const icon = day.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            const card = `
                <div class="forecast-card">
                    <h3>${date}</h3>
                    <img src="${iconUrl}" alt="${conditions}">
                    <p>${temp}°F</p>
                    <p>${conditions}</p>
                </div>
            `;

            container.innerHTML += card;
        });

    } catch (error) {
        console.error("Forecast fetch failed:", error);
    }
}

loadForecast();

async function getBusinessData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayBusinesses(data.businesses);
}


    const displayBusinesses = (businesses) => {
        const container = document.querySelector(".gallery-grid");

        businesses.forEach((business) => {

            let card = document.createElement('section');
            card.classList.add("business-card");

            let busLogo = document.createElement('img');
            let busName = document.createElement('h2');
            let busStatus = document.createElement('h3');
            let busAdd = document.createElement('p');
            let busPhone = document.createElement('p');
            let busLink = document.createElement('a');

            busName.textContent = business.businessName;

            busLogo.setAttribute('src', business.image);
            busLogo.setAttribute('alt', `Logo of ${business.businessName}`);
            busLogo.setAttribute('loading', 'lazy');
            busLogo.setAttribute('width', '200');

            busStatus.textContent = business.level;
            busAdd.textContent = business.address;
            busPhone.textContent = business.phone;

            busLink.href = business.url;
            busLink.textContent = "Visit Website";
            busLink.target = "_blank";

            card.appendChild(busLogo);
            card.appendChild(busName);
            card.appendChild(busStatus);
            card.appendChild(busAdd);
            card.appendChild(busPhone);
            card.appendChild(busLink);

            // Add to page
            container.appendChild(card);
        });
    };

getBusinessData();
