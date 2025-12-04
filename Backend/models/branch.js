const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Enterprise = require('./enterprise');

const Branch = sequelize.define('Branch', {
  id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  start_date: DataTypes.DATEONLY,
  enterprise_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'branch',
  timestamps: false,
});

Enterprise.hasMany(Branch, {
  foreignKey: 'enterprise_number',
  sourceKey: 'enterprise_number',
});
Branch.belongsTo(Enterprise, {
  foreignKey: 'enterprise_number',
  targetKey: 'enterprise_number',
});

module.exports = Branch;
