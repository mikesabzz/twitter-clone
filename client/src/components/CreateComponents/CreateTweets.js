import React from 'react'
import { createTweets } from '../../services/apiService'
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
            return window.location.reload()
        }
        return (
            <div>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                    <label htmlFor="tweet">Whats happening?</label>
                    <br />
                    <textarea type="text" name="tweet"></textarea>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default CreateTweets