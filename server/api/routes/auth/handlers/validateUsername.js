const models = requireDb
const { User } = models

module.exports = (req, res) =>
  User
    .findOne({ where: { username: req.body.username } })
    .then(user => res.status(200).json({ usernameRegistered: Boolean(user) }))
    .catch(err => res.status(500).json({ error: err.message }))
