import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { push } from 'react-router-redux'
import { path } from 'ramda'

import AdminGridView from './Layout/Grid/AsOwner'
import UserGridView from './Layout/Grid/AsUser'
import AdminImageView from './Layout/Image/AsOwner'
import UserImageView from './Layout/Image/AsUser'
import AdminGalleryView from './Layout/Gallery/AsOwner'
import UserGalleryView from './Layout/Gallery/AsUser'

import { fetchSingleProduct } from 'actions/items'

const getName = path([ 'name' ])
const getSlug = path([ 'slug' ])
const getProductId = path([ 'itemId' ])
const getShopSlug = path([ 'shop', 'slug' ])

class ViewProduct extends Component {
  componentWillMount() {
    const { match: { params }, user, item, fetchSingleProduct, isFetchingProduct } = this.props
    if (getSlug(item) !== getProductId(params) && isFetchingProduct !== getProductId(params)) {
      fetchSingleProduct(params.itemId, params.shopId, user)
    }
  }
  componentWillUpdate(nextProps) {
    const { user, item, fetchSingleProduct, redirectToNewProduct, isFetchingProduct } = this.props
    const { match: { params } } = nextProps
    if (getSlug(item) !== getProductId(params) && isFetchingProduct !== getProductId(params)) {
      fetchSingleProduct(params.itemId, params.shopId, user)
    }
    const nextProduct = nextProps.item
    if (getName(nextProduct) !== getName(item)) {
      redirectToNewProduct(getShopSlug(nextProduct), getSlug(nextProduct))
    }
  }
  render() {
    const { match: { params }, item, user } = this.props
    if (!item) {
      return <Redirect to={`/shop/${params.shopId}`} />
    }
    if (item.isAdmin) {
      const adminViewProps = { item, user }
      switch (item.layout) {
      case 'image':
        return <AdminImageView {...adminViewProps} />
      case 'gallery':
        return <AdminGalleryView {...adminViewProps} />
      case 'grid':
      default:
        return <AdminGridView {...adminViewProps} />
      }
    }
    const userViewProps = { item, user }
    switch (item.layout) {
    case 'image':
      return <UserImageView {...userViewProps} />
    case 'gallery':
      return <UserGalleryView {...userViewProps} />
    case 'grid':
    default:
      return <UserGridView {...userViewProps} />
    }
  }
}

const mapStateToProps = ({ items, shops, orders, user }) =>
({
  item: items.current,
  isFetchingProduct: items.isFetching,
  shop: shops.current,
  user,
  orders
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleProduct: (itemId, shopId, user) => dispatch(fetchSingleProduct(itemId, shopId, user)),
  redirectToNewProduct: (shopSlug, itemSlug) => dispatch(push(`/shop/${shopSlug}/item/${itemSlug}`))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProduct)
