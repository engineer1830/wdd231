export async function getBusinessData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data.businesses;
}

export function displayBusinesses(businesses) {
    const container = document.querySelector(".gallery-grid");
    if (!container) return;

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
