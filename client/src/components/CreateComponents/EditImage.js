import React from 'react'
import { Redirect } from 'react-router-dom'
import { editImage, api } from '../../services/apiService'
const apiRouter = api

class EditImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false,
            imageId: this.props.match.params.id,
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
            const { imageId, file } = this.state
            const formData = new FormData()
            formData.append("file", file, file.name)
            // formData.append("userId", userId)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            apiRouter.put(`app/upload/${imageId}`, formData, config)
            this.setState({ edited: true })
        } catch(error) {
            console.log(error)
        }
    }
    handleEdit = (e) => {
        const element = e.target
        const { name, value } = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const { imageId } = this.state
        const image = { imageId }
        const id = this.state.imageId
        await editImage(id, image)
        this.setState({ edited: true })
        console.log('clicked')
    }

    render() {
        if (this.state.edited) {
            return <Redirect to={`/dashboard/user/${this.props.match.params.name}/${this.state.imageId}`} />
        }
        return (
            <div>
                <input type="file" htmlFor="file" onChange={this.onFileChange} />
                <br />
                <button className="btn btn-primary font-weight-bold rounded" onClick={this.onFileUpload}>Upload!</button>
            </div>
        )
    }
}

export default EditImage