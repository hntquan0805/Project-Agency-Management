'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeliveryNote.belongsTo(models.Agency, {
        foreignKey: 'agentCode',
        targetKey: 'agentCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      DeliveryNote.belongsTo(models.Account, {
        foreignKey: 'createdBy',
        targetKey: 'personnelCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      DeliveryNote.hasMany(models.DeliveryNoteDetail, {
        foreignKey: 'deliveryNoteCode',
        sourceKey: 'deliveryNoteCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    }
  }
  DeliveryNote.init({
    deliveryNoteCode: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    agentCode: DataTypes.STRING,
    deliveryDate: DataTypes.DATE,
    createdBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DeliveryNote',
    freezeTableName: true,
  });
  return DeliveryNote;
};