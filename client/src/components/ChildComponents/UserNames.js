import React from 'react'
import { Link } from 'react-router-dom';
import { getUserNames } from '../../services/apiService'
import SearchUser from './SearchUsers';
import './styles.css'

class UserNames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            names: [],
            inputValue: '',
            imageUrl: ''
        }
    }
    async componentDidMount() {
        await this.getUser()
    }
    getUser = async () => {
        const names = await getUserNames()
        this.setState({ names })
    }
    // onError() {
    //     this.setState({
    //       imageUrl: "https://res.cloudinary.com/mikesabz/image/upload/v1589941495/otupu5oygjquz8ruf8cx.jpg"
    //     })
    //   }
    renderPerson = () => {
        if (this.state.names) {
            return this.state.names.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0
            })
                .map(name => {
                    // const imageUrl = (name.image == null) ? "https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg" : name.image.url
                    return (
                        <div key={name.id}>
                            <Link to={{
                                pathname: `/dashboard/user/${name.name}/${name.id}`,
                                state: { names: name }
                            }} key={name.id}>
                                <div className="username-box border border-secondary p-3">
                                    {/* <img className="tweet-image"
                                        src={imageUrl} /> */}
                                    <p>{name.name}</p>
                                </div>
                            </Link>
                        </div>
                    )
                }
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
            <div className="usernames-container">
                <SearchUser name={this.state.names} onChange={this.handleFilterChange} />
                <br />
                <div>{this.renderPerson()}</div>
            </div>
        )
    }
}
export default UserNames