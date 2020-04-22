import React from 'react'
import { uploadImage } from '../../services/apiService'

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            created: false,
            userId: this.props.userId,
            name: this.props.userName,
            filename: 'Choose File'
        }
    }
    onChange = (e) => {
        const element = e.target
        const { name, value } = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
        this.setState({filename: element.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const {userId, file, name, poster} = this.state
        const imageUpload = {userId, file, name, poster}
        await uploadImage(imageUpload)
        this.setState({created: true})
    }
    render () {
        return (
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange} />
                <label className="custom-file-label" htmlFor="file">{this.state.filename}</label>
                <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4' onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default FileUpload