const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Enterprise = require('./enterprise');

const Denomination = sequelize.define('Denomination', {
  entity_number: {
    type: DataTypes.STRING(20),
    primaryKey: true,   // ⬅⬅⬅ IMPORTANT : pour éviter l'auto "id"
  },
  language: DataTypes.STRING,
  type_of_denomination: DataTypes.STRING,
  denomination: DataTypes.TEXT,
}, {
  tableName: 'denomination',
  timestamps: false,
});

Enterprise.hasMany(Denomination, {
  foreignKey: 'entity_number',
  sourceKey: 'enterprise_number',
});

Denomination.belongsTo(Enterprise, {
  foreignKey: 'entity_number',
  targetKey: 'enterprise_number',
});

module.exports = Denomination;
