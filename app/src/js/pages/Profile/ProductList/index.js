import React, { Component } from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'

import { Card } from 'semantic-ui-react'
import ProductList from './list'
import RouterButton from 'elements/Button/RouterButton'

import { fetchProducts, refreshProducts } from 'actions/items'

const getId = path([ 'id' ])

class Products extends Component {
  componentWillMount() {
    const { user, shop, items, refreshProducts, fetchProducts } = this.props
    refreshProducts()
    if (getId(shop) && items.fetchable) {
      fetchProducts(shop.id, user)
    }
  }
  componentDidMount() {
    const { user, shop, items, refreshProducts, fetchProducts } = this.props
    refreshProducts()
    if (getId(shop) && items.fetchable) {
      fetchProducts(shop.id, user)
    }
  }
  componentWillUpdate(nextProps) {
    const { user, shop, items, fetchProducts } = nextProps
    if (getId(shop) && items.fetchable) {
      fetchProducts(getId(shop), user)
    }
  }
  render() {
    const { items, shop, user } = this.props
    return (
      <Card className='items'>
        <Card.Content>
          <Card.Header>Products</Card.Header>
        </Card.Content>
        <Card.Content>
            <ProductList
              items={items.list}
            />
        </Card.Content>
        {
          shop.userId === user.id &&
          <Card.Content extra>
            <RouterButton to={`/shop/${shop.slug}/items/new`} label='new item' />
          </Card.Content>
        }
      </Card>
    )
  }
}

const mapStateToProps = ({ items, user, shops }) =>
({
  items,
  user,
  shop: shops.current
})

const mapDispatchToProps = dispatch =>
({
  fetchProducts: (shopId, user) => dispatch(fetchProducts(shopId, user)),
  refreshProducts: () => dispatch(refreshProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
