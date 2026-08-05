const gift = {

    sender: "Younes",

    recipient: "Marie",

    amount: "100 €",

    message: "Joyeux anniversaire ❤️"

};


// Remplissage automatique

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("sender").textContent = gift.sender;

    document.getElementById("recipient").textContent = gift.recipient;

    document.getElementById("amount").textContent = gift.amount;

    document.getElementById("message").textContent = gift.message;

});