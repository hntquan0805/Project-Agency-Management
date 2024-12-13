'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DebtHistory extends Model {
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
  DebtHistory.init({
    agentCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    initialDebt: DataTypes.DOUBLE,
    endDebt: DataTypes.DOUBLE,
    incurredDebt: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'DebtHistory',
    freezeTableName: true,
  });
  return DebtHistory;
};