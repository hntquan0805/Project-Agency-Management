const { PaymentReceipt } = require('../models/paymentreceipt');
const { Agency } = require('../models/agency');

const saveGoodsReceivedNote = async (formData) => {
    const { agencyName, address, phoneNumber, email, amount, date } = formData;

    try {
        const agency = await Agency.findOne({
            where: {
                name: agencyName,
                address: address,
                phone: phoneNumber,
                email: email
            }
        });

        if (!agency) {
            return { success: false, message: 'No matching agency found!' };
        }

        const agencyCode = agency.agencyCode;

        const latestReceipt = await PaymentReceipt.findOne({
            order: [['paymentReceiptCode', 'DESC']]
        });

        let newCode = 'PR001';
        if (latestReceipt) {
            const lastCode = latestReceipt.paymentReceiptCode;
            const numberPart = parseInt(lastCode.substring(2));
            const newNumberPart = numberPart + 1;
            newCode = `PR${String(newNumberPart).padStart(3, '0')}`;
        }

        await PaymentReceipt.create({
            paymentReceiptCode: newCode,
            paymentDate: new Date(date),
            amount: parseFloat(amount),
            agencyCode: agencyCode,
            createdBy: 'AC001'
        });

        return { success: true, message: 'Payment receipt has been successfully saved!', paymentReceiptCode: newCode };

    } catch (error) {
        console.error('Error while saving payment receipt:', error);
        return { success: false, message: 'An error occurred while saving the payment receipt!' };
    }
}

module.exports = { saveGoodsReceivedNote };