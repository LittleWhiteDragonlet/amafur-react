import React, { Component } from 'react'

import MessageWithUserInfo from './WithUser'
import MessageWithoutUserInfo from './WithoutUser'

class TextMessage extends Component {
  render() {
    const { message, withUserInfo } = this.props
    if (withUserInfo) {
      return <MessageWithUserInfo message={message} />
    }
    return <MessageWithoutUserInfo message={message} />
  }
}

export default TextMessage
