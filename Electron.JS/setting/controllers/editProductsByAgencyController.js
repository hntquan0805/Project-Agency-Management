const { Distribution } = require('../../models/distribution');
const { Inventory } = require('../../models/inventory');
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

    static updateProductByAgency = async (productCode, unit, type, price, stock) => {
        try {
            const distribute_t = await Distribution.findOne({
                where: { productCode: productCode, unit: unit, type: type }
            });
            distribute_t.price = price;
            const inventory_t = await Inventory.findOne({
                where: { productCode: productCode, unit: unit }
            });
            console.log(stock);
            inventory_t.quantityInStock = stock;
            await distribute_t.save();
            console.log(inventory_t.quantityInStock);
            await inventory_t.save();
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update product');
        }
    }
}

module.exports = EditProductsByAgency;