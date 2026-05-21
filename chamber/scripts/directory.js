// This file applies to directory page only

import { getBusinessData, displayBusinesses } from "./busdata.js";

document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.querySelector("#directory");
    const gridBtn = document.querySelector("#gridBtn");
    const listBtn = document.querySelector("#listBtn");

    gridBtn.addEventListener("click", () => {
        directory.classList.remove("list-view");
        directory.classList.add("gallery-grid");

        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        directory.classList.remove("gallery-grid");
        directory.classList.add("list-view");

        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });

    const businesses = await getBusinessData();
    displayBusinesses(businesses);
});
