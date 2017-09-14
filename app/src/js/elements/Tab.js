import React from 'react'
import { NavLink } from 'react-router-dom'

const Tab = ({ isActive, icon, title, to }) =>
  <li className={isActive ? 'is-active' : null}>
    <NavLink to={to}>
      <span className='icon tab-icon'><i className={`fal fa-${icon}`}></i></span>
      <span className='tab-text'>{title}</span>
    </NavLink>
  </li>

export default Tab
