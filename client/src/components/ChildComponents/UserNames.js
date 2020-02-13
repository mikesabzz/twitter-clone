import React from 'react'
import { Route, Link } from 'react-router-dom';
import { getUserNames } from '../../services/apiService'
import SearchUser from './SearchUsers';

class UserNames extends React.Component {
    constructor() {
        super()
        this.state = {
            names: [],
            tweets: [],
            inputValue: ''
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
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0
            })
            .map((name, id) => <p key={id}><Link to={{
                pathname: `/user/${name.id}`,
                state: {tweets:name.tweets}
            }}>{name.name}</Link></p>
            )
        }
    }
    handleFilterChange = (event) => {
        try {
            event.preventDefault()
            this.setState({
                inputValue: event.target.value
            })
            const inputUserName = this.state.names.filter((name) => {
                return name.name.toLowerCase().includes(this.state.inputValue)
            })
            if (this.state.inputValue.length < 2) {
                return this.getUser()
            }
            this.setState({ names: inputUserName })
        } catch (e) {
            console.error(e)
        }
    }
    
    render() {
        return (
            <div>
                <h1>Users</h1>
                <SearchUser name={this.state.names} onChange={this.handleFilterChange} />
                <div>{this.renderPerson()}</div>
            </div>
        )
    }
}
export default UserNames