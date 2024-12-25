document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const products = await window.api.getProductsByAgency(type);

    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <th>${product.dataValues.agencyCode}</th>
        <th>${product.dataValues.name}</th>
        <th>${product.dataValues.type}</th>
        <th>${product.dataValues.district}</th>
        `;
        productsList.appendChild(row);
    });
});