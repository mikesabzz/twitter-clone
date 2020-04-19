import React from 'react'
import ImageUploader from 'react-images-upload'
import { uploadImage } from '../../services/apiService'

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pictures: []
        }
    }
    render () {
        return (
            <div>
                <form>
                    <label htmlFor="file">File:</label>
                  
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default FileUpload