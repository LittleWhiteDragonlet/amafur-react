import React from 'react'
import Hero from 'elements/Hero'

const BlogLayout = ({ children }) =>
  <div className='blog'>
    <Hero title='Ryan Stegmann' subtitle='My Blog' />
    {children}
  </div>

export default BlogLayout
