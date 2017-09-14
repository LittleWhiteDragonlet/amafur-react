const models = requireDb
const { Item, Shop } = models

const itemParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

module.exports = (req, res) => {
  Item.findAll({
    include: [{
      model: Shop,
      attributes: ['image', 'name', 'slug']
    }],
    where: { shopId: req.params.shopId },
    attributes: itemParams
  })
  .then(items => res.status(200).json({items}))
  .catch(error => res.status(400).json({error}))
}
