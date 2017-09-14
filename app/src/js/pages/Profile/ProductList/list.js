import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { length } from 'ramda'

import ProductListItem from 'elements/ListItem/ProductListItem'

const ProductsList =
({
  items
}) =>
    <Card.Group itemsPerRow={4}>
      {length(items) ? items.map((item, i) =>
        <ProductListItem key={`item-${i}`} item={item} />
      ) :
        <Card>
          <Image src='/images/itemholder.png' />
          <Card.Content>No Products!</Card.Content>
        </Card>
      }
    </Card.Group>

export default ProductsList
