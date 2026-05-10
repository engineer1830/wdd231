const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navlinks.classList.toggle('show');
    navbutton.classList.toggle('show');
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

            busStatus.textContent = business.level;
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

            // Add to page
            container.appendChild(card);
        });
    };

getBusinessData();
