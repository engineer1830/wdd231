document.getElementById("timestamp").value = new Date().toISOString();

const dialogBox = document.getElementById("dialogBox");
const dialogBoxText = document.getElementById("dialogBoxText");

function openModal(modalId) {
    if (modalId === "nonprofit") {
        dialogBoxText.textContent = "NP Membership is for non profit organizations and there is no fee (np)";
    }
    else if (modalId === "bronze") {
        dialogBoxText.textContent = "Bronze membership is the basic member level and the business is included in the member directory.";
    }
    else if (modalId === "silver") {
        dialogBoxText.textContent = "Silver membership is the 2nd highest tier of membership and includes spotlight features on the Chamber's Homepage.";
    }
    else if (modalId === "gold") {
        dialogBoxText.textContent = "Gold membership is the top tier of membership and includes spotlight features on the Chamber's Homepage and inclusion on the chamber board.";
    }

    dialogBox.showModal();
}

document.querySelectorAll('label[data-modal]').forEach(label => {
    label.addEventListener('click', () => {
        openModal(label.dataset.modal);
    });
});

document.querySelectorAll('.info-icon').forEach(icon => {
    icon.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openModal(icon.dataset.modal);
    });
});

document.getElementById("closeButton").addEventListener("click", () => {
    dialogBox.close();
});
