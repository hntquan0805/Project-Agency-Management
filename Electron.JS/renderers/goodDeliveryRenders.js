// Variables to hold data
const products = [
    { serial: 1, name: "Banana Milk", unit: "thùng", price: 600000, quantity: 0 },
    { serial: 2, name: "Coconut Milk", unit: "thùng", price: 450000, quantity: 0 },
    { serial: 3, name: "Strawberry Milk", unit: "thùng", price: 450000, quantity: 0 },
    { serial: 4, name: "Oat Milk", unit: "thùng", price: 700000, quantity: 0 },
    { serial: 5, name: "Papaya Milk", unit: "thùng", price: 600000, quantity: 0 },
];



// DOM Elements
const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".search-btn");
const resultsTableDiv = document.querySelector(".results-table");
const doneButton = document.querySelector(".modal-done");
const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");
const cartTable = document.querySelector(".cart-table tbody");

// Show modal when search is performed
searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    const keyword = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(keyword)
    );

    if (filteredProducts.length > 0) {
        renderResultsTable(filteredProducts);
        modalOverlay.style.display = "flex"; // Show modal
    }
});

// Close modal when 'X' is clicked
modalClose.addEventListener("click", () => {
    modalOverlay.style.display = "none";
});

// Close modal and save data when 'Done' is clicked
doneButton.addEventListener("click", () => {
    const selectedProducts = products.filter((product) => product.quantity > 0);

    // Add selected products to the cart
    selectedProducts.forEach((product) => {
        const existingProduct = cart.find((item) => item.serial === product.serial);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push({ ...product });
        }
        product.quantity = 0; // Reset quantity in products array
    });

    renderCartTable();
    modalOverlay.style.display = "none"; // Hide modal
});

// Render Results Table
function renderResultsTable(filteredProducts) {
    let tableHTML = `<table class="table" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="background-color: #F57D31; color: white;">
                <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Serial</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Name of Good</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Calculation Unit</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
            </tr>
        </thead>
        <tbody>`;

    filteredProducts.forEach((product) => {
        tableHTML += `
            <tr>
                <td style="border-bottom: 1px solid #ddd; padding: 8px;">${product.serial}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 8px;">${product.name}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 8px;">${product.unit}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 8px;">${product.price.toLocaleString()} VND</td>
                <td style="border-bottom: 1px solid #ddd; padding: 8px;">
                    <button class="decrease" style="margin-right: 5px;">-</button>
                    <span>${product.quantity}</span>
                    <button class="increase" style="margin-left: 5px;">+</button>
                </td>
            </tr>`;
    });

    tableHTML += `</tbody></table>`;
    resultsTableDiv.innerHTML = tableHTML;


    attachQuantityButtons(filteredProducts);
}

// Attach Event Listeners to Quantity Buttons
function attachQuantityButtons(filteredProducts) {
    const decreaseButtons = document.querySelectorAll(".decrease");
    const increaseButtons = document.querySelectorAll(".increase");

    decreaseButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (filteredProducts[index].quantity > 0) {
                filteredProducts[index].quantity--;
                renderResultsTable(filteredProducts);
            }
        });
    });

    increaseButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            filteredProducts[index].quantity++;
            renderResultsTable(filteredProducts);
        });
    });
}



// Sample Cart Data
const cart = [
    { serial: 1, name: "Banana Milk", unit: "thùng", price: 600000, quantity: 10 },
    { serial: 2, name: "Coconut Milk", unit: "thùng", price: 450000, quantity: 5 },
    { serial: 3, name: "Strawberry Milk", unit: "thùng", price: 450000, quantity: 5 },
    { serial: 4, name: "Oat Milk", unit: "thùng", price: 700000, quantity: 5 },
];

// Render Cart Table
function renderCartTable() {
    const cartTableBody = document.querySelector(".cart-table tbody");
    cartTableBody.innerHTML = ""; // Clear previous data

    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.serial}</td>
            <td>${item.name}</td>
            <td>${item.unit}</td>
            <td>${item.price.toLocaleString()} VND</td>
            <td>${item.quantity}</td>
            <td><i class="bi bi-pencil"></i></td>
        `;
        cartTableBody.appendChild(row);
    });
}

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    renderCartTable();
});

