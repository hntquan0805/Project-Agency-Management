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
        let count = 0;
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
        
        const filteredProducts = products.filter(product => {
            const quantitySpan = document.getElementById(`quantity-${product.productCode}`);
            const quantity = parseInt(quantitySpan.textContent, 10);
            return quantity > 0;
        });
    
        let currentIndex = 0;
    
        const displayNextProduct = () => {
            if (currentIndex < filteredProducts.length) {
                const product = filteredProducts[currentIndex];
                const quantitySpan = document.getElementById(`quantity-${product.productCode}`);
                const quantity = parseInt(quantitySpan.textContent, 10);
    
                document.getElementById('serial').value = currentIndex;
                document.getElementById('name').value = product.productName;
                document.getElementById('quantity').value = quantity;
    
                document.getElementById('add-button').addEventListener('click', () => {
                    currentIndex++;
                    displayNextProduct();
                    
                    const cartTable = document.getElementById('cart-table');
                    cartTable.innerHTML = '';
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${serial + 1}</td>
                        <td>${product.productName || 'N/A'}</td>
                        <td>${quantity}</td>
                    `;
                    cartTable.appendChild(row);
                });
            }
        };
    
        displayNextProduct();
    });
});

cart.addEventListener('create', async (e) => {
    e.preventDefault();

    const agency_name = document.getElementById('agency-name').value;
    const created_date = document.getElementById('created-date').value;

    document.getElementById('modalAgencyName').textContent = agency_name;
    document.getElementById('modalDate').textContent = created_date;
    
    const productsTableForm = document.getElementById('goodsListTable');
    const cartTable = document.getElementById('cart-table');

    productsTableForm.innerHTML = '';

    Array.from(cartTable.rows).forEach(row => {
        productsTableForm.appendChild(row.cloneNode(true));
    });

    const response = await window.api.createDeliveryNote();
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