import React from 'react'
import Card from 'elements/Card'

const HomeCard = ({ href, title, image }) =>
  <Card as='a' href={href} className='card home-card'>
    <Card.Header>
      <Card.Title>{title}</Card.Title>
    </Card.Header>
    <Card.Image src={image} />
  </Card>

export default HomeCard
