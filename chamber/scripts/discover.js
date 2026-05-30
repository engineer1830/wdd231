import { getActivityData, displayActivities } from "./activity.js";

document.addEventListener("DOMContentLoaded", async () => {
    const {activities} = await getActivityData();
    displayActivities(activities);
});

const messageArea = document.querySelector(".visit-message");

const now = Date.now();

const lastVisit = localStorage.getItem("lastVisit");

function daysBetween(oldDate, newDate) {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((newDate - oldDate) / msPerDay);
}

let message = "";

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const days = daysBetween(Number(lastVisit), now);
    if (days < 1) {
        message = "Back so soon! Awesome!";
    } else if (days === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${days} days ago.`;
    }
}

messageArea.textContent = message;

localStorage.setItem("lastVisit", now);
