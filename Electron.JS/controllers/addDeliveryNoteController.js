const { Inventory } = require('../models/inventory');
const { Distribution } = require('../models/distribution');
const { Op } = require('sequelize');

class AddDeliveryNote {
    static findAllProducts = async (name, type) => {
        const products = await Distribution.findAll({
            where: { 
                type: type,
                '$Inventory.productName$': { [Op.iLike]: `%${name}%` }
            },
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
    }
}

module.exports =  AddDeliveryNote;