import React from 'react'

const colorFromState = (cancelled, completed) => {
  if (completed) {
    return '#B8E986'
  }

  if (cancelled) {
    return '#FB9FAA'
  }

  return '#AACCF4'
}

const FileUploadProgress =
//language=CSS
  ({
                              file,
                              progress,
                              cancelled,
                              completed,
                              onCancel,
                              onRetry
}) => (
  <div className='FileUploadProgress'>
    <div className='filename'>
      <div className='name'>{file.name}</div>
      <div className='btns'>
        {!completed && cancelled && <a href='#' onClick={onRetry}>Retry</a>}

        {!completed && <a href='#' onClick={onCancel}>Cancel</a>}

        {completed && <a href='#'>Sucess</a>}
      </div>
    </div>
    <div className='progress'>
      <div className='bar' style={{backgroundColor: colorFromState(cancelled, completed), width: `${Math.floor((progress.sent / progress.size) * 100)}%`}}/>
    </div>
    <style jsx>{`
      .FileUploadProgress {
        width: 400px;
        height: 60px;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: column;
        font-family: Arial;
      }

      .filename {
        display: inline-flex;
        flex-direction: row;
        flex-grow: 1;
      }

      .name {
        display: inline-flex;
        flex-grow: 1;
        align-items: center;
        padding: 10px;
      }

      .btns {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }

      .btns a {
        text-decoration: none;
        color: #ccc;
      }

      .btns a:first-of-type {
        margin: 0 10px;
      }

      .progress {
        display: inline-flex;
        flex-basis: 10px;
        flex-shrink: 0;
        position: relative;
      }

      .bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
      }
    `}</style>
  </div>
)

export default FileUploadProgress
