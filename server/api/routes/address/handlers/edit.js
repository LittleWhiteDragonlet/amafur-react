const models = requireDb
const { Address } = models

const crypto = require('crypto')
const mailcomposer = require('mailcomposer')
const shortId = require('shortid')

const { confirmationMail, sendConfirmation } = apiRequire('service/mail')

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const addressAttributes = ['id', 'name', 'line1', 'line2', 'city', 'region', 'country', 'zip']

const getUserId = path(['user', 'id'])
const getUserName = path(['user', 'name'])

const validate = req =>
  Address.findOrCreate({
      where: { userId: getUserId(req) },
      defaults: { name: getUserName(req) }
  })
  .spread(address => address.get({plain: true}))

module.exports = (req, res) =>
  validate(req)
    .then(validAddress => {
      const updatedAddress = merge({
        name: validAddress.name,
        line1: validAddress.line1,
        line2: validAddress.line2,
        city: validAddress.city,
        region: validAddress.region,
        country: validAddress.country,
        zip: validAddress.zip,
      }, pick(['name', 'line1', 'line2', 'city', 'region', 'country', 'zip'], req.body.address))
      return Address.update(updatedAddress, { where: { id: validAddress.id, userId: req.user.id }, returning: true, plain: true })
    })
    .then(updatedArr => {
      const updatedAddress = updatedArr[1]
      const address = pick(addressAttributes, updatedAddress)
      res.status(200).json({address})
    })
    .catch(error => res.status(400).json({error}))
