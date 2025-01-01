const { Sequelize, Model } = require('sequelize');
const path = require('path');
const envPath = path.join(process.resourcesPath, '.env');
require('dotenv').config({ path: envPath });
const fs = require('fs');
const logStream = fs.createWriteStream('database.log', { flags: 'a' });

const sequelize = new Sequelize(process.env.database, 'root', process.env.password, {
  host: 'localhost',
  dialect: 'mysql'
});

function logToDatabase(message, databaseName) {
  const logMessage = `${new Date().toISOString()} - Database: ${databaseName} - ${message}\n`;
  logStream.write(logMessage);
}

let connect = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    logToDatabase('Kết nối cơ sở dữ liệu thành công!', process.env.database);
    logToDatabase('Đang truy vấn dữ liệu...', process.env.database);
    logStream.end();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    logToDatabase('Kết nối cơ sở dữ liệu thành công!', process.env.database);
    logToDatabase('Đang truy vấn dữ liệu...', process.env.database);
    logStream.end();
  }
}

module.exports = { connect, sequelize, Model };