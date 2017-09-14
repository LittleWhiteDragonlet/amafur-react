import React from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'

import { Button, Grid, Segment, Image, Label, Dimmer, Loader } from 'semantic-ui-react'
import CreateProductForm from './form'

import { createProduct, openCreateProductCropper, closeCreateProductCropper, uploadProductImage, onUploadProductImageFailure } from 'actions/items'

import Dropzone from 'components/Dropzone'
import ImageCropper from 'components/ImageCropper'

const tagsArray = tags => tags.split(' ')

const Avatar = ({ item, openCropper, onUploadProductImageFailure }) =>
  <Dropzone className='ui image editable avatar-image' onDropAccepted={openCropper} onDropRejected={onUploadProductImageFailure}>
    {item.imageLoading && <Dimmer active><Loader /></Dimmer>}
    <Image src={item.image || '/images/itemholder.png'} />
    {item.imageError && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

const CreateProduct = ({
  user,
  shop,
  item,
  createProduct,
  openCreateProductCropper,
  closeCreateProductCropper,
  uploadProductImage,
  onUploadProductImageFailure
}) =>
  !user.isAuthenticated ?
    <Redirect to='/login' />
  : (item.isCreated || user.id !== shop.userId) ?
     <Redirect to={`/shop/${shop.slug}`} />
  :
    <Grid celled='internally' className='item-container'>
      <Grid.Column width={6} stretched>
        <Segment basic>
          <Segment>
            {item.isCropperOpen ?
              <ImageCropper isOpen={item.isCropperOpen} image={item.imagePreview} uploadImage={img => uploadProductImage(img, user)} closeCropper={closeCreateProductCropper} />
              :
              <Avatar item={item} openCropper={img => openCreateProductCropper(img[0])} onUploadProductImageFailure={onUploadProductImageFailure} />
            }
          </Segment>
        </Segment>
      </Grid.Column>
      <Grid.Column width={10} stretched>
        <CreateProductForm onSubmit={values => createProduct(({ ...values, tags: tagsArray(values.tags), image: item.image }), shop.id, user)} />
        <Button basic color='red' as={NavLink} to={`/shop/${shop.slug}`}>Cancel</Button>
      </Grid.Column>
    </Grid>

const mapStateToProps = ({ user, shops, items }) =>
({
  user,
  shop: shops.current,
  item: items.new
})

const mapDispatchToProps = dispatch =>
({
  createProduct: (item, shopId, user) => dispatch(createProduct(item, shopId, user)),
  uploadProductImage: (img, user) => dispatch(uploadProductImage(img, user)),
  onUploadProductImageFailure: () => dispatch(onUploadProductImageFailure()),
  openCreateProductCropper: img => dispatch(openCreateProductCropper(img)),
  closeCreateProductCropper: () => dispatch(closeCreateProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProduct)
