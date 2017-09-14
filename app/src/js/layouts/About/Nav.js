import React from 'react'
import Tab from 'elements/Tab'
import { withRouter } from 'react-router'

const Tabs = ({ location }) =>
  <div className='tabs is-toggle is-fullwidth is-large'>
    <ul>
      <Tab title='Programming Langauges' icon='code' isActive={location.pathname === '/about/languages'} to='/about/languages' />
      <Tab title='Interests' icon='heart' isActive={location.pathname === '/about/interests'} to='/about/interests' />
      <Tab title='Summary' icon='list-alt' isActive={location.pathname === '/about/summary'} to='/about/summary' />
      <Tab title='Contact' icon='comment-alt' isActive={location.pathname === '/about/contact'} to='/about/contact' />
    </ul>
  </div>

export default withRouter(Tabs)
