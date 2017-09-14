import React from 'react'
import { connect } from 'react-redux'
import { Button, Image, Header, Label, Dimmer, Loader } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import ProfileChat from 'components/Chat'
import Dropzone from 'components/Dropzone'

import EditorField from 'elements/Input/EditorField'

import ImageCropper from 'components/ImageCropper'

import { editProfile, switchToProfileUser, openProfileCropper, closeProfileCropper, uploadProfileImage, onUploadProfileImageFailure, editProfileField } from 'actions/profile'
import GridLayout from 'layouts/Grid'

const Avatar = ({ user, profile, openProfileCropper, onUploadProfileImageFailure }) =>
  <Dropzone className='ui image editable avatar-image' onDropAccepted={openProfileCropper} onDropRejected={onUploadProfileImageFailure}>
    {profile.imageLoading && <Dimmer active><Loader /></Dimmer>}
    <Image src={user.image || profile.image || '/images/placeholder.png'} />
    {profile.imageError && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

const NameField = ({ isEditing, user, editProfile, editProfileField }) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Name'
    name='username'
    onClick={() => editProfileField('username')} onClickOutside={() => editProfileField(null)}
    onSubmit={username => editProfile({ ...user, username }, user)}>
    <Header as='h1'>{user.username}</Header>
  </EditorField>

const BioField = ({ isEditing, user, editProfile, editProfileField }) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Bio' name='bio'
    onClick={() => editProfileField('bio')} onClickOutside={() => editProfileField(null)}
    onSubmit={bio => editProfile({ ...user, bio }, user)}>
    <Header as='h4'>{user.bio || 'Add a bio'}</Header>
  </EditorField>

const WebsiteField = ({ isEditing, user, editProfile, editProfileField }) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Website' name='website'
    onClick={() => editProfileField('website')} onClickOutside={() => editProfileField(null)}
    onSubmit={website => editProfile({ ...user, website }, user)}>
    <Header as='h4'>{user.website || 'Website'}</Header>
  </EditorField>

const AdminView = ({
  editProfile,
  editProfileField,
  openProfileCropper,
  closeProfileCropper,
  uploadProfileImage,
  onUploadProfileImageFailure,
  switchToProfileUser,
  profile,
  user,
  children,
}) =>
    <GridLayout
      Image={profile.isCropperOpen ?
        <ImageCropper isOpen={profile.isCropperOpen} image={profile.imagePreview} uploadImage={img => uploadProfileImage(img, user)} closeCropper={closeProfileCropper} />
        :
        <Avatar profile={profile} user={user} openProfileCropper={img => openProfileCropper(img[0])} onUploadProfileImageFailure={onUploadProfileImageFailure} />
      }
      Canopy={children}
      ChatBox={<ProfileChat thread={profile} threadType='profile' />}
      Header={<NameField isEditing={profile.focused === 'username'} user={user} editProfile={editProfile} editProfileField={editProfileField} />}
      SubHeader={<BioField isEditing={profile.focused === 'bio'} user={user} editProfile={editProfile} editProfileField={editProfileField} />}
      Gutter={<WebsiteField isEditing={profile.focused === 'website'} user={user} editProfile={editProfile} editProfileField={editProfileField} />}
      GutterRight={<Button basic onClick={switchToProfileUser}>Done</Button>} />


const ConnectedAdminView = reduxForm({
  form: 'editProfile',
  // validate
})(AdminView)

const mapStateToProps = ({ user, profile }) =>
({
  user,
  profile,
  initialValues: user
})

const mapDispatchToProps = dispatch =>
({
  editProfile: (profile, user) => dispatch(editProfile(profile, user)),
  openProfileCropper: img => dispatch(openProfileCropper(img)),
  closeProfileCropper: () => dispatch(closeProfileCropper()),
  uploadProfileImage: (img, user) => dispatch(uploadProfileImage(img, user)),
  onUploadProfileImageFailure: () => dispatch(onUploadProfileImageFailure()),
  switchToProfileUser: () => dispatch(switchToProfileUser()),
  editProfileField: field => dispatch(editProfileField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
