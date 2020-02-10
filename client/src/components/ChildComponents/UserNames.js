import React from 'react'
import { Route, Link } from 'react-router-dom';
import { getUserNames } from '../../services/apiService'
import SearchUsers from './SearchUsers'
import SearchUser from './SearchUsers';

class UserNames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            names: [],
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
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0
            })
            .map((name, id) => <p key={id}>{name.name}</p>)
        }
    }
    handleFilterChange = (event) => {
        event.preventDefault()
        this.setState({
            inputValue: event.target.value
        })
        const inputUserName = this.state.names.filter(name => {
            console.log("Hello",name)
            // return name.displayname.toLowerCase().includes(this.state.inputValue.toLowerCase())
        })
        if(this.state.inputValue.length < 2) {
            return this.renderPerson()
        }
        this.setState({ names: inputUserName })
    }
    
    render() {
        return (
            <div>
                <h1>Users</h1>
                <SearchUser name={this.state} onChange={this.handleFilterChange} />
                <div>{this.renderPerson()}</div>
            </div>
        )
    }
}
export default UserNames