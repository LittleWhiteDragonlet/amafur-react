const { Message, User } = require('./')

const MessageAttributes = [ 'id', 'contentType', 'text' ]
const UserAttributes = [ 'id', 'username', 'avatar' ]

module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    name: DataTypes.STRING,
    owner: DataTypes.STRING
  })

  Thread.associate = ({ User, Message }) => {
    Thread.hasMany(User)
    Thread.hasMany(Message)
  }

  Thread.prototype.getMessages = function() {
    const threadId = this.id
    return Message.findAll({
      include: [
        {
          model: User,
          attributes: UserAttributes
        }
      ],
      where: { threadId },
      attributes: MessageAttributes,
    })
  }

  return Thread
}
