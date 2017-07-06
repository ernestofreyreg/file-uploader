import React from 'react'
import FileUploader from '../components/FileUploader'

const Index = () => (
  <div className='root'>
    <FileUploader />
    <style jsx>{`
      .root {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f8f8f8;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
)

export default Index

