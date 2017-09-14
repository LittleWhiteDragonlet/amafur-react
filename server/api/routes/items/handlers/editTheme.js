const models = requireDb
const { Item, Shop } = models

const shortId = require('shortid')

const { assoc, path, pick } = require('ramda')

const itemParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

const validate = req =>
  Item.findOne({
    where: { id: req.params.id, userId: req.user.id }
  })
  .then(item =>
    !item ? Promise.reject('Invalid permission')
    : item
  )

module.exports = (req, res) =>
  validate(req)
    .then(item => {
      const reqRGB = path(['body', 'color', 'rgb'], req)
      const updateTheme = assoc(req.body.theme, reqRGB)
      const updatedItem = {
        themes: updateTheme(item.themes)
      }
      return Item.update(updatedItem, { where: { id: req.params.id, shopId: req.params.shopId, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedItem => {
      const item = pick(itemParams, savedItem[1])
      res.status(200).json({item})
    })
    .catch(error => res.status(400).json({error}))
