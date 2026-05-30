export async function getActivityData() {
    const response = await fetch("data/discover.json");
    const data = await response.json();
    return {
        activities: data.chandlerActivities,
    };
}

export function displayActivities(activities) {
    const container = document.querySelector(".activity-grid");
    if (!container) return;

    activities.forEach((activity) => {

        const card = document.createElement("section");
        card.classList.add("activity-card");

        const activityImage = document.createElement("img");
        activityImage.src = activity.image;
        activityImage.alt = activity.alt;
        activityImage.loading = "lazy";
        activityImage.width = 300;

        const activityTitle = document.createElement("h3");
        activityTitle.textContent = activity.title;

        const activityDescription = document.createElement("p");
        activityDescription.textContent = activity.description;

        const link = document.createElement("a");
        link.href = activity.url;
        link.target = "_blank";
        link.append(activityImage, activityTitle);

        card.appendChild(link);
        card.appendChild(activityDescription);

        container.appendChild(card);
    });
}
