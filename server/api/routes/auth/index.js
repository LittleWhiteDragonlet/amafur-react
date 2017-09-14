const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, pipe, path, prop, props } = require('ramda')

const loginHandler = require('./handlers/login')
const signupHandler = require('./handlers/signup')
const validatePhoneHandler = require('./handlers/validatePhone')
const validateUsernameHandler = require('./handlers/validateUsername')
const phoneConfirmationHandler = require('./handlers/phoneConfirmation')

const validateBody = apiRequire('middleware/validate-body')
const validFields = apiRequire('middleware/valid-fields')
const hashPassword = apiRequire('middleware/hash-password')

const validSignupUser = validFields('user', ['name', 'phone', 'username', 'password'])

module.exports =
  router
    .post('/login',
      passport.authenticate('local', { session: false }),
      loginHandler
    )
    .post('/signup',
      validateBody(validSignupUser),
      hashPassword,
      signupHandler
    )
   .post('/signup/validate_phone',
      validateBody(prop('phone'), 'missing phone'),
      validatePhoneHandler
    )
    .post('/signup/validate_username',
      validateBody(prop('username'), 'missing username'),
      validateUsernameHandler
    )
    .get('/signup/phone_confirmation',
      validateBody(props(['phone', 'code']), 'missing phone or code'),
      phoneConfirmationHandler
    )
