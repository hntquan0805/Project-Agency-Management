const { Inventory } = require('../../models/inventory');
const { Distribution } = require('../../models/distribution');
const { DeliveryNote } = require('../../models/deliverynote');
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

    static createDeliveryNote = async (deliveryNoteData) => {
        try {
            const deliveryNote = await DeliveryNote.create(deliveryNoteData);
            return { success: true, deliveryNote };
        } catch (error) {
            console.error('Error in createDeliveryNote:', error);
            return { success: false, message: 'Error creating delivery note!' };
        }
    }
}

module.exports =  AddDeliveryNote;