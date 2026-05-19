// Elements used across the entire chamber site

// Footer year
const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;

// Last modified
document.getElementById("lastModified").innerHTML = document.lastModified;

// Hamburger menu
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navlinks.classList.toggle('show');
    navbutton.classList.toggle('show');
});
