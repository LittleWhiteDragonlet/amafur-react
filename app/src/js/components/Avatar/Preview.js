import React from 'react'
import { connect } from 'react-redux'

import Card from 'elements/Card'

const AvatarPreview = ({ avatar, saveAvatar }) =>
  <Card className='avatar-preview'>
    <Card.Header>
      <Card.Title>Avatar</Card.Title>
    </Card.Header>
    <img src={avatar.preview} />
    <button className='button' onClick={saveAvatar}>Save</button>
  </Card>

const mapStateToProps = ({ user }) =>
({
  avatar: user.avatar,
})

const mapDispatchToProps = dispatch =>
({
  saveAvatar: () => dispatch({ type: 'SAVE_AVATAR' }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarPreview)
