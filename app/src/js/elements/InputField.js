import React from 'react'
import Loader from 'elements/Loader'

const getClass = (touched, error, asyncValidating) => {
  if (touched) {
    if (!asyncValidating) {
      if (error) {
        return 'input is-danger'
      }
      return 'input is-success'
    }
    return 'input'
  }
  return 'input'
}

const InputField = ({ input, meta: { asyncValidating, touched, error }, type, autoFocus, label, placeholder, icon }) =>
  <div className='field'>
    <label className='label'>{label}</label>
    <div className={`control has-icons-left ${asyncValidating && 'has-icons-right'}`}>
      <span className='icon is-small is-left'><i className={`fal fa-${icon}`}></i></span>
      <input type={type || 'text'} {...input} className={getClass(touched, error, asyncValidating)} autoFocus={autoFocus || false} placeholder={placeholder || label} />
      {asyncValidating && <span className='icon is-small is-right'><Loader /></span>}
    </div>
    {touched && error && <p className='help is-danger'>{error}</p>}
  </div>


export default InputField
