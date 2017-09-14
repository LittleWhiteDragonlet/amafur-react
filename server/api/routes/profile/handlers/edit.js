const models = requireDb
const { User } = models

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const profileAttributes = ['id', 'name', 'username', 'image', 'bio', 'website']

const validate = req =>
  User.findOne({
      where: { username: req.body.profile.username },
      plain: true
  })
  .then(user =>
      user && user.id !== req.user.id ?
          Promise.reject('invalid user')
          : req.body.profile
  )

const validateUsername = (req, username, id) => {
  if (!validProfile(req)) return Promise.reject('missing fields')

  return User.findOne({
      where: { username, id: { $ne: id } }
  })
  .then(user =>
      user ?
          Promise.reject('username taken')
          : username
  )
}

module.exports = (req, res) =>
  validate(req)
    .then(validatedUser => validateUsername(req, validatedUser.username, validatedUser.id))
    .then(validatedUsername => {
      const updatedUser = merge({
        username: validatedUsername || req.body.profile.username,
      }, pick(['name', 'dob', 'bio', 'website'], req.body.profile))
      return User.update(updatedUser, { where: { id: req.user.id }, returning: true, plain: true })
    })
    .then(user => {
      const profile = pick(profileAttributes, user[1])
      res.status(200).json({profile})
    })
    .catch(error => res.status(400).json({error}))
