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
            pictures: []
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

    handleSubmit = async (e) => {
        e.preventDefault()
        const { userId, photo, bio } = this.state
        const profile = { userId, bio }
        const image = { photo }
        await createProfile(profile)
        await uploadImage(image)
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
         
                    <input type="file" name="photo" />
     
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