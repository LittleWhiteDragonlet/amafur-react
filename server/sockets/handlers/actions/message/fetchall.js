const jwt = require('jsonwebtoken')

const models = requireDb
const { User, Offer, Message } = models

const offerAttributes = ['id', 'state', 'itemName', 'price', 'sellerId']
const userAttributes = ['id', 'username', 'image']

const joinChatThread = (io, socket, action) => {
  const { threadId, user } = action.payload
  Thread.findOne({ where: threadId })
    .then(thread =>
      !thread ? Promise.reject('no thread')
      : thread
    )
  .then(thread => thread.getMessages())
  .then(messages => {
    console.log(messages);
    if (socket.thread) {
      socket.leave(socket.thread)
    }
    socket.join(threadId)
    socket.thread = threadId
    socket.emit('action', {
      type: 'JOIN_THREAD_SUCCESS',
      payload: {
        messages,
        threadId
      }
    })
  })
}

const fetchThreadChatMessages = (io, socket, action) => {
  const { threadId } = action.payload
  Thread.findOne({ where: threadId })
    .then(thread =>
      !thread ? Promise.reject('no thread')
      : thread
    )
    .then(thread => thread.getMessages())
    .then(messages =>
      socket.emit('action', {
        type: 'RECEIVE_THREAD_CHAT_MESSAGES',
        payload: {
          messages
        }
      })
    )
}

module.exports = { fetchThreadChatMessages }
