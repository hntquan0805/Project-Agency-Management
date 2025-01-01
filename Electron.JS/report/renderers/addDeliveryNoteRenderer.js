const chooseButton = document.getElementById('choose-button');
const searchForm = document.getElementById('search-form');
const overlay = document.getElementById('modal-overlay');
const cart = document.getElementById('cart');
const createButton = document.getElementById('create-button');
const type = document.getElementById('agency-type');
const close = document.getElementById('close-button-choose-form');
const done = document.getElementById('done-button-choose-form');
const modal = document.getElementById('goodsDeliveryNoteModal');
const closeModal = document.getElementById('modal-close-button');
const resultsTable = document.getElementById('results-table');

let currentType = 1;
const serial = 0;

document.addEventListener('DOMContentLoaded', async (e) => {
    overlay.style.display = 'none';
});

document.addEventListener('change', async (e) => {
    currentType = type.value;
});

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultsTable.innerHTML = '';
    overlay.style.display = 'block';
    
});

close.addEventListener('click', () => {
    overlay.style.display = 'none';
});

chooseButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name');
    
    const products = await window.api.findAllProducts('Milk', currentType);

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
        });
    });

    

    done.addEventListener('click', () => {
        overlay.style.display = 'none';
        
        const filteredProducts = products.filter(product => {
            const quantitySpan = document.getElementById(`quantity-${product.productCode}-${product.unit}`);
            const quantity = parseInt(quantitySpan.textContent, 10);
            return quantity > 0;
        });
    
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
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class = "product-code">${product.productCode}</td>
                        <td class = "product-name">${product.productName || 'N/A'}</td>
                        <td class = "product-unit">${product.unit || 'N/A'}</td>
                        <td class = "product-price">${product.price || 'N/A'}</td>
                        <td class = "product-quantity">${quantity}</td>
                    `;

                    cartTable.appendChild(row);
                    displayNextProduct();
                }, { once: true });
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

createButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const agency_name = document.getElementById('agency-name').value;
    const created_date = document.getElementById('created-date').value;

    document.getElementById('modalAgencyName').textContent = agency_name;
    document.getElementById('modalDate').textContent = created_date;
    
    const productsTableForm = document.getElementById('goodsListTable');
    const cartTable = document.getElementById('cart-table');

    productsTableForm.innerHTML = '';
    let grandTotal = 0;
    Array.from(cartTable.rows).forEach(row => {
        const newRow = row.cloneNode(true);
        
        // Calculate total price
        const price = parseFloat(newRow.querySelector('.product-price').textContent);
        const quantity = parseInt(newRow.querySelector('.product-quantity').textContent, 10);
        const totalPrice = price * quantity;
        grandTotal += totalPrice;
        // Create a new cell for totalPrice and append it to the new row
        const totalPriceCell = document.createElement('td');
        totalPriceCell.textContent = totalPrice.toFixed(2);  // Format to 2 decimal places
        newRow.appendChild(totalPriceCell);

        // Append the row to the products table
        productsTableForm.appendChild(newRow);
    });

    document.getElementById('grandTotal').textContent = grandTotal.toFixed(2) + ' VND';

    const products = Array.from(cartTable.rows).map(row => {
        return {
            productCode: row.querySelector('.product-code').textContent,
            productName: row.querySelector('.product-name').textContent,
            unit: row.querySelector('.product-unit').textContent,
            price: parseFloat(row.querySelector('.product-price').textContent),
            quantity: parseInt(row.querySelector('.product-quantity').textContent, 10),
        };
    });

    const accountCode = sessionStorage.getItem('account-code');
    const get_agency_code = await window.api.getAgencyCode(agency_name);

    const deliveryNoteData = {
        agencyCode: get_agency_code,
        agencyType: currentType,
        createdDate: created_date,
        createdBy: accountCode,
        products: products
    };

    const response = await window.api.createDeliveryNote(deliveryNoteData);

    if (response.success) {
        modal.style.display = 'block';

        products.forEach(async(product) => { 
            const deliveryNoteDetailData = {
                deliveryNoteCode: response.deliveryNote.dataValues.deliveryNoteCode,
                productCode: product.productCode,
                type: currentType,
                unit: product.unit,
                quantity: product.quantity,
                price: product.price,
                totalPrice: product.price * product.quantity
            };

            deltail_response = await window.api.createDeliveryNoteDetail(deliveryNoteDetailData);
        });
    } else {
        alert(`Failed to create delivery note: ${response.message}`);
    }
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});
