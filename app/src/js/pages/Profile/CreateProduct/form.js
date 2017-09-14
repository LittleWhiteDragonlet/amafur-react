import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'

import { validate } from './validators'
import { normalizePrice } from './normalize'

import InputField from 'elements/Input/InputField'
import AreaField from 'elements/Input/AreaField'
import CurrencyField from 'elements/Input/CurrencyField'
import CheckboxField from 'elements/Input/CheckboxField'
import SelectField from 'elements/Input/SelectField'

const categories = [
  { key: 'accessories', value: 'accessories', text: 'Accessories' },
  { key: 'art_collectibles', value: 'art_collectibles', text: 'Art & Collectibles' },
  { key: 'bags_purses', value: 'bags_purses', text: 'Bags & Purses' },
  { key: 'bath_beauty', value: 'bath_beauty', text: 'Bath & Beauty' },
  { key: 'books_movies_music', value: 'books_movies_music', text: 'Books, Movies & Music' },
  { key: 'clothing', value: 'clothing', text: 'Clothing' },
  { key: 'craft_tools', value: 'craft_tools', text: 'Craft Supplies & Tools' },
  { key: 'electronics_accessories', value: 'electronics_accessories', text: 'Electronics & Accessories' },
  { key: 'jewelry', value: 'jewelry', text: 'Jewelry' },
  { key: 'paper_party_supplies', value: 'paper_party_supplies', text: 'Paper & Party Supplies' },
  { key: 'patio_lawn_garden', value: 'patio_lawn_garden', text: 'Patio, Lawn & Garden' },
  { key: 'pet_supplies', value: 'pet_supplies', text: 'Pet Supplies' },
  { key: 'shoes', value: 'shoes', text: 'Shoes' },
  { key: 'toys_games', value: 'toys_games', text: 'Toys & Games' },
  { key: 'video_games', value: 'video_games', text: 'Video Games & Consoles' },
  { key: 'wedding', value: 'wedding', text: 'Weddings' }
]

const CreateProductForm = ({ handleSubmit }) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Product name' />
    <Field component={AreaField} name='description' label='Description' placeholder='Product descripton'  />
    <Field component={SelectField} name='category' label='Category' options={categories} />
    <Field component={InputField} name='tags' label='Search Keywords' placeholder='Keywords' />
    <Field component={CurrencyField} name='price' label='Base price' placeholder='0.00' normalize={normalizePrice} />
    <Field component={CheckboxField} name='isPublic' label='Public' />
    <Form.Button type='submit' primary>Submit</Form.Button>
  </Form>

const ConnectedCreateProductForm = reduxForm({
  form: 'newProduct',
  validate
})(CreateProductForm)

const mapStateToProps = ({ items }) =>
({
  initialValues: items.new
})

export default connect(mapStateToProps)(ConnectedCreateProductForm)
