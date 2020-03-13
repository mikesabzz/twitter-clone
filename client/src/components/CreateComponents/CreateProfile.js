import React from 'react'
import { Redirect } from 'react-router-dom';
import { createProfile } from '../../services/apiService';
import ImageUploader from 'react-images-upload';

class CreateProfile extends React.Component {
    constructor(props){
        super(props)
        this.props = props
        this.state = {
            created: false,
            name: '',
            userId: props.user.id,
            pictures: []
        }
        this.onDrop = this.onDrop.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    onDrop(picture) {
        this.setState({pictures: this.state.pictures.concat(picture)})
    }
    
    handleChange = (event) => {
        const currentElement = event.target
        const { name, value } = currentElement
        const newState = {}
        newState[name] = value
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { userId, name, photo, bio } = this.state
        const profile = { userId, name, photo, bio }
        await createProfile(profile)
        this.setState({created: true})
    }
    render(){
        if (this.state.created) {
            return <Redirect to={`/user/${this.props.user.name}/${this.props.user.id}`}></Redirect> 
        } 
        return (
            <div>
                <p>Create your Profile</p>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                    <label htmlFor="photo">Upload Image:</label>
                    <ImageUploader
                        name="photo"
                        value={this.state.photo}
                        withIcon={true}
                        buttonText='Choose image'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.JPG', '.jpeg']}
                        maxFileSize={5242880}
                    />
                    <label htmlFor="bio">Bio Description:</label>
                    <br />
                    <textarea name="bio" type="text" />
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateProfile