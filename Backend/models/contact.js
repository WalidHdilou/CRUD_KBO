const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Enterprise = require('./enterprise');

const Contact = sequelize.define('Contact', {
  entity_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  entity_contact: DataTypes.STRING,
  contact_type: DataTypes.STRING,
  value: DataTypes.STRING,
}, {
  tableName: 'contact',
  timestamps: false,
});

Enterprise.hasMany(Contact, {
  foreignKey: 'entity_number',
  sourceKey: 'enterprise_number',
});
Contact.belongsTo(Enterprise, {
  foreignKey: 'entity_number',
  targetKey: 'enterprise_number',
});

module.exports = Contact;
