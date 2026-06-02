document.addEventListener("DOMContentLoaded", () => {
    // Footer year
    const year = new Date().getFullYear();
    document.getElementById("currentyear").textContent = year;

    // Last modified
    document.getElementById("lastModified").textContent = document.lastModified;

    // Hamburger menu
    const navbutton = document.querySelector('#ham-btn');
    const navlinks = document.querySelector('#nav-bar');

    navbutton.addEventListener('click', () => {

        console.log("navlinks:", navlinks);
        console.log("navbutton:", navbutton);

        navlinks.classList.toggle('show');
        navbutton.classList.toggle('show');
    });
});
