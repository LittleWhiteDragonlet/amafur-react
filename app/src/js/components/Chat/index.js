import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { length, path, pipe } from 'ramda'

import { reset } from 'redux-form'

import { Card, Comment, Message } from 'semantic-ui-react'

import ThreadChatForm from './form'
import ThreadChatMessages from './Log'

import { sendThreadChatMessage, fetchThreadChatMessages, joinChatThread, leaveChatThread } from 'actions/chat'

const getThreadId = path([ 'thread', 'id' ])
const getMessages = path([ 'messages' ])
const msgLength = pipe(getMessages, length)

class ThreadChat extends Component {
  componentWillMount() {
    const { user, chat, thread, joinChatThread } = this.props
    const threadId = getThreadId(thread)
    if (!!threadId && threadId !== chat.threadId) {
      joinChatThread(threadId, user)
    }
  }
  componentWillUpdate(nextProps) {
    const { user, thread, chat, joinChatThread, isFetching } = nextProps
    const threadId = getThreadId(thread)
    if (!!threadId && threadId !== chat.threadId && isFetching !== threadId) {
      joinChatThread(threadId, user)
    }
  }
  componentWillUnmount() {
    const { chat, user } = this.props
    this.props.leaveChatThread(chat.threadId, user)
  }
  scrollEnd() {
    const node = findDOMNode(this.messagesEnd)
    node.scrollIntoView({ behavior: 'smooth' })
  }
  componentDidMount() {
    this.scrollEnd()
  }
  componentDidUpdate() {
    this.scrollEnd()
  }
  render() {
    const { user, chat, thread, threadType, sendThreadChatMessage, clearThreadChat } = this.props
    return (
      <Card className='chat__container'>
        <Card.Content>
          <Card.Header>{!!thread && thread.name} chat</Card.Header>
        </Card.Content>
        <Card.Content>
          <Comment.Group>
          { msgLength(chat) ?
            ThreadChatMessages(chat.messages)
            : <Message info>
                <Message.Header style={{ textAlign: 'center' }}>No chat activity 😞</Message.Header>
                <p style={{ textAlign: 'center' }}>Share the link for others to join!</p>
              </Message>
          }
            <div className='chat-scroll' ref={el => { this.messagesEnd = el }}></div>
          </Comment.Group>
        </Card.Content>
        <Card.Content extra>
          <ThreadChatForm
            threadType={threadType}
            onSubmit={v => {
              if (v.text) {
                sendThreadChatMessage(v.text, getThreadId(thread), user)
                clearThreadChat()
              }
            }} />
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({ user, chat }) =>
({
  user,
  chat,
  isFetching: chat.isFetching
})

const mapDispatchToProps = dispatch =>
({
  fetchThreadChatMessages: user => dispatch(fetchThreadChatMessages(user)),
  sendThreadChatMessage: (msg, threadId, user) => dispatch(sendThreadChatMessage(msg, threadId, user)),
  joinChatThread: (threadId, user) => dispatch(joinChatThread(threadId, user)),
  leaveChatThread: (threadId, user) => dispatch(leaveChatThread(threadId, user)),
  clearThreadChat: () => dispatch(reset('sendThreadChatMessage')),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadChat)
