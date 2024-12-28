const chooseFrom = document.getElementById('choose-from');
const cart = document.getElementById('cart');
const serial = 0;

chooseFrom.addEventListener('search-product', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const type = document.getElementById('agency-type').value;
    const resultsTable = document.getElementById('results-table');
    const close = document.getElementById('close-button-choose-form');
    const done = document.getElementById('done-button-choose-form');
    const overlay = document.getElementById('modal-overlay');

    const products = await window.api.findAllProducts(name, type);

    overlay.style.display = 'block';

    resultsTable.innerHTML = '';

    products.forEach((product, index) => {
        const count = 0;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.productName || 'N/A'}</td>
            <td>${product.unit}</td>
            <td>${product.price}</td>
            <button onclick="decreaseQuantity(${product.productCode})">-</button>
            <span id="quantity-${product.productCode}">${count}</span>
            <button onclick="increaseQuantity(${product.productCode}, ${product.productCode})">+</button>
        `;
        resultsTable.appendChild(row);
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    done.addEventListener('click', () => {
        overlay.style.display = 'none';
        
        const cartTable = document.getElementById('cart-table');

        products.forEach(product => {
            const quantitySpan = document.getElementById(`quantity-${product.productCode}`);
            const row = document.createElement('tr');
            const quantity = parseInt(quantitySpan.textContent, 10);
            if (quantity > 0) {
                row.innerHTML = `
                    <td>${serial + 1}</td>
                    <td>${product.productName || 'N/A'}</td>
                    <td>${product.unit}</td>
                    <td>${product.price}</td>
                    <td>${quantity}</td>
                `;
                cartTable.appendChild(row);
            }
        });
    });
});

const increaseQuantity = (productId, stock) => {
    const quantitySpan = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantitySpan.textContent, 10);
    if (currentQuantity < stock) {
        quantitySpan.textContent = currentQuantity + 1;
    }
}

const decreaseQuantity = (productId) => {
    const quantitySpan = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantitySpan.textContent, 10);
    if (currentQuantity > 0) {
        quantitySpan.textContent = currentQuantity - 1;
    }
}