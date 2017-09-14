import React from 'react'

const Box = ({ as, children, ...props }) =>
  React.createElement(as || 'div', { className: 'box', ...props }, children)

Box.Image = ({ src }) =>
  <div className='media-left'>
    <figure className='image is-64x64'>
      <img src={src} alt='Image' />
    </figure>
  </div>

Box.Image.displayName = 'Box.Image'

Box.Header = ({ children }) =>
  <div className='media-content'>
    <div className='content'>
      {children}
    </div>
  </div>

Box.Header.displayName = 'Box.Header'

Box.Title = ({ children }) =>
  <strong>{children}</strong>

Box.Title.displayName = 'Box.Title'

Box.Subtitle = ({ children }) =>
  <small>{children}</small>

Box.Subtitle.displayName = 'Box.Subtitle'

Box.Content = ({ children }) =>
  <div>{children}</div>

Box.Content.displayName = 'Box.Content'

Box.Nav = () =>
  <nav className='level is-mobile'>
    <div className='level-left'>
      <a className='level-item'>
        <span className='icon is-small'><i className='fa fa-reply'></i></span>
      </a>
      <a className='level-item'>
        <span className='icon is-small'><i className='fa fa-retweet'></i></span>
      </a>
      <a className='level-item'>
        <span className='icon is-small'><i className='fa fa-heart'></i></span>
      </a>
    </div>
  </nav>

Box.Nav.displayName = 'Box.Nav'

export default Box
