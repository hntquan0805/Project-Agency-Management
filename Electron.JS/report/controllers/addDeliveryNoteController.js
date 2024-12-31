const { Inventory } = require('../../models/inventory');
const { Distribution } = require('../../models/distribution');
const { DeliveryNote } = require('../../models/deliverynote');
const { Agency } = require('../../models/agency');
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
            const totalAmount = deliveryNoteData.products.reduce((sum, product) => {
                return sum + (product.price * product.quantity);
            }, 0);

            const agency = await Agency.findOne({where: { type: deliveryNoteData.agencyType }});
            if (!agency) {
                return { success: false, message: 'Agency not found!' };
            }

            if (totalAmount > agency.dataValues.currentDebt) {
                return { success: false, message: 'Total amount exceeds the agency\'s debt!' };
            }

            const deliveryNote = await DeliveryNote.create(deliveryNoteData);

            agency.dataValues.currentDebt -= totalAmount;
            await agency.save();

            return { success: true, deliveryNote };
        } catch (error) {
            console.error('Error in createDeliveryNote:', error);
            return { success: false, message: 'Error creating delivery note!' };
        }
    }
}

module.exports =  AddDeliveryNote;