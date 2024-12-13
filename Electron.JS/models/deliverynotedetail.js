'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryNoteDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Inventory, {
        foreignKey: 'productCode',
        targetKey: 'productCode',
        onUpdate: 'CASCADE',
      })
      this.belongsTo(models.DeliveryNote, {
        foreignKey: 'deliveryNoteCode',
        targetKey: 'deliveryNoteCode',
        onUpdate: 'CASCADE',
      })
    }
  }
  DeliveryNoteDetail.init({
    deliveryNoteCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DOUBLE,
    totalPrice: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'DeliveryNoteDetail',
    freezeTableName: true,
  });
  return DeliveryNoteDetail;
};
