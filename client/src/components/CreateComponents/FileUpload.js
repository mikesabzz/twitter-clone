import React from 'react'
import { uploadImage } from '../../services/apiService'

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            created: false,
            userId: this.props.userId,
            file: null
        }
    }
    onFileChange = event => {
        this.setState({ file: event.target.files[0] })
    }

    onFileUpload = async () => {
        const { userId, poster, file } = this.state
        const imageUpload = { userId, file, poster }
        const formData = new FormData()
        formData.append("file", file, file.name)
        await uploadImage(imageUpload, formData)
        this.setState({ created: true })
    }
    fileData = () => {
        if (this.state.file) {
            console.log(this.state.file.name)
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.file.name}</p>
                    <p>File Type: {this.state.file.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.file.lastModifiedDate.toDateString()}
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before pressing the Upload button</h4>
                </div>
            )
        }
    }
    render () {
        return (
            <div>
                <h1>File Upload</h1>
                <div>
                    <input type="file" htmlFor="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>Upload!</button>
                </div>
                {this.fileData()}
            </div>
        )
    }
}

export default FileUpload