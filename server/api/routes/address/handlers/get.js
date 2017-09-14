const models = requireDb
const { Address } = models

const addressAttributes = ['id', 'name', 'line1', 'line2', 'city', 'region', 'country', 'zip']

const validate = req =>
  Address.findOrCreate({
    where: { userId: req.user.id },
    defaults: { name: req.user.name },
    attributes: addressAttributes
  })
  .then(address =>
      !address ?
          Promise.reject('invalid address')
          : address.get({plain: true})
  )

module.exports = (req, res) =>
  validate(req)
    .then(address => res.status(200).json({address}))
    .catch(error => res.status(400).json({error}))
