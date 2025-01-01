const { Inventory } = require('../../models/inventory');
const { Distribution } = require('../../models/distribution');
const { DeliveryNote } = require('../../models/deliverynote');
const { Agency } = require('../../models/agency');
const { AgencyType } = require('../../models/agencytype');
const { Op } = require('sequelize');

class AddDeliveryNote {
    static findAllProducts = async (name, type) => {
        console.log('findAllProducts:', name, type);
        const products = await Distribution.findAll({
            where: { 
                type: type
            },
            attributes: ['productCode', 'unit', 'price'],
            include: [
                {
                    model:  Inventory,
                    where: {
                        productName: { [Op.like]: `%${name}%` }
                    },
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

    static generateDeliveryNoteCode = async () => {
        try {
            const lastNote = await DeliveryNote.findOne({
                order: [['deliveryNoteCode', 'DESC']],
                attributes: ['deliveryNoteCode'],
            });
    
            if (!lastNote) {
                return 'DN001'; // If no delivery notes exist
            }
    
            // Extract the numeric part of the last deliveryNoteCode (e.g., "DN123" -> 123)
            const lastCode = lastNote.deliveryNoteCode;
            const numericPart = parseInt(lastCode.slice(2), 10); // Remove "DN" and parse number
    
            // Increment the number and format it as 3 digits
            const nextNumber = (numericPart + 1).toString().padStart(3, '0');
            console.log(nextNumber);
            console.log(`DN${nextNumber}`);
            return `DN${nextNumber}`;
        } catch (error) {
            console.error('Error generating deliveryNoteCode:', error);
            throw error;
        }
    }

    static createDeliveryNote = async (deliveryNoteData) => {
        try {
            console.log(deliveryNoteData.agencyType);
            const totalAmount = deliveryNoteData.products.reduce((sum, product) => {
                return sum + (product.price * product.quantity);
            }, 0);

            const agency = await Agency.findOne({where: { agencyCode: deliveryNoteData.agencyCode.dataValues.agencyCode }});
            if (!agency) {
                return { success: false, message: 'Agency not found!' };
            }
            const maxDebt = await AgencyType.findOne({where: { type: deliveryNoteData.agencyType } , attribute: ['maxDebt']});
            if ((totalAmount + agency.dataValues.currentDebt) > maxDebt) {
                return { success: false, message: 'Total amount exceeds the agency\'s debt!' };
            }
            const delivery_note_code = await this.generateDeliveryNoteCode();
            console.log("code ne!!!",delivery_note_code);
            const deliveryNote = await DeliveryNote.create({
                deliveryNoteCode: delivery_note_code,
                agencyCode: deliveryNoteData.agencyCode.dataValues.agencyCode,
                deliveryDate: deliveryNoteData.createdDate,
                createdBy: deliveryNoteData.createdBy,
            });

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