import React from 'react'
import { Link } from 'react-router-dom';
import { getUserNames, getImages } from '../../services/apiService'
import SearchUser from './SearchUsers';
import './styles.css'

class UserNames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            names: [],
            images: [],
            inputValue: ''
        }
    }

    async componentDidMount() {
        await this.getUser()
        await this.getImage()
    }
    getUser = async () => {
        const names = await getUserNames()
        this.setState({ names })
    }
    getImage = async () => {
        const images = await getImages()
        this.setState({ images })
    }
    renderPerson = () => {
        if (this.state.names) {
            return this.state.names.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0
            })
                .map(name => {
                    return this.state.images.map(image => {
                        if (image.userId == name.id) {
                            return (
                                <div key={name.id}>
                                    <Link to={{
                                        pathname: `/dashboard/user/${name.name}/${name.id}`,
                                        state: { names: name }
                                    }} key={name.id}>
                                        <p className="border border-secondary p-3">
                                            <img className="tweet-image mr-2"
                                                src={window.location.origin + `/uploads/${image.poster}`}
                                            />
                                            {name.name}
                                        </p>
                                    </Link>
                                </div>
                            )
                        }
                    })
                })
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