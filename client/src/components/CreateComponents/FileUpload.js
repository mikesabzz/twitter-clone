import React from 'react'
import {Redirect} from 'react-router-dom'
import {api} from '../../services/apiService'
import './styles.css'
const apiRouter = api

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.props = props
        this.state = {
            uploaded: false,
            userId: props.user.id,
            file: null
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.onFileUpload = this.onFileUpload.bind(this)
    }
    onFileChange = event => {
        this.setState({ file: event.target.files[0] })
    }

    onFileUpload = async () => {
        try {
            const { userId, file } = this.state
            const formData = new FormData()
            formData.append("file", file, file.name)
            formData.append("userId", userId)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            apiRouter.post('/app/upload', formData, config)
            this.setState({ uploaded: true })
        } catch(error) {
            console.log(error)
        }
    }
    renderFile = () => {
        if (this.state.file) {
            return (
                <div className="file-data">
                    <p>File Name: {this.state.file.name}</p>
                    <p>File Type: {this.state.file.type}</p>
                    <p>Modification Date:{" "}{this.state.file.lastModifiedDate.toDateString()}</p>
                </div>
            )
        } else {
            return (
                <h4 className="font-weight-bold">Upload a profile picture before pressing the 'Upload!' button!</h4>
            )
        }
    }
    render () {
        if (this.state.uploaded) {
            return <Redirect to={'/dashboard/user/create'}></Redirect> 
        } 
        return (
            <div className="image-uploader-contaner">
                <h1>Upload profile picture</h1>
                <div>
                    <input type="file" htmlFor="file" onChange={this.onFileChange} required/>
                    <br />
                    <button className="btn btn-primary font-weight-bold rounded" onClick={this.onFileUpload}>Upload!</button>
                </div>
                <br />
                {this.renderFile()}
            </div>
        )
    }
}

export default FileUpload
