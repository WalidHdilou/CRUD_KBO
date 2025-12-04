const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enterprise = sequelize.define('Enterprise', {
  enterprise_number: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  status: DataTypes.STRING,
  juridical_situation: DataTypes.STRING,
  type_of_enterprise: DataTypes.STRING,
  juridical_form: DataTypes.STRING,
  juridical_form_cac: DataTypes.STRING,
  start_date: DataTypes.DATEONLY,
}, {
  tableName: 'entreprise', 
  timestamps: false,
});

module.exports = Enterprise;
