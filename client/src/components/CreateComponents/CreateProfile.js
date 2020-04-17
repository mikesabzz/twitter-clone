import React from 'react'
import { Redirect } from 'react-router-dom';
import { createProfile } from '../../services/apiService';
import FileUpload from './FileUpload'

class CreateProfile extends React.Component {
    constructor(props){
        super(props)
        this.props = props
        this.state = {
            created: false,
            name: '',
            userId: props.user.id,
            selectedFile: "",
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
        const { userId, bio, location, website, birthdate } = this.state
        const profile = { userId, bio, location, website, birthdate }
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
                <form onChange={this.handleChange} onSubmit={this.handleSubmit} >
                    <FileUpload />
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
                    <input name="birthdate" type="date" required/>
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateProfile