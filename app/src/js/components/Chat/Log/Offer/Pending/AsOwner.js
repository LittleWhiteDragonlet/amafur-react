import React from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Button, Card, Image } from 'semantic-ui-react'

import { acceptOffer, rejectOffer } from 'actions/offers'

const AdminView = ({ offer, user, acceptOffer, rejectOffer }) =>
  <Card>
    <Card.Content>
      <Image floated='left' size='mini' src={offer.user && (offer.user.image || '/images/placeholder.png')} />
      { offer.user && <Card.Header as={NavLink} to={`/user/${offer.user.username}`}>
        { offer.user.username }
      </Card.Header> }
      <Card.Meta>
        { moment(offer.createdAt).fromNow() }
      </Card.Meta>
      <Card.Description>
        Offer for <strong>{offer.offer && offer.offer.itemName}</strong> at <strong>${offer.offer && offer.offer.price}</strong>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className='ui two buttons'>
        <Button basic color='green' onClick={() => acceptOffer(offer, user)}>Accept</Button>
        <Button basic color='red' onClick={() => rejectOffer(offer, user)}>Reject</Button>
      </div>
    </Card.Content>
  </Card>

const mapStateToProps = ({ user }) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  acceptOffer: (offer, user) => dispatch(acceptOffer(offer, user)),
  rejectOffer: (offer, user) => dispatch(rejectOffer(offer, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView)
