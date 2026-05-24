document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const first = params.get("first");
    const last = params.get("last");
    const email = params.get("email");
    const phone = params.get("phone");
    const organization = params.get("organization");
    const timestamp = params.get("timestamp");

    const thanks = document.getElementById("thanks");
    const result = document.getElementById("result");

    thanks.textContent = `Thank you, ${first} ${last}!`;

    let output = `
        <h2>Submission Details</h2>
        <ul>
            <li><strong>First Name:</strong> ${first}</li>
            <li><strong>Last Name:</strong> ${last}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Organization:</strong> ${organization}</li>
            <li><strong>Timestamp:</strong> ${timestamp}</li>
        </ul>
        <h3>All Submitted Fields</h3>
    `;

    result.innerHTML = output;
});
