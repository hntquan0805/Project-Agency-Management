const { Distribution } = require('../../models/distribution');
const { Inventory } = require('../../models/inventory');

const saveFormData = async (formData) => {
try {
    const product = await Inventory.findOne({
        where: {
            productName: formData.name,
            unit: formData.calculationUnit,
        },
    });

    if (!product) {
        return { success: false, message: `Product name "${formData.name}" does not exist in the inventory.` };
    }

    product.quantityInStock = formData.stockQuantity;
    await product.save();

    const result = await Distribution.create({
        productCode: product.dataValues.productCode,
        type: parseInt(formData.type),
        unit: formData.calculationUnit,
        price: parseFloat(formData.price),
    });

    return { success: true, result };
} catch (error) {
    console.error('Error saving data:', error);
    return { success: false, message: 'Error: There is some data that already existed!' }
}
}

module.exports = saveFormData;