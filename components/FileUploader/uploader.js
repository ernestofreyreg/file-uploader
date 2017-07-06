import axios from 'axios'

export const INIT_UPLOADER = 'INIT_UPLOADER'
export const START_UPLOADING = 'START_UPLOADING'
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const CLEAR_FILE_SELECTION = 'CLEAR_FILE_SELECTION'
export const CANCELLED_UPLOAD = 'CANCELLED_UPLOAD'

export const initialState = {
  uploadingFile: null,
  uploadProgress: null,
  cancelTokenSource: null,
  uploading: false,
  cancelled: false,
  completed: false
}

// Reducer
export const uploadFileReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_UPLOADER: {
      return initialState
    }

    case START_UPLOADING: {
      return {
        ...state,
        uploadingFile: action.uploadingFile,
        uploadProgress: {size: action.uploadingFile.size, sent: 0},
        uploading: true,
        cancelled: false,
        completed: false,
        cancelTokenSource: action.cancelTokenSource
      }
    }

    case CLEAR_FILE_SELECTION: {
      return {
        ...state,
        uploadingFile: null,
        uploadProgress: null
      }
    }

    case UPLOAD_PROGRESS: {
      return {
        ...state,
        uploadProgress: {
          ...(state.uploadProgress),
          sent: action.progress,
          size: action.total
        }
      }
    }

    case CANCELLED_UPLOAD: {
      return {
        ...state,
        uploading: false,
        cancelled: true,
        cancelTokenSource: null
      }
    }

    case UPLOAD_SUCCESS: {
      return {
        ...state,
        uploading: false,
        completed: true
      }
    }

    default: return state
  }
}

// Actions
export const createActions = ({get, set}) => {
  const reducer = uploadFileReducer

  const dispatch = (type, params = {}) => set(state => reducer(state, {type, ...params}))

  const initUploader = () => dispatch(INIT_UPLOADER)
  const startedUploading = (uploadingFile, cancelTokenSource) => dispatch(START_UPLOADING, {cancelTokenSource, uploadingFile})
  const clearFileSelection = () => dispatch(CLEAR_FILE_SELECTION)
  const uploadingProgress = (progress, total) => dispatch(UPLOAD_PROGRESS, {progress, total})
  const uploadSuccess = () => dispatch(UPLOAD_SUCCESS)
  const cancelledFileUpload = () => dispatch(CANCELLED_UPLOAD)

  // Async actions
  const cancelFileUpload = () => {
    if (get().uploading && get().cancelTokenSource) {
      return new Promise(resolve => {
        get().cancelTokenSource.cancel()
        resolve()
      })
    }

    return Promise.resolve()
  }

  const retryUpload = () => {
    uploadFile(get().uploadingFile)
  }

  const cancelUpload = () => {
    if (get().completed) {
      return initUploader()
    }

    if (get().uploading) {
      return cancelFileUpload()
    }

    return clearFileSelection()
  }

  const uploadFile = file => {
    const source = axios.CancelToken.source()
    const options = {
      cancelToken: source.token,
      headers: {'Content-Type': file.type},
      onUploadProgress: progressEvent => {
        uploadingProgress(progressEvent.loaded, progressEvent.total)
      }
    }

    return startedUploading(file, source)
      .then(() => axios.put('/upload', file, options))
      .then(uploadSuccess)
      .catch(cancelledFileUpload)
  }

  return {
    retryUpload,
    cancelUpload,
    uploadFile
  }
}
