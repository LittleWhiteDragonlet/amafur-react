const models = requireDb
const { Item, Shop } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const itemParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

const validate = req =>
  Shop.findOne({
    where: { id: req.params.shopId, userId: req.user.id }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : shop
  )

module.exports = (req, res) =>
  validate(req)
    .then(shop => {
      const updatedItem = {
        layout: req.body.layout
      }
      return Item.update(updatedItem, { where: { id: req.params.id, shopId: req.params.shopId, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedItem => {
      const item = pick(itemParams, savedItem[1])
      res.status(200).json({item})
    })
    .catch(error => res.status(400).json({error}))
