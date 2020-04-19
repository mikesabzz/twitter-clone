import React from 'react'
import { uploadImage } from '../../services/apiService'

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            created: false,
            userId: this.props.userId,
            name: this.props.userName
        }
    }
    onChange = (e) => {
        const element = e.target
        const { name, value } = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
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
            <div className="form-group files">
                <label htmlFor="file">Upload Your File </label>
                <input type="file" name="file" className="form-control" onChange={this.onChange} />
            </div>
        )
    }
}

export default FileUpload