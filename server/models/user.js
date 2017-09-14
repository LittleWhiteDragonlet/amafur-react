const bcrypt = require('bcrypt')
const { Enum, DateNow, UniqueString, False, Zero } = require('./helpers/datatypes')

const rankTypes = ['user','moderator','admin','artist','developer','hs','npc']
const genderTypes = ['Male','Female']

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    phone: UniqueString(DataTypes),
    username: UniqueString(DataTypes),
    password: DataTypes.STRING,
    ip: DataTypes.STRING,
    code: DataTypes.STRING,
    verified: False(DataTypes),
    registered: False(DataTypes),
    banned: False(DataTypes),
    gender: Enum(DataTypes, genderTypes, 'Male'),
    rank: Enum(DataTypes, rankTypes, 'user'),
    fluff: Zero(DataTypes),
    scales: Zero(DataTypes),
    notifications: Zero(DataTypes),
    lastLogin: DateNow(DataTypes),
    avatar: DataTypes.STRING,
    signature: DataTypes.STRING,
  })

  User.associate = ({ Account }) => {
    User.hasOne(Account)
  }

  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
