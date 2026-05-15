const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;

document.getElementById("lastModified").innerHTML = document.lastModified;

const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navlinks.classList.toggle('show');
    navbutton.classList.toggle('show');
});

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

async function getBusinessData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayBusinesses(data.businesses);
}


    const displayBusinesses = (businesses) => {
        const container = document.querySelector(".gallery-grid");

        businesses.forEach((business) => {

            let card = document.createElement('section');
            card.classList.add("business-card");

            let busLogo = document.createElement('img');
            let busName = document.createElement('h2');
            let busStatus = document.createElement('h3');
            let busAdd = document.createElement('p');
            let busPhone = document.createElement('p');
            let busLink = document.createElement('a');

            busName.textContent = business.businessName;

            busLogo.setAttribute('src', business.image);
            busLogo.setAttribute('alt', `Logo of ${business.businessName}`);
            busLogo.setAttribute('loading', 'lazy');
            busLogo.setAttribute('width', '200');
            busLogo.setAttribute('height', '120');  

            busStatus.innerHTML = `Member level: <span class="level-${business.level}">${business.level}</span>`;
            busStatus.classList.add(`level-${business.level}`);

            busAdd.textContent = business.address;
            busPhone.textContent = business.phone;

            busLink.href = business.url;
            busLink.textContent = "Visit Website";
            busLink.target = "_blank";

            card.appendChild(busLogo);
            card.appendChild(busName);
            card.appendChild(busStatus);
            card.appendChild(busAdd);
            card.appendChild(busPhone);
            card.appendChild(busLink);

            container.appendChild(card);
        });
    };

getBusinessData();
