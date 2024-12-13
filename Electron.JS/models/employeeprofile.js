'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeProfile.init({
    profileCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    cccd: DataTypes.STRING,
    dob: DataTypes.DATE,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeProfile',
    freezeTableName: true,
  });
  return EmployeeProfile;
};
