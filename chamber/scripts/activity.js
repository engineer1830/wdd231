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
        activityImage.classList.add("activity-photo");

        const activityTitle = document.createElement("h2");
        activityTitle.classList.add("activity-title");
        activityTitle.textContent = activity.title;

        const activityDescription = document.createElement("p");
        activityDescription.classList.add("activity-description");
        activityDescription.textContent = activity.description;

        const activityLocation = document.createElement("p");
        activityLocation.classList.add("activity-location");
        activityLocation.textContent = activity.fullAddress;

        const activityInfo = document.createElement("a");
        activityInfo.classList.add("activity-info");
        activityInfo.href = activity.url;
        activityInfo.target = "_blank";
        activityInfo.textContent = `Learn More about ${activity.title}`;

        card.appendChild(activityImage);
        card.appendChild(activityTitle);
        card.appendChild(activityDescription);
        card.appendChild(activityLocation);
        card.appendChild(activityInfo);

        container.appendChild(card);
    });
}

