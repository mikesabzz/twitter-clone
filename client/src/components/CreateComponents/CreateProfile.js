import React from 'react'
import { Redirect } from 'react-router-dom';
import { createProfile, uploadImage } from '../../services/apiService';

class CreateProfile extends React.Component {
    constructor(props){
        super(props)
        this.props = props
        this.state = {
            created: false,
            name: '',
            userId: props.user.id,
            selectedFile: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        const element = e.target
        const { name, value } = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }
    fileSelectorHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { userId, photo, bio, location, website, birthdate } = this.state
        const profile = { userId, bio, location, website, birthdate }
        const image = { photo }
        await createProfile(profile)
        const fd = new FormData()
        // fd.append('photo', this.state.selectedFile, this.state.selectedFile.name)
        await uploadImage(image, fd)
            .then(res => {
                console.log(res)
            })
        this.setState({created: true})
    }
    render(){
        if (this.state.created) {
            return <Redirect to={`/dashboard/user/${this.props.user.name}/${this.props.user.id}`}></Redirect> 
        } 
        return (
            <div>
                <p>Create your Profile</p>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
         
                    <input htmlFor="photo" type="file" onChange={this.fileSelectorHandler} />
     
                    <label htmlFor="bio">Bio Description:</label>
                    <br />
                    <textarea name="bio" type="text" />
                    <br />
                    <label htmlFor="location">Location:</label>
                    <input name="location" type="text" />
                    <br />
                    <label htmlFor="website">Website:</label>
                    <input name="website" type="text" />
                    <br />
                    <label htmlFor="birthdate">Date of Birth:</label>
                    <input name="birthdate" type="date" />
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateProfile