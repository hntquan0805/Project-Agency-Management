const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DeliveryNoteDetail = sequelize.define('DeliveryNoteDetail', {
    deliveryNoteCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
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
const { Inventory } = require('./inventory');
const { Unit } = require('./unit');

DeliveryNoteDetail.belongsTo(DeliveryNote, {
  foreignKey: 'deliveryNoteCode',
  targetKey: 'deliveryNoteCode',
  onUpdate: 'CASCADE',
});

DeliveryNoteDetail.belongsTo(Inventory, {
    foreignKey: 'productCode',
    targetKey: 'productCode',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Or another suitable delete behavior like CASCADE, depending on your use case
});

DeliveryNoteDetail.belongsTo(Unit, {
    foreignKey: 'unit',
    targetKey: 'unitName',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Or another suitable delete behavior
});

// DeliveryNoteDetail.belongsTo(Distribution, {
//   foreignKey: 'productCode',
//   targetKey: 'productCode',
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// });

// DeliveryNoteDetail.belongsTo(Distribution, {
//   foreignKey: 'type',
//   targetKey: 'type',
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// });

// DeliveryNoteDetail.belongsTo(Distribution, {
//   foreignKey: 'unit',
//   targetKey: 'unit',
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// });

