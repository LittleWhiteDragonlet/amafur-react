import React from 'react'
import { Grid, Segment, Header, Image } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import ProductCartMenu from 'components/Product/CartMenu'
import ProductGridSegment from 'components/Product/Segment/GridSegment'

const getBackgroundRGB = path([ 'themes', 'background' ])
const getFontRGB = path([ 'themes', 'font' ])

const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(255,255,255,1)'
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const UserView = ({ item }) =>
  <div className='ui segment item-container' style={{ background: getBackground(item) }}>
    <Grid celled='internally'>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          <Segment basic style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ProductGridSegment>
              <Image src={item.image || '/images/itemholder.png'} />
            </ProductGridSegment>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          <ProductGridSegment>
            <Header as='h1' style={{ color: getFont(item) }}>{item.name}</Header>
          </ProductGridSegment>
          <ProductGridSegment>
            <Header as='h4' style={{ color: getFont(item) }}>${item.price}</Header>
          </ProductGridSegment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          {!!item.description && <ProductGridSegment>
            <Header as='h4' style={{ color: getFont(item) }}>{item.description || 'No description'}</Header>
          </ProductGridSegment>}
        </Grid.Column>
        <Grid.Column width={8} stretched>
          {/*TODO*/}
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <ProductCartMenu />
  </div>

export default UserView
