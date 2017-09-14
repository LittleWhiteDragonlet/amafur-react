const models = requireDb
const { User } = models
const validatePhone = require('./helpers/validPhone')

const { pipe, prop, head } = require('ramda')

const createError = error => {
  const errorMsg =
    pipe(
      prop('errors'),
      head,
      prop('message')
    )(error)

  if(errorMsg) {
    if(errorMsg === 'phone must be unique') {
      return 'Phone number already registered.'
    }
    return 'Something went wrong.'
  }
  return 'Something went wrong.'
}

module.exports = (req, res) =>
  validatePhone(req.body.phone)
    .then(phone =>
      User
        .findOne({ where: { phone } })
        .then(user => res.status(200).json({ phoneRegistered: Boolean(user) }))
        .catch(err => res.status(500).json({ error: createError(err) }))
    )
