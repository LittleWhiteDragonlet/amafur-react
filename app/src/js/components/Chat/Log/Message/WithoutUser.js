import React from 'react'
import { Comment } from 'semantic-ui-react'

const MessageWithoutUserInfo = ({ message }) =>
  <Comment>
    <Comment.Avatar />
    <Comment.Content>
      <Comment.Text>{message.text}</Comment.Text>
    </Comment.Content>
  </Comment>

export default MessageWithoutUserInfo
