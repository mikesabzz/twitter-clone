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
            userId: props.user.id,
            pictures: [],
            name: ''
        }
        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(picture) {
        this.setState({pictures: this.state.pictures.concat(picture)})
    }
    
    handleChange = (event) => {
        const currentElement = event.target
        const { name, value } = currentElement
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        console.log('submitting')
        event.preventDefault()
        const { userId, name, bio, photo } = this.state
        const profile = { userId, name, bio, photo }

        await createProfile(profile)
        this.setState({created: true})
    }
    render(){
        if (this.state.created) {
            return <Redirect to={`/user/${this.props.user.name}/${this.props.user.id}`}></Redirect> 
        } 
        return (
            <div>
                <form onChange={this.handleChange}>
                    <p>Create your Profile</p>
                    <label htmlFor="photo">Upload Image:</label>
                    <ImageUploader
                        name="photo"
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
                    <button onSubmit={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateProfile