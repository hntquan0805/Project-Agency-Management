function updateProductTable(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productCode}</td>
            <td>${product.productName || 'N/A'}</td>
            <td>${product.unit}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td><button class="btn btn-warning btn-sm">Edit</button></td>
            <td><button class="btn btn-danger btn-sm">Delete</button></td>
        `;
        productsList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();

    const typeSelect = document.getElementById('type');

    const type = typeSelect.value;

    const products = await window.api.getProductsByAgency(type);

    updateProductTable(products);

    typeSelect.addEventListener('change', async (event) => {
        console.log("Thay đổi giá trị select");

        const selectedType = event.target.value;
        const products_n = await window.api.getProductsByAgency(selectedType);

        updateProductTable(products_n);
    });
});
