const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, pipe, path } = require('ramda')

const editAddressHandler = require('./handlers/edit')
const getAddressHandler = require('./handlers/get')

const validateBody = apiRequire('middleware/validate-body')
const validFields = apiRequire('middleware/valid-fields')

const validAddress = validFields('address', ['name', 'line1', 'city', 'region', 'country', 'zip'])

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/`,
      getAddressHandler
    )
    .put(`/`,
      validateBody(validAddress),
      editAddressHandler
    )
