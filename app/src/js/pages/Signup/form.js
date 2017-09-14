import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'
import InputField from 'elements/Input/InputField'

import { validate, asyncValidate } from './validators'

const SignupForm = ({ handleSubmit, submitting }) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Name' />
    <Field component={InputField} name='username' label='Username' placeholder='Username' />
    <Field component={InputField} name='phone' type='phone' label='Phone' placeholder='Phone' />
    <Field component={InputField} name='password' type='password' label='Password' placeholder='Password' />
    <Form.Button loading={submitting} type='submit' primary>Sign up</Form.Button>
  </Form>

export default reduxForm({
  form: 'signup',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'username', 'phone' ]
})(SignupForm)
