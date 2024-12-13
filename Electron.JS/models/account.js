'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.DeliveryNote, {
        foreignKey: 'createBy',
        sourceKey: 'personelCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      this.belongsTo(models.EmployeeProfile, {
        foreignKey: 'profileCode',
        targetKey: 'profileCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      this.hasMany(models.PaymentReceipt, {
        foreignKey: 'createBy',
        sourceKey: 'personelCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    }
  }
  Account.init({
    personnelCode: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    profileCode: DataTypes.STRING,
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
    freezeTableName: true,
  });
  return Account;
};