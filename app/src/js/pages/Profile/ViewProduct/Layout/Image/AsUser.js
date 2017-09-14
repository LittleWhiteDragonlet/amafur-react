import React from 'react'
import { Segment, Header, Image } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import ProductCartMenu from 'components/Product/CartMenu'
import ProductImageSegment from 'components/Product/Segment/ImageSegment'

const getBackgroundRGB = path([ 'themes', 'background' ])
const getFontRGB = path([ 'themes', 'font' ])

const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(255,255,255,1)'
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const UserView = ({ item }) =>
  <div className='ui segment item-container' style={{ background: getBackground(item) }}>
    <Image src={item.image || '/images/itemholder.png'} className='item-image-underlay' />
    <Segment basic style={{ display: 'flex', width: '100%', pointerEvents: 'none', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <ProductImageSegment>
        <Header as='h1' style={{ color: getFont(item) }}>{item.name}</Header>
      </ProductImageSegment>
      <ProductImageSegment>
        <Header as='h4' style={{ color: getFont(item) }}>${item.price}</Header>
      </ProductImageSegment>
      {!!item.description && <ProductImageSegment>
        <Header as='h4' style={{ color: getFont(item) }}>{item.description || 'No description'}</Header>
      </ProductImageSegment>}
    </Segment>
    <ProductCartMenu />
  </div>

export default UserView
