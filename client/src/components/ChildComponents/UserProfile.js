import React from 'react'
import { getOneProfile } from '../../services/apiService'
import {Link, Route} from 'react-router-dom'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bios: []
        }
    }

    async componentWillMount () {
        await this.getProfile()
    }

    getProfile = async () => {
        const bios = await getOneProfile()
        this.setState({bios})
    }

    renderUserBio = () => {
        if (this.state.bios) {
            console.log(this.state.bios)
        }
    }
    
    render(){
        return (
            <div>
                <h1>{this.props.name}</h1>
            </div>
        )
    }

}
export default UserProfile