import React from 'react'

const Button = ({ as, onClick, color, loading, children, ...props }) =>
  React.createElement(as || 'button', { className: `button ${loading && 'is-loading'} ${color && `is-${color}`}`, onClick, ...props }, children)

export default Button
