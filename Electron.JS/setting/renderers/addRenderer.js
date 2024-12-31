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
    // Hiển thị pop-up và overlay
    editModal.style.display = 'block';
    overlay.style.display = 'block';
});

// Xử lý sự kiện khi người dùng nhấn vào nút đóng pop-up
closeButton.addEventListener('click', function() {
    // Ẩn pop-up và overlay
    editModal.style.display = 'none';
    overlay.style.display = 'none';
});

// Xử lý khi người dùng nhấp vào overlay (khu vực bên ngoài pop-up)
overlay.addEventListener('click', function() {
    // Ẩn pop-up và overlay
    editModal.style.display = 'none';
    overlay.style.display = 'none';
});

form.addEventListener('submit', async function(event) {
    // Ngừng hành động mặc định (khi submit)
    event.preventDefault();

    // Lấy giá trị người dùng nhập vào các trường
    const code = goodsCode.value;
    const name = goodsName.value;
    const calculationUnit = goodsCalculationUnit.value;
    const price = goodsPrice.value;
    const stockQuantity = goodsStockQuantity.value;
    const type = agencyTypeSelect.value;

    // Xử lý thông tin (hiển thị hoặc gửi đến server)
    console.log('Goods Code:', code);
    console.log('Goods Name:', name);
    console.log('Calculation Unit:', calculationUnit);
    console.log('Price:', price);
    console.log('Stock Quantity:', stockQuantity);
    console.log('Selected Agency Type:', type);

    // Ví dụ: gửi dữ liệu tới server (chỉ là một ví dụ)
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