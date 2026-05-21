export async function getBusinessData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data.businesses;
}

export function displayBusinesses(businesses) {
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

// export function displaySpotlight(businesses, containerSelector) {
//     const container = document.querySelector(containerSelector);
//     if (!container) return;

//     const candidates = businesses.filter(
//         biz => biz.level === "silver" || biz.level === "gold"
//     );

//     const selected = candidates.sort(() => 0.5 - Math.random()).slice(0, 2);

//     selected.forEach(biz => {
//         const card = document.createElement("section");
//         card.classList.add("spotlight-card");

//         const img = document.createElement("img");
//         img.src = biz.image;
//         img.alt = `${biz.businessName} logo`;
//         img.width = 200;     // prevents CLS
//         img.height = 120;    // prevents CLS

//         const name = document.createElement("h2");
//         name.textContent = biz.businessName;

//         const address = document.createElement("p");
//         address.textContent = biz.address;

//         const phone = document.createElement("p");
//         phone.textContent = biz.phone;

//         const link = document.createElement("a");
//         link.href = biz.url;
//         link.target = "_blank";
//         link.textContent = "Visit Website";

//         card.append(img, name, address, phone, link);
//         container.appendChild(card);
//     });
// }