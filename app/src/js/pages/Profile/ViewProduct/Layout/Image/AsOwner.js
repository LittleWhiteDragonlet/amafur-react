import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { pipe, path } from 'ramda'

import ProductAdminMenu from 'components/Product/AdminMenu'
import ProductSidebar from 'components/Product/Sidebar'
import ProductImageSegment from 'components/Product/Segment/ImageSegment'

import ImageCropper from 'components/ImageCropper'

import AvatarField from 'elements/Product/Field/AvatarField'
import NameField from 'elements/Product/Field/NameField'
import DescriptionField from 'elements/Product/Field/DescriptionField'
import PriceField from 'elements/Product/Field/PriceField'
import PublicField from 'elements/Product/Field/PublicField'

import {
  openEditProductCropper,
  closeEditProductCropper,
  editProduct,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
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
  openEditProductCropper,
  closeEditProductCropper,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
}) =>
  isMobile ?
    <div className='edit-item-container' style={{ background: getBackground(item) }}>
        {item.isCropperOpen ?
          <ImageCropper isOpen={item.isCropperOpen} image={item.imagePreview} uploadImage={img => uploadEditProductImage(img, item, user)} closeCropper={closeEditProductCropper} />
          :
          <AvatarField className='item-image-underlay' item={item} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
        }
      <div style={{ display: 'flex', width: '100%', pointerEvents: 'none', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <ProductImageSegment>
          <NameField isEditing={item.focused === 'name'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
        </ProductImageSegment>
        <ProductImageSegment>
          <PriceField isEditing={item.focused === 'price'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
        </ProductImageSegment>
        <ProductImageSegment>
          <DescriptionField isEditing={item.focused === 'description'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
        </ProductImageSegment>
      </div>
    </div>
  :
    <ProductSidebar>
      <div className='edit-item-container' style={{ background: getBackground(item) }}>
          {item.isCropperOpen ?
            <ImageCropper isOpen={item.isCropperOpen} image={item.imagePreview} uploadImage={img => uploadEditProductImage(img, item, user)} closeCropper={closeEditProductCropper} />
            :
            <AvatarField className='item-image-underlay' item={item} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
          }
        <div style={{ display: 'flex', width: '100%', pointerEvents: 'none', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <ProductImageSegment>
            <NameField isEditing={item.focused === 'name'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductImageSegment>
          <ProductImageSegment>
            <PriceField isEditing={item.focused === 'price'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductImageSegment>
          <ProductImageSegment>
            <DescriptionField isEditing={item.focused === 'description'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductImageSegment>
        </div>
      </div>
      <ProductAdminMenu PublicField={<PublicField item={item} user={user} editProduct={editProduct} style={{ position: 'absolute', left: '25px' }} />} />
    </ProductSidebar>

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
  editProductField: field => dispatch(editProductField(field)),
  openEditProductCropper: img => dispatch(openEditProductCropper(img)),
  closeEditProductCropper: () => dispatch(closeEditProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAdminGridView)
