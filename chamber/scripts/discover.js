import { getActivityData, displayActivities } from "./activity.js";

document.addEventListener("DOMContentLoaded", async () => {
    const { chandlerActivities } = await getActivityData();
    displayActivities(chandlerActivities);
});