const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, pipe, path } = require('ramda')

const editAccountHandler = require('./handlers/edit')
const getAccountHandler = require('./handlers/get')

const validateBody = apiRequire('middleware/validate-body')
const validFields = apiRequire('middleware/valid-fields')

const validAccountUser = validFields('account', ['name', 'username', 'oldPassword'])

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/',
      getAccountHandler
    )
    .put('/',
      validateBody(validAccountUser),
      editAccountHandler
    )
