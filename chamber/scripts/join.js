document.getElementById("timestamp").value = new Date().toISOString();

document.addEventListener("DOMContentLoaded", () => {

    const dialogBox = document.getElementById("dialogBox");
    const dialogBoxText = document.getElementById("dialogBoxText");

    const modalText = {
        nonprofit: "NP Membership is for non profit organizations and there is no fee (np).",
        bronze: "Bronze membership is the basic member level and the business is included in the member directory.",
        silver: "Silver membership is the 2nd highest tier of membership and includes spotlight features on the Chamber's Homepage.",
        gold: "Gold membership is the top tier of membership and includes spotlight features on the Chamber's Homepage and inclusion on the chamber board."
    };

    document.querySelectorAll('.membership-card').forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.dataset.modal;
            dialogBoxText.textContent = modalText[modalId];
            dialogBox.showModal();
        });
    });

    document.getElementById("closeButton").addEventListener("click", () => {
        dialogBox.close();
    });

});


