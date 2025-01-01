document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("create-button");

    createButton.addEventListener("click", () => {
        const agencyName = document.getElementById("agency-name").value;
        const agencyType = document.getElementById("agency-type").value;
        const createdDate = document.getElementById("created-date").value;

        if (!agencyName || !agencyType || !createdDate) {
            alert("Please fill in all required fields!");
            return;
        }

        const cartTable = document.getElementById("cart-table");
        const rows = cartTable.getElementsByTagName("tr");

        const cartData = Array.from(rows).map(row => {
            const cells = row.getElementsByTagName("td");
            return {
                serial: cells[0]?.innerText || "",
                name: cells[1]?.innerText || "",
                unit: cells[2]?.innerText || "",
                price: cells[3]?.innerText || "",
                quantity: cells[4]?.innerText || ""
            };
        });

        const requestData = {
            agencyName: agencyName,
            agencyType: agencyType,
            createdDate: createdDate,
            cartData: cartData
        };
    });
});
