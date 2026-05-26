export async function getSectorsData() {
    const response = await fetch("data/sectors.json");
    const data = await response.json();
    return data.sectors;
}

export function displaySectors(sectors) {
    const container = document.querySelector(".gallery-grid");
    if (!container) return;

    sectors.forEach((sector) => {

        const card = document.createElement("section");
        card.classList.add("sector-card");

        const sectorIcon = document.createElement("img");
        sectorIcon.src = sector.icon;
        sectorIcon.alt = `${sector.sectorName} icon`;
        sectorIcon.loading = "lazy";
        sectorIcon.width = 80;

        const sectorName = document.createElement("h2");
        sectorName.textContent = sector.sectorName;

        const sectorIndustries = document.createElement("h3");
        sectorIndustries.textContent = `Industries: ${sector.industries.join(", ")}`;

        const riskProfile = document.createElement("h4");
        riskProfile.textContent = `Risk Profile: ${sector.riskProfile}`;

        const sectorDescription = document.createElement("p");
        sectorDescription.textContent = sector.description;

        const sectorCompanies = document.createElement("p");
        sectorCompanies.textContent = `Companies: ${sector.representativeCompanies.join(", ")}`;

        const sectorEcosens = document.createElement("p");
        sectorEcosens.textContent = `Economic Sensitivity: ${sector.economicSensitivity}`;

        const sectorDrivers = document.createElement("p");
        sectorDrivers.textContent = `Key Drivers: ${sector.keyDrivers.join(", ")}`;


        card.appendChild(sectorIcon);
        card.appendChild(sectorName);
        card.appendChild(sectorIndustries);
        card.appendChild(riskProfile);
        card.appendChild(sectorDescription);
        card.appendChild(sectorCompanies);
        card.appendChild(sectorEcosens);
        card.appendChild(sectorDrivers);

        container.appendChild(card);
    });
};