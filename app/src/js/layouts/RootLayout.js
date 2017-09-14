import React from 'react'

import Header from 'components/Header'
import Dock from 'components/Dock'

const RootLayout = ({ children }) =>
  <div className='root'>
    <Header />
    {children}
    <Dock />
  </div>

export default RootLayout
