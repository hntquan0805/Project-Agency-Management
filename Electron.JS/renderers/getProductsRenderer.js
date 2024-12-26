document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const products = await window.api.getProductsByAgency(type);

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
});