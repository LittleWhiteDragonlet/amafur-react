const AccountAttributes = [ 'id', 'name', 'stripeCards', 'stripeBanks', 'stripeCustomer', 'stripeAccount' ]

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    name: DataTypes.STRING,
    stripeCards: DataTypes.JSONB,
    stripeBanks: DataTypes.JSONB,
    stripeCustomer: DataTypes.JSONB,
    stripeAccount: DataTypes.JSONB,
  })

  Account.associate = ({ User }) => {
    Account.belongsTo(User)
  }

  Account.getAccountByUser = user =>
    Account.findOne({
      where: { userId: user.id },
      attributes: AccountAttributes
    })
      .then(items =>
        !items ? Promise.reject('No items')
          : items
      )

  return Account
}
