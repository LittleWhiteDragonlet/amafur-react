const models = requireDb
const { User, Shop, Thread } = models
const { merge, pick } = require('ramda')

const threadAttributes = ['id', 'name', 'owner']
const profileAttributes = ['id', 'name', 'username', 'image', 'bio', 'website']
const resProfileAttributes = ['id', 'name', 'username', 'image', 'bio', 'website', 'thread']
const shopAttributes = ['id', 'name', 'description', 'isPublic', 'slug', 'image']

const getShops = user =>
  Shop.findAll({
    where: { userId: user.id },
    attributes: shopAttributes
  })
  .then(shops => merge({ shops }, pick(resProfileAttributes, user)))

const validate = req =>
  User.findOne({
    include: [
      {
        model: Thread,
        attributes: threadAttributes
      }
    ],
    where: { username: req.params.username },
    attributes: profileAttributes
  })
  .then(user =>
      !user ?
          Promise.reject('invalid username')
          : getShops(user)
  )

module.exports = (req, res) =>
  validate(req)
    .then(profile => res.status(200).json({profile}))
    .catch(error => res.status(400).json({error}))
