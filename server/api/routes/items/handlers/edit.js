const models = requireDb
const { Item, Shop } = models

const shortId = require('shortid')

const { merge, pick } = require('ramda')

const updateItemParams = ['name', 'isPublic', 'description', 'layout', 'category', 'subCategory', 'price', 'image']
const itemParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

const getValidSlug = (slug, shopId, itemId) =>
  new Promise(resolve =>
    Item.findOne({
      where: { slug, shopId, id: { $ne: itemId } }
    })
    .then(item =>
      item ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`), shopId, itemId)
        : resolve(slug)
    )
  )

const getValidParams = (itemId, shopId, userId, slug) =>
  Shop.findOne({
    where: { id: shopId, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : getValidSlug(slug, shopId, itemId)
  )

const validate = req => {

  const { shopId, id } = req.params

  const slug =
    req.body.item.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidParams(id, shopId, req.user.id, slug)
}

module.exports = (req, res) =>
  validate(req)
    .then(slug => {
      const updatedItem = merge({
        slug
      }, pick(updateItemParams, req.body.item))
      return Item.update(updatedItem, { where: { id: req.params.id, shopId: req.params.shopId, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedItem => {
      const item = pick(itemParams, savedItem[1])
      res.status(200).json({item})
    })
    .catch(error => res.status(400).json({error}))
