const models = requireDb
const { User } = models

const bcrypt = require('bcrypt')
const shortId = require('shortid')

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const accountAttributes = ['id', 'name', 'username', 'image', 'bio', 'website']

const getAccount = path(['body', 'account'])
const getOldPassword = path(['body', 'account', 'oldPassword'])
const getUsername = path(['body', 'account', 'username'])
const getEmail = path(['body', 'account', 'email'])
const getUserId = path(['user', 'id'])

const validateEmail = req =>
  User.findOne({
      where: { email: getEmail(req), id: { $ne: getUserId(req) } }
  })
  .then(user =>
      user ?
          Promise.reject('email taken')
          : getAccount(req)
  )

const validateUsername = req =>
  User.findOne({
      where: { username: getUsername(req), id: { $ne: getUserId(req) } }
  })
  .then(user =>
      user ?
          Promise.reject('username taken')
          : validateEmail(req)
  )

const validatePassword = (user, req) =>
  !user.validPassword(getOldPassword(req)) ?
    Promise.reject('invalid password')
    : validateUsername(req)

const validate = req =>
  User.findOne({
      where: { id: req.user.id },
      plain: true
  })
  .then(user =>
      !user ? Promise.reject('invalid user')
      : validatePassword(user, req)
  )

module.exports = (req, res) =>
  validate(req)
    .then(validAccount => {
      const verified = (validAccount.email === req.user.email) && req.user.verified
      const updatedPassword = validAccount.newPassword ? bcrypt.hash(validAccount.newPassword, 10) : validAccount.oldPassword
      const updatedUser = merge({
        username: validAccount.username || req.body.account.username,
        verified,
        email: validAccount.email,
        password: updatedPassword
      }, pick(['name', 'dob', 'bio', 'website'], req.body.account))
      return User.update(updatedUser, { where: { id: req.user.id }, returning: true, plain: true })
    })
    .then(user => {
      const updatedUser = user[1]
      const account = pick(accountAttributes, updatedUser)
      res.status(200).json({ account })
    })
    .catch(error => res.status(400).json({error}))
