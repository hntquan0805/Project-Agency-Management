'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agency.hasMany(models.DeliveryNote, {
        foreignKey: 'agentCode',
        sourceKey: 'agentCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      Agency.hasMany(models.RevenueReport, {
        foreignKey: 'agentCode',
        sourceKey: 'agentCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      Agency.hasMany(models.DebtHistory, {
        foreignKey: 'agentCode',
        sourceKey: 'agentCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      Agency.hasMany(models.PaymentReceipt, {
        foreignKey: 'agentCode',
        sourceKey: 'agentCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    }
  }
  Agency.init({
    agentCode: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.INTEGER,
    onboardDate: DataTypes.DATE,
    district: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agency',
    freezeTableName: true,
  });
  return Agency;
};