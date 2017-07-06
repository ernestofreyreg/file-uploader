import React from 'react'
import Dropzone from 'react-dropzone'

const FileDrop = ({onDrop}) => (
  <div className='FileDrop'>
    <Dropzone
      className='FileUploaderDrop'
      onDrop={onDrop}
    >
      <p>Drag to upload</p>
    </Dropzone>
    <style jsx>{`
      .FileDrop {
        width: 400px;
        height: 200px;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: solid 1px #ccc;
      }

      .FileDrop p {
        font-family: Arial;
        color: #889;
        font-size: 22px;
      }
    `}</style>
  </div>

)

export default FileDrop
