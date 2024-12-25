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

DeliveryNoteDetail.associate = (models) => {
    DeliveryNoteDetail.belongsTo(models.DeliveryNote, {
        foreignKey: 'deliveryNoteCode',
        targetKey: 'deliveryNoteCode',
        onUpdate: 'CASCADE',
    });
    sequelize.addConstraint('DeliveryNoteDetail', {
        fields: ['productCode', 'type', 'unit'], // Các trường tham gia khóa ngoại
        type: 'foreign key',
        name: 'fk_deliverynote_distribution', // Tên khóa ngoại
        references: {
            table: 'Distribution',
            fields: ['productCode', 'type', 'unit'], // Trường liên kết
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    });
};

module.exports = { DeliveryNoteDetail };
