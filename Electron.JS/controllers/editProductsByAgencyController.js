const { Distribution } = require('../models/distribution');

const deleteProductByAgency = async (productCode, unit, type) => {
    try {
        await Distribution.destroy({ where: { productCode: productCode, unit: unit, type: type } });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete product');
    }
}

const updateProductByAgency = async (productCode, unit, type, price) => {
    try {
        await Distribution.update({ price: price }, { where: { productCode: productCode, unit: unit, type: type } });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update product');
    }
}

module.exports = { deleteProductByAgency, updateProductByAgency };