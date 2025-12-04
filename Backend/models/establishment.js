const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Enterprise = require('./enterprise');

const Establishment = sequelize.define('Establishment', {
  establishment_number: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  start_date: DataTypes.DATEONLY,
  enterprise_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'establishment',
  timestamps: false,
});

Enterprise.hasMany(Establishment, {
  foreignKey: 'enterprise_number',
  onDelete: 'CASCADE',
});

Establishment.belongsTo(Enterprise, {
  foreignKey: 'enterprise_number',
});

module.exports = Establishment;
