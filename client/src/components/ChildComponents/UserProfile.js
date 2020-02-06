import React from 'react'
import { getOneProfile } from '../../services/apiService'
import {Link, Route} from 'react-router-dom'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bios: {},
            // userId: this.props.user.id
        }
    }

    async componentDidMount () {
        await this.getProfile()
    }

    getProfile = async () => {
        try {
            const bios = await getOneProfile()
            this.setState({bios})
        }catch(e) {
            console.error(e)
        }
    }

    renderUserBio = () => {
        if(this.state.bios){
            const { bios } = this.state
            return (
                <div>
                    {localStorage.getItem('userId') == this.props.user.id ? (
                    <div>
                    <p>{bios.userId}</p>
                    <img src={bios.photo} alt=""></img>
                    <h1>{this.props.name}</h1>
                    <div>{bios.bio}</div>
                    </div>
                   ) : (<div></div>)
                    } 
                </div>
            )
        }
    }
    
    render(){
        return (
            <div>
                <div>{this.renderUserBio()}</div>
            </div>
        )
    }

}
export default UserProfile