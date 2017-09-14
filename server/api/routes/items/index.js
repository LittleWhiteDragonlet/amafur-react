const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, path, pipe, prop, is } = require('ramda')

const createItemHandler = require('./handlers/create')
const editItemHandler = require('./handlers/edit')
const getItemsHandler = require('./handlers/getAll')
const getItemHandler = require('./handlers/get')
const deleteItemHandler = require('./handlers/delete')

const validateBody = apiRequire('middleware/validate-body')
const validateParams = apiRequire('middleware/validate-params')
const validField = apiRequire('middleware/valid-field')
const validFields = apiRequire('middleware/valid-fields')

const validItem = validFields('item', ['name', 'isPublic', 'price'])
const validCreateItemParams = validFields(false, ['itemId'])
const validEditItemParams = validFields(false, ['itemId', 'id'])
const validShareItem = validFields(false, ['email', 'name', 'url', 'itemId'])

const validLayoutField = layout => ['grid', 'image', 'gallery'].includes(layout)
const validRGBField = p => obj => is(Object, path(p, obj))

const validLayout =
  allPass([
    validField('layout'),
    pipe(
      prop('layout'),
      validLayoutField
    )
  ])

const validTheme = validFields(false, ['theme', 'color'])
  allPass([
    validField('theme'),
    validField('color'),
    validRGBField(['color', 'rgb']),
  ])

module.exports =
  router
    .get(`/:id`,
      getItemHandler
    )
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/:itemId`,
      getItemsHandler
    )
    .post(`/:itemId`,
      validateBody(validItem),
      validateParams(validCreateItemParams),
      createItemHandler
    )
    .put(`/:itemId/:id`,
      validateBody(validItem),
      validateParams(validEditItemParams),
      editItemHandler
    )
    .delete(`/:itemId/:id`,
      deleteItemHandler
    )
