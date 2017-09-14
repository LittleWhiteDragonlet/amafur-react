import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import InputField from 'elements/Input/InputField'

import OfferMenu from 'components/OfferMenu'

const ShopChatForm = ({ handleSubmit, threadType }) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} label='Message' name='text' placeholder='Type a chat message' />
    <Button.Group fluid>
      <Button type='submit' primary>Send</Button>
      {threadType === 'shop' && <OfferMenu />}
    </Button.Group>
  </Form>

export default reduxForm({
  form: 'sendThreadChatMessage'
})(ShopChatForm)
