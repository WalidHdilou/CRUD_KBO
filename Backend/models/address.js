const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Enterprise = require('./enterprise');

const Address = sequelize.define('Address', {
  entity_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  type_of_address: DataTypes.STRING,
  country_nl: DataTypes.STRING,
  country_fr: DataTypes.STRING,
  zipcode: DataTypes.STRING,
  municipality_nl: DataTypes.STRING,
  municipality_fr: DataTypes.STRING,
  street_nl: DataTypes.STRING,
  street_fr: DataTypes.STRING,
  house_number: DataTypes.STRING,
  box: DataTypes.STRING,
  extra_address_info: DataTypes.STRING,
  date_striking_off: DataTypes.STRING,
}, {
  tableName: 'address',
  timestamps: false,
});

Enterprise.hasMany(Address, {
  foreignKey: 'entity_number',
  sourceKey: 'enterprise_number',
});
Address.belongsTo(Enterprise, {
  foreignKey: 'entity_number',
  targetKey: 'enterprise_number',
});

module.exports = Address;
