const chooseButton = document.getElementById('choose-button');
const searchForm = document.getElementById('search-form');
const overlay = document.getElementById('modal-overlay');
const cart = document.getElementById('cart');
const type = document.getElementById('agency-type').value;
const serial = 0;

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    overlay.style.display = 'block';
});

chooseButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name');
    const resultsTable = document.getElementById('results-table');
    const close = document.getElementById('close-button-choose-form');
    const done = document.getElementById('done-button-choose-form');
    const products = await window.api.findAllProducts('Milk', type);

    resultsTable.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.productName || 'N/A'}</td>
            <td>${product.unit}</td>
            <td>${product.price}</td>
            <button class="decrease" data-id="${product.productCode}" data-unit="${product.unit}">-</button>
            <span id="quantity-${product.productCode}-${product.unit}">0</span>
            <button class="increase" data-id="${product.productCode}" data-unit="${product.unit}">+</button>
        `;
        resultsTable.appendChild(row);
    });
 
    const decreaseButtons = document.querySelectorAll('.decrease');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCode = button.getAttribute('data-id');
            const productUnit = button.getAttribute('data-unit');
            const quantitySpan = document.getElementById(`quantity-${productCode}-${productUnit}`);
            let quantity = parseInt(quantitySpan.textContent, 10);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
    });

    const increaseButtons = document.querySelectorAll('.increase');

    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCode = button.getAttribute('data-id');
            const productUnit = button.getAttribute('data-unit');
            const quantitySpan = document.getElementById(`quantity-${productCode}-${productUnit}`);
            let quantity = parseInt(quantitySpan.textContent, 10);
            quantity++;
            quantitySpan.textContent = quantity;
            console.log('Increase quantity:', quantitySpan.textContent);
        });
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    done.addEventListener('click', () => {
        overlay.style.display = 'none';
        
        const filteredProducts = products.filter(product => {
            const quantitySpan = document.getElementById(`quantity-${product.productCode}-${product.unit}`);
            const quantity = parseInt(quantitySpan.textContent, 10);
            return quantity > 0;
        });

        console.log('Filtered products:', filteredProducts);
    
        let currentIndex = 0;
    
        const displayNextProduct = () => {
            if (currentIndex < filteredProducts.length) {
                const product = filteredProducts[currentIndex];
                const quantitySpan = document.getElementById(`quantity-${product.productCode}-${product.unit}`);
                const quantity = parseInt(quantitySpan.textContent, 10);
    
                document.getElementById('serial').value = currentIndex + 1;
                document.getElementById('name').value = product.productName;
                document.getElementById('quantity').value = quantity;
    
                document.getElementById('add-button').addEventListener('click', () => {
                    cart.style.display = 'block';
                    currentIndex++;
                    const cartTable = document.getElementById('cart-table');
                    cartTable.innerHTML = '';
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${serial + 1}</td>
                        <td>${product.productName || 'N/A'}</td>
                        <td>${quantity}</td>
                    `;
                    cartTable.appendChild(row);
                    displayNextProduct();
                });
            }
            else {
                document.getElementById('serial').value = '';
                document.getElementById('name').value = '';
                document.getElementById('quantity').value = '';
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

    const products = Array.from(cartTable.rows).map(row => {
        return {
            productCode: row.querySelector('.product-code').textContent,
            productName: row.querySelector('.product-name').textContent,
            unit: row.querySelector('.product-unit').textContent,
            price: parseFloat(row.querySelector('.product-price').textContent),
            quantity: parseInt(row.querySelector('.product-quantity').textContent, 10)
        };
    });

    const deliveryNoteData = {
        agencyType: type,
        createdDate: created_date,
        products: products
    };

    const response = await window.api.createDeliveryNote(deliveryNoteData);

    if (response.success) {
        alert('Delivery note created successfully!');
    } else {
        alert(`Failed to create delivery note: ${response.message}`);
    }
});