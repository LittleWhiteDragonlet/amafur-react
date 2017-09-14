import React from 'react'
import Loader from 'elements/Loader'

const getClass = (touched, error, asyncValidating) => {
  if (touched) {
    if (!asyncValidating) {
      if (error) {
        return 'textarea is-danger'
      }
      return 'textarea is-success'
    }
    return 'textarea'
  }
  return 'textarea'
}

const AreaField = ({ input, meta: { asyncValidating, touched, error }, autoFocus, label, placeholder }) =>
  <div className='field'>
    <label className='label'>{label}</label>
    <div className='control'>
      <textarea {...input} rows='10' className={getClass(touched, error, asyncValidating)} autoFocus={autoFocus || false} placeholder={placeholder || label}></textarea>
      {asyncValidating && <span className='icon is-small is-right'><Loader /></span>}
    </div>
    {touched && error && <p className='help is-danger'>{error}</p>}
  </div>


export default AreaField
