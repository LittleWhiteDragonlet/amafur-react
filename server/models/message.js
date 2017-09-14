const { Required } = require('./helpers/datatypes')

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    contentType: Required(DataTypes.STRING),
    text: DataTypes.STRING,
  })

  Message.associate = ({ User, Thread }) => {
    Message.belongsTo(Thread)
    Message.belongsTo(User)
  }

  return Message
}
