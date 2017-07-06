import expect from 'must'
import sinon from 'sinon'
import mustSinon from 'must-sinon'
import {
  uploadFileReducer,
  createActions,
  initialState,
  INIT_UPLOADER,
  START_UPLOADING
} from '../../../components/FileUploader/uploader'

mustSinon(expect)

describe('uploader', () => {
  const fakeFile = {
    name: 'somefile.ext',
    type: 'mime/type',
    size: 1000
  }
  const fakeTokenSource = {
    cancel: sinon.stub()
  }

  beforeEach(() => {
    fakeTokenSource.cancel.reset()
  })

  describe('reducer', () => {
    it(INIT_UPLOADER, () => {
      const state = uploadFileReducer(null, {type: INIT_UPLOADER})
      state.must.be.eql(initialState)
    })

    it(START_UPLOADING, () => {
      const state = uploadFileReducer(
        initialState,
        {
          type: START_UPLOADING,
          uploadingFile: fakeFile,
          cancelTokenSource: fakeTokenSource
        }
      )
      state.must.have.property('uploading', true)
      state.uploadingFile.must.be.eql(fakeFile)
      state.uploadProgress.must.be.eql({size: fakeFile.size, sent: 0})
      state.cancelTokenSource.must.be.eql(fakeTokenSource)
    })
  })

  describe('actions', () => {
    function mocks (initialState) {
      const mockAttach = () => {
        let state = initialState

        function setState(fn, cb) {
          state = fn(state)
          cb()
        }

        return {
          get: () => state,
          set: fn => new Promise(resolve => setState(fn, resolve))
        }
      }
      const instance = mockAttach()
      const actions = createActions(instance)

      return {
        instance,
        actions
      }
    }

    describe('cancelUpload', () => {
      it('is completed', () => {
        const {instance, actions} = mocks({...initialState, completed: true})

        return actions.cancelUpload()
          .then(() => {
            instance.get().completed.must.be.false()
          })
      })

      it('is uploading', () => {
        const {instance, actions} = mocks({...initialState, uploading: true, cancelTokenSource: fakeTokenSource})

        return actions.cancelUpload()
          .then(() => {
            fakeTokenSource.cancel.must.have.been.called()
          })
      })
    })
  })
})
