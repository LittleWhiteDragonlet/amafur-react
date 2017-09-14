import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Message } from 'semantic-ui-react'

import { onSignupSubmit, resetSignup } from 'actions/signup'

import SignupForm from './form'
import RouterButton from 'elements/Button/RouterButton'

class Signup extends Component {
  componentWillMount() {
    const { resetSignup } = this.props
    resetSignup()
  }
  render() {
    const { user, onSignupSubmit } = this.props
    if (user.isAuthenticated || user.isRegistered) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <Card>
        <Card.Content>
          <Card.Header>Signup</Card.Header>
          <Card.Description>
            <SignupForm onSubmit={onSignupSubmit} error={user.error} />
            {!!user.error && <Message error header='Signup failed' content={user.error} />}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RouterButton to='/login' prefix='Have an account?' label='Login' />
        </Card.Content>
      </Card>
    )
  }
}


const mapStateToProps = ({ user }) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  onSignupSubmit: user => dispatch(onSignupSubmit(user)),
  resetSignup: () => dispatch(resetSignup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
