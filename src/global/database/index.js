require('dotenv').config()
const { Sequelize } = require('sequelize')
const mysqlConfig = require('../config/mysql.config');

module.exports = new Sequelize(
    mysqlConfig.database,
    mysqlConfig.username,
    mysqlConfig.password,
    {
        dialect: 'mysql',
        host: mysqlConfig.host,
        port: mysqlConfig.port,
    }
);
