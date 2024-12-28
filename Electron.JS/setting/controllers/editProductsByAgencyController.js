const { Distribution } = require('../../models/distribution');
class EditProductsByAgency
{
    static deleteProductByAgency = async (productCode, unit, type) => {
        try {
            await Distribution.destroy({ where: { productCode: productCode, unit: unit, type: type } });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete product');
        }
    }

    static updateProductByAgency = async (productCode, unit, type, price) => {
        try {
            await Distribution.update({ price: price }, { where: { productCode: productCode, unit: unit, type: type } });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update product');
        }
    }
}

module.exports = EditProductsByAgency;