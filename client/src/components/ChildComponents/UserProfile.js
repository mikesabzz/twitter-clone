import React from 'react'
import { getOneProfile } from '../../services/apiService'
import { Link, Route } from 'react-router-dom'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bios: {}
        }
    }

    async componentDidMount() {
        await this.getProfile()
    }

    getProfile = async () => {
        try {
            const bios = await getOneProfile()
            this.setState({ bios })
        } catch (e) {
            console.error(e)
        }
    }

    renderUserBio = () => {
        const { bios } = this.state
        if (bios) {
            return (
                <div>
                    <div key={bios.userId}>
                        <img src={bios.photo} alt=""></img>
                        <h1>{this.props.name}</h1>
                        <div>{bios.bio}</div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div>{this.renderUserBio()}</div>
            </div>
        )
    }

}
export default UserProfile