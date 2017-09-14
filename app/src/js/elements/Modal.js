import React from 'react'

const Modal = ({ open, children }) =>
  <div className={`modal ${open && 'is-active'}`}>
    <div className='modal-background'></div>
    <div className='modal-card'>
      {children}
    </div>
  </div>

Modal.Content = ({ children }) =>
  <section className='modal-card-body'>
    {children}
  </section>

Modal.Content.displayName = 'Modal.Content'

Modal.Actions = ({ children }) =>
  <footer className='modal-card-foot'>
    {children}
  </footer>

Modal.Actions.displayName = 'Modal.Actions'

Modal.Header = ({ children, cancel }) =>
  <div className='modal-card-head'>
    <p className='modal-card-title'>{children}</p>
    <button onClick={cancel} className='delete'></button>
  </div>

Modal.Header.displayName = 'Modal.Header'

export default Modal
