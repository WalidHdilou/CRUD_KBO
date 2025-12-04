const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Enterprise = require('./enterprise');

const Activity = sequelize.define('Activity', {
  entity_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  activity_group: DataTypes.STRING,
  nace_version: DataTypes.STRING,
  nace_code: DataTypes.STRING,
  classification: DataTypes.STRING,
}, {
  tableName: 'activity',
  timestamps: false,
});

Enterprise.hasMany(Activity, {
  foreignKey: 'entity_number',
  sourceKey: 'enterprise_number',
});
Activity.belongsTo(Enterprise, {
  foreignKey: 'entity_number',
  targetKey: 'enterprise_number',
});

module.exports = Activity;
