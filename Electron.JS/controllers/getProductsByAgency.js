const { Distribution } = require('../models/distribution');
const { Inventory } = require('../models/inventory');

const getProductsByAgency = async (type) => {
    try {
        const products = await Distribution.findAll({
            where: { type: type },
            attributes: ['productCode', 'unit', 'price'],
            include: [
                {
                    model:  Inventory,
                    attributes: ['productName', 'quantityInStock'],
                },
            ],
            raw: true,
        });
        
        const result = products.map(product => ({
            productCode: product.productCode,
            //productName: product.inventory ? product.inventory.productName : null, 
            productName: product['Inventory.productName'] || null,
            unit: product.unit,
            price: product.price,
            //stock: product.inventory ? product.inventory.quantityInStock : 0,
            stock: product['Inventory.quantityInStock'] || 0
        }));

        return result;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

module.exports = { getProductsByAgency };