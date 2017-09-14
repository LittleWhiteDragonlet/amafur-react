import React from 'react'

const Section = ({ title, children }) =>
  <section className='section'>
    <div className='container'>
      {title && <h1 className='title'>{title}</h1>}
      <h2 className='subtitle'>
        {children}
      </h2>
    </div>
  </section>

export default Section
