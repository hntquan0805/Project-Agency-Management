const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DebtHistory = sequelize.define('DebtHistory', {
    agencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    initialDebt: {
        type: DataTypes.DOUBLE,
    },
    endDebt: {
        type: DataTypes.DOUBLE,
    },
    incurredDebt: {
        type: DataTypes.DOUBLE,
    }
}, {
    freezeTableName: true,
    tableName: 'DebtHistory',
});

// DebtHistory.associate = (models) => {
//     DebtHistory.belongsTo(models.Agency, {
//         foreignKey: 'agencyCode',
//         targetKey: 'agencyCode',
//         onUpdate: 'CASCADE',
//     });
// };

module.exports = { DebtHistory };

const { Agency } = require('./agency');

// Thiết lập mối quan hệ với Agency
DebtHistory.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onUpdate: 'CASCADE',
});
