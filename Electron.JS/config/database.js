const { Sequelize, Model } = require('sequelize');
require('dotenv').config();

console.log(process.env.username);

const sequelize = new Sequelize(process.env.database, 'root', process.env.password, {
  host: 'localhost',
  dialect: 'mysql'
});

let connect = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { connect, sequelize, Model };