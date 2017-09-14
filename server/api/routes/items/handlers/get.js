const models = requireDb
const { Item, Shop, User, Thread } = models

const itemParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

module.exports = (req, res) => {
  Item.findOne({
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'image']
      },
      {
        model: Thread,
        attributes: ['id', 'name', 'owner']
      }
    ],
    where: { slug: req.params.id },
    attributes: itemParams
  })
  )
  .then(item =>
    !item ? Promise.reject('Invalid item id')
    : item
  )
  .then(item => res.status(200).json({item}))
  .catch(error => res.status(400).json({error}))
}
