//  This file applies to index only for the spotlight function

async function getBusinessData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displaySpotlight(data.businesses);
}

function displaySpotlight(businesses) {
    const spotlightContainer = document.querySelector("#spotlight");

    if (!spotlightContainer) return;

    const spotlightCandidates = businesses.filter(biz =>
        biz.level === "silver" || biz.level === "gold"
    );

    const shuffle = spotlightCandidates.sort(() => 0.5 - Math.random());

    const selected = shuffle.slice(0, 2);

    selected.forEach(biz => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        card.innerHTML = `
                <img src="${biz.image}" alt="${biz.businessName} logo">
                <h2>${biz.businessName}</h2>
                <p class="level-member">Member Level: ${biz.level}</p>
                <p>${biz.address}</p>
                <p>${biz.phone}</p>
                <a href="${biz.url}" target="_blank">Visit Website</a>
            `;

        spotlightContainer.appendChild(card);
    });
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
        busLogo.setAttribute('height', '120');

        busStatus.innerHTML = `Member level: <span class="level-${business.level}">${business.level}</span>`;
        busStatus.classList.add(`level-${business.level}`);

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

        container.appendChild(card);
    });
};

// getBusinessData();

document.addEventListener("DOMContentLoaded", () => {
    getBusinessData();
});