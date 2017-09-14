import React from 'react'
import { connect } from 'react-redux'

import AvatarPreview from './Preview'
import AvatarEditor from './Editor'

const Avatar = () =>
  <div className='avatar__container'>
    <AvatarPreview />
    <AvatarEditor />
  </div>

export default Avatar
