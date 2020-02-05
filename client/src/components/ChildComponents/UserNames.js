import React from 'react'
import { Route, Link } from 'react-router-dom';
import { getUserNames } from '../../services/apiService'

class UserNames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            names: []
        }
    }

    async componentDidMount () {
        await this.getUser()
    }
    getUser = async () => {
        const names = await getUserNames()
        this.setState({names})
    }

    renderPerson = () => {
        if (this.state.names) {
            return this.state.names.sort((a, b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0
            })
            .map((name, id) => <p key={id}>{name.name}</p>)
        }
    }
    
    render() {
        return (
            <div>
                <h1>Users</h1>
                <div>{this.renderPerson()}</div>
            </div>
        )
    }
}
export default UserNames