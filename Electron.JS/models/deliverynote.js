const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DeliveryNote = sequelize.define('DeliveryNote', {
    deliveryNoteCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    agencyCode: {
        type: DataTypes.STRING,
    },
    deliveryDate: {
        type: DataTypes.DATE,
    },
    createdBy: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'DeliveryNote',
});

DeliveryNote.associate = (models) => {
    DeliveryNote.belongsTo(models.Agency, {
        foreignKey: 'agencyCode',
        targetKey: 'agencyCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
    DeliveryNote.belongsTo(models.Account, {
        foreignKey: 'createdBy',
        targetKey: 'personnelCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
    DeliveryNote.hasMany(models.DeliveryNoteDetail, {
        foreignKey: 'deliveryNoteCode',
        sourceKey: 'deliveryNoteCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
};

module.exports = { DeliveryNote };
