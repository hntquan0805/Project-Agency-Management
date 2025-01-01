const addButton = document.getElementById('add-goods-button');
const overlay = document.getElementById('overlay');
const editModal = document.getElementById('edit-modal');
const closeButton = document.getElementById('close-pop-up-button');

const form = document.getElementById('edit-form');
let goodsCode = document.getElementById('goods-code');
let goodsName = document.getElementById('goods-name');
let goodsCalculationUnit = document.getElementById('goods-calculation-unit');
let goodsPrice = document.getElementById('goods-price');
let goodsStockQuantity = document.getElementById('goods-stock-quantity');
const agencyTypeSelect = document.getElementById('type');

const errorModal = document.getElementById('failurePopup');
const closeErrorButton = document.getElementById('closeFailurePopUpButton');
const errorMessage = document.getElementById('popupMessage');

closeErrorButton.addEventListener('click', function() {
    errorModal.style.display = 'none';
});

addButton.addEventListener('click', function() {
    editModal.style.display = 'block';
    overlay.style.display = 'block';
    goodsCode.textContent = '';
    goodsName.textContent = '';
    goodsCalculationUnit.textContent = '';
    goodsPrice.textContent = '';
    goodsStockQuantity.textContent = '';
});

closeButton.addEventListener('click', function() {
    editModal.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', function() {
    editModal.style.display = 'none';
    overlay.style.display = 'none';
});

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const code = goodsCode.value;
    const name = goodsName.value;
    const calculationUnit = goodsCalculationUnit.value;
    const price = goodsPrice.value;
    const stockQuantity = goodsStockQuantity.value;
    const type = agencyTypeSelect.value;
    const productsList = document.getElementById('products-list');
    const formData = {
        code: code,
        name: name,
        calculationUnit: calculationUnit,
        price: price,
        stockQuantity: stockQuantity,
        type: type,
    };

    const result = await window.api.saveFormData(formData);

    async function loadProducts() {
        const products = await window.api.getProductsByAgency(type);
        productsList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.productCode}</td>
                <td>${product.productName || 'N/A'}</td>
                <td>${product.unit}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><button data-type="${type}" data-id="${product.productCode}" data-unit="${product.unit}" class="edit-button"><i class="fa-regular fa-pen-to-square"></i></button></td>
                <td><button data-type="${type}" data-id="${product.productCode}" data-unit="${product.unit}" class="delete-button"><i class="fa-regular fa-trash-can"></i></button></td>
            `;
            productsList.appendChild(row);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async (event) => {
                if (1){
                const productCode = button.getAttribute('data-id');
                const unit = button.getAttribute('data-unit');
                const type = button.getAttribute('data-type');
                await window.api.deleteProductByAgnecy(productCode, unit, type);
                loadProducts();
                }
            });
        });

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', async (event) => {
                const productCode = button.getAttribute('data-id');
                const unit = button.getAttribute('data-unit');
                const type = button.getAttribute('data-type');

                const product = await window.api.getProductsByCode(productCode, unit, type);
                
                document.getElementById('goods-code').value = product.productCode;
                document.getElementById('goods-name').value = product.productName;
                document.getElementById('goods-calculation-unit').value = product.unit;
                document.getElementById('goods-price').value = product.price;
                document.getElementById('goods-stock-quantity').value = product.stock;


                overlay.style.display = 'block';
                editModal.style.display = 'block';                

                editForm.addEventListener('submit', async (event) => {
                    const price = parseFloat(document.getElementById('edit-price').value);
                    const productCode = button.getAttribute('data-id');
                    const unit = event.target.getAttribute('data-unit');
                    const type = event.target.getAttribute('data-type');
            
                    await window.api.updateProduct(productCode, unit, type, price);
            
                    editModal.style.display = 'none';
                    overlay.style.display = 'none';
                    loadProducts();
                });
            
                editCancel.addEventListener('click', () => {
                    editModal.style.display = 'none';
                    overlay.style.display = 'none';
                });
            });
        });
    }

    if (!result.success) {
        errorMessage.textContent = result.message;
        errorModal.style.display = 'block';
    } else{
        editModal.style.display = 'none';
        overlay.style.display = 'none';
        
        loadProducts();
    }

    agencyTypeSelect.addEventListener('change', async (event) => {
        loadProducts();
    });
});