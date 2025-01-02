const { Sequelize, Model } = require('sequelize');
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const logStream = fs.createWriteStream('database.log', { flags: 'a' });
const caCert = fs.readFileSync(path.resolve(__dirname, '../certs/ca.pem'));

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      ca: caCert.toString(),
    },
  },
});

function logToDatabase(message, databaseName) {
  const logMessage = `${new Date().toISOString()} - Database: ${databaseName} - ${message}\n`;
  logStream.write(logMessage);
}

let connect = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    logToDatabase('Connection has been established successfully!', process.env.database);
    logStream.end();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    logToDatabase('Connection has been established unsuccessfully!', process.env.database);
    logStream.end();
  }
}

module.exports = { connect, sequelize, Model };