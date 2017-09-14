import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Comment } from 'semantic-ui-react'

const MessageWithUserInfo = ({ message }) =>
  <Comment>
    <Comment.Avatar src={message.user && (message.user.image || '/images/placeholder.png')} />
    <Comment.Content>
      {message.user && <Comment.Author as={NavLink} to={`/user/${message.user.username}`}>{message.user.username}</Comment.Author>}
      <Comment.Metadata>
        <div>{moment(message.createdAt).fromNow()}</div>
      </Comment.Metadata>
      <Comment.Text>{message.text}</Comment.Text>
    </Comment.Content>
  </Comment>

export default MessageWithUserInfo
