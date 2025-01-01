const { Distribution } = require('../../models/distribution');
const { Inventory } = require('../../models/inventory');
const { Unit } = require('../../models/unit');

const saveFormData = async (formData) => {
try {
    const product = await Inventory.findOne({
        where: {
            productName: formData.name,
            unitName: formData.calculationUnit,
        },
    });

    if (!product) {
        return { success: false, message: `Product name "${formData.name}" does not exist in the inventory.` };
    }

    console.log(formData.type);
    const result = await Distribution.create({
        productCode: product.productCode,
        type: parseInt(formData.type),
        unit: formData.calculationUnit,
        price: parseFloat(formData.price),
    });

    return { success: true, result };
} catch (error) {
    console.error('Error saving data:', error);
    return { success: false, message: 'Error!' }
}
}

module.exports = saveFormData;