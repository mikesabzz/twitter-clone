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

    async componentDidMount () {
        await this.getProfile()
    }

    getProfile = async () => {
        const bios = await getOneProfile()
        this.setState({bios})
        console.log('getProfile', bios)
    }
    
    renderUserBio = () => {
        if (this.state.bios) {
            return this.state.bios.map(bio => {
                return (
                    <div>
                        {localStorage.getItem('userId') == this.props.match.params.id ?
                        (
                            <div key={bio.id}>hello {bio.bio}</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                )
            })
        }
    }
    
    render(){
        return (
            <div>
                <h1>{this.props.name}</h1>
                <div>{this.renderUserBio()}</div>
            </div>
        )
    }

}
export default UserProfile