'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Agency, {
        foreignKey: 'agentCode',
        targetKey: 'agentCode',
        onUpdate: 'CASCADE',
      })
    }
  }
  RevenueReport.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    agentCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfDeliveryNotes: DataTypes.INTEGER,
    totalValue: DataTypes.DOUBLE,
    rate: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'RevenueReport',
    freezeTableName: true,
  });
  return RevenueReport;
};
