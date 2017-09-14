import React from 'react'
import { connect } from 'react-redux'
import { Button, Image, Header } from 'semantic-ui-react'

import ShareMenu from 'components/SocialMenu'
import ProfileChat from 'components/Chat'

import GridLayout from 'layouts/Grid'

import { switchToProfileAdmin } from 'actions/profile'

const Avatar = ({ image }) =>
  <div className='ui image shop--image avatar-image'>
    <Image src={image || '/images/placeholder.png'} />
  </div>

const UserView = ({
  profile,
  user,
  switchToProfileAdmin,
  children,
}) =>
  <GridLayout
    Image={<Avatar image={profile.image} />}
    Canopy={children}
    ChatBox={<ProfileChat thread={profile} threadType='profile' />}
    Header={<Header as='h1'>{profile.username}</Header>}
    SubHeader={!!profile.bio && <Header as='h4'>{profile.bio}</Header>}
    Gutter={!!profile.website && <Header as='a'>{profile.website}</Header>}
    GutterRight={
      user.id === profile.userId ?
        <Button basic onClick={switchToProfileAdmin}>Edit Profile</Button>
        : <ShareMenu url={`https://amafur.com/user/${user.username}`} itemId={profile.id} />
    } />

const mapStateToProps = ({ user, profile }) =>
({
  user,
  profile
})

const mapDispatchToProps = dispatch =>
({
  switchToProfileAdmin: () => dispatch(switchToProfileAdmin())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView)
