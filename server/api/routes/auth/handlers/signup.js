const models = requireDb
const twilio = apiRequire('service/twilio')
const { User, Thread } = models
const jwt = require('jsonwebtoken')

const { allPass, not, merge, path, pick, pipe, reduceWhile } = require('ramda')

const ipFields = [
  ['ip'],
  ['headers', 'x-forwarded-for'],
  ['connection', 'remoteAddress'],
  ['socket', 'remoteAddress'],
  ['connection', 'socket', 'remoteAddress']
]

const getIp = (req) => reduceWhile(not, (acc, p) => path(p, req), '', ipFields) || ''

const createThread = req =>
  Thread.create({ title: req.body.user.username }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : { thread, validatedUser: req.body.user }
    )

const validatePhone = req =>
  User.findOne({
      where: { phone: req.body.user.phone }
  })
  .then(user =>
      user ? Promise.reject('phone registered')
      : req
  )

const validateUsername = req =>
  User.findOne({
    where: { username: req.body.user.username }
  })
  .then(user =>
      user ? Promise.reject('username taken')
      : req
  )

const validate = req =>
  validatePhone(req)
  .then(validateUsername)
  .then(createThread)

module.exports = (req, res) => {
    validate(req)
      .then(({ thread, validatedUser }) => {
        const user = merge({
          password: req.body.user.password,
          ip: getIp(req),
          verified: false,
          threadId: thread.id,
          code: Math.floor(1000 + Math.random() * 9000)
        }, pick(['phone', 'username'], validatedUser))
        return User.create(user, { plain: true })
      })
      .then(user => {
        twilio.messages.create({
          body: `Your code is: ${user.code}`,
          to: user.phone,  // Text this number
          from: process.env.TWILIO_NUMBER // From a valid Twilio number
        })
        const resUser = pick(['id', 'email', 'name', 'username'], user) //TODO: remove sending of userID, change userId checks to username (frontend)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        return res.json({ user: resUser, token })
      })
      .catch(error => res.status(400).json({ error }))
}
