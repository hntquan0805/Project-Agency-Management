document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();

    const type = document.getElementById('type');
    const productsList = document.getElementById('products-list');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editCancel = document.getElementById('close-pop-up-button');
    const overlay = document.getElementById('overlay');

    async function loadProducts() {
        const products = await window.api.getProductsByAgency(type.value);
        productsList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.productCode}</td>
                <td>${product.productName || 'N/A'}</td>
                <td>${product.unit}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><button data-type="${type.value}" data-id="${product.productCode}" data-unit="${product.unit}" class="edit-button"><i class="fa-regular fa-pen-to-square"></i></button></td>
                <td><button data-type="${type.value}" data-id="${product.productCode}" data-unit="${product.unit}" class="delete-button"><i class="fa-regular fa-trash-can"></i></button></td>
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

    loadProducts();

    type.addEventListener('change', async (event) => {
        loadProducts();
    });
});