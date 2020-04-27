import React from 'react'
import { uploadImage } from '../../services/apiService'
import multer from 'multer'

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            created: false,
            userId: this.props.userId,
            file: "",
            filename: 'Choose Image'
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    onChange = (e) => {
        this.setState({ file: e.target.files[0] })
        const element = e.target
        this.setState({filename: element.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { userId, file, poster } = this.state
        const imageUpload = { userId, file, poster }
        await uploadImage(imageUpload)
        this.setState({ created: true })
    }
    render () {
        console.log(this.state.file.name)
        return (
            <div className="custom-file">
                <input type="file" name="file" className="custom-file-input" id="customFile" onChange={this.onChange} />
                <label className="custom-file-label" htmlFor="file">{this.state.filename}</label>
                <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4' onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default FileUpload