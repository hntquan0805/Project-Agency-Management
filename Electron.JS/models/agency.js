const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Agency = sequelize.define('Agency', {
    agencyCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.INTEGER,
    },
    onboardDate: {
        type: DataTypes.DATE,
    },
    district: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'Agency',
});

Agency.associate = (models) => {
    Agency.hasMany(models.DeliveryNote, {
        foreignKey: 'agencyCode',
        sourceKey: 'agencyCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
    Agency.hasMany(models.RevenueReport, {
        foreignKey: 'agencyCode',
        sourceKey: 'agencyCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
    Agency.hasMany(models.DebtHistory, {
        foreignKey: 'agencyCode',
        sourceKey: 'agencyCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
    Agency.hasMany(models.PaymentReceipt, {
        foreignKey: 'agencyCode',
        sourceKey: 'agencyCode',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
};

module.exports =  { Agency };
