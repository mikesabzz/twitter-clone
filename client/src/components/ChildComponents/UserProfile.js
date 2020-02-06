import React from 'react'
import { getOneProfile } from '../../services/apiService'
import {Link, Route} from 'react-router-dom'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bios: [],
            userId: this.props.user.id
        }
    }

    async componentDidMount () {
        await this.getProfile()
    }

    getProfile = async () => {
        const bios = await getOneProfile()
        this.setState({bios})
    }

    renderUserBio = () => {
        console.log(this.state.bios)
    }
    
    render(){
        console.log(this.state.userId)
        return (
            <div>
                <h1>{this.props.name}</h1>
                <div>{this.renderUserBio()}</div>
            </div>
        )
    }

}
export default UserProfile