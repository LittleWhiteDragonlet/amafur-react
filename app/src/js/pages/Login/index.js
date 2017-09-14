import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Message } from 'semantic-ui-react'

import { onLoginSubmit, resetLogin } from 'actions/login'

import LoginForm from './form'
import RouterButton from 'elements/Button/RouterButton'

class Login extends Component {
  componentWillMount() {
    const { resetLogin } = this.props
    resetLogin()
  }
  render() {
    const { user, onLoginSubmit } = this.props
    if (user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card>
        <Card.Content>
          <Card.Header>Login</Card.Header>
          <Card.Description>
            <LoginForm onSubmit={onLoginSubmit} />
            {!!user.error && <Message error header='Login failed!' content={user.error} />}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RouterButton to='/signup' prefix='Need an account?' label='Sign up' />
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({ user }) =>
({
  user,
})

const mapDispatchToProps = dispatch =>
({
  onLoginSubmit: user => dispatch(onLoginSubmit(user)),
  resetLogin: () => dispatch(resetLogin()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
