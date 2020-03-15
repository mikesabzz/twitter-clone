import React from 'react'
import { Redirect } from 'react-router-dom'
import { editProfile } from '../../services/apiService'

class UpdateProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profileId: this.props.match.params.id,
            updated: false
        }
    }
    handleUpdate = (e) => {
        const element = e.target
        const { name, value } = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const { profileId, name, photo, bio } = this.state
        const profile = { profileId, name, photo, bio }
        const id = this.state.profileId
        await editProfile(id, profile)
        this.setState({ updated: true })
    }
    render() {
        if (this.state.updated) {
            return <Redirect to={`/dashboard/user/${this.props.match.params.name}/${this.state.profileId}`} />
        }
        return (
            <div>Update Profile
                <form onChange={this.handleUpdate} onSubmit={this.handleSubmit}>
                    <label htmlFor="photo">Image</label>
                    <br />
                    <input name="photo" type="text"></input>
                    <br />
                    <label htmlFor="bio">Bio:</label>
                    <br />
                    <textarea name="bio" defaultValue={this.props.location.state.editProfile} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UpdateProfile