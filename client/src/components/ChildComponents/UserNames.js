import React from 'react'
import { Route, Link } from 'react-router-dom';
import { getUserNames } from '../../services/apiService'

class UserNames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            names: []
        }
    }

    async componentDidMount () {
        await this.getUser()
    }
    getUser = async () => {
        const data = await getUserNames()
        console.log(data)
        this.setState({data})
        console.log('getUser', data)
    }

    renderPerson = () => {
        if(this.state.data){
            return this.state.data.map(user => {
                return (
                    <h2 key={user.id}><Link to={{
                        pathname: `/dashboard/username/${user.id}`,
                        state:{names:user.names}
                    }}>LinkName</Link>
                    </h2>
                )
            })
        }
    }
    
    render() {
        return (
            <div>
                <h1>User Names</h1>
                <div>{this.renderPerson()}</div>
            </div>
        )
    }
}
export default UserNames