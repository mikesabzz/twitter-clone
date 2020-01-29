import React from 'react'
import { getOneProfile } from '../../services/apiService'
import {Link, Route} from 'react-router-dom'

class UserProfile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            profiles: []
        }
    }
    async componentDidMount () {
        await this.getProfile()
    }
    getProfile = async () => {
        const data = await getOneProfile()
        console.log(data)
        this.setState({data})
        console.log('getProfile', data)
    }
    renderUserProfile = () => {
        if(this.state.data) {
            return this.state.data.map(profile => {
                return (
                    <h2 key={profile.id}><Link to={{
                        pathname: `/${this.props.name}/bio/${profile.id}`,
                        state:{profiles:profile.bio},
                        state:{profile:profile.photo}
                    }}>{profile.bio}</Link></h2>
                )
            })
        }
    }
    render() {
        return (
        <div>
            <h1>{this.props.name}</h1>
            <h1>{this.renderUserProfile()}</h1>
        </div>
        )
    }
}
export default UserProfile