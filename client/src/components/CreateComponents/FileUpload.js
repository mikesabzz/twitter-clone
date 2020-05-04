import React from 'react'
import {api} from '../../services/apiService'
const apiRouter = api

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.props = props
        this.state = {
            created: false,
            userId: props.userId,
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
            console.log('image uploaded')
            this.setState({ created: true })
        } catch(error) {
            console.log(error)
        }
    }
    render () {
        return (
            <div>
                <h1>File Upload</h1>
                <div>
                    <input type="file" htmlFor="file" onChange={this.onFileChange} required/>
                    <button onClick={this.onFileUpload}>Upload!</button>
                </div>
            </div>
        )
    }
}

export default FileUpload