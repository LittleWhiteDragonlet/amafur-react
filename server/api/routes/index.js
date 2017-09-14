const router = require('express').Router()

const auth = require('./auth')
// const items = require('./items')
const account = require('./account')
// const profile = require('./profile')

module.exports =
  router
    .use('/auth', auth)
    // .use('/items', items)
    .use('/account', account)
    // .use('/profile', profile)
