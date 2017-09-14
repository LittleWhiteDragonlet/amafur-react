import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'

class ImageCropper extends Component {
  onSave() {
    const { uploadImage, closeCropper } = this.props
    this.editor.getImageScaledToCanvas().toBlob(blob => {
      uploadImage(blob)
      closeCropper()
    })
  }
  render() {
    const { image, isOpen, closeCropper } = this.props
    if (!isOpen) {
      return null
    }
    return (
      <div className='modal is-active'>
        <div className='modal-background'></div>
        <div className='modal-content'>
          <AvatarEditor
            ref={ref => { this.editor = ref }}
            image={image.preview}
            width={300}
            height={300}
            border={25}
            color={[ 255, 255, 255, 0.6 ]}
            scale={1}
          />
          <button className='button is-primary' onClick={() => this.onSave()}>Save</button>
        </div>
        <button className='modal-close is-large' onClick={closeCropper}></button>
      </div>
    )
  }
}

export default ImageCropper
