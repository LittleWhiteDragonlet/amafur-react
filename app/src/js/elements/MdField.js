import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

const AreaField = ({ input, autoFocus, label, placeholder }) =>
  <SimpleMDE
    {...input}
    options={{
      autofocus: autoFocus
    }}
    placeholder={placeholder || label}
  />


export default AreaField
