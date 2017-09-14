const models = requireDb
const { Item, Shop, Thread } = models

const shortId = require('shortid')

const { merge, pick } = require('ramda')

const itemParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

const defaultTheme = {
  rgb: {
    r: 255,
    g: 255,
    b: 255,
    a: 1
  }
}

const defaultFontTheme = {
  rgb: {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }
}

const defaultThemes = {
  primary: defaultTheme,
  secondary: defaultTheme,
  background: defaultTheme,
  segment: defaultTheme,
  font: defaultFontTheme,
}

const getValidSlug = (slug, shopId, thread) =>
  new Promise(resolve =>
    Item.findOne({
      where: { slug, shopId }
    })
    .then(item =>
      item ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`), shopId)
        : resolve({slug, thread})
    )
  )

const createThread = (shopId, username, slug) =>
  Thread.create({ title: slug, owner: username }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : getValidSlug(slug, shopId, thread)
    )

const getValidParams = (shopId, userId, slug) =>
  Shop.findOne({
    where: { id: shopId, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : createThread(shopId, userId, slug)
  )

const validate = req => {
  const slug =
    req.body.item.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidParams(req.params.shopId, req.user.id, slug)
}

module.exports = (req, res) =>
  validate(req)
    .then(({slug, thread}) => {
      const newItem = merge({
        slug,
        themes: defaultThemes,
        shopId: req.params.shopId,
        threadId: thread.id,
        userId: req.user.id
      }, pick(itemParams, req.body.item))
      return Item.create(newItem, { plain: true })
    })
    .then(item => res.status(200).json({item}))
    .catch(error => res.status(400).json({error})) //TODO: return custom error handling
