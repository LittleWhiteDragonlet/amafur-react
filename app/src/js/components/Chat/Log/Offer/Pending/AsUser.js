import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Card, Image } from 'semantic-ui-react'

const UserView = ({ offer }) =>
  <Card>
    <Card.Content>
      <Image floated='left' size='mini' src={offer.user && (offer.user.image || '/images/placeholder.png')} />
      { offer.user && <Card.Header as={NavLink} to={`/user/${offer.user.username}`}>
        { offer.user.username }
      </Card.Header> }
      <Card.Meta>
        { moment(offer.createdAt).fromNow() }
      </Card.Meta>
      <Card.Description style={{ textAlign: 'center' }}>
        Offer for <strong>{offer.offer && offer.offer.itemName}</strong> at <strong>${offer.offer && offer.offer.price}</strong>
      </Card.Description>
    </Card.Content>
  </Card>

export default UserView
