'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Account, {
        foreignKey: 'createdBy',
        targetKey: 'personnelCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      this.belongsTo(models.Agency, {
        foreignKey: 'agentCode',
        targetKey: 'agentCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    }
  }
  PaymentReceipt.init({
    paymentReceiptCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    paymentDate: DataTypes.DATE,
    amount: DataTypes.DOUBLE,
    agentCode: DataTypes.STRING,
    createdBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentReceipt',
    freezeTableName: true,
  });
  return PaymentReceipt;
};
