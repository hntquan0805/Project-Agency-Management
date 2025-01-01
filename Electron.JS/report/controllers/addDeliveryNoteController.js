const { Inventory } = require('../../models/inventory');
const { Distribution } = require('../../models/distribution');
const { DeliveryNote } = require('../../models/deliverynote');
const { Agency } = require('../../models/agency');
const { AgencyType } = require('../../models/agencytype');
const {DeliveryNoteDetail} = require('../../models/deliverynotedetail');
const {Regulation} = require('../../models/regulation');
const { Op } = require('sequelize');
const { sequelize, DataTypes } = require('../../config/database');

class AddDeliveryNote {
    static findAllProducts = async (name, type) => {
        const products = await Distribution.findAll({
            where: { 
                type: type
            },
            attributes: ['productCode', 'unit', 'price'],
            include: [
                {
                    model:  Inventory,
                    where: {
                        productName: { [Op.like]: `%${name}%` },
                        productCode: { [Op.eq]: sequelize.col('Distribution.productCode') },
                    },
                    attributes: ['productName', 'quantityInStock'],
                },
            ],
            raw: true,
        });

        console.log(products);
        
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
                return 'DN001';
            }
    
            const lastCode = lastNote.deliveryNoteCode;
            const numericPart = parseInt(lastCode.slice(2), 10);
    
            const nextNumber = (numericPart + 1).toString().padStart(3, '0');
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
            console.log('maxDebt: ', maxDebt);
            console.log('total: ', totalAmount);

            if ((totalAmount + agency.dataValues.currentDebt) > maxDebt.dataValues.maxDebt) {
                return { success: false, message: 'Total amount exceeds the agency\'s debt!' };
            }

            const delivery_note_code = await this.generateDeliveryNoteCode();

            const deliveryNote = await DeliveryNote.create({
                deliveryNoteCode: delivery_note_code,
                agencyCode: deliveryNoteData.agencyCode.dataValues.agencyCode,
                deliveryDate: deliveryNoteData.createdDate,
                createdBy: deliveryNoteData.createdBy,
            });

            agency.currentDebt += totalAmount;
            await agency.save();

            return { success: true, deliveryNote };
        } catch (error) {
            console.error('Error in createDeliveryNote:', error);
            return { success: false, message: 'Error creating delivery note!' };
        }
    }
    
    static createDeliveryNoteDetail = async (deliveryNoteDetailData) => {
        const transaction = await sequelize.transaction();
        try {
            const deliveryNoteDetail = await DeliveryNoteDetail.create({
                deliveryNoteCode: deliveryNoteDetailData.deliveryNoteCode,
                productCode: deliveryNoteDetailData.productCode,
                type: deliveryNoteDetailData.type,
                unit: deliveryNoteDetailData.unit,
                quantity: deliveryNoteDetailData.quantity,
                unitPrice: deliveryNoteDetailData.price,
                totalPrice: deliveryNoteDetailData.totalPrice,
            }, { transaction });
    
            const inventory = await Inventory.findOne({
                where: {
                    productCode: deliveryNoteDetailData.productCode,
                    unit: deliveryNoteDetailData.unit,
                },
            });
    
            inventory.quantityInStock -= deliveryNoteDetailData.quantity;
            await inventory.save({ transaction });
    
            await transaction.commit();
    
            return { success: true, deliveryNoteDetail };
        } catch (error) {
            await transaction.rollback();
            console.error('Error in createDeliveryNoteDetail:', error);
            return { success: false, message: 'Error creating delivery note detail!' };
        }
    };
    
    static getMaxProduct = async (currentType) => {
        const maxProduct = await AgencyType.findOne({where:{type: currentType}, attribute:['productCount']});
        return maxProduct;
    }
}

module.exports =  AddDeliveryNote;