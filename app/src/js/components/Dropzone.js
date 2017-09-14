import React from 'react'
import accepts from 'utils/accept'
import getDataTransferItems from 'utils/getTransferItems'

class Dropzone extends React.Component {
  static onDocumentDragOver(e) {
    // allow the entire document to be a drag target
    e.preventDefault()
  }

  constructor(props, context) {
    super(props, context)
    this.onClick = this.onClick.bind(this)
    this.onDocumentDrop = this.onDocumentDrop.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onFileDialogCancel = this.onFileDialogCancel.bind(this)
    this.fileAccepted = this.fileAccepted.bind(this)
    this.setRef = this.setRef.bind(this)
    this.isFileDialogActive = false
    this.state = {
      isDragActive: false,
      acceptedFiles: [],
      rejectedFiles: []
    }
  }

  componentDidMount() {
    const { preventDropOnDocument } = this.props
    this.dragTargets = []

    if (preventDropOnDocument) {
      document.addEventListener('dragover', Dropzone.onDocumentDragOver, false)
      document.addEventListener('drop', this.onDocumentDrop, false)
    }

    document.body.onfocus = this.onFileDialogCancel
  }

  componentWillUnmount() {
    const { preventDropOnDocument } = this.props
    if (preventDropOnDocument) {
      document.removeEventListener('dragover', Dropzone.onDocumentDragOver)
      document.removeEventListener('drop', this.onDocumentDrop)
    }
    // Can be replaced with removeEventListener, if addEventListener works
    document.body.onfocus = null
  }

  onDocumentDrop(e) {
    if (this.node.contains(e.target)) {
      return
    }
    e.preventDefault()
    this.dragTargets = []
  }

  onDragStart(e) {
    if (this.props.onDragStart) {
      this.props.onDragStart.call(this, e)
    }
  }

  onDragEnter(e) {
    e.preventDefault()

    if (this.dragTargets.indexOf(e.target) === -1) {
      this.dragTargets.push(e.target)
    }

    const allFilesAccepted = this.allFilesAccepted(getDataTransferItems(e, this.props.multiple))

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    })

    if (this.props.onDragEnter) {
      this.props.onDragEnter.call(this, e)
    }
  }

  onDragOver(e) { // eslint-disable-line class-methods-use-this
    e.preventDefault()
    e.stopPropagation()
    try {
      e.dataTransfer.dropEffect = 'copy' // eslint-disable-line no-param-reassign
    } catch (err) {
      // continue regardless of error
    }

    if (this.props.onDragOver) {
      this.props.onDragOver.call(this, e)
    }
    return false
  }

  onDragLeave(e) {
    e.preventDefault()

    // Only deactivate once the dropzone and all children have been left.
    this.dragTargets = this.dragTargets.filter(el => el !== e.target && this.node.contains(el))
    if (this.dragTargets.length > 0) {
      return
    }

    this.setState({
      isDragActive: false,
      isDragReject: false
    })

    if (this.props.onDragLeave) {
      this.props.onDragLeave.call(this, e)
    }
  }

  onDrop(e) {
    const { onDrop, onDropAccepted, onDropRejected, multiple, disablePreview } = this.props
    const fileList = getDataTransferItems(e, multiple)
    const acceptedFiles = []
    const rejectedFiles = []

    // Stop default browser behavior
    e.preventDefault()

    // Reset the counter along with the drag on a drop.
    this.dragTargets = []
    this.isFileDialogActive = false

    fileList.forEach((file) => {
      if (!disablePreview) {
        try {
          file.preview = window.URL.createObjectURL(file) // eslint-disable-line no-param-reassign
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.error('Failed to generate preview for file', file, err) // eslint-disable-line no-console
          }
        }
      }

      if (this.fileAccepted(file) && this.fileMatchSize(file)) {
        acceptedFiles.push(file)
      } else {
        rejectedFiles.push(file)
      }
    })

    if (onDrop) {
      onDrop.call(this, acceptedFiles, rejectedFiles, e)
    }

    if (rejectedFiles.length > 0 && onDropRejected) {
      onDropRejected.call(this, rejectedFiles, e)
    }

    if (acceptedFiles.length > 0 && onDropAccepted) {
      onDropAccepted.call(this, acceptedFiles, e)
    }

    // Reset drag state
    this.setState({
      isDragActive: false,
      isDragReject: false,
      acceptedFiles,
      rejectedFiles
    })
  }

  onClick(e) {
    const { onClick, disableClick } = this.props
    if (!disableClick) {
      e.stopPropagation()
      this.open()
      if (onClick) {
        onClick.call(this, e)
      }
    }
  }

  onFileDialogCancel() {
    // timeout will not recognize context of this method
    const { onFileDialogCancel } = this.props
    const { fileInputEl } = this
    let { isFileDialogActive } = this
    // execute the timeout only if the onFileDialogCancel is defined and FileDialog
    // is opened in the browser
    if (onFileDialogCancel && isFileDialogActive) {
      setTimeout(() => {
        // Returns an object as FileList
        const FileList = fileInputEl.files
        if (!FileList.length) {
          isFileDialogActive = false
          onFileDialogCancel()
        }
      }, 300)
    }
  }

  setRef(ref) {
    this.node = ref
  }

  fileAccepted(file) {
    // Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
    // that MIME type will always be accepted
    return file.type === 'application/x-moz-file' || accepts(file, this.props.accept)
  }

  fileMatchSize(file) {
    return file.size <= this.props.maxSize && file.size >= this.props.minSize
  }

  allFilesAccepted(files) {
    return files.every(this.fileAccepted)
  }

  open() {
    this.isFileDialogActive = true
    this.fileInputEl.value = null
    this.fileInputEl.click()
  }

  renderChildren = (children) => {
    if (typeof children === 'function') {
      return children(this.state)
    }
    return children
  }

  render() {
    const {
      accept,
      activeClassName,
      inputProps,
      multiple,
      name,
      rejectClassName,
      children,
      ...rest
    } = this.props

    let {
      activeStyle,
      className,
      rejectStyle,
      style,
      ...props // eslint-disable-line prefer-const
    } = rest

    const { isDragActive, isDragReject } = this.state

    className = className || ''

    if (isDragActive && activeClassName) {
      className += ' ' + activeClassName
    }
    if (isDragReject && rejectClassName) {
      className += ' ' + rejectClassName
    }

    if (!className && !style && !activeStyle && !rejectStyle) {
      style = {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5
      }
      activeStyle = {
        borderStyle: 'solid',
        background: '#eee'
      }
      rejectStyle = {
        borderStyle: 'solid',
        background: '#ffdddd'
      }
    }

    let appliedStyle
    if (activeStyle && isDragActive) {
      appliedStyle = {
        ...style,
        ...activeStyle
      }
    } else if (rejectStyle && isDragReject) {
      appliedStyle = {
        ...style,
        ...rejectStyle
      }
    } else {
      appliedStyle = {
        ...style
      }
    }

    const inputAttributes = {
      accept,
      type: 'file',
      style: { display: 'none' },
      multiple,
      ref: el => { this.fileInputEl = el },
      onChange: this.onDrop
    }

    if (name && name.length) {
      inputAttributes.name = name
    }

    // Remove custom properties before passing them to the wrapper div element
    const customProps = [
      'acceptedFiles',
      'preventDropOnDocument',
      'disablePreview',
      'disableClick',
      'onDropAccepted',
      'onDropRejected',
      'onFileDialogCancel',
      'maxSize',
      'minSize'
    ]
    const divProps = { ...props }
    customProps.forEach(prop => delete divProps[prop])

    return (
      <div
        className={className}
        style={appliedStyle}
        {...divProps/* expand user provided props first so event handlers are never overridden */}
        onClick={this.onClick}
        onDragStart={this.onDragStart}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        ref={this.setRef}
      >
        {this.renderChildren(children)}
        <input
          {...inputProps}
          {...inputAttributes}
        />
      </div>
    )
  }
}

Dropzone.defaultProps = {
  preventDropOnDocument: true,
  disablePreview: false,
  disableClick: false,
  multiple: false,
  maxSize: Infinity,
  accept: 'image/*',
  minSize: 0
}

export default Dropzone
