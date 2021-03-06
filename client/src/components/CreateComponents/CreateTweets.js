import React from 'react'
import { createTweets } from '../../services/apiService'
import './styles.css'
import { Redirect } from 'react-router-dom'

class CreateTweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            created: false,
            name: '',
            userId: this.props.user.id
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const element = e.target
        const { name, value } = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { userId, tweet } = this.state
        const tweets = { userId, tweet }
        await createTweets(tweets)
        this.setState({ created: true })
    }
    render() {
        if (this.state.created) {
            return <Redirect to={`/dashboard/user/${this.props.user.name}/${this.props.user.id}`}></Redirect> 
        }
        return (
            <div>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                    <textarea className="tweet-textarea" type="text" name="tweet" placeholder="Whats happening?"></textarea>
                    <br />
                    <button className="btn btn-primary mb-2 font-weight-bold">Tweet</button>
                </form>
            </div>
        )
    }
}

export default CreateTweets