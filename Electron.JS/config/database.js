const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('db_app', 'root', 'YeChan@_2024', {
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