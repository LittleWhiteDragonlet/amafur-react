const models = requireDb
const { User } = models

const accountAttributes = ['id', 'name', 'username', 'image', 'bio', 'website'] //TODO: accountAttributes (placeholder = profileAttributes)

const validate = req =>
  User.findOne({
    where: { id: req.user.id },
    attributes: accountAttributes
  })
  .then(user =>
      !user ?
          Promise.reject('invalid user')
          : user
  )

module.exports = (req, res) =>
  validate(req)
    .then(account => res.status(200).json({account}))
    .catch(error => res.status(400).json({error}))
