const models = requireDb
const { User } = models

const jwt = require('jsonwebtoken')

const { pathEq } = require('ramda')

module.exports = (req, res) =>
  User.findOne({ where: { phone: req.body.phone, verified: false }})
    .then(user =>
      !pathEq(['code'], req.body.code, user) ?
        res.status(200).send('Invalid verification code. Please try again or contact support.')
        : User.update({ verified: true }, { where: { phone: req.body.phone }, returning: true, plain: true })
    )
    .then(([ n, [ user ] ]) => !user ? Promise.reject('bad user') : user)
    .then(user => {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
      res.json({ user, token })
    })
    .catch(error => res.status(400).json({ error }))
