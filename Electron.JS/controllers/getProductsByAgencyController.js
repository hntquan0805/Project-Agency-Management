const { Distribution } = require('../models/distribution');
const { Inventory } = require('../models/inventory');

class GetProductsByAgency{

    static getProductsByAgency = async (type) => {
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
                productName: product['Inventory.productName'] || null,
                unit: product.unit,
                price: product.price,
                stock: product['Inventory.quantityInStock'] || 0
            }));

            return result;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };

    static getProductsByCode = async (productCode, unit, type) => {
        try {
            const product = await Distribution.findOne({
                where: { type: type, productCode: productCode, unit: unit },
                attributes: ['productCode', 'unit', 'price'],
                include: [
                    {
                        model:  Inventory,
                        attributes: ['productName', 'quantityInStock'],
                    },
                ],
                raw: true,
            });

            if (!product) {
                throw new Error('Product not found');
            }
            
            return {
                productCode: product.productCode, 
                productName: product['Inventory.productName'] || null,
                unit: product.unit,
                price: product.price,
                stock: product['Inventory.quantityInStock'] || 0
            };
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
}

module.exports = GetProductsByAgency;