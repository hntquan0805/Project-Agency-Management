const { DeliveryNote } = require('../../models/deliverynote');
const { DeliveryNoteDetail } = require('../../models/deliverynotedetail');

async function generateDeliveryNoteCode() {
    try {
        // Find the largest existing deliveryNoteCode
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
        return `DN${nextNumber}`;
    } catch (error) {
        console.error('Error generating deliveryNoteCode:', error);
        throw error;
    }
}

async function saveCartDataToDatabase(noteData, cartData) {
    try {
        // Generate the next deliveryNoteCode
        const deliveryNoteCode = await generateDeliveryNoteCode();

        // Create a new delivery note entry
        await DeliveryNote.create({
            deliveryNoteCode: deliveryNoteCode,
            agencyCode: noteData.agencyCode,
            deliveryDate: noteData.deliveryDate || new Date(),
            createdBy: 'AC001',
        });

        // Map cartData to match DeliveryNoteDetail fields
        const details = cartData.map(item => ({
            deliveryNoteCode: deliveryNoteCode,
            productCode: item.serial,
            type: noteData.agencyType,
            unit: item.unit,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.quantity * item.price,
        }));

        // Insert all delivery note details into the database
        await DeliveryNoteDetail.bulkCreate(details);

        console.log(`Delivery note ${deliveryNoteCode} saved successfully!`);
        return { success: true, deliveryNoteCode };
    } catch (error) {
        console.error('Error saving delivery note:', error);
        throw error;
    }
}

module.exports = { saveCartDataToDatabase };