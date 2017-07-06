import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FileDrop from './FileDrop'
import FileUploadProgress from './FileUploadProgress'
import {createActions, initialState} from './uploader'
import connect from '../connect'

class FileUploader extends Component {
  static propTypes = {
    uploadingFile: PropTypes.object,
    uploadProgress: PropTypes.object,
    cancelled: PropTypes.bool,
    completed: PropTypes.bool,
    uploadFile: PropTypes.func.isRequired,
    cancelUpload: PropTypes.func.isRequired,
    retryUpload: PropTypes.func.isRequired
  }

  handleDrop = acceptedfiles => {
    // Just upload first file
    this.props.uploadFile(acceptedfiles[0])
  }

  handleCancelUpload = () => {
    this.props.cancelUpload()
  }

  handleRetry = () => {
    this.props.retryUpload()
  }

  render () {
    const {
      uploadingFile,
      uploadProgress,
      cancelled,
      completed
    } = this.props

    if (!uploadingFile) {
      return <FileDrop onDrop={this.handleDrop} />
    }

    return (
      <FileUploadProgress
        file={uploadingFile}
        progress={uploadProgress}
        cancelled={cancelled}
        completed={completed}
        onCancel={this.handleCancelUpload}
        onRetry={this.handleRetry}
      />
    )
  }
}

export default connect(FileUploader, createActions, initialState)
