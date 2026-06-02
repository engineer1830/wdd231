document.addEventListener("DOMContentLoaded", () => {
    // Footer year
    const year = new Date().getFullYear();
    document.getElementById("currentyear").textContent = year;

    // Last modified
    document.getElementById("lastModified").textContent = document.lastModified;
});
