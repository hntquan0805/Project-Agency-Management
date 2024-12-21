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
    unit: {
        type: DataTypes.STRING,
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

DeliveryNoteDetail.associate = (models) => {
    DeliveryNoteDetail.belongsTo(models.Inventory, {
        foreignKey: 'productCode',
        targetKey: 'productCode',
        onUpdate: 'CASCADE',
    });
    DeliveryNoteDetail.belongsTo(models.DeliveryNote, {
        foreignKey: 'deliveryNoteCode',
        targetKey: 'deliveryNoteCode',
        onUpdate: 'CASCADE',
    });
};

module.exports = { DeliveryNoteDetail };
