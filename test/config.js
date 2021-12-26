const { Sequelize, DataTypes } = require('sequelize');
const path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve('test/example.db'),
  logging: false
});

const User = sequelize.define('users', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  },
  birth_date: {
    type: DataTypes.DATEONLY
  }
}, {
  timestamps: false
});


module.exports = User;
