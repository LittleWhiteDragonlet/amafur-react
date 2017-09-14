import React from 'react'
import { Card, Grid, Segment, Header, Image } from 'semantic-ui-react'
import { pipe, prop, path, length } from 'ramda'

import ProductCartMenu from 'components/Product/CartMenu'
import ProductGallerySegment from 'components/Product/Segment/GallerySegment'

const getImage = prop('image')
const getName = prop('name')
const getDesc = prop('description')
const getPrice = prop('price')
const itemGallery = prop('gallery')

const itemHasGallery = pipe(itemGallery, length, Boolean)

const getBackgroundRGB = path([ 'themes', 'background' ])
const getFontRGB = path([ 'themes', 'font' ])

const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(255,255,255,1)'
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const UserView = ({ item }) =>
  <div className='ui segment item-container'>
    <Grid celled='internally' style={{ background: getBackground(item) }}>
      <Grid.Column width={8} stretched>
        <Segment basic style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ProductGallerySegment>
            <Image src={item.image || '/images/itemholder.png'} />
          </ProductGallerySegment>
          <Card.Group itemsPerRow={4}>
            { itemHasGallery(item) && itemGallery(item).map((item, i) =>
              <Card key={`gallery-${i}`} className='gallery-image'>
                <Image src={getImage(item) || '/images/itemholder.png'} />
              </Card>
            )}
          </Card.Group>
        </Segment>
      </Grid.Column>
      <Grid.Column width={8} stretched>
        <ProductGallerySegment>
          <Header as='h1' style={{ color: getFont(item) }}>{getName(item)}</Header>
        </ProductGallerySegment>
        <ProductGallerySegment>
          <Header as='h4' style={{ color: getFont(item) }}>${getPrice(item)}</Header>
        </ProductGallerySegment>
        {getDesc(item) && <ProductGallerySegment>
          <Header as='h4' style={{ color: getFont(item) }}>{getDesc(item) || 'No description'}</Header>
        </ProductGallerySegment>}
      </Grid.Column>
    </Grid>
    <ProductCartMenu />
  </div>

export default UserView
