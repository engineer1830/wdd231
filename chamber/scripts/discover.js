import { getActivityData, displayActivities } from "./activity.js";

document.addEventListener("DOMContentLoaded", async () => {
    const {activities} = await getActivityData();
    displayActivities(activities);
});