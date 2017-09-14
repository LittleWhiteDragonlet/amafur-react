import React from 'react'
import Hero from 'elements/Hero'

import AboutNav from './Nav'

const AboutLayout = ({ children }) =>
  <div className='about'>
    <Hero title='Ryan Stegmann' subtitle='About me' />
    <AboutNav />
    {children}
  </div>

export default AboutLayout
