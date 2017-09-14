import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchProfile, refreshProfileEditing } from 'actions/profile'

const isProfileAdmin = ({ isAdmin, username }, user) =>
  isAdmin && username === user.username

const wrongActiveProfile = ({ username }, params, isFetching) =>
  username !== params.username && isFetching !== params.username

class ViewProfile extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchProfile(params.username, user)
    this.props.refreshProfileEditing()
  }
  componentWillUpdate(nextProps) {
    const { profile, match: { params }, history, user, isFetching, fetchProfile, refreshProfileEditing } = this.props
    if (nextProps.profile.newUsername) {
      history.replace(`/user/${nextProps.profile.username}`)
      refreshProfileEditing()
    }
    if (wrongActiveProfile(profile, params, isFetching)) {
      fetchProfile(params.username, user)
    }
  }
  render() {
    const { user, profile, children } = this.props
    if (!profile) {
      return <Redirect to='/' />
    }
    const Hoc = isProfileAdmin(profile, user) ? AdminView : UserView
    return (
      <Hoc {...this.props} >
        {children}
      </Hoc>
    )
  }
}

const mapStateToProps = ({ user, profile }) =>
({
  user,
  profile,
  isFetching: profile.isFetching
})

const mapDispatchToProps = dispatch =>
({
  fetchProfile: (username, user) => dispatch(fetchProfile(username, user)),
  refreshProfileEditing: () => dispatch(refreshProfileEditing())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile)
