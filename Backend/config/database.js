const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('kbo', 'postgres', 'isover', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
