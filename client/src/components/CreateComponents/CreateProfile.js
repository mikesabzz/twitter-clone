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
    
    handleChange = (e) => {
        const element = e.target
        const { name, value } = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { userId, photo, bio } = this.state
        const profile = { userId, photo, bio }
        await createProfile(profile)
        this.setState({created: true})
    }
    render(){
        if (this.state.created) {
            return <Redirect to={`/dashboard/user/${this.props.user.name}/${this.props.user.id}`}></Redirect> 
        } 
        return (
            <div>
                <p>Create your Profile</p>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit} action="/app/upload" method="post" encType="multipart/form-data">
                    {/* <label htmlFor="photo">Upload Image:</label>
                    <input name="photo" type="text" />
                    <ImageUploader
                        name="photo"
                        withIcon={true}
                        buttonText='Choose image'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.JPG', '.jpeg']}
                        maxFileSize={5242880}
                    /> */}
                  <form action="/profile" method="post" enctype="multipart/form-data">
                    <input type="file" name="profileImage" />
                </form>
     
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