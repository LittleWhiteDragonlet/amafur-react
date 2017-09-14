import React from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Segment } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { pipe, path } from 'ramda'

import ProductAdminMenu from 'components/Product/AdminMenu'
import ProductSidebar from 'components/Product/Sidebar'
import ProductGridSegment from 'components/Product/Segment/GridSegment'

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
  deleteProduct,
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
  deleteProduct,
  editProductField,
  openEditProductCropper,
  closeEditProductCropper,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
}) =>
  isMobile ?
    <div className='edit-item-container' style={{ background: getBackground(item) }}>
      <Grid celled='internally'>
        <Grid.Row columns={2}>
          <Grid.Column width={8} stretched>
            <Segment basic style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ProductGridSegment>
                {item.isCropperOpen ?
                  <ImageCropper isOpen={item.isCropperOpen} image={item.imagePreview} uploadImage={img => uploadEditProductImage(img, item, user)} closeCropper={closeEditProductCropper} />
                  :
                  <AvatarField item={item} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
                }
              </ProductGridSegment>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8} stretched>
            <ProductGridSegment>
              <NameField isEditing={item.focused === 'name'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
            </ProductGridSegment>
            <ProductGridSegment>
              <PriceField isEditing={item.focused === 'price'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
            </ProductGridSegment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={8} stretched>
            <ProductGridSegment>
              <DescriptionField isEditing={item.focused === 'description'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
            </ProductGridSegment>
          </Grid.Column>
          <Grid.Column width={8} stretched>
            <Segment>
              <Button fluid basic color='red' onClick={() => deleteProduct(item.id, item.shopId, user)} style={{ justifyContent: 'center' }}>Remove listing</Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  :
    <div>
      <ProductSidebar>
        <div className='edit-item-container' style={{ background: getBackground(item) }}>
          <Grid celled='internally'>
            <Grid.Row columns={2}>
              <Grid.Column width={8} stretched>
                <Segment basic style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ProductGridSegment>
                    {item.isCropperOpen ?
                      <ImageCropper isOpen={item.isCropperOpen} image={item.imagePreview} uploadImage={img => uploadEditProductImage(img, item, user)} closeCropper={closeEditProductCropper} />
                      :
                      <AvatarField item={item} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
                    }
                  </ProductGridSegment>
                </Segment>
              </Grid.Column>
              <Grid.Column width={8} stretched>
                <ProductGridSegment>
                  <NameField isEditing={item.focused === 'name'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
                </ProductGridSegment>
                <ProductGridSegment>
                  <PriceField isEditing={item.focused === 'price'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
                </ProductGridSegment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column width={8} stretched>
                <ProductGridSegment>
                  <DescriptionField isEditing={item.focused === 'description'} item={item} user={user} editProduct={editProduct} editProductField={editProductField} />
                </ProductGridSegment>
              </Grid.Column>
              <Grid.Column width={8} stretched>
                <Segment>
                  <Button fluid basic color='red' onClick={() => deleteProduct(item.id, item.shopId, user)} style={{ justifyContent: 'center' }}>Remove listing</Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
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
  deleteProduct: (itemId, shopId, user) => dispatch(deleteProduct(itemId, shopId, user)),
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
