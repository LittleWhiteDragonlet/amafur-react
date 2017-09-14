import React from 'react'
import { generateIcon } from 'utils/helpers'

const Card = ({ as, children, ...props }) =>
  React.createElement(as || 'div', { className: 'card', ...props }, children)

Card.Image = ({ src }) =>
  <div className='card-image'>
    <figure className='image is-square'>
      <img src={src} />
    </figure>
  </div>

Card.Image.displayName = 'Card.Image'

Card.Header = ({ children }) =>
  <div className='card-header'>
    {children}
  </div>

Card.Header.displayName = 'Card.Header'

Card.Title = ({ children }) =>
  <div className='card-header-title'>
    {children}
  </div>

Card.Title.displayName = 'Card.Title'

Card.Icon = ({ icon }) =>
  <div className='card-header-icon'>
    <i className={generateIcon(icon)}></i>
  </div>

Card.Icon.displayName = 'Card.Icon'

Card.Content = ({ children, ...props }) =>
  <div {...props}>
    {children}
  </div>

Card.Content.displayName = 'Card.Content'

Card.Meta = ({ image, title, subtitle }) =>
  <div className='media'>
    {image && <div className='media-left'>
      <figure className='image is-48x48'>
        <img src={image} alt='Image' />
      </figure>
    </div>}
    <div className='media-content'>
      {title && <p className='title is-4'>{title}</p>}
      {subtitle && <p className='subtitle is-6'>{subtitle}</p>}
    </div>
  </div>

Card.Meta.displayName = 'Card.Meta'

Card.Description = ({ date, children }) =>
  <div className='content'>
    <strong>{children}</strong>
    <br />
    {date && <small className='is-small'>{date}</small>}
  </div>

Card.Description.displayName = 'Card.Description'

export default Card
