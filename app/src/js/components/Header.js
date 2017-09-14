import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

import Button from 'elements/Button'

const Header = ({ user, logout }) =>
  <header className='header'>
    <div className='header__logo'>
      <NavLink to='/'>
        <img src='/images/logo/rsteg-logo-100.png' className='header__logo-image' />
      </NavLink>
    </div>
      {user.isAuthenticated ?
        <div className='header__nav'>
          <div className='header__navitem'>
            <NavLink to='/'>
              <Button>home</Button>
            </NavLink>
          </div>
          <div className='header__navitem'>
            <NavLink to={`/user/${user.username}`}>
              <Button>your profile</Button>
            </NavLink>
          </div>
          <div className='header__navitem'>
            <Button onClick={() => logout()}>Logout</Button>
          </div>
        </div>
        :
        <div className='header__nav'>
          <div className='header__navmenu'>
            <Button as={NavLink} to='/login' color='info'>
              Login
            </Button>
            <Button as={NavLink} to='/signup' color='primary'>
              Sign up
            </Button>
          </div>
        </div>
      }
  </header>

const mapStateToProps = ({ user }) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  logout: () => dispatch({ type: 'LOGOUT' })
})

const ConnectedHeader =
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)

export default withRouter(ConnectedHeader)
