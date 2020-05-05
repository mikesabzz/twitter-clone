import React from 'react'
import { Redirect } from 'react-router-dom';
import { createProfile } from '../../services/apiService';
import './styles.css'

class CreateProfile extends React.Component {
    constructor(props){
        super(props)
        this.props = props
        this.state = {
            created: false,
            name: '',
            userId: props.user.id,
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
            <div className="create-profile-containter">
                <h2>Create your Profile</h2>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit} >
                    <textarea className="bio-textarea" name="bio" type="text" placeholder="Bio" required/>
                    <br />
                    <input name="location" type="text" placeholder="Location" />
                    <br />
                    <input name="website" type="text" placeholder="Website" />
                    <br />
                    <label className="mt-4" htmlFor="birthdate">Date of Birth</label>
                    <br />
                    <input className="w-50" name="birthdate" type="date" required/>
                    <br />
                    <button className="mt-3 btn btn-primary font-weight-bold">Save</button>
                </form>
            </div>
        )
    }
}

export default CreateProfile


