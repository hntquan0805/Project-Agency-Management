const addButton = document.getElementById('add-goods-button');
const overlay = document.getElementById('overlay');
const editModal = document.getElementById('edit-modal');
const closeButton = document.getElementById('close-pop-up-button');

const form = document.getElementById('edit-form');
const goodsCode = document.getElementById('goods-code');
const goodsName = document.getElementById('goods-name');
const goodsCalculationUnit = document.getElementById('goods-calculation-unit');
const goodsPrice = document.getElementById('goods-price');
const goodsStockQuantity = document.getElementById('goods-stock-quantity');
const agencyTypeSelect = document.getElementById('type');

const errorModal = document.getElementById('error-modal');
const closeErrorButton = document.getElementById('close-error-pop-up-button');
const errorMessage = document.getElementById('error-message');

closeErrorButton.addEventListener('click', function() {
    errorModal.style.display = 'none';
});

addButton.addEventListener('click', function() {
    editModal.style.display = 'block';
    overlay.style.display = 'block';
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

    const formData = {
        code: code,
        name: name,
        calculationUnit: calculationUnit,
        price: price,
        stockQuantity: stockQuantity,
        type: type,
    };

    const result = await window.api.saveFormData(formData);

    if (!result.success) {
        errorMessage.textContent = result.message;
        errorModal.style.display = 'block';
    } 
    // editModal.style.display = 'none';
    // overlay.style.display = 'none';
});