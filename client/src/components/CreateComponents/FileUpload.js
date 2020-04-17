import React from 'react'
import { uploadImage } from '../../services/apiService'

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            file: '',
            // setFile: '',
            filename: 'Choose File',
            // setFilename: ''
            uploadedFile: '',
            // setUploadedFile: ''
        }
    }
    onChange = e => {
        // this.setState({file:this.state.setFile})
        // this.ListeningStateChangedEvent({filename:this.state.setFilename})
        this.state.file(e.target.files[0])
        this.state.filename(e.target.files[0].name)
    }
    onSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', this.state.file)
        try {
            const res = await uploadImage
            const {fileName, filePath } = res.data
            setUploadedFile({ fileName, filePath})
        }catch(err) {
            if(err.response.status === 500){
                console.log('There was a problem with the server')
            } else {
               console.log(err.response.data.msg) 
            }
        }
    }
    render () {
        return (
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange} />
        <label className="custom-file-label" htmlFor="customFile">{this.state.filename}</label>
                <input type="submit" value="Upload" className="btn btn-primary btn-block" />
            </div>
        )
    }
}

export default FileUpload