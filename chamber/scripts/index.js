import { getBusinessData } from "./busdata.js";

function displaySpotlight(businesses) {
    const spotlightContainer = document.querySelector("#spotlight");
    if (!spotlightContainer) return;

    const spotlightCandidates = businesses.filter(biz =>
        biz.level === "silver" || biz.level === "gold"
    );

    const selected = spotlightCandidates
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

    selected.forEach(biz => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        const img = document.createElement("img");
        img.src = biz.image;
        img.alt = `${biz.businessName} logo`;
        img.width = 200;     // CLS-safe
        img.height = 120;    // CLS-safe

        const name = document.createElement("h2");
        name.textContent = biz.businessName;

        const level = document.createElement("p");
        level.classList.add("level-member");
        level.textContent = `Member Level: ${biz.level}`;

        const address = document.createElement("p");
        address.textContent = biz.address;

        const phone = document.createElement("p");
        phone.textContent = biz.phone;

        const link = document.createElement("a");
        link.href = biz.url;
        link.target = "_blank";
        link.textContent = "Visit Website";

        card.append(img, name, level, address, phone, link);
        spotlightContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const businesses = await getBusinessData();
    displaySpotlight(businesses);
});
