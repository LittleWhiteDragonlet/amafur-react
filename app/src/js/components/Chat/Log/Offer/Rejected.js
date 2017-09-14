import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Card, Image, Message } from 'semantic-ui-react'

import { path } from 'ramda'

const getUserImage = path([ 'user', 'image' ])

const getUsername = path([ 'user', 'username' ])

const getTimestamp = path([ 'createdAt' ])

const getProductName = path([ 'offer', 'itemName' ])

const getOfferPrice = path([ 'offer', 'price' ])

const RejectedOffer = ({ offer }) =>
  <Card>
    <Card.Content>
      <Image floated='left' size='mini' src={getUserImage(offer) || '/images/placeholder.png'} />
      <Card.Header as={NavLink} to={`/user/${getUsername(offer)}`}>
        { getUsername(offer) }
      </Card.Header>
      <Card.Meta>
        { moment(getTimestamp(offer)).fromNow() }
      </Card.Meta>
      <Card.Description>
        <Message info>
          <Message.Header style={{ textAlign: 'center' }}>Offer rejected 😲</Message.Header>
          <p style={{ textAlign: 'center' }}>Offer for <strong>{getProductName(offer)}</strong> at <strong style={{ textDecoration: 'line-through' }}>${getOfferPrice(offer)}</strong></p>
        </Message>
      </Card.Description>
    </Card.Content>
  </Card>

export default RejectedOffer
