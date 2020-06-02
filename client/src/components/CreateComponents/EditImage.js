import React from 'react'
import { Redirect } from 'react-router-dom'
import { api } from '../../services/apiService'
const apiRouter = api

class EditImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false,
            imageId: this.props.location.state.imageId,
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
            formData.append("imageId", imageId)
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

    render() {
        if (this.state.edited) {
            return <Redirect to={`/dashboard/user/${this.props.match.params.name}/${this.props.match.params.id}`} />
        }
        return (
            <div>
                <form onChange={this.onFileChange} onSubmit={this.onFileUpload}>
                    <input type="file" htmlFor="file" />
                    <br />
                    <button className="btn btn-primary font-weight-bold rounded">Upload!</button>
                </form>
            </div>
        )
    }
}

export default EditImage