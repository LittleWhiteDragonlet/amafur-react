import React from 'react'
import { connect } from 'react-redux'
import { Card, Grid, Segment } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { pipe, path } from 'ramda'

import ProductAdminMenu from 'components/Product/AdminMenu'
import ProductSidebar from 'components/Product/Sidebar'
import ProductGallerySegment from 'components/Product/Segment/GallerySegment'

import ImageCropper from 'components/ImageCropper'

import AddGalleryImageButton from 'elements/Product/Button/AddGalleryImageButton'

import AvatarField from 'elements/Product/Field/AvatarField'
import GalleryAvatarField from 'elements/Product/Field/GalleryAvatarField'
import NameField from 'elements/Product/Field/NameField'
import DescriptionField from 'elements/Product/Field/DescriptionField'
import PriceField from 'elements/Product/Field/PriceField'
import PublicField from 'elements/Product/Field/PublicField'

import {
  openEditProductCropper,
  closeEditProductCropper,
  openAddGalleryProductCropper,
  closeAddGalleryProductCropper,
  editProduct,
  addGalleryImage,
  deleteProductGalleryImage,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
  uploadGalleryProductImage,
  onUploadGalleryProductImageFailure,
  editProductField
} from 'actions/items'

import { validate } from './validators'

import isMobile from 'utils/isMobile'

const getBackgroundRGB = path([ 'themes', 'background' ])

const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(255,255,255,1)'
const getBackground = pipe(getBackgroundRGB, toRGBStyle)

const AdminGridView = ({
  user,
  item,
  editProduct,
  editProductField,
  addGalleryImage,
  deleteProductGalleryImage,
  uploadGalleryProductImage,
  onUploadGalleryProductImageFailure,
  openAddGalleryProductCropper,
  closeAddGalleryProductCropper,
  openEditProductCropper,
  closeEditProductCropper,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
}) =>
  isMobile ?
    <div className='edit-item-container' style={{ background: getBackground(item) }}>
      <Grid celled='internally'>
        <Grid.Column width={8} stretched>
          <Segment basic style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ProductGallerySegment>
              {item.isCropperOpen ?
                <ImageCropper
                  isOpen={item.isCropperOpen}
                  image={item.imagePreview}
                  uploadImage={img => uploadEditProductImage(img, item, user)}
                  closeCropper={closeEditProductCropper} />
                :
                <AvatarField
                  item={item}
                  openEditProductCropper={img => openEditProductCropper(img[0])}
                  onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
              }
              {item.isGalleryCropperOpen ?
                <ImageCropper
                  isGalleryImage={true}
                  isOpen={item.isGalleryCropperOpen}
                  image={item.imagePreview}
                  uploadImage={img => uploadGalleryProductImage(img, item.galleryActiveIndex, item, user)}
                  closeCropper={closeAddGalleryProductCropper} />
                :
                null
              }

            </ProductGallerySegment>
            <Card.Group itemsPerRow={4}>
              { !!item.gallery && item.gallery.map((image, i) =>
                <GalleryAvatarField key={`gallery-${i}`} index={i} item={item}
                  onDeleteGalleryImage={index => deleteProductGalleryImage(index, item, user)}
                  openAddGalleryProductCropper={img => openAddGalleryProductCropper(img[0], i)}
                  onUploadGalleryProductImageFailure={onUploadGalleryProductImageFailure} />)}

              { !!item.gallery && item.gallery.length < 4 ? <AddGalleryImageButton addGalleryImage={() => addGalleryImage()} /> : null}
            </Card.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          <ProductGallerySegment>
            <NameField isEditing={item.focused === 'name'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductGallerySegment>
          <ProductGallerySegment>
            <PriceField isEditing={item.focused === 'price'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductGallerySegment>
          <ProductGallerySegment>
            <DescriptionField isEditing={item.focused === 'description'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductGallerySegment>
        </Grid.Column>
      </Grid>
    </div>
  :
    <div>
      <ProductSidebar>
        <div className='edit-item-container' style={{ background: getBackground(item) }}>
          <Grid celled='internally'>
            <Grid.Column width={8} stretched>
              <Segment basic style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ProductGallerySegment>
                  {item.isCropperOpen ?
                    <ImageCropper
                      isOpen={item.isCropperOpen}
                      image={item.imagePreview}
                      uploadImage={img => uploadEditProductImage(img, item, user)}
                      closeCropper={closeEditProductCropper} />
                    :
                    <AvatarField
                      item={item}
                      openEditProductCropper={img => openEditProductCropper(img[0])}
                      onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
                  }
                  {item.isGalleryCropperOpen ?
                    <ImageCropper
                      isGalleryImage={true}
                      isOpen={item.isGalleryCropperOpen}
                      image={item.imagePreview}
                      uploadImage={img => uploadGalleryProductImage(img, item.galleryActiveIndex, item, user)}
                      closeCropper={closeAddGalleryProductCropper} />
                    :
                    null
                  }

                </ProductGallerySegment>
                <Card.Group itemsPerRow={4}>
                  { !!item.gallery && item.gallery.map((image, i) =>
                    <GalleryAvatarField key={`gallery-${i}`} index={i} item={item}
                      onDeleteGalleryImage={index => deleteProductGalleryImage(index, item, user)}
                      openAddGalleryProductCropper={img => openAddGalleryProductCropper(img[0], i)}
                      onUploadGalleryProductImageFailure={onUploadGalleryProductImageFailure} />)}

                  { !!item.gallery && item.gallery.length < 4 ? <AddGalleryImageButton addGalleryImage={() => addGalleryImage()} /> : null}
                </Card.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8} stretched>
              <ProductGallerySegment>
                <NameField isEditing={item.focused === 'name'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
              </ProductGallerySegment>
              <ProductGallerySegment>
                <PriceField isEditing={item.focused === 'price'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
              </ProductGallerySegment>
              <ProductGallerySegment>
                <DescriptionField isEditing={item.focused === 'description'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
              </ProductGallerySegment>
            </Grid.Column>
          </Grid>
        </div>
        <ProductAdminMenu PublicField={<PublicField item={item} user={user} editProduct={editProduct} style={{ position: 'absolute', left: '25px' }} />} />
      </ProductSidebar>
    </div>

const ConnectedAdminGridView = reduxForm({
  form: 'editProduct',
  validate
})(AdminGridView)

const mapStateToProps = ({ user, items }) =>
({
  user,
  item: items.current,
  initialValues: items.current
})

const mapDispatchToProps = dispatch =>
({
  editProduct: (item, user) => dispatch(editProduct(item, user)),
  uploadEditProductImage: (img, item, user) => dispatch(uploadEditProductImage(img, item, user)),
  onUploadEditProductImageFailure: () => dispatch(onUploadEditProductImageFailure()),
  uploadGalleryProductImage: (img, index, item, user) => dispatch(uploadGalleryProductImage(img, index, item, user)),
  onUploadGalleryProductImageFailure: () => dispatch(onUploadGalleryProductImageFailure()),
  editProductField: field => dispatch(editProductField(field)),
  openEditProductCropper: img => dispatch(openEditProductCropper(img)),
  closeEditProductCropper: () => dispatch(closeEditProductCropper()),
  addGalleryImage: () => dispatch(addGalleryImage()),
  deleteProductGalleryImage: (index, item, user) => dispatch(deleteProductGalleryImage(index, item, user)),
  openAddGalleryProductCropper: (img, index) => dispatch(openAddGalleryProductCropper(img, index)),
  closeAddGalleryProductCropper: () => dispatch(closeAddGalleryProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAdminGridView)
