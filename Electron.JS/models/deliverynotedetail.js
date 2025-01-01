const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const DeliveryNoteDetail = sequelize.define('DeliveryNoteDetail', {
    deliveryNoteCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    productCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    unitPrice: {
        type: DataTypes.DOUBLE,
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
    },
}, {
    freezeTableName: true,
    tableName: 'DeliveryNoteDetail',
});

module.exports = { DeliveryNoteDetail };

const { DeliveryNote } = require('./deliverynote');
const { Distribution } = require('./distribution');

DeliveryNoteDetail.belongsTo(DeliveryNote, {
  foreignKey: 'deliveryNoteCode',
  targetKey: 'deliveryNoteCode',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

DeliveryNoteDetail.belongsTo(Distribution, {
  foreignKey: 'productCode',
  targetKey: 'productCode',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

DeliveryNoteDetail.belongsTo(Distribution, {
  foreignKey: 'type',
  targetKey: 'type',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

DeliveryNoteDetail.belongsTo(Distribution, {
  foreignKey: 'unit',
  targetKey: 'unit',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
