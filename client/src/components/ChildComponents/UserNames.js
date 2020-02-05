import React from 'react'
import { Route, Link } from 'react-router-dom';
import { getUserNames } from '../../services/apiService'

class UserNames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: []
        }
    }

    async componentDidMount () {
        await this.getUser()
    }
    getUser = async () => {
        const name = await getUserNames()
        console.log(name)
        this.setState({name})
        console.log('getUser', name)
    }

    renderPerson = () => {
        if (this.state.name) {
        }
    }
    
    render() {
        return (
            <div>
                <h1>User Names</h1>
                {/* <div>{this.renderPerson()}</div> */}
            </div>
        )
    }
}
export default UserNames