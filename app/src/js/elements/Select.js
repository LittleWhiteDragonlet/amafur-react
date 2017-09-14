import React from 'react'

const Select = ({ children }) =>
  <div className='select'>
    <div className='select__options'>
      {children}
    </div>
  </div>

Select.Option = ({ selected, value, children, onClick }) =>
  <div value={value} className={`element-option ${selected ? 'element-option--selected' : ''}`} onClick={onClick}>{children}</div>

Select.Option.displayName = 'Select.Option'

Select.Image = ({ src, alt }) =>
  <img src={src} alt={alt || src} className='select__image' />

Select.Image.displayName = 'Select.Image'

export default Select
