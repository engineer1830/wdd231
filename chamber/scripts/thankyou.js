document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const first = params.get("first");
    const thanks = document.getElementById("thanks");
    const result = document.getElementById("result");

    thanks.textContent = "Thank you, " + first + "!";

    let output = "<h2>Submission Details</h2><ul>";

    params.forEach((value, key) => {
        output += `<li><strong>${key}:</strong> ${value}</li>`;
    });

    output += "</ul>";

    result.innerHTML = output;
});
