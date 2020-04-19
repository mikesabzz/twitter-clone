import React from 'react'
import { uploadImage } from '../../services/apiService'

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render () {
        return (
            <div>
                File Uploader
            </div>
        )
    }
}

export default FileUpload